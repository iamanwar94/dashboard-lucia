import { logout } from "@/actions/logout";
import { Dashboard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user }: any = await validateRequest();

  if (!user) return redirect("/signin");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center dark bg-black">
      <div className="w-full px-2">
        <h1 className="text-4xl text-white font-bold">Welcome back {user?.username}!</h1>
        <p className="text-sm text-muted-foreground">You are now logged in.</p>

        <form action={logout}>
          <Button type="submit" className="">
            Logout
          </Button>
        </form>
        {/* <a
          href="/logout"
          className="underline underline-offset-4 text-sm text-white hover:text-blue-500"
        ></a> */}
      </div>
      <Dashboard />
    </main>
  );
}
