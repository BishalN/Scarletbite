import { AdminDashLayout } from "@/components/admin-dashboard-layout";
import { CreatePreferenceForm } from "@/components/create-preferences-form";
import { EditPreferenceForm } from "@/components/edit-preferences-form";
import { getServerAuthSession } from "@/server/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function PreferencePage() {
  const serssion = await getServerAuthSession();
  if (!serssion?.user) {
    return redirect("/login");
  }
  const prisma = new PrismaClient();
  const preference = await prisma.preference.findFirst({
    where: {
      userId: serssion.user.id,
    },
  });
  return (
    <AdminDashLayout>
      <main className="px-4 py-3">
        <h1 className="my-2 text-2xl">Preferences</h1>
        {preference ? (
          <EditPreferenceForm preference={preference} />
        ) : (
          <CreatePreferenceForm />
        )}
      </main>
    </AdminDashLayout>
  );
}
