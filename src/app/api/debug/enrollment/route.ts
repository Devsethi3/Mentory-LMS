// /api/debug/enrollment/route.ts
// This is a temporary debug endpoint to check enrollment status

import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const enrollmentId = searchParams.get("enrollmentId");
    const userId = searchParams.get("userId");
    const courseId = searchParams.get("courseId");

    if (enrollmentId) {
      // Check specific enrollment
      const enrollment = await prisma.enrollment.findUnique({
        where: { id: enrollmentId },
        include: {
          Course: {
            select: {
              title: true,
              slug: true,
            },
          },
          User: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      });

      return NextResponse.json({
        enrollment,
        message: enrollment ? "Enrollment found" : "Enrollment not found",
      });
    }

    if (userId && courseId) {
      // Check enrollment by user and course
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
        include: {
          Course: {
            select: {
              title: true,
              slug: true,
            },
          },
          User: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      });

      return NextResponse.json({
        enrollment,
        message: enrollment ? "Enrollment found" : "Enrollment not found",
      });
    }

    // Get all pending enrollments
    const pendingEnrollments = await prisma.enrollment.findMany({
      where: {
        status: "Pending",
      },
      include: {
        Course: {
          select: {
            title: true,
            slug: true,
          },
        },
        User: {
          select: {
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return NextResponse.json({
      pendingEnrollments,
      count: pendingEnrollments.length,
      message: "Recent pending enrollments",
    });
  } catch (error) {
    console.error("Debug error:", error);
    return NextResponse.json({ error: "Debug error" }, { status: 500 });
  }
}

// POST endpoint to manually update enrollment status (for testing)
export async function POST(request: NextRequest) {
  try {
    const { enrollmentId, status } = await request.json();

    if (!enrollmentId || !status) {
      return NextResponse.json(
        { error: "Missing enrollmentId or status" },
        { status: 400 }
      );
    }

    const updatedEnrollment = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        status: status as "Active" | "Pending" | "Cancelled",
        updatedAt: new Date(),
      },
      include: {
        Course: {
          select: {
            title: true,
          },
        },
        User: {
          select: {
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      enrollment: updatedEnrollment,
      message: `Enrollment status updated to ${status}`,
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Update error" }, { status: 500 });
  }
}
