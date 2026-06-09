import { focusAreas } from "@/data/homepage";

export function FocusAreaSection() {
  return (
    <section id="akademik" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-ocean">Fokus Keilmuan</p>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">Keunggulan Bidang Informatika</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            Area pembelajaran dirancang untuk membangun kemampuan teknis, analitis, kreatif, dan profesional dalam ekosistem digital.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area) => {
            const Icon = area.icon;
            return (
              <article key={area.title} className="rounded-md border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-50 text-ocean">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{area.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Penguatan kompetensi melalui teori, praktik, proyek, dan pendekatan pemecahan masalah.
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
