import { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE = "if_cms_admin";

function authToken() {
  return process.env.CMS_AUTH_TOKEN || "local-admin-session";
}

export function isAdminRequest(request: NextRequest) {
  return request.cookies.get(ADMIN_COOKIE)?.value === authToken();
}

export function requireAdmin(request: NextRequest) {
  if (isAdminRequest(request)) return null;
  return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  };
}

export function verifyAdminCredentials(email: string, password: string) {
  const adminEmail = process.env.CMS_ADMIN_EMAIL || "admin@if.local";
  const adminPassword = process.env.CMS_ADMIN_PASSWORD || "admin123";
  return email === adminEmail && password === adminPassword;
}

export function createAdminLoginResponse() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, authToken(), adminCookieOptions());
  return response;
}

export function createAdminLogoutResponse() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { ...adminCookieOptions(), maxAge: 0 });
  return response;
}
