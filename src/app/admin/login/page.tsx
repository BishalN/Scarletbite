import { DemoCreateAccount } from "@/components/create-account-card";

export default async function Home() {
  return (
    <main className="flex h-screen items-center justify-center space-x-3">
      <h1>Welcome to ScarletBite Admin</h1>
      <DemoCreateAccount />
    </main>
  );
}
