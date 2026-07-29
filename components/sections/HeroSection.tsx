'use client';

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Space_Grotesk } from "next/font/google";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import MascotCarousel from "@/components/logo-maskot/MascotCarousel";
import SectionBg from "@/components/ui/SectionBg";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700", "500"] });
import Button from "@/components/ui/Button";
import { HERO, STATS } from "@/lib/content";

const EASING = [0.22, 1, 0.36, 1] as const;

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) { setCount(value); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1400;
          const step = () => {
            start += 16;
            const progress = Math.min(start / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, shouldReduceMotion]);

  return (
    <div ref={ref} style={{ textAlign: "left" }}>
      <div className={spaceGrotesk.className} style={{ fontSize: "2rem", fontWeight: 700, color: "var(--theme-text)", lineHeight: 1, letterSpacing: "-0.04em" }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: "clamp(0.6rem, 2vw, 0.8rem)", color: "var(--theme-text)", opacity: 0.6, marginTop: 4, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function HeroParallaxMascot({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const mascotInner = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (shouldReduceMotion) return;
    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine)", () => {
      const xTo = gsap.quickTo(mascotInner.current, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(mascotInner.current, "y", { duration: 0.6, ease: "power3.out" });

      const handleMove = (e: MouseEvent) => {
        const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
        xTo(dx * 45); 
        yTo(dy * 45);
      };
      
      window.addEventListener("mousemove", handleMove);
      return () => window.removeEventListener("mousemove", handleMove);
    });

    mm.add("(hover: none)", () => {
       const handleOrientation = (e: DeviceOrientationEvent) => {
          if(e.gamma === null || e.beta === null) return;
          const x = (e.gamma / 90) * 15; 
          const y = (e.beta / 180) * 15;
          gsap.to(mascotInner.current, { x, y, duration: 0.4, ease: "power2.out" });
       }
       window.addEventListener("deviceorientation", handleOrientation);
       return () => window.removeEventListener("deviceorientation", handleOrientation);
    });
  }, { scope: container, dependencies: [shouldReduceMotion] });

  return (
    <motion.div
      ref={container}
      initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}
    >
      <div className="hero-mascot-col">
        <div ref={mascotInner} className="mascot-inner" style={{ position: "relative", zIndex: 1 }}>
          <MascotCarousel />
        </div>
      </div>
    </motion.div>
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

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        background: "transparent",
        color: "var(--theme-text)",
        overflow: "hidden",
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
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
          <HeroParallaxMascot shouldReduceMotion={!!shouldReduceMotion} />

          {/* Text content — mobile: below mascot, desktop: left column (order 1) */}
          <div className="hero-text-col" style={{ maxWidth: 640 }}>
            {/* Label tag */}
            <motion.div {...fadeUp(0)} style={{ marginBottom: "1.5rem" }}>
              <span className="label-tag">Studio Digital</span>
            </motion.div>

            {/* Headline */}
            <h1 style={{ marginBottom: "1.5rem" }}>
              {headlineLines.map((line, i) => (
                <motion.span
                  key={i}
                  {...fadeUp(0.15 + i * 0.08)}
                  className={spaceGrotesk.className}
                  style={{ display: "block", fontSize: "clamp(1.5rem, 6vw, 5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", color: i === 1 ? "var(--theme-accent)" : "var(--theme-text)" }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              {...fadeUp(0.3)}
              style={{ fontSize: "clamp(0.85rem, 3vw, 1.125rem)", color: "var(--theme-text)", opacity: 0.8, lineHeight: 1.6, marginBottom: "2rem", maxWidth: 520 }}
            >
              {HERO.subheadline}
            </motion.p>

            {/* CTA */}
            <motion.div {...fadeUp(0.45)} style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              <Button as="a" href={HERO.ctaPrimary.href} variant="primary" size="lg" className="hero-btn">
                {HERO.ctaPrimary.label} →
              </Button>
              <Button as="a" href={HERO.ctaSecondary.href} variant="ghost" size="lg" className="hero-btn">
                {HERO.ctaSecondary.label}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              {...fadeUp(0.55)}
              style={{
                display: "flex",
                gap: "1.25rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid #E5E7EB",
                flexWrap: "wrap",
              }}
            >
              {STATS.map((stat) => (
                <StatCounter key={stat.label} {...stat} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding-top: calc(64px + 1rem);
          padding-bottom: 2rem;
        }
        .hero-grid {
          grid-template-columns: 1fr !important;
          gap: 0.5rem !important;
        }
        .hero-mascot-col {
          position: relative;
          right: auto;
          top: auto;
          pointer-events: auto;
          z-index: 1;
          display: flex;
          justify-content: center;
          order: -1; /* mobile: above text */
        }
        .hero-text-col {
          order: 1; /* mobile: below mascot */
        }
        .mascot-inner { width: 100%; }
        .hero-btn { font-size: 0.9rem !important; padding: 0.75rem 1.25rem !important; }
        
        @media (min-width: 640px) {
          .hero-btn { font-size: 1rem !important; padding: 1rem 1.75rem !important; }
        }
        @media (min-width: 960px) {
          .hero-section {
            padding-top: calc(64px + 4rem);
            padding-bottom: 5rem;
          }
          .hero-grid {
            grid-template-columns: 50% 50% !important;
            gap: 2rem !important;
            align-items: center;
          }
          /* Desktop: text LEFT (col 1), mascot RIGHT (col 2) */
          .hero-text-col {
            order: 1 !important;
          }
          .hero-mascot-col { 
            order: 2 !important;
          }
        }
      `}</style>
    </section>
  );
}
