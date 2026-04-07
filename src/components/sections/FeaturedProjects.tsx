"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projects } from "@/data/projects";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TechTag } from "@/components/ui/TechTag";
import { TextReveal } from "@/components/motion/TextReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlowOrb } from "@/components/vfx/GlowOrb";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="relative py-section-sm lg:py-section overflow-hidden">
      <GlowOrb color="rgba(6, 182, 212, 0.1)" size={500} className="-top-40 -right-40" delay={2} />
      <GlowOrb color="rgba(99, 102, 241, 0.08)" size={400} className="bottom-20 -left-40" delay={5} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <TextReveal text="Featured Projects" as="h2" className="text-[length:var(--text-h2)] font-bold font-[family-name:var(--font-display)] justify-center" />
          <p className="mt-3 text-[var(--text-secondary)]">Some of my recent work</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <Card className="overflow-hidden group iridescent-glow" data-reveal>
                <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-white/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:via-white/5 group-hover:to-accent-500/10 transition-all duration-500 pointer-events-none" />
                  <div className="absolute top-3 right-3">
                    <Badge variant={project.status === "Live" ? "success" : "warning"}>
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <TechTag key={tech} name={tech} />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Link href={`/projects/${project.id}`} className="text-sm text-primary-400 hover:text-primary-300 font-medium flex items-center gap-1">
                    View Details <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  {project.githubUrl && String(project.githubUrl) !== "#" && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/80 transition-colors">
                      <GithubIcon className="h-4 w-4" size={16} />
                    </a>
                  )}
                  {project.liveUrl && String(project.liveUrl) !== "#" && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/80 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/projects" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors">
            View All Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
