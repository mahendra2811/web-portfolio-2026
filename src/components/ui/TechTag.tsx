"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTechIcon } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

interface TechTagProps {
  name: string;
  className?: string;
  showIcon?: boolean;
}

export function TechTag({ name, className, showIcon = true }: TechTagProps) {
  const { icon, color } = getTechIcon(name);

  return (
    <span
      className={cn(
        "bg-primary-500/10 text-primary-300 border-primary-500/20 rounded-tag inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-medium",
        className,
      )}
    >
      {showIcon && <FontAwesomeIcon icon={icon} className="h-3 w-3" style={{ color }} />}
      {name}
    </span>
  );
}
