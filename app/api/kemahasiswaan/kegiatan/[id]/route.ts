import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-response";
import { isAdminRequest, requireAdmin } from "@/lib/auth";
import { deleteActivityItem, getActivity, updateActivity } from "@/lib/cms-store";
import { activitySchema } from "@/lib/validations/student";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const item = await getActivity(id);
  if (!item || (!isAdminRequest(request) && item.publicationStatus !== "published")) {
    return NextResponse.json({ message: "Kegiatan tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const input = activitySchema.parse(await request.json());
    const item = await updateActivity(id, input);
    if (!item) return NextResponse.json({ message: "Kegiatan tidak ditemukan" }, { status: 404 });
    return NextResponse.json(item);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;
  const { id } = await params;
  await deleteActivityItem(id);
  return NextResponse.json({ ok: true });
}
