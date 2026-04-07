"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlowOrb } from "@/components/vfx/GlowOrb";

export function CTASection() {
  return (
    <section className="relative py-section-sm lg:py-section overflow-hidden">
      <GlowOrb color="rgba(99, 102, 241, 0.12)" size={500} className="top-0 left-1/2 -translate-x-1/2" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="glass-card-vfx p-8 md:p-12 text-center relative overflow-hidden liquid-metal-border" data-reveal>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-accent-500/5 to-primary-500/5" />
            <div className="relative z-10">
              <h2 className="text-[length:var(--text-h2)] font-bold font-[family-name:var(--font-display)] mb-4">
                Let&apos;s build something{" "}
                <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent text-glow">
                  amazing
                </span>{" "}
                together
              </h2>
              <p className="text-[var(--text-secondary)] max-w-lg mx-auto mb-8">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
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
