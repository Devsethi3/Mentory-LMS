"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tryCatch } from "@/hooks/try-catch";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteCourse } from "./actions";
import { Loader2, Trash2Icon } from "lucide-react";

const DeleteCoursePage = () => {
  const router = useRouter();
  const { courseId } = useParams<{ courseId: string }>();
  const [pending, startTransition] = useTransition();

  const onSubmit = async () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteCourse(courseId));

      if (error) {
        toast.error("An unexpected error occured. Please try again.");
      }

      if (result?.status === "success") {
        toast.success(result.message);
        router.push(`/admin/courses/`);
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <>
      <div className="max-w-xl mx-auto w-full">
        <Card className="mt-32">
          <CardHeader>
            <CardTitle>Are you sure you want to delete this course</CardTitle>
            <CardDescription>
              This action cannot be undone. All associated data will be
              permanently deleted.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Link
              href="/admin/courses"
              className={buttonVariants({
                variant: "outline",
              })}
            >
              Cancel
            </Link>

            <Button
              variant={"destructive"}
              disabled={pending}
              onClick={onSubmit}
            >
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2Icon className="size-4" />
                  Delete Course
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DeleteCoursePage;
