"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "../../../components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "./UserDropdown";
import { ThemeToggleButton } from "@/components/ui/theme-toggle-button";
import { motion, AnimatePresence } from "motion/react";

const Header = () => {
  const { data: session, isPending } = authClient.useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get navigation items based on session status
  const getNavItems = () => {
    const baseItems = [
      { href: "/", label: "Home" },
      { href: "/courses", label: "Courses" },
      { href: "/blog", label: "Blog" },
      { href: "/changelog", label: "Changelog" },
    ];

    if (session) {
      // Add dashboard link based on user role
      const dashboardItem = {
        href: session.user.role === "admin" ? "/admin" : "/dashboard",
        label: session.user.role === "admin" ? "Admin Dashboard" : "Dashboard"
      };
      return [...baseItems, dashboardItem];
    }

    return baseItems;
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 },
    },
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const navLinkVariants = {
    initial: { y: 0 },
    hover: {
      y: -2,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const glowVariants = {
    initial: { scale: 0.8, opacity: 0 },
    hover: {
      scale: 1.2,
      opacity: 0.3,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  const navItems = getNavItems();

  return (
    <motion.header
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-2xl border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      }}
    >
      <div className="container lg:py-4 py-3 flex items-center justify-between">
        {/* Logo */}

        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Image
              src="/logo.svg"
              width={38}
              height={38}
              alt="Mentory LMS logo"
              className="transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 dark:opacity-100 group-hover:opacity-30 transition-opacity duration-300" />
          </div>
          <span className="lg:text-xl text-lg font-medium font-geist bg-clip-text text-transparent mx-auto bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
            MENTORY
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className="relative opacity-80 hover:opacity-100"
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center lg:gap-4 gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <ThemeToggleButton variant="circle" start="top-right" />
          </motion.div>

          {isPending ? (
            <motion.div
              className="w-8 h-8 rounded-full bg-muted animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          ) : session ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
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
            </motion.div>
          ) : (
            <motion.div
              className="hidden md:flex gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Sign In
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/login" className={buttonVariants({})}>
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          )}

          {/* Mobile Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <Button
              className="md:hidden relative overflow-hidden"
              variant={"outline"}
              size={"icon"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-background/80 backdrop-blur-2xl border-t border-border overflow-hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="px-4 pb-6 pt-4">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={menuItemVariants}
                    custom={index}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0"
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut" as const,
                        }}
                      />
                      <span className="relative">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {!session && (
                <motion.div
                  className="mt-6 space-y-3"
                  variants={menuItemVariants}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
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
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/login"
                      className={buttonVariants({ className: "w-full" })}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;