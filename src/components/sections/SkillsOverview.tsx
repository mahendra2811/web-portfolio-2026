"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { Card } from "@/components/ui/Card";
import { TextReveal } from "@/components/motion/TextReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlowOrb } from "@/components/vfx/GlowOrb";
import { GridBackground } from "@/components/vfx/GridBackground";

export function SkillsOverview() {
  const categories = Object.entries(skills);

  return (
    <section className="relative py-section-sm lg:py-section bg-surface-raised/30 overflow-hidden">
      <GridBackground />
      <GlowOrb color="rgba(139, 92, 246, 0.1)" size={450} className="-top-20 -right-40" delay={1} />
      <GlowOrb color="rgba(99, 102, 241, 0.08)" size={350} className="bottom-10 -left-40" delay={4} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <TextReveal text="Skills & Technologies" as="h2" className="text-[length:var(--text-h2)] font-bold font-[family-name:var(--font-display)] justify-center" />
          <p className="mt-3 text-[var(--text-secondary)]">Technologies I work with daily</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(([key, category], i) => (
            <ScrollReveal key={key} delay={i * 0.1}>
              <Card className="h-full metallic-border" data-reveal>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-3 h-3 rounded-full metallic-orb"
                    style={{ background: category.color }}
                  />
                  <h3 className="font-semibold">{category.label}</h3>
                </div>
                <div className="space-y-3">
                  {category.items.slice(0, 4).map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-[var(--text-secondary)]">{skill.name}</span>
                        <span className="text-primary-400 font-medium">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full metallic-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {category.items.length > 4 && (
                  <p className="text-xs text-[var(--text-secondary)] mt-3">+{category.items.length - 4} more</p>
                )}
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/skills" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors">
            Explore All Skills <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
