import { getLessonContent } from "@/data/course/get-lesson-content";
import CourseContent from "./_component/CourseContent";
import { Suspense } from "react";
import LessonSkeleton from "./_component/LessonSkeleton";

type Params = Promise<{ lessonId: string }>;

const LessonContentPage = async ({ params }: { params: Params }) => {
  const { lessonId } = await params;

  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LessonContentLoader lessonId={lessonId} />
    </Suspense>
  );
};

export default LessonContentPage;

async function LessonContentLoader({ lessonId }: { lessonId: string }) {
  const data = await getLessonContent(lessonId);

  return <CourseContent data={data} />;
}
