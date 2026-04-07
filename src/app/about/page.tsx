import type { Metadata } from "next";
import Image from "next/image";
import { personalInfo, experience, education, achievements } from "@/data/personal";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Counter } from "@/components/ui/Counter";
import { TechTag } from "@/components/ui/TechTag";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { MapPin, Briefcase, Heart, Zap, Shield, Activity, Clock, Code, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${personalInfo.name}, a ${personalInfo.title} specializing in React, Next.js, and modern web technologies.`,
};

const metricIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Shield,
  Activity,
  Clock,
};
const achievementIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Award,
};

export default function AboutPage() {
  return (
    <>
      <Section title="About Me" subtitle="Get to know the person behind the code">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="glass-card inline-block p-3">
                <Image
                  src="https://picsum.photos/seed/mahendra-profile/500/600"
                  alt={personalInfo.name}
                  width={500}
                  height={600}
                  className="rounded-card object-cover"
                  priority
                />
              </div>
              <div className="glass-card absolute -right-4 -bottom-4 hidden p-4 lg:block">
                <p className="text-primary-400 text-sm font-semibold">2+ Years</p>
                <p className="text-xs text-[var(--text-secondary)]">of Experience</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div>
              <TextReveal
                text="Mahendra Singh Puniya"
                as="h2"
                className="mb-4 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] font-bold"
              />
              <p className="mb-6 leading-relaxed text-[var(--text-secondary)]">
                {personalInfo.bio.long}
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="primary">
                  <MapPin className="mr-1 inline h-3 w-3" /> {personalInfo.location}
                </Badge>
                <Badge variant="accent">
                  <Briefcase className="mr-1 inline h-3 w-3" /> Open to Opportunities
                </Badge>
                <Badge variant="default">
                  <Heart className="mr-1 inline h-3 w-3" /> DSA & Open Source
                </Badge>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section title="Experience" subtitle="My professional journey">
        <div className="space-y-8">
          {experience.map((exp, i) => (
            <ScrollReveal key={exp.id} delay={i * 0.1}>
              <Card>
                <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <p className="text-primary-400 font-medium">
                      {exp.company} &middot; {exp.type}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {exp.duration} &middot; {exp.location}
                    </p>
                  </div>
                </div>
                <p className="mb-4 text-[var(--text-secondary)]">{exp.description}</p>
                {exp.metrics.length > 0 && (
                  <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                    {exp.metrics.map((metric) => {
                      const Icon = metricIcons[metric.icon] || Zap;
                      const num = parseInt(metric.value.replace(/\D/g, ""));
                      const suffix = metric.value.replace(/\d+/, "");
                      return (
                        <div key={metric.label} className="glass p-3 text-center">
                          <Icon className="text-primary-400 mx-auto mb-1 h-5 w-5" />
                          <div className="text-lg font-bold">
                            <Counter target={num} suffix={suffix} />
                          </div>
                          <p className="text-xs text-[var(--text-secondary)]">{metric.label}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {exp.techStack.map((tech) => (
                    <TechTag key={tech} name={tech} />
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section title="Education">
        <div className="mx-auto max-w-2xl">
          {education.map((edu) => (
            <ScrollReveal key={edu.institution}>
              <Card>
                <h3 className="text-xl font-semibold">
                  {edu.degree} in {edu.field}
                </h3>
                <p className="text-primary-400 font-medium">{edu.shortName}</p>
                <p className="mb-3 text-sm text-[var(--text-secondary)]">
                  {edu.duration} &middot; CPI: {edu.cpi}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((course) => (
                    <TechTag key={course} name={course} />
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section title="Achievements">
        <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
          {achievements.map((ach) => {
            const Icon = achievementIcons[ach.icon] || Award;
            return (
              <ScrollReveal key={ach.title}>
                <Card className="flex items-start gap-4">
                  <div className="glass rounded-card p-2">
                    <Icon className="text-primary-400 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{ach.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{ach.description}</p>
                  </div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </Section>
    </>
  );
}
