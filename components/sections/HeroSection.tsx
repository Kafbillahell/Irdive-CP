'use client';

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SectionBg from "@/components/ui/SectionBg";
import { HERO } from "@/lib/content";

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
          </div>

          {/* Mascot */}
          <div className="hero-mascot-col" aria-hidden="true">
            <div className="mascot-inner">
              <div className="hero-mascot-asset">
                <Image
                  src="/mascot-2.png"
                  alt="IRDIVE mascot with laptop"
                  fill
                  priority
                  style={{ objectFit: "contain" }}
                />
              </div>
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
          margin-bottom: 0;
          max-width: 540px;
        }
        .hero-mascot-col {
          display: none;
          pointer-events: none;
        }
        .mascot-inner {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero-mascot-asset {
          position: relative;
          width: min(100%, 500px);
          aspect-ratio: 1;
          filter: drop-shadow(0 25px 40px rgba(33, 150, 243, 0.18));
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
          .hero-mascot-asset {
            width: min(100%, 600px);
          }
          .hero-headline-line {
            font-size: clamp(2.5rem, 5vw, 4.5rem);
            line-height: 1.08;
          }
          .hero-subheadline {
            font-size: clamp(1rem, 1.5vw, 1.25rem);
          }
        }
      `}</style>
    </section>
  );
}
