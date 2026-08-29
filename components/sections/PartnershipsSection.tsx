'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TECH_STACK } from "@/lib/content";
import SectionBg from "@/components/ui/SectionBg";

const EASING = [0.22, 1, 0.36, 1] as const;

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Brief",
    desc: "Diskusi kebutuhan dan tujuan bisnis kamu.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
  },
  {
    step: "02",
    title: "Design",
    desc: "Prototyping UI/UX dan validasi visual.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 013.002 3.002L7.368 18.635a2 2 0 01-.855.506l-2.872.838.838-2.872a2 2 0 01.506-.855z"/>
      </svg>
    ),
  },
  {
    step: "03",
    title: "Build",
    desc: "Development iteratif dengan update berkala.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    step: "04",
    title: "Launch",
    desc: "Deploy ke production dan handover.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    ),
  },
];

export default function PartnershipsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  // Duplicate for seamless loop
  const techDouble = [...TECH_STACK, ...TECH_STACK];

  return (
    <section
      id="partnerships"
      className="partnerships-section"
      aria-label="Technology and Process"
    >
      <SectionBg variant="mascot-right" mascotSrc="/mascot-2.png" mascotOpacity={0.04} dark={true} />
      <div className="container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASING }}
          style={{ marginBottom: "3.5rem" }}
        >
          <span className="label-tag" style={{ display: "block", marginBottom: "0.75rem", color: "var(--theme-accent)" }}>
            Teknologi & Proses
          </span>
          <h2 className="partnerships-heading">
            Dibangun dengan<br />
            tools <span style={{ color: "var(--theme-accent)" }}>terbaik.</span>
          </h2>
        </motion.div>

        {/* Tech Stack Marquee */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: EASING }}
          style={{ marginBottom: "5rem" }}
        >
          <p className="tech-stack-label">
            Technology Stack kami
          </p>

          {/* Marquee container */}
          <div className="marquee-container">
            <div
              className="marquee-static"
              style={{ display: "flex", gap: "0.875rem", paddingBottom: "0.25rem", width: "100%", flexWrap: "wrap" }}
            >
              {techDouble.map((tech, i) => (
                <div key={`${tech.name}-${i}`} className="tech-pill">
                  <span className="tech-pill-dot" style={{ background: tech.color }} />
                  <span className="tech-pill-name">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Process Steps: Brief → Design → Build → Launch */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: EASING }}
          style={{ marginBottom: "3rem" }}
        >
          <h3 className="process-heading">Cara kami bekerja</h3>
          <div className="process-grid">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.step} className="process-card">
                <div className="process-step-number">{step.step}</div>
                <div className="process-icon">{step.icon}</div>
                <h4 className="process-title">{step.title}</h4>
                <p className="process-desc">{step.desc}</p>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="process-connector" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: EASING }}
          className="meta"
          style={{ textAlign: "center" }}
        >
          Technology stack di atas adalah tools yang kami gunakan secara aktif, bukan sponsor berbayar.
        </motion.p>
      </div>

      <style>{`
        .partnerships-section {
          position: relative;
          overflow: hidden;
          padding-top: 5rem;
          padding-bottom: 5rem;
        }
        .partnerships-heading {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3.25rem);
          letter-spacing: -0.01em;
          color: var(--theme-text);
          max-width: 520px;
          line-height: 1.1;
        }
        .tech-stack-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--theme-text);
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.25rem;
        }
        .marquee-container {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .marquee-static {
          display: flex;
          align-items: center;
          animation: none;
          transform: none;
          width: 100%;
        }
        .tech-pill {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1.5px solid var(--theme-border);
          border-radius: 12px;
          padding: 0.625rem 1.125rem;
          white-space: nowrap;
          transition: border-color 0.2s, background 0.2s;
          cursor: default;
        }
        .tech-pill:hover {
          border-color: var(--theme-accent);
          background: rgba(255, 255, 255, 0.08);
        }
        .tech-pill-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .tech-pill-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--theme-text);
        }

        /* Process */
        .process-heading {
          font-family: var(--font-display);
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          font-weight: 700;
          color: var(--theme-text);
          margin-bottom: 2rem;
        }
        .process-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        .process-card {
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--theme-border);
          border-radius: 16px;
          padding: 1.5rem;
          transition: border-color 0.2s, transform 0.2s;
        }
        .process-card:hover {
          border-color: var(--theme-accent);
          transform: translateY(-2px);
        }
        .process-step-number {
          font-family: var(--font-display);
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--theme-accent);
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
        }
        .process-icon {
          color: var(--theme-accent);
          margin-bottom: 0.75rem;
          opacity: 0.8;
        }
        .process-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--theme-text);
          margin-bottom: 0.35rem;
        }
        .process-desc {
          font-size: 0.88rem;
          color: var(--theme-text);
          opacity: 0.65;
          line-height: 1.5;
        }
        .process-connector {
          display: none;
        }

        @media (min-width: 640px) {
          .process-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .process-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
