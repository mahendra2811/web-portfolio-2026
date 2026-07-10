"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Mail, Download } from "lucide-react";
import Link from "next/link";
import { personalInfo, jobSearch } from "@/data/personal";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "@/components/ui/Icons";
import { useHeavyVisuals } from "@/hooks/useHeavyVisuals";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const FloatingTechIcons = dynamic(
  () =>
    import("@/components/ui/FloatingTechIcons").then((m) => ({
      default: m.FloatingTechIcons,
    })),
  { ssr: false, loading: () => null },
);

function HeroBackdrop() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="gradient-mesh h-full w-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="bg-primary-500 h-2 w-2 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const heavyState = useHeavyVisuals();
  const showHeavy = heavyState === "ready";
  const showBackdrop = heavyState !== "ready";

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {showBackdrop && <HeroBackdrop />}

      {showHeavy && (
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeroScene />
        </motion.div>
      )}

      {showHeavy && <FloatingTechIcons />}

      <div className="via-surface/30 to-surface/80 pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-transparent" />

      <div className="pointer-events-none relative z-[3] mx-auto max-w-5xl px-6 text-center">
        {jobSearch.openToWork && (
          <motion.div
            className="mb-6 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-300 uppercase backdrop-blur-sm sm:text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Open to Work · {jobSearch.targetRoles.join(" / ")}
            </span>
          </motion.div>
        )}

        <motion.p
          className="text-accent-400 mb-4 font-mono text-sm tracking-widest uppercase md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          className="mb-6 font-[family-name:var(--font-display)] leading-[0.9] font-extrabold"
          style={{ fontSize: "clamp(2.5rem, 10vw, 7rem)" }}
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="via-primary-200 to-accent-300 bg-gradient-to-r from-white bg-clip-text text-transparent">
            {personalInfo.name}
          </span>
        </motion.h1>

        <motion.p
          className="mb-3 font-[family-name:var(--font-body)] text-xl font-light text-white/70 md:text-2xl lg:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {personalInfo.title}
        </motion.p>

        <motion.p
          className="mx-auto mb-10 max-w-2xl font-[family-name:var(--font-body)] text-base text-white/50 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* <motion.div
          className="pointer-events-auto mb-10 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <Link
            href="/projects"
            className="group relative overflow-hidden rounded-2xl px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105"
          >
            <span className="from-primary-500 via-accent-500 to-primary-500 absolute inset-0 animate-[shimmer_3s_linear_infinite] rounded-2xl bg-gradient-to-r bg-[length:200%_100%]" />
            <span className="absolute inset-[2px] rounded-[14px] bg-[var(--surface)]" />
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                &rarr;
              </motion.span>
            </span>
          </Link>
          <a
            href={personalInfo.resumeUrl}
            download
            className="glass-button flex items-center gap-2 rounded-2xl px-8 py-4 font-semibold text-white/80 transition-all duration-300 hover:scale-105 hover:text-white"
          >
            <Download size={18} />
            Résumé
          </a>
          <Link
            href="/contact"
            className="glass-button rounded-2xl px-8 py-4 font-semibold text-white/80 transition-all duration-300 hover:scale-105 hover:text-white"
          >
            Get In Touch
          </Link>
        </motion.div> */}

        <motion.div
          className="pointer-events-auto flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          {[
            { icon: GithubIcon, href: personalInfo.github, label: "GitHub" },
            { icon: LinkedinIcon, href: personalInfo.linkedin, label: "LinkedIn" },
            { icon: LeetCodeIcon, href: personalInfo.leetcode, label: "LeetCode" },
            { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="glass-button hover:shadow-glow-primary rounded-xl p-3 text-white/60 transition-all duration-300 hover:text-white"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-[3] -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/30"
        >
          <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
