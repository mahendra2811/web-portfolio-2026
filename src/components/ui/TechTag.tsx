import { cn } from "@/lib/utils";

interface TechTagProps {
  name: string;
  className?: string;
}

export function TechTag({ name, className }: TechTagProps) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-1 text-xs font-medium bg-primary-500/10 text-primary-300 border border-primary-500/20 rounded-tag", className)}>
      {name}
    </span>
  );
}
