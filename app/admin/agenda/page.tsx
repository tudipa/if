"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, StatusBadge } from "@/components/admin/DataTable";
import { ErrorState, LoadingState } from "@/components/admin/StatusStates";
import { EmptyState } from "@/components/student/EmptyState";
import { deleteAgenda, fetchAgenda, type AgendaItem } from "@/lib/queries/agenda";

export default function AdminAgendaPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [statusAgenda, setStatusAgenda] = useState("");
  const [publishStatus, setPublishStatus] = useState("");
  const queryClient = useQueryClient();
  const queryString = useMemo(() => {
    const params = new URLSearchParams({ limit: "100" });
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (statusAgenda) params.set("statusAgenda", statusAgenda);
    if (publishStatus) params.set("publishStatus", publishStatus);
    return `?${params.toString()}`;
  }, [category, publishStatus, search, statusAgenda]);
  const { data, isLoading, isError } = useQuery({ queryKey: ["agenda", queryString], queryFn: () => fetchAgenda(queryString) });
  const categories = Array.from(new Set(data?.data.map((item) => item.category) ?? []));
  const deleteMutation = useMutation({
    mutationFn: deleteAgenda,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["agenda"] })
  });

  return (
    <AdminLayout title="Agenda">
      <div className="mb-5 grid gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_160px_160px_160px_auto]">
        <input className="h-11 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setSearch(event.target.value)} placeholder="Cari agenda" value={search} />
        <select className="h-11 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setCategory(event.target.value)} value={category}>
          <option value="">Kategori</option>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select className="h-11 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setStatusAgenda(event.target.value)} value={statusAgenda}>
          <option value="">Status agenda</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        <select className="h-11 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setPublishStatus(event.target.value)} value={publishStatus}>
          <option value="">Publish</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <Link className="rounded-md bg-ocean px-5 py-3 text-center text-sm font-bold text-white" href="/admin/agenda/create">Tambah Agenda</Link>
      </div>
      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState /> : null}
      {data && data.data.length === 0 ? <EmptyState title="Agenda kosong" description="Belum ada agenda yang sesuai filter." /> : null}
      {data && data.data.length > 0 ? (
        <DataTable<AgendaItem>
          editBasePath="/admin/agenda"
          items={data.data}
          onDelete={(id) => deleteMutation.mutate(id)}
          columns={[
            { header: "Judul", render: (item) => <span className="font-bold text-ink">{item.title}</span> },
            { header: "Kategori", render: (item) => item.category },
            { header: "Agenda", render: (item) => <StatusBadge value={item.statusAgenda} /> },
            { header: "Publish", render: (item) => <StatusBadge value={item.publishStatus} /> }
          ]}
        />
      ) : null}
    </AdminLayout>
  );
}
