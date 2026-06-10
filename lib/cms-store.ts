import { getCloudflareContext } from "@opennextjs/cloudflare";
import { prisma } from "@/lib/prisma";
import { createUniqueSlug } from "@/lib/slug";
import type { AgendaInput } from "@/lib/validations/agenda";
import type { NewsInput } from "@/lib/validations/news";

type CmsEnv = {
  if_cms?: D1Database;
};

type ListParams = {
  search?: string;
  category?: string;
  status?: string;
  statusAgenda?: string;
  publishStatus?: string;
  featured?: string;
  page: number;
  limit: number;
};

async function getD1() {
  try {
    const context = await getCloudflareContext({ async: true });
    return (context.env as CmsEnv).if_cms;
  } catch {
    return undefined;
  }
}

function pageMeta(page: number, limit: number, total: number) {
  return { page, limit, total, pageCount: Math.ceil(total / limit) };
}

function asBoolean(value: unknown) {
  return value === true || value === 1;
}

function normalizeRow<T extends Record<string, unknown>>(row: T) {
  return {
    ...row,
    featured: asBoolean(row.featured)
  };
}

function buildNewsWhere(params: ListParams) {
  const clauses: string[] = [];
  const values: unknown[] = [];

  if (params.search) {
    clauses.push("(title LIKE ? OR excerpt LIKE ? OR content LIKE ?)");
    values.push(`%${params.search}%`, `%${params.search}%`, `%${params.search}%`);
  }
  if (params.category) {
    clauses.push("category = ?");
    values.push(params.category);
  }
  if (params.status === "draft" || params.status === "published") {
    clauses.push("status = ?");
    values.push(params.status);
  }
  if (params.featured === "true" || params.featured === "false") {
    clauses.push("featured = ?");
    values.push(params.featured === "true" ? 1 : 0);
  }

  return { sql: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "", values };
}

function buildAgendaWhere(params: ListParams) {
  const clauses: string[] = [];
  const values: unknown[] = [];

  if (params.search) {
    clauses.push("(title LIKE ? OR excerpt LIKE ? OR content LIKE ?)");
    values.push(`%${params.search}%`, `%${params.search}%`, `%${params.search}%`);
  }
  if (params.category) {
    clauses.push("category = ?");
    values.push(params.category);
  }
  if (params.statusAgenda) {
    clauses.push("statusAgenda = ?");
    values.push(params.statusAgenda);
  }
  if (params.publishStatus === "draft" || params.publishStatus === "published") {
    clauses.push("publishStatus = ?");
    values.push(params.publishStatus);
  }
  if (params.featured === "true" || params.featured === "false") {
    clauses.push("featured = ?");
    values.push(params.featured === "true" ? 1 : 0);
  }

  return { sql: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "", values };
}

export async function listNews(params: ListParams) {
  const db = await getD1();
  if (!db) {
    const where = {
      ...(params.search
        ? { OR: [{ title: { contains: params.search } }, { excerpt: { contains: params.search } }, { content: { contains: params.search } }] }
        : {}),
      ...(params.category ? { category: params.category } : {}),
      ...(params.status === "draft" || params.status === "published" ? { status: params.status } : {}),
      ...(params.featured === "true" ? { featured: true } : params.featured === "false" ? { featured: false } : {})
    };
    const [items, total] = await Promise.all([
      prisma.news.findMany({ where, orderBy: [{ featured: "desc" }, { date: "desc" }], skip: (params.page - 1) * params.limit, take: params.limit }),
      prisma.news.count({ where })
    ]);
    return { data: items, meta: pageMeta(params.page, params.limit, total) };
  }

  const where = buildNewsWhere(params);
  const offset = (params.page - 1) * params.limit;
  const [itemsResult, countResult] = await Promise.all([
    db.prepare(`SELECT * FROM News ${where.sql} ORDER BY featured DESC, date DESC LIMIT ? OFFSET ?`).bind(...where.values, params.limit, offset).all(),
    db.prepare(`SELECT COUNT(*) as total FROM News ${where.sql}`).bind(...where.values).first<{ total: number }>()
  ]);
  const total = countResult?.total ?? 0;
  return { data: itemsResult.results.map((row) => normalizeRow(row as Record<string, unknown>)), meta: pageMeta(params.page, params.limit, total) };
}

