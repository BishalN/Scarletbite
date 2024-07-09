"use client";

import { api } from "@/trpc/react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { OrderStatus } from "@prisma/client";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export const OrderUpdateButton = ({
  order,
}: {
  order: {
    id: number;
    status: OrderStatus;
  };
}) => {
  const toast = useToast();
  const router = useRouter();
  const updateOrderStatus = api.adminOrder.updateOrderStatus.useMutation({
    onSuccess: () => {
      toast.toast({
        title: "Order Updated",
        description: "Order status updated successfully",
      });

      router.refresh();
    },
    onError: (error) => {
      toast.toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const [status, setStatus] = useState(order.status);
  const [open, setOpen] = useState(false);

  const handleOrderStatusChange = () => {
    updateOrderStatus.mutate({ id: order.id, status });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Update Order Status</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change the order status</DialogTitle>
        </DialogHeader>
        <Select
          value={status}
          onValueChange={(value) => setStatus(value as OrderStatus)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue defaultValue={status} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value={OrderStatus.PENDING}>Pending</SelectItem>
              <SelectItem value={OrderStatus.PREPARING}>Preparing</SelectItem>
              <SelectItem value={OrderStatus.COMPLETED}>Completed</SelectItem>
              <SelectItem value={OrderStatus.READY}>Ready</SelectItem>
              <SelectItem value={OrderStatus.CANCELED}>Cancelled</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button onClick={handleOrderStatusChange}>Update Order Status</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
