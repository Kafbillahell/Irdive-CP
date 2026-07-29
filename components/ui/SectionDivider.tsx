interface SectionDividerProps {
  /** hex color of the section ABOVE the divider */
  fromColor?: string;
  /** hex color of the section BELOW the divider */
  toColor?: string;
  /** flip horizontally for visual variety */
  flip?: boolean;
}

export default function SectionDivider({
  fromColor = "#FAFAFA",
  toColor = "#FFFFFF",
  flip = false,
}: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        height: 60,
        marginTop: -1,
        background: toColor,
        transform: flip ? "scaleX(-1)" : "none",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <path
          d="M0,0 C360,60 1080,60 1440,0 L1440,0 L0,0 Z"
          fill={fromColor}
        />
      </svg>
    </div>
  );
}
