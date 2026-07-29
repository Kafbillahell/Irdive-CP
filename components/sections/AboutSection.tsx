'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ABOUT } from "@/lib/content";
import SectionBg from "@/components/ui/SectionBg";

const EASING = [0.22, 1, 0.36, 1] as const;

function RevealBlock({
  children,
  delay = 0,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? {} : { opacity: 0, y: 32, rotateX: 8 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASING }}
      style={{ perspective: 1000, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{ background: "transparent", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}
    >
      <SectionBg variant="mascot-left" mascotSrc="/mascot-3.png" mascotOpacity={0.04} />
      <div className="container">

        {/* Top: editorial label + tagline row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
            marginBottom: "5rem",
          }}
          className="about-top-grid"
        >
          {/* Left col */}
          <div>
            <RevealBlock delay={0}>
              <span className="label-tag" style={{ display: "block", marginBottom: "1.25rem", color: "var(--theme-accent)" }}>
                Tentang IRDIVE
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.01em", color: "var(--theme-text)", maxWidth: 480 }}>
                Bukan sekadar<br />
                <span style={{ color: "var(--theme-accent)" }}>vendor</span><br />
                Mitra digital
              </h2>
            </RevealBlock>
          </div>

          {/* Right col: pull-quote */}
          <RevealBlock delay={0.12} style={{ display: "flex", alignItems: "flex-end" }}>
            <blockquote
              style={{
                borderLeft: "3px solid #4CAF50",
                paddingLeft: "1.5rem",
                maxWidth: 520,
              }}
            >
              <p style={{ fontSize: "1.2rem", color: "#4B5563", lineHeight: 1.65 }}>
                {ABOUT.tagline}
              </p>
            </blockquote>
          </RevealBlock>
        </div>

        {/* Story */}
        <RevealBlock delay={0.08} style={{ marginBottom: "4rem" }}>
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--theme-text)",
              opacity: 0.8,
              lineHeight: 1.8,
              maxWidth: 680,
            }}
          >
            {ABOUT.story}
          </p>
        </RevealBlock>

        {/* Vision & Mission */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.5rem",
            marginBottom: "4rem",
          }}
          className="vm-grid"
        >
          {/* Vision */}
          <RevealBlock delay={0.1}>
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--theme-border)",
                borderRadius: 16,
                padding: "2rem",
                height: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <span
                  className="vm-icon"
                  style={{
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--theme-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--theme-accent)",
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 3vw, 1.5rem)", fontWeight: 700, color: "var(--theme-text)" }}>Visi</span>
              </div>
              <p style={{ fontSize: "clamp(0.8rem, 2.5vw, 1rem)", color: "var(--theme-text)", opacity: 0.8, lineHeight: 1.6 }}>{ABOUT.vision}</p>
            </div>
          </RevealBlock>

          {/* Mission */}
          <RevealBlock delay={0.18}>
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--theme-border)",
                borderRadius: 16,
                padding: "2rem",
                height: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <span
                  className="vm-icon"
                  style={{
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--theme-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--theme-accent)",
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 3vw, 1.5rem)", fontWeight: 700, color: "var(--theme-text)" }}>Misi</span>
              </div>
              <p style={{ fontSize: "clamp(0.8rem, 2.5vw, 1rem)", color: "var(--theme-text)", opacity: 0.8, lineHeight: 1.6 }}>{ABOUT.mission}</p>
            </div>
          </RevealBlock>
        </div>

        {/* Values */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1rem",
          }}
          className="values-grid"
        >
          {ABOUT.values.map((val, i) => (
            <RevealBlock key={val.title} delay={0.08 * i}>
              <div
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  alignItems: "flex-start",
                  padding: "1.5rem",
                  borderRadius: 14,
                  border: "1px solid var(--theme-border)",
                  background: "rgba(255,255,255,0.02)",
                  transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--theme-accent)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--theme-border)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </span>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)", color: "var(--theme-text)", marginBottom: "0.375rem" }}>
                    {val.title}
                  </h3>
                  <p style={{ color: "var(--theme-text)", opacity: 0.7, fontSize: "clamp(0.75rem, 2vw, 0.95rem)", lineHeight: 1.5 }}>{val.desc}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>

      <style>{`
        .vm-grid {
          grid-template-columns: 1fr 1fr !important;
          gap: 0.5rem !important;
        }
        .vm-card { padding: 0.75rem !important; }
        .vm-icon { width: 28px !important; height: 28px !important; }

        @media (min-width: 768px) {
          .vm-grid { gap: 1.5rem !important; }
          .vm-card { padding: 2rem !important; }
          .vm-icon { width: 40px !important; height: 40px !important; }
          .about-top-grid { grid-template-columns: 1fr 1fr !important; }
          .values-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
