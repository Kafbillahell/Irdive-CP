'use client';

import Image from "next/image";

export type SectionBgVariant =
  | "dots-tl"      // dot grid top-left
  | "dots-br"      // dot grid bottom-right
  | "dots-tr"      // dot grid top-right
  | "ring-right"   // decorative ring right edge
  | "ring-left"    // decorative ring left edge
  | "mascot-right" // faint mascot watermark right
  | "mascot-left"  // faint mascot watermark left
  | "full";        // all decorations combined

interface SectionBgProps {
  variant?: SectionBgVariant;
  /** mascot image src — defaults to mascot-1.png */
  mascotSrc?: string;
  /** opacity of mascot watermark, default 0.05 */
  mascotOpacity?: number;
  /** primary dot color */
  dotColor?: string;
  /** accent dot color */
  dotAccent?: string;
}

/** Dot grid helper */
function DotGrid({
  rows = 5,
  cols = 6,
  color = "#2196F3",
  accent = "#4CAF50",
  style,
}: {
  rows?: number;
  cols?: number;
  color?: string;
  accent?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 10px)`,
        gap: 10,
        opacity: 0.3,
        zIndex: 0,
        pointerEvents: "none",
        ...style,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span
          key={i}
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: i % (cols + 1) === 0 ? accent : color,
            display: "block",
          }}
        />
      ))}
    </div>
  );
}

/** Decorative ring */
function Ring({
  size = 280,
  borderWidth = 30,
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
        border: `${borderWidth}px solid var(--blue-light, #E3F2FD)`,
        opacity: 0.5,
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
  mascotOpacity = 0.055,
  dotColor = "#2196F3",
  dotAccent = "#4CAF50",
}: SectionBgProps) {
  const hasDotsTL  = ["dots-tl", "full"].includes(variant);
  const hasDotsBR  = ["dots-br", "full"].includes(variant);
  const hasDotsTR  = ["dots-tr", "full"].includes(variant);
  const hasRingR   = ["ring-right", "full"].includes(variant);
  const hasRingL   = ["ring-left", "full"].includes(variant);
  const hasMascotR = ["mascot-right", "full"].includes(variant);
  const hasMascotL = ["mascot-left"].includes(variant);

  return (
    <>
      {/* ── Dot grids ── */}
      {hasDotsTL && (
        <DotGrid
          rows={4} cols={5}
          color={dotColor} accent={dotAccent}
          style={{ top: "8%", left: "2%" }}
        />
      )}
      {hasDotsBR && (
        <DotGrid
          rows={4} cols={5}
          color={dotColor} accent={dotAccent}
          style={{ bottom: "8%", right: "2%" }}
        />
      )}
      {hasDotsTR && (
        <DotGrid
          rows={3} cols={4}
          color={dotColor} accent={dotAccent}
          style={{ top: "5%", right: "5%" }}
        />
      )}

      {/* ── Decorative rings ── */}
      {hasRingR && (
        <Ring
          size={340}
          borderWidth={36}
          style={{ top: "10%", right: "-80px" }}
        />
      )}
      {hasRingL && (
        <Ring
          size={260}
          borderWidth={28}
          style={{ bottom: "10%", left: "-70px" }}
        />
      )}

      {/* ── Mascot watermark ── */}
      {hasMascotR && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-2%",
            bottom: "-4%",
            width: "clamp(200px, 28vw, 420px)",
            aspectRatio: "1",
            opacity: mascotOpacity,
            zIndex: 0,
            pointerEvents: "none",
            filter: "grayscale(20%) blur(1px)",
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
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-2%",
            bottom: "-4%",
            width: "clamp(180px, 24vw, 380px)",
            aspectRatio: "1",
            opacity: mascotOpacity,
            zIndex: 0,
            pointerEvents: "none",
            filter: "grayscale(20%) blur(1px)",
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

      {/* ── Corner accent squares (geometric detail) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "15%",
          left: "1.5%",
          width: 6,
          height: 6,
          background: dotAccent,
          borderRadius: 1,
          opacity: 0.4,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "20%",
          right: "3%",
          width: 8,
          height: 8,
          background: dotColor,
          borderRadius: 1,
          opacity: 0.35,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
