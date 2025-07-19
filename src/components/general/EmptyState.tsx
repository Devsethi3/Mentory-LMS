import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Image from "next/image";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

const EmptyState = ({
  title,
  description,
  buttonText,
  href,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
 
      <Image
        src="/course-empty-state.svg"
        alt="No Course"
        width={200}
        height={200}
      />

      <h2 className="text-2xl mt-4 font-semibold text-foreground mb-2 text-center">
        {title}
      </h2>

      <p className="text-sm text-muted-foreground text-center max-w-sm mb-8 leading-relaxed">
        {description}
      </p>

      <Link href={href} className={buttonVariants({ size: "lg" })}>
        <PlusCircle className="w-4 h-4 mr-2" />
        {buttonText}
      </Link>
    </div>
  );
};

export default EmptyState;
