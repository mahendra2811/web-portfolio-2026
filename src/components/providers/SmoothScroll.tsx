"use client";

import { ReactNode } from "react";

/**
 * Smooth-scroll provider.
 *
 * Previously wrapped children in Lenis (lenis-js). That caused intermittent
 * wheel-event lock-ups on the home page — wheel scroll would stop responding
 * mid-page while the native scrollbar still worked. Root cause: Lenis's
 * virtual scroll position desynced as lazy-loaded images in
 * FeaturedProjects/FeaturedBlog changed the document height after init.
 *
 * Modern browsers do smooth wheel scrolling natively. No component in this
 * codebase consumes the Lenis instance, so we just pass children through.
 * Programmatic scroll-to-anchor still works via `scroll-behavior: smooth`
 * set on <html> in globals.css.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
