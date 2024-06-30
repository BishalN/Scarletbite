import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import { redirect, RedirectType } from "next/navigation";
import { api } from "@/trpc/server";
import { StickyCart } from "@/components/sticky-cart";
import { MenuItemCard } from "@/components/menu-item-card";
import { DashLayout } from "@/components/dashboard-layout";

// TODO: fix the sidebar to make it fixed rather than just min-height it should not scroll

export default async function Dashboard() {
  const session = await getServerAuthSession();
  if (!session) {
    return redirect("/", RedirectType.replace);
  }
  const myFeed = await api.feed.getAllMenus();
  return (
    <DashLayout>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">My Feed</h1>
        </div>
        <div className=" rounded-lg shadow-sm">
          {myFeed.length > 0 ? (
            <div className="space-y-4">
              {myFeed.map((menuItem) => {
                return <MenuItemCard menuItem={menuItem} key={menuItem.id} />;
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no products
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
              </p>
              <Button className="mt-4">Add Product</Button>
            </div>
          )}
        </div>
        <StickyCart />
      </main>
    </DashLayout>
  );
}
