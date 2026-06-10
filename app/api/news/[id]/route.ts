import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-response";
import { isAdminRequest, requireAdmin } from "@/lib/auth";
import { deleteNewsItem, getNews, updateNews } from "@/lib/cms-store";
import { newsSchema } from "@/lib/validations/news";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const item = await getNews(id);
  if (!item || (!isAdminRequest(request) && item.status !== "published")) return NextResponse.json({ message: "Berita tidak ditemukan" }, { status: 404 });

  return NextResponse.json(item);
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const input = newsSchema.parse(await request.json());
    const item = await updateNews(id, input);
    if (!item) return NextResponse.json({ message: "Berita tidak ditemukan" }, { status: 404 });

    return NextResponse.json(item);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    await deleteNewsItem(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
