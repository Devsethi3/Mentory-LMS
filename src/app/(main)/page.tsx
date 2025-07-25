"use client";

import Features from "@/app/(main)/_components/Features";
import Header from "@/app/(main)/_components/Header";
import { Button } from "@/components/ui/button";
import { Footer } from "./_components/Footer";
import { SolutionsSection } from "./_components/FeatureSection";
import TestimonialSection from "./_components/TestimonialSection";
import DisplayCardsSection from "./_components/DisplayCardSection";
import { motion } from "motion/react";
import { MdArrowOutward } from "react-icons/md";
import { ChevronRight } from "lucide-react";

const HomePage = () => {
  return (
    <>
      <Header />
      <section className="relative min-h-[calc(630px-var(--header-height))] overflow-hidden lg:py-32 py-20 bg-gradient-to-t from-primary/10 to-background">
        {/* Decorative Grids */}
        <div className="absolute left-0 top-0 z-0 grid h-full w-full grid-cols-[clamp(28px,10vw,120px)_auto_clamp(28px,10vw,120px)] border-b border-[--border] dark:border-[--dark-border]">
          <div className="col-span-1" />
          <div className="col-span-1 border-x border-[--border] dark:border-[--dark-border]" />
          <div className="col-span-1" />
        </div>

        {/* Blurred Figures */}
        <motion.figure
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full bg-[--accent-500-40] blur-[200px]"
        />
        <motion.figure
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="pointer-events-none absolute left-[4vw] top-[64px] z-20 hidden aspect-square w-[32vw] rounded-full bg-[--surface-primary] blur-[100px] dark:bg-[--dark-surface-primary] md:block"
        />
        <motion.figure
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1, duration: 1 }}
          className="pointer-events-none absolute bottom-[-50px] right-[7vw] z-20 hidden aspect-square w-[30vw] rounded-full bg-[--surface-primary] blur-[100px] dark:bg-[--dark-surface-primary] md:block"
        />

        <div className="relative z-10 flex flex-col divide-y divide-[--border] pt-[10px] dark:divide-[--dark-border]">
          {/* Avatar */}
          <div className="flex flex-col items-center justify-end">
            {/* className="!border !border-b-0 border-[--border] px-4 py-2 dark:border-[--dark-border]" */}
            <div className="flex items-center gap-2">
              {/* <div className="text-sm tracking-tight text-[--text-tertiary] dark:text-[--dark-text-tertiary] flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-black"></div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-blue-500 border-2 border-black"></div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-400 to-red-500 border-2 border-black"></div>
                </div>
                Join the Community ✨
              </div> */}
              <p className="text-sm text-gray-600 dark:text-gray-400 group font-geist mx-auto p-3 bg-gradient-to-tr from-zinc-300/20 via-gray-400/20 to-transparent dark:from-zinc-300/5 dark:via-gray-400/5 border-[2px] border-black/5 dark:border-white/5 w-fit">
                ✨ Your Learning Hub
                <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
              </p>
            </div>
          </div>

          {/* Heading and Subheading */}
          <div>
            <div className="mx-auto flex min-h-[320px] max-w-[80vw] flex-col items-center justify-center gap-2 px-2 py-4 sm:px-16 lg:px-24">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl text-center tracking-tighter font-geist bg-clip-text text-transparent mx-auto md:text-6xl lg:text-7xl bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]"
              >
                {/* Your Hub for Iterative Learning & Rapid Skill Development */}
                Self-Hosted Learning Built for High Performers
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-transparent text-center mt-5 bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200 lg:text-2xl md:text-lg text-base max-w-3xl"
              >
                A self-hosted platform to discover, buy, and master expert-led
                courses—designed to help individuals and teams grow faster.
              </motion.h2>
            </div>
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-start justify-center px-8 sm:px-24"
          >
            <div className="flex flex-col items-center w-full max-w-md mx-auto">
              <Button
                variant="ghost"
                className="w-full lg:py-7 py-6 font-normal lg:text-lg text-base hover:bg-white/10 border"
                size="lg"
              >
                Request Demo
              </Button>
              <Button
                className="w-full lg:py-7 py-6 font-normal lg:text-lg text-base"
                size="lg"
              >
                Get Started
                <MdArrowOutward className="size-5 ml-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Features />
      <DisplayCardsSection />
      <SolutionsSection />
      <TestimonialSection />
      <Footer />
    </>
  );
};

export default HomePage;
