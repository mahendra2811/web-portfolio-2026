"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { scrollDirection, scrollY } = useScrollDirection();

  const isHidden = scrollDirection === "down" && scrollY > 200;

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        isHidden ? "-translate-y-full" : "translate-y-0",
        scrollY > 50 ? "glass border-b border-white/5" : "bg-transparent",
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center md:pl-5">
            <Image
              src="/images/logo.png"
              alt="MSP"
              width={160}
              height={44}
              className="h-11 w-auto object-contain drop-shadow-[0_0_10px_rgba(99,102,241,0.4)]"
              style={{ mixBlendMode: "screen" }}
              priority
            />
          </Link>

          <LayoutGroup>
            <div className="hidden items-center gap-1 md:flex">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-button relative px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href ? "text-white" : "text-white/60 hover:text-white",
                  )}
                >
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-active"
                      layoutDependency={pathname}
                      className="bg-primary-500/15 border-primary-500/20 rounded-button absolute inset-0 border"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ))}
            </div>
          </LayoutGroup>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="glass-button rounded-button p-2 md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass border-t border-white/5 md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-button block px-4 py-3 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary-500/15 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
