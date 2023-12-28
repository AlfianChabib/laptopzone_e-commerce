"use client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import Form from "@/components/Form";
import Link from "next/link";

export default function page() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4">
      <Card className="max-w-[400px]" fullWidth>
        <CardHeader className="justify-center">
          <h1 className="text-lg font-medium">Create your account</h1>
        </CardHeader>
        <Divider />
        <CardBody className="w-full">
          <Form />
        </CardBody>
        <Divider />
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-600">
            Have an account?{" "}
            <Link href="/auth/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
