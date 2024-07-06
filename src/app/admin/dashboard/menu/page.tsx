import { AdminDashLayout } from "@/components/admin-dashboard-layout";
import { MenuDeleteDialog } from "@/components/menu-delete-dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/server";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function MenuPage() {
  const menus = await api.adminMenu.getAllMenus();
  return (
    <AdminDashLayout>
      <main className="px-4 py-3">
        <div className="flex justify-between">
          <h1>Menu</h1>
          <Link href="/admin/dashboard/menu/new">
            <Button className="space-x-2 px-3 py-0">
              <PlusIcon className="h-4 w-4" />
              <span>New Menu</span>
            </Button>
          </Link>
        </div>
        {/* <pre>{JSON.stringify(menus, null, 2)}</pre> */}
        {menus.map((menu) => {
          return (
            <Card className="my-2 flex justify-between px-2 py-3" key={menu.id}>
              <div>
                <h2>{menu.name}</h2>
                <p>{menu.description}</p>
                <p>${menu.price}</p>

                <div className="space-x-2">
                  <Link href={`/admin/dashboard/menu/edit/${menu.id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <MenuDeleteDialog menuId={menu.id} />
                </div>
              </div>
              <Avatar>
                <AvatarImage src={menu.thumbnail!} alt={menu.name} />
                <AvatarFallback>{menu.name[0]}</AvatarFallback>
              </Avatar>
            </Card>
          );
        })}
      </main>
    </AdminDashLayout>
  );
}
