import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/profile/PageHeader";
import { PartnerGrid } from "@/components/profile/PartnerGrid";
import { SectionHeading } from "@/components/profile/SectionHeading";

export default function PartnershipPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Mitra Kerjasama"
          description="Kerja sama menjadi ruang penguatan pembelajaran, penelitian, pengabdian, dan pengembangan pengalaman profesional mahasiswa."
        />
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Kemitraan"
              title="Jaringan Akademik dan Profesional"
              description="Jurusan dapat mengembangkan kerja sama dengan institusi akademik, industri, pemerintah, komunitas, dan lembaga riset. Seluruh data pada halaman ini masih berupa placeholder."
            />
            <PartnerGrid />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
