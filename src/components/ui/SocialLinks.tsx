import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { personalInfo } from "@/data/personal";

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

export function SocialLinks({ className = "", iconSize = 20 }: SocialLinksProps) {
  const links = [
    { href: personalInfo.github, icon: GithubIcon, label: "GitHub" },
    { href: personalInfo.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
    { href: `mailto:${personalInfo.email}`, icon: Mail, label: "Email" },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="p-2.5 glass-button rounded-button hover:shadow-glow-primary transition-all duration-300"
        >
          <Icon size={iconSize} />
        </a>
      ))}
    </div>
  );
}
