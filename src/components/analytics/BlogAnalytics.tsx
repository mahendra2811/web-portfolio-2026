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

    // Track scroll depth
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent > maxScrollDepth.current) {
        maxScrollDepth.current = scrollPercent;

        // Fire events at 25%, 50%, 75%, 100% milestones
        const milestones = [25, 50, 75, 100];
        for (const milestone of milestones) {
          if (scrollPercent >= milestone && maxScrollDepth.current - scrollPercent < 5) {
            window.gtag("event", "blog_scroll_depth", {
              event_category: "Blog Engagement",
              event_label: title,
              blog_slug: slug,
              scroll_depth: milestone,
            });
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track time on page when leaving
    function handleBeforeUnload() {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      const expectedTime = readingTime * 60;
      const completionPercent = Math.min(100, Math.round((timeSpent / expectedTime) * 100));

      window.gtag("event", "blog_time_spent", {
        event_category: "Blog Engagement",
        event_label: title,
        blog_slug: slug,
        time_spent_seconds: timeSpent,
        reading_completion_percent: completionPercent,
        max_scroll_depth: maxScrollDepth.current,
      });
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [title, slug, categories, readingTime, publishedAt]);

  return null;
}
