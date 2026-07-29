import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";
import SectionProgressIndicator from "@/components/ui/SectionProgressIndicator";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ThemeZone from "@/components/theme/ThemeZone";

// Lazy load sections that exist beneath the fold
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"));
const PortfolioSection = dynamic(() => import("@/components/sections/PortfolioSection"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));
const PartnershipsSection = dynamic(() => import("@/components/sections/PartnershipsSection"));

export default function Home() {
  return (
    <>
      <Navbar />
      <SectionProgressIndicator />

      <main>
        {/* Zona 1: Terang - Jati Diri */}
        <ThemeZone bg="#FAFAFA" text="#0B0F19" accent="#254EDB" border="#E5E7EB">
          <HeroSection />
          {/* Divider can be replaced or stripped since sections melt together now */}
          <AboutSection />
        </ThemeZone>

        {/* Zona 2: Gelap - Kedalaman Bisnis */}
        <ThemeZone bg="#0B0F19" text="#F9FAFB" accent="#048753" border="#1F2937">
          <ServicesSection />
        </ThemeZone>

        {/* Zona 3: Industrial - Galeri */}
        <ThemeZone bg="#F4F5F7" text="#111827" accent="#254EDB" border="#E5E7EB">
          <PortfolioSection />
        </ThemeZone>

        {/* Zona 4: Gelap Final - Resolusi */}
        <ThemeZone bg="#080B13" text="#F9FAFB" accent="#048753" border="#1F2937">
          <ContactSection />
          <PartnershipsSection />
        </ThemeZone>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--theme-border)",
          padding: "2rem 0",
          background: "var(--theme-bg)",
          color: "var(--theme-text)"
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.85rem", color: "#9CA3AF" }}>
            © {new Date().getFullYear()} IRDIVE. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
