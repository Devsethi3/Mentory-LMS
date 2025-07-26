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
import { motion, AnimatePresence } from "motion/react";

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
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.5,
          type: "spring" as const,
          stiffness: 100,
          damping: 15,
        }}
      >
        <Card className="rounded-none lg:rounded-lg">
          <CardHeader>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <CardTitle className="text-xl">Welcome Back</CardTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <CardDescription>
                Login with your GitHub or Email Account
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                disabled={githubPending}
                onClick={signInWithGithub}
                className="w-full"
                variant="outline"
              >
                <AnimatePresence mode="wait">
                  {githubPending ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="size-4 animate-spin" />
                      <span>Loading ...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="github"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <GithubIcon className="size-4" />
                      <span>Sign in with GitHub</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button className="w-full" variant="outline">
                <FaGoogle className="size-4" />
                Sign in with Google
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
            >
              <span className="relative z-10 bg-card px-2 text-muted-foreground">
                Or Continue with
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="grid gap-3"
            >
              <div className="grid gap-2">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  <Label>Email</Label>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                  whileFocus={{ scale: 1.02 }}
                >
                  <Input
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="m@example.com"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  onClick={signInWithEmail}
                  disabled={emailPending || !email}
                  className="w-full"
                >
                  <AnimatePresence mode="wait">
                    {emailPending ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="size-4 animate-spin" />
                        <span>Loading...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="email"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        <Send className="size-4" />
                        <span>Continue With Email</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default LoginForm;

