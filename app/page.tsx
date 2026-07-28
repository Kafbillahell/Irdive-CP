import Navbar from "@/components/ui/Navbar";
import SectionProgressIndicator from "@/components/ui/SectionProgressIndicator";
import SectionDivider from "@/components/ui/SectionDivider";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ContactSection from "@/components/sections/ContactSection";
import PartnershipsSection from "@/components/sections/PartnershipsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <SectionProgressIndicator />

      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* Hero → About (off-white → white) */}
        <SectionDivider fromColor="#FAFAFA" toColor="#FFFFFF" />

        {/* 2. About */}
        <AboutSection />

        {/* About → Services (white → #F8FAFC) */}
        <SectionDivider fromColor="#FFFFFF" toColor="#F8FAFC" flip />

        {/* 3. Services */}
        <ServicesSection />

        {/* Services → Portfolio (F8FAFC → white) */}
        <SectionDivider fromColor="#F8FAFC" toColor="#FFFFFF" />

        {/* 4. Portfolio */}
        <PortfolioSection />

        {/* Portfolio → Contact (white → #F8FAFC) */}
        <SectionDivider fromColor="#FFFFFF" toColor="#F8FAFC" flip />

        {/* 5. Contact */}
        <ContactSection />

        {/* Contact → Partnerships (F8FAFC → white) */}
        <SectionDivider fromColor="#F8FAFC" toColor="#FFFFFF" />

        {/* 6. Partnerships */}
        <PartnershipsSection />
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #E5E7EB",
          padding: "2rem 0",
          background: "#FAFAFA",
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
          <p style={{ fontSize: "0.85rem", color: "#9CA3AF" }}>
            Dibangun dengan ❤️ menggunakan Next.js
          </p>
        </div>
      </footer>
    </>
  );
}
