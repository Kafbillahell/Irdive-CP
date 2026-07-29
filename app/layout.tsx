import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IRDIVE — Tampil Lebih Profesional di Dunia Digital",
  description:
    "IRDIVE membantu bisnis Indonesia membangun website, web app, dan solusi digital yang cepat, profesional, dan berdampak nyata. Company profile, landing page, custom web app, dan lebih banyak lagi.",
  keywords: ["web development", "company profile", "landing page", "web app", "UI/UX design", "Indonesia"],
  authors: [{ name: "IRDIVE" }],
  openGraph: {
    title: "IRDIVE — Tampil Lebih Profesional di Dunia Digital",
    description: "Studio digital yang membantu bisnis Indonesia tampil profesional dan tumbuh lewat kanal digital.",
    type: "website",
    locale: "id_ID",
    siteName: "IRDIVE",
  },
  twitter: {
    card: "summary_large_image",
    title: "IRDIVE — Tampil Lebih Profesional di Dunia Digital",
    description: "Studio digital yang membantu bisnis Indonesia tampil profesional dan tumbuh lewat kanal digital.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}