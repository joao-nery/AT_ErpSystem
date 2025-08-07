"use server";

import { cookies } from "next/headers";

export async function SetCookie(token: any) {
  const setCookie = (await cookies()).set("auth_token", token);

  if (!setCookie) {
    throw new Error("Erro ao registrar cookie do usuário!");
  }

  return console.log({ Message: "Cookie registrado com sucesso!" });
}
