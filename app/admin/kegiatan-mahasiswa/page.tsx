"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, StatusBadge } from "@/components/admin/DataTable";
import { ErrorState, LoadingState } from "@/components/admin/StatusStates";
import { EmptyState } from "@/components/student/EmptyState";
import { deleteActivity, fetchActivities, type ActivityItem } from "@/lib/queries/student";

export default function AdminActivitiesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [publicationStatus, setPublicationStatus] = useState("");
  const queryClient = useQueryClient();
  const queryString = useMemo(() => {
    const params = new URLSearchParams({ admin: "true", limit: "100" });
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (publicationStatus) params.set("publicationStatus", publicationStatus);
    return `?${params.toString()}`;
  }, [category, publicationStatus, search]);
  const { data, isLoading, isError } = useQuery({ queryKey: ["activities", queryString], queryFn: () => fetchActivities(queryString) });
  const categories = Array.from(new Set(data?.data.map((item) => item.category) ?? []));
  const deleteMutation = useMutation({ mutationFn: deleteActivity, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["activities"] }) });

  return (
    <AdminLayout title="Kegiatan Mahasiswa">
      <div className="mb-5 grid gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_170px_170px_auto]">
        <input className="h-11 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setSearch(event.target.value)} placeholder="Cari kegiatan" value={search} />
        <select className="h-11 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setCategory(event.target.value)} value={category}>
          <option value="">Semua kategori</option>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select className="h-11 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setPublicationStatus(event.target.value)} value={publicationStatus}>
          <option value="">Semua status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <Link className="rounded-md bg-ocean px-5 py-3 text-center text-sm font-bold text-white" href="/admin/kegiatan-mahasiswa/create">Tambah Kegiatan</Link>
      </div>
      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState /> : null}
      {data && data.data.length === 0 ? <EmptyState title="Kegiatan kosong" description="Belum ada kegiatan yang sesuai filter." /> : null}
      {data && data.data.length > 0 ? (
        <DataTable<ActivityItem>
          editBasePath="/admin/kegiatan-mahasiswa"
          items={data.data}
          onDelete={(id) => deleteMutation.mutate(id)}
          columns={[
            { header: "Judul", render: (item) => <span className="font-bold text-ink">{item.title}</span> },
            { header: "Kategori", render: (item) => item.category },
            { header: "Lokasi", render: (item) => item.location },
            { header: "Status", render: (item) => <StatusBadge value={item.publicationStatus} /> },
            { header: "Tanggal", render: (item) => new Date(item.date).toLocaleDateString("id-ID") }
          ]}
        />
      ) : null}
    </AdminLayout>
  );
}
