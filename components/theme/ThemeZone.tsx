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

export default function ThemeZone({ children, id, className }: ThemeZoneProps) {
  // Per-section theme switching removed to improve performance.
  // The app uses the global light theme from `app/globals.css`.
  return (
    <div id={id} className={className} style={{ position: "relative" }}>
      {children}
    </div>
  );
}
