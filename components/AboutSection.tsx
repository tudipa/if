import { highlights } from "@/data/homepage";

export function AboutSection() {
  return (
    <section id="tentang" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-ocean">Tentang Jurusan</p>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">Tentang Jurusan Informatika</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Jurusan Informatika berfokus pada pengembangan keilmuan informatika, teknologi informasi, pemrograman, sistem cerdas, data, dan solusi digital berbasis kebutuhan masyarakat.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-md border border-slate-200 bg-slate-50 p-6">
                  <Icon className="text-ocean" size={28} />
                  <h3 className="mt-5 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
