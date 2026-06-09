import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { OrganizationCard } from "@/components/profile/OrganizationCard";
import { PageHeader } from "@/components/profile/PageHeader";
import { SectionHeading } from "@/components/profile/SectionHeading";
import { organization } from "@/lib/data/profile";

export default function OrganizationStructurePage() {
  const [leader, secretary, ...coordinators] = organization;

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Struktur Organisasi"
          description="Struktur organisasi jurusan menggambarkan pembagian peran koordinatif dalam pengelolaan akademik, kemahasiswaan, kerja sama, dan layanan administrasi."
        />
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Tata Kelola"
              title="Hierarki Organisasi Jurusan"
              description="Data berikut bersifat dummy dan disusun agar mudah diganti ketika susunan resmi telah tersedia."
            />
            <div className="mx-auto max-w-4xl">
              <div className="mx-auto max-w-md">
                <OrganizationCard {...leader} />
              </div>
              <div className="mx-auto h-10 w-px bg-slate-300" />
              <div className="mx-auto max-w-md">
                <OrganizationCard {...secretary} />
              </div>
              <div className="mx-auto h-10 w-px bg-slate-300" />
              <div className="grid gap-5 md:grid-cols-2">
                {coordinators.map((item) => (
                  <OrganizationCard {...item} key={item.position} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
