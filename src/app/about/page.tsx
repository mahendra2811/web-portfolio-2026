import type { Metadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBriefcase,
  faHeart,
  faBolt,
  faShieldHalved,
  faChartLine,
  faClock,
  faCode,
  faMedal,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { personalInfo, experience, education, achievements } from "@/data/personal";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Counter } from "@/components/ui/Counter";
import { TechTag } from "@/components/ui/TechTag";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${personalInfo.name}, a ${personalInfo.title} specializing in React, Next.js, and modern web technologies.`,
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: `About — ${personalInfo.name}`,
    description: `${personalInfo.title} specializing in React, Next.js, and modern web technologies.`,
    url: `${siteUrl}/about`,
    type: "profile",
  },
};

const metricIcons: Record<string, { icon: IconDefinition; color: string }> = {
  Zap: { icon: faBolt, color: "#F59E0B" },
  Shield: { icon: faShieldHalved, color: "#10B981" },
  Activity: { icon: faChartLine, color: "#6366F1" },
  Clock: { icon: faClock, color: "#06B6D4" },
};

const achievementIcons: Record<string, { icon: IconDefinition; color: string }> = {
  Code: { icon: faCode, color: "#6366F1" },
  Award: { icon: faMedal, color: "#F59E0B" },
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
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="mr-1.5 h-3 w-3"
                    style={{ color: "#E34F26" }}
                  />
                  {personalInfo.location}
                </Badge>
                <Badge variant="accent">
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    className="mr-1.5 h-3 w-3"
                    style={{ color: "#06B6D4" }}
                  />
                  Open to Opportunities
                </Badge>
                <Badge variant="default">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="mr-1.5 h-3 w-3"
                    style={{ color: "#EF4444" }}
                  />
                  DSA & Open Source
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
                      const config = metricIcons[metric.icon] || metricIcons.Zap;
                      const num = parseInt(metric.value.replace(/\D/g, ""));
                      const suffix = metric.value.replace(/\d+/, "");
                      return (
                        <div key={metric.label} className="glass p-3 text-center">
                          <FontAwesomeIcon
                            icon={config.icon}
                            className="mx-auto mb-1 h-5 w-5"
                            style={{ color: config.color }}
                          />
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
                <div className="mb-2 flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    className="h-5 w-5"
                    style={{ color: "#3B82F6" }}
                  />
                  <h3 className="text-xl font-semibold">
                    {edu.degree} in {edu.field}
                  </h3>
                </div>
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
            const config = achievementIcons[ach.icon] || achievementIcons.Award;
            return (
              <ScrollReveal key={ach.title}>
                <Card className="flex items-start gap-4">
                  <div className="glass rounded-card p-2">
                    <FontAwesomeIcon
                      icon={config.icon}
                      className="h-6 w-6"
                      style={{ color: config.color }}
                    />
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
