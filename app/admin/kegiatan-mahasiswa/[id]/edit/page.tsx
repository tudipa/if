"use client";

import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { ActivityForm } from "@/components/admin/ActivityForm";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ErrorState, LoadingState } from "@/components/admin/StatusStates";
import { fetchActivityDetail } from "@/lib/queries/student";

export default function EditActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading, isError } = useQuery({ queryKey: ["activity", id], queryFn: () => fetchActivityDetail(id) });

  return (
    <AdminLayout title="Edit Kegiatan Mahasiswa">
      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState /> : null}
      {data ? <ActivityForm item={data} /> : null}
    </AdminLayout>
  );
}
