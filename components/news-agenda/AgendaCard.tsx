import { Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/student/Badge";

type AgendaCardProps = {
  title: string;
  slug: string;
  category: string;
  date: string;
  time: string;
  location: string;
  status: string;
  excerpt: string;
};

const statusTone = {
  "Akan Datang": "blue",
  Berlangsung: "green",
  Selesai: "slate"
} as const;

function splitDate(date: string) {
  const [day, month] = date.split(" ");
  return { day, month };
}

export function AgendaCard({ title, slug, category, date, time, location, status, excerpt }: AgendaCardProps) {
  const { day, month } = splitDate(date);

  return (
    <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="grid gap-5 sm:grid-cols-[84px_1fr]">
        <div className="h-fit rounded-md bg-ink p-4 text-center text-white">
          <p className="text-3xl font-bold text-campus">{day}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-blue-100">{month}</p>
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="blue">{category}</Badge>
            <Badge tone={statusTone[status as keyof typeof statusTone] || "slate"}>{status}</Badge>
          </div>
          <h3 className="mt-4 text-lg font-bold leading-snug text-ink">
            <Link href={`/berita-agenda/${slug}`} className="hover:text-ocean">
              {title}
            </Link>
          </h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <Clock size={16} />
              {time}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} />
              {location}
            </p>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600">{excerpt}</p>
        </div>
      </div>
    </article>
  );
}
