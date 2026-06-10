import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-response";
import { deleteAgendaItem, getAgenda, updateAgenda } from "@/lib/cms-store";
import { agendaSchema } from "@/lib/validations/agenda";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const item = await getAgenda(id);
  if (!item) return NextResponse.json({ message: "Agenda tidak ditemukan" }, { status: 404 });

  return NextResponse.json(item);
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const input = agendaSchema.parse(await request.json());
    const item = await updateAgenda(id, input);
    if (!item) return NextResponse.json({ message: "Agenda tidak ditemukan" }, { status: 404 });

    return NextResponse.json(item);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    await deleteAgendaItem(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
