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

export function CreateAccountCard() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account or sign in</CardTitle>
        <CardDescription>
          Sign in with your Google or Discord account to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Button
          onClick={async () => {
            await signIn("google", { callbackUrl: "/dashboard" });
          }}
        >
          <Icons.google className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            await signIn("discord", { callbackUrl: "/dashboard" });
          }}
        >
          <Icons.discord className="mr-2 h-4 w-4" />
          Continue with Discord
        </Button>
      </CardContent>
    </Card>
  );
}
