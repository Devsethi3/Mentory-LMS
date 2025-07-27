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
import { Loader2, Trash2Icon, AlertTriangle, ArrowLeft } from "lucide-react";

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
    <div className="bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="max-w-lg mx-auto w-full">
        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center border border-destructive/20">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <div className="absolute inset-0 bg-destructive/5 rounded-full animate-pulse" />
          </div>
        </div>

        <Card className="border-destructive/20 shadow-lg backdrop-blur-sm bg-card/95">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-semibold text-destructive flex items-center justify-center gap-2">
              <Trash2Icon className="w-6 h-6" />
              Delete Course
            </CardTitle>
            <CardDescription className="text-base leading-relaxed mt-2">
              This action cannot be undone. The course and all associated data
              including:
            </CardDescription>
            <div className="mt-3 space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 bg-destructive/60 rounded-full" />
                <span>Course content and materials</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 bg-destructive/60 rounded-full" />
                <span>Student enrollments and progress</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 bg-destructive/60 rounded-full" />
                <span>Analytics and statistics</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3 font-medium">
              will be permanently deleted.
            </p>
          </CardHeader>

          <CardContent className="pt-2">
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-destructive font-medium text-center">
                ⚠️ This action is irreversible and cannot be undone
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/admin/courses"
                className={buttonVariants({
                  variant: "outline",
                  className: "flex-1 h-11",
                })}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cancel
              </Link>

              <Button
                variant="destructive"
                disabled={pending}
                onClick={onSubmit}
                className="flex-1 h-11 font-medium"
              >
                {pending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting Course...
                  </>
                ) : (
                  <>
                    <Trash2Icon className="w-4 h-4 mr-2" />
                    Yes, Delete Course
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeleteCoursePage;
