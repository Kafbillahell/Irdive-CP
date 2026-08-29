import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";
import SectionProgressIndicator from "@/components/ui/SectionProgressIndicator";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ThemeZone from "@/components/theme/ThemeZone";
import { NAV_LINKS, CONTACT_INFO } from "@/lib/content";

// Lazy load sections that exist beneath the fold
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"));
const PortfolioSection = dynamic(() => import("@/components/sections/PortfolioSection"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));
const PartnershipsSection = dynamic(() => import("@/components/sections/PartnershipsSection"));
const MapLocationSection = dynamic(() => import("@/components/sections/MapLocationSection"));

export default function Home() {
  return (
    <>
      <Navbar />
      <SectionProgressIndicator />

      <main>
        {/* Zona 1: Terang - Jati Diri */}
        <ThemeZone bg="#FAFAFA" text="#0B0F19" accent="#254EDB" border="#E5E7EB">
          <HeroSection />
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

        <ThemeZone bg="#FFFFFF" text="#111827" accent="#D13434" border="#E5E7EB">
          <MapLocationSection />
        </ThemeZone>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-inner">
            {/* Brand & Tagline */}
            <div className="footer-brand">
              <span className="footer-brand-name">IRDIVE</span>
              <p className="footer-tagline">
                Membantu bisnis Indonesia membangun solusi digital profesional dan berdampak nyata.
              </p>
            </div>

            {/* Navigation */}
            <nav aria-label="Footer navigation">
              <ul className="footer-nav">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social Links */}
            <div className="footer-socials">
              <a
                href={`https://instagram.com/${CONTACT_INFO.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram IRDIVE"
                className="footer-social-link"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href={CONTACT_INFO.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok IRDIVE"
                className="footer-social-link"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.55V6.79a4.86 4.86 0 0 1-1.01-.1Z"/>
                </svg>
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                aria-label="Email IRDIVE"
                className="footer-social-link"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-copyright" style={{ marginTop: "2rem" }}>
            <p>© {new Date().getFullYear()} IRDIVE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
