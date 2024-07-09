"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Role, type User } from "@prisma/client";
import { useState } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

type RoleType = "ADMIN" | "USER";

export function RoleChangeDialog({ user }: { user: User }) {
  const router = useRouter();
  const toast = useToast();
  const [role, setRole] = useState<RoleType>(user.role as RoleType);

  const roleUpdate = api.users.roleUpdate.useMutation({
    onSuccess() {
      toast.toast({
        title: "Role updated",
        description: `Role for ${user.email} has been updated to ${role}`,
      });
      router.refresh();
    },
    onError(err) {
      toast.toast({
        title: "Error updating role",
        description: err.message,
      });
    },
  });

  const handleRoleUpdate = async () => {
    await roleUpdate.mutateAsync({
      id: user.id,
      role,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="my-3 block" variant="outline">
          Change user role
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change user role</DialogTitle>
          <DialogDescription>
            Change the role of the user to either USER or ADMIN
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as RoleType)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                  <SelectItem value={Role.USER}>User</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button onClick={handleRoleUpdate} type="button">
              Change
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
