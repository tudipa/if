import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-response";
import { isAdminRequest, requireAdmin } from "@/lib/auth";
import { activitySchema } from "@/lib/validations/student";
import { createActivity, listActivities } from "@/lib/cms-store";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const isAdmin = isAdminRequest(request) && params.get("admin") === "true";
  const page = Math.max(Number(params.get("page") ?? 1), 1);
  const limit = Math.min(Math.max(Number(params.get("limit") ?? 20), 1), 100);

  return NextResponse.json(
    await listActivities({
      search: params.get("search")?.trim(),
      category: params.get("category")?.trim(),
      publicationStatus: isAdmin ? params.get("publicationStatus")?.trim() : "published",
      page,
      limit
    })
  );
}

export async function POST(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const input = activitySchema.parse(await request.json());
    return NextResponse.json(await createActivity(input), { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
