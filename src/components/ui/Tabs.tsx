"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("glass rounded-card flex gap-2 p-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            "rounded-button relative px-4 py-2 text-sm font-medium transition-colors",
            activeTab === tab ? "text-white" : "text-white/50 hover:text-white/80",
          )}
        >
          {activeTab === tab && (
            <motion.div
              layoutId="activeTab"
              className="bg-primary-500/20 border-primary-500/30 rounded-button absolute inset-0 border"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  );
}
