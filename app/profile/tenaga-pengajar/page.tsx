import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/profile/PageHeader";
import { SectionHeading } from "@/components/profile/SectionHeading";
import { TeacherCard } from "@/components/profile/TeacherCard";
import { teachers } from "@/lib/data/profile";

export default function TeachersPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Tenaga Pengajar"
          description="Tenaga pengajar Jurusan Informatika berperan dalam penyelenggaraan pembelajaran, pembimbingan akademik, penelitian, dan pengabdian kepada masyarakat."
        />
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Dosen"
              title="Daftar Tenaga Pengajar"
              description="Daftar berikut menggunakan data dummy dan dapat diperbarui dengan foto, jabatan akademik, bidang keahlian, serta profil resmi masing-masing dosen."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {teachers.map((teacher) => (
                <TeacherCard {...teacher} key={teacher.email} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
