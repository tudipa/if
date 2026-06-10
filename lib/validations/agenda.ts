import { z } from "zod";

const slugSchema = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug harus URL-friendly")
  .optional()
  .or(z.literal(""));

const imageSchema = z.string().trim().url("Image harus berupa URL valid").optional().or(z.literal(""));

export const agendaSchema = z.object({
  title: z.string().trim().min(1, "Title wajib diisi"),
  slug: slugSchema,
  category: z.string().trim().min(1, "Category wajib diisi"),
  date: z.string().trim().min(1, "Date wajib diisi"),
  time: z.string().trim().min(1, "Time wajib diisi"),
  location: z.string().trim().min(1, "Location wajib diisi"),
  statusAgenda: z.enum(["upcoming", "ongoing", "completed"]),
  excerpt: z.string().trim().min(1, "Excerpt wajib diisi"),
  content: z.string().trim().min(1, "Content wajib diisi"),
  image: imageSchema,
  publishStatus: z.enum(["draft", "published"]),
  featured: z.boolean().default(false)
});

export type AgendaInput = z.infer<typeof agendaSchema>;
