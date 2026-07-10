"use client";

import { useRef, useEffect } from "react";
import { techIconMap } from "@/lib/tech-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

/* ─── types ─── */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  spriteIdx: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  strength: number;
  born: number;
}

interface SpriteEntry {
  canvas: HTMLCanvasElement | OffscreenCanvas;
  color: string;
}

/* ─── constants ─── */

const SPRITE_SIZE = 64;
const WAVEFRONT_WIDTH = 40;
const RIPPLE_SPEED = 4;
const RIPPLE_MAX_RADIUS = 700;
const RIPPLE_FORCE = 0.3;
const RIPPLE_SPAWN_DIST = 50;
const MAX_RIPPLES = 15;
const DAMPING = 0.992;
const BASE_DRIFT = 0.3;

function repeat(t: string, n: number): string[] {
  return Array.from({ length: n }, () => t);
}

const FLOAT_TECHS = [
  ...repeat("React.js", 10),
  ...repeat("Next.js", 8),
  ...repeat("TypeScript", 9),
  ...repeat("JavaScript (ES6+)", 8),
  ...repeat("Tailwind CSS", 7),
  ...repeat("HTML5/CSS3", 7),
  ...repeat("Vue.js", 5),
  ...repeat("Framer Motion", 6),
  ...repeat("Three.js", 5),
  ...repeat("React Native", 5),
  ...repeat("Expo", 5),
  ...repeat("CSS3", 5),
  ...repeat("GSAP", 5),
  ...repeat("Node.js", 4),
  ...repeat("Express.js", 3),
  ...repeat("NestJS", 2),
  ...repeat("REST APIs", 3),
  ...repeat("GraphQL", 3),
  ...repeat("MongoDB", 3),
  ...repeat("PostgreSQL", 3),
  ...repeat("Firebase", 3),
  ...repeat("Supabase", 2),
  ...repeat("Drizzle ORM", 2),
  ...repeat("Docker", 3),
  ...repeat("Git & GitHub", 3),
  ...repeat("VS Code", 3),
  ...repeat("Vercel", 3),
  ...repeat("AWS (basics)", 2),
  ...repeat("Figma", 3),
  ...repeat("Jest", 2),
  ...repeat("Playwright", 2),
  ...repeat("GitHub Actions", 2),
];

/* ─── helpers ─── */

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function createSpriteCanvas(w: number, h: number): HTMLCanvasElement | OffscreenCanvas {
  if (typeof OffscreenCanvas !== "undefined") {
    return new OffscreenCanvas(w, h);
  }
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

function buildSpriteCache(): { sprites: SpriteEntry[]; indexMap: Map<string, number> } {
  const sprites: SpriteEntry[] = [];
  const indexMap = new Map<string, number>();
  const seen = new Set<string>();

  for (const tech of FLOAT_TECHS) {
    if (seen.has(tech)) continue;
    seen.add(tech);

    const config = techIconMap[tech];
    if (!config) continue;

    const def: IconDefinition = config.icon;
    const [vbW, vbH, , , pathData] = def.icon;
    const pathStr = typeof pathData === "string" ? pathData : String(pathData);

    const spriteCanvas = createSpriteCanvas(SPRITE_SIZE, SPRITE_SIZE);
    const ctx = spriteCanvas.getContext("2d") as
      | CanvasRenderingContext2D
      | OffscreenCanvasRenderingContext2D;
    if (!ctx) continue;

    const scale = SPRITE_SIZE / Math.max(vbW, vbH);
    const offsetX = (SPRITE_SIZE - vbW * scale) / 2;
    const offsetY = (SPRITE_SIZE - vbH * scale) / 2;

    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    const path = new Path2D(pathStr);
    ctx.fillStyle = config.color;
    ctx.fill(path);

    indexMap.set(tech, sprites.length);
    sprites.push({ canvas: spriteCanvas, color: config.color });
  }

  return { sprites, indexMap };
}

function createParticles(w: number, h: number, indexMap: Map<string, number>): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < FLOAT_TECHS.length; i++) {
    const tech = FLOAT_TECHS[i];
    const idx = indexMap.get(tech);
    if (idx === undefined) continue;

    const bvx = (seededRandom(i * 17 + 5) - 0.5) * BASE_DRIFT;
    const bvy = (seededRandom(i * 23 + 7) - 0.5) * BASE_DRIFT;

    particles.push({
      x: seededRandom(i * 7 + 1) * w,
      y: seededRandom(i * 13 + 3) * h,
      vx: bvx,
      vy: bvy,
      baseVx: bvx,
      baseVy: bvy,
      size: 12 + seededRandom(i * 31 + 11) * 16,
      opacity: 0.32 + seededRandom(i * 37 + 13) * 0.28,
      rotation: seededRandom(i * 41 + 17) * Math.PI * 2,
      rotationSpeed: (seededRandom(i * 43 + 19) - 0.5) * 0.003,
      spriteIdx: idx,
    });
  }

  return particles;
}

