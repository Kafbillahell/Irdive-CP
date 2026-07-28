'use client';

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import IrdiveMaskot from "@/components/logo-maskot/IrdiveMaskot";
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
      <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "#1E2328", lineHeight: 1, letterSpacing: "-0.04em" }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: "0.8rem", color: "#6B7280", marginTop: 4, fontWeight: 500 }}>{label}</div>
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

  return (
    <section
      id="home"
      style={{
        background: "var(--off-white)",
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
                  className="display-1"
                  style={{ display: "block", color: i === 1 ? "#2196F3" : "#1E2328" }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              {...fadeUp(0.3)}
              style={{ fontSize: "1.125rem", color: "#4B5563", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 520 }}
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

          {/* Right: Mascot */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0, ease: EASING }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Glow behind mascot */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                width: 280,
                height: 280,
                borderRadius: "50%",
                background: "radial-gradient(circle, #E3F2FD 0%, transparent 70%)",
                zIndex: 0,
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <IrdiveMaskot size="xl" preload />
            </div>
          </motion.div>
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
