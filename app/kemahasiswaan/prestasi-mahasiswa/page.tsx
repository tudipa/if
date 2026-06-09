import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/profile/PageHeader";
import { SectionHeading } from "@/components/profile/SectionHeading";
import { StudentAchievementGrid } from "@/components/student/StudentAchievementGrid";

export default function StudentAchievementPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          description="Prestasi mahasiswa menjadi ruang apresiasi atas proses belajar, kreativitas, penelitian, kompetisi, teknologi, dan pengabdian kepada masyarakat."
          eyebrow="Kemahasiswaan"
          parentLabel="Kemahasiswaan"
          title="Prestasi Mahasiswa"
        />
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Capaian"
              title="Daftar Prestasi Mahasiswa"
              description="Data berikut masih berupa placeholder akademik dan dapat diganti dengan prestasi resmi setelah tersedia."
            />
            <StudentAchievementGrid />
            <div className="mt-10 rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-ink">Laporkan Prestasi Mahasiswa</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Informasi prestasi dapat disiapkan untuk proses verifikasi dan publikasi jurusan.
                  </p>
                </div>
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-ocean px-5 py-3 text-sm font-bold text-white hover:bg-ink"
                  href="#"
                >
                  Lihat Semua Prestasi
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
