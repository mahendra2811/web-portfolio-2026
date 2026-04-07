"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projects } from "@/data/projects";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TechTag } from "@/components/ui/TechTag";
import { Tabs } from "@/components/ui/Tabs";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const allCategories = ["All", ...Array.from(new Set(projects.map((p) => p.category.split(" / ")[0])))];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All"
    ? projects
    : projects.filter((p) => p.category.startsWith(activeTab));

  return (
    <Section title="Projects" subtitle="A collection of my work and side projects">
      <div className="flex justify-center mb-10">
        <Tabs tabs={allCategories} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 0.05}>
            <Card className="overflow-hidden group h-full flex flex-col">
              <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge variant={project.status === "Live" ? "success" : "warning"}>
                    {project.status}
                  </Badge>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2 flex-1">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.slice(0, 4).map((tech) => (
                  <TechTag key={tech} name={tech} />
                ))}
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <Link href={`/projects/${project.id}`} className="text-sm text-primary-400 hover:text-primary-300 font-medium flex items-center gap-1">
                  Details <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                {project.githubUrl && String(project.githubUrl) !== "#" && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/80">
                    <GithubIcon className="h-4 w-4" size={16} />
                  </a>
                )}
                {project.liveUrl && String(project.liveUrl) !== "#" && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/80">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
