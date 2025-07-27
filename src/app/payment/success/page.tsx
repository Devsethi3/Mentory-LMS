"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConfetti } from "@/hooks/use-confetti";
import { ArrowRight, CheckIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { motion, AnimatePresence, easeInOut, easeOut } from "motion/react";

const SuccessPaymentPage = () => {
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    // Delay confetti to sync with animations
    const timer = setTimeout(() => {
      triggerConfetti();
    }, 800);
    return () => clearTimeout(timer);
  }, [triggerConfetti]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  };

  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0, rotate: 0 },
    visible: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      transition: {
        duration: 1.5,
        delay: 0.8,
        ease: easeInOut,
      },
    },
  };

  const checkIconVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
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

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.6 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.6, 0.2, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  };

  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center bg-gradient-to-br from-green-50/30 via-background to-emerald-50/20 dark:from-green-950/10 dark:via-background dark:to-emerald-950/10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        {/* Floating sparkles */}
        <motion.div
          variants={sparkleVariants}
          className="absolute -top-6 -right-6 z-10"
        >
          <Sparkles className="w-6 h-6 text-yellow-500" />
        </motion.div>
        <motion.div
          variants={sparkleVariants}
          className="absolute -bottom-4 -left-4 z-10"
          style={{ animationDelay: "0.3s" }}
        >
          <Sparkles className="w-4 h-4 text-green-500" />
        </motion.div>
        <motion.div
          variants={sparkleVariants}
          className="absolute top-2 -left-8 z-10"
          style={{ animationDelay: "0.6s" }}
        >
          <Sparkles className="w-5 h-5 text-blue-500" />
        </motion.div>

        <Card className="w-[400px] shadow-xl border-green-200/50 dark:border-green-800/30 backdrop-blur-sm bg-card/95">
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
                  className="absolute inset-0 bg-green-500/20 rounded-full"
                />
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  style={{ animationDelay: "0.5s" }}
                  className="absolute inset-0 bg-green-500/10 rounded-full scale-110"
                />

                {/* Check icon container */}
                <motion.div
                  variants={checkIconVariants}
                  className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <CheckIcon className="w-10 h-10 text-white stroke-[3]" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-center space-y-4"
            >
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
              >
                Payment Successful! 🎉
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto"
              >
                Congratulations! Your payment was processed successfully. You
                now have full access to your course content.
              </motion.p>

              <motion.div variants={itemVariants} className="pt-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      className:
                        "w-full h-12 text-base font-medium bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300",
                    })}
                  >
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex items-center gap-2"
                    >
                      Go to Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Success indicators */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-green-200/30 dark:border-green-800/30"
            >
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                Course Activated
              </div>
              <div className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                Access Granted
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SuccessPaymentPage;
