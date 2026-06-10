import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/auth";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const expectedToken = process.env.CMS_AUTH_TOKEN || "local-admin-session";
  const isAuthed = request.cookies.get(ADMIN_COOKIE)?.value === expectedToken;

  if (!isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
