import { getServerAuthSession } from "@/server/auth";
import { redirect, RedirectType } from "next/navigation";
import { api } from "@/trpc/server";
import { AdminDashLayout } from "@/components/admin-dashboard-layout";

export default async function Dashboard() {
  const session = await getServerAuthSession();
  if (!session) {
    return redirect("/", RedirectType.replace);
  }
  return (
    <AdminDashLayout>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Recent Orders</h1>
        </div>
      </main>
    </AdminDashLayout>
  );
}
