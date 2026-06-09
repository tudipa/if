import { BriefcaseBusiness } from "lucide-react";

type OrganizationCardProps = {
  name: string;
  position: string;
  description: string;
};

export function OrganizationCard({ name, position, description }: OrganizationCardProps) {
  return (
    <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-blue-50 text-ocean">
          <BriefcaseBusiness size={22} />
        </span>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-ocean">{position}</p>
          <h3 className="mt-2 text-lg font-bold text-ink">{name}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
        </div>
      </div>
    </article>
  );
}
