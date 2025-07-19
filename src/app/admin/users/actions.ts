// lib/actions/admin.ts
"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: string, newRole: string) {
  // Check if current user is admin
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }

  // Validate role
  const validRoles = ["user", "admin", "instructor"];
  if (!validRoles.includes(newRole)) {
    throw new Error("Invalid role");
  }

  try {
    // Update user role
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    // Revalidate the admin users page
    revalidatePath("/admin/users");

    return { success: true };
  } catch (error) {
    console.error("Error updating user role:", error);
    throw new Error("Failed to update user role");
  }
}

export async function promoteUserToAdmin(email: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { role: "admin" },
    });

    revalidatePath("/admin/users");
    return { success: true, user };
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    throw new Error("Failed to promote user to admin");
  }
}
