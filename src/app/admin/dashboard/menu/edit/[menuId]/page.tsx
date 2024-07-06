import { AdminDashLayout } from "@/components/admin-dashboard-layout";
import { MenuEditForm } from "@/components/menu-edit-form";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function MenuEditPage({
  params,
}: {
  params: { menuId: string };
}) {
  const { menuId } = params;
  const menu = await api.adminMenu.getMenuById({ id: parseInt(menuId) });

  if (!menu) {
    return notFound();
  }

  return (
    <AdminDashLayout>
      <main className="px-4 py-2">
        <h1 className="my-2 text-2xl">Edit Menu</h1>
        <MenuEditForm menu={menu} />
      </main>
    </AdminDashLayout>
  );
}
