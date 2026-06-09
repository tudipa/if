import { BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/student/Badge";

type GraduateProfileCardProps = {
  title: string;
  description: string;
  competencies: string[];
  careerFields: string[];
};

export function GraduateProfileCard({ title, description, competencies, careerFields }: GraduateProfileCardProps) {
  return (
    <article className="rounded-md border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-50 text-ocean">
        <BriefcaseBusiness size={24} />
      </div>
      <h3 className="mt-5 text-xl font-bold text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-wide text-ocean">Kompetensi Utama</p>
        <div className="mt-3 grid gap-2">
          {competencies.map((item) => (
            <p className="flex items-center gap-2 text-sm text-slate-600" key={item}>
              <CheckCircle2 className="text-leaf" size={16} />
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {careerFields.map((field) => (
          <Badge key={field} tone="slate">
            {field}
          </Badge>
        ))}
      </div>
    </article>
  );
}
