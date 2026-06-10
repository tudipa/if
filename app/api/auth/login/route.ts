import { NextRequest, NextResponse } from "next/server";
import { createAdminLoginResponse, verifyAdminCredentials } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;
  const email = String(body?.email || "");
  const password = String(body?.password || "");

  if (!verifyAdminCredentials(email, password)) {
    return NextResponse.json({ ok: false, message: "Email atau password salah" }, { status: 401 });
  }

  return createAdminLoginResponse();
}
