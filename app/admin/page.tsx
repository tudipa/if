import { AdminLayout } from "@/components/admin/AdminLayout";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [newsCount, agendaCount, newsDraft, newsPublished, agendaDraft, agendaPublished] = await Promise.all([
    prisma.news.count(),
    prisma.agenda.count(),
    prisma.news.count({ where: { status: "draft" } }),
    prisma.news.count({ where: { status: "published" } }),
    prisma.agenda.count({ where: { publishStatus: "draft" } }),
    prisma.agenda.count({ where: { publishStatus: "published" } })
  ]);

  const stats = [
    { label: "Jumlah Berita", value: newsCount },
    { label: "Jumlah Agenda", value: agendaCount },
    { label: "Draft", value: newsDraft + agendaDraft },
    { label: "Published", value: newsPublished + agendaPublished }
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm" key={stat.label}>
            <p className="text-sm font-bold uppercase tracking-wide text-ocean">{stat.label}</p>
            <p className="mt-3 text-4xl font-bold text-ink">{stat.value}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
