"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Shield, ShieldCheck, UserX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { updateUserRole } from "../actions";

interface User {
  id: string;
  name: string;
  email: string;
  role: string | null;
  createdAt: Date;
  banned: boolean | null;
  _count: {
    courses: number;
    enrollment: number;
  };
}

interface UserManagementProps {
  users: User[];
}

export function UserManagement({ users }: UserManagementProps) {
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    setIsUpdating(userId);
    try {
      await updateUserRole(userId, newRole);
      toast.success(`User role updated to ${newRole}`);
      // Refresh the page to show updated data
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update user role");
    } finally {
      setIsUpdating(null);
    }
  };

  const getRoleBadge = (role: string | null) => {
    switch (role) {
      case "admin":
        return (
          <Badge variant="destructive" className="gap-1">
            <ShieldCheck className="size-3" />
            Admin
          </Badge>
        );
      case "instructor":
        return (
          <Badge variant="secondary" className="gap-1">
            <Shield className="size-3" />
            Instructor
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="gap-1">
            <UserX className="size-3" />
            User
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Users</CardTitle>
        <CardDescription>
          Manage user roles and permissions. Total users: {users.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Enrollments</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{user._count.courses}</TableCell>
                <TableCell>{user._count.enrollment}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant={user.banned ? "destructive" : "default"}>
                    {user.banned ? "Banned" : "Active"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        disabled={isUpdating === user.id}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleRoleUpdate(user.id, "admin")}
                        disabled={user.role === "admin"}
                      >
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Make Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRoleUpdate(user.id, "instructor")}
                        disabled={user.role === "instructor"}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Make Instructor
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRoleUpdate(user.id, "user")}
                        disabled={user.role === "user" || user.role === null}
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        Make User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
