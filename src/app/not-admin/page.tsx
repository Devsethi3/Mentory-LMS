import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ShieldX, Home, Mail, HelpCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotAdminPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-6">
        {/* Main Card */}
        <Card className="shadow-xl border-0 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="relative mx-auto mb-6">
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full p-6 w-fit mx-auto">
                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full p-4">
                  <ShieldX className="size-16 text-red-500" />
                </div>
              </div>
            </div>

            <CardTitle className="text-2xl font-bold">
              Access Restricted
            </CardTitle>

            <CardDescription className="text-muted-foreground mt-2 leading-relaxed">
              You don't have admin privileges to access this area. Admin access
              is required to create courses, manage content, and access
              administrative features.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/" className={`${buttonVariants({})} flex-1`}>
                <Home className="mr-2 size-4" />
                Back to Home
              </Link>
              <Link
                href="/courses"
                className={`${buttonVariants({
                  variant: "outline",
                })} flex-1`}
              >
                <ArrowLeft className="mr-2 size-4" />
                Browse Courses
              </Link>
            </div>

            {/* Help Section */}
            <div className="rounded-lg p-4 border">
              <div className="flex items-start gap-3">
                <HelpCircle className="size-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm mb-1">
                    Need Admin Access?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    If you believe you should have admin privileges, please
                    contact your administrator.
                  </p>
                  {/* <Button asChild variant="outline" size="sm">
                    <Link href="/contact">
                      <Mail className="mr-2 size-3" />
                      Contact Support
                    </Link>
                  </Button> */}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Redirected from admin area •
            <Link href="/help" className="text-blue-600 hover:underline ml-1">
              Learn more about user roles
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotAdminPage;
