'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type SectionBgVariant =
  | "mascot-right"
  | "mascot-left"
  | "rings-only"
  | "full";

interface SectionBgProps {
  variant?: SectionBgVariant;
  mascotSrc?: string;
  mascotOpacity?: number;
}

export default function SectionBg({
  variant = "full",
  mascotSrc = "/mascot-1.png",
  mascotOpacity = 0.04,
}: SectionBgProps) {
  const hasMascotR = ["mascot-right", "full"].includes(variant);
  const hasMascotL = ["mascot-left"].includes(variant);
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div 
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <style>{`
        @keyframes blockFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(3%, 5%) scale(1.05) rotate(5deg); }
          66% { transform: translate(-2%, 2%) scale(0.95) rotate(-3deg); }
        }
        @keyframes blockFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(-4%, -5%) scale(1.1) rotate(-5deg); }
          66% { transform: translate(2%, -3%) scale(0.9) rotate(3deg); }
        }
        @keyframes blockFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(5%, -5%) scale(1.05) rotate(-2deg); }
        }
        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.6;
          will-change: transform;
        }
        .aurora-1 {
          background: radial-gradient(circle at center, rgba(33, 150, 243, 0.15) 0%, transparent 70%);
          width: clamp(400px, 80vw, 800px);
          height: clamp(400px, 80vw, 800px);
          top: -20%;
          left: -10%;
          animation: ${!mounted || prefersReduced ? 'none' : 'blockFloat1 20s ease-in-out infinite'};
        }
        .aurora-2 {
          background: radial-gradient(circle at center, rgba(76, 175, 80, 0.1) 0%, transparent 70%);
          width: clamp(300px, 60vw, 600px);
          height: clamp(300px, 60vw, 600px);
          bottom: -15%;
          right: -10%;
          animation: ${!mounted || prefersReduced ? 'none' : 'blockFloat2 25s ease-in-out infinite reverse'};
        }
        .aurora-3 {
          background: radial-gradient(circle at center, rgba(21, 101, 192, 0.12) 0%, transparent 70%);
          width: clamp(300px, 50vw, 700px);
          height: clamp(300px, 50vw, 700px);
          top: 30%;
          left: 30%;
          animation: ${!mounted || prefersReduced ? 'none' : 'blockFloat3 18s ease-in-out infinite'};
        }
      `}</style>

      {/* ── Aurora Mesh Gradients ── */}
      <div className="aurora-blob aurora-1" />
      <div className="aurora-blob aurora-2" />
      <div className="aurora-blob aurora-3" />

      {/* ── Professional faint architectural lines (only on full) ── */}
      {variant === "full" && (
        <>
          <div style={{ position: "absolute", left: "15%", top: 0, bottom: 0, width: 1, background: "var(--theme-border)", opacity: 0.3 }} />
          <div style={{ position: "absolute", right: "15%", top: 0, bottom: 0, width: 1, background: "var(--theme-border)", opacity: 0.3 }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: "25%", height: 1, background: "var(--theme-border)", opacity: 0.15 }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: "75%", height: 1, background: "var(--theme-border)", opacity: 0.15 }} />
        </>
      )}

      {/* ── Mascot Watermark ── */}
      {hasMascotR && (
        <div
          style={{
            position: "absolute",
            right: "-2%",
            bottom: "0%",
            width: "clamp(300px, 45vw, 600px)",
            aspectRatio: "1",
            opacity: mascotOpacity,
            filter: "grayscale(20%)",
          }}
        >
          <Image
            src={mascotSrc}
            alt=""
            fill
            style={{ objectFit: "contain" }}
            loading="lazy"
          />
        </div>
      )}

      {hasMascotL && (
        <div
          style={{
            position: "absolute",
            left: "-5%",
            bottom: "5%",
            width: "clamp(250px, 35vw, 500px)",
            aspectRatio: "1",
            opacity: mascotOpacity,
            filter: "grayscale(20%)",
          }}
        >
          <Image
            src={mascotSrc}
            alt=""
            fill
            style={{ objectFit: "contain" }}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
