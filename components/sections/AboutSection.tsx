'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ABOUT } from "@/lib/content";

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
      style={{ background: "#FFFFFF", paddingTop: "5rem", paddingBottom: "5rem" }}
    >
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
              <span className="label-tag" style={{ display: "block", marginBottom: "1.25rem" }}>
                Tentang IRDIVE
              </span>
              <h2 className="display-2" style={{ color: "#1E2328", maxWidth: 480 }}>
                Bukan sekadar<br />
                <span style={{ color: "#2196F3" }}>vendor</span> —<br />
                mitra digital.
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
              <p style={{ fontSize: "1.2rem", color: "#4B5563", lineHeight: 1.65, fontStyle: "italic" }}>
                &ldquo;{ABOUT.tagline}&rdquo;
              </p>
            </blockquote>
          </RevealBlock>
        </div>

        {/* Story */}
        <RevealBlock delay={0.08} style={{ marginBottom: "4rem" }}>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#4B5563",
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
                background: "#F8FBFF",
                border: "1px solid #E3F2FD",
                borderRadius: 16,
                padding: "2rem",
                height: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "#E3F2FD",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem",
                    flexShrink: 0,
                  }}
                >
                  🔭
                </span>
                <span className="heading-2" style={{ color: "#1E2328" }}>Visi</span>
              </div>
              <p style={{ color: "#4B5563", lineHeight: 1.7 }}>{ABOUT.vision}</p>
            </div>
          </RevealBlock>

          {/* Mission */}
          <RevealBlock delay={0.18}>
            <div
              style={{
                background: "#F6FBF6",
                border: "1px solid #C8E6C9",
                borderRadius: 16,
                padding: "2rem",
                height: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "#E8F5E9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem",
                    flexShrink: 0,
                  }}
                >
                  🎯
                </span>
                <span className="heading-2" style={{ color: "#1E2328" }}>Misi</span>
              </div>
              <p style={{ color: "#4B5563", lineHeight: 1.7 }}>{ABOUT.mission}</p>
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
                  border: "1px solid #F3F4F6",
                  background: "#FAFAFA",
                  transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#90CAF9";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(33,150,243,0.10)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#F3F4F6";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{val.icon}</span>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", color: "#1E2328", marginBottom: "0.375rem" }}>
                    {val.title}
                  </h3>
                  <p style={{ color: "#6B7280", fontSize: "0.95rem", lineHeight: 1.6 }}>{val.desc}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .about-top-grid { grid-template-columns: 1fr 1fr !important; }
          .vm-grid { grid-template-columns: 1fr 1fr !important; }
          .values-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
