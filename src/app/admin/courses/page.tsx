import { buttonVariants } from "@/components/ui/button";
import { adminGetCourses } from "@/data/admin/admin-get-courses";
import Link from "next/link";
import React from "react";
import AdminCourseCard from "./_components/AdminCourseCard";

const CoursesPage = async () => {
  const data = await adminGetCourses();
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Link href="/admin/courses/create" className={buttonVariants()}>
          Create Course
        </Link>
      </div>

      <h1>Here you will see all of the courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
        {data.map((course) => (
          <AdminCourseCard key={course.id} data={course} />
        ))}
      </div>
    </>
  );
};

export default CoursesPage;
