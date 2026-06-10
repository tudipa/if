import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-response";
import { createNews, listNews } from "@/lib/cms-store";
import { newsSchema } from "@/lib/validations/news";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const search = params.get("search")?.trim();
  const category = params.get("category")?.trim();
  const status = params.get("status")?.trim();
  const featured = params.get("featured")?.trim();
  const page = Math.max(Number(params.get("page") ?? 1), 1);
  const limit = Math.min(Math.max(Number(params.get("limit") ?? 20), 1), 100);

  return NextResponse.json(await listNews({ search, category, status, featured, page, limit }));
}

export async function POST(request: NextRequest) {
  try {
    const input = newsSchema.parse(await request.json());
    const item = await createNews(input);

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
