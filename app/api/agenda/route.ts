import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-response";
import { createAgenda, listAgenda } from "@/lib/cms-store";
import { agendaSchema } from "@/lib/validations/agenda";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const search = params.get("search")?.trim();
  const category = params.get("category")?.trim();
  const statusAgenda = params.get("statusAgenda")?.trim();
  const publishStatus = params.get("publishStatus")?.trim();
  const featured = params.get("featured")?.trim();
  const page = Math.max(Number(params.get("page") ?? 1), 1);
  const limit = Math.min(Math.max(Number(params.get("limit") ?? 20), 1), 100);

  return NextResponse.json(await listAgenda({ search, category, statusAgenda, publishStatus, featured, page, limit }));
}

export async function POST(request: NextRequest) {
  try {
    const input = agendaSchema.parse(await request.json());
    const item = await createAgenda(input);

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
