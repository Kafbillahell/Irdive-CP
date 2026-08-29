// ─────────────────────────────────────────────────────────────
// IRDIVE — Content Layer
// Single source of truth for all static content.
// Edit data here; never hardcode in JSX.
// ─────────────────────────────────────────────────────────────

// ── Navigation ────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
  { label: "Partnerships", href: "#partnerships" },
] as const;

export const SECTION_IDS = ["home", "about", "services", "portfolio", "contact", "partnerships"] as const;

// ── Hero ──────────────────────────────────────────────────────
export const HERO = {
  headline: "Tampil Lebih Profesional\ndi Dunia Digital",
  subheadline:
    "IRDIVE membantu bisnis Indonesia membangun website dan aplikasi web yang cepat, terlihat profesional, dan benar-benar berdampak nyata pada pertumbuhan bisnis.",
  ctaPrimary:   { label: "Konsultasi Gratis", href: "#contact" },
  ctaSecondary: { label: "Lihat Portfolio",   href: "#portfolio" },
} as const;

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 30, suffix: "+", label: "Proyek Selesai" },
  { value: 25, suffix: "+", label: "Klien Puas" },
  { value: 3,  suffix: "+", label: "Tahun Pengalaman" },
];

// ── About ─────────────────────────────────────────────────────
export const ABOUT = {
  tagline: "Kami terlibat langsung dalam bisnis kamu, bukan cuma bikin desain lalu pergi",
  story:
    "IRDIVE hadir karena kami melihat terlalu banyak bisnis bagus yang tampil asal-asalan di internet. Website jelek kehilangan kepercayaan klien sebelum mereka sempat ngobrol. Kami ada untuk mengubah itu.",
  vision:
    "Menjadi studio digital pilihan bisnis Indonesia yang ingin tampil serius dan tumbuh lewat kanal digital",
  mission:
    "Membangun produk digital yang terlihat profesional, bekerja cepat, dan memberi hasil nyata bagi bisnis klien",
  values: [
    {
      icon: "speed",
      title: "Performa Tinggi",
      desc: "Website lambat kehilangan pengunjung. Performa bukan fitur tambahan, ini hal pertama yang kami jaga.",
    },
    {
      icon: "design",
      title: "Desain Bertujuan",
      desc: "Setiap pilihan desain ada alasannya. Tampil menarik saja tidak cukup kalau tidak membantu bisnis kamu berkembang.",
    },
    {
      icon: "collab",
      title: "Kolaborasi Nyata",
      desc: "Kami terlibat langsung memahami tantangan bisnis kamu, bukan sekadar mengeksekusi brief.",
    },
  ],
} as const;

// ── Services ──────────────────────────────────────────────────
export interface Service {
  id: string;
  title: string;
  desc: string;
  featured?: boolean;
}

export const SERVICES: Service[] = [
  {
    id: "company-profile",
    title: "Company Profile Website",
    desc: "Website profesional yang merepresentasikan bisnis kamu dengan tepat. Desain custom, performa tinggi, dan mudah dikelola sendiri.",
    featured: true,
  },
  {
    id: "landing-page",
    title: "Landing Page",
    desc: "Halaman yang dirancang khusus untuk mengkonversi pengunjung menjadi leads atau pelanggan nyata.",
  },
  {
    id: "web-app",
    title: "Aplikasi Web Custom",
    desc: "Aplikasi web yang dibangun sesuai kebutuhan bisnis kamu, mulai dari tahap awal hingga sistem produksi penuh.",
  },
  {
    id: "business-system",
    title: "Sistem Bisnis Internal",
    desc: "Dashboard dan tools operasional yang membantu tim kamu bekerja lebih teratur dan hemat waktu.",
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    desc: "Desain antarmuka yang nyaman dipakai dan enak dilihat, dari riset pengguna sampai tampilan akhir.",
  },
  {
    id: "maintenance",
    title: "Website Maintenance",
    desc: "Layanan perawatan rutin agar website kamu tetap cepat, aman, dan selalu up to date.",
  },
];

// ── Portfolio ─────────────────────────────────────────────────
export interface PortfolioItem {
  id: string;
  title: string;
  category: "featured" | "website" | "system" | "landing";
  categoryLabel: string;
  description: string;
  tech: string[];
  span?: "wide" | "tall" | "normal";
  accentColor: string;
  imageSrc?: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "p1",
    title: "Zans Café",
    category: "featured",
    categoryLabel: "Brand & Experience",
    description:
      "Visual brand café yang menonjolkan suasana hangat, menu khas, dan pengalaman kuliner yang memorable untuk pengunjung.",
    tech: ["Branding", "UI Design", "Visual Story"],
    span: "wide",
    accentColor: "#1E2328",
    imageSrc: "/card-portfolio/zans%20cafe%20card.png",
  },
  {
    id: "p2",
    title: "SISAB",
    category: "system",
    categoryLabel: "School Information System",
    description:
      "Sistem informasi sekolah yang memudahkan pengelolaan data siswa, absensi, dan jadwal dengan tampilan yang rapi dan mudah dipakai.",
    tech: ["Dashboard", "Data Management", "Web App"],
    span: "normal",
    accentColor: "#1E2328",
    imageSrc: "/card-portfolio/sisab%20card.png",
  },
  {
    id: "p3",
    title: "Uang Kas",
    category: "website",
    categoryLabel: "Cash Management",
    description:
      "Aplikasi pencatatan kas sederhana yang membantu memantau transaksi, saldo, dan laporan bulanan dengan lebih teratur.",
    tech: ["Finance UI", "Reporting", "Simple Workflow"],
    span: "normal",
    accentColor: "#1E2328",
    imageSrc: "/card-portfolio/uang%20kas%20card.png",
  },
];

// ── Contact ───────────────────────────────────────────────────
export const CONTACT_INFO = {
  whatsapp: "6285721326004",
  email: "irdive.tech@gmail.com",
  instagram: "@irdive.tech",
  tiktok: "https://www.tiktok.com/@irdive.tech?is_from_webapp=1&sender_device=pc",
  location: "Indonesia",
  waMessage:
    "Halo IRDIVE! Saya tertarik dengan layanan kalian dan ingin diskusi lebih lanjut soal project saya.",
} as const;

export const MAP_LOCATION = {
  googleMapsQuery:
    "Perumahan Lembah Permata, Jalan Raya Cianjur Blok E2 No. 6 (Block E2 No. 6.), KAB. CIANJUR - WARUNGKONDANG, JAWA BARAT, ID 43261",
  address:
    "Perumahan Lembah Permata, Jalan Raya Cianjur Blok E2 No. 6 (Block E2 No. 6.), KAB. CIANJUR - WARUNGKONDANG, JAWA BARAT, ID 43261",
} as const;

// ── Partnerships ──────────────────────────────────────────────
export interface TechBadge {
  name: string;
  color: string;
}

export const TECH_STACK: TechBadge[] = [
  { name: "Next.js",      color: "#000000" },
  { name: "React",        color: "#61DAFB" },
  { name: "TypeScript",   color: "#3178C6" },
  { name: "Tailwind CSS", color: "#38B2AC" },
  { name: "Node.js",      color: "#339933" },
  { name: "PostgreSQL",   color: "#336791" },
  { name: "Vercel",       color: "#000000" },
  { name: "Supabase",     color: "#3ECF8E" },
  { name: "Figma",        color: "#F24E1E" },
  { name: "Framer",       color: "#0055FF" },
  { name: "Sanity",       color: "#F03E2F" },
  { name: "Stripe",       color: "#008CDD" },
];
