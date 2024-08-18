import { Dashboard } from "@/components/dashboard";
import { validateRequest } from "@/lib/auth";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center dark bg-black">
      <Dashboard />
    </main>
  );
}
