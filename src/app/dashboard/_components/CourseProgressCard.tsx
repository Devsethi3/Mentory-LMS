"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { EnrolledCourseType } from "@/data/user/get-enrolled-courses";
import { useConstructUrl } from "@/hooks/use-construct";
import { useCourseProgress } from "@/hooks/use-course-progress";
import Image from "next/image";
import Link from "next/link";

interface CourseProgressProps {
  data: EnrolledCourseType;
}
const CourseProgressCard = ({ data }: CourseProgressProps) => {
  const thumbnailUrl = useConstructUrl(data.Course.fileKey);

  const { totalLessons, completedLessons, progressPercentage } =
    useCourseProgress({ courseData: data.Course as any });

  return (
    <>
      <Card className="group relative py-0 gap-0">
        <Badge className="absolute top-2 right-2 z-10">
          {data.Course.level}
        </Badge>

        <Image
          src={thumbnailUrl}
          alt="Thumbnail Image"
          width={600}
          height={400}
          className="w-full aspect-video rounded-t-xl h-full object-cover"
        />

        <CardContent className="p-4">
          <Link
            href={`/dashboard/${data.Course.slug}`}
            className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary"
          >
            {data.Course.title}
          </Link>
          <p className="line-clamp-2 text-sm text-muted-foreground mt-2 leading-tight">
            {data.Course.smallDescription}
          </p>

          <div className="space-y-4 mt-5">
            <div className="flex justify-between mb-1 text-sm">
              <p>Progress:</p>
              <p>{progressPercentage}%</p>
            </div>
            <Progress value={progressPercentage} className="h-1.5" />
            <p className="text-xs text-muted-foreground">
              {completedLessons} of {totalLessons} lessons completed
            </p>
          </div>
          <Link
            href={`/dashboard/${data.Course.slug}`}
            className={buttonVariants({
              className: "w-full mt-4",
            })}
          >
            Learn More
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

export default CourseProgressCard;

export function PublicCourseCardSkeleton() {
  return (
    <Card className="group relative py-0 gap-0">
      {/* Badge skeleton */}
      <div className="absolute top-2 right-2 z-10">
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      {/* Thumbnail image skeleton */}
      <Skeleton className="w-full aspect-video rounded-t-xl h-full" />

      <CardContent className="p-4">
        {/* Title skeleton */}
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-4" />

        {/* Small description skeleton */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />

        {/* Duration and category info skeleton */}
        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Learn More button skeleton */}
        <Skeleton className="w-full h-10 mt-4 rounded-md" />
      </CardContent>
    </Card>
  );
}
