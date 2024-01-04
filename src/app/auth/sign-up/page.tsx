"use client";

import SignUpForm from "@/components/form/SignUpForm";
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
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Enter your presonal information and start journey with us
        </CardDescription>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <SignUpForm />
      </CardContent>
      <Separator className="mb-6" />
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign-in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
