"use client";

import { signIn } from "next-auth/react";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Icons } from "./ui/icons";

export function AdminCreateAccountCard() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Welcome to ScarletBite Admin</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Button
          onClick={async () => {
            await signIn("google", { callbackUrl: "/admin/dashboard" });
          }}
        >
          <Icons.google className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            await signIn("discord", { callbackUrl: "/admin/dashboard" });
          }}
        >
          <Icons.discord className="mr-2 h-4 w-4" />
          Continue with Discord
        </Button>
      </CardContent>
    </Card>
  );
}
