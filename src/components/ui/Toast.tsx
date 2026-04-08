"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faCircleInfo,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const icons = {
  success: { icon: faCircleCheck, color: "#10B981" },
  error: { icon: faCircleXmark, color: "#EF4444" },
  info: { icon: faCircleInfo, color: "#6366F1" },
};

const styles = {
  success: "border-emerald-500/30 bg-emerald-500/10",
  error: "border-red-500/30 bg-red-500/10",
  info: "border-primary-500/30 bg-primary-500/10",
};

export function Toast({
  message,
  type = "success",
  isVisible,
  onClose,
  duration = 4000,
}: ToastProps) {
  const config = icons[type];

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
          className={cn(
            "fixed top-6 right-4 z-50 flex max-w-sm items-center gap-3 rounded-xl border px-5 py-3.5 shadow-2xl shadow-black/20 backdrop-blur-xl md:right-auto md:left-1/2 md:-translate-x-1/2",
            styles[type],
          )}
        >
          <FontAwesomeIcon
            icon={config.icon}
            className="h-5 w-5 shrink-0"
            style={{ color: config.color }}
          />
          <span className="text-sm leading-snug font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 shrink-0 rounded-lg p-1 transition-colors hover:bg-white/10"
          >
            <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5 text-white/50" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
