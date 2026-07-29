'use client';

import Image from "next/image";

export type SectionBgVariant =
  | "mascot-right" // faint mascot watermark right
  | "mascot-left"  // faint mascot watermark left
  | "rings-only"   // just subtle rings
  | "full";        // mascot right + subtle rings + professional lines

interface SectionBgProps {
  variant?: SectionBgVariant;
  /** mascot image src */
  mascotSrc?: string;
  /** opacity of mascot watermark, default 0.04 */
  mascotOpacity?: number;
}

/** Decorative modern ring */
function SubtleRing({
  size = 400,
  borderWidth = 1,
  style,
}: {
  size?: number;
  borderWidth?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        border: `${borderWidth}px solid var(--theme-border)`,
        opacity: 0.15,
        zIndex: 0,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

export default function SectionBg({
  variant = "full",
  mascotSrc = "/mascot-1.png",
  mascotOpacity = 0.04,
}: SectionBgProps) {
  const hasMascotR = ["mascot-right", "full"].includes(variant);
  const hasMascotL = ["mascot-left"].includes(variant);
  const hasRings   = ["rings-only", "full"].includes(variant);
  
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
      {/* ── Professional faint architectural lines (only on full) ── */}
      {variant === "full" && (
        <>
          <div style={{ position: "absolute", left: "10%", top: 0, bottom: 0, width: 1, background: "var(--theme-border)", opacity: 0.05 }} />
          <div style={{ position: "absolute", right: "10%", top: 0, bottom: 0, width: 1, background: "var(--theme-border)", opacity: 0.05 }} />
        </>
      )}

      {/* ── Subtle Geometric Rings ── */}
      {hasRings && (
        <>
          <SubtleRing size={500} style={{ top: "-10%", right: "-10%" }} />
          <SubtleRing size={300} style={{ bottom: "10%", left: "-5%" }} />
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
            filter: "grayscale(30%)",
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
            filter: "grayscale(30%)",
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
