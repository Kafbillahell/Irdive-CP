'use client';

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import MascotCarousel from "@/components/logo-maskot/MascotCarousel";
import SectionBg from "@/components/ui/SectionBg";
import { HERO } from "@/lib/content";

const EASING = [0.22, 1, 0.36, 1] as const;

function HeroParallaxMascot() {
  return (
    <div
      className="hero-mascot-col"
      style={{ position: "relative", pointerEvents: "none" }}
    >
      <div
        className="mascot-inner"
        style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", justifyContent: "center", pointerEvents: "none" }}
      >
        <MascotCarousel />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASING },
  });

  const headlineLines = HERO.headline.split("\n");
  const subheadlineParts = HERO.subheadline.split(/(IRDIVE)/g);

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        background: "transparent",
        color: "var(--theme-text)",
        overflow: "visible",
        position: "relative",
        minHeight: "auto",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <SectionBg variant="full" mascotSrc="/mascot-2.png" mascotOpacity={0.05} />

      <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.5rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Mascot — mobile: top (order -1), desktop: right (order 2) */}
          <HeroParallaxMascot />

          {/* Text content — mobile: below mascot, desktop: left column (order 1) */}
          <div className="hero-text-col" style={{ maxWidth: 640 }}>
            {/* Label tag */}
            <motion.div {...fadeUp(0)} style={{ marginBottom: "2.5rem" }}>
              <span className="label-tag">Studio Digital</span>
            </motion.div>

            {/* Headline */}
            <h1 style={{ marginBottom: "1.5rem" }}>
              {headlineLines.map((line, i) => (
                <motion.span
                  key={i}
                  {...fadeUp(0.15 + i * 0.08)}
                  style={{ fontFamily: "var(--font-display)", display: "block", fontSize: "clamp(2rem, 7vw, 6rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", color: i === 1 ? "var(--theme-accent)" : "var(--theme-text)" }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              {...fadeUp(0.3)}
              style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.9rem, 1.8vw, 1.35rem)", color: "var(--theme-text)", opacity: 0.85, lineHeight: 1.65, marginBottom: "2.5rem", maxWidth: 580 }}
            >
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

          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding-top: 3.2rem;
          padding-bottom: 1.2rem;
        }
        .hero-grid {
          grid-template-columns: 1fr !important;
          gap: 0.3rem !important;
        }
        .hero-mascot-col {
          display: none;
        }
        .hero-text-col {
          order: 1;
          max-width: 100% !important;
          width: 100%;
          margin-top: 0;
        }
        .hero-text-col h1 {
          margin-top: 0.25rem !important;
          margin-bottom: 2rem !important;
        }
        .hero-text-col h1 span {
          font-size: clamp(2.5rem, 13vw, 4.05rem) !important;
          line-height: 1.3 !important;
        }
        .hero-text-col p {
          font-size: clamp(0.9rem, 4vw, 1.15rem) !important;
          margin-bottom: 1.5rem !important;
        }
        .mascot-inner { width: 100%; }
        .hero-text-col .label-tag {
          display: block !important;
          font-size: 0.8rem !important;
          letter-spacing: 0.08em !important;
          font-weight: 700 !important;
          color: var(--theme-accent) !important;
        }
        .hero-btn { font-size: 0.9rem !important; padding: 0.75rem 1.25rem !important; }
        
        @media (min-width: 640px) {
          .hero-btn { font-size: 1rem !important; padding: 1rem 1.75rem !important; }
        }
        @media (min-width: 960px) {
          .hero-section {
            padding-top: calc(64px + 1rem);
            padding-bottom: 1rem;
          }
          .hero-grid {
            grid-template-columns: 50% 50% !important;
            gap: 2rem !important;
            align-items: center;
          }
          .hero-mascot-col {
            display: flex !important;
            order: 2 !important;
            transform: translateY(-1.5rem) !important;
          }
          .hero-text-col {
            order: 1 !important;
            max-width: 640px !important;
            margin-top: 0 !important;
          }
          .hero-text-col h1 span {
            font-size: clamp(2rem, 7vw, 6rem) !important;
            line-height: 1.28 !important;
          }
          .hero-text-col p {
            font-size: clamp(0.9rem, 1.8vw, 1.35rem) !important;
            margin-bottom: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
