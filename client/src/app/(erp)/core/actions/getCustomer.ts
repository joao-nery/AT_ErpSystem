"use server";

import { cookies } from "next/headers";

export async function getCustomerForUUID(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  const res = await fetch(`http://localhost:3001/customers/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar o produto");
  }

  const dataCustomer = await res.json();
  return dataCustomer;
}
