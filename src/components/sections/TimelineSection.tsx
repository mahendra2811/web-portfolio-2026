"use client";

import { timeline } from "@/data/timeline";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GraduationCap, Code, Rocket, Database, Briefcase, TrendingUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap, Code, Rocket, Database, Briefcase, TrendingUp, Sparkles,
};

const typeColors = {
  education: "border-blue-500/30 bg-blue-500/10",
  work: "border-emerald-500/30 bg-emerald-500/10",
  milestone: "border-primary-500/30 bg-primary-500/10",
};

export function TimelineSection() {
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-accent-500/30 to-transparent md:-translate-x-px" />

      <div className="space-y-12">
        {timeline.map((item, i) => {
          const Icon = iconMap[item.icon] || Code;
          const isLeft = i % 2 === 0;

          return (
            <ScrollReveal key={item.year + item.title} delay={i * 0.05} direction={isLeft ? "left" : "right"}>
              <div className={cn("relative flex items-start gap-6 md:gap-0", isLeft ? "md:flex-row" : "md:flex-row-reverse")}>
                <div className={cn("hidden md:block md:w-1/2", isLeft ? "md:pr-12 md:text-right" : "md:pl-12")}>
                  <div className={cn("glass-card p-5 inline-block", typeColors[item.type])}>
                    <span className="text-xs font-bold text-primary-400 block mb-1">{item.year}</span>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
                  </div>
                </div>

                <div className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 flex items-center justify-center rounded-full glass border border-primary-500/30 bg-surface z-10">
                  <Icon className="h-4 w-4 text-primary-400" />
                </div>

                <div className="md:hidden pl-12">
                  <div className={cn("glass-card p-4", typeColors[item.type])}>
                    <span className="text-xs font-bold text-primary-400 block mb-1">{item.year}</span>
                    <h3 className="text-base font-semibold mb-1">{item.title}</h3>
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
