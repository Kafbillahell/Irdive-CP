'use client';

import Image from "next/image";

export type SectionBgVariant = "mascot-right" | "mascot-left" | "rings-only" | "full";

interface SectionBgProps {
  variant?: SectionBgVariant;
  mascotSrc?: string;
  mascotOpacity?: number;
  /** true = dark section, false/omitted = light section */
  dark?: boolean;
}

/**
 * SectionBg — minimal, professional background motif.
 * Dark mode: one soft, single-colour radial glow (blue-white) — no grid, no colour bursts.
 * Light mode: one barely-visible blue-tinted vignette — no dots, no lines.
 * The background colour of each section always wins; this just adds depth.
 */
export default function SectionBg({
  variant = "full",
  mascotSrc = "/mascot-1.png",
  mascotOpacity = 0.05,
  dark = false,
}: SectionBgProps) {
  const hasMascotR = ["mascot-right", "full"].includes(variant);
  const hasMascotL = ["mascot-left"].includes(variant);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {dark ? (
        /**
         * Dark sections: one single large soft radial "aurora" in the page's
         * own blue (#2196F3 / var(--blue)) — very low opacity so it just
         * adds depth without changing the colour identity of the section.
         */
        <>
          {/* Primary glow — top-left quadrant */}
          <div style={{
            position: "absolute",
            top: "-30%", left: "-20%",
            width: "80vw", height: "80vw",
            maxWidth: 900, maxHeight: 900,
            borderRadius: "50%",
            background: "radial-gradient(circle at 50% 50%, rgba(33,150,243,0.12) 0%, transparent 65%)",
            filter: "blur(60px)",
          }} />

          {/* Secondary glow — bottom-right, same hue but dimmer */}
          <div style={{
            position: "absolute",
            bottom: "-20%", right: "-15%",
            width: "60vw", height: "60vw",
            maxWidth: 700, maxHeight: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle at 50% 50%, rgba(33,150,243,0.08) 0%, transparent 65%)",
            filter: "blur(80px)",
          }} />
        </>
      ) : (
        /**
         * Light sections: one very soft blue vignette on the right side
         * and an equally soft one on the bottom left.
         * No lines, no dots, no diagonals — just air.
         */
        <>
          {/* Top-right soft glow */}
          <div style={{
            position: "absolute",
            top: "-25%", right: "-15%",
            width: "70vw", height: "70vw",
            maxWidth: 780, maxHeight: 780,
            borderRadius: "50%",
            background: "radial-gradient(circle at 50% 50%, rgba(33,150,243,0.07) 0%, transparent 68%)",
            filter: "blur(50px)",
          }} />

          {/* Bottom-left soft glow */}
          <div style={{
            position: "absolute",
            bottom: "-20%", left: "-10%",
            width: "55vw", height: "55vw",
            maxWidth: 620, maxHeight: 620,
            borderRadius: "50%",
            background: "radial-gradient(circle at 50% 50%, rgba(33,150,243,0.05) 0%, transparent 68%)",
            filter: "blur(60px)",
          }} />
        </>
      )}

      {/* Mascot watermark — always visible but very subtle */}
      {hasMascotR && (
        <div style={{
          position: "absolute",
          right: "-3%", bottom: "0%",
          width: "clamp(220px, 38vw, 500px)",
          aspectRatio: "1",
          opacity: dark ? mascotOpacity * 1.4 : mascotOpacity,
          filter: dark ? "brightness(0.4) grayscale(60%)" : "grayscale(40%) brightness(0.95)",
        }}>
          <Image src={mascotSrc} alt="" fill style={{ objectFit: "contain" }} loading="lazy" />
        </div>
      )}
      {hasMascotL && (
        <div style={{
          position: "absolute",
          left: "-3%", bottom: "2%",
          width: "clamp(180px, 30vw, 440px)",
          aspectRatio: "1",
          opacity: dark ? mascotOpacity * 1.4 : mascotOpacity,
          filter: dark ? "brightness(0.4) grayscale(60%)" : "grayscale(40%) brightness(0.95)",
        }}>
          <Image src={mascotSrc} alt="" fill style={{ objectFit: "contain" }} loading="lazy" />
        </div>
      )}
    </div>
  );
}
