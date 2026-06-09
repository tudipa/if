import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CurriculumTable } from "@/components/academic/CurriculumTable";
import { PageHeader } from "@/components/profile/PageHeader";
import { SectionHeading } from "@/components/profile/SectionHeading";

export default function CurriculumStructurePage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          description="Struktur kurikulum menggambarkan sebaran mata kuliah, semester, SKS, dan kategori pembelajaran dalam rancangan akademik jurusan."
          eyebrow="Akademik"
          parentLabel="Akademik"
          title="Struktur Kurikulum"
        />
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Kurikulum"
              title="Daftar Mata Kuliah"
              description="Tabel berikut menggunakan data dummy semester 1 sampai 8. Data, kode, nama mata kuliah, dan SKS harus diganti dengan kurikulum resmi jurusan."
            />
            <CurriculumTable />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
