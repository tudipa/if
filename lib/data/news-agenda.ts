// Data dummy Berita & Agenda. Ganti dengan data resmi jurusan atau API backend ketika sudah tersedia.
export const newsItems = [
  {
    id: "news-001",
    title: "Penguatan Pembelajaran Berbasis Proyek di Lingkungan Jurusan",
    slug: "penguatan-pembelajaran-berbasis-proyek",
    category: "Akademik",
    date: "12 Agustus 2026",
    excerpt:
      "Berita placeholder tentang pengembangan proses pembelajaran yang menekankan praktik, kolaborasi, dan evaluasi berbasis karya.",
    image: "",
    type: "berita" as const
  },
  {
    id: "news-002",
    title: "Mahasiswa Mengikuti Kegiatan Pengembangan Kompetensi Digital",
    slug: "pengembangan-kompetensi-digital-mahasiswa",
    category: "Kemahasiswaan",
    date: "18 Agustus 2026",
    excerpt:
      "Informasi dummy mengenai aktivitas mahasiswa dalam memperkuat kemampuan teknologi, komunikasi, dan kerja tim.",
    image: "",
    type: "berita" as const
  },
  {
    id: "news-003",
    title: "Riset Terapan Informatika untuk Solusi Digital Masyarakat",
    slug: "riset-terapan-informatika-solusi-digital",
    category: "Penelitian",
    date: "24 Agustus 2026",
    excerpt:
      "Berita placeholder tentang arah penelitian terapan yang berfokus pada kebutuhan akademik, organisasi, dan masyarakat.",
    image: "",
    type: "berita" as const
  },
  {
    id: "news-004",
    title: "Inisiasi Kerja Sama Pembelajaran dan Literasi Teknologi",
    slug: "inisiasi-kerja-sama-literasi-teknologi",
    category: "Kerja Sama",
    date: "02 September 2026",
    excerpt:
      "Informasi dummy tentang peluang kolaborasi untuk mendukung kegiatan akademik, pelatihan, dan pengembangan kompetensi.",
    image: "",
    type: "berita" as const
  },
  {
    id: "news-005",
    title: "Pengumuman Layanan Administrasi Akademik Semester Berjalan",
    slug: "pengumuman-layanan-administrasi-akademik",
    category: "Pengumuman",
    date: "08 September 2026",
    excerpt:
      "Pengumuman placeholder mengenai layanan akademik, jadwal koordinasi, dan informasi umum yang dapat diperbarui.",
    image: "",
    type: "berita" as const
  },
  {
    id: "news-006",
    title: "Dokumentasi Kegiatan Pengabdian Berbasis Literasi Digital",
    slug: "dokumentasi-pengabdian-literasi-digital",
    category: "Kemahasiswaan",
    date: "15 September 2026",
    excerpt:
      "Berita dummy mengenai kegiatan pengabdian yang melibatkan mahasiswa dalam edukasi teknologi secara bertanggung jawab.",
    image: "",
    type: "berita" as const
  }
];

export const agendaItems = [
  {
    id: "agenda-001",
    title: "Seminar Etika dan Karier Teknologi Informasi",
    slug: "seminar-etika-karier-teknologi-informasi",
    category: "Seminar",
    date: "20 September 2026",
    time: "09.00 - 11.30 WITA",
    location: "Kampus",
    status: "Akan Datang",
    excerpt:
      "Agenda placeholder untuk membahas kesiapan akademik, etika profesi, dan arah pengembangan karier bidang informatika.",
    type: "agenda" as const
  },
  {
    id: "agenda-002",
    title: "Workshop Dasar Analisis Data untuk Mahasiswa",
    slug: "workshop-dasar-analisis-data",
    category: "Workshop",
    date: "25 September 2026",
    time: "13.00 - 16.00 WITA",
    location: "Laboratorium",
    status: "Akan Datang",
    excerpt:
      "Kegiatan dummy berupa pelatihan pengolahan data, visualisasi, dan penyajian hasil analisis sederhana.",
    type: "agenda" as const
  },
  {
    id: "agenda-003",
    title: "Kuliah Tamu Transformasi Digital dan Inovasi",
    slug: "kuliah-tamu-transformasi-digital",
    category: "Kuliah Tamu",
    date: "30 September 2026",
    time: "10.00 - 12.00 WITA",
    location: "Hybrid",
    status: "Akan Datang",
    excerpt:
      "Agenda placeholder untuk memperkaya wawasan mahasiswa mengenai perkembangan transformasi digital.",
    type: "agenda" as const
  },
  {
    id: "agenda-004",
    title: "Rapat Akademik Evaluasi Pembelajaran",
    slug: "rapat-akademik-evaluasi-pembelajaran",
    category: "Rapat Akademik",
    date: "05 Oktober 2026",
    time: "09.00 - 10.30 WITA",
    location: "Kampus",
    status: "Berlangsung",
    excerpt:
      "Agenda dummy untuk koordinasi evaluasi pembelajaran dan penguatan layanan akademik jurusan.",
    type: "agenda" as const
  },
  {
    id: "agenda-005",
    title: "Kegiatan Mahasiswa Pengembangan Produk Digital",
    slug: "kegiatan-mahasiswa-produk-digital",
    category: "Kegiatan Mahasiswa",
    date: "12 Oktober 2026",
    time: "08.30 - 15.00 WITA",
    location: "Online",
    status: "Selesai",
    excerpt:
      "Agenda placeholder untuk ruang kolaborasi mahasiswa dalam menyusun gagasan produk dan prototipe digital.",
    type: "agenda" as const
  }
];
