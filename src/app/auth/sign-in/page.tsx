"use client";

import SignInForm from "@/components/form/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function page() {
  return (
    <section className="flex w-full min-h-screen items-center justify-center">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Welcome back, sign in to your account
          </CardDescription>
        </CardHeader>
        <Separator className="mb-4" />
        <CardContent>
          <SignInForm />
        </CardContent>
        <Separator className="mb-6" />
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign-up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
