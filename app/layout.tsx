import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

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
  title: "IRDIVE — Build Better Digital Experiences",
  description:
    "IRDIVE membantu bisnis membangun website, web app, dan solusi digital yang cepat, scalable, dan punya dampak nyata. Company profile, landing page, custom web app, dan lebih banyak lagi.",
  keywords: ["web development", "company profile", "landing page", "web app", "UI/UX design", "Indonesia"],
  authors: [{ name: "IRDIVE" }],
  openGraph: {
    title: "IRDIVE — Build Better Digital Experiences",
    description: "Studio digital yang membantu bisnis tampil lebih baik di dunia digital.",
    type: "website",
    locale: "id_ID",
    siteName: "IRDIVE",
  },
  twitter: {
    card: "summary_large_image",
    title: "IRDIVE — Build Better Digital Experiences",
    description: "Studio digital yang membantu bisnis tampil lebih baik di dunia digital.",
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
        {children}
      </body>
    </html>
  );
}