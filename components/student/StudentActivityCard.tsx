import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/student/Badge";

type StudentActivityCardProps = {
  title: string;
  category: string;
  date: string;
  location: string;
  status: string;
  description: string;
};

const statusTone = {
  "Akan Datang": "blue",
  Berlangsung: "green",
  Selesai: "slate"
} as const;

export function StudentActivityCard({
  title,
  category,
  date,
  location,
  status,
  description
}: StudentActivityCardProps) {
  return (
    <article className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <CalendarDays className="text-leaf" size={46} />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">{category}</Badge>
          <Badge tone={statusTone[status as keyof typeof statusTone] || "slate"}>{status}</Badge>
        </div>
        <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{title}</h3>
        <div className="mt-4 grid gap-2 text-sm text-slate-600">
          <p className="flex items-center gap-2">
            <CalendarDays size={16} />
            {date}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={16} />
            {location}
          </p>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
      </div>
    </article>
  );
}
