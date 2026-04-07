"use client";

import { motion } from "framer-motion";

interface GlowOrbProps {
  color?: string;
  size?: number;
  className?: string;
  delay?: number;
}

export function GlowOrb({
  color = "rgba(99, 102, 241, 0.15)",
  size = 400,
  className = "",
  delay = 0,
}: GlowOrbProps) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[100px] pointer-events-none ${className}`}
      style={{ width: size, height: size, background: color }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
        x: [0, 30, -20, 0],
        y: [0, -20, 30, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}
