"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { NewsForm } from "@/components/admin/NewsForm";
import { ErrorState, LoadingState } from "@/components/admin/StatusStates";
import { fetchNewsDetail } from "@/lib/queries/news";

export default function EditNewsPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({ queryKey: ["news", params.id], queryFn: () => fetchNewsDetail(params.id) });

  return (
    <AdminLayout title="Edit Berita">
      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState /> : null}
      {data ? <NewsForm item={data} /> : null}
    </AdminLayout>
  );
}
