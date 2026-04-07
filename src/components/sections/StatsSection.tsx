"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faFolderOpen,
  faCode,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { stats } from "@/data/personal";
import { Card } from "@/components/ui/Card";
import { Counter } from "@/components/ui/Counter";
import { StaggerList, StaggerItem } from "@/components/motion/StaggerList";
import { extractNumber } from "@/lib/utils";
import { GlowOrb } from "@/components/vfx/GlowOrb";

const iconMap: Record<string, { icon: IconDefinition; color: string }> = {
  Calendar: { icon: faCalendarDays, color: "#6366F1" },
  Folder: { icon: faFolderOpen, color: "#06B6D4" },
  Code: { icon: faCode, color: "#10B981" },
  Layers: { icon: faLayerGroup, color: "#F59E0B" },
};

export function StatsSection() {
  return (
    <section className="py-section-sm lg:py-section relative overflow-hidden">
      <GlowOrb color="rgba(99, 102, 241, 0.1)" size={400} className="top-0 -left-40" />
      <GlowOrb
        color="rgba(6, 182, 212, 0.08)"
        size={350}
        className="-right-40 bottom-0"
        delay={3}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerList className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => {
            const config = iconMap[stat.icon] || iconMap.Code;
            const num = extractNumber(stat.value);
            const suffix = stat.value.replace(/\d+/, "");
            return (
              <StaggerItem key={stat.label} index={i}>
                <Card className="metallic-border p-6 text-center" data-reveal>
                  <div
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: `${config.color}15` }}
                  >
                    <FontAwesomeIcon
                      icon={config.icon}
                      className="h-6 w-6"
                      style={{ color: config.color }}
                    />
                  </div>
                  <div className="font-[family-name:var(--font-display)] text-3xl font-bold lg:text-4xl">
                    <Counter target={num} suffix={suffix} />
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{stat.label}</p>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerList>
        <div className="metallic-orb absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />
      </div>
    </section>
  );
}
