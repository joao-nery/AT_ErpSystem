"use server";

import { cookies } from "next/headers";

export async function GetCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("Token not found");
  }

  return token;
}
