import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "minimal";
  size?: "sm" | "md" | "lg";
  as?: "button" | "a";
  href?: string;
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary: [
    "bg-[#2196F3] text-white border border-[#2196F3]",
    "hover:bg-[#1565C0] hover:border-[#1565C0]",
    "shadow-[0_2px_8px_rgba(33,150,243,0.28)]",
    "hover:shadow-[0_6px_20px_rgba(33,150,243,0.35)]",
    "hover:-translate-y-0.5",
  ].join(" "),
  ghost: [
    "bg-transparent text-[#1E2328] border border-[#E5E7EB]",
    "hover:border-[#2196F3] hover:text-[#2196F3]",
    "hover:-translate-y-0.5",
    "hover:shadow-[0_4px_12px_rgba(33,150,243,0.12)]",
  ].join(" "),
  minimal: [
    "bg-transparent text-[#2196F3] border border-transparent px-0",
    "hover:text-[#1565C0] underline-offset-4",
    "hover:underline",
  ].join(" "),
};

const sizeStyles: Record<string, string> = {
  sm: "px-4 py-2 text-sm rounded-[8px]",
  md: "px-6 py-3 text-base rounded-[12px]",
  lg: "px-8 py-4 text-lg rounded-[14px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  as,
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base = [
    "inline-flex items-center justify-center gap-2",
    "font-semibold transition-all duration-200",
    "cursor-pointer select-none",
    "focus-visible:outline-2 focus-visible:outline-[#2196F3] focus-visible:outline-offset-2",
    variantStyles[variant],
    sizeStyles[size],
    className,
  ].join(" ");

  if (as === "a" || href) {
    return (
      <a href={href} className={base} role="button">
        {children}
      </a>
    );
  }

  return (
    <button className={base} {...props}>
      {children}
    </button>
  );
}
