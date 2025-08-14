"use server";

import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = (await cookies()).get("auth_token");
  if (!token) {
    return NextResponse.redirect(new URL("/pages/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/core/:path*",
};
