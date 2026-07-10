"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

// Keep in sync with the blocking pre-paint script in src/app/layout.tsx,
// which reads this same key to set the `data-loader` attribute before hydration.
const STORAGE_KEY = "mp-loader-shown-v1";
const PARTICLE_COUNT = 16;
const COLORS = ["#3B82F6", "#8B5CF6", "#F8FAFC"];

type Phase = "idle" | "particles" | "connect" | "architecture" | "monogram" | "reveal" | "fadeout" | "done";

// hub-and-spoke node layout for the "architecture flow" stage
const NODES = [
  { x: 0, y: -70 },
  { x: 60, y: -35 },
  { x: 60, y: 35 },
  { x: 0, y: 70 },
  { x: -60, y: 35 },
  { x: -60, y: -35 },
  { x: 0, y: 0 },
];
const EDGES: [number, number][] = [
  [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
];

type Particle = { id: number; x: number; y: number; delay: number; color: string; size: number };

// Generates the scattered starting positions for the intro particles.
// Called only from inside an effect (never during render) to stay pure.
function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.4;
    const distance = 140 + Math.random() * 120;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      delay: Math.random() * 0.3,
      color: COLORS[i % COLORS.length],
      size: 4 + Math.random() * 4,
    };
  });
}

export function PortfolioLoader() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduced);
    setParticles(generateParticles());

    const finish = () => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      document.documentElement.removeAttribute("data-loader");
      setPhase("done");
    };

    const timers = reduced
      ? [
          setTimeout(() => setPhase("monogram"), 0),
          setTimeout(() => setPhase("reveal"), 300),
          setTimeout(() => setPhase("fadeout"), 900),
          setTimeout(finish, 1500),
        ]
      : [
          setTimeout(() => setPhase("particles"), 0),
          setTimeout(() => setPhase("connect"), 600),
          setTimeout(() => setPhase("architecture"), 1200),
          setTimeout(() => setPhase("monogram"), 1800),
          setTimeout(() => setPhase("reveal"), 2300),
          setTimeout(() => setPhase("fadeout"), 2800),
          setTimeout(finish, 3300),
        ];

    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === "idle" || phase === "done") return null;

  const showParticles = phase === "particles" || phase === "connect";
  const showArchitecture = phase === "connect" || phase === "architecture";
  const showMonogram = phase === "monogram" || phase === "reveal" || phase === "fadeout";
  const showText = phase === "reveal" || phase === "fadeout";

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#080B10]"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "fadeout" ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <motion.div
          className="absolute h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.28), transparent 70%)" }}
          animate={
            reducedMotion
              ? { opacity: 0.6 }
              : { scale: [0.8, 1.15, 0.8], opacity: [0.5, 0.9, 0.5] }
          }
          transition={{ duration: 3, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
        />

        <AnimatePresence>
          {showParticles && (
            <motion.div className="absolute" exit={{ opacity: 0, transition: { duration: 0.3 } }}>
              {particles.map((p) => (
                <motion.span
                  key={p.id}
                  className="absolute top-0 left-0 rounded-full"
                  style={{ width: p.size, height: p.size, background: p.color }}
                  initial={{ x: p.x, y: p.y, opacity: 0, scale: 0.5 }}
                  animate={{
                    x: phase === "connect" ? 0 : p.x,
                    y: phase === "connect" ? 0 : p.y,
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{ duration: phase === "connect" ? 0.75 : 0.5, delay: p.delay, ease: "easeInOut" }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showArchitecture && (
            <motion.svg
              key="graph"
              width="220"
              height="220"
              viewBox="-110 -110 220 220"
              className="absolute overflow-visible"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.35 } }}
              transition={{ duration: 0.5 }}
            >
              <defs>
                <linearGradient id="loader-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              {EDGES.map(([a, b], i) => (
                <motion.line
                  key={i}
                  x1={NODES[a].x}
                  y1={NODES[a].y}
                  x2={NODES[b].x}
                  y2={NODES[b].y}
                  stroke="url(#loader-gradient)"
                  strokeWidth={1.5}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 0.6, delay: i * 0.04 }}
                />
              ))}
              {NODES.map((n, i) => (
                <motion.circle
                  key={i}
                  cx={n.x}
                  cy={n.y}
                  r={i === 6 ? 5 : 3.5}
                  fill={i % 2 === 0 ? "#3B82F6" : "#8B5CF6"}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.3, 1] }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                />
              ))}
            </motion.svg>
          )}
        </AnimatePresence>

        <div className="relative z-10 flex flex-col items-center">
          <AnimatePresence>
            {showMonogram && (
              <motion.div
                key="mark"
                initial={{ opacity: 0, scale: 0.6, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Image
                  src="/brand/logo-navbar.png"
                  alt="Mahendra Singh Puniya monogram"
                  width={220}
                  height={190}
                  priority
                  className="h-16 w-auto drop-shadow-[0_0_24px_rgba(59,130,246,0.5)] sm:h-20"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showText && (
              <motion.div
                key="text"
                className="mt-5 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <span className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#F8FAFC] sm:text-2xl">
                  Mahendra Singh Puniya
                </span>
                <span className="mt-1 font-mono text-xs tracking-[0.3em] text-[#3B82F6] uppercase">
                  Software Engineer
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
