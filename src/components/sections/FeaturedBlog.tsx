"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendarDays,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { TextReveal } from "@/components/motion/TextReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlowOrb } from "@/components/vfx/GlowOrb";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface FeaturedBlogProps {
  posts: BlogPost[];
}

export function FeaturedBlog({ posts }: FeaturedBlogProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-section-sm lg:py-section relative overflow-hidden">
      <GlowOrb
        color="rgba(139, 92, 246, 0.1)"
        size={450}
        className="-top-32 -left-32"
        delay={3}
      />
      <GlowOrb
        color="rgba(6, 182, 212, 0.08)"
        size={350}
        className="bottom-20 -right-32"
        delay={6}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <ScrollReveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-[var(--text-secondary)]">
              <span className="bg-accent-500 inline-block h-2 w-2 animate-pulse rounded-full" />
              Fresh from the blog
            </div>
          </ScrollReveal>
          <TextReveal
            text="AI & Tech Deep Dives"
            as="h2"
            className="justify-center font-[family-name:var(--font-display)] text-[length:var(--text-h2)] font-bold"
          />
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-3 max-w-2xl text-[var(--text-secondary)]">
              In-depth articles on AI, modern development, and the tools shaping
              the future of software engineering
            </p>
          </ScrollReveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <ScrollReveal key={post._id} delay={i * 0.12} className="h-full">
              <Link href={`/blog/${post.slug.current}`} className="block h-full">
                <Card className="group iridescent-glow flex h-full flex-col overflow-hidden">
                  {/* Cover Image */}
                  <div className="bg-surface-muted relative -mx-6 -mt-6 mb-4 h-48 overflow-hidden">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="gradient-mesh absolute inset-0 flex items-center justify-center">
                        <span className="text-primary-500/20 font-[family-name:var(--font-display)] text-5xl font-bold">
                          {post.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:to-accent-500/10 pointer-events-none absolute inset-0 bg-gradient-to-br via-white/0 transition-all duration-500 group-hover:via-white/5" />

                    {/* Reading time pill on image */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="h-3 w-3"
                        style={{ color: "#06B6D4" }}
                      />
                      {post.readingTime} min
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {post.categories.slice(0, 2).map((cat) => (
                      <Badge key={cat.slug.current} variant="primary">
                        {cat.title}
                      </Badge>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="group-hover:text-primary-400 mb-2 line-clamp-2 text-lg font-semibold transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mb-4 line-clamp-2 text-sm text-[var(--text-secondary)]">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                    {/* HIDDEN: published date
                    <time
                      dateTime={post.publishedAt}
                      className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]"
                    >
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        className="h-3.5 w-3.5"
                        style={{ color: "#6366F1" }}
                      />
                      {formatDate(post.publishedAt)}
                    </time>
                    */}
                    <span className="text-primary-400 group-hover:text-primary-300 flex items-center gap-1.5 text-xs font-medium transition-colors">
                      Read Article
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/blog"
            className="glass-button inline-flex items-center gap-2 px-6 py-3 font-medium transition-all"
          >
            Browse All Articles
            <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
