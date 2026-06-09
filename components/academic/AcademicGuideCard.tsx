import { ArrowRight, BookOpenCheck } from "lucide-react";
import { Badge } from "@/components/student/Badge";

type AcademicGuideCardProps = {
  title: string;
  category: string;
  description: string;
  href: string;
};

export function AcademicGuideCard({ title, category, description, href }: AcademicGuideCardProps) {
  return (
    <article className="rounded-md border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-50 text-ocean">
          <BookOpenCheck size={24} />
        </div>
        <Badge tone="blue">{category}</Badge>
      </div>
      <h3 className="mt-5 text-xl font-bold text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      <a className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ocean hover:text-ink" href={href}>
        Lihat Panduan
        <ArrowRight size={16} />
      </a>
    </article>
  );
}