export async function getNews(idOrSlug: string) {
  const db = await getD1();
  if (!db) {
    return (await prisma.news.findUnique({ where: { slug: idOrSlug } })) ?? prisma.news.findUnique({ where: { id: idOrSlug } });
  }

  const row = await db.prepare("SELECT * FROM News WHERE slug = ? OR id = ? LIMIT 1").bind(idOrSlug, idOrSlug).first();
  return row ? normalizeRow(row as Record<string, unknown>) : null;
}

export async function createNews(input: NewsInput) {
  const db = await getD1();
  if (!db) {
    const slug = await createUniqueSlug(input.slug || input.title, (value) => prisma.news.findUnique({ where: { slug: value } }).then(Boolean));
    return prisma.news.create({ data: { ...input, slug, image: input.image || null, date: new Date(input.date) } });
  }

  const slug = await createUniqueSlug(input.slug || input.title, async (value) => Boolean(await db.prepare("SELECT id FROM News WHERE slug = ?").bind(value).first()));
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.prepare(
    "INSERT INTO News (id, title, slug, category, date, excerpt, content, image, status, featured, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(id, input.title, slug, input.category, new Date(input.date).toISOString(), input.excerpt, input.content, input.image || null, input.status, input.featured ? 1 : 0, now, now).run();
  return getNews(id);
}

export async function updateNews(id: string, input: NewsInput) {
  const db = await getD1();
  if (!db) {
    const existing = await prisma.news.findUnique({ where: { id } });
    if (!existing) return null;
    const slug = await createUniqueSlug(input.slug || input.title, (value) => prisma.news.findUnique({ where: { slug: value } }).then((item) => Boolean(item && item.id !== id)));
    return prisma.news.update({ where: { id }, data: { ...input, slug, image: input.image || null, date: new Date(input.date) } });
  }

  const existing = await getNews(id);
  if (!existing) return null;
  const slug = await createUniqueSlug(input.slug || input.title, async (value) => {
    const row = await db.prepare("SELECT id FROM News WHERE slug = ?").bind(value).first<{ id: string }>();
    return Boolean(row && row.id !== id);
  });
  await db.prepare(
    "UPDATE News SET title = ?, slug = ?, category = ?, date = ?, excerpt = ?, content = ?, image = ?, status = ?, featured = ?, updatedAt = ? WHERE id = ?"
  ).bind(input.title, slug, input.category, new Date(input.date).toISOString(), input.excerpt, input.content, input.image || null, input.status, input.featured ? 1 : 0, new Date().toISOString(), id).run();
  return getNews(id);
}

export async function deleteNewsItem(id: string) {
  const db = await getD1();
  if (!db) {
    await prisma.news.delete({ where: { id } });
    return;
  }
  await db.prepare("DELETE FROM News WHERE id = ?").bind(id).run();
}

export async function listAgenda(params: ListParams) {
  const db = await getD1();
  if (!db) {
    const where = {
      ...(params.search
        ? { OR: [{ title: { contains: params.search } }, { excerpt: { contains: params.search } }, { content: { contains: params.search } }] }
        : {}),
      ...(params.category ? { category: params.category } : {}),
      ...(params.statusAgenda ? { statusAgenda: params.statusAgenda } : {}),
      ...(params.publishStatus === "draft" || params.publishStatus === "published" ? { publishStatus: params.publishStatus } : {}),
      ...(params.featured === "true" ? { featured: true } : params.featured === "false" ? { featured: false } : {})
    };
    const [items, total] = await Promise.all([
      prisma.agenda.findMany({ where, orderBy: [{ featured: "desc" }, { date: "desc" }], skip: (params.page - 1) * params.limit, take: params.limit }),
      prisma.agenda.count({ where })
    ]);
    return { data: items, meta: pageMeta(params.page, params.limit, total) };
  }

  const where = buildAgendaWhere(params);
  const offset = (params.page - 1) * params.limit;
  const [itemsResult, countResult] = await Promise.all([
    db.prepare(`SELECT * FROM Agenda ${where.sql} ORDER BY featured DESC, date DESC LIMIT ? OFFSET ?`).bind(...where.values, params.limit, offset).all(),
    db.prepare(`SELECT COUNT(*) as total FROM Agenda ${where.sql}`).bind(...where.values).first<{ total: number }>()
  ]);
  const total = countResult?.total ?? 0;
  return { data: itemsResult.results.map((row) => normalizeRow(row as Record<string, unknown>)), meta: pageMeta(params.page, params.limit, total) };
}

export async function getAgenda(idOrSlug: string) {
  const db = await getD1();
  if (!db) {
    return (await prisma.agenda.findUnique({ where: { slug: idOrSlug } })) ?? prisma.agenda.findUnique({ where: { id: idOrSlug } });
  }
  const row = await db.prepare("SELECT * FROM Agenda WHERE slug = ? OR id = ? LIMIT 1").bind(idOrSlug, idOrSlug).first();
  return row ? normalizeRow(row as Record<string, unknown>) : null;
}

export async function createAgenda(input: AgendaInput) {
  const db = await getD1();
  if (!db) {
    const slug = await createUniqueSlug(input.slug || input.title, (value) => prisma.agenda.findUnique({ where: { slug: value } }).then(Boolean));
    return prisma.agenda.create({ data: { ...input, slug, image: input.image || null, date: new Date(input.date) } });
  }
  const slug = await createUniqueSlug(input.slug || input.title, async (value) => Boolean(await db.prepare("SELECT id FROM Agenda WHERE slug = ?").bind(value).first()));
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.prepare(
    "INSERT INTO Agenda (id, title, slug, category, date, time, location, statusAgenda, excerpt, content, image, publishStatus, featured, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(id, input.title, slug, input.category, new Date(input.date).toISOString(), input.time, input.location, input.statusAgenda, input.excerpt, input.content, input.image || null, input.publishStatus, input.featured ? 1 : 0, now, now).run();
  return getAgenda(id);
}

export async function updateAgenda(id: string, input: AgendaInput) {
  const db = await getD1();
  if (!db) {
    const existing = await prisma.agenda.findUnique({ where: { id } });
    if (!existing) return null;
    const slug = await createUniqueSlug(input.slug || input.title, (value) => prisma.agenda.findUnique({ where: { slug: value } }).then((item) => Boolean(item && item.id !== id)));
    return prisma.agenda.update({ where: { id }, data: { ...input, slug, image: input.image || null, date: new Date(input.date) } });
  }
  const existing = await getAgenda(id);
  if (!existing) return null;
  const slug = await createUniqueSlug(input.slug || input.title, async (value) => {
    const row = await db.prepare("SELECT id FROM Agenda WHERE slug = ?").bind(value).first<{ id: string }>();
    return Boolean(row && row.id !== id);
  });
  await db.prepare(
    "UPDATE Agenda SET title = ?, slug = ?, category = ?, date = ?, time = ?, location = ?, statusAgenda = ?, excerpt = ?, content = ?, image = ?, publishStatus = ?, featured = ?, updatedAt = ? WHERE id = ?"
  ).bind(input.title, slug, input.category, new Date(input.date).toISOString(), input.time, input.location, input.statusAgenda, input.excerpt, input.content, input.image || null, input.publishStatus, input.featured ? 1 : 0, new Date().toISOString(), id).run();
  return getAgenda(id);
}

export async function deleteAgendaItem(id: string) {
  const db = await getD1();
  if (!db) {
    await prisma.agenda.delete({ where: { id } });
    return;
  }
  await db.prepare("DELETE FROM Agenda WHERE id = ?").bind(id).run();
}
