// /app/api/test-enrollment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get all pending enrollments for this user
    const pendingEnrollments = await prisma.enrollment.findMany({
      where: {
        userId: session.user.id,
        status: "Pending",
      },
      include: {
        Course: {
          select: {
            title: true,
            slug: true,
            stripePriceId: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      userId: session.user.id,
      pendingEnrollments: pendingEnrollments.map((e) => ({
        id: e.id,
        courseId: e.courseId,
        courseName: e.Course.title,
        courseSlug: e.Course.slug,
        status: e.status,
        amount: e.amount,
        createdAt: e.createdAt,
        stripePriceId: e.Course.stripePriceId,
      })),
    });
  } catch (error) {
    console.error("Error in test enrollment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const { action, enrollmentId, courseId } = body;

    if (action === "simulate_webhook") {
      if (!enrollmentId) {
        return NextResponse.json(
          { error: "enrollmentId required" },
          { status: 400 }
        );
      }

      // Find the enrollment
      const enrollment = await prisma.enrollment.findUnique({
        where: { id: enrollmentId },
        include: {
          User: {
            select: {
              id: true,
              email: true,
              stripeCustomerId: true,
            },
          },
          Course: {
            select: {
              id: true,
              title: true,
              slug: true,
              stripePriceId: true,
              price: true,
            },
          },
        },
      });

      if (!enrollment) {
        return NextResponse.json(
          { error: "Enrollment not found" },
          { status: 404 }
        );
      }

      if (enrollment.userId !== session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      // Simulate webhook by updating enrollment to Active
      const updatedEnrollment = await prisma.enrollment.update({
        where: { id: enrollmentId },
        data: {
          status: "Active",
          updatedAt: new Date(),
        },
        include: {
          Course: {
            select: {
              title: true,
              slug: true,
            },
          },
        },
      });

      console.log("🧪 Test webhook simulation - Enrollment activated:", {
        enrollmentId: updatedEnrollment.id,
        userId: updatedEnrollment.userId,
        courseId: updatedEnrollment.courseId,
        courseName: updatedEnrollment.Course.title,
        newStatus: updatedEnrollment.status,
      });

      return NextResponse.json({
        success: true,
        message: "Webhook simulated successfully",
        enrollment: {
          id: updatedEnrollment.id,
          status: updatedEnrollment.status,
          courseName: updatedEnrollment.Course.title,
          courseSlug: updatedEnrollment.Course.slug,
        },
      });
    }

    if (action === "create_test_enrollment") {
      if (!courseId) {
        return NextResponse.json(
          { error: "courseId required" },
          { status: 400 }
        );
      }

      // Check if course exists
      const course = await prisma.course.findUnique({
        where: { id: courseId },
        select: {
          id: true,
          title: true,
          price: true,
          stripePriceId: true,
        },
      });

      if (!course) {
        return NextResponse.json(
          { error: "Course not found" },
          { status: 404 }
        );
      }

      // Check for existing enrollment
      const existingEnrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: session.user.id,
            courseId: courseId,
          },
        },
      });

      if (existingEnrollment) {
        return NextResponse.json({
          success: true,
          message: "Enrollment already exists",
          enrollment: {
            id: existingEnrollment.id,
            status: existingEnrollment.status,
            existing: true,
          },
        });
      }

      // Create new enrollment
      const newEnrollment = await prisma.enrollment.create({
        data: {
          userId: session.user.id,
          courseId: courseId,
          amount: course.price,
          status: "Pending",
        },
      });

      console.log("🧪 Test enrollment created:", {
        enrollmentId: newEnrollment.id,
        userId: newEnrollment.userId,
        courseId: newEnrollment.courseId,
        courseName: course.title,
        status: newEnrollment.status,
      });

      return NextResponse.json({
        success: true,
        message: "Test enrollment created",
        enrollment: {
          id: newEnrollment.id,
          status: newEnrollment.status,
          courseName: course.title,
          amount: newEnrollment.amount,
        },
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error in test enrollment POST:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
