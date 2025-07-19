import "server-only";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function checkIfCourseBought(courseId: string): Promise<boolean> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      console.log("👤 No user session found");
      return false;
    }

    console.log(
      "🔍 Checking enrollment for user:",
      session.user.id,
      "course:",
      courseId
    );

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          courseId: courseId,
          userId: session.user.id,
        },
      },
      select: {
        status: true,
        id: true,
        updatedAt: true,
      },
    });

    console.log("📊 Enrollment status:", enrollment?.status || "Not found");

    return enrollment?.status === "Active";
  } catch (error) {
    console.error("❌ Error checking course enrollment:", error);
    return false;
  }
}
