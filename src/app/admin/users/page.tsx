// app/admin/users/page.tsx
import { requireAdmin } from "@/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { UserManagement } from "./_components/UserManagement";

export default async function AdminUsersPage() {
  await requireAdmin();

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      banned: true,
      _count: {
        select: {
          courses: true,
          enrollment: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage user roles and permissions
        </p>
      </div>
      
      <UserManagement users={users} />
    </div>
  );
}