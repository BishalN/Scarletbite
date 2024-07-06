"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

export function MenuDeleteDialog({ menuId }: { menuId: number }) {
  const router = useRouter();
  const toast = useToast();
  const deleteMenu = api.adminMenu.deleteMenu.useMutation({
    onSuccess() {
      toast.toast({
        title: "Menu deleted",
        description: "Menu has been deleted successfully",
      });

      router.refresh();
    },
    onError(error) {
      toast.toast({
        title: "Error",
        description: error.message,
      });
    },
  });
  const handleDeleteMenu = () => {
    deleteMenu.mutate({ id: menuId });
    router.refresh();
    // close the dialog
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteMenu}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
