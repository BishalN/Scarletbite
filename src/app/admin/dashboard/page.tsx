import { getServerAuthSession } from "@/server/auth";
import { redirect, RedirectType } from "next/navigation";
import { api } from "@/trpc/server";
import { AdminDashLayout } from "@/components/admin-dashboard-layout";
import { Card } from "@/components/ui/card";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
dayjs.extend(relativeTime);

export default async function Dashboard() {
  const session = await getServerAuthSession();
  if (!session) {
    return redirect("/", RedirectType.replace);
  }
  const recentOrders = await api.adminOrder.getAllOrders();

  return (
    <AdminDashLayout>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Recent Orders</h1>
        </div>
        <div>
          {recentOrders.map((order) => {
            return (
              <Link
                href={`/admin/dashboard/orders/${order.id}`}
                key={order.id}
                passHref
              >
                <Card
                  className="my-2 flex cursor-pointer justify-between px-4 py-3"
                  key={order.id}
                >
                  <div>
                    {order.orderItems.map((orderItem) => {
                      return (
                        <div key={orderItem.id}>
                          {orderItem.quantity} plate {orderItem.menuItem.name}
                        </div>
                      );
                    })}
                    <div className="text-sm text-gray-500">
                      Order created {dayjs(order.createdAt).fromNow()}
                    </div>
                  </div>
                  <div>
                    <Avatar>
                      <AvatarImage src={order.user.image!} />
                      <AvatarFallback>{order.user.name}</AvatarFallback>
                    </Avatar>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </AdminDashLayout>
  );
}
