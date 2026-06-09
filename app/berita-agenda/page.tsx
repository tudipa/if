import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { NewsAgendaExplorer } from "@/components/news-agenda/NewsAgendaExplorer";
import { NewsCard } from "@/components/news-agenda/NewsCard";
import { PageHeader } from "@/components/profile/PageHeader";
import { newsItems } from "@/lib/data/news-agenda";

export default function NewsAgendaPage() {
  const featuredNews = newsItems[0];

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          description="Informasi terbaru seputar kegiatan akademik, kemahasiswaan, penelitian, kerja sama, serta agenda penting Jurusan Informatika UHN IGB Sugriwa Denpasar."
          eyebrow="Informasi Jurusan"
          parentLabel="Berita & Agenda"
          title="Berita & Agenda"
        />
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-ocean">Sorotan</p>
                <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">Berita Utama</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  Sorotan berita menampilkan satu informasi pilihan dari data dummy agar halaman memiliki titik awal baca
                  yang jelas.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-ocean px-5 py-3 text-sm font-bold text-white hover:bg-ink"
                    href="#berita"
                  >
                    Lihat Berita
                    <ArrowRight size={18} />
                  </a>
                  <a
                    className="inline-flex items-center justify-center rounded-md border border-slate-200 px-5 py-3 text-sm font-bold text-ink hover:border-ocean hover:text-ocean"
                    href="#agenda"
                  >
                    Lihat Agenda
                  </a>
                </div>
              </div>
              <NewsCard {...featuredNews} />
            </div>
          </div>
        </section>
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div id="berita" />
            <div id="agenda" />
            <NewsAgendaExplorer />
          </div>
        </section>
        <section className="bg-ink py-14 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <h2 className="text-2xl font-bold">Ikuti informasi terbaru Jurusan Informatika</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-blue-50">
                Halaman ini disiapkan untuk publikasi berita, pengumuman, dan agenda jurusan secara berkala.
              </p>
            </div>
            <Link
              className="inline-flex w-fit items-center gap-2 rounded-md bg-campus px-5 py-3 text-sm font-bold text-ink hover:bg-white"
              href="/berita-agenda"
            >
              Berita & Agenda
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
