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

  return (
    <div
      aria-label="IRDIVE mascot carousel"
      className="carousel-container"
      style={{
        position: "relative",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <style>{`
        .carousel-container {
          max-width: 520px;
          height: 380px;
          overflow: visible;
        }
        .carousel-anchor {
          width: 220px;
          height: 220px;
          left: -110px;
          top: -110px;
          transform-origin: center center;
        }
        .slot-0 { transform: translate(0px, 0px) scale(1); z-index: 3; opacity: 1; filter: drop-shadow(0 18px 40px rgba(33,150,243,0.25)); }
        .slot-1 { transform: translate(120px, -20px) scale(0.68); z-index: 1; opacity: 0.78; filter: drop-shadow(0 10px 20px rgba(33,150,243,0.12)); }
        .slot-2 { transform: translate(-120px, -20px) scale(0.68); z-index: 1; opacity: 0.78; filter: drop-shadow(0 10px 20px rgba(33,150,243,0.12)); }
        
        @media (min-width: 960px) {
          .carousel-container {
            max-width: 720px;
            height: 520px;
            overflow: visible;
          }
          .carousel-anchor {
            width: 320px;
            height: 320px;
            left: -160px;
            top: -160px;
          }
          .slot-0 { transform: translate(0px, 0px) scale(1); }
          .slot-1 { transform: translate(180px, -20px) scale(0.72); }
          .slot-2 { transform: translate(-180px, -20px) scale(0.72); }
        }
      `}</style>
      
      {/* Soft backdrop glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "55%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          aspectRatio: "1",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(33,150,243,0.1) 0%, transparent 70%)",
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
          return (
            <div
              key={m.src}
              className={`carousel-anchor slot-${slot}`}
              style={{
                position: "absolute",
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
              width: slotOf(i) === 0 ? 24 : 8,
              height: 8,
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
