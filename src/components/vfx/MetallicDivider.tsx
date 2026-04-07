"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MetallicDividerProps {
  className?: string;
}

export function MetallicDivider({ className }: MetallicDividerProps) {
  return (
    <motion.div
      className={cn("metallic-divider mx-auto max-w-7xl", className)}
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}
