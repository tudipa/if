type BadgeProps = {
  children: React.ReactNode;
  tone?: "blue" | "green" | "gold" | "slate";
};

const toneClasses = {
  blue: "bg-blue-50 text-ocean",
  green: "bg-emerald-50 text-leaf",
  gold: "bg-amber-100 text-amber-800",
  slate: "bg-slate-100 text-slate-700"
};

export function Badge({ children, tone = "slate" }: BadgeProps) {
  return <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${toneClasses[tone]}`}>{children}</span>;
}
