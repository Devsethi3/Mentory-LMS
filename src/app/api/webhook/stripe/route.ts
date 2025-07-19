// /api/webhook/stripe
import Stripe from "stripe";
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();

  const headersList = await headers();
  const signature = headersList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log("Webhook signature verification failed:", error);
    return new Response("Webhook error", { status: 400 });
  }

  console.log("Received Stripe event:", event.type);

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const courseId = session.metadata?.courseId;
    const enrollmentId = session.metadata?.enrollmentId;
    const userId = session.metadata?.userId;
    const customerId = session.customer as string;

    console.log("Processing checkout session:", {
      courseId,
      enrollmentId,
      userId,
      customerId,
    });

    if (!courseId || !enrollmentId) {
      console.error("Missing required metadata:", { courseId, enrollmentId });
      return new Response("Missing metadata", { status: 400 });
    }

    try {
      // Use transaction to ensure data consistency
      await prisma.$transaction(async (tx) => {
        // Verify enrollment exists and is in correct state
        const enrollment = await tx.enrollment.findUnique({
          where: { id: enrollmentId },
          include: { User: true, Course: true },
        });

        if (!enrollment) {
          throw new Error(`Enrollment ${enrollmentId} not found`);
        }

        if (enrollment.status === "Active") {
          console.log("Enrollment already active, skipping update");
          return;
        }

        // Convert amount from cents to dollars (Stripe uses cents)
        const amountInDollars = (session.amount_total as number) / 100;

        // Update enrollment to Active
        await tx.enrollment.update({
          where: { id: enrollmentId },
          data: {
            status: "Active",
            amount: amountInDollars,
            updatedAt: new Date(),
          },
        });

        console.log(
          `Successfully activated enrollment ${enrollmentId} for user ${enrollment.userId}`
        );
      });
    } catch (error) {
      console.error("Error processing webhook:", error);
      return new Response("Internal server error", { status: 500 });
    }
  }

  return new Response(null, { status: 200 });
}
