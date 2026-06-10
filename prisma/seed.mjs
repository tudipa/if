import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const newsItems = [
  {
    title: "Penguatan Pembelajaran Berbasis Proyek di Lingkungan Jurusan",
    slug: "penguatan-pembelajaran-berbasis-proyek",
    category: "Akademik",
    date: new Date("2026-08-12"),
    excerpt:
      "Berita placeholder tentang pengembangan proses pembelajaran yang menekankan praktik, kolaborasi, dan evaluasi berbasis karya.",
    content:
      "Konten berita ini merupakan placeholder formal yang dapat diganti dengan informasi resmi jurusan setelah proses editorial selesai.",
    status: "published",
    featured: true
  },
  {
    title: "Mahasiswa Mengikuti Kegiatan Pengembangan Kompetensi Digital",
    slug: "pengembangan-kompetensi-digital-mahasiswa",
    category: "Kemahasiswaan",
    date: new Date("2026-08-18"),
    excerpt:
      "Informasi dummy mengenai aktivitas mahasiswa dalam memperkuat kemampuan teknologi, komunikasi, dan kerja tim.",
    content:
      "Konten placeholder ini disiapkan sebagai contoh berita kemahasiswaan yang dapat dikelola melalui CMS sederhana.",
    status: "published",
    featured: false
  },
  {
    title: "Riset Terapan Informatika untuk Solusi Digital Masyarakat",
    slug: "riset-terapan-informatika-solusi-digital",
    category: "Penelitian",
    date: new Date("2026-08-24"),
    excerpt:
      "Berita placeholder tentang arah penelitian terapan yang berfokus pada kebutuhan akademik, organisasi, dan masyarakat.",
    content:
      "Isi berita riset ini masih berupa data dummy dan tidak memuat klaim atau nama pihak tertentu.",
    status: "published",
    featured: false
  },
  {
    title: "Inisiasi Kerja Sama Pembelajaran dan Literasi Teknologi",
    slug: "inisiasi-kerja-sama-literasi-teknologi",
    category: "Kerja Sama",
    date: new Date("2026-09-02"),
    excerpt:
      "Informasi dummy tentang peluang kolaborasi untuk mendukung kegiatan akademik, pelatihan, dan pengembangan kompetensi.",
    content:
      "Konten kerja sama ini disiapkan agar struktur CMS dapat diuji tanpa memakai nama mitra resmi.",
    status: "published",
    featured: false
  },
  {
    title: "Pengumuman Layanan Administrasi Akademik Semester Berjalan",
    slug: "pengumuman-layanan-administrasi-akademik",
    category: "Pengumuman",
    date: new Date("2026-09-08"),
    excerpt:
      "Pengumuman placeholder mengenai layanan akademik, jadwal koordinasi, dan informasi umum yang dapat diperbarui.",
    content:
      "Isi pengumuman ini merupakan contoh untuk kebutuhan pengujian halaman daftar dan detail berita.",
    status: "draft",
    featured: false
  },
  {
    title: "Dokumentasi Kegiatan Pengabdian Berbasis Literasi Digital",
    slug: "dokumentasi-pengabdian-literasi-digital",
    category: "Kemahasiswaan",
    date: new Date("2026-09-15"),
    excerpt:
      "Berita dummy mengenai kegiatan pengabdian yang melibatkan mahasiswa dalam edukasi teknologi secara bertanggung jawab.",
    content:
      "Konten pengabdian ini masih placeholder dan dapat diperluas menjadi berita lengkap setelah data resmi tersedia.",
    status: "published",
    featured: false
  }
];

const agendaItems = [
  {
    title: "Seminar Etika dan Karier Teknologi Informasi",
    slug: "seminar-etika-karier-teknologi-informasi",
    category: "Seminar",
    date: new Date("2026-09-20"),
    time: "09.00 - 11.30 WITA",
    location: "Kampus",
    statusAgenda: "upcoming",
    excerpt:
      "Agenda placeholder untuk membahas kesiapan akademik, etika profesi, dan arah pengembangan karier bidang informatika.",
    content:
      "Konten agenda ini masih berupa placeholder dan dapat diperbarui dengan informasi resmi.",
    publishStatus: "published",
    featured: true
  },
  {
    title: "Workshop Dasar Analisis Data untuk Mahasiswa",
    slug: "workshop-dasar-analisis-data",
    category: "Workshop",
    date: new Date("2026-09-25"),
    time: "13.00 - 16.00 WITA",
    location: "Laboratorium",
    statusAgenda: "upcoming",
    excerpt:
      "Kegiatan dummy berupa pelatihan pengolahan data, visualisasi, dan penyajian hasil analisis sederhana.",
    content:
      "Deskripsi lengkap agenda ini dapat diganti dengan rundown atau informasi resmi ketika tersedia.",
    publishStatus: "published",
    featured: false
  },
  {
    title: "Kuliah Tamu Transformasi Digital dan Inovasi",
    slug: "kuliah-tamu-transformasi-digital",
    category: "Kuliah Tamu",
    date: new Date("2026-09-30"),
    time: "10.00 - 12.00 WITA",
    location: "Hybrid",
    statusAgenda: "upcoming",
    excerpt:
      "Agenda placeholder untuk memperkaya wawasan mahasiswa mengenai perkembangan transformasi digital.",
    content:
      "Konten kuliah tamu ini merupakan data dummy tanpa nama narasumber asli.",
    publishStatus: "published",
    featured: false
  },
  {
    title: "Rapat Akademik Evaluasi Pembelajaran",
    slug: "rapat-akademik-evaluasi-pembelajaran",
    category: "Rapat Akademik",
    date: new Date("2026-10-05"),
    time: "09.00 - 10.30 WITA",
    location: "Kampus",
    statusAgenda: "ongoing",
    excerpt:
      "Agenda dummy untuk koordinasi evaluasi pembelajaran dan penguatan layanan akademik jurusan.",
    content:
      "Konten rapat akademik ini dapat diganti dengan catatan agenda internal yang sesuai.",
    publishStatus: "draft",
    featured: false
  },
  {
    title: "Kegiatan Mahasiswa Pengembangan Produk Digital",
    slug: "kegiatan-mahasiswa-produk-digital",
    category: "Kegiatan Mahasiswa",
    date: new Date("2026-10-12"),
    time: "08.30 - 15.00 WITA",
    location: "Online",
    statusAgenda: "completed",
    excerpt:
      "Agenda placeholder untuk ruang kolaborasi mahasiswa dalam menyusun gagasan produk dan prototipe digital.",
    content:
      "Konten agenda mahasiswa ini masih placeholder dan mudah diganti lewat admin.",
    publishStatus: "published",
    featured: false
  }
];

async function main() {
  for (const item of newsItems) {
    await prisma.news.upsert({
      where: { slug: item.slug },
      update: item,
      create: item
    });
  }

  for (const item of agendaItems) {
    await prisma.agenda.upsert({
      where: { slug: item.slug },
      update: item,
      create: item
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
