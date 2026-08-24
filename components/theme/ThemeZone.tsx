"use client";

interface ThemeZoneProps {
  children: React.ReactNode;
  bg?: string;
  text?: string;
  accent?: string;
  border?: string;
  id?: string;
  className?: string;
}

export default function ThemeZone({
  children,
  bg,
  text,
  accent,
  border,
  id,
  className,
}: ThemeZoneProps) {
  return (
    <div
      id={id}
      className={className}
      style={{
        position: "relative",
        "--theme-bg": bg ?? "#FAFAFA",
        "--theme-text": text ?? "#0B0F19",
        "--theme-accent": accent ?? "#254EDB",
        "--theme-border": border ?? "#E5E7EB",
        backgroundColor: bg ?? "transparent",
        color: text ?? "inherit",
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
