import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createUniqueSlug } from "@/lib/slug";
import type { AgendaInput } from "@/lib/validations/agenda";
import type { NewsInput } from "@/lib/validations/news";
import type { AchievementInput, ActivityInput } from "@/lib/validations/student";

type CmsEnv = {
  if_cms?: D1Database;
};

type ListParams = {
  search?: string;
  category?: string;
  level?: string;
  status?: string;
  statusAgenda?: string;
  publishStatus?: string;
  publicationStatus?: string;
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

async function getPrisma() {
  const prismaModule = await import("@/lib/prisma");
  return prismaModule.prisma;
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

function buildAchievementWhere(params: ListParams) {
  const clauses: string[] = [];
  const values: unknown[] = [];

  if (params.search) {
    clauses.push("(title LIKE ? OR studentName LIKE ? OR eventName LIKE ? OR description LIKE ?)");
    values.push(`%${params.search}%`, `%${params.search}%`, `%${params.search}%`, `%${params.search}%`);
  }
  if (params.level) {
    clauses.push("level = ?");
    values.push(params.level);
  }
  if (params.publicationStatus === "draft" || params.publicationStatus === "published") {
    clauses.push("publicationStatus = ?");
    values.push(params.publicationStatus);
  }

  return { sql: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "", values };
}

function buildActivityWhere(params: ListParams) {
  const clauses: string[] = [];
  const values: unknown[] = [];

  if (params.search) {
    clauses.push("(title LIKE ? OR category LIKE ? OR location LIKE ? OR description LIKE ?)");
    values.push(`%${params.search}%`, `%${params.search}%`, `%${params.search}%`, `%${params.search}%`);
  }
  if (params.category) {
    clauses.push("category = ?");
    values.push(params.category);
  }
  if (params.publicationStatus === "draft" || params.publicationStatus === "published") {
    clauses.push("publicationStatus = ?");
    values.push(params.publicationStatus);
  }

  return { sql: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "", values };
}

export async function listNews(params: ListParams) {
  const db = await getD1();
  if (!db) {
    const prisma = await getPrisma();
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
    const prisma = await getPrisma();
    return (await prisma.news.findUnique({ where: { slug: idOrSlug } })) ?? prisma.news.findUnique({ where: { id: idOrSlug } });
  }

  const row = await db.prepare("SELECT * FROM News WHERE slug = ? OR id = ? LIMIT 1").bind(idOrSlug, idOrSlug).first();
  return row ? normalizeRow(row as Record<string, unknown>) : null;
}

export async function createNews(input: NewsInput) {
  const db = await getD1();
  if (!db) {
    const prisma = await getPrisma();
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
    const prisma = await getPrisma();
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
    const prisma = await getPrisma();
    await prisma.news.delete({ where: { id } });
    return;
  }
  await db.prepare("DELETE FROM News WHERE id = ?").bind(id).run();
}

export async function listAgenda(params: ListParams) {
  const db = await getD1();
  if (!db) {
    const prisma = await getPrisma();
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
    const prisma = await getPrisma();
    return (await prisma.agenda.findUnique({ where: { slug: idOrSlug } })) ?? prisma.agenda.findUnique({ where: { id: idOrSlug } });
  }
  const row = await db.prepare("SELECT * FROM Agenda WHERE slug = ? OR id = ? LIMIT 1").bind(idOrSlug, idOrSlug).first();
  return row ? normalizeRow(row as Record<string, unknown>) : null;
}

export async function createAgenda(input: AgendaInput) {
  const db = await getD1();
  if (!db) {
    const prisma = await getPrisma();
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
    const prisma = await getPrisma();
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
    const prisma = await getPrisma();
    await prisma.agenda.delete({ where: { id } });
    return;
  }
  await db.prepare("DELETE FROM Agenda WHERE id = ?").bind(id).run();
}

export async function listAchievements(params: ListParams) {
  const db = await getD1();
  if (!db) {
    const prisma = await getPrisma();
    const where = {
      ...(params.search
        ? { OR: [{ title: { contains: params.search } }, { studentName: { contains: params.search } }, { eventName: { contains: params.search } }, { description: { contains: params.search } }] }
        : {}),
      ...(params.level ? { level: params.level } : {}),
      ...(params.publicationStatus === "draft" || params.publicationStatus === "published" ? { publicationStatus: params.publicationStatus } : {})
    };
    const [items, total] = await Promise.all([
      prisma.studentAchievement.findMany({ where, orderBy: { date: "desc" }, skip: (params.page - 1) * params.limit, take: params.limit }),
      prisma.studentAchievement.count({ where })
    ]);
    return { data: items, meta: pageMeta(params.page, params.limit, total) };
  }

  const where = buildAchievementWhere(params);
  const offset = (params.page - 1) * params.limit;
  const [itemsResult, countResult] = await Promise.all([
    db.prepare(`SELECT * FROM StudentAchievement ${where.sql} ORDER BY date DESC LIMIT ? OFFSET ?`).bind(...where.values, params.limit, offset).all(),
    db.prepare(`SELECT COUNT(*) as total FROM StudentAchievement ${where.sql}`).bind(...where.values).first<{ total: number }>()
  ]);
  return { data: itemsResult.results, meta: pageMeta(params.page, params.limit, countResult?.total ?? 0) };
}

export async function getAchievement(idOrSlug: string) {
  const db = await getD1();
  if (!db) {
    const prisma = await getPrisma();
    return (await prisma.studentAchievement.findUnique({ where: { slug: idOrSlug } })) ?? prisma.studentAchievement.findUnique({ where: { id: idOrSlug } });
  }
  return db.prepare("SELECT * FROM StudentAchievement WHERE slug = ? OR id = ? LIMIT 1").bind(idOrSlug, idOrSlug).first();
}

export async function createAchievement(input: AchievementInput) {
  const db = await getD1();
  if (!db) {
    const prisma = await getPrisma();
    const slug = await createUniqueSlug(input.slug || input.title, (value) => prisma.studentAchievement.findUnique({ where: { slug: value } }).then(Boolean));
    return prisma.studentAchievement.create({ data: { ...input, slug, image: input.image || null, attachment: input.attachment || null, date: new Date(input.date) } });
  }
  const slug = await createUniqueSlug(input.slug || input.title, async (value) => Boolean(await db.prepare("SELECT id FROM StudentAchievement WHERE slug = ?").bind(value).first()));
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.prepare(
    "INSERT INTO StudentAchievement (id, title, slug, studentName, level, eventName, organizer, date, description, image, attachment, publicationStatus, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(id, input.title, slug, input.studentName, input.level, input.eventName, input.organizer, new Date(input.date).toISOString(), input.description, input.image || null, input.attachment || null, input.publicationStatus, now, now).run();
  return getAchievement(id);
}

export async function updateAchievement(id: string, input: AchievementInput) {
  const db = await getD1();
  if (!db) {
    const prisma = await getPrisma();
    const existing = await prisma.studentAchievement.findUnique({ where: { id } });
    if (!existing) return null;
    const slug = await createUniqueSlug(input.slug || input.title, (value) => prisma.studentAchievement.findUnique({ where: { slug: value } }).then((item) => Boolean(item && item.id !== id)));
    return prisma.studentAchievement.update({ where: { id }, data: { ...input, slug, image: input.image || null, attachment: input.attachment || null, date: new Date(input.date) } });
  }
  const existing = await getAchievement(id);
  if (!existing) return null;
  const slug = await createUniqueSlug(input.slug || input.title, async (value) => {
    const row = await db.prepare("SELECT id FROM StudentAchievement WHERE slug = ?").bind(value).first<{ id: string }>();
    return Boolean(row && row.id !== id);
  });
  await db.prepare(
    "UPDATE StudentAchievement SET title = ?, slug = ?, studentName = ?, level = ?, eventName = ?, organizer = ?, date = ?, description = ?, image = ?, attachment = ?, publicationStatus = ?, updatedAt = ? WHERE id = ?"
  ).bind(input.title, slug, input.studentName, input.level, input.eventName, input.organizer, new Date(input.date).toISOString(), input.description, input.image || null, input.attachment || null, input.publicationStatus, new Date().toISOString(), id).run();
  return getAchievement(id);
}

export async function deleteAchievementItem(id: string) {
  const db = await getD1();
  if (!db) {
    const prisma = await getPrisma();
    await prisma.studentAchievement.delete({ where: { id } });
    return;
  }
  await db.prepare("DELETE FROM StudentAchievement WHERE id = ?").bind(id).run();
}

async function attachGallery(db: D1Database | undefined, item: Record<string, unknown> | null) {
  if (!item) return null;
  if (!db) return item;
  const result = await db.prepare("SELECT url FROM ActivityGalleryImage WHERE activityId = ? ORDER BY sortOrder ASC").bind(item.id).all<{ url: string }>();
  return { ...item, galleryImages: result.results.map((image) => image.url) };
}

export async function listActivities(params: ListParams) {
  const db = await getD1();
  if (!db) {
    const prisma = await getPrisma();
    const where = {
      ...(params.search
        ? { OR: [{ title: { contains: params.search } }, { category: { contains: params.search } }, { location: { contains: params.search } }, { description: { contains: params.search } }] }
        : {}),
      ...(params.category ? { category: params.category } : {}),
      ...(params.publicationStatus === "draft" || params.publicationStatus === "published" ? { publicationStatus: params.publicationStatus } : {})
    };
    const [items, total] = await Promise.all([
      prisma.studentActivity.findMany({ where, include: { galleryImages: { orderBy: { sortOrder: "asc" } } }, orderBy: { date: "desc" }, skip: (params.page - 1) * params.limit, take: params.limit }),
      prisma.studentActivity.count({ where })
    ]);
    return { data: items.map((item) => ({ ...item, galleryImages: item.galleryImages.map((image) => image.url) })), meta: pageMeta(params.page, params.limit, total) };
  }

  const where = buildActivityWhere(params);
  const offset = (params.page - 1) * params.limit;
  const [itemsResult, countResult] = await Promise.all([
    db.prepare(`SELECT * FROM StudentActivity ${where.sql} ORDER BY date DESC LIMIT ? OFFSET ?`).bind(...where.values, params.limit, offset).all(),
    db.prepare(`SELECT COUNT(*) as total FROM StudentActivity ${where.sql}`).bind(...where.values).first<{ total: number }>()
  ]);
  const data = await Promise.all(itemsResult.results.map((row) => attachGallery(db, row as Record<string, unknown>)));
  return { data, meta: pageMeta(params.page, params.limit, countResult?.total ?? 0) };
}

export async function getActivity(idOrSlug: string) {
  const db = await getD1();
  if (!db) {
    const prisma = await getPrisma();
    const item = (await prisma.studentActivity.findUnique({ where: { slug: idOrSlug }, include: { galleryImages: { orderBy: { sortOrder: "asc" } } } })) ?? (await prisma.studentActivity.findUnique({ where: { id: idOrSlug }, include: { galleryImages: { orderBy: { sortOrder: "asc" } } } }));
    return item ? { ...item, galleryImages: item.galleryImages.map((image) => image.url) } : null;
  }
  const row = await db.prepare("SELECT * FROM StudentActivity WHERE slug = ? OR id = ? LIMIT 1").bind(idOrSlug, idOrSlug).first();
  return attachGallery(db, row as Record<string, unknown> | null);
}

async function replaceActivityGallery(db: D1Database | undefined, activityId: string, urls: string[]) {
  const cleanUrls = urls.filter(Boolean);
  if (!db) {
    const prisma = await getPrisma();
    await prisma.activityGalleryImage.deleteMany({ where: { activityId } });
    if (cleanUrls.length) {
      await prisma.activityGalleryImage.createMany({ data: cleanUrls.map((url, index) => ({ activityId, url, sortOrder: index + 1 })) });
    }
    return;
  }
  await db.prepare("DELETE FROM ActivityGalleryImage WHERE activityId = ?").bind(activityId).run();
  for (let index = 0; index < cleanUrls.length; index += 1) {
    await db.prepare("INSERT INTO ActivityGalleryImage (id, activityId, url, sortOrder, createdAt) VALUES (?, ?, ?, ?, ?)").bind(crypto.randomUUID(), activityId, cleanUrls[index], index + 1, new Date().toISOString()).run();
  }
}

function cleanGalleryUrls(urls: Array<string | undefined>) {
  return urls.filter((url): url is string => Boolean(url));
}

export async function createActivity(input: ActivityInput) {
  const db = await getD1();
  if (!db) {
    const prisma = await getPrisma();
    const slug = await createUniqueSlug(input.slug || input.title, (value) => prisma.studentActivity.findUnique({ where: { slug: value } }).then(Boolean));
    const item = await prisma.studentActivity.create({ data: { ...input, slug, image: input.image || null, attachment: input.attachment || null, date: new Date(input.date), galleryImages: undefined } });
    await replaceActivityGallery(undefined, item.id, cleanGalleryUrls(input.galleryImages));
    return getActivity(item.id);
  }
  const slug = await createUniqueSlug(input.slug || input.title, async (value) => Boolean(await db.prepare("SELECT id FROM StudentActivity WHERE slug = ?").bind(value).first()));
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.prepare(
    "INSERT INTO StudentActivity (id, title, slug, category, date, location, description, image, attachment, publicationStatus, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(id, input.title, slug, input.category, new Date(input.date).toISOString(), input.location, input.description, input.image || null, input.attachment || null, input.publicationStatus, now, now).run();
  await replaceActivityGallery(db, id, cleanGalleryUrls(input.galleryImages));
  return getActivity(id);
}

export async function updateActivity(id: string, input: ActivityInput) {
  const db = await getD1();
  if (!db) {
    const prisma = await getPrisma();
    const existing = await prisma.studentActivity.findUnique({ where: { id } });
    if (!existing) return null;
    const slug = await createUniqueSlug(input.slug || input.title, (value) => prisma.studentActivity.findUnique({ where: { slug: value } }).then((item) => Boolean(item && item.id !== id)));
    await prisma.studentActivity.update({ where: { id }, data: { ...input, slug, image: input.image || null, attachment: input.attachment || null, date: new Date(input.date), galleryImages: undefined } });
    await replaceActivityGallery(undefined, id, cleanGalleryUrls(input.galleryImages));
    return getActivity(id);
  }
  const existing = await getActivity(id);
  if (!existing) return null;
  const slug = await createUniqueSlug(input.slug || input.title, async (value) => {
    const row = await db.prepare("SELECT id FROM StudentActivity WHERE slug = ?").bind(value).first<{ id: string }>();
    return Boolean(row && row.id !== id);
  });
  await db.prepare(
    "UPDATE StudentActivity SET title = ?, slug = ?, category = ?, date = ?, location = ?, description = ?, image = ?, attachment = ?, publicationStatus = ?, updatedAt = ? WHERE id = ?"
  ).bind(input.title, slug, input.category, new Date(input.date).toISOString(), input.location, input.description, input.image || null, input.attachment || null, input.publicationStatus, new Date().toISOString(), id).run();
  await replaceActivityGallery(db, id, cleanGalleryUrls(input.galleryImages));
  return getActivity(id);
}

export async function deleteActivityItem(id: string) {
  const db = await getD1();
  if (!db) {
    const prisma = await getPrisma();
    await prisma.studentActivity.delete({ where: { id } });
    return;
  }
  await db.prepare("DELETE FROM ActivityGalleryImage WHERE activityId = ?").bind(id).run();
  await db.prepare("DELETE FROM StudentActivity WHERE id = ?").bind(id).run();
}
