"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "../../../components/ui/button";
import Image from "next/image";
import { ThemeToggle } from "../../../components/ui/theme-toggle";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "./UserDropdown";

const Header = () => {
  const { data: session, isPending } = authClient.useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b">
      <div className="container py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
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
          <span className="text-xl font-bold">Mentory</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link href="/courses" className="hover:text-primary transition">
            Courses
          </Link>
          <Link href="/blog" className="hover:text-primary transition">
            Blog
          </Link>
          <Link href="/changelog" className="hover:text-primary transition">
            Changelog
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center lg:gap-4 gap-2">
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
            <div className="hidden md:flex gap-2">
              <Link
                href="/login"
                className={buttonVariants({ variant: "outline" })}
              >
                Sign In
              </Link>
              <Link href="/login" className={buttonVariants({})}>
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Toggle */}
          <Button
            className="md:hidden"
            variant={"outline"}
            size={"icon"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background/80 backdrop-blur-md border-t border-border px-4 pb-6 pt-4 shadow-md">
          <div className="space-y-2">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-2 py-2 rounded-md hover:bg-muted transition"
            >
              Home
            </Link>
            <Link
              href="/courses"
              onClick={() => setIsMenuOpen(false)}
              className="block px-2 py-2 rounded-md hover:bg-muted transition"
            >
              Courses
            </Link>
            <Link
              href="#blog"
              onClick={() => setIsMenuOpen(false)}
              className="block px-2 py-2 rounded-md hover:bg-muted transition"
            >
              Blog
            </Link>
            <Link
              href="#changelog"
              onClick={() => setIsMenuOpen(false)}
              className="block px-2 py-2 rounded-md hover:bg-muted transition"
            >
              Changelog
            </Link>
          </div>

          {!session && (
            <div className="mt-6 space-y-2">
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full",
                })}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className={buttonVariants({ className: "w-full" })}
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
