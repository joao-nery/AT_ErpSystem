"use server";

import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export default async function checkCookie(request: NextRequest) {
  const token = (await cookies()).get("auth_token");
  const { pathname } = request.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/pages/login", request.url));
  }

  // pegar usuário
  const res = await fetch("http://localhost:3001/auth/token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `${token?.value}`,
    },
  });

  const data = await res.json();

  if (data.role == "user" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/pages/login", request.url));
  }

  console.log(request.url);

  return NextResponse.next();
}

export const config = {
  matcher: ["/core/:path*", "/admin/:path*"],
};
