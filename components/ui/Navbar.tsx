'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IrdiveLogo from "@/components/logo-maskot/IrdiveLogo";
import { NAV_LINKS, SECTION_IDS } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll-aware background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracker via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionMap: Record<string, number> = {};

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          sectionMap[id] = entry.intersectionRatio;
          // Highest ratio = most visible = active
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
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s",
          background: scrolled ? "rgba(250,250,250,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 1px 0 0 #E5E7EB" : "none",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <a href="#home" onClick={() => handleNavClick("#home")} aria-label="IRDIVE — ke halaman utama">
            <IrdiveLogo size="md" />
          </a>

          {/* Desktop nav */}
          <ul
            style={{
              display: "none",
              listStyle: "none",
              gap: "2rem",
              alignItems: "center",
            }}
            className="md:flex"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#2196F3" : "#4B5563",
                      padding: "4px 0",
                      position: "relative",
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        style={{
                          position: "absolute",
                          bottom: -2,
                          left: 0,
                          right: 0,
                          height: 2,
                          background: "#2196F3",
                          borderRadius: 2,
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a
              href="#contact"
              onClick={() => handleNavClick("#contact")}
              className="hidden md:inline-flex"
              style={{
                background: "#2196F3",
                color: "white",
                fontWeight: 600,
                fontSize: "0.875rem",
                padding: "0.5rem 1.25rem",
                borderRadius: 10,
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#1565C0";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#2196F3";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Hubungi Kami
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden"
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 5,
                padding: 4,
              }}
            >
              <motion.span
                style={{ display: "block", width: 22, height: 2, background: "#1E2328", borderRadius: 2, transformOrigin: "center" }}
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                style={{ display: "block", width: 22, height: 2, background: "#1E2328", borderRadius: 2 }}
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                style={{ display: "block", width: 22, height: 2, background: "#1E2328", borderRadius: 2, transformOrigin: "center" }}
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                overflow: "hidden",
                background: "rgba(250,250,250,0.97)",
                backdropFilter: "blur(16px)",
                borderTop: "1px solid #E5E7EB",
              }}
            >
              <ul style={{ listStyle: "none", padding: "1rem 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "var(--font-body)",
                        fontSize: "1rem",
                        fontWeight: activeSection === link.href.replace("#", "") ? 600 : 400,
                        color: activeSection === link.href.replace("#", "") ? "#2196F3" : "#4B5563",
                        padding: "0.625rem 0",
                        borderBottom: "1px solid #F3F4F6",
                        transition: "color 0.2s",
                      }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li style={{ paddingTop: "0.75rem" }}>
                  <a
                    href="#contact"
                    onClick={() => handleNavClick("#contact")}
                    style={{
                      display: "block",
                      background: "#2196F3",
                      color: "white",
                      fontWeight: 600,
                      textAlign: "center",
                      padding: "0.75rem",
                      borderRadius: 10,
                    }}
                  >
                    Hubungi Kami
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
