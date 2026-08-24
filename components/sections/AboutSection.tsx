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
      initial={shouldReduce ? {} : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASING }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Semantically distinct icons for each value */
const VALUE_ICONS: Record<string, React.ReactNode> = {
  speed: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  design: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838.838-2.872a2 2 0 0 1 .506-.855z"/>
    </svg>
  ),
  collab: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="about-section"
      aria-label="About IRDIVE"
    >
      <SectionBg variant="mascot-left" mascotSrc="/mascot-3.png" mascotOpacity={0.04} />
      <div className="container">

        {/* Top: editorial label + tagline — 40/60 layout */}
        <div className="about-top-grid">
          {/* Left col: label + headline */}
          <div>
            <RevealBlock delay={0}>
              <span className="label-tag" style={{ display: "block", marginBottom: "1.2rem", color: "var(--theme-accent)" }}>
                Tentang IRDIVE
              </span>
              <h2 className="about-headline">
                Kami terlibat langsung<br />
                dalam bisnis <span style={{ color: "var(--theme-accent)" }}>kamu</span>
              </h2>
            </RevealBlock>
          </div>

          {/* Right col: pull-quote */}
          <RevealBlock delay={0.12} style={{ display: "flex", alignItems: "flex-end" }}>
            <blockquote className="about-pullquote">
              <p>{ABOUT.tagline}</p>
            </blockquote>
          </RevealBlock>
        </div>

        {/* Story */}
        <RevealBlock delay={0.08} style={{ marginTop: "1.25rem", marginBottom: "4rem" }}>
          <p className="about-story">
            {ABOUT.story}
          </p>
        </RevealBlock>

        {/* Vision & Mission */}
        <div className="vm-grid">
          {/* Vision */}
          <RevealBlock delay={0.1}>
            <div className="vm-card">
              <div className="vm-card-header">
                <span className="vm-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                </span>
                <span className="vm-title">Visi</span>
              </div>
              <p className="vm-text">{ABOUT.vision}</p>
            </div>
          </RevealBlock>

          {/* Mission */}
          <RevealBlock delay={0.18}>
            <div className="vm-card">
              <div className="vm-card-header">
                <span className="vm-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </span>
                <span className="vm-title">Misi</span>
              </div>
              <p className="vm-text">{ABOUT.mission}</p>
            </div>
          </RevealBlock>
        </div>

        {/* Values */}
        <div className="values-grid">
          {ABOUT.values.map((val, i) => (
            <RevealBlock key={val.title} delay={0.08 * i}>
              <div className="value-card">
                <span className="value-icon">
                  {VALUE_ICONS[val.icon] || VALUE_ICONS.speed}
                </span>
                <div>
                  <h3 className="value-title">{val.title}</h3>
                  <p className="value-desc">{val.desc}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>

      <style>{`
        .about-section {
          position: relative;
          overflow: hidden;
          padding-top: 3.5rem;
          padding-bottom: 3.5rem;
        }
        .about-top-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }
        .about-headline {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3.25rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.12;
          color: var(--theme-text);
          max-width: 480px;
          margin: 0;
        }
        .about-pullquote {
          border-left: 3px solid var(--green);
          padding-left: 1.5rem;
          max-width: 520px;
          margin: 0;
        }
        .about-pullquote p {
          font-size: 1.1rem;
          color: var(--theme-text);
          opacity: 0.75;
          line-height: 1.65;
        }
        .about-story {
          font-size: 1.1rem;
          color: var(--theme-text);
          opacity: 0.75;
          line-height: 1.8;
          max-width: 680px;
          margin: 0;
        }
        .vm-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 3rem;
        }
        .vm-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--theme-border);
          border-radius: 16px;
          padding: 1.25rem;
          height: 100%;
          transition: border-color 0.2s;
        }
        .vm-card:hover {
          border-color: var(--theme-accent);
        }
        .vm-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .vm-icon {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--theme-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--theme-accent);
          flex-shrink: 0;
        }
        .vm-title {
          font-family: var(--font-display);
          font-size: clamp(1rem, 2.5vw, 1.35rem);
          font-weight: 700;
          color: var(--theme-text);
        }
        .vm-text {
          font-size: clamp(0.82rem, 2vw, 0.95rem);
          color: var(--theme-text);
          opacity: 0.75;
          line-height: 1.6;
        }
        .values-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }
        .value-card {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          padding: 1.25rem;
          border-radius: 14px;
          border: 1px solid var(--theme-border);
          background: rgba(255, 255, 255, 0.03);
          transition: border-color 0.25s, transform 0.25s;
        }
        .value-card:hover {
          border-color: var(--theme-accent);
          transform: translateY(-2px);
        }
        .value-icon {
          flex-shrink: 0;
          color: var(--theme-accent);
          margin-top: 2px;
        }
        .value-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(0.9rem, 2.5vw, 1.05rem);
          color: var(--theme-text);
          margin-bottom: 0.375rem;
        }
        .value-desc {
          color: var(--theme-text);
          opacity: 0.7;
          font-size: clamp(0.78rem, 2vw, 0.92rem);
          line-height: 1.55;
        }

        @media (min-width: 768px) {
          .about-top-grid {
            grid-template-columns: 1fr 1fr;
            margin-bottom: 4rem;
          }
          .vm-grid {
            gap: 1.5rem;
          }
          .vm-card {
            padding: 2rem;
          }
          .vm-icon {
            width: 40px;
            height: 40px;
          }
          .values-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }
          .value-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
