import { ArrowRight, BookOpenCheck } from "lucide-react";
import { heroTags, stats } from "@/data/homepage";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(19,134,111,0.35),transparent_34%),linear-gradient(135deg,rgba(14,90,138,0.55),rgba(16,32,51,0.95))]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-blue-50">
            <BookOpenCheck size={18} />
            Profil akademik resmi jurusan
          </div>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Jurusan Informatika UHN IGB Sugriwa Denpasar
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">
            Membangun talenta digital yang unggul, beretika, dan berdaya saing melalui pendidikan informatika yang inovatif.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a className="inline-flex items-center justify-center gap-2 rounded-md bg-campus px-5 py-3 text-sm font-bold text-ink hover:bg-white" href="#tentang">
              Tentang Jurusan
              <ArrowRight size={18} />
            </a>
            <a className="inline-flex items-center justify-center rounded-md border border-white/30 px-5 py-3 text-sm font-bold text-white hover:bg-white/10" href="#akademik">
              Lihat Kurikulum
            </a>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-md border border-white/15 bg-white/10 p-4">
                <div className="text-2xl font-bold text-campus">{stat.value}</div>
                <div className="mt-1 text-xs font-medium text-blue-50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-md border border-white/15 bg-white/10 p-5 shadow-soft backdrop-blur">
            <div className="rounded-md bg-slate-950/70 p-5">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-campus" />
                <span className="h-3 w-3 rounded-full bg-leaf" />
              </div>
              <div className="grid gap-3 text-sm text-blue-100">
                <div className="h-3 w-4/5 rounded bg-blue-200/50" />
                <div className="h-3 w-3/5 rounded bg-blue-200/30" />
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {heroTags.map((tag) => {
                    const Icon = tag.icon;
                    return (
                      <div key={tag.label} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/10 p-3">
                        <Icon className="text-campus" size={19} />
                        <span className="font-semibold">{tag.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
