import { ArrowRight, CheckCircle2 } from "lucide-react";
import { missions } from "@/data/homepage";

export function VisionMissionSection() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-ocean">Visi dan Misi</p>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">Arah Pengembangan Akademik</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-md bg-ink p-8 text-white shadow-soft">
            <p className="text-sm font-bold uppercase tracking-wide text-campus">Visi</p>
            <h3 className="mt-4 text-2xl font-bold leading-snug">
              Menjadi jurusan informatika yang unggul, inovatif, dan berkarakter dalam pengembangan teknologi digital untuk kemajuan masyarakat.
            </h3>
            <p className="mt-5 text-sm leading-7 text-blue-50">
              Konten visi resmi dapat diperbarui sesuai dokumen akademik jurusan.
            </p>
          </article>
          <div className="grid gap-4">
            {missions.map((mission) => (
              <div key={mission} className="flex gap-4 rounded-md border border-slate-200 bg-white p-5">
                <CheckCircle2 className="mt-1 shrink-0 text-leaf" size={22} />
                <p className="text-sm leading-7 text-slate-650">{mission}</p>
              </div>
            ))}
            <a className="mt-2 inline-flex w-fit items-center gap-2 rounded-md bg-ocean px-5 py-3 text-sm font-bold text-white hover:bg-ink" href="#tentang">
              Baca Selengkapnya
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
