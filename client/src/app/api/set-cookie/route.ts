import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { access_token } = await request.json();

  if (!access_token) {
    return NextResponse.json({ error: "Token not found" }, { status: 400 });
  }

  (await cookies()).set("auth_token", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  return NextResponse.json({ message: "Cookie set successfully" });
}