/* ─── component ─── */

export function FloatingTechIcons() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const ctxEl = canvasEl.getContext("2d");
    if (!ctxEl) return;

    // Assign to const for closure safety (TypeScript narrowing)
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctxEl;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Build sprite cache
    const { sprites, indexMap } = buildSpriteCache();

    // Size canvas
    const parent = canvas.parentElement;
    if (!parent) return;

    let canvasW = parent.clientWidth;
    let canvasH = parent.clientHeight;

    function resize() {
      if (!parent || !canvas) return;
      const oldW = canvasW;
      const oldH = canvasH;
      canvasW = parent.clientWidth;
      canvasH = parent.clientHeight;
      canvas.width = canvasW * dpr;
      canvas.height = canvasH * dpr;
      canvas.style.width = `${canvasW}px`;
      canvas.style.height = `${canvasH}px`;

      // Reposition particles proportionally
      if (oldW > 0 && oldH > 0) {
        const sx = canvasW / oldW;
        const sy = canvasH / oldH;
        for (const p of particles) {
          p.x *= sx;
          p.y *= sy;
        }
      }
    }

    // Create particles
    const particles = createParticles(canvasW, canvasH, indexMap);
    resize();

    // Ripples
    const ripples: Ripple[] = [];
    const mouse = { x: -9999, y: -9999 };
    const lastRipplePos = { x: -9999, y: -9999 };
    let lastRippleTime = 0;

    function spawnRipple(x: number, y: number, strong: boolean) {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: strong ? 900 : RIPPLE_MAX_RADIUS,
        speed: strong ? 5.5 : RIPPLE_SPEED,
        strength: strong ? 2.0 : 1.0,
        born: performance.now(),
      });
      if (ripples.length > MAX_RIPPLES) {
        ripples.shift();
      }
      lastRipplePos.x = x;
      lastRipplePos.y = y;
      lastRippleTime = performance.now();
    }

    // Event handlers
    function onMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        mouse.x = -9999;
        mouse.y = -9999;
        return;
      }
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      const dx = mouse.x - lastRipplePos.x;
      const dy = mouse.y - lastRipplePos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const now = performance.now();

      if (dist > RIPPLE_SPAWN_DIST && now - lastRippleTime > 80) {
        spawnRipple(mouse.x, mouse.y, false);
      }
    }

    function onClick(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      )
        return;
      spawnRipple(e.clientX - rect.left, e.clientY - rect.top, true);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    // Resize observer
    const ro = new ResizeObserver(() => resize());
    ro.observe(parent);

    // Visibility
    let hidden = false;
    function onVisibility() {
      hidden = document.hidden;
    }
    document.addEventListener("visibilitychange", onVisibility);

    // Animation loop
    let raf = 0;

    function animate() {
      raf = requestAnimationFrame(animate);
      if (hidden) return;

      // Update ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const ripple = ripples[r];
        ripple.radius += ripple.speed;
        if (ripple.radius > ripple.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      // Update particles
      const halfWave = WAVEFRONT_WIDTH / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ripple forces
        for (let r = 0; r < ripples.length; r++) {
          const rip = ripples[r];
          const dx = p.x - rip.x;
          const dy = p.y - rip.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const wavefrontDist = dist - rip.radius;

          if (Math.abs(wavefrontDist) < halfWave && dist > 0.1) {
            const waveFactor = 1 - Math.abs(wavefrontDist) / halfWave;
            const decayFactor = 1 - rip.radius / rip.maxRadius;
            const force = rip.strength * waveFactor * decayFactor * RIPPLE_FORCE;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;
          }
        }

        // Friction toward base drift
        p.vx += (p.baseVx - p.vx) * 0.005;
        p.vy += (p.baseVy - p.vy) * 0.005;

        // Damping
        p.vx *= DAMPING;
        p.vy *= DAMPING;

        // Move
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Wrap edges
        const margin = p.size;
        if (p.x < -margin) p.x = canvasW + margin;
        if (p.x > canvasW + margin) p.x = -margin;
        if (p.y < -margin) p.y = canvasH + margin;
        if (p.y > canvasH + margin) p.y = -margin;
      }

      // Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ripple rings
      for (const rip of ripples) {
        const age = rip.radius / rip.maxRadius;
        const alpha = Math.max(0, 0.07 * (1 - age));
        ctx.beginPath();
        ctx.arc(rip.x * dpr, rip.y * dpr, rip.radius * dpr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1.5 * dpr;
        ctx.stroke();
      }

      // Draw particles
      for (const p of particles) {
        const sprite = sprites[p.spriteIdx];
        if (!sprite) continue;
        const drawSize = p.size * dpr;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x * dpr, p.y * dpr);
        ctx.rotate(p.rotation);
        ctx.drawImage(
          sprite.canvas as HTMLCanvasElement,
          -drawSize / 2,
          -drawSize / 2,
          drawSize,
          drawSize,
        );
        ctx.restore();
      }
    }

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}
