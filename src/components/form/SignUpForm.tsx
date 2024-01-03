"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypeUserSignUp } from "@/types/backend/auth/user";
import { fetchPost } from "@/lib/fetch/user";
import { CSSProperties, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { AuthResponse } from "@/types/frontend/auth/user";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useRouter } from "next/navigation";
import { loginStore } from "@/store/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(6, {
    message: "Name must be at least 6 characters.",
  }),
  username: z.string().min(6, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function SignUpForm() {
  const [errorMsg, setErrorMsg] = useState<AuthResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUserAcces } = loginStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const override: CSSProperties = {
    display: "block",
    paddingBottom: "1rem",
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setErrorMsg(null);
    setIsLoading(true);
    const { name, username, email, password } = values;
    const dataUser: TypeUserSignUp = {
      name,
      userName: username,
      email,
      password,
      refreshToken: "",
      address: "",
      telp: "",
      picture: "",
    };

    try {
      const response: AuthResponse = await fetchPost(dataUser, "signup");

      if (response.status === "failed") {
        setErrorMsg(response);
        setIsLoading(false);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
            isLoading ? "cursor-not-allowed hover:bg-none" : "cursor-pointer"
          }`}
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
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
}
