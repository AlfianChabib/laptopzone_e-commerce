"use client";
import { Button, Input } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function Form() {
  const pathname = usePathname();
  const isSignup = pathname === "/auth/signup";

  return (
    <form className="flex flex-col gap-4 w-full">
      {isSignup ? (
        <>
          <Input
            fullWidth
            size="md"
            type="text"
            label="Name"
            variant="flat"
            labelPlacement="outside"
            placeholder="Enter your name"
          />
          <Input
            fullWidth
            size="md"
            type="text"
            label="Username"
            variant="flat"
            labelPlacement="outside"
            placeholder="Enter your username"
          />
          <Input
            fullWidth
            size="md"
            type="email"
            label="Email"
            variant="flat"
            labelPlacement="outside"
            placeholder="Enter your email"
          />
          <Input
            fullWidth
            size="md"
            label="Password"
            variant="flat"
            placeholder="Enter your password"
            type="password"
            labelPlacement="outside"
          />
          <Input
            fullWidth
            size="md"
            label="Confirm Password"
            variant="flat"
            placeholder="Confirm your password"
            type="password"
            labelPlacement="outside"
          />
          <Button
            type="submit"
            color="success"
            size="md"
            className="text-white font-medium"
          >
            Sign Up
          </Button>
        </>
      ) : (
        <>
          <Input
            fullWidth
            size="md"
            type="email"
            label="Email"
            variant="flat"
            labelPlacement="outside"
            placeholder="Enter your email"
          />
          <Input
            fullWidth
            size="md"
            label="Password"
            variant="flat"
            placeholder="Enter your password"
            type="password"
            labelPlacement="outside"
          />
          <Button
            type="submit"
            color="success"
            size="md"
            className="text-white font-medium"
          >
            Sign In
          </Button>
        </>
      )}
    </form>
  );
}
