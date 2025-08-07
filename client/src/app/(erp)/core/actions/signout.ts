"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function LogOut() {
  const cookiesStore = await cookies();
  cookiesStore.delete("auth_token");
  redirect("/pages/login");
}
