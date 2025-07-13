import { buttonVariants } from "@/components/ui/button";
import { adminGetCourses } from "@/data/admin/admin-get-courses";
import Link from "next/link";
import React, { Suspense } from "react";
import AdminCourseCard, {
  AdminCourseCardSkeleton,
} from "./_components/AdminCourseCard";
import EmptyState from "@/components/general/EmptyState";

const CoursesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Link href="/admin/courses/create" className={buttonVariants()}>
          Create Course
        </Link>
      </div>

      <Suspense fallback={<AdminCourseCardSkeletonLayout />}>
        <RenderCourses />
      </Suspense>
    </div>
  );
};

export default CoursesPage;

async function RenderCourses() {
  const data = await adminGetCourses();

  return (
    <>
      {data.length === 0 ? (
        <EmptyState
          title="No Courses Found"
          description="Start building your educational content by creating your first course. You can add lessons, quizzes, and manage student enrollment."
          buttonText="Create Your First Course"
          href="/admin/courses/create"
        />
      ) : (
        <>
          {/* <p className="text-muted-foreground">
            Manage and organize all your courses from here
          </p> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
            {data.map((course) => (
              <AdminCourseCard key={course.id} data={course} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

function AdminCourseCardSkeletonLayout() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
      {Array.from({ length: 4 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}
