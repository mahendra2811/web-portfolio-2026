"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "glass-button bg-primary-500/20 border-primary-500/30 text-white hover:bg-primary-500/30 hover:border-primary-500/50 hover:shadow-glow-primary",
      secondary:
        "glass-button bg-accent-500/20 border-accent-500/30 text-white hover:bg-accent-500/30 hover:border-accent-500/50 hover:shadow-glow-accent",
      outline: "glass-button border-white/20 text-white hover:bg-white/10",
      ghost: "text-white/70 hover:text-white hover:bg-white/5 rounded-button",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-tag",
      md: "px-6 py-3 text-base rounded-button",
      lg: "px-8 py-4 text-lg rounded-button",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
