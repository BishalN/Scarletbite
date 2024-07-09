"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const MenuItemModel = z.object({
  id: z.number().int(),
  name: z.string().min(3),
  description: z.string().min(5),
  price: z.coerce.number().min(1),
  isAvailable: z.boolean(),
  thumbnail: z.string().nullish(),
});

export function MenuEditForm({
  menu,
}: {
  menu: z.infer<typeof MenuItemModel>;
}) {
  const router = useRouter();
  const toast = useToast();
  const updateMenuItem = api.adminMenu.updateMenu.useMutation({
    onSuccess: () => {
      toast.toast({
        title: "Menu item edited",
        description: "Your menu item has been edited successfully",
      });
      router.push("/admin/dashboard/menu");
      router.refresh();
    },
    onError: (error) => {
      toast.toast({
        title: "Error editing menu item",
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof MenuItemModel>>({
    resolver: zodResolver(MenuItemModel),
    defaultValues: {
      ...menu,
    },
  });

  function onSubmit(values: z.infer<typeof MenuItemModel>) {
    updateMenuItem.mutate(values);
  }

  return (
    <div className="max-w-[800px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Chicken Tikka" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe Chicken Tikka" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isAvailable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Is Available</FormLabel>
                  <FormDescription>
                    If you want to make this item available for purchase then
                    check this box.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
