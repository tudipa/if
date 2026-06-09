import { Building2 } from "lucide-react";

type PartnerCardProps = {
  name: string;
  category: string;
  description: string;
};

export function PartnerCard({ name, category, description }: PartnerCardProps) {
  return (
    <article className="rounded-md border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex h-14 w-14 items-center justify-center rounded-md bg-slate-100 text-ocean">
        <Building2 size={26} />
      </div>
      <p className="mt-6 text-xs font-bold uppercase tracking-wide text-leaf">{category}</p>
      <h3 className="mt-2 text-xl font-bold text-ink">{name}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </article>
  );
}
