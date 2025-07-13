import { getIndividualCourse } from "@/data/course/get-all-course";
import { env } from "@/lib/env";
import Image from "next/image";
import Header from "../../_components/Header";
import { Badge } from "@/components/ui/badge";
import {
  IconCategory,
  IconChartBar,
  IconChevronDown,
  IconClock,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import RenderDescription from "@/components/rich-text-editor/RenderDescription";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";

type Params = Promise<{ slug: string }>;

const SlugPage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const course = await getIndividualCourse(slug);
  return (
    <>
      <Header />
      <div className="grid my-24 container grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="order-1 lg:col-span-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
            <Image
              src={`https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${course.fileKey}`}
              alt=""
              fill
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-green-500/20" />
          </div>

          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                {course.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-tight line-clamp-2 ">
                {course.smallDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge className="flex items-center gap-1 px-3 py-1">
                <IconChartBar className="size-4" />
                <span>{course.level}</span>
              </Badge>
              <Badge className="flex items-center gap-1 px-3 py-1">
                <IconCategory className="size-4" />
                <span>{course.category}</span>
              </Badge>
              <Badge className="flex items-center gap-1 px-3 py-1">
                <IconClock className="size-4" />
                <span>{course.duration} Minutes</span>
              </Badge>
            </div>

            <Separator className="my-8" />

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight">
                Course Description
              </h2>

              <RenderDescription json={JSON.parse(course.description)} />
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold tracking-tight">
                Course Content
              </h2>
              <div>
                {course.chapter.length} chapter |{" "}
                {course.chapter.reduce(
                  (total, chapter) => total + chapter.lessons.length,
                  0
                ) || 0}{" "}
                Lessons
              </div>
            </div>

            <div className="space-y-1">
              {course.chapter.map((chapter, index) => (
                <Collapsible key={chapter.id} defaultOpen={index === 0}>
                  <Card className="py-0 overflow-hidden border-2 transition-all duration-200 hover:shadow-md">
                    <CollapsibleTrigger>
                      <div>
                        <CardContent className="p-6 hover:bg-muted/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <p className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                                {index + 1}
                              </p>
                              <div>
                                <h3 className="text-lg font-semibold text-left">
                                  {chapter.title}
                                </h3>
                                <p className="text-sm text-muted-foreground m-1 text-left">
                                  {chapter.lessons.length} lesson
                                  {chapter.lessons.length !== 1 ? "s" : ""}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className="text-xs" variant="outline">
                                {chapter.lessons.length} lesson
                                {chapter.lessons.length !== 1 ? "s" : ""}
                              </Badge>
                              <IconChevronDown className="size-5 text-muted-foreground" />
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </CollapsibleTrigger>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlugPage;

// git commit message for making this page rendering lessons and chapters just share the git message nothing else