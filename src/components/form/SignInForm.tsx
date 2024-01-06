"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { CSSProperties, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const override: CSSProperties = {
  display: "block",
  paddingBottom: "1rem",
};

export default function SignInForm() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function submitForm(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const signInResponse = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!signInResponse || signInResponse.ok !== true) {
        setErrorMsg("Please enter a valid email and password.");
      } else {
        router.push("/");
        router.refresh();
        setIsLoading(false);
        form.reset();
      }
    } catch (error) {
      setErrorMsg(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="space-y-4">
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
          {isLoading ? (
            <PropagateLoader
              cssOverride={override}
              color="rgb(15, 23, 42)"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  );
}
