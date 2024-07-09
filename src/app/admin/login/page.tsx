import { AdminCreateAccountCard } from "@/components/admin-login-card";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Home() {
  // this is throwing error when there are no user logged in a protected procedure
  // better first make use of serversession and then only use this api
  const session = await getServerAuthSession();
  if (session && session.user) {
    const currentUser = await api.me.currentUser();
    if (currentUser && currentUser.role === "ADMIN") {
      return redirect("/admin/dashboard");
    } else if (currentUser) {
      // user is not an admin
      return redirect("/dashboard");
    }
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center space-x-3">
      <AdminCreateAccountCard />
    </main>
  );
}
