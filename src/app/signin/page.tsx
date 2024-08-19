"use server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/actions";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const Login = async () => {
  const { user }: any = await validateRequest();

  if (user) return redirect("/");

  return (
    <form
      className="flex justify-center items-center bg-black h-screen"
      action={login}
    >
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Enter your username and password to sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Enter your username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </CardFooter>
        <div className="text-center text-sm text-muted-foreground my-4">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="underline underline-offset-4"
            prefetch={false}
          >
            Sign Up
          </Link>
        </div>
      </Card>
    </form>
  );
};

export default Login;
