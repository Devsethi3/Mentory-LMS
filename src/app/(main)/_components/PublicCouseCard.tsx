import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PublicCourseType } from "@/data/course/get-all-courses";
import { useConstructUrl } from "@/hooks/use-construct";
import { School, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PublicCourseCardProps {
  data: PublicCourseType;
}
const PublicCouseCard = ({ data }: PublicCourseCardProps) => {
  const thumbnailUrl = useConstructUrl(data.fileKey);
  return (
    <>
      <Card className="group relative py-0 gap-0">
        <Badge className="absolute top-2 right-2 z-10">{data.level}</Badge>

        <Image
          src={thumbnailUrl}
          alt="Thumbnail Image"
          width={600}
          height={400}
          className="w-full aspect-video rounded-t-xl h-full object-cover"
        />

        <CardContent className="p-4">
          <Link
            href={`/courses/${data.slug}`}
            className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary"
          >
            {data.title}
          </Link>
          <p className="line-clamp-2 text-sm text-muted-foreground mt-2 leading-tight">
            {data.smallDescription}
          </p>

          <div className="mt-4 flex items-center gap-x-5">
            <div className="flex items-center gap-x-2">
              <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
              <p className="text-sm text-muted-foreground">{data.duration}</p>
            </div>
            <div className="flex items-center gap-x-2">
              <School className="size-6 p-1 rounded-md text-primary bg-primary/10" />
              <p className="text-sm text-muted-foreground">{data.category}</p>
            </div>
          </div>

          <Link
            href={`/courses/${data.slug}`}
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

export default PublicCouseCard;

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
