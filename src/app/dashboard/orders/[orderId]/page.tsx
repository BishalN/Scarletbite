import { DashLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import React from "react";

// TODO: Add breadcrumbs
// TODO: Add stepper component to show order status
export default async function orderDetailsPage({
  params,
}: {
  params: { orderId: string };
}) {
  // get the order id from the route
  const order = await api.order.getOrderById({ id: +params.orderId });
  return (
    <DashLayout>
      <div className="my-4 space-y-2 p-2">
        <Button variant={"outline"}>Go Back</Button>
        <h1 className="text-2xl font-bold">Order Details #{order?.id}</h1>

        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Order Items</h2>
            <Button variant={"secondary"}>Cancel Order</Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {order?.orderItems.map((orderItem) => (
              <div
                key={orderItem.id}
                className="flex items-center justify-between rounded-lg border p-2"
              >
                <div>
                  <h3 className="text-lg font-semibold">
                    {orderItem.menuItem.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {orderItem.menuItem.description}
                  </p>
                </div>

                <div className="space-x-2">
                  <span className="text-lg font-semibold">
                    {orderItem.quantity}
                  </span>
                  <span className="text-lg font-semibold"> x</span>
                  <span className="text-lg font-semibold">
                    ${orderItem.menuItem.price}
                  </span>

                  <span className="text-lg font-semibold">
                    = ${orderItem.menuItem.price * orderItem.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Total</h2>
          <span className="text-lg font-semibold">
            $
            {order?.orderItems.reduce(
              (acc, item) => acc + item.menuItem.price * item.quantity,
              0,
            )}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Status</h2>
          <span className="text-lg font-semibold">{order?.status}</span>
        </div>
      </div>
    </DashLayout>
  );
}
