import { MorphingSquare } from "@/components/ui/morphing-square";

const LoadingPage = () => {
  return (
    <div>
      <div className="flex items-center justify-center w-full h-screen">
        <MorphingSquare message="Loading..." />
      </div>
    </div>
  );
};

export default LoadingPage;
