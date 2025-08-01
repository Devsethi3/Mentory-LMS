"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { CourseSidebarDataType } from "@/data/course/get-course-sidebar-data";
import { ChevronDown, Play } from "lucide-react";
import LessonItem from "./LessonItem";
import { usePathname } from "next/navigation";
import { useCourseProgress } from "@/hooks/use-course-progress";

interface CourseSidebarProps {
  course: CourseSidebarDataType["course"];
}

const CourseSidebar = ({ course }: CourseSidebarProps) => {
  const pathname = usePathname();
  const currentLessonId = pathname.split("/").pop();

  const { completedLessons, progressPercentage, totalLessons } =
    useCourseProgress({ courseData: course });

  return (
    <div className="flex flex-col h-full">
      <div className="pb-4 pr-4 border-b border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Play className="size-5 text-primary" />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-base leading-tight truncate">
              {course.title}
            </h1>
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {course.category}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium lg:pr-0 pr-3">
              {completedLessons}/{totalLessons} lessons
            </span>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />
          <p className="text-xs text-muted-foreground">
            {progressPercentage}% complete
          </p>
        </div>
      </div>

      <div className="py-4 pr-4 space-y-3">
        {course.chapter.map((chapter, index) => (
          <Collapsible key={chapter.id} defaultOpen={index === 0}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full p-3 h-auto flex items-center gap-2"
              >
                <div className="shrink-0">
                  <ChevronDown className="size-4 text-primary" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-semibold text-sm truncate text-foreground">
                    {chapter.position}: {chapter.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium truncate">
                    {chapter.lessons.length} lessons
                  </p>
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 pl-5 border-l-2 space-y-3">
              {chapter.lessons.map((lesson) => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  slug={course.slug}
                  isActive={currentLessonId === lesson.id}
                  completed={
                    lesson.lessonProgress.find(
                      (progress) => progress.lessonId === lesson.id
                    )?.completed || false
                  }
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;

