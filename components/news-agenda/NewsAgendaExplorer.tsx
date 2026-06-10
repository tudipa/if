"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AgendaCard } from "@/components/news-agenda/AgendaCard";
import { NewsCard } from "@/components/news-agenda/NewsCard";
import { SearchInput } from "@/components/news-agenda/SearchInput";
import { SectionHeading } from "@/components/profile/SectionHeading";
import { ErrorState, LoadingState } from "@/components/admin/StatusStates";
import { EmptyState } from "@/components/student/EmptyState";
import { FilterTabs } from "@/components/student/FilterTabs";
import { fetchAgenda } from "@/lib/queries/agenda";
import { fetchNews } from "@/lib/queries/news";

const typeFilters = ["Semua", "Berita", "Agenda"];

export function NewsAgendaExplorer() {
  const newsQuery = useQuery({ queryKey: ["news", "public"], queryFn: () => fetchNews("?status=published&limit=100") });
  const agendaQuery = useQuery({
    queryKey: ["agenda", "public"],
    queryFn: () => fetchAgenda("?publishStatus=published&limit=100")
  });
  const newsItems = useMemo(() => newsQuery.data?.data ?? [], [newsQuery.data?.data]);
  const agendaItems = useMemo(() => agendaQuery.data?.data ?? [], [agendaQuery.data?.data]);
  const categories = useMemo(
    () => ["Semua Kategori", ...Array.from(new Set([...newsItems, ...agendaItems].map((item) => item.category)))],
    [agendaItems, newsItems]
  );
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("Semua");
  const [categoryFilter, setCategoryFilter] = useState("Semua Kategori");

  const normalizedQuery = query.trim().toLowerCase();
  const matchesText = (item: { title: string; excerpt: string }) =>
    normalizedQuery.length === 0 ||
    item.title.toLowerCase().includes(normalizedQuery) ||
    item.excerpt.toLowerCase().includes(normalizedQuery);
  const matchesCategory = (category: string) => categoryFilter === "Semua Kategori" || category === categoryFilter;
  const shouldShowNews = typeFilter === "Semua" || typeFilter === "Berita";
  const shouldShowAgenda = typeFilter === "Semua" || typeFilter === "Agenda";

  const filteredNews = shouldShowNews
    ? newsItems.filter((item) => matchesText(item) && matchesCategory(item.category))
    : [];
  const filteredAgenda = shouldShowAgenda
    ? agendaItems.filter((item) => matchesText(item) && matchesCategory(item.category))
    : [];
  const isEmpty = filteredNews.length === 0 && filteredAgenda.length === 0;

  if (newsQuery.isLoading || agendaQuery.isLoading) {
    return <LoadingState label="Memuat berita dan agenda..." />;
  }

  if (newsQuery.isError || agendaQuery.isError) {
    return <ErrorState label="Gagal memuat berita dan agenda dari API." />;
  }

  return (
    <div>
      <div className="mb-12 rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
          <SearchInput onChange={setQuery} value={query} />
          <select
            className="h-11 rounded-md border border-slate-200 px-3 text-sm font-semibold text-slate-700 outline-none focus:border-ocean focus:ring-2 focus:ring-blue-100"
            onChange={(event) => setCategoryFilter(event.target.value)}
            value={categoryFilter}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-5">
          <FilterTabs activeValue={typeFilter} onChange={setTypeFilter} values={typeFilters} />
        </div>
      </div>

      {isEmpty ? (
        <EmptyState
          title="Tidak ada berita atau agenda"
          description="Tidak ada berita atau agenda yang sesuai dengan pencarian."
        />
      ) : null}

      {filteredNews.length > 0 ? (
        <section className={filteredAgenda.length > 0 ? "mb-20" : ""}>
          <SectionHeading
            eyebrow="Berita"
            title="Berita Terbaru"
            description="Informasi terbaru seputar kegiatan akademik, kemahasiswaan, penelitian, kerja sama, dan pengumuman jurusan."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredNews.map((item) => (
              <NewsCard {...item} key={item.id} />
            ))}
          </div>
        </section>
      ) : null}

      {filteredAgenda.length > 0 ? (
        <section>
          <SectionHeading
            eyebrow="Agenda"
            title="Agenda Kegiatan"
            description="Agenda penting jurusan ditampilkan dengan blok tanggal agar mudah dipindai oleh pengunjung."
          />
          <div className="grid gap-5">
            {filteredAgenda.map((item) => (
              <AgendaCard {...item} key={item.id} status={item.statusAgenda} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
