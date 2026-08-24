'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import MascotCarousel from "@/components/logo-maskot/MascotCarousel";
import SectionBg from "@/components/ui/SectionBg";
import { HERO, STATS } from "@/lib/content";

const EASING = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-40px" });

  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: EASING },
  });

  const headlineLines = HERO.headline.split("\n");
  const subheadlineParts = HERO.subheadline.split(/(IRDIVE)/g);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section"
      aria-label="Hero"
    >
      <SectionBg variant="full" mascotSrc="/mascot-2.png" mascotOpacity={0.05} />

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Text content */}
          <div className="hero-text-col">
            {/* Label tag */}
            <motion.div {...fadeUp(0)}>
              <span className="label-tag" style={{ color: "var(--theme-accent)", display: "block", marginBottom: "1.5rem" }}>
                Studio Digital
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="hero-headline">
              {headlineLines.map((line, i) => (
                <motion.span
                  key={i}
                  {...fadeUp(0.12 + i * 0.08)}
                  className="hero-headline-line"
                  style={{
                    color: i === 1 ? "var(--theme-accent)" : "var(--theme-text)",
                  }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            {/* Supporting copy */}
            <motion.p {...fadeUp(0.28)} className="hero-subheadline">
              {subheadlineParts.map((part, index) =>
                part === "IRDIVE" ? (
                  <strong key={index} style={{ fontWeight: 700, color: "inherit" }}>
                    {part}
                  </strong>
                ) : (
                  <span key={index}>{part}</span>
                )
              )}
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.38)} className="hero-cta-row">
              <a href={HERO.ctaPrimary.href} className="hero-btn-primary">
                {HERO.ctaPrimary.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </a>
              <a href={HERO.ctaSecondary.href} className="hero-btn-ghost">
                {HERO.ctaSecondary.label}
              </a>
            </motion.div>

            {/* Divider */}
            <motion.div {...fadeUp(0.46)} className="hero-divider" />

            {/* Stats */}
            <motion.div {...fadeUp(0.5)} className="hero-stats">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="hero-stat-item">
                  {i > 0 && <div className="hero-stat-separator" aria-hidden="true" />}
                  <div className="hero-stat-content">
                    <span className="hero-stat-value">
                      {stat.value}{stat.suffix}
                    </span>
                    <span className="hero-stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mascot */}
          <div className="hero-mascot-col" aria-hidden="true">
            <div className="mascot-inner">
              <MascotCarousel />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          overflow: visible;
          min-height: auto;
          padding-top: 5rem;
          padding-bottom: 2rem;
        }
        .hero-container {
          position: relative;
          z-index: 1;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
        }
        .hero-text-col {
          order: 1;
          max-width: 100%;
        }
        .hero-headline {
          margin-bottom: 1.5rem;
        }
        .hero-headline-line {
          display: block;
          font-family: var(--font-display);
          font-size: clamp(2.25rem, 10vw, 3.5rem);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.03em;
        }
        .hero-subheadline {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 3.5vw, 1.2rem);
          color: var(--theme-text);
          opacity: 0.8;
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 540px;
        }
        .hero-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 0;
        }
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #2196F3, #1976D2);
          color: white;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.85rem 1.75rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(33, 150, 243, 0.3);
          transition: transform 0.2s var(--ease-out-spring), box-shadow 0.2s;
        }
        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(33, 150, 243, 0.4);
        }
        .hero-btn-ghost {
          display: inline-flex;
          align-items: center;
          background: transparent;
          color: var(--theme-text);
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.85rem 1.75rem;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--theme-border);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .hero-btn-ghost:hover {
          border-color: var(--theme-accent);
          color: var(--theme-accent);
          transform: translateY(-2px);
        }
        .hero-divider {
          height: 1px;
          background: var(--theme-border);
          margin: 2.5rem 0;
          max-width: 540px;
        }
        .hero-stats {
          display: flex;
          gap: 0;
          flex-wrap: wrap;
        }
        .hero-stat-item {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .hero-stat-separator {
          width: 1px;
          height: 40px;
          background: var(--theme-border);
          margin: 0 1.25rem;
          flex-shrink: 0;
        }
        .hero-stat-content {
          display: flex;
          flex-direction: column;
        }
        .hero-stat-value {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.75rem, 5vw, 2.5rem);
          letter-spacing: -0.03em;
          line-height: 1;
          color: var(--theme-text);
        }
        .hero-stat-label {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--theme-text);
          opacity: 0.6;
          margin-top: 0.25rem;
        }
        .hero-mascot-col {
          display: none;
          pointer-events: none;
        }
        .mascot-inner {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        @media (min-width: 960px) {
          .hero-section {
            padding-top: calc(72px + 2rem);
            padding-bottom: 3rem;
          }
          .hero-grid {
            grid-template-columns: 55% 45%;
            gap: 2rem;
          }
          .hero-text-col {
            max-width: 640px;
            order: 1;
          }
          .hero-mascot-col {
            display: flex;
            order: 2;
          }
          .hero-headline-line {
            font-size: clamp(2.5rem, 5vw, 4.5rem);
            line-height: 1.08;
          }
          .hero-subheadline {
            font-size: clamp(1rem, 1.5vw, 1.25rem);
          }
          .hero-stat-separator {
            margin: 0 2rem;
          }
        }
      `}</style>
    </section>
  );
}
