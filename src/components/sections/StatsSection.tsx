"use client";

import { stats } from "@/data/personal";
import { Card } from "@/components/ui/Card";
import { Counter } from "@/components/ui/Counter";
import { StaggerList, StaggerItem } from "@/components/motion/StaggerList";
import { extractNumber } from "@/lib/utils";
import { Calendar, Folder, Code, Layers } from "lucide-react";
import { GlowOrb } from "@/components/vfx/GlowOrb";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar, Folder, Code, Layers,
};

export function StatsSection() {
  return (
    <section className="relative py-section-sm lg:py-section overflow-hidden">
      <GlowOrb color="rgba(99, 102, 241, 0.1)" size={400} className="top-0 -left-40" />
      <GlowOrb color="rgba(6, 182, 212, 0.08)" size={350} className="bottom-0 -right-40" delay={3} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerList className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Code;
            const num = extractNumber(stat.value);
            const suffix = stat.value.replace(/\d+/, "");
            return (
              <StaggerItem key={stat.label} index={i}>
                <Card className="text-center p-6 metallic-border" data-reveal>
                  <Icon className="h-8 w-8 mx-auto mb-3 text-primary-400" />
                  <div className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-display)]">
                    <Counter target={num} suffix={suffix} />
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{stat.label}</p>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerList>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 metallic-orb hidden lg:block" />
      </div>
    </section>
  );
}
