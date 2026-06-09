import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AcademicGuideCard } from "@/components/academic/AcademicGuideCard";
import { FAQAccordion } from "@/components/academic/FAQAccordion";
import { PageHeader } from "@/components/profile/PageHeader";
import { SectionHeading } from "@/components/profile/SectionHeading";
import { academicGuides } from "@/lib/data/academic";

export default function AcademicGuidePage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          description="Panduan akademik membantu mahasiswa memahami proses perkuliahan, perencanaan studi, evaluasi, dan tata kelola akademik."
          eyebrow="Akademik"
          parentLabel="Akademik"
          title="Panduan Akademik"
        />
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Panduan"
              title="Acuan Proses Akademik"
              description="Item berikut masih berupa placeholder dan disiapkan agar kelak dapat diarahkan ke dokumen atau halaman detail resmi."
            />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {academicGuides.map((guide) => (
                <AcademicGuideCard {...guide} key={guide.id} />
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="FAQ"
              title="Pertanyaan Akademik Umum"
              description="Jawaban berikut bersifat umum dan dapat diganti sesuai pedoman akademik resmi."
            />
            <FAQAccordion />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
