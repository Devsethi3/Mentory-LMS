// /app/payment/success/page.tsx - Create this file to handle success redirects
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen } from "lucide-react";
import Link from "next/link";
import { getIndividualCourse } from "@/data/course/get-all-course";
import { getEnrollmentDetails } from "@/data/user/user-is-enrolled";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface PaymentSuccessPageProps {
  searchParams: SearchParams;
}

async function PaymentSuccessContent({
  searchParams,
}: PaymentSuccessPageProps) {
  const params = await searchParams;
  const courseId = params.courseId as string;
  const sessionId = params.session_id as string;

  if (!courseId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 mb-4">
              <span className="text-6xl">❌</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Invalid Request</h1>
            <p className="text-muted-foreground mb-4">
              Course ID is missing from the request.
            </p>
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  let course;
  let enrollment;

  try {
    course = await getIndividualCourse(courseId);
    enrollment = await getEnrollmentDetails(courseId);
  } catch (error) {
    console.error("Error fetching course/enrollment:", error);
  }

  // Check if enrollment is active
  const isEnrolled = enrollment?.status === "Active";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div
            className={`mx-auto mb-4 ${
              isEnrolled ? "text-green-500" : "text-orange-500"
            }`}
          >
            {isEnrolled ? (
              <CheckCircle className="w-16 h-16" />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center">
                <span className="text-4xl">⏳</span>
              </div>
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {isEnrolled ? "Payment Successful!" : "Payment Processing"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {course && (
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-sm text-muted-foreground">
                {course.smallDescription}
              </p>
            </div>
          )}

          {isEnrolled ? (
            <>
              <p className="text-muted-foreground">
                Congratulations! You have successfully enrolled in the course.
                You can now access all course content.
              </p>
              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link href="/dashboard">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Start Learning
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">Go to Homepage</Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-muted-foreground">
                Your payment is being processed. This usually takes a few
                moments. You'll receive access once the payment is confirmed.
              </p>
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-700">
                  <strong>Session ID:</strong> {sessionId || "Processing..."}
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  Keep this for your records
                </p>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="w-full"
                >
                  Refresh Page
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">Go to Homepage</Link>
                </Button>
              </div>
            </>
          )}

          {enrollment && (
            <div className="text-xs text-muted-foreground pt-4 border-t">
              <p>
                Enrollment Status:{" "}
                <span className="font-mono">{enrollment.status}</span>
              </p>
              <p>Updated: {new Date(enrollment.updatedAt).toLocaleString()}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent searchParams={searchParams} />
    </Suspense>
  );
}
