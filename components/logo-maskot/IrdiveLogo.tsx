interface IrdiveLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
}

const sizeMap = {
  sm: { height: 24, textSize: "1rem" },
  md: { height: 30, textSize: "1.25rem" },
  lg: { height: 38, textSize: "1.5rem" },
};

export default function IrdiveLogo({ size = "md", variant = "dark" }: IrdiveLogoProps) {
  const { height, textSize } = sizeMap[size];
  const textColor = variant === "dark" ? "#1E2328" : "#FFFFFF";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        height,
        userSelect: "none",
      }}
      aria-label="IRDIVE"
    >
      {/* Icon mark — IR monogram with blue accent */}
      <svg
        width={height}
        height={height}
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
      >
        <rect width="36" height="36" rx="8" fill="#2196F3" />
        <text
          x="18"
          y="25"
          textAnchor="middle"
          fontSize="16"
          fontWeight="800"
          fontFamily="Outfit, system-ui, sans-serif"
          fill="white"
          letterSpacing="-0.5"
        >
          IR
        </text>
      </svg>

      {/* Wordmark */}
      <span
        style={{
          fontFamily: "var(--font-display, Outfit, system-ui, sans-serif)",
          fontSize: textSize,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: textColor,
          lineHeight: 1,
        }}
      >
        DIVE
      </span>

      {/* Green accent dot */}
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#4CAF50",
          flexShrink: 0,
          marginBottom: 2,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
