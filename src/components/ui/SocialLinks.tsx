"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { personalInfo } from "@/data/personal";
import { LeetCodeIcon } from "@/components/ui/Icons";

interface SocialLinksProps {
  className?: string;
}

const faLinks: { icon: IconDefinition; color: string; href: string; label: string }[] = [
  { icon: faGithub, color: "#FFFFFF", href: personalInfo.github, label: "GitHub" },
  { icon: faLinkedinIn, color: "#0A66C2", href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: faEnvelope, color: "#F59E0B", href: `mailto:${personalInfo.email}`, label: "Email" },
];

export function SocialLinks({ className = "" }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {faLinks.map(({ icon, color, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="glass-button rounded-button hover:shadow-glow-primary p-2.5 transition-all duration-300"
        >
          <FontAwesomeIcon icon={icon} className="h-5 w-5" style={{ color }} />
        </a>
      ))}
      <a
        href={personalInfo.leetcode}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LeetCode"
        className="glass-button rounded-button hover:shadow-glow-primary p-2.5 transition-all duration-300"
        style={{ color: "#FFA116" }}
      >
        <LeetCodeIcon size={20} className="h-5 w-5" />
      </a>
    </div>
  );
}
