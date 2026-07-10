"use client";

import { useEffect, useState } from "react";

export type HeavyVisualsState = "idle" | "loading" | "ready" | "unsupported";

interface UseHeavyVisualsOptions {
  /** Extra delay (ms) after window load + idle before flipping to ready. */
  delay?: number;
}

type NetInfo = { saveData?: boolean; effectiveType?: string };
type NavExt = Navigator & { connection?: NetInfo; deviceMemory?: number };
type WinExt = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

/**
 * Decides whether heavy visuals (Three.js scenes, canvas particle systems)
 * should render, and when.
 *
 * Capability checks (any failure → "unsupported", caller skips entirely):
 *   - prefers-reduced-motion
 *   - viewport ≤ 767px (phones get the CSS gradient fallback instead)
 *   - Save-Data header
 *   - deviceMemory < 2GB
 *   - 3g / slow-2g / 2g connection (anything slower than 4g)
 *   - No WebGL context available
 *
 * Deferral: once supported, waits for window `load` → `requestIdleCallback`
 * → `delay` ms before becoming "ready", so the main content paints first.
 */
export function useHeavyVisuals(options: UseHeavyVisualsOptions = {}): HeavyVisualsState {
  const { delay = 300 } = options;
  const [state, setState] = useState<HeavyVisualsState>("idle");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("unsupported");
      return;
    }

    // Phones skip the 3D scene entirely (CSS gradient fallback instead) — the
    // Three.js bundle is ~360KB gzipped and not worth it on small screens.
    if (window.matchMedia("(max-width: 767px)").matches) {
      setState("unsupported");
      return;
    }

    const nav = navigator as NavExt;

    if (nav.connection?.saveData) {
      setState("unsupported");
      return;
    }
    if (nav.deviceMemory != null && nav.deviceMemory < 2) {
      setState("unsupported");
      return;
    }
    const eff = nav.connection?.effectiveType;
    if (eff === "slow-2g" || eff === "2g" || eff === "3g") {
      setState("unsupported");
      return;
    }

    try {
      const probe = document.createElement("canvas");
      const gl = probe.getContext("webgl2") || probe.getContext("webgl");
      if (!gl) {
        setState("unsupported");
        return;
      }
    } catch {
      setState("unsupported");
      return;
    }

    setState("loading");

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;
    const win = window as WinExt;

    const flipReady = () => {
      if (cancelled) return;
      timeoutId = setTimeout(() => {
        if (!cancelled) setState("ready");
      }, delay);
    };

    const onLoaded = () => {
      if (cancelled) return;
      if (win.requestIdleCallback) {
        idleId = win.requestIdleCallback(flipReady, { timeout: 2000 });
      } else {
        timeoutId = setTimeout(flipReady, 500);
      }
    };

    if (document.readyState === "complete") {
      onLoaded();
    } else {
      window.addEventListener("load", onLoaded, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoaded);
      if (timeoutId) clearTimeout(timeoutId);
      if (idleId != null) win.cancelIdleCallback?.(idleId);
    };
  }, [delay]);

  return state;
}
