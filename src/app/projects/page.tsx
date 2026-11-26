"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGooglePlay, faGithub } from "@fortawesome/free-brands-svg-icons";
import { getProjectThumbnail, getSortedProjects, playStoreDeveloperUrl, projectCategories } from "@/data/projects";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TechTag } from "@/components/ui/TechTag";
import { Tabs } from "@/components/ui/Tabs";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const ordered = getSortedProjects();

  const filtered =
    activeTab === "All" ? ordered : ordered.filter((p) => p.category.startsWith(activeTab));

  return (
    <Section title="Projects" subtitle="A collection of my personal work and side projects">
      <div className="mb-8 flex justify-center">
        <a
          href={playStoreDeveloperUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card group inline-flex w-full max-w-xl items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400/40 hover:shadow-lg hover:shadow-primary-500/10 sm:px-6"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
            <FontAwesomeIcon icon={faGooglePlay} className="h-6 w-6 bg-linear-to-r from-[#34a853] via-[#4285f4] to-[#ea4335] bg-clip-text text-transparent" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-medium tracking-wide text-[var(--text-secondary)]">GOOGLE PLAY DEVELOPER</span>
            <span className="mt-0.5 block text-base font-semibold text-[var(--text-primary)] sm:text-lg">Pooniya Tech Innovations</span>
            <span className="mt-0.5 block text-sm text-[var(--text-secondary)]">Explore Android apps by Mahendra Pooniya</span>
          </span>
          <FontAwesomeIcon icon={faUpRightFromSquare} className="h-4 w-4 shrink-0 text-[var(--text-secondary)] transition-colors group-hover:text-primary-400" aria-hidden="true" />
        </a>
      </div>
      <div className="mb-10 flex justify-center">
        <Tabs tabs={projectCategories} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 0.05}>
            <Card className="group flex h-full flex-col overflow-hidden">
              <div className="relative -mx-6 -mt-6 mb-4 h-48 overflow-hidden">
                {getProjectThumbnail(project) ? (
                  <Image
                    src={getProjectThumbnail(project)!}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-indigo-900/60 via-cyan-900/30 to-slate-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge variant={project.status === "Live" ? "success" : "warning"}>
                    {project.status}
                  </Badge>
                </div>
              </div>

              <div className="mb-2"><Badge variant="primary">{project.category}</Badge></div>
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
                {project.playStoreUrl && (
                  <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer" className="text-primary-400 text-sm font-medium hover:underline" aria-label={`View ${project.title} on Google Play`}>
                    Google Play
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
