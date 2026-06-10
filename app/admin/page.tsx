"use client";

import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ErrorState, LoadingState } from "@/components/admin/StatusStates";
import { fetchAgenda } from "@/lib/queries/agenda";
import { fetchNews } from "@/lib/queries/news";
import { fetchAchievements, fetchActivities } from "@/lib/queries/student";

export default function AdminDashboardPage() {
  const newsQuery = useQuery({ queryKey: ["news", "admin-dashboard"], queryFn: () => fetchNews("?admin=true&limit=1") });
  const agendaQuery = useQuery({ queryKey: ["agenda", "admin-dashboard"], queryFn: () => fetchAgenda("?admin=true&limit=1") });
  const achievementQuery = useQuery({ queryKey: ["achievements", "admin-dashboard"], queryFn: () => fetchAchievements("?admin=true&limit=1") });
  const activityQuery = useQuery({ queryKey: ["activities", "admin-dashboard"], queryFn: () => fetchActivities("?admin=true&limit=1") });
  const newsDraftQuery = useQuery({ queryKey: ["news", "draft-count"], queryFn: () => fetchNews("?admin=true&status=draft&limit=1") });
  const newsPublishedQuery = useQuery({ queryKey: ["news", "published-count"], queryFn: () => fetchNews("?admin=true&status=published&limit=1") });
  const agendaDraftQuery = useQuery({ queryKey: ["agenda", "draft-count"], queryFn: () => fetchAgenda("?admin=true&publishStatus=draft&limit=1") });
  const agendaPublishedQuery = useQuery({ queryKey: ["agenda", "published-count"], queryFn: () => fetchAgenda("?admin=true&publishStatus=published&limit=1") });
  const achievementDraftQuery = useQuery({ queryKey: ["achievements", "draft-count"], queryFn: () => fetchAchievements("?admin=true&publicationStatus=draft&limit=1") });
  const achievementPublishedQuery = useQuery({ queryKey: ["achievements", "published-count"], queryFn: () => fetchAchievements("?admin=true&publicationStatus=published&limit=1") });
  const activityDraftQuery = useQuery({ queryKey: ["activities", "draft-count"], queryFn: () => fetchActivities("?admin=true&publicationStatus=draft&limit=1") });
  const activityPublishedQuery = useQuery({ queryKey: ["activities", "published-count"], queryFn: () => fetchActivities("?admin=true&publicationStatus=published&limit=1") });

  const queries = [newsQuery, agendaQuery, achievementQuery, activityQuery, newsDraftQuery, newsPublishedQuery, agendaDraftQuery, agendaPublishedQuery, achievementDraftQuery, achievementPublishedQuery, activityDraftQuery, activityPublishedQuery];
  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);

  const stats = [
    { label: "Jumlah Berita", value: newsQuery.data?.meta.total ?? 0 },
    { label: "Jumlah Agenda", value: agendaQuery.data?.meta.total ?? 0 },
    { label: "Prestasi Mahasiswa", value: achievementQuery.data?.meta.total ?? 0 },
    { label: "Kegiatan Mahasiswa", value: activityQuery.data?.meta.total ?? 0 },
    { label: "Draft", value: (newsDraftQuery.data?.meta.total ?? 0) + (agendaDraftQuery.data?.meta.total ?? 0) + (achievementDraftQuery.data?.meta.total ?? 0) + (activityDraftQuery.data?.meta.total ?? 0) },
    { label: "Published", value: (newsPublishedQuery.data?.meta.total ?? 0) + (agendaPublishedQuery.data?.meta.total ?? 0) + (achievementPublishedQuery.data?.meta.total ?? 0) + (activityPublishedQuery.data?.meta.total ?? 0) }
  ];

  return (
    <AdminLayout title="Dashboard">
      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState /> : null}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm" key={stat.label}>
            <p className="text-sm font-bold uppercase tracking-wide text-ocean">{stat.label}</p>
            <p className="mt-3 text-4xl font-bold text-ink">{stat.value}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
