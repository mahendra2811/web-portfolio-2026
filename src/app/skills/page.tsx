"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { skills, type SkillCategory } from "@/data/skills";
import { getTechIcon, categoryIconMap } from "@/lib/tech-icons";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/motion/StaggerList";

const categories = Object.keys(skills) as SkillCategory[];

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState<string>(categories[0]);
  const activeCategory = skills[activeTab as SkillCategory];
  const catIcon = categoryIconMap[activeTab];

  return (
    <Section
      title="Skills & Technologies"
      subtitle="Technologies I work with and my proficiency levels"
    >
      <div className="mb-10 flex justify-center">
        <Tabs
          tabs={categories.map((k) => skills[k].label)}
          activeTab={activeCategory.label}
          onChange={(label) => {
            const key = categories.find((k) => skills[k].label === label);
            if (key) setActiveTab(key);
          }}
        />
      </div>

      {catIcon && (
        <div className="mb-6 flex items-center justify-center gap-2">
          <FontAwesomeIcon
            icon={catIcon.icon}
            className="h-5 w-5"
            style={{ color: catIcon.color }}
          />
          <span className="text-lg font-semibold">{activeCategory.label}</span>
        </div>
      )}

      <StaggerList className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" key={activeTab}>
        {activeCategory.items.map((skill, i) => {
          const { icon, color } = getTechIcon(skill.name);
          return (
            <StaggerItem key={skill.name} index={i}>
              <ScrollReveal delay={i * 0.05}>
                <Card className="flex items-center gap-4">
                  <ProgressRing progress={skill.level} color={activeCategory.color} />
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={icon} className="h-5 w-5" style={{ color }} />
                    <div>
                      <h3 className="font-semibold">{skill.name}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {skill.years} {skill.years === 1 ? "year" : "years"}
                      </p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            </StaggerItem>
          );
        })}
      </StaggerList>
    </Section>
  );
}
