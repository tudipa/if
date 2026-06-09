import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/student/Badge";

type NewsCardProps = {
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
};

export function NewsCard({ title, slug, category, date, excerpt }: NewsCardProps) {
  return (
    <article className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-blue-50 via-white to-amber-50">
        <Newspaper className="text-ocean" size={44} />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="blue">{category}</Badge>
          <span className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <CalendarDays size={15} />
            {date}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{excerpt}</p>
        <Link className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ocean hover:text-ink" href={`/berita-agenda/${slug}`}>
          Baca Selengkapnya
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
