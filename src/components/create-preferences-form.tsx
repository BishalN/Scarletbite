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
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const PreferenceModel = z.object({
  currency: z.string(),
  cashOnDelivery: z.boolean(),
});

export function CreatePreferenceForm() {
  const router = useRouter();
  const toast = useToast();
  const createPreference = api.preferences.create.useMutation({
    onSuccess: () => {
      toast.toast({
        title: "Preferences created",
        description: "Your preferences has been created successfully",
      });
      router.refresh();
    },
    onError: (error) => {
      toast.toast({
        title: "Error creating preferences",
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof PreferenceModel>>({
    resolver: zodResolver(PreferenceModel),
    defaultValues: {
      currency: "",
      cashOnDelivery: false,
    },
  });

  function onSubmit(values: z.infer<typeof PreferenceModel>) {
    createPreference.mutate(values);
  }

  return (
    <div className="max-w-[800px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <Input placeholder="dollar" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cashOnDelivery"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Cash on Delivery</FormLabel>
                  <FormDescription>
                    Enable cash on delivery for your store
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
