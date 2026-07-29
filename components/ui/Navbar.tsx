'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SECTION_IDS } from "@/lib/content";

// The IRDIVE TECHNOLOGY logo PNG has significant internal transparent padding.
// We render it larger than typical so the actual brand content appears at a good size.
const LOGO_HEIGHT_TOP = 64;   // top bar (not scrolled)
const LOGO_HEIGHT_PILL = 52;  // floating pill (scrolled)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionMap: Record<string, number> = {};
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          sectionMap[id] = entry.intersectionRatio;
          const best = Object.entries(sectionMap).sort((a, b) => b[1] - a[1])[0];
          if (best && best[1] > 0) setActiveSection(best[0]);
        },
        { rootMargin: "-30% 0px -30% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href === "#home") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const Logo = ({ height }: { height: number }) => (
    <a
      href="#home"
      onClick={() => handleNavClick("#home")}
      aria-label="IRDIVE Technology"
      style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
    >
      <span style={{
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: height * 0.32,
        letterSpacing: "0.05em",
        color: "#1E2328",
        padding: "0.4rem 1.2rem",
        borderRadius: "99px",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(48px) saturate(1.7)",
        WebkitBackdropFilter: "blur(48px) saturate(1.7)",
        border: "1px solid rgba(255, 255, 255, 0.35)",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.05)",
      }}>
        IRDIVE
      </span>
    </a>
  );

  const NavLinks = ({ layoutId }: { layoutId: string }) => (
    <>
      {NAV_LINKS.map((link) => {
        const isActive = activeSection === link.href.replace("#", "");
        return (
          <button
            key={link.href}
            onClick={() => handleNavClick(link.href)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              fontWeight: isActive ? 600 : 400,
              color: isActive ? "#2196F3" : "#374151",
              padding: "4px 0",
              position: "relative",
              letterSpacing: "0.005em",
              transition: "color 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {link.label}
            {isActive && (
              <motion.span
                layoutId={layoutId}
                style={{
                  position: "absolute", bottom: -3, left: 0, right: 0,
                  height: 2,
                  background: "linear-gradient(90deg,#2196F3,#4CAF50)",
                  borderRadius: 2,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
          </button>
        );
      })}
    </>
  );

  const CtaButton = () => (
    <a
      href="https://www.instagram.com/irdive.tech?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
      target="_blank"
      rel="noopener noreferrer"
      style={{
        background: "linear-gradient(135deg,#2196F3,#1976D2)",
        color: "white", fontFamily: "var(--font-body)", fontWeight: 600,
        fontSize: "0.875rem", padding: "0.5rem 1.25rem", borderRadius: 10,
        textDecoration: "none", whiteSpace: "nowrap",
        boxShadow: "0 2px 10px rgba(33,150,243,0.28)",
        transition: "transform 0.18s, box-shadow 0.18s",
        display: "inline-flex", alignItems: "center",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 18px rgba(33,150,243,0.42)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 10px rgba(33,150,243,0.28)";
      }}
    >
      Hubungi Kami
    </a>
  );

  const Hamburger = () => (
    <button
      onClick={() => setMobileOpen((v) => !v)}
      aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
      style={{
        background: "none", border: "none", cursor: "pointer",
        display: "flex", flexDirection: "column", gap: 5,
        padding: "6px", borderRadius: 8, flexShrink: 0,
      }}
    >
      <motion.span style={{ display: "block", width: 22, height: 2, background: "#374151", borderRadius: 2, transformOrigin: "center" }} animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
      <motion.span style={{ display: "block", width: 22, height: 2, background: "#374151", borderRadius: 2 }} animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }} />
      <motion.span style={{ display: "block", width: 22, height: 2, background: "#374151", borderRadius: 2, transformOrigin: "center" }} animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
    </button>
  );

  const MobileDropdown = () => (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden", borderTop: "1px solid rgba(0,0,0,0.06)" }}
        >
          <div style={{ padding: "0.75rem 1.25rem 1.25rem", display: "flex", flexDirection: "column", gap: "0" }}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  width: "100%", textAlign: "left", background: "none", border: "none",
                  cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "1rem",
                  fontWeight: activeSection === link.href.replace("#", "") ? 600 : 400,
                  color: activeSection === link.href.replace("#", "") ? "#2196F3" : "#374151",
                  padding: "0.65rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </button>
            ))}
            <div style={{ paddingTop: "0.875rem" }}>
              <a
                href="https://www.instagram.com/irdive.tech?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block", background: "linear-gradient(135deg,#2196F3,#1976D2)",
                  color: "white", fontFamily: "var(--font-body)", fontWeight: 600,
                  textAlign: "center", padding: "0.8rem", borderRadius: 10, textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(33,150,243,0.35)",
                }}
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          TOP BAR — not scrolled
      ───────────────────────────────────────────────────────────── */}
      {!scrolled && (
        <nav
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0,
            zIndex: 100,
            background: "rgba(250,250,250,0.88)",
            backdropFilter: "blur(14px) saturate(1.5)",
            WebkitBackdropFilter: "blur(14px) saturate(1.5)",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 72,
              // Explicit horizontal padding on both edges — works on all screen sizes
              paddingLeft: "1.25rem",
              paddingRight: "1.25rem",
            }}
          >
            {/* Logo */}
            <Logo height={LOGO_HEIGHT_TOP} />

            {/* Desktop: nav links (hidden on mobile via display:none → flex on bigger screens) */}
            <div
              className="hidden md:flex"
              style={{ gap: "1.875rem", alignItems: "center" }}
            >
              <NavLinks layoutId="top-bar-underline" />
            </div>

            {/* Desktop: CTA + Mobile: hamburger */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div className="hidden md:inline-flex">
                <CtaButton />
              </div>
              <div className="md:hidden">
                <Hamburger />
              </div>
            </div>
          </div>

          {/* Mobile dropdown */}
          <MobileDropdown />
        </nav>
      )}

      {/* ─────────────────────────────────────────────────────────────
          FLOATING PILL — scrolled
      ───────────────────────────────────────────────────────────── */}
      {scrolled && (
        <motion.nav
          key="pill-nav"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            top: 12,
            left: 0,
            right: 0,
            margin: "0 auto",
            width: "calc(100% - 32px)",
            maxWidth: 1100,
            zIndex: 100,
            borderRadius: 18,
            // Clean premium glassmorphism — no SVG filter, no artifacts
            background: "rgba(255, 255, 255, 0.35)",
            backdropFilter: "blur(32px) saturate(1.7)",
            WebkitBackdropFilter: "blur(32px) saturate(1.7)",
            border: "1px solid rgba(255,255,255,0.95)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 58,
              paddingLeft: "1.25rem",
              paddingRight: "1.25rem",
            }}
          >
            {/* Logo */}
            <Logo height={LOGO_HEIGHT_PILL} />

            {/* Desktop nav links */}
            <div
              className="hidden md:flex"
              style={{ gap: "1.75rem", alignItems: "center" }}
            >
              <NavLinks layoutId="pill-underline" />
            </div>

            {/* CTA + hamburger */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div className="hidden md:inline-flex">
                <CtaButton />
              </div>
              <div className="md:hidden">
                <Hamburger />
              </div>
            </div>
          </div>

          {/* Mobile dropdown inside pill */}
          <MobileDropdown />
        </motion.nav>
      )}
    </>
  );
}
