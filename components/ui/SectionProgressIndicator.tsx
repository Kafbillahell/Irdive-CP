'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SECTION_IDS } from "@/lib/content";

const SECTION_LABELS: Record<string, string> = {
  hero: "Home",
  about: "About",
  services: "Services",
  portfolio: "Portfolio",
  contact: "Contact",
  partnerships: "Partnerships",
};

export default function SectionProgressIndicator() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sectionMap: Record<string, number> = {};
    const observers: IntersectionObserver[] = [];

    // Check for both hero / home ID
    const targetIds = ["hero", "about", "services", "portfolio", "contact", "partnerships"];

    targetIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          sectionMap[id] = entry.intersectionRatio;
          const best = Object.entries(sectionMap).sort((a, b) => b[1] - a[1])[0];
          if (best && best[1] > 0) setActiveSection(best[0]);
        },
        { rootMargin: "-20% 0px -20% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (id: string) => {
    const targetId = id === "home" ? "hero" : id;
    const el = document.getElementById(targetId) || document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const sections = ["hero", "about", "services", "portfolio", "contact", "partnerships"];

  return (
    <nav
      className="hidden md:flex section-nav-indicator"
      style={{
        position: "fixed",
        right: "1.5rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 90,
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
        padding: "8px 6px",
        borderRadius: "20px",
        background: "rgba(15, 23, 42, 0.35)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      }}
      aria-label="Section navigation"
    >
      {sections.map((id) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => handleClick(id)}
            title={SECTION_LABELS[id]}
            aria-label={`Go to ${SECTION_LABELS[id]}`}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.span
              animate={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                backgroundColor: isActive ? "#2196F3" : "rgba(255, 255, 255, 0.4)",
                boxShadow: isActive ? "0 0 8px #2196F3" : "none",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{
                display: "block",
                borderRadius: "50%",
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
