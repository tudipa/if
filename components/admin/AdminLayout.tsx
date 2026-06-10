import Link from "next/link";
import { LogoutButton } from "@/components/admin/LogoutButton";

const links = [
  { label: "Dashboard", href: "/admin" },
  { label: "Berita", href: "/admin/berita" },
  { label: "Agenda", href: "/admin/agenda" },
  { label: "Prestasi Mahasiswa", href: "/admin/prestasi-mahasiswa" },
  { label: "Kegiatan Mahasiswa", href: "/admin/kegiatan-mahasiswa" },
  { label: "Lihat Situs", href: "/" }
];

export function AdminLayout({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-md bg-ink p-4 text-white lg:min-h-[calc(100vh-48px)]">
          <h1 className="text-xl font-bold">CMS Informatika</h1>
          <nav className="mt-6 grid gap-2">
            {links.map((link) => (
              <Link className="rounded-md px-3 py-2 text-sm font-bold text-blue-50 hover:bg-white/10 hover:text-campus" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <LogoutButton />
        </aside>
        <div>
          <header className="mb-6 rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-ocean">Admin</p>
            <h2 className="mt-2 text-3xl font-bold text-ink">{title}</h2>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
