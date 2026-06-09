import { CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/profile/PageHeader";
import { SectionHeading } from "@/components/profile/SectionHeading";
import { visionMission } from "@/lib/data/profile";

export default function VisionMissionGoalPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Visi, Misi, dan Tujuan"
          description="Arah pengembangan jurusan disusun sebagai panduan akademik yang dapat diperbarui sesuai dokumen resmi kelembagaan."
        />
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <article className="rounded-md bg-ink p-8 text-white shadow-soft">
                <p className="text-sm font-bold uppercase tracking-wide text-campus">Visi</p>
                <h2 className="mt-4 text-2xl font-bold leading-snug">Rumusan Visi Jurusan</h2>
                <p className="mt-5 text-sm leading-8 text-blue-50">{visionMission.vision}</p>
              </article>
              <div className="rounded-md border border-slate-200 bg-white p-8 shadow-sm">
                <SectionHeading
                  eyebrow="Misi"
                  title="Langkah Strategis"
                  description="Misi berikut merupakan placeholder formal yang disiapkan agar mudah disesuaikan dengan naskah resmi jurusan."
                />
                <div className="grid gap-4">
                  {visionMission.missions.map((mission, index) => (
                    <div className="flex gap-4 rounded-md bg-slate-50 p-4" key={mission}>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ocean text-sm font-bold text-white">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-7 text-slate-600">{mission}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Tujuan"
              title="Tujuan Penyelenggaraan"
              description="Tujuan jurusan diarahkan untuk mendukung kualitas lulusan, budaya akademik, dan kontribusi teknologi yang bertanggung jawab."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {visionMission.goals.map((goal) => (
                <div className="flex gap-4 rounded-md border border-slate-200 bg-slate-50 p-5" key={goal}>
                  <CheckCircle2 className="mt-1 shrink-0 text-leaf" size={22} />
                  <p className="text-sm leading-7 text-slate-600">{goal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
