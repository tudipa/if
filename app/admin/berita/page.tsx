"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, StatusBadge } from "@/components/admin/DataTable";
import { ErrorState, LoadingState } from "@/components/admin/StatusStates";
import { EmptyState } from "@/components/student/EmptyState";
import { deleteNews, fetchNews, type NewsItem } from "@/lib/queries/news";

export default function AdminNewsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const queryClient = useQueryClient();
  const queryString = useMemo(() => {
    const params = new URLSearchParams({ limit: "100" });
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (status) params.set("status", status);
    return `?${params.toString()}`;
  }, [category, search, status]);
  const { data, isLoading, isError } = useQuery({ queryKey: ["news", queryString], queryFn: () => fetchNews(queryString) });
  const categories = Array.from(new Set(data?.data.map((item) => item.category) ?? []));
  const deleteMutation = useMutation({
    mutationFn: deleteNews,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news"] })
  });

  return (
    <AdminLayout title="Berita">
      <div className="mb-5 flex flex-col gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm lg:flex-row">
        <input className="h-11 flex-1 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setSearch(event.target.value)} placeholder="Cari berita" value={search} />
        <select className="h-11 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setCategory(event.target.value)} value={category}>
          <option value="">Semua kategori</option>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select className="h-11 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setStatus(event.target.value)} value={status}>
          <option value="">Semua status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <Link className="rounded-md bg-ocean px-5 py-3 text-center text-sm font-bold text-white" href="/admin/berita/create">Tambah Berita</Link>
      </div>
      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState /> : null}
      {data && data.data.length === 0 ? <EmptyState title="Berita kosong" description="Belum ada berita yang sesuai filter." /> : null}
      {data && data.data.length > 0 ? (
        <DataTable<NewsItem>
          editBasePath="/admin/berita"
          items={data.data}
          onDelete={(id) => deleteMutation.mutate(id)}
          columns={[
            { header: "Judul", render: (item) => <span className="font-bold text-ink">{item.title}</span> },
            { header: "Kategori", render: (item) => item.category },
            { header: "Status", render: (item) => <StatusBadge value={item.status} /> },
            { header: "Tanggal", render: (item) => new Date(item.date).toLocaleDateString("id-ID") }
          ]}
        />
      ) : null}
    </AdminLayout>
  );
}
