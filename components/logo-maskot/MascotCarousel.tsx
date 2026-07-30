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
    const id = setInterval(() => setFront((p) => (p + 1) % 3), 3000);
    return () => clearInterval(id);
  }, [prefersReduced]);

  /** slot 0 = front, slot 1 = back-right, slot 2 = back-left */
  const slotOf = (i: number) => (i - front + 3) % 3;

  return (
    <div
      aria-hidden="true"
      className="carousel-container carousel-scene"
      style={{
        position: "relative",
        width: "100%",
        margin: "0 auto",
        userSelect: "none",
        pointerEvents: "none",
        touchAction: "none",
      }}
    >
      <style>{`
        .carousel-scene {
          transform-style: preserve-3d;
          perspective: 1200px;
          perspective-origin: center;
        }
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
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .carousel-asset {
          width: 100%;
          height: 100%;
          position: relative;
          transform: translateZ(0);
          will-change: transform;
        }
        .slot-0 {
          transform: translate3d(0px, 0px, 0px) rotateY(0deg) scale(1);
          z-index: 3;
          opacity: 1;
          filter: drop-shadow(0 18px 40px rgba(33,150,243,0.25));
        }
        .slot-0 .carousel-asset {
          animation: breathe-front 4.2s ease-in-out infinite;
        }
        .slot-1 { transform: translate3d(130px, -25px, -140px) rotateY(-26deg) scale(0.68); z-index: 1; opacity: 0.78; filter: drop-shadow(0 10px 20px rgba(33,150,243,0.12)); }
        .slot-2 { transform: translate3d(-130px, -25px, -140px) rotateY(26deg) scale(0.68); z-index: 1; opacity: 0.78; filter: drop-shadow(0 10px 20px rgba(33,150,243,0.12)); }
        
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
          .slot-0 {
            transform: translate3d(0px, 0px, 0px) rotateY(0deg) scale(1);
          }
          .slot-1 { transform: translate3d(200px, -28px, -170px) rotateY(-24deg) scale(0.72); }
          .slot-2 { transform: translate3d(-200px, -28px, -170px) rotateY(24deg) scale(0.72); }
        }

        @keyframes breathe-front {
          0%, 100% {
            transform: scale(1) translate3d(0, 0, 0);
          }
          50% {
            transform: scale(1.01) translate3d(0, -2px, 0);
          }
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
                  : "transform 0.8s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease",
                willChange: "transform, opacity",
              }}
            >
              <div className="carousel-asset">
                  <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  loading="eager"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
