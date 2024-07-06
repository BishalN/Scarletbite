import { getServerAuthSession } from "@/server/auth";
import { redirect, RedirectType } from "next/navigation";
import { api } from "@/trpc/server";
import { OrderItemCard } from "@/components/order-item-card";
import { DashLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// TODO: add the estimated delivery time to every menu item on model
// TODO: also add the measurement quanity to the menu item model e.g plate for chowmein, glass for juice etc to create per plate or per glass price on ui

export default async function Dashboard() {
  const session = await getServerAuthSession();
  if (!session) {
    return redirect("/", RedirectType.replace);
  }

  const myOrders = await api.order.myOrders();

  return (
    <DashLayout>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">My Orders</h1>
        </div>
        <div className=" rounded-lg shadow-sm">
          {myOrders.length > 0 ? (
            <div className="space-y-4">
              {myOrders.map((order) => {
                return <OrderItemCard order={order} key={order.id} />;
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no orders
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start creating order by adding products to cart
              </p>
              <Link href="/dashboard">
                <Button className="mt-4">Go to my feed</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </DashLayout>
  );
}
