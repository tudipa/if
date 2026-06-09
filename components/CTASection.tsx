import { ArrowRight, Mail } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-md bg-ink px-6 py-12 text-white shadow-soft sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-campus">Mulai Jelajahi</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Bergabung bersama Jurusan Informatika UHN IGB Sugriwa Denpasar
            </h2>
            <p className="mt-5 text-base leading-8 text-blue-50">
              Temukan informasi akademik, kurikulum, dan layanan jurusan untuk mendukung perjalanan belajar di bidang informatika.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <a className="inline-flex items-center justify-center gap-2 rounded-md bg-campus px-5 py-3 text-sm font-bold text-ink hover:bg-white" href="/akademik/panduan-akademik">
              Lihat Panduan Akademik
              <ArrowRight size={18} />
            </a>
            <a className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-bold text-white hover:bg-white/10" href="mailto:informatika@example.ac.id">
              <Mail size={18} />
              Hubungi Jurusan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
