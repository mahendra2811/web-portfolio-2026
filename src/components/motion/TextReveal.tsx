"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
}

export function TextReveal({ text, as: Tag = "h2", className, delay = 0 }: TextRevealProps) {
  const words = text.split(" ");

  return (
    <Tag className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.08,
            ease: [0.4, 0, 0.2, 1],
          }}
          viewport={{ once: true }}
          className="mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
