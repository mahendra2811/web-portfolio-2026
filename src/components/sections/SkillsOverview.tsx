"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { skills } from "@/data/skills";
import { getTechIcon, categoryIconMap } from "@/lib/tech-icons";
import { Card } from "@/components/ui/Card";
import { TextReveal } from "@/components/motion/TextReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlowOrb } from "@/components/vfx/GlowOrb";
import { GridBackground } from "@/components/vfx/GridBackground";

export function SkillsOverview() {
  const categories = Object.entries(skills);

  return (
    <section className="py-section-sm lg:py-section bg-surface-raised/30 relative overflow-hidden">
      <GridBackground />
      <GlowOrb color="rgba(139, 92, 246, 0.1)" size={450} className="-top-20 -right-40" delay={1} />
      <GlowOrb
        color="rgba(99, 102, 241, 0.08)"
        size={350}
        className="bottom-10 -left-40"
        delay={4}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <TextReveal
            text="Skills & Technologies"
            as="h2"
            className="justify-center font-[family-name:var(--font-display)] text-[length:var(--text-h2)] font-bold"
          />
          <p className="mt-3 text-[var(--text-secondary)]">Technologies I work with daily</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(([key, category], i) => {
            const catIcon = categoryIconMap[key];
            return (
              <ScrollReveal key={key} delay={i * 0.1}>
                <Card className="metallic-border h-full" data-reveal>
                  <div className="mb-5 flex items-center gap-2.5">
                    {catIcon && (
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{ background: `${category.color}15` }}
                      >
                        <FontAwesomeIcon
                          icon={catIcon.icon}
                          className="h-4 w-4"
                          style={{ color: category.color }}
                        />
                      </div>
                    )}
                    <h3 className="font-semibold">{category.label}</h3>
                  </div>
                  <div className="space-y-3.5">
                    {category.items.slice(0, 4).map((skill) => {
                      const { icon, color } = getTechIcon(skill.name);
                      return (
                        <div key={skill.name}>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                              <FontAwesomeIcon
                                icon={icon}
                                className="h-3.5 w-3.5"
                                style={{ color }}
                              />
                              {skill.name}
                            </span>
                            {/* <span className="text-primary-400 font-medium">{skill.level}%</span> */}
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {category.items.length > 4 && (
                    <p className="mt-3 text-xs text-[var(--text-secondary)]">
                      +{category.items.length - 4} more
                    </p>
                  )}
                </Card>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/skills"
            className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-2 font-medium transition-colors"
          >
            Explore All Skills <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
