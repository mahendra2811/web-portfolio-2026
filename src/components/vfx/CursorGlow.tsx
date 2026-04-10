"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (window.innerWidth < 1024 || !isHome) return;

    const handleMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (!isHome) return null;

  return <div ref={glowRef} className="cursor-glow hidden lg:block" />;
}
