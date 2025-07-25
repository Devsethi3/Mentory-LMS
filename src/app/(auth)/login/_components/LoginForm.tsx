"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, Loader2, Send } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");

  const signInWithGithub = async () => {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with GitHub, you will be redirected...");
          },
          onError: (error) => {
            console.log(error);

            toast.error("Internal Server Error");
          },
        },
      });
    });
  };

  const signInWithEmail = async () => {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email Sent!");
            router.push(`/verify-request?email=${email}`);
          },
          onError: (error) => {
            console.log(error);

            toast.error("Internal Server Error");
          },
        },
      });
    });
  };

  return (
    <>
      <Card className="rounded-none lg:rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl">Welcome Back</CardTitle>
          <CardDescription>
            Login with your GitHub or Email Account
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <Button
            disabled={githubPending}
            onClick={signInWithGithub}
            className="w-full"
            variant="outline"
          >
            {githubPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Loading ...</span>
              </>
            ) : (
              <>
                <GithubIcon className="size-4" />
                <span>Sign in with GitHub</span>
              </>
            )}
          </Button>
          <Button className="w-full" variant="outline">
            <FaGoogle className="size-4" />
            Sign in with Google
          </Button>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-card px-2 text-muted-foreground">
              Or Continue with
            </span>
          </div>

          <div className="grid gap-3">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="m@example.com"
              />
            </div>
            <Button
              onClick={signInWithEmail}
              disabled={emailPending || !email}
              className="w-full"
            >
              {emailPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  <span>Continue With Email</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginForm;
