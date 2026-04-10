"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function DynamicCursor() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  const scale = useMotionValue(1);

  useEffect(() => {
    if (!isDesktop || !isHome) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        scale.set(1.8);
      }
    };

    const handleMouseOut = () => {
      scale.set(1);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isDesktop, isHome, cursorX, cursorY, scale]);

  if (!isDesktop || !isHome) return null;

  return (
    <motion.div
      className="border-primary-400/50 pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full border-2 mix-blend-difference"
      style={{ x, y, scale }}
    />
  );
}
