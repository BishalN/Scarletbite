import { AdminDashLayout } from "@/components/admin-dashboard-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/server";

export default async function UsersPage() {
  const users = await api.users.getAllUsers();
  return (
    <AdminDashLayout>
      <div className="my-4 space-y-2 p-2">
        <h1 className="text-2xl font-bold">Users</h1>
        {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}

        {users.map((user) => {
          return (
            <Card className="py-3" key={user.id}>
              <CardContent className="flex justify-between">
                <div>
                  <h2>{user.email}</h2>
                </div>
                <Avatar>
                  <AvatarImage src={user.image!} alt={user.name!} />
                  <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AdminDashLayout>
  );
}
