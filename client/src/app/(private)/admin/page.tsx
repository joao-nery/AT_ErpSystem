"use client";

import { GetUserForUUID, User } from "@/app/(erp)/core/actions/getuser";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeAdminPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const user = await GetUserForUUID();
    setUser(user);
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold">Admin Page</h1>
      <h1>Bem vindo! {user?.name}</h1>
      <Link href="/core" className="text-blue-500 hover:underline">
        Ir para aplicação
      </Link>
    </main>
  );
}
