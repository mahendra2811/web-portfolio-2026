"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, animate } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { skills } from "@/data/skills";
import { getTechIcon, categoryIconMap } from "@/lib/tech-icons";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/motion/TextReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlowOrb } from "@/components/vfx/GlowOrb";
import { GridBackground } from "@/components/vfx/GridBackground";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function SkillsOverview() {
  const categories = Object.entries(skills);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [xNow, setXNow] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => setMaxScroll(Math.max(track.scrollWidth - viewport.offsetWidth, 0));
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const clamped = clamp(x.get(), -maxScroll, 0);
    if (clamped !== x.get()) animate(x, clamped, { duration: 0.3 });
  }, [maxScroll, x]);

  useEffect(() => x.on("change", setXNow), [x]);

  const canPrev = xNow < -1;
  const canNext = xNow > -maxScroll + 1;

  const scrollByPage = (direction: 1 | -1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const target = clamp(x.get() - direction * viewport.offsetWidth, -maxScroll, 0);
    animate(x, target, { type: "spring", stiffness: 260, damping: 32 });
  };

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

        <div className="mb-4 flex justify-end gap-3">
          <Button
            variant="outline"
            size="sm"
            className="h-11 w-11 rounded-full p-0"
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
            aria-label="Scroll to previous skills"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-11 w-11 rounded-full p-0"
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
            aria-label="Scroll to next skills"
          >
            <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
          </Button>
        </div>

        <div ref={viewportRef} className="overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex cursor-grab gap-6 active:cursor-grabbing"
            style={{ x, touchAction: "pan-y" }}
            drag="x"
            dragConstraints={{ left: -maxScroll, right: 0 }}
            dragElastic={0.06}
            dragTransition={{ power: 0.2, timeConstant: 200 }}
          >
            {categories.map(([key, category], i) => {
              const catIcon = categoryIconMap[key];
              return (
                <ScrollReveal
                  key={key}
                  delay={i * 0.05}
                  className="w-full shrink-0 sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"
                >
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
                                style={{
                                  background: `linear-gradient(90deg, ${color}80, ${color})`,
                                }}
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
          </motion.div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/skills"
            className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-2 font-medium transition-colors"
          >
            Explore All Skills <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
