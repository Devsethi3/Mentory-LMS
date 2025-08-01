import { getIndividualCourse } from "@/data/course/get-all-course";
import { env } from "@/lib/env";
import Image from "next/image";
import Header from "../../_components/Header";
import { Badge } from "@/components/ui/badge";
import {
  IconBook,
  IconCategory,
  IconChartBar,
  IconChevronDown,
  IconClock,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import RenderDescription from "@/components/rich-text-editor/RenderDescription";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { checkIfCourseBought } from "@/data/user/user-is-enrolled";
import Link from "next/link";
import EnrollmentButton from "./_components/EnrollmentButton";

type Params = Promise<{ slug: string }>;

const SlugPage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const course = await getIndividualCourse(slug);
  const isEnrolled = await checkIfCourseBought(course.id);

  return (
    <>
      <Header />
      <div className="grid mt-24 mb-10 container grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="order-1 lg:col-span-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
            <Image
              src={`https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${course.fileKey}`}
              alt=""
              fill
              priority
              className="object-cover"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-green-500/20" /> */}
          </div>

          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <h1 className="lg:text-4xl md:text-3xl text-2xl bg-clip-text tracking-tight text-transparent bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
                {course.title}
              </h1>
              <p className="lg:text-lg text-base text-muted-foreground leading-tight line-clamp-2">
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
              <h2 className="text-2xl bg-clip-text tracking-tight text-transparent bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
                Course Description
              </h2>

              <RenderDescription json={JSON.parse(course.description)} />
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl bg-clip-text tracking-tight text-transparent bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
                Course Content
              </h2>
              <p className="text-sm">
                {course.chapter.length} chapter |{" "}
                {course.chapter.reduce(
                  (total, chapter) => total + chapter.lessons.length,
                  0
                ) || 0}{" "}
                Lessons
              </p>
            </div>

            <div className="space-y-1">
              {course.chapter.map((chapter, index) => (
                <Collapsible key={chapter.id} defaultOpen={index === 0}>
                  <Card className="py-0 overflow-hidden border-2 transition-all duration-200 hover:shadow-md gap-0">
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
                    <CollapsibleContent>
                      <div className="border-t bg-muted/20">
                        <div className="p-5 pt-4 space-y-3">
                          {chapter.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-4 rounded-lg p-3 hover:bg-accent group"
                            >
                              <div className="flex size-8 items-center justify-center rounded-full bg-background border-2 border-primary/20">
                                <IconPlayerPlay className="size-4 text-muted-foreground group-hover:text-primary" />
                              </div>

                              <div className="flex-1">
                                <p className="font-medium text-sm">
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Lesson {lessonIndex + 1}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>

        {/* Enrollment Card */}

        <div className="order-2 lg:col-span-1">
          <div className="sticky top-20">
            <Card className="py-0 gap-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-medium">Price</span>
                  <span className="text-2xl font-bold text-primary">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(course.price)}
                  </span>
                </div>
                <div className="space-y-4 mb-6 rounded-lg bg-muted p-4">
                  <h4 className="font-medium">What you will get:</h4>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <IconClock className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Course Duration</p>
                        <p className="text-sm text-muted-foreground">
                          {course.duration} minutes
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <IconChartBar className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Difficulty Level </p>
                        <p className="text-sm text-muted-foreground">
                          {course.level}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <IconCategory className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Category</p>
                        <p className="text-sm text-muted-foreground">
                          {course.category}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <IconBook className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Total Lessons</p>
                        <p className="text-sm text-muted-foreground">
                          {course.chapter.reduce(
                            (total, chapter) => total + chapter.lessons.length,
                            0
                          ) || 0}{" "}
                          Lessons
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-6 space-y-6">
                  <h4>This course includes:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="rounded-full p-1 bg-green-500/10 text-green-500">
                        <CheckIcon className="size-3" />
                      </div>
                      <span>Full lifetime access</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="rounded-full p-1 bg-green-500/10 text-green-500">
                        <CheckIcon className="size-3" />
                      </div>
                      <span>Access on mobile and desktop</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="rounded-full p-1 bg-green-500/10 text-green-500">
                        <CheckIcon className="size-3" />
                      </div>
                      <span>Certificate of completion</span>
                    </li>
                  </ul>
                </div>

                {isEnrolled ? (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({ className: "w-full" })}
                  >
                    <IconPlayerPlay className="inline size-4" />
                    Watch Now!
                  </Link>
                ) : (
                  <EnrollmentButton courseId={course.id} />
                )}

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  30-day money-back guarantee
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlugPage;
