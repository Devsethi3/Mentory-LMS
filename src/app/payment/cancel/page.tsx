"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, XIcon, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import type { Variants } from "motion/react";

const CancelPaymentPage = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const errorIconVariants: Variants = {
    hidden: {
      scale: 0,
      rotate: 180,
      opacity: 0,
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  const shakeVariants: Variants = {
    initial: { x: 0 },
    animate: {
      x: [-2, 2, -2, 2, 0],
      transition: {
        duration: 0.5,
        delay: 0.8,
        ease: "easeInOut" as const,
      },
    },
  };

  const pulseVariants: Variants = {
    initial: { scale: 1, opacity: 0.6 },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.6, 0.3, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const floatingVariants: Variants = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [-5, 5, -5],
      rotate: [-2, 2, -2],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center bg-gradient-to-br from-red-50/30 via-background to-orange-50/20 dark:from-red-950/10 dark:via-background dark:to-orange-950/10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        {/* Floating warning icons */}
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute -top-8 -right-8 z-10"
        >
          <AlertCircle className="w-6 h-6 text-orange-500/60" />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: "1s" }}
          className="absolute -bottom-6 -left-6 z-10"
        >
          <RefreshCw className="w-5 h-5 text-red-400/60" />
        </motion.div>

        <Card className="w-[400px] shadow-xl border-red-200/50 dark:border-red-800/30 backdrop-blur-sm bg-card/95">
          <CardContent className="p-8">
            <motion.div
              variants={itemVariants}
              className="flex justify-center items-center w-full mb-6"
            >
              <div className="relative">
                {/* Pulse rings */}
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-red-500/20 rounded-full"
                />
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  style={{ animationDelay: "0.5s" }}
                  className="absolute inset-0 bg-red-500/10 rounded-full scale-110"
                />

                {/* Error icon container with shake */}
                <motion.div
                  variants={shakeVariants}
                  initial="initial"
                  animate="animate"
                >
                  <motion.div
                    variants={errorIconVariants}
                    className="relative w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <XIcon className="w-10 h-10 text-white stroke-[3]" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-center space-y-4"
            >
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"
              >
                Payment Cancelled
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto"
              >
                No worries, you won't be charged. Your payment was cancelled and
                you can try again anytime.
              </motion.p>

              <motion.div variants={itemVariants} className="pt-2 space-y-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/courses"
                    className={buttonVariants({
                      className:
                        "w-full h-12 text-base font-medium bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300",
                    })}
                  >
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: -5 }}
                      transition={{ type: "spring" as const, stiffness: 300 }}
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Try Again
                    </motion.span>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/"
                    className={buttonVariants({
                      variant: "outline",
                      className: "w-full h-12 text-base",
                    })}
                  >
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: -5 }}
                      transition={{ type: "spring" as const, stiffness: 300 }}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Homepage
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Status indicators */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-red-200/30 dark:border-red-800/30"
            >
              <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-red-500 rounded-full"
                />
                Payment Cancelled
              </div>
              <div className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                No Charges Applied
              </div>
            </motion.div>

            {/* Help text */}
            <motion.div
              variants={itemVariants}
              className="mt-6 p-4 bg-muted/30 rounded-lg border border-muted-foreground/10"
            >
              <p className="text-xs text-muted-foreground text-center">
                Need help? Contact our support team or check your payment method
                and try again.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CancelPaymentPage;
