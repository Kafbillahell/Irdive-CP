'use client';

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Syne } from "next/font/google";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PORTFOLIO_ITEMS, type PortfolioItem } from "@/lib/content";
import SectionBg from "@/components/ui/SectionBg";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

const EASING = [0.22, 1, 0.36, 1] as const;

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const isWide = item.span === "wide";

  return (
    <>
      <motion.article
        ref={ref}
        initial={shouldReduce ? {} : { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", scale: 1.05 }}
        whileInView={shouldReduce ? {} : { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.85, delay: 0.08 * (index % 3), ease: EASING }}
        className={isWide ? "portfolio-wide" : ""}
        style={{
          borderRadius: 18,
          overflow: "hidden",
          cursor: "pointer",
          position: "relative",
          border: "1px solid var(--theme-border)",
          background: "transparent",
          minHeight: isWide ? 260 : 220,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setModalOpen(true)}
        aria-label={`View project: ${item.title}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && setModalOpen(true)}
      >
        {/* Color block top */}
        <div
          className="pf-banner"
          style={{
            background: `linear-gradient(135deg, ${item.accentColor}18 0%, ${item.accentColor}08 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            transition: "height 0.3s",
          }}
        >
          {/* Abstract pattern */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(circle at 30% 50%, ${item.accentColor}25 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${item.accentColor}15 0%, transparent 40%)`,
            }}
          />
          <span
            className={syne.className}
            style={{
              fontSize: "clamp(1.5rem, 5vw, 2.8rem)",
              fontWeight: 800,
              color: item.accentColor,
              opacity: 0.15,
              letterSpacing: "-0.04em",
              position: "relative",
              zIndex: 1,
              userSelect: "none",
            }}
          >
            {item.title.slice(0, 2).toUpperCase()}
          </span>

          {/* Category badge */}
          <span
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              background: `${item.accentColor}18`,
              color: item.accentColor,
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "3px 10px",
              borderRadius: 20,
              border: `1px solid ${item.accentColor}28`,
            }}
          >
            {item.categoryLabel}
          </span>

          {/* Hover overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(30,35,40,0.65)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                }}
              >
                <motion.span
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.22, ease: EASING }}
                  style={{
                    background: "white",
                    color: "#1E2328",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    padding: "0.5rem 1.25rem",
                    borderRadius: 10,
                  }}
                >
                  Lihat Detail →
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card body */}
        <div className="pf-body">
          <h3
            className={syne.className}
            style={{
              fontWeight: 700,
              fontSize: "clamp(0.85rem, 3vw, 1.1rem)",
              color: "var(--theme-text)",
              marginBottom: "0.25rem",
              lineHeight: 1.2
            }}
          >
            {item.title}
          </h3>
          <div className="pf-tech">
            {item.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "clamp(0.55rem, 1.5vw, 0.7rem)",
                  fontWeight: 600,
                  color: "#6B7280",
                  background: "#F3F4F6",
                  padding: "2px 8px",
                  borderRadius: 6,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.article>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(30,35,40,0.6)",
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease: EASING }}
              style={{
                background: "white",
                borderRadius: 20,
                maxWidth: 540,
                width: "100%",
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(30,35,40,0.22)",
              }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div
                style={{
                  background: `linear-gradient(135deg, ${item.accentColor}22 0%, ${item.accentColor}08 100%)`,
                  padding: "2rem 2rem 1.5rem",
                  position: "relative",
                }}
              >
                <button
                  onClick={() => setModalOpen(false)}
                  aria-label="Tutup"
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background: "rgba(255,255,255,0.8)",
                    border: "none",
                    borderRadius: 8,
                    width: 32,
                    height: 32,
                    cursor: "pointer",
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#4B5563",
                  }}
                >
                  ✕
                </button>
                <span
                  style={{
                    background: `${item.accentColor}20`,
                    color: item.accentColor,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "3px 10px",
                    borderRadius: 20,
                    display: "inline-block",
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.categoryLabel}
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "#1E2328",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {item.title}
                </h2>
              </div>

              {/* Modal body */}
              <div style={{ padding: "1.5rem 2rem 2rem" }}>
                <p style={{ color: "#4B5563", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  {item.description}
                </p>
                <div style={{ marginBottom: "1.5rem" }}>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#9CA3AF",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Tech Stack
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: item.accentColor,
                          background: `${item.accentColor}14`,
                          padding: "4px 12px",
                          borderRadius: 8,
                          border: `1px solid ${item.accentColor}28`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#9CA3AF",
                    fontStyle: "italic",
                    background: "#F9FAFB",
                    padding: "0.75rem 1rem",
                    borderRadius: 10,
                    border: "1px solid #F3F4F6",
                  }}
                >
                  * Ini adalah contoh portfolio. Detail proyek nyata akan ditampilkan setelah live.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function PortfolioSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="portfolio"
      style={{ background: "transparent", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}
    >
      <SectionBg variant="mascot-right" mascotSrc="/mascot-3.png" mascotOpacity={0.04} />
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <motion.div
            ref={headerRef}
            initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASING }}
          >
            <span className="label-tag" style={{ display: "block", marginBottom: "0.75rem", color: "var(--theme-accent)" }}>
              Portfolio
            </span>
            <h2 className={syne.className} style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--theme-text)" }}>
              Karya yang<br />
              kami <span style={{ color: "var(--theme-accent)" }}>banggakan.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={shouldReduce ? {} : { opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASING }}
            style={{ color: "#6B7280", maxWidth: 280, fontSize: "0.95rem", lineHeight: 1.6 }}
          >
            Klik setiap card untuk lihat detail project, tech stack, dan proses pengerjaannya.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.25rem",
          }}
          className="portfolio-grid"
        >
          {PORTFOLIO_ITEMS.map((item, i) => (
            <PortfolioCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .portfolio-grid {
          grid-template-columns: 1fr 1fr !important;
          gap: 0.5rem !important;
        }
        .pf-banner { height: 90px !important; }
        .pf-body { padding: 0.75rem !important; }
        .pf-tech { display: flex; gap: 0.25rem; flex-wrap: wrap; margin-top: 0.5rem; }
        
        @media (min-width: 640px) {
          .portfolio-grid { gap: 1.25rem !important; }
          .pf-banner { height: 130px !important; }
          .portfolio-wide .pf-banner { height: 160px !important; }
          .pf-body { padding: 1.25rem 1.5rem !important; }
          .pf-tech { gap: 0.5rem; }
          .portfolio-wide {
            grid-column: span 2;
          }
        }
        @media (min-width: 1024px) {
          .portfolio-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
