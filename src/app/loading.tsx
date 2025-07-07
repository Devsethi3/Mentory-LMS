import { Loader2 } from "lucide-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div>
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 className="animate-spin" size={24} />
      </div>
    </div>
  );
};

export default LoadingPage;
