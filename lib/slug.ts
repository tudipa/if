export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createUniqueSlug(
  baseValue: string,
  exists: (slug: string) => Promise<boolean>,
  currentSlug?: string
) {
  const baseSlug = slugify(baseValue);
  let slug = baseSlug || "konten";
  let index = 2;

  while (await exists(slug)) {
    if (currentSlug && slug === currentSlug) {
      return slug;
    }
    slug = `${baseSlug}-${index}`;
    index += 1;
  }

  return slug;
}
