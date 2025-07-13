"use client";

import { ChevronDown } from "lucide-react";
import { buttonVariants } from "../../../components/ui/button";
import Image from "next/image";
import { ThemeToggle } from "../../../components/ui/theme-toggle";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "./UserDropdown";

const Header = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center">
                <Image src="/logo.svg" alt="logo" width={38} height={38} />
              </div>
              <span className="text-xl font-bold">Mentory</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-1">
                <span>Features</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <a href="#pricing">Pricing</a>
              <a href="#blog">Blog</a>
              <a href="#changelog">Changelog</a>
            </nav>

            <div className="flex items-center space-x-4">
              <ThemeToggle />

              {isPending ? null : session ? (
                <UserDropdown
                  email={session.user.email}
                  name={
                    session?.user.name && session.user.name.length > 0
                      ? session?.user.name
                      : session?.user.email.split("@")[0]
                  }
                  image={
                    session?.user.image ??
                    `https://avatar.vercel.sh/${session?.user.email}`
                  }
                />
              ) : (
                <>
                  <Link
                    href="/login"
                    className={buttonVariants({
                      variant: "outline",
                    })}
                  >
                    Sign In
                  </Link>
                  <Link href="/login" className={buttonVariants({})}>
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
