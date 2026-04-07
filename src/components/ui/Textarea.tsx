"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-[var(--text-secondary)]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "rounded-input focus:border-primary-500/50 focus:ring-primary-500/30 min-h-[120px] w-full resize-y border border-white/10 bg-white/5 px-4 py-3 text-[var(--text-primary)] transition-colors placeholder:text-white/30 focus:ring-1 focus:outline-none",
            error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30",
            className,
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
