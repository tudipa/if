// Data dummy akademik. Ganti seluruh isi file ini dengan data resmi jurusan ketika sudah tersedia.
export const graduateProfiles = [
  {
    id: "gp-001",
    title: "Software Developer",
    description: "Lulusan mampu merancang, membangun, menguji, dan memelihara perangkat lunak sesuai kebutuhan pengguna.",
    competencies: ["Pemrograman", "Analisis kebutuhan", "Pengujian perangkat lunak"],
    careerFields: ["Pengembang aplikasi", "Web developer", "Mobile developer"]
  },
  {
    id: "gp-002",
    title: "System Analyst",
    description: "Lulusan mampu menganalisis proses bisnis dan menerjemahkannya menjadi rancangan sistem informasi.",
    competencies: ["Pemodelan sistem", "Dokumentasi kebutuhan", "Evaluasi solusi"],
    careerFields: ["Analis sistem", "Konsultan TI", "Business analyst"]
  },
  {
    id: "gp-003",
    title: "Data Analyst",
    description: "Lulusan mampu mengolah data, menyusun visualisasi, dan menyajikan insight untuk mendukung keputusan.",
    competencies: ["Analisis data", "Visualisasi", "Dasar statistik"],
    careerFields: ["Analis data", "Data officer", "Reporting analyst"]
  },
  {
    id: "gp-004",
    title: "IT Entrepreneur",
    description: "Lulusan mampu mengembangkan gagasan produk digital dan memahami dasar pengelolaan usaha teknologi.",
    competencies: ["Inovasi produk", "Validasi ide", "Manajemen proyek"],
    careerFields: ["Founder produk digital", "Product associate", "Digital business"]
  },
  {
    id: "gp-005",
    title: "Network Administrator",
    description: "Lulusan mampu memahami pengelolaan jaringan komputer, keamanan dasar, dan layanan infrastruktur TI.",
    competencies: ["Administrasi jaringan", "Keamanan dasar", "Troubleshooting"],
    careerFields: ["Administrator jaringan", "IT support", "Infrastructure officer"]
  },
  {
    id: "gp-006",
    title: "AI/ML Practitioner",
    description: "Lulusan mampu menerapkan konsep dasar kecerdasan buatan dan pembelajaran mesin secara bertanggung jawab.",
    competencies: ["Pemodelan data", "Machine learning dasar", "Etika AI"],
    careerFields: ["AI associate", "ML junior practitioner", "Data product assistant"]
  }
];

export const cplCategories = [
  {
    id: "cpl-sikap",
    category: "Sikap",
    items: [
      "Menunjukkan integritas, tanggung jawab, dan etika akademik dalam kegiatan pembelajaran.",
      "Menghargai keberagaman, kerja sama, dan komunikasi yang santun dalam lingkungan akademik.",
      "Memiliki kepedulian terhadap dampak sosial dari pemanfaatan teknologi informasi."
    ]
  },
  {
    id: "cpl-pengetahuan",
    category: "Pengetahuan",
    items: [
      "Menguasai konsep dasar informatika, pemrograman, data, sistem informasi, dan jaringan komputer.",
      "Memahami metode analisis dan perancangan solusi teknologi berdasarkan kebutuhan pengguna.",
      "Memahami prinsip keamanan, kualitas, dan keberlanjutan dalam pengembangan sistem."
    ]
  },
  {
    id: "cpl-umum",
    category: "Keterampilan Umum",
    items: [
      "Mampu berpikir kritis, menyusun argumen akademik, dan memecahkan masalah secara terstruktur.",
      "Mampu bekerja mandiri maupun kolaboratif dalam kegiatan proyek dan pembelajaran.",
      "Mampu mengkomunikasikan hasil kerja secara lisan, tulisan, dan visual."
    ]
  },
  {
    id: "cpl-khusus",
    category: "Keterampilan Khusus",
    items: [
      "Mampu mengembangkan perangkat lunak sederhana sampai menengah sesuai kaidah rekayasa perangkat lunak.",
      "Mampu mengolah data dan membangun solusi informasi untuk kebutuhan akademik, organisasi, atau masyarakat.",
      "Mampu menerapkan perangkat, metode, dan praktik teknologi informasi secara tepat guna."
    ]
  }
];

