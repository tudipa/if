export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string | null;
  status: "draft" | "published";
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ListResponse<T> = {
  data: T[];
  meta: { page: number; limit: number; total: number; pageCount: number };
};

export async function fetchNews(params = "") {
  const response = await fetch(`/api/news${params}`);
  if (!response.ok) throw new Error("Gagal mengambil data berita");
  return response.json() as Promise<ListResponse<NewsItem>>;
}

export async function fetchNewsDetail(id: string) {
  const response = await fetch(`/api/news/${id}`);
  if (!response.ok) throw new Error("Gagal mengambil detail berita");
  return response.json() as Promise<NewsItem>;
}

export async function saveNews(payload: Partial<NewsItem>, id?: string) {
  const response = await fetch(id ? `/api/news/${id}` : "/api/news", {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error("Gagal menyimpan berita");
  return response.json() as Promise<NewsItem>;
}

export async function deleteNews(id: string) {
  const response = await fetch(`/api/news/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Gagal menghapus berita");
  return response.json() as Promise<{ ok: boolean }>;
}
