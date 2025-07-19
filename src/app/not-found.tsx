import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you are looking for doesn&apos;t exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            className={buttonVariants({
              variant: "outline",
            })}
            href="/"
          >
            {" "}
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
