import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminGetCourse } from "@/data/admin/admin-get-course";
import EditCourseForm from "./_components/EditCourseForm";
import CourseStructure from "./_components/CourseStructure";
import { ListIcon, PencilIcon } from "lucide-react";

type Params = Promise<{ courseId: string }>;

const EditCoursePage = async ({ params }: { params: Params }) => {
  const { courseId } = await params;
  const data = await adminGetCourse(courseId);
  return (
    <div>
      <h1 className="lg:text-3xl text-xl bg-clip-text tracking-tight text-transparent bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] mb-8">
        Edit Course:{" "}
        <span className="text-primary tracking-tight">{data.title}</span>
      </h1>

      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="basic-info">
            {" "}
            <PencilIcon className="size-3 mr-2" /> Basic Info
          </TabsTrigger>
          <TabsTrigger value="course-structure">
            <ListIcon className="size-3 mr-2" />
            Course Structure
          </TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>
                Provide basic information about the course
              </CardDescription>
            </CardHeader>
            <CardContent className="lg:px-6 px-4">
              <EditCourseForm data={data} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="course-structure">
          <Card>
            <CardHeader>
              <CardTitle>Course Structure</CardTitle>
              <CardDescription>
                Here&apos;s you can update your course structure
              </CardDescription>
            </CardHeader>
            <CardContent className="lg:px-6 px-4">
              <CourseStructure data={data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditCoursePage;
