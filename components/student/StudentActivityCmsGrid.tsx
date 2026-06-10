"use client";

import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/student/Badge";
import { EmptyState } from "@/components/student/EmptyState";
import { fetchActivities } from "@/lib/queries/student";

export function StudentActivityCmsGrid() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["public-activities"], queryFn: () => fetchActivities("?limit=100") });

  if (isLoading) return <div className="rounded-md border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-600">Memuat kegiatan mahasiswa...</div>;
  if (isError) return <div className="rounded-md border border-red-100 bg-red-50 p-6 text-sm font-semibold text-red-700">Gagal memuat kegiatan mahasiswa.</div>;
  if (!data || data.data.length === 0) return <EmptyState title="Belum ada kegiatan" description="Kegiatan mahasiswa yang sudah dipublikasikan akan tampil di sini." />;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {data.data.map((item) => (
        <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm" key={item.id}>
          {item.image ? <img alt="" className="mb-4 h-40 w-full rounded-md object-cover" src={item.image} /> : null}
          <div className="flex flex-wrap gap-2">
            <Badge tone="green">{item.category}</Badge>
            <Badge tone="slate">{new Date(item.date).toLocaleDateString("id-ID")}</Badge>
          </div>
          <h2 className="mt-4 text-xl font-bold text-ink">{item.title}</h2>
          <p className="mt-2 text-sm font-semibold text-ocean">{item.location}</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
          {item.galleryImages.length ? (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {item.galleryImages.slice(0, 3).map((url) => <img alt="" className="h-20 rounded-md object-cover" key={url} src={url} />)}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
