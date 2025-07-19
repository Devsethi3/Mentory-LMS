// actions.ts

"use server";

import Stripe from "stripe";
import { env } from "@/lib/env";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { ApiResponse } from "@/lib/types";
import { redirect } from "next/navigation";
import { requireUser } from "@/data/user/require-user";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5,
  })
);

export async function enrollInCourseAction(
  courseId: string
): Promise<ApiResponse | never> {
  const user = await requireUser();

  let checkoutUrl: string;
  try {
    // Rate limiting check
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: user.id,
    });

    if (decision.isDenied()) {
      return {
        status: "error",
        message:
          "You have exceeded the maximum number of enrollments allowed. Please try again later.",
      };
    }

    // Get course with stripePriceId
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: {
        id: true,
        title: true,
        price: true,
        slug: true,
        stripePriceId: true,
      },
    });

    if (!course) {
      return {
        status: "error",
        message: "Course not found",
      };
    }

    console.log("stripePriceId", course.stripePriceId);

    // Validate that stripePriceId exists
    if (!course.stripePriceId) {
      return {
        status: "error",
        message: "Course pricing not configured properly",
      };
    }

    // Handle Stripe customer creation/retrieval
    let stripeCustomerId: string;

    const userWithStripeCustomerId = await prisma.user.findUnique({
      where: { id: user.id },
      select: { stripeCustomerId: true },
    });

    if (userWithStripeCustomerId?.stripeCustomerId) {
      stripeCustomerId = userWithStripeCustomerId.stripeCustomerId;
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user.id,
        },
      });

      stripeCustomerId = customer.id;

      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: stripeCustomerId },
      });
    }

    // Use transaction for enrollment and checkout session creation
    const result = await prisma.$transaction(async (tx) => {
      const existingEnrollment = await tx.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: courseId,
          },
        },
        select: {
          status: true,
          id: true,
        },
      });

      if (existingEnrollment?.status === "Active") {
        return {
          status: "success",
          message: "You are already enrolled in this course.",
          // isAlreadyEnrolled: true,
        };
      }

      let enrollment;

      if (existingEnrollment) {
        enrollment = await tx.enrollment.update({
          where: { id: existingEnrollment.id },
          data: {
            amount: course.price,
            status: "Pending",
            updatedAt: new Date(),
          },
        });
      } else {
        enrollment = await tx.enrollment.create({
          data: {
            userId: user.id,
            courseId: course.id,
            amount: course.price,
            status: "Pending",
          },
        });
      }

      // Create checkout session with proper metadata
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        line_items: [
          {
            price: course.stripePriceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${env.BETTER_AUTH_URL}/payment/success?courseId=${course.id}`,
        cancel_url: `${env.BETTER_AUTH_URL}/payment/cancel?courseId=${course.id}`,
        metadata: {
          userId: user.id,
          courseId: course.id,
          enrollmentId: enrollment.id,
        },
        // Additional options for better UX
        payment_intent_data: {
          metadata: {
            userId: user.id,
            courseId: course.id,
            enrollmentId: enrollment.id,
          },
        },
        customer_update: {
          address: "auto",
        },
        billing_address_collection: "auto",
      });

      return {
        enrollment: enrollment,
        checkoutUrl: checkoutSession.url,
      };
    });

    // If already enrolled, return success response
    // if (result.isAlreadyEnrolled) {
    //   return result as ApiResponse;
    // }

    checkoutUrl = result.checkoutUrl as string;
  } catch (error) {
    console.error("Error in enrollInCourseAction:", error);

    if (error instanceof Stripe.errors.StripeError) {
      console.error("Stripe error:", error.message);
      return {
        status: "error",
        message: `Payment error: ${error.message}`,
      };
    }

    return {
      status: "error",
      message: "An error occurred while enrolling in the course.",
    };
  }

  if (!checkoutUrl) {
    return {
      status: "error",
      message: "Failed to create checkout session",
    };
  }

  redirect(checkoutUrl);
}
