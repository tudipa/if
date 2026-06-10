"use client";

import { useQuery } from "@tanstack/react-query";
import { NewsCard } from "@/components/news-agenda/NewsCard";
import { ErrorState, LoadingState } from "@/components/admin/StatusStates";
import { fetchNews } from "@/lib/queries/news";

export function FeaturedNews() {
  const featuredQuery = useQuery({
    queryKey: ["news", "featured"],
    queryFn: () => fetchNews("?status=published&featured=true&limit=1")
  });
  const fallbackQuery = useQuery({
    queryKey: ["news", "latest"],
    queryFn: () => fetchNews("?status=published&limit=1"),
    enabled: Boolean(featuredQuery.data && featuredQuery.data.data.length === 0)
  });
  const item = featuredQuery.data?.data[0] ?? fallbackQuery.data?.data[0];

  if (featuredQuery.isLoading || fallbackQuery.isLoading) return <LoadingState label="Memuat berita utama..." />;
  if (featuredQuery.isError || fallbackQuery.isError) return <ErrorState label="Gagal memuat berita utama." />;
  if (!item) return null;

  return <NewsCard {...item} />;
}
