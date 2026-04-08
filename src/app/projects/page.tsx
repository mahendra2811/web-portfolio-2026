"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { projects } from "@/data/projects";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TechTag } from "@/components/ui/TechTag";
import { Tabs } from "@/components/ui/Tabs";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const allCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category.split(" / ")[0]))),
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All" ? projects : projects.filter((p) => p.category.startsWith(activeTab));

  return (
    <Section title="Projects" subtitle="A collection of my work and side projects">
      <div className="mb-10 flex justify-center">
        <Tabs tabs={allCategories} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 0.05}>
            <Card className="group flex h-full flex-col overflow-hidden">
              <div className="relative -mx-6 -mt-6 mb-4 h-48 overflow-hidden">
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

              <h3 className="mb-1 text-lg font-semibold">{project.title}</h3>
              <p className="mb-3 line-clamp-2 flex-1 text-sm text-[var(--text-secondary)]">
                {project.shortDescription}
              </p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 4).map((tech) => (
                  <TechTag key={tech} name={tech} />
                ))}
              </div>
              <div className="mt-auto flex items-center gap-3">
                <Link
                  href={`/projects/${project.id}`}
                  className="text-primary-400 hover:text-primary-300 flex items-center gap-1.5 text-sm font-medium"
                >
                  Details <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                </Link>
                {project.githubUrl && String(project.githubUrl) !== "#" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 transition-colors hover:text-white/80"
                  >
                    <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
                  </a>
                )}
                {project.liveUrl && String(project.liveUrl) !== "#" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 transition-colors hover:text-white/80"
                  >
                    <FontAwesomeIcon
                      icon={faUpRightFromSquare}
                      className="h-3.5 w-3.5"
                      style={{ color: "#06B6D4" }}
                    />
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
