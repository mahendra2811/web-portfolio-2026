"use client";

import { useEffect, useRef } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

interface BlogAnalyticsProps {
  title: string;
  slug: string;
  categories: string[];
  readingTime: number;
  publishedAt: string;
}

export function BlogAnalytics({ title, slug, categories, readingTime, publishedAt }: BlogAnalyticsProps) {
  const startTime = useRef<number>(Date.now());
  const maxScrollDepth = useRef<number>(0);
  const firedMilestones = useRef<Set<number>>(new Set());
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== "function") return;

    // Track blog post view (once)
    if (!hasTrackedView.current) {
      window.gtag("event", "blog_view", {
        event_category: "Blog",
        event_label: title,
        blog_slug: slug,
        blog_categories: categories.join(", "),
        blog_reading_time: readingTime,
        blog_published_date: publishedAt,
      });
      hasTrackedView.current = true;
    }

    // Track scroll depth at milestones (25%, 50%, 75%, 100%) — fires ONCE per milestone
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      maxScrollDepth.current = Math.max(maxScrollDepth.current, scrollPercent);

      const milestones = [25, 50, 75, 100];
      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !firedMilestones.current.has(milestone)) {
          firedMilestones.current.add(milestone);
          window.gtag("event", "blog_scroll_depth", {
            event_category: "Blog Engagement",
            event_label: title,
            blog_slug: slug,
            scroll_depth: milestone,
          });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track time on page when leaving
    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        sendTimeSpent();
      }
    }

    function sendTimeSpent() {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      if (timeSpent < 2) return; // Skip accidental visits

      const expectedTime = readingTime * 60;
      const completionPercent = Math.min(100, Math.round((timeSpent / expectedTime) * 100));

      window.gtag("event", "blog_time_spent", {
        event_category: "Blog Engagement",
        event_label: title,
        blog_slug: slug,
        time_spent_seconds: timeSpent,
        reading_completion_percent: completionPercent,
        max_scroll_depth: maxScrollDepth.current,
        transport_type: "beacon",
      });
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", sendTimeSpent);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", sendTimeSpent);
    };
  }, [title, slug, categories, readingTime, publishedAt]);

  return null;
}
