import { adminGetLesson } from "@/data/admin/admin-get-lesson";
import LessonForm from "./_components/LessonForm";

type Params = Promise<{
  courseId: string;
  chapterId: string;
  lessonId: string;
}>;

const LessonIdPage = async ({ params }: { params: Params }) => {
  const { chapterId, lessonId, courseId } = await params;
  const lesson = await adminGetLesson(lessonId);
  return (
    <>
      <LessonForm data={lesson} chapterId={chapterId} courseId={courseId} />
    </>
  );
};

export default LessonIdPage;
