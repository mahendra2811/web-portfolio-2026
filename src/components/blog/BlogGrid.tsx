"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { PostCard } from "./PostCard";
import { PostCardCompact } from "./PostCardCompact";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { BlogPost } from "@/types";

type SortOption = "latest" | "oldest" | "a-z" | "z-a" | "reading-time-asc" | "reading-time-desc";

interface BlogGridProps {
  posts: BlogPost[];
}

// Configurable: how many posts to show initially per device
const INITIAL_LOAD = { mobile: 4, tablet: 6, desktop: 9 };
const LOAD_MORE_COUNT = { mobile: 4, tablet: 6, desktop: 6 };

function sortPosts(posts: BlogPost[], sort: SortOption): BlogPost[] {
  const sorted = [...posts];
  switch (sort) {
    case "latest":
      return sorted.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    case "oldest":
      return sorted.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    case "a-z":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "z-a":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "reading-time-asc":
      return sorted.sort((a, b) => a.readingTime - b.readingTime);
    case "reading-time-desc":
      return sorted.sort((a, b) => b.readingTime - a.readingTime);
    default:
      return sorted;
  }
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "a-z", label: "A → Z" },
  { value: "z-a", label: "Z → A" },
  { value: "reading-time-asc", label: "Quick Reads" },
  { value: "reading-time-desc", label: "Deep Dives" },
];

export function BlogGrid({ posts }: BlogGridProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const device = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";

  const [sort, setSort] = useState<SortOption>("latest");
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD[device]);
  const [allLoaded, setAllLoaded] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Sort posts
  const sortedPosts = useMemo(() => sortPosts(posts, sort), [posts, sort]);

  // Reset visible count when sort changes or device changes
  useEffect(() => {
    setVisibleCount(INITIAL_LOAD[device]);
    setAllLoaded(false);
  }, [sort, device]);

  // Background progressive loading — after initial paint, load remaining in batches
  useEffect(() => {
    if (allLoaded || visibleCount >= sortedPosts.length) {
      setAllLoaded(true);
      return;
    }

    const timer = setTimeout(() => {
      setVisibleCount((prev) => {
        const next = Math.min(prev + LOAD_MORE_COUNT[device], sortedPosts.length);
        if (next >= sortedPosts.length) setAllLoaded(true);
        return next;
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [visibleCount, sortedPosts.length, allLoaded, device]);

  // Also load more on scroll (IntersectionObserver as backup)
  const handleIntersect = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT[device], sortedPosts.length));
  }, [device, sortedPosts.length]);

  useEffect(() => {
    if (visibleCount >= sortedPosts.length) return;
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) handleIntersect(); },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleCount, sortedPosts.length, handleIntersect]);

  const visiblePosts = sortedPosts.slice(0, visibleCount);

  return (
    <div>
      {/* Sort/Filter Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--text-secondary)]">
          {sortedPosts.length} post{sortedPosts.length !== 1 ? "s" : ""}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                sort === opt.value
                  ? "border-primary-500 bg-primary-500/10 text-primary-400"
                  : "border-white/10 text-[var(--text-secondary)] hover:border-white/20 hover:bg-white/5 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid — device-specific layout */}
      {isMobile ? (
        <div className="space-y-4">
          {visiblePosts.map((post, i) => (
            <div
              key={post._id}
              className="animate-in fade-in"
              style={{ animationDelay: `${Math.min(i * 50, 300)}ms` }}
            >
              <PostCardCompact post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className={`grid gap-6 ${isTablet ? "grid-cols-2" : "grid-cols-3"}`}>
          {visiblePosts.map((post, i) => (
            <div
              key={post._id}
              className="animate-in fade-in"
              style={{ animationDelay: `${Math.min(i * 50, 300)}ms` }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}

      {/* Loading indicator */}
      {visibleCount < sortedPosts.length && (
        <div ref={loadMoreRef} className="py-8 text-center">
          <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-primary-500" />
          <p className="mt-2 text-xs text-[var(--text-secondary)]">
            Loading more posts...
          </p>
        </div>
      )}

      {/* All loaded */}
      {allLoaded && sortedPosts.length > INITIAL_LOAD[device] && (
        <p className="mt-6 text-center text-xs text-[var(--text-secondary)]">
          All {sortedPosts.length} posts loaded
        </p>
      )}
    </div>
  );
}
