"use client";

import Features from "@/app/(main)/_components/Features";
import Header from "@/app/(main)/_components/Header";
import { Button } from "@/components/ui/button";
import { Footer } from "./_components/Footer";
import {
  FeaturesSection,
  SolutionsSection,
  StatsSection,
} from "./_components/FeatureSection";
import TestimonialSection from "./_components/TestimonialSection";
import DisplayCardsSection from "./_components/DisplayCardSection";

const HomePage = () => {
  return (
    <>
      <Header />
      <section className="relative min-h-[calc(630px-var(--header-height))] overflow-hidden lg:py-32 py-20 bg-gradient-to-t from-primary/10 to-background">
        <div className="absolute left-0 top-0 z-0 grid h-full w-full grid-cols-[clamp(28px,10vw,120px)_auto_clamp(28px,10vw,120px)] border-b border-[--border] dark:border-[--dark-border]">
          {/* Decorations */}
          <div className="col-span-1 flex h-full items-center justify-center" />
          <div className="col-span-1 flex h-full items-center justify-center border-x border-[--border] dark:border-[--dark-border]" />
          <div className="col-span-1 flex h-full items-center justify-center" />
        </div>
        {/* --- */}
        <figure className="pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full bg-[--accent-500-40] blur-[200px]" />
        <figure className="pointer-events-none absolute left-[4vw] top-[64px] z-20 hidden aspect-square w-[32vw] rounded-full bg-[--surface-primary] opacity-50 blur-[100px] dark:bg-[--dark-surface-primary] md:block" />
        <figure className="pointer-events-none absolute bottom-[-50px] right-[7vw] z-20 hidden aspect-square w-[30vw] rounded-full bg-[--surface-primary] opacity-50 blur-[100px] dark:bg-[--dark-surface-primary] md:block" />
        {/* --- */}
        <div className="relative z-10 flex flex-col divide-y divide-[--border] pt-[35px] dark:divide-[--dark-border]">
          <div className="flex flex-col items-center justify-end">
            <div className="flex items-center gap-2 !border !border-b-0 border-[--border] px-4 py-2 dark:border-[--dark-border]">
              {/* Avatar Group */}
              <div className="text-sm tracking-tight text-[--text-tertiary] dark:text-[--dark-text-tertiary] flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-black"></div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-blue-500 border-2 border-black"></div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-400 to-red-500 border-2 border-black"></div>
                </div>
                1,389 Happy Customers.
              </div>
            </div>
          </div>
          <div>
            <div className="mx-auto flex min-h-[288px] max-w-[80vw] shrink-0 flex-col items-center justify-center gap-2 px-2 py-4 sm:px-16 lg:px-24">
              <h1 className="!max-w-screen-lg text-pretty text-center text-[clamp(32px,7vw,64px)] font-medium leading-none tracking-[-1.44px] text-[--text-primary] dark:text-[--dark-text-primary] md:tracking-[-2.16px]">
                Streamlined Communication for Iterating Fast
              </h1>
              <h2 className="text-md mt-6 max-w-2xl text-pretty text-center text-[--text-tertiary] dark:text-[--dark-text-tertiary] md:text-lg">
                A self-hosted platform to discover, buy, and master expert-led
                courses—designed to help individuals and teams grow faster.
              </h2>
            </div>
          </div>
          <div className="flex items-start justify-center px-8 sm:px-24">
            <div className="flex pt-10 w-full gap-10 max-w-[80vw] flex-wrap jc items-center justify-center md:!max-w-[392px]">
              <Button className="text-base h-12">Get Started</Button>
              <Button variant="outline" className="text-base h-12">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Features />
      <DisplayCardsSection />
      <FeaturesSection />
      <StatsSection />

      <SolutionsSection />
      <TestimonialSection />
      <Footer />
    </>
  );
};

export default HomePage;
