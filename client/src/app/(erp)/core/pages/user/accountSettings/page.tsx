"use client";

import { GetUserForUUID } from "@/app/(erp)/core/actions/getuser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";

import type { User } from "@/app/(erp)/core/actions/getuser";
import { Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AccountSettings() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function getUser() {
      const user = await GetUserForUUID();
      setUser(user);
    }
    getUser();
  }, []);

  return (
    <main className="w-full p-10">
      <h1 className="text-2xl mb-10 font-semibold">Configurações da Conta</h1>
      <Card>
        <CardHeader>
          <div className="flex gap-5 ">
            <div className="flex gap-5 items-center">
              <div>
                <Avatar className="size-20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{user?.name}</span>
                <span className="text-muted-foreground">{user?.email}</span>
              </div>
            </div>

            <div className="flex gap-2 items-center justify-between w-full">
              <Badge className="mt-2" variant="default">
                {user?.role}
              </Badge>

              <Edit
                className="text-muted-foreground hover:text-primary hover:cursor-pointer"
                onClick={() => {}}
              />
            </div>
          </div>
        </CardHeader>
      </Card>
    </main>
  );
}
