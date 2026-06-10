"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, StatusBadge } from "@/components/admin/DataTable";
import { ErrorState, LoadingState } from "@/components/admin/StatusStates";
import { EmptyState } from "@/components/student/EmptyState";
import { deleteAchievement, fetchAchievements, type AchievementItem } from "@/lib/queries/student";

export default function AdminAchievementsPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [publicationStatus, setPublicationStatus] = useState("");
  const queryClient = useQueryClient();
  const queryString = useMemo(() => {
    const params = new URLSearchParams({ admin: "true", limit: "100" });
    if (search) params.set("search", search);
    if (level) params.set("level", level);
    if (publicationStatus) params.set("publicationStatus", publicationStatus);
    return `?${params.toString()}`;
  }, [level, publicationStatus, search]);
  const { data, isLoading, isError } = useQuery({ queryKey: ["achievements", queryString], queryFn: () => fetchAchievements(queryString) });
  const deleteMutation = useMutation({ mutationFn: deleteAchievement, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["achievements"] }) });

  return (
    <AdminLayout title="Prestasi Mahasiswa">
      <div className="mb-5 grid gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_170px_170px_auto]">
        <input className="h-11 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setSearch(event.target.value)} placeholder="Cari prestasi" value={search} />
        <select className="h-11 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setLevel(event.target.value)} value={level}>
          <option value="">Semua level</option>
          <option value="local">Local</option>
          <option value="regional">Regional</option>
          <option value="national">National</option>
          <option value="international">International</option>
        </select>
        <select className="h-11 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setPublicationStatus(event.target.value)} value={publicationStatus}>
          <option value="">Semua status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <Link className="rounded-md bg-ocean px-5 py-3 text-center text-sm font-bold text-white" href="/admin/prestasi-mahasiswa/create">Tambah Prestasi</Link>
      </div>
      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState /> : null}
      {data && data.data.length === 0 ? <EmptyState title="Prestasi kosong" description="Belum ada prestasi yang sesuai filter." /> : null}
      {data && data.data.length > 0 ? (
        <DataTable<AchievementItem>
          editBasePath="/admin/prestasi-mahasiswa"
          items={data.data}
          onDelete={(id) => deleteMutation.mutate(id)}
          columns={[
            { header: "Judul", render: (item) => <span className="font-bold text-ink">{item.title}</span> },
            { header: "Mahasiswa / Tim", render: (item) => item.studentName },
            { header: "Level", render: (item) => <StatusBadge value={item.level} /> },
            { header: "Status", render: (item) => <StatusBadge value={item.publicationStatus} /> },
            { header: "Tanggal", render: (item) => new Date(item.date).toLocaleDateString("id-ID") }
          ]}
        />
      ) : null}
    </AdminLayout>
  );
}
