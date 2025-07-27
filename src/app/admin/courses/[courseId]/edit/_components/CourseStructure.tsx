"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DndContext,
  DragEndEvent,
  DraggableSyntheticListeners,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ReactNode, useEffect, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { AdminCourseSingularType } from "@/data/admin/admin-get-course";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  GripVertical,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { reorderChapter, reorderLessons } from "../actions";
import NewChapterModal from "./NewChapterModal";
import NewLessonModal from "./NewLessonModal";
import DeleteLesson from "./DeleteLesson";
import DeleteChapter from "./DeleteChapter";

interface CourseStructureProps {
  data: AdminCourseSingularType;
}

interface SortableItemsProps {
  id: string;
  children: (listeners: DraggableSyntheticListeners) => ReactNode;
  className?: string;
  data?: {
    type: "chapter" | "lesson";
    chapterId?: string;
  };
}

const CourseStructure = ({ data }: CourseStructureProps) => {
  const initialItems =
    data.chapter.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      order: chapter.position,
      isOpen: true,
      lessons: chapter.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        order: lesson.position,
      })),
    })) || [];

  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems((prevItems) => {
      const updatedItems =
        data.chapter.map((chapter) => ({
          id: chapter.id,
          title: chapter.title,
          order: chapter.position,
          isOpen:
            prevItems.find((item) => item.id === chapter.id)?.isOpen ?? true,
          lessons: chapter.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            order: lesson.position,
          })),
        })) || [];

      return updatedItems;
    });
  }, [data]);

  function SortableItem({ children, id, className, data }: SortableItemsProps) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: id, data: data });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={cn("touch-none", className, isDragging && "z-10")}
      >
        {children(listeners)}
      </div>
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;
    const activeType = active.data.current?.type as "chapter" | "lesson";
    const overType = over.data.current?.type as "chapter" | "lesson";
    const courseId = data.id;

    if (activeType === "chapter") {
      let targetChapterId = null;

      if (overType === "chapter") {
        targetChapterId = overId;
      } else if (overType === "lesson") {
        targetChapterId = over.data.current?.chapterId ?? null;
      }

      if (!targetChapterId) {
        toast.error("Could not determine the chapter for rendering");
        return;
      }

      const oldIndex = items.findIndex((item) => item.id === activeId);
      const newIndex = items.findIndex((item) => item.id === targetChapterId);

      if (oldIndex === -1 || newIndex === -1) {
        toast.error("Cannot move chapter to this position");
        return;
      }

      const reorderedLocalChapter = arrayMove(items, oldIndex, newIndex);
      const updatedChapterForSate = reorderedLocalChapter.map(
        (chapter, index) => ({
          ...chapter,
          order: index + 1,
        })
      );

      const previousItems = [...items];
      setItems(updatedChapterForSate);

      if (courseId) {
        const chaptersToUpdate = updatedChapterForSate.map((chapter) => ({
          id: chapter.id,
          position: chapter.order,
        }));

        const reorderPromise = () => reorderChapter(courseId, chaptersToUpdate);

        toast.promise(reorderPromise(), {
          loading: "Reordering Chapters...",
          success: (result) => {
            if (result.status === "success") return result.message;
            throw new Error(result.message);
          },
          error: () => {
            setItems(previousItems);
            return "Failed to reorder chapters";
          },
        });
      }

      return;
    }

    if (activeType === "lesson" && overType === "lesson") {
      const chapterId = active.data.current?.chapterId;
      const overChapterId = over.data.current?.chapterId;

      if (!chapterId || chapterId !== overChapterId) {
        toast.error(
          "Lesson move between chapters or invalid chapterId is not allowed"
        );
        return;
      }

      const chapterIndex = items.findIndex(
        (chapter) => chapter.id === chapterId
      );

      if (chapterIndex === -1) {
        toast.error("Could not find chapter for lesson");
        return;
      }

      const chapterToUpdate = items[chapterIndex];
      const oldLessonIndex = chapterToUpdate.lessons.findIndex(
        (lesson) => lesson.id === active.id
      );
      const newLessonIndex = chapterToUpdate.lessons.findIndex(
        (lesson) => lesson.id === overId
      );

      const reorderedLessons = arrayMove(
        chapterToUpdate.lessons,
        oldLessonIndex,
        newLessonIndex
      );

      const updatedLessonForState = reorderedLessons.map((lesson, index) => ({
        ...lesson,
        order: index + 1,
      }));

      const newItems = [...items];
      newItems[chapterIndex] = {
        ...chapterToUpdate,
        lessons: updatedLessonForState,
      };

      const previousItems = [...items];
      setItems(newItems);

      if (courseId) {
        const lessonsToUpdate = updatedLessonForState.map((lesson) => ({
          id: lesson.id,
          position: lesson.order,
        }));
        const reorderedLessonPromise = () =>
          reorderLessons(chapterId, lessonsToUpdate, courseId);

        toast.promise(reorderedLessonPromise(), {
          loading: "Reordering Lessons...",
          success: (result) => {
            if (result.status === "success") return result.message;
            throw new Error(result.message);
          },
          error: () => {
            setItems(previousItems);
            return "Failed to reorder lessons";
          },
        });
      }

      return;
    }
  }

  const toggleChapter = (chapterId: string) => {
    setItems(
      items.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isOpen: !chapter.isOpen }
          : chapter
      )
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border p-4 sm:p-6 space-y-3 sm:space-y-0">
          <CardTitle className="text-lg sm:text-xl">Chapters</CardTitle>
          <NewChapterModal courseId={data.id} />
        </CardHeader>

        <CardContent className="p-3 sm:p-4 lg:p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center px-4">
              <BookOpen className="size-12 sm:size-16 text-muted-foreground mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                No chapters yet
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 max-w-md leading-relaxed">
                Get started by creating your first chapter. Chapters help
                organize your course content and make it easier for students to
                follow along.
              </p>
              <NewChapterModal courseId={data.id} />
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              <SortableContext
                strategy={verticalListSortingStrategy}
                items={items}
              >
                {items.map((item) => (
                  <SortableItem
                    key={item.id}
                    id={item.id}
                    data={{ type: "chapter" }}
                  >
                    {(listeners) => (
                      <Card className="overflow-hidden">
                        <Collapsible
                          open={item.isOpen}
                          onOpenChange={() => toggleChapter(item.id)}
                        >
                          {/* Chapter Header */}
                          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border bg-muted/30">
                            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                              <Button
                                variant="outline"
                                size="icon"
                                className="size-8 sm:size-9 shrink-0"
                                {...listeners}
                              >
                                <GripVertical className="size-3 sm:size-4" />
                              </Button>
                              <CollapsibleTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="size-8 sm:size-9 shrink-0"
                                >
                                  {item.isOpen ? (
                                    <ChevronDown className="size-3 sm:size-4" />
                                  ) : (
                                    <ChevronRight className="size-3 sm:size-4" />
                                  )}
                                </Button>
                              </CollapsibleTrigger>
                              <h4
                                className="cursor-pointer hover:text-primary text-sm sm:text-base lg:text-lg font-medium line-clamp-1 flex-1"
                                onClick={() => toggleChapter(item.id)}
                              >
                                {item.title}
                              </h4>
                            </div>
                            <div className="shrink-0 ml-2">
                              <DeleteChapter
                                chapterId={item.id}
                                courseId={data.id}
                              />
                            </div>
                          </div>

                          {/* Chapter Content */}
                          <CollapsibleContent>
                            <div className="p-2 sm:p-3">
                              <SortableContext
                                items={item.lessons.map((lesson) => lesson.id)}
                                strategy={verticalListSortingStrategy}
                              >
                                <div className="space-y-1 sm:space-y-2">
                                  {item.lessons.map((lesson) => (
                                    <SortableItem
                                      key={lesson.id}
                                      data={{
                                        type: "lesson",
                                        chapterId: item.id,
                                      }}
                                      id={lesson.id}
                                    >
                                      {(lessonListeners) => (
                                        <div className="flex items-center justify-between p-2 sm:p-3 hover:bg-accent rounded-md transition-colors group">
                                          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="size-7 sm:size-8 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                                              {...lessonListeners}
                                            >
                                              <GripVertical className="size-3 sm:size-4" />
                                            </Button>
                                            <FileText className="size-3 sm:size-4 text-muted-foreground shrink-0" />
                                            <Link
                                              href={`/admin/courses/${data.id}/${item.id}/${lesson.id}`}
                                              className="text-sm sm:text-base line-clamp-1 hover:text-primary transition-colors flex-1"
                                            >
                                              {lesson.title}
                                            </Link>
                                          </div>
                                          <div className="shrink-0 ml-2">
                                            <DeleteLesson
                                              chapterId={item.id}
                                              courseId={data.id}
                                              lessonId={lesson.id}
                                            />
                                          </div>
                                        </div>
                                      )}
                                    </SortableItem>
                                  ))}
                                </div>
                              </SortableContext>

                              {/* New Lesson Button */}
                              <div className="pt-3 sm:pt-4 border-t border-border/50 mt-3 sm:mt-4">
                                <NewLessonModal
                                  chapterId={item.id}
                                  courseId={data.id}
                                />
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </Card>
                    )}
                  </SortableItem>
                ))}
              </SortableContext>
            </div>
          )}
        </CardContent>
      </Card>
    </DndContext>
  );
};

export default CourseStructure;
