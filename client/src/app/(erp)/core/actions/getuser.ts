"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: string;
};

export async function GetUserForUUID() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  const res = await fetch("http://localhost:3001/auth/token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `${token?.value}`,
    },
  });

  if (!res.ok) {
    console.error("Erro ao buscar o usuário");
    redirect("/pages/login");
  }

  const dataUserID: User = await res.json();

  return dataUserID;
}
