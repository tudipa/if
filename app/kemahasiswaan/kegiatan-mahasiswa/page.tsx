import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/profile/PageHeader";
import { SectionHeading } from "@/components/profile/SectionHeading";
import { StudentActivityGrid } from "@/components/student/StudentActivityGrid";

export default function StudentActivityPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          description="Kegiatan mahasiswa mendukung pembelajaran aktif melalui seminar, workshop, pelatihan, lomba, pengabdian, kegiatan himpunan, dan agenda akademik lainnya."
          eyebrow="Kemahasiswaan"
          parentLabel="Kemahasiswaan"
          title="Kegiatan Mahasiswa"
        />
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Agenda"
              title="Daftar Kegiatan Mahasiswa"
              description="Daftar kegiatan berikut menggunakan data dummy agar struktur halaman siap dikembangkan menjadi agenda resmi jurusan."
            />
            <StudentActivityGrid />
            <div className="mt-10 rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-ink">Ajukan Kegiatan Mahasiswa</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Rencana kegiatan dapat disiapkan untuk koordinasi, pendampingan, dan dokumentasi jurusan.
                  </p>
                </div>
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-ocean px-5 py-3 text-sm font-bold text-white hover:bg-ink"
                  href="#"
                >
                  Lihat Agenda Kegiatan
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
