import { z } from "zod";

const slugSchema = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug harus URL-friendly")
  .optional()
  .or(z.literal(""));

const optionalUrlSchema = z.string().trim().url("URL harus valid").optional().or(z.literal(""));

export const achievementSchema = z.object({
  title: z.string().trim().min(1, "Title wajib diisi"),
  slug: slugSchema,
  studentName: z.string().trim().min(1, "Nama mahasiswa atau tim wajib diisi"),
  level: z.enum(["local", "regional", "national", "international"]),
  eventName: z.string().trim().min(1, "Nama lomba atau kegiatan wajib diisi"),
  organizer: z.string().trim().min(1, "Penyelenggara wajib diisi"),
  date: z.string().trim().min(1, "Tanggal atau tahun wajib diisi"),
  description: z.string().trim().min(1, "Deskripsi wajib diisi"),
  image: optionalUrlSchema,
  attachment: optionalUrlSchema,
  publicationStatus: z.enum(["draft", "published"])
});

export const activitySchema = z.object({
  title: z.string().trim().min(1, "Title wajib diisi"),
  slug: slugSchema,
  category: z.string().trim().min(1, "Kategori wajib diisi"),
  date: z.string().trim().min(1, "Tanggal wajib diisi"),
  location: z.string().trim().min(1, "Lokasi wajib diisi"),
  description: z.string().trim().min(1, "Deskripsi wajib diisi"),
  image: optionalUrlSchema,
  galleryImages: z.array(optionalUrlSchema).default([]),
  attachment: optionalUrlSchema,
  publicationStatus: z.enum(["draft", "published"])
});

export type AchievementInput = z.infer<typeof achievementSchema>;
export type ActivityInput = z.infer<typeof activitySchema>;
