import { getIndividualCourse } from "@/data/course/get-all-course";
import { env } from "@/lib/env";
import Image from "next/image";
import Header from "../../_components/Header";
import { Badge } from "@/components/ui/badge";
import { IconCategory, IconChartBar, IconClock } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";

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

              <div>{course.description}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlugPage;