export const academicGuides = [
  {
    id: "guide-001",
    title: "Kalender Akademik",
    category: "Perencanaan",
    description: "Panduan placeholder terkait jadwal perkuliahan, masa registrasi, evaluasi, dan kegiatan akademik.",
    href: "#"
  },
  {
    id: "guide-002",
    title: "Kartu Rencana Studi",
    category: "Registrasi",
    description: "Acuan pengisian rencana studi mahasiswa dengan memperhatikan arahan dosen pembimbing akademik.",
    href: "#"
  },
  {
    id: "guide-003",
    title: "Perkuliahan dan Presensi",
    category: "Pembelajaran",
    description: "Informasi dummy mengenai tata tertib perkuliahan, kehadiran, dan partisipasi mahasiswa.",
    href: "#"
  },
  {
    id: "guide-004",
    title: "Penilaian dan Evaluasi",
    category: "Evaluasi",
    description: "Panduan placeholder tentang komponen penilaian, evaluasi pembelajaran, dan umpan balik akademik.",
    href: "#"
  },
  {
    id: "guide-005",
    title: "Tugas Akhir",
    category: "Kelulusan",
    description: "Acuan umum proses pengajuan, pembimbingan, pelaksanaan, dan dokumentasi tugas akhir.",
    href: "#"
  },
  {
    id: "guide-006",
    title: "Etika Akademik",
    category: "Etika",
    description: "Panduan sikap akademik, integritas, sitasi, kolaborasi, dan penggunaan teknologi secara bertanggung jawab.",
    href: "#"
  }
];

export const academicFaqs = [
  {
    question: "Bagaimana prosedur pengisian KRS?",
    answer: "Mahasiswa mengikuti jadwal akademik, berkonsultasi dengan pembimbing akademik, lalu mengisi rencana studi sesuai ketentuan yang berlaku."
  },
  {
    question: "Bagaimana mekanisme bimbingan akademik?",
    answer: "Bimbingan akademik dilakukan melalui koordinasi mahasiswa dengan dosen pembimbing untuk membahas rencana studi, kendala, dan perkembangan akademik."
  },
  {
    question: "Bagaimana aturan kehadiran perkuliahan?",
    answer: "Aturan kehadiran mengikuti pedoman akademik yang berlaku dan dapat diperbarui sesuai kebijakan resmi universitas atau jurusan."
  },
  {
    question: "Bagaimana proses pengajuan tugas akhir?",
    answer: "Mahasiswa menyiapkan usulan topik, memenuhi persyaratan akademik, dan mengikuti prosedur pembimbingan sesuai panduan resmi."
  }
];

export const curriculumCourses = [
  { id: "mk-001", code: "IF101", name: "Pengantar Informatika", semester: 1, credits: 2, category: "Wajib" },
  { id: "mk-002", code: "IF102", name: "Dasar Pemrograman", semester: 1, credits: 3, category: "Praktikum" },
  { id: "mk-003", code: "IF103", name: "Matematika Diskrit", semester: 1, credits: 3, category: "Wajib" },
  { id: "mk-004", code: "IF201", name: "Struktur Data", semester: 2, credits: 3, category: "Praktikum" },
  { id: "mk-005", code: "IF202", name: "Basis Data", semester: 2, credits: 3, category: "Praktikum" },
  { id: "mk-006", code: "IF203", name: "Organisasi Komputer", semester: 2, credits: 2, category: "Wajib" },
  { id: "mk-007", code: "IF301", name: "Rekayasa Perangkat Lunak", semester: 3, credits: 3, category: "Wajib" },
  { id: "mk-008", code: "IF302", name: "Sistem Operasi", semester: 3, credits: 3, category: "Wajib" },
  { id: "mk-009", code: "IF303", name: "Jaringan Komputer", semester: 3, credits: 3, category: "Praktikum" },
  { id: "mk-010", code: "IF401", name: "Pemrograman Web", semester: 4, credits: 3, category: "Praktikum" },
  { id: "mk-011", code: "IF402", name: "Analisis dan Perancangan Sistem", semester: 4, credits: 3, category: "Wajib" },
  { id: "mk-012", code: "IF403", name: "Statistika dan Analisis Data", semester: 4, credits: 3, category: "Wajib" },
  { id: "mk-013", code: "IF501", name: "Kecerdasan Buatan", semester: 5, credits: 3, category: "Wajib" },
  { id: "mk-014", code: "IF502", name: "Keamanan Informasi", semester: 5, credits: 3, category: "Wajib" },
  { id: "mk-015", code: "IF503", name: "Kewirausahaan Digital", semester: 5, credits: 2, category: "Pilihan" },
  { id: "mk-016", code: "IF601", name: "Metodologi Penelitian Informatika", semester: 6, credits: 3, category: "Wajib" },
  { id: "mk-017", code: "IF602", name: "Data Mining", semester: 6, credits: 3, category: "Pilihan" },
  { id: "mk-018", code: "IF603", name: "Manajemen Proyek TI", semester: 6, credits: 3, category: "Wajib" },
  { id: "mk-019", code: "IF701", name: "Kerja Praktik", semester: 7, credits: 3, category: "Wajib" },
  { id: "mk-020", code: "IF702", name: "Topik Khusus Informatika", semester: 7, credits: 3, category: "Pilihan" },
  { id: "mk-021", code: "IF801", name: "Seminar Proposal", semester: 8, credits: 2, category: "Tugas Akhir" },
  { id: "mk-022", code: "IF802", name: "Tugas Akhir", semester: 8, credits: 6, category: "Tugas Akhir" }
];
