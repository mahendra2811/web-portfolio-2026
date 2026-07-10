"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const NoiseOverlay = dynamic(
  () => import("./NoiseOverlay").then((m) => ({ default: m.NoiseOverlay })),
  { ssr: false },
);
const CursorGlow = dynamic(
  () => import("./CursorGlow").then((m) => ({ default: m.CursorGlow })),
  { ssr: false },
);
const DynamicCursor = dynamic(
  () => import("@/components/ui/DynamicCursor").then((m) => ({ default: m.DynamicCursor })),
  { ssr: false },
);

type WinExt = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

/**
 * Purely decorative chrome (noise texture, cursor glow, custom cursor ring) —
 * none of it affects layout or content. Code-split and mounted only once the
 * browser is idle, so it never competes with hydration on first load.
 */
export function DeferredVfx() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const win = window as WinExt;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (win.requestIdleCallback) {
      idleId = win.requestIdleCallback(() => setReady(true), { timeout: 2000 });
    } else {
      timeoutId = setTimeout(() => setReady(true), 500);
    }

    return () => {
      if (idleId != null) win.cancelIdleCallback?.(idleId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <NoiseOverlay />
      <CursorGlow />
      <DynamicCursor />
    </>
  );
}
