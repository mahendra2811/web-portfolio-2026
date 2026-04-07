"use client";

import { useState } from "react";
import { skills, type SkillCategory } from "@/data/skills";
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

  return (
    <Section title="Skills & Technologies" subtitle="Technologies I work with and my proficiency levels">
      <div className="flex justify-center mb-10">
        <Tabs
          tabs={categories.map((k) => skills[k].label)}
          activeTab={activeCategory.label}
          onChange={(label) => {
            const key = categories.find((k) => skills[k].label === label);
            if (key) setActiveTab(key);
          }}
        />
      </div>

      <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" key={activeTab}>
        {activeCategory.items.map((skill, i) => (
          <StaggerItem key={skill.name} index={i}>
            <ScrollReveal delay={i * 0.05}>
              <Card className="flex items-center gap-4">
                <ProgressRing progress={skill.level} color={activeCategory.color} />
                <div>
                  <h3 className="font-semibold">{skill.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{skill.years} {skill.years === 1 ? "year" : "years"}</p>
                </div>
              </Card>
            </ScrollReveal>
          </StaggerItem>
        ))}
      </StaggerList>
    </Section>
  );
}
