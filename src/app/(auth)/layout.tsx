import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute left-4 top-4",
        })}
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center space-x-2">
          <div className="relative">
            <Image
              src="/logo.svg"
              width={38}
              height={38}
              alt="Mentory LMS logo"
              className="group-hover:scale-105 transition-transform duration-200"
            />
            {/* Glow effect for dark mode */}
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 dark:opacity-100 group-hover:opacity-30 transition-opacity duration-300" />
          </div>
          <span className="text-xl font-bold">Mentory LMS</span>
        </Link>

        {children}

        <div className="text-balance text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <span className="hover:text-primary hover:underline cursor-pointer">
            Terms of service
          </span>{" "}
          and{" "}
          <span className="hover:text-primary hover:underline cursor-pointer">
            Privacy and Policy
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
