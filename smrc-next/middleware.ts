import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const session = (await cookies()).get("user");
  const protectedRoutes = ["/home", "/recaps", "/rfg", "/races", "/coolers", "/admin"];

  console.log("Session Cookie:", session);

  if (!session && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/recaps", "/rfg", "/races", "/coolers", "/admin"],
};