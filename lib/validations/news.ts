import { z } from "zod";

const slugSchema = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug harus URL-friendly")
  .optional()
  .or(z.literal(""));

const imageSchema = z.string().trim().url("Image harus berupa URL valid").optional().or(z.literal(""));

export const newsSchema = z.object({
  title: z.string().trim().min(1, "Title wajib diisi"),
  slug: slugSchema,
  category: z.string().trim().min(1, "Category wajib diisi"),
  date: z.string().trim().min(1, "Date wajib diisi"),
  excerpt: z.string().trim().min(1, "Excerpt wajib diisi"),
  content: z.string().trim().min(1, "Content wajib diisi"),
  image: imageSchema,
  status: z.enum(["draft", "published"]),
  featured: z.boolean().default(false)
});

export type NewsInput = z.infer<typeof newsSchema>;
