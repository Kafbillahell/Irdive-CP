'use client';

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface IrdiveMaskotProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  /** Use for hero/above-fold mascot — skips lazy loading */
  preload?: boolean;
  /** Disable float animation (e.g. when used in a layout context with own animation) */
  noFloat?: boolean;
}

const sizeMap = {
  sm: 96,
  md: 160,
  lg: 240,
  xl: 360,
};

export default function IrdiveMaskot({
  size = "md",
  className = "",
  preload = false,
  noFloat = false,
}: IrdiveMaskotProps) {
  const shouldReduceMotion = useReducedMotion();
  const px = sizeMap[size];

  const floatVariants: Variants = {
    idle: {
      y: [0, -12, 0],
      transition: {
        duration: 3,
        ease: "easeInOut" as const,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
    still: {
      y: 0,
    },
  };

  return (
    <motion.div
      className={className}
      variants={floatVariants}
      animate={shouldReduceMotion || noFloat ? "still" : "idle"}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      <Image
        src="/mascot.png"
        alt="IRDIVE mascot — a friendly white robot with blue accents"
        width={px}
        height={px}
        loading={preload ? "eager" : "lazy"}
        style={{
          objectFit: "contain",
          filter: "drop-shadow(0 8px 24px rgba(33, 150, 243, 0.18))",
        }}
      />
    </motion.div>
  );
}
