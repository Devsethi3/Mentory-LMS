import { getCourseSidebarData } from "@/data/course/get-course-sidebar-data";
import { redirect } from "next/navigation";

interface CourseSlugProps {
  params: Promise<{ slug: string }>;
}

const CourseSlugPage = async ({ params }: CourseSlugProps) => {
  const { slug } = await params;

  const course = await getCourseSidebarData(slug);

  const firstChapter = course?.course.chapter[0];
  const firstLesson = firstChapter?.lessons[0];

  if (firstLesson) {
    redirect(`/dashboard/${slug}/${firstLesson.id}`);
  }
  return (
    <div className="flex items-center justify-center h-full text-center">
      <h2 className="text-2xl font-bold mb-2">No Lesson available</h2>
      <p>This course does not have any lessons yet!</p>
    </div>
  );
};

export default CourseSlugPage;
