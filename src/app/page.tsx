import { CreateAccountCard } from "@/components/create-account-card";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();
  if (session && session.user) {
    return redirect("/dashboard");
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <CreateAccountCard />
    </main>
  );
}
