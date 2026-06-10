export type AgendaItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  time: string;
  location: string;
  statusAgenda: "upcoming" | "ongoing" | "completed";
  excerpt: string;
  content: string;
  image?: string | null;
  publishStatus: "draft" | "published";
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ListResponse<T> = {
  data: T[];
  meta: { page: number; limit: number; total: number; pageCount: number };
};

export async function fetchAgenda(params = "") {
  const response = await fetch(`/api/agenda${params}`);
  if (!response.ok) throw new Error("Gagal mengambil data agenda");
  return response.json() as Promise<ListResponse<AgendaItem>>;
}

export async function fetchAgendaDetail(id: string) {
  const response = await fetch(`/api/agenda/${id}`);
  if (!response.ok) throw new Error("Gagal mengambil detail agenda");
  return response.json() as Promise<AgendaItem>;
}

export async function saveAgenda(payload: Partial<AgendaItem>, id?: string) {
  const response = await fetch(id ? `/api/agenda/${id}` : "/api/agenda", {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error("Gagal menyimpan agenda");
  return response.json() as Promise<AgendaItem>;
}

export async function deleteAgenda(id: string) {
  const response = await fetch(`/api/agenda/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Gagal menghapus agenda");
  return response.json() as Promise<{ ok: boolean }>;
}
