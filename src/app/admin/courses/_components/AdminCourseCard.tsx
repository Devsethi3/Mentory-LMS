import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminCourseType } from "@/data/admin/admin-get-courses";
import { useConstructUrl } from "@/hooks/use-construct";
import {
  EyeIcon,
  MoreVerticalIcon,
  PencilIcon,
  School,
  TimerIcon,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AdminCourseCardProps {
  data: AdminCourseType;
}

const AdminCourseCard = ({ data }: AdminCourseCardProps) => {
  const thumbnailUrl = useConstructUrl(data.fileKey);
  console.log(thumbnailUrl);

  return (
    <div>
      <Card className="group relative py-0 gap-0 rounded-lg">
        <div className="absolute top-2 right-2 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon">
                <MoreVerticalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href={`/admin/courses/${data.id}/edit`}>
                  <PencilIcon className="size-4 mr-2" />
                  Edit Course
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/admin/courses/${data.slug}`}>
                  <EyeIcon className="size-4 mr-2" />
                  Preview{" "}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/admin/courses/${data.id}/delete`}>
                  <Trash2Icon className="size-4 mr-2 text-destructive" />
                  Delete Course
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* <Image  /> */}
        <Image
          src={thumbnailUrl}
          alt="Thumbnail Image"
          width={600}
          height={400}
          className="w-full rounded-t-lg aspect-video h-full object-cover"
        />

        <CardContent className="py-6">
          <Link
            href={`/admin/courses/${data.id}/edit`}
            className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary"
          >
            {data.title}
          </Link>

          <p className="line-clamp-2 text-sm text-muted-foreground mt-2 leading-tight">
            {data.smallDescription}
          </p>

          <div className="mt-4 flex items-center gap-x-5">
            <div className="gap-x-2 flex items-center">
              <TimerIcon className="size-4 p-1 rounded-md text-primary bg-primary/10" />
              <p className="text-sm text-muted-foreground">{data.duration}</p>
            </div>
            <div className="gap-x-2 flex items-center">
              <School className="size-4 p-1 rounded-md text-primary bg-primary/10" />
              <p className="text-sm text-muted-foreground">{data.level}</p>
            </div>
          </div>

          <Link
            href={`/admin/courses/${data.id}/edit`}
            className={buttonVariants({
              className: "w-full mt-2",
            })}
          >
            Edit Course
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCourseCard;
