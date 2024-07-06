import { DemoCreateAccount } from "@/components/create-account-card";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <main className="flex h-screen items-center justify-center space-x-3">
      <h1>Welcome to ScarletBite Admin</h1>
      <DemoCreateAccount />
    </main>
  );
}
