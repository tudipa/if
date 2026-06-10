import type { ListResponse } from "@/lib/queries/news";

export type AchievementItem = {
  id: string;
  title: string;
  slug: string;
  studentName: string;
  level: "local" | "regional" | "national" | "international";
  eventName: string;
  organizer: string;
  date: string;
  description: string;
  image?: string | null;
  attachment?: string | null;
  publicationStatus: "draft" | "published";
  createdAt: string;
  updatedAt: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  location: string;
  description: string;
  image?: string | null;
  galleryImages: string[];
  attachment?: string | null;
  publicationStatus: "draft" | "published";
  createdAt: string;
  updatedAt: string;
};

export async function fetchAchievements(params = "") {
  const response = await fetch(`/api/kemahasiswaan/prestasi${params}`);
  if (!response.ok) throw new Error("Gagal mengambil data prestasi mahasiswa");
  return response.json() as Promise<ListResponse<AchievementItem>>;
}

export async function fetchAchievementDetail(id: string) {
  const response = await fetch(`/api/kemahasiswaan/prestasi/${id}`);
  if (!response.ok) throw new Error("Gagal mengambil detail prestasi mahasiswa");
  return response.json() as Promise<AchievementItem>;
}

export async function saveAchievement(payload: Partial<AchievementItem>, id?: string) {
  const response = await fetch(id ? `/api/kemahasiswaan/prestasi/${id}` : "/api/kemahasiswaan/prestasi", {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error("Gagal menyimpan prestasi mahasiswa");
  return response.json() as Promise<AchievementItem>;
}

export async function deleteAchievement(id: string) {
  const response = await fetch(`/api/kemahasiswaan/prestasi/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Gagal menghapus prestasi mahasiswa");
  return response.json() as Promise<{ ok: boolean }>;
}

export async function fetchActivities(params = "") {
  const response = await fetch(`/api/kemahasiswaan/kegiatan${params}`);
  if (!response.ok) throw new Error("Gagal mengambil data kegiatan mahasiswa");
  return response.json() as Promise<ListResponse<ActivityItem>>;
}

export async function fetchActivityDetail(id: string) {
  const response = await fetch(`/api/kemahasiswaan/kegiatan/${id}`);
  if (!response.ok) throw new Error("Gagal mengambil detail kegiatan mahasiswa");
  return response.json() as Promise<ActivityItem>;
}

export async function saveActivity(payload: Partial<ActivityItem>, id?: string) {
  const response = await fetch(id ? `/api/kemahasiswaan/kegiatan/${id}` : "/api/kemahasiswaan/kegiatan", {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error("Gagal menyimpan kegiatan mahasiswa");
  return response.json() as Promise<ActivityItem>;
}

export async function deleteActivity(id: string) {
  const response = await fetch(`/api/kemahasiswaan/kegiatan/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Gagal menghapus kegiatan mahasiswa");
  return response.json() as Promise<{ ok: boolean }>;
}
