"use client";

import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { AchievementForm } from "@/components/admin/AchievementForm";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ErrorState, LoadingState } from "@/components/admin/StatusStates";
import { fetchAchievementDetail } from "@/lib/queries/student";

export default function EditAchievementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading, isError } = useQuery({ queryKey: ["achievement", id], queryFn: () => fetchAchievementDetail(id) });

  return (
    <AdminLayout title="Edit Prestasi Mahasiswa">
      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState /> : null}
      {data ? <AchievementForm item={data} /> : null}
    </AdminLayout>
  );
}
