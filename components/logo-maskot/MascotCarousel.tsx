'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const MASCOTS = [
  { src: "/mascot-1.png", alt: "IRDIVE mascot — thumbs up" },
  { src: "/mascot-2.png", alt: "IRDIVE mascot — with laptop" },
  { src: "/mascot-3.png", alt: "IRDIVE mascot — jumping" },
];

export default function MascotCarousel() {
  const [front, setFront] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => setFront((p) => (p + 1) % 3), 5000);
    return () => clearInterval(id);
  }, [prefersReduced]);

  /** slot 0 = front, slot 1 = back-right, slot 2 = back-left */
  const slotOf = (i: number) => (i - front + 3) % 3;

  const SLOT: Record<number, { translateX: string; translateY: string; scale: number; opacity: number; zIndex: number }> = {
    0: { translateX: "0%",   translateY: "30px",  scale: 1,    opacity: 1,   zIndex: 3 },
    1: { translateX: "90px", translateY: "-40px", scale: 0.58, opacity: 0.72, zIndex: 1 },
    2: { translateX: "-90px",translateY: "-40px", scale: 0.58, opacity: 0.72, zIndex: 1 },
  };

  return (
    <div
      aria-label="IRDIVE mascot carousel"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 340,
        height: 310,
        margin: "0 auto",
        /* no overflow hidden! */
      }}
    >
      {/* Soft backdrop glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "55%",
          transform: "translate(-50%, -50%)",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(33,150,243,0.13) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Mascots — all positioned from center of container */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 0,
          height: 0,
        }}
      >
        {MASCOTS.map((m, i) => {
          const slot = slotOf(i);
          const { translateX, translateY, scale, opacity, zIndex } = SLOT[slot];
          return (
            <div
              key={m.src}
              style={{
                position: "absolute",
                /* anchor to top-left of the 200x200 image centered on origin */
                left: -100,
                top: -100,
                width: 200,
                height: 200,
                zIndex,
                opacity,
                transform: `translate(${translateX}, ${translateY}) scale(${scale})`,
                transition: prefersReduced
                  ? "none"
                  : "transform 0.65s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease",
                willChange: "transform, opacity",
              }}
            >
              <Image
                src={m.src}
                alt={m.alt}
                fill
                loading="eager"
                style={{ objectFit: "contain" }}
              />
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 6,
          zIndex: 10,
        }}
      >
        {MASCOTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setFront(i)}
            aria-label={`Mascot ${i + 1}`}
            style={{
              width: slotOf(i) === 0 ? 20 : 7,
              height: 7,
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
              background: slotOf(i) === 0 ? "#2196F3" : "#B0BEC5",
              transition: "width 0.35s ease, background 0.35s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
