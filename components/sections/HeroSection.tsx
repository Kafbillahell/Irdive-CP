'use client';

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Space_Grotesk } from "next/font/google";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import IrdiveMaskot from "@/components/logo-maskot/IrdiveMaskot";

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
      <div style={{ fontSize: "0.8rem", color: "var(--theme-text)", opacity: 0.6, marginTop: 4, fontWeight: 500 }}>{label}</div>
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
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--theme-border) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />
      <div ref={mascotInner} style={{ position: "relative", zIndex: 1 }}>
        <IrdiveMaskot size="xl" preload />
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
      id="home"
      style={{
        background: "transparent",
        color: "var(--theme-text)",
        paddingTop: "calc(64px + 5rem)",
        paddingBottom: "4rem",
        overflow: "hidden",
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Decorative dots — asymmetric, bottom-left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "8%",
          left: "3%",
          display: "grid",
          gridTemplateColumns: "repeat(6, 10px)",
          gap: 10,
          opacity: 0.35,
          zIndex: 0,
        }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: i % 5 === 0 ? "#4CAF50" : "#2196F3",
              display: "block",
            }}
          />
        ))}
      </div>

      {/* Top-right decorative ring */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "15%",
          right: "-60px",
          width: 320,
          height: 320,
          borderRadius: "50%",
          border: "40px solid #E3F2FD",
          zIndex: 0,
          opacity: 0.6,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left: Text content */}
          <div style={{ maxWidth: 640 }}>
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
                  style={{ display: "block", fontSize: "clamp(2.75rem, 6vw, 5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", color: i === 1 ? "var(--theme-accent)" : "var(--theme-text)" }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              {...fadeUp(0.3)}
              style={{ fontSize: "1.125rem", color: "var(--theme-text)", opacity: 0.8, lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 520 }}
            >
              {HERO.subheadline}
            </motion.p>

            {/* CTA */}
            <motion.div {...fadeUp(0.45)} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              <Button as="a" href={HERO.ctaPrimary.href} variant="primary" size="lg">
                {HERO.ctaPrimary.label} →
              </Button>
              <Button as="a" href={HERO.ctaSecondary.href} variant="ghost" size="lg">
                {HERO.ctaSecondary.label}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              {...fadeUp(0.55)}
              style={{
                display: "flex",
                gap: "2.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid #E5E7EB",
                flexWrap: "wrap",
              }}
            >
              {STATS.map((stat) => (
                <StatCounter key={stat.label} {...stat} />
              ))}
            </motion.div>
          </div>

          <HeroParallaxMascot shouldReduceMotion={!!shouldReduceMotion} />
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .hero-grid {
            grid-template-columns: 55% 45% !important;
          }
        }
      `}</style>
    </section>
  );
}
