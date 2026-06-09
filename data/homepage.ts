import {
  Binary,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  GraduationCap,
  Lightbulb,
  Network,
  Scale,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";

export const navItems = [
  {
    label: "Profile",
    href: "#tentang",
    children: [
      { label: "Visi, Misi, dan Tujuan", href: "/profile/visi-misi-tujuan" },
      { label: "Struktur Organisasi", href: "/profile/struktur-organisasi" },
      { label: "Mitra Kerjasama", href: "/profile/mitra-kerjasama" },
      { label: "Tenaga Pengajar", href: "/profile/tenaga-pengajar" }
    ]
  },
  {
    label: "Akademik",
    href: "#akademik",
    children: [
      { label: "Profil Lulusan dan Capaian Pembelajaran Lulusan", href: "/akademik/profil-lulusan-cpl" },
      { label: "Panduan Akademik", href: "/akademik/panduan-akademik" },
      { label: "Struktur Kurikulum", href: "/akademik/struktur-kurikulum" }
    ]
  },
  {
    label: "Kemahasiswaan",
    href: "#kemahasiswaan",
    children: [
      { label: "Prestasi Mahasiswa", href: "/kemahasiswaan/prestasi-mahasiswa" },
      { label: "Kegiatan Mahasiswa", href: "/kemahasiswaan/kegiatan-mahasiswa" }
    ]
  },
  {
    label: "Berita & Agenda",
    href: "/berita-agenda"
  }
];

export const highlights = [
  {
    title: "Pembelajaran Berbasis Teknologi",
    description: "Kegiatan akademik diarahkan untuk menguasai perangkat, platform, dan praktik digital mutakhir.",
    icon: GraduationCap
  },
  {
    title: "Kurikulum Relevan Industri",
    description: "Materi pembelajaran disusun agar selaras dengan kebutuhan profesi informatika dan transformasi digital.",
    icon: BriefcaseBusiness
  },
  {
    title: "Pengembangan Riset dan Inovasi",
    description: "Mahasiswa didorong menghasilkan solusi berbasis data, perangkat lunak, dan sistem cerdas.",
    icon: Lightbulb
  },
  {
    title: "Karakter dan Etika Akademik",
    description: "Setiap proses belajar menumbuhkan integritas, tanggung jawab, dan kepekaan sosial.",
    icon: Scale
  }
];

export const missions = [
  "Menyelenggarakan pendidikan informatika yang adaptif, berkualitas, dan berorientasi pada kebutuhan masyarakat.",
  "Mengembangkan riset terapan di bidang perangkat lunak, data, sistem cerdas, dan teknologi informasi.",
  "Membangun kemitraan akademik dan industri untuk memperkuat pengalaman belajar mahasiswa.",
  "Menanamkan etika, profesionalisme, dan karakter unggul dalam setiap aktivitas akademik."
];

export const focusAreas = [
  { title: "Software Engineering", icon: Code2 },
  { title: "Artificial Intelligence", icon: BrainCircuit },
  { title: "Data Science", icon: Database },
  { title: "Information Systems", icon: Binary },
  { title: "Computer Networks", icon: Network },
  { title: "Digital Entrepreneurship", icon: Sparkles }
];

export const news = [
  {
    category: "Berita",
    date: "12 Agustus 2026",
    title: "Workshop Pengembangan Aplikasi Web untuk Mahasiswa Informatika",
    summary: "Mahasiswa mengikuti pelatihan intensif untuk memperkuat kemampuan perancangan dan implementasi aplikasi web."
  },
  {
    category: "Akademik",
    date: "20 Agustus 2026",
    title: "Sosialisasi Kurikulum Berbasis Capaian Pembelajaran",
    summary: "Jurusan memperkenalkan arah pembelajaran dan kompetensi lulusan kepada mahasiswa baru."
  },
  {
    category: "Riset",
    date: "02 September 2026",
    title: "Kolaborasi Riset Sistem Cerdas untuk Solusi Digital Lokal",
    summary: "Dosen dan mahasiswa mengembangkan riset informatika yang relevan dengan kebutuhan masyarakat."
  }
];

export const agendas = [
  {
    category: "Agenda",
    date: "15 September 2026",
    title: "Kuliah Tamu: Tren Karier Data dan AI",
    summary: "Sesi bersama praktisi industri untuk membahas peluang karier di bidang data dan kecerdasan buatan."
  },
  {
    category: "Kegiatan",
    date: "28 September 2026",
    title: "Informatics Innovation Day",
    summary: "Pameran karya mahasiswa berupa prototipe perangkat lunak, sistem informasi, dan produk digital."
  },
  {
    category: "Kemahasiswaan",
    date: "10 Oktober 2026",
    title: "Pembinaan Organisasi dan Etika Profesi",
    summary: "Kegiatan pembinaan karakter akademik, kepemimpinan, dan kolaborasi mahasiswa informatika."
  }
];

export const footerLinks = ["Profile", "Akademik", "Kemahasiswaan", "Berita & Agenda"];

export const stats = [
  { label: "Fokus Keilmuan", value: "6+" },
  { label: "Ruang Inovasi", value: "Aktif" },
  { label: "Orientasi Lulusan", value: "Digital" }
];

export const heroTags = [
  { label: "Data", icon: Database },
  { label: "AI", icon: BrainCircuit },
  { label: "Software", icon: Code2 },
  { label: "Etika", icon: ShieldCheck },
  { label: "Kolaborasi", icon: UsersRound }
];
