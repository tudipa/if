import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json({ message: "Validasi gagal", errors: error.flatten() }, { status: 400 });
  }

  console.error(error);
  return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 });
}
