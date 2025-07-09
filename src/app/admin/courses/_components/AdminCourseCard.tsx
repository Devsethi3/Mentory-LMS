import { Card } from "@/components/ui/card";
import { AdminCourseType } from "@/data/admin/admin-get-courses";
import Image from "next/image";

interface AdminCourseCardProps {
  data: AdminCourseType;
}

const AdminCourseCard = ({ data }: AdminCourseCardProps) => {
  return (
    <div>
      <Card className="group relative">
        <div></div>

        {/* <Image  /> */}
        <Image
          src={data.fileKey}
          alt="Thumbnail Image"
          width={600}
          height={400}
        />
      </Card>
    </div>
  );
};

export default AdminCourseCard;
