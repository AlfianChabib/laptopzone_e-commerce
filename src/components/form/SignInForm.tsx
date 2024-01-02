"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchPost } from "@/lib/fetch/user";
import { useState } from "react";
import { AuthResponse } from "@/types/frontend/auth/user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { loginStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Spinner } from "@chakra-ui/react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function SignInForm() {
  const [errorMsg, setErrorMsg] = useState<AuthResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUserAcces } = loginStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetchPost(values, "login");

      if (response.status === "failed") {
        setIsLoading(false);
        setErrorMsg(response);
        return;
      }

      setIsLoading(false);
      setErrorMsg(null);
      setUserAcces(response.accessToken);
      router.push("/");
      form.reset();
    } catch (error: any) {
      setIsLoading(false);
      const errorServer = {
        status: "failed",
        statusCode: 500,
        message: "Oops Internal server Error",
        accessToken: "",
      };
      setErrorMsg(errorServer);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {errorMsg ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error {errorMsg.statusCode}</AlertTitle>
            <AlertDescription>{errorMsg.message}</AlertDescription>
          </Alert>
        ) : null}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={`w-full ${
            isLoading ? "cursor-not-allowed" : "cursor-pointer"
          } `}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
