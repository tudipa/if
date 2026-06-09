import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CPLCategoryCard } from "@/components/academic/CPLCategoryCard";
import { GraduateProfileCard } from "@/components/academic/GraduateProfileCard";
import { PageHeader } from "@/components/profile/PageHeader";
import { SectionHeading } from "@/components/profile/SectionHeading";
import { cplCategories, graduateProfiles } from "@/lib/data/academic";

export default function GraduateProfileCplPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          description="Profil lulusan dan capaian pembelajaran lulusan menjadi acuan pengembangan kompetensi, pembelajaran, dan evaluasi akademik jurusan."
          eyebrow="Akademik"
          parentLabel="Akademik"
          title="Profil Lulusan dan Capaian Pembelajaran Lulusan"
        />
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Profil Lulusan"
              title="Arah Kompetensi Lulusan"
              description="Profil berikut merupakan data dummy formal yang dapat disesuaikan dengan dokumen akademik resmi jurusan."
            />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {graduateProfiles.map((profile) => (
                <GraduateProfileCard {...profile} key={profile.id} />
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="CPL"
              title="Capaian Pembelajaran Lulusan"
              description="Kategori CPL disusun sebagai placeholder agar mudah diganti dengan rumusan resmi jurusan."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {cplCategories.map((item) => (
                <CPLCategoryCard {...item} key={item.id} />
              ))}
            </div>
            <Link
              className="mt-10 inline-flex items-center gap-2 rounded-md bg-ocean px-5 py-3 text-sm font-bold text-white hover:bg-ink"
              href="/akademik/struktur-kurikulum"
            >
              Lihat Struktur Kurikulum
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
