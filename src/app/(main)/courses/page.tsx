import Header from "@/app/(main)/_components/Header";
import { getAllCourses } from "@/data/course/get-all-courses";
import PublicCouseCard, {
  PublicCourseCardSkeleton,
} from "../_components/PublicCouseCard";
import { Suspense } from "react";
import { BookOpen, Search } from "lucide-react";

const PublicCoursePage = () => {
  return (
    <>
      <Header />
      <div className="mt-24 mb-10 container">
        <Suspense fallback={<LoadingSkeletonLayout />}>
          <RenderCourses />
        </Suspense>
      </div>
    </>
  );
};

export default PublicCoursePage;

async function RenderCourses() {
  const courses = await getAllCourses();

  if (!courses || courses.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="flex flex-col space-y-2 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
          Explore Courses
        </h1>
        <p className="text-muted-foreground">
          Discover our wide range of courses designed to help you achieve your
          learning goals
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <PublicCouseCard key={course.id} data={course} />
        ))}
      </div>
    </>
  );
}

function LoadingSkeletonLayout() {
  return (
    <>
      <div className="flex flex-col space-y-2 mb-10">
        <div className="h-10 bg-muted rounded-lg animate-pulse w-80"></div>
        <div className="h-6 bg-muted rounded-lg animate-pulse w-96"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <PublicCourseCardSkeleton key={index} />
        ))}
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
      {/* Animated Icon Container */}
      <div className="relative">
        <div className="w-24 h-24 bg-card border rounded-full flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 animate-pulse rounded-full"></div>
          <BookOpen className="w-10 h-10 text-primary relative z-10" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 max-w-md">
        <h2 className="text-2xl font-semibold text-foreground">
          No Courses Available Yet
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We&apos;re working hard to bring you amazing learning experiences. Check
          back soon for exciting new courses!
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200 shadow-lg hover:shadow-xl">
          <Search className="w-4 h-4 mr-2" />
          Browse Categories
        </button>
        <button className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors duration-200 border border-border">
          Get Notified
        </button>
      </div>
    </div>
  );
}
