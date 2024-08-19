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
import { signup } from "@/actions";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import Link from "next/link";

const Signup = async () => {
  const { user }: any = await validateRequest();

  if (user) return redirect("/");

  return (
    <form
      className="flex justify-center items-center bg-black h-screen"
      action={signup}
    >
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>
            Enter your email and password to create a new account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="example@email.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              ></Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </CardFooter>
        <div className="text-center text-sm text-muted-foreground my-4">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="underline underline-offset-4"
            prefetch={false}
          >
            Sign in
          </Link>
        </div>
      </Card>
    </form>
  );
};

export default Signup;
