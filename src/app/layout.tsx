import "@/styles/globals.css";

import localFont from "next/font/local";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const myFont = localFont({
  src: "./CalSans-SemiBold.woff2",
  display: "swap",
  variable: "--font-sans",
});

export const metadata = {
  title: "ScarletBite",
  description: "ScarletBite is a food delivery service",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          myFont.variable,
        )}
      >
        <TRPCReactProvider>
          {children}

          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
