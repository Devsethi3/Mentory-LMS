import EmptyState from "@/components/general/EmptyState";
import { getAllCourses } from "@/data/course/get-all-courses";
import { getEnrolledCourses } from "@/data/user/get-enrolled-courses";
import PublicCourseCard from "../(main)/_components/PublicCouseCard";
import Link from "next/link";
import CourseProgressCard from "./_components/CourseProgressCard";

const DashboardPage = async () => {
  const [courses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Enrolled Courses</h1>
        <p>Here you can see all the courses you have access to</p>
      </div>

      {enrolledCourses.length === 0 ? (
        <EmptyState
          title="No course purchased"
          description="You have't purchased any courses yet!"
          buttonText="Browse Courses"
          href="/courses"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map((course) => (
            <CourseProgressCard key={course.Course.id} data={course} />
          ))}
        </div>
      )}

      <section className="mt-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Available Courses</h1>
          <p>Here you can see all the courses you purchased</p>
        </div>

        {courses.filter(
          (course) =>
            !enrolledCourses.some(
              ({ Course: enrolled }) => enrolled.id === course.id
            )
        ).length === 0 ? (
          <EmptyState
            title="No Course Available"
            description="You have already purchased all available courses"
            buttonText="Browse Courses"
            href="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses
              .filter(
                (course) =>
                  !enrolledCourses.some(
                    ({ Course: enrolled }) => enrolled.id === course.id
                  )
              )
              .map((course) => (
                <PublicCourseCard key={course.id} data={course} />
              ))}
          </div>
        )}
      </section>
    </>
  );
};

export default DashboardPage;
