"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faCode,
  faRocket,
  faDatabase,
  faBriefcase,
  faArrowTrendUp,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { timeline } from "@/data/timeline";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { cn } from "@/lib/utils";

const iconMap: Record<string, { icon: IconDefinition; color: string }> = {
  GraduationCap: { icon: faGraduationCap, color: "#3B82F6" },
  Code: { icon: faCode, color: "#10B981" },
  Rocket: { icon: faRocket, color: "#F59E0B" },
  Database: { icon: faDatabase, color: "#8B5CF6" },
  Briefcase: { icon: faBriefcase, color: "#06B6D4" },
  TrendingUp: { icon: faArrowTrendUp, color: "#10B981" },
  Sparkles: { icon: faWandMagicSparkles, color: "#FF0055" },
};

const typeColors = {
  education: "border-blue-500/30 bg-blue-500/10",
  work: "border-emerald-500/30 bg-emerald-500/10",
  milestone: "border-primary-500/30 bg-primary-500/10",
};

export function TimelineSection() {
  return (
    <div className="relative">
      <div className="from-primary-500/50 via-accent-500/30 absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b to-transparent md:left-1/2 md:-translate-x-px" />

      <div className="space-y-12">
        {timeline.map((item, i) => {
          const config = iconMap[item.icon] || iconMap.Code;
          const isLeft = i % 2 === 0;

          return (
            <ScrollReveal
              key={item.year + item.title}
              delay={i * 0.05}
              direction={isLeft ? "left" : "right"}
            >
              <div
                className={cn(
                  "relative flex items-start gap-6 md:gap-0",
                  isLeft ? "md:flex-row" : "md:flex-row-reverse",
                )}
              >
                <div
                  className={cn(
                    "hidden md:block md:w-1/2",
                    isLeft ? "md:pr-12 md:text-right" : "md:pl-12",
                  )}
                >
                  <div className={cn("glass-card inline-block p-5", typeColors[item.type])}>
                    <span className="text-primary-400 mb-1 block text-xs font-bold">
                      {item.year}
                    </span>
                    <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
                  </div>
                </div>

                <div className="glass border-primary-500/30 bg-surface absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border md:left-1/2">
                  <FontAwesomeIcon
                    icon={config.icon}
                    className="h-3.5 w-3.5"
                    style={{ color: config.color }}
                  />
                </div>

                <div className="pl-12 md:hidden">
                  <div className={cn("glass-card p-4", typeColors[item.type])}>
                    <span className="text-primary-400 mb-1 block text-xs font-bold">
                      {item.year}
                    </span>
                    <h3 className="mb-1 text-base font-semibold">{item.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
                  </div>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
