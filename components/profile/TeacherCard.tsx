import { ArrowRight, Mail } from "lucide-react";

type TeacherCardProps = {
  name: string;
  position: string;
  expertise: string;
  email: string;
};

export function TeacherCard({ name, position, expertise, email }: TeacherCardProps) {
  const initials = name
    .replace(/Dr\.|M\.Kom\.|M\.Cs\.|M\.T\.|M\.Pd\./g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");

  return (
    <article className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-ink text-2xl font-bold text-white shadow-soft">
          {initials || "DP"}
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-ocean">{position}</p>
        <h3 className="mt-2 text-lg font-bold leading-snug text-ink">{name}</h3>
        <p className="mt-3 text-sm font-semibold text-slate-700">{expertise}</p>
        <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
          <Mail size={16} />
          {email}
        </p>
        <a className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ocean hover:text-ink" href="#">
          Lihat Profil
          <ArrowRight size={16} />
        </a>
      </div>
    </article>
  );
}
