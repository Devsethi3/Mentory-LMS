"use client";

import { Button } from "@/components/ui/button";
import { IconShoppingCart, IconLoader2 } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner"; 
import { enrollInCourseAction } from "../actions";

interface EnrollmentButtonProps {
  courseId: string;
}

const EnrollmentButton = ({ courseId }: EnrollmentButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnrollment = async () => {
    try {
      setIsLoading(true);

      const result = await enrollInCourseAction(courseId);

      if (result?.status === "error") {
        toast.error(result.message);
      } else if (result?.status === "success") {
        toast.success(result.message);
      }
      // Note: If successful and not already enrolled, the action will redirect to Stripe
      // so this code after the action call might not execute
    } catch (error) {
      console.error("Enrollment error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleEnrollment}
      disabled={isLoading}
      className="w-full"
      size="lg"
    >
      {isLoading ? (
        <>
          <IconLoader2 className="size-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <IconShoppingCart className="size-4" />
          Enroll Now
        </>
      )}
    </Button>
  );
};

export default EnrollmentButton;
