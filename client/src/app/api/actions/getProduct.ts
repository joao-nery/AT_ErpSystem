"use server";

import { cookies } from "next/headers";

export async function GetProductForUUID(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  const res = await fetch(`http://localhost:3001/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar o produto");
  }

  const dataProduct = await res.json();
  return dataProduct;
}
