'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SECTION_IDS } from "@/lib/content";

const SECTION_LABELS: Record<string, string> = {
  home: "Home",
  about: "About",
  services: "Services",
  portfolio: "Portfolio",
  contact: "Contact",
  partnerships: "Partnerships",
};

export default function SectionProgressIndicator() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionMap: Record<string, number> = {};
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
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
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="hidden md:flex"
      style={{
        position: "fixed",
        right: "1.5rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 90,
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
      }}
      aria-label="Section navigation"
    >
      {SECTION_IDS.map((id) => {
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
              padding: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.span
              animate={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                backgroundColor: isActive ? "#2196F3" : "#D1D5DB",
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
    </div>
  );
}
