import { getIndividualCourse } from "@/data/course/get-all-course";
import { env } from "@/lib/env";
import Image from "next/image";
import Header from "../../_components/Header";

type Params = Promise<{ slug: string }>;

const SlugPage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const course = await getIndividualCourse(slug);
  return (
    <>
      <Header />
      <div className="grid mt-24 container grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="order-1 lg:col-span-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
            <Image
              src={`https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${course.fileKey}`}
              alt=""
              fill
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SlugPage;
