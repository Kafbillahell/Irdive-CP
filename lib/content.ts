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
  headline: "Build Better\nDigital Experiences.",
  subheadline:
    "IRDIVE membantu bisnis membangun website, web app, dan solusi digital yang cepat, scalable, dan punya dampak nyata.",
  ctaPrimary: { label: "Konsultasi Gratis", href: "#contact" },
  ctaSecondary: { label: "Lihat Portfolio", href: "#portfolio" },
} as const;

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 30, suffix: "+", label: "Projects Delivered" },
  { value: 25, suffix: "+", label: "Happy Clients" },
  { value: 3, suffix: "+", label: "Years Experience" },
];

// ── About ─────────────────────────────────────────────────────
export const ABOUT = {
  tagline: "Kami bukan sekadar vendor — kami mitra digital yang ikut memikirkan bisnis kamu.",
  story:
    "IRDIVE lahir dari frustrasi melihat bisnis bagus terjebak di website yang buruk. Kami percaya tampilan digital yang baik bukan kemewahan, tapi kebutuhan dasar setiap bisnis modern.",
  vision: "Menjadi studio digital terpercaya yang membantu bisnis Indonesia tampil lebih baik di dunia digital.",
  mission:
    "Membangun produk digital yang tidak hanya cantik secara visual, tapi juga cepat, accessible, dan benar-benar bekerja untuk bisnis klien.",
  values: [
    {
      icon: "⚡",
      title: "Speed First",
      desc: "Performa bukan bonus — ini standar minimum kami.",
    },
    {
      icon: "🎯",
      title: "Purposeful Design",
      desc: "Setiap keputusan desain punya alasan dan tujuan bisnis.",
    },
    {
      icon: "🤝",
      title: "Partnership",
      desc: "Kami ikut memikirkan masalah, bukan hanya eksekusi order.",
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
    desc: "Website profesional yang merepresentasikan bisnis kamu dengan desain custom, performa tinggi, dan konten yang bisa dikelola sendiri.",
    featured: true,
  },
  {
    id: "landing-page",
    title: "Landing Page",
    desc: "Halaman konversi yang dioptimasi untuk menarik leads dan mendorong aksi nyata dari pengunjung.",
  },
  {
    id: "web-app",
    title: "Custom Web App",
    desc: "Aplikasi web yang dibangun sesuai workflow bisnis — dari MVP hingga sistem produksi penuh.",
  },
  {
    id: "business-system",
    title: "Internal Business System",
    desc: "Dashboard, sistem manajemen, dan tools operasional yang bikin tim kamu bekerja lebih efisien.",
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    desc: "Desain antarmuka yang bukan cuma cantik tapi mudah dipakai — riset, wireframe, hingga desain final.",
  },
  {
    id: "maintenance",
    title: "Website Maintenance",
    desc: "Layanan pemeliharaan berkala supaya website kamu tetap cepat, aman, dan up to date.",
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
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "p1",
    title: "Toko Nusantara",
    category: "featured",
    categoryLabel: "E-Commerce Platform",
    description:
      "Platform e-commerce dengan sistem manajemen produk, payment gateway, dan dashboard analitik real-time.",
    tech: ["Next.js", "PostgreSQL", "Stripe"],
    span: "wide",
    accentColor: "#2196F3",
  },
  {
    id: "p2",
    title: "Klinik Sehat",
    category: "website",
    categoryLabel: "Company Profile",
    description: "Website company profile untuk klinik kesehatan modern dengan sistem booking appointment online.",
    tech: ["Next.js", "Tailwind", "Sanity"],
    span: "normal",
    accentColor: "#4CAF50",
  },
  {
    id: "p3",
    title: "FinTrack Pro",
    category: "system",
    categoryLabel: "Business System",
    description: "Sistem manajemen keuangan internal untuk perusahaan distribusi dengan laporan otomatis.",
    tech: ["React", "Node.js", "MySQL"],
    span: "normal",
    accentColor: "#2196F3",
  },
  {
    id: "p4",
    title: "Summit Academy",
    category: "landing",
    categoryLabel: "Landing Page",
    description: "Landing page kursus online dengan conversion rate optimization dan A/B testing.",
    tech: ["Next.js", "Framer Motion"],
    span: "wide",
    accentColor: "#4CAF50",
  },
  {
    id: "p5",
    title: "Logistix Dashboard",
    category: "system",
    categoryLabel: "Business System",
    description: "Dashboard monitoring logistik dengan tracking real-time dan manajemen armada.",
    tech: ["React", "TypeScript", "Mapbox"],
    span: "normal",
    accentColor: "#2196F3",
  },
  {
    id: "p6",
    title: "Rasa Kuliner",
    category: "website",
    categoryLabel: "Restaurant Profile",
    description: "Website restoran dengan menu digital, galeri, dan integrasi reservasi.",
    tech: ["Next.js", "Contentful"],
    span: "normal",
    accentColor: "#4CAF50",
  },
];

// ── Contact ───────────────────────────────────────────────────
export const CONTACT_INFO = {
  whatsapp: "6285xxxxxxxxx", // Replace with real number
  email: "hello@irdive.id",
  instagram: "@irdive.id",
  linkedin: "IRDIVE",
  location: "Indonesia",
  waMessage:
    "Halo IRDIVE! Saya tertarik dengan layanan kalian dan ingin konsultasi lebih lanjut tentang project saya.",
} as const;

// ── Partnerships ──────────────────────────────────────────────
export interface TechBadge {
  name: string;
  emoji: string;
}

export const TECH_STACK: TechBadge[] = [
  { name: "Next.js", emoji: "▲" },
  { name: "React", emoji: "⚛" },
  { name: "TypeScript", emoji: "🔷" },
  { name: "Tailwind CSS", emoji: "🎨" },
  { name: "Node.js", emoji: "🟢" },
  { name: "PostgreSQL", emoji: "🐘" },
  { name: "Vercel", emoji: "▲" },
  { name: "Supabase", emoji: "⚡" },
  { name: "Figma", emoji: "🖼" },
  { name: "Framer", emoji: "🎞" },
  { name: "Sanity", emoji: "📝" },
  { name: "Stripe", emoji: "💳" },
];
