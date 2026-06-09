import { footerLinks } from "@/data/homepage";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.1fr_0.9fr_0.9fr] lg:px-8">
        <div>
          <h2 className="text-xl font-bold">Jurusan Informatika</h2>
          <p className="mt-2 text-sm font-medium text-blue-100">UHN IGB Sugriwa Denpasar</p>
          <p className="mt-5 max-w-md text-sm leading-7 text-blue-50">
            Profil resmi jurusan untuk informasi akademik, kegiatan mahasiswa, berita, agenda, dan pengembangan keilmuan informatika.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-campus">Kontak</h3>
          <p className="mt-4 text-sm leading-7 text-blue-50">
            Jl. Placeholder Kampus UHN IGB Sugriwa, Denpasar, Bali
          </p>
          <p className="mt-2 text-sm text-blue-50">informatika@example.ac.id</p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-campus">Link Cepat</h3>
          <div className="mt-4 grid gap-2">
            {footerLinks.map((link) => (
              <a className="text-sm text-blue-50 hover:text-campus" href="#" key={link}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <p className="mx-auto max-w-7xl px-4 text-sm text-blue-100 sm:px-6 lg:px-8">
          Copyright © 2026 Jurusan Informatika UHN IGB Sugriwa Denpasar. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
}
