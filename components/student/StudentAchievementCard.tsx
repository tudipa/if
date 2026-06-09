import { Award, CalendarDays, UsersRound } from "lucide-react";
import { Badge } from "@/components/student/Badge";

type StudentAchievementCardProps = {
  title: string;
  category: string;
  level: string;
  year: string;
  students: string;
  description: string;
};

export function StudentAchievementCard({
  title,
  category,
  level,
  year,
  students,
  description
}: StudentAchievementCardProps) {
  return (
    <article className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-blue-50 via-white to-amber-50">
        <Award className="text-ocean" size={46} />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">{category}</Badge>
          <Badge tone="gold">{level}</Badge>
        </div>
        <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{title}</h3>
        <div className="mt-4 grid gap-2 text-sm text-slate-600">
          <p className="flex items-center gap-2">
            <CalendarDays size={16} />
            {year}
          </p>
          <p className="flex items-center gap-2">
            <UsersRound size={16} />
            {students}
          </p>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
      </div>
    </article>
  );
}
