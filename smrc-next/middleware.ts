import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const protectedRoutes = ["/home", "/recaps", "/rfg", "/races", "/coolers", "/admin"];

  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/recaps", "/rfg", "/races", "/coolers", "/admin"],
};