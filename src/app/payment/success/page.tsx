"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConfetti } from "@/hooks/use-confetti";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const SuccessPaymentPage = () => {
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <>
      <div className="w-full min-h-screen flex flex-1 justify-center items-center">
        <Card className="w-[350px]">
          <CardContent>
            <div className="flex justify-center items-center w-full">
              <CheckIcon className="size-12 p-2 bg-green-500/30 text-green-500 rounded-full" />
            </div>
            <div className="mt-3 text-center sm:mt-5 w-full">
              <h2 className="text-xl font-semibold">Payment Successfull</h2>
              <p className="text-muted-foreground mt-2 text-sm tracking-tight text-balance">
                Congrates your payment was successful. You can now access the
                course.
              </p>

              <Link
                href="/dashboard"
                className={buttonVariants({ className: "w-full mt-5" })}
              >
                Go to Dashboard
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SuccessPaymentPage;
