"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AgendaForm } from "@/components/admin/AgendaForm";
import { ErrorState, LoadingState } from "@/components/admin/StatusStates";
import { fetchAgendaDetail } from "@/lib/queries/agenda";

export default function EditAgendaPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({ queryKey: ["agenda", params.id], queryFn: () => fetchAgendaDetail(params.id) });

  return (
    <AdminLayout title="Edit Agenda">
      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState /> : null}
      {data ? <AgendaForm item={data} /> : null}
    </AdminLayout>
  );
}
