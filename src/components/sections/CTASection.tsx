"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlowOrb } from "@/components/vfx/GlowOrb";

export function CTASection() {
  return (
    <section className="py-section-sm lg:py-section relative overflow-hidden">
      <GlowOrb
        color="rgba(99, 102, 241, 0.12)"
        size={500}
        className="top-0 left-1/2 -translate-x-1/2"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div
            className="glass-card-vfx liquid-metal-border relative overflow-hidden p-8 text-center md:p-12"
            data-reveal
          >
            <div className="from-primary-500/5 via-accent-500/5 to-primary-500/5 absolute inset-0 bg-gradient-to-r" />
            <div className="relative z-10">
              <h2 className="mb-4 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] font-bold">
                Let&apos;s build something{" "}
                <span className="from-primary-400 to-accent-400 text-glow bg-gradient-to-r bg-clip-text text-transparent">
                  amazing
                </span>{" "}
                together
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-[var(--text-secondary)]">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to
                be part of your vision.
              </p>
              <MagneticButton>
                <Link href="/contact">
                  <Button variant="primary" size="lg" className="chrome-button">
                    Get In Touch
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
