import { ArrowRight, CalendarDays } from "lucide-react";
import { agendas, news } from "@/data/homepage";

function InfoCard({ item }: { item: (typeof news)[number] }) {
  return (
    <article className="flex h-full flex-col rounded-md border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wide">
        <span className="rounded-md bg-blue-50 px-2.5 py-1 text-ocean">{item.category}</span>
        <span className="inline-flex items-center gap-1 text-slate-500">
          <CalendarDays size={15} />
          {item.date}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{item.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{item.summary}</p>
      <a className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ocean hover:text-ink" href="#">
        Baca Selengkapnya
        <ArrowRight size={16} />
      </a>
    </article>
  );
}

export function NewsAgendaSection() {
  return (
    <section id="berita-agenda" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-ocean">Berita dan Agenda</p>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">Informasi Terbaru Jurusan</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Ikuti perkembangan kegiatan akademik, kemahasiswaan, riset, dan kolaborasi Jurusan Informatika.
            </p>
          </div>
          <a className="inline-flex w-fit items-center justify-center rounded-md border border-ocean px-5 py-3 text-sm font-bold text-ocean hover:bg-ocean hover:text-white" href="#">
            Lihat Semua Berita & Agenda
          </a>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-bold text-ink">Berita Terbaru</h3>
            <div className="grid gap-4">
              {news.map((item) => (
                <InfoCard item={item} key={item.title} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold text-ink">Agenda Kegiatan</h3>
            <div className="grid gap-4">
              {agendas.map((item) => (
                <InfoCard item={item} key={item.title} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
