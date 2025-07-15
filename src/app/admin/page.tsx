import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";
import { buttonVariants } from "@/components/ui/button";
import { adminGetEnrollmentStats } from "@/data/admin/admin-get-enrollment-stats";
import { adminGetRecentCourses } from "@/data/admin/admin-get-recent-courses";
import Link from "next/link";
import EmptyState from "@/components/general/EmptyState";
import AdminCourseCard from "./courses/_components/AdminCourseCard";
import { Suspense } from "react";

const AdminIndexPage = async () => {
  const enrollmentData = await adminGetEnrollmentStats();
  return (
    <>
      <SectionCards />
      <ChartAreaInteractive data={enrollmentData} />

      <div className="space-y-4">
        <div className="flex items-center justify-baseline">
          <h2 className="text-xl font-semibold">Recent Courses</h2>{" "}
          <Link
            href="/admin/courses"
            className={buttonVariants({ variant: "outline" })}
          >
            View All Courses
          </Link>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <RenderRecentCourses />
        </Suspense>
      </div>
    </>
  );
};

export default AdminIndexPage;

async function RenderRecentCourses() {
  const data = await adminGetRecentCourses();

  if (data.length === 0) {
    return (
      <EmptyState
        buttonText="Create New Course"
        description="You don't have any courses. Create some courses to see them here"
        title="You don't have any courses yet!"
        href="/admin/courses/create"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((course) => (
        <AdminCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}
