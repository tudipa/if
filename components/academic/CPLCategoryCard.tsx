import { CheckCircle2 } from "lucide-react";

type CPLCategoryCardProps = {
  category: string;
  items: string[];
};

export function CPLCategoryCard({ category, items }: CPLCategoryCardProps) {
  return (
    <article className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-ink">{category}</h3>
      <div className="mt-5 grid gap-4">
        {items.map((item) => (
          <p className="flex gap-3 text-sm leading-7 text-slate-600" key={item}>
            <CheckCircle2 className="mt-1 shrink-0 text-leaf" size={18} />
            {item}
          </p>
        ))}
      </div>
    </article>
  );
}
