
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, XIcon } from "lucide-react";
import Link from "next/link";

const CancelPaymentPage = () => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-1 justify-center items-center">
        <Card className="w-[350px]">
          <CardContent>
            <div className="flex justify-center items-center w-full">
              <XIcon className="size-12 p-2 bg-red-500/30 text-red-500 rounded-full" />
            </div>
            <div className="mt-3 text-center sm:mt-5 w-full">
              <h2 className="text-xl font-semibold">Payment Cancelled</h2>
              <p className="text-muted-foreground mt-2 text-sm tracking-tight text-balance">
                No worries, you won&apos;t be charged. Please try again
              </p>

              <Link
                href="/"
                className={buttonVariants({ className: "w-full mt-5" })}
              >
                <ArrowLeft className="size-4" />
                Go back to Homepage
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CancelPaymentPage;
