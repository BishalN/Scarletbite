import { AdminDashLayout } from "@/components/admin-dashboard-layout";
import { RoleChangeDialog } from "@/components/role-change-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/server";

export default async function UsersPage() {
  const users = await api.users.getAllUsers();
  const currentUser = await api.me.currentUser();
  return (
    <AdminDashLayout>
      <div className="my-4 space-y-2 p-2">
        <h1 className="text-2xl font-bold">Users</h1>
        {users.map((user) => {
          return (
            <Card
              className={`py-3 ${currentUser?.id === user.id && "bg-primary-foreground"}`}
              key={user.id}
            >
              <div className={`flex justify-between p-4 `}>
                <div className="">
                  <h2>{user.email}</h2>
                  <Badge>{user.role}</Badge>
                  {currentUser?.id !== user.id &&
                    currentUser?.role === "SUPER" && (
                      <RoleChangeDialog user={user} />
                    )}
                </div>
                <Avatar>
                  <AvatarImage src={user.image!} alt={user.name!} />
                  <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
              </div>
            </Card>
          );
        })}
      </div>
    </AdminDashLayout>
  );
}
