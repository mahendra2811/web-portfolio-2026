"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { PostCard } from "./PostCard";
import { PostCardCompact } from "./PostCardCompact";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { BlogPost } from "@/types";

// ── Types ────────────────────────────────────────────────────────
type SortOption = "latest" | "oldest" | "a-z" | "z-a" | "reading-time-asc" | "reading-time-desc";

type Category = { title: string; slug: { current: string } };

interface BlogGridProps {
  posts: BlogPost[];
  categories: Category[];
  activeCategory?: string;
}

// ── Constants ────────────────────────────────────────────────────
const INITIAL_LOAD = { mobile: 4, tablet: 6, desktop: 9 } as const;
const LOAD_MORE_BATCH = 6;

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "a-z", label: "A → Z" },
  { value: "z-a", label: "Z → A" },
  { value: "reading-time-asc", label: "Quick Reads" },
  { value: "reading-time-desc", label: "Deep Dives" },
];

// ── Helpers ──────────────────────────────────────────────────────
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

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-primary-500/20 px-0.5 text-white">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

// ── Component ────────────────────────────────────────────────────
export function BlogGrid({ posts, categories, activeCategory }: BlogGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const device = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";

  // ── URL state ──────────────────────────────────────────────────
  const sortParam = (searchParams.get("sort") as SortOption) || "latest";
  const categoryParam = searchParams.get("category") || "";
  const searchQuery = searchParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(searchQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      const qs = params.toString();
      router.replace(pathname + (qs ? `?${qs}` : ""), { scroll: false });
    },
    [searchParams, router, pathname],
  );

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateParam("q", searchInput);
    }, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchInput, updateParam]);

  // Keyboard shortcut: "/" focuses search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ── Filter + Sort pipeline ────────────────────────────────────
  const filteredAndSorted = useMemo(() => {
    let result = posts;

    // Category filter (only on /blog page, not category pages where posts are pre-filtered)
    if (categoryParam && !activeCategory) {
      result = result.filter((p) => p.categories.some((c) => c.slug.current === categoryParam));
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q),
      );
    }

    return sortPosts(result, sortParam);
  }, [posts, categoryParam, activeCategory, searchQuery, sortParam]);

  // ── Category counts (across ALL posts, not filtered) ──────────
  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      for (const cat of post.categories) {
        counts.set(cat.slug.current, (counts.get(cat.slug.current) || 0) + 1);
      }
    }
    return counts;
  }, [posts]);

  // ── Lazy loading ──────────────────────────────────────────────
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_LOAD.desktop);
  const prevCountRef = useRef(visibleCount);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Set correct initial load for device (after hydration)
  useEffect(() => {
    setVisibleCount(INITIAL_LOAD[device]);
  }, [device]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_LOAD[device]);
  }, [searchQuery, categoryParam, sortParam, device]);

  // IntersectionObserver — load more on scroll
  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_BATCH, filteredAndSorted.length));
  }, [filteredAndSorted.length]);

  useEffect(() => {
    if (visibleCount >= filteredAndSorted.length) return;
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) handleLoadMore(); },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleCount, filteredAndSorted.length, handleLoadMore]);

  // Track previous count for animation
  useEffect(() => {
    prevCountRef.current = visibleCount;
  });

  const visiblePosts = filteredAndSorted.slice(0, visibleCount);
  const activeCategorySlug = activeCategory || categoryParam;

  // ── Clear all filters ─────────────────────────────────────────
  const clearFilters = () => {
    setSearchInput("");
    router.replace(pathname, { scroll: false });
  };

  return (
    <div>
      {/* ── Search + Controls ──────────────────────────────────── */}
      <div className="mb-6 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder='Search posts... (press "/" to focus)'
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pr-9 pl-9 text-sm text-white placeholder-[var(--text-secondary)] outline-none transition-colors focus:border-primary-500/50 focus:bg-white/[0.07]"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput("")}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-[var(--text-secondary)] hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2">
          {activeCategory ? (
            <Link
              href="/blog"
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                !activeCategorySlug
                  ? "border-primary-500 bg-primary-500/10 text-primary-400"
                  : "border-white/10 text-[var(--text-secondary)] hover:border-white/20 hover:bg-white/5 hover:text-white"
              }`}
            >
              All ({posts.length})
            </Link>
          ) : (
            <button
              onClick={() => updateParam("category", "")}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                !categoryParam
                  ? "border-primary-500 bg-primary-500/10 text-primary-400"
                  : "border-white/10 text-[var(--text-secondary)] hover:border-white/20 hover:bg-white/5 hover:text-white"
              }`}
            >
              All ({posts.length})
            </button>
          )}

          {categories.map((cat) => {
            const count = categoryCounts.get(cat.slug.current) || 0;
            const isActive = activeCategorySlug === cat.slug.current;

            if (activeCategory) {
              return (
                <Link
                  key={cat.slug.current}
                  href={`/blog/category/${cat.slug.current}`}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    isActive
                      ? "border-primary-500 bg-primary-500/10 text-primary-400"
                      : "border-white/10 text-[var(--text-secondary)] hover:border-white/20 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {cat.title} ({count})
                </Link>
              );
            }

            return (
              <button
                key={cat.slug.current}
                onClick={() => updateParam("category", isActive ? "" : cat.slug.current)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  isActive
                    ? "border-primary-500 bg-primary-500/10 text-primary-400"
                    : "border-white/10 text-[var(--text-secondary)] hover:border-white/20 hover:bg-white/5 hover:text-white"
                }`}
              >
                {cat.title} ({count})
              </button>
            );
          })}
        </div>

        {/* Sort + Count */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[var(--text-secondary)]">
            {filteredAndSorted.length} post{filteredAndSorted.length !== 1 ? "s" : ""}
            {searchQuery && <> matching &ldquo;{searchQuery}&rdquo;</>}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateParam("sort", opt.value === "latest" ? "" : opt.value)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  sortParam === opt.value || (opt.value === "latest" && !searchParams.get("sort"))
                    ? "border-primary-500 bg-primary-500/10 text-primary-400"
                    : "border-white/10 text-[var(--text-secondary)] hover:border-white/20 hover:bg-white/5 hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── No results ─────────────────────────────────────────── */}
      {filteredAndSorted.length === 0 && (
        <div className="py-16 text-center">
          <p className="mb-2 text-lg text-[var(--text-secondary)]">No posts match your filters.</p>
          <button
            onClick={clearFilters}
            className="text-primary-400 hover:text-primary-300 text-sm underline underline-offset-2 transition-colors"
          >
            Clear all filters
          </button>
          {categories.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-xs text-[var(--text-secondary)]">Try a category:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.slice(0, 5).map((cat) => (
                  <button
                    key={cat.slug.current}
                    onClick={() => {
                      setSearchInput("");
                      updateParam("q", "");
                      updateParam("category", cat.slug.current);
                    }}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--text-secondary)] transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white"
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Grid ───────────────────────────────────────────────── */}
      {visiblePosts.length > 0 && (
        isMobile ? (
          <div className="space-y-4">
            {visiblePosts.map((post, i) => (
              <motion.div
                key={post._id}
                initial={i >= prevCountRef.current ? { opacity: 0, y: 16 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: i >= prevCountRef.current ? Math.min((i - prevCountRef.current) * 0.06, 0.3) : 0,
                }}
              >
                <PostCardCompact post={post} searchQuery={searchQuery} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post, i) => (
              <motion.div
                key={post._id}
                initial={i >= prevCountRef.current ? { opacity: 0, y: 16 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: i >= prevCountRef.current ? Math.min((i - prevCountRef.current) * 0.06, 0.3) : 0,
                }}
              >
                <PostCard post={post} searchQuery={searchQuery} />
              </motion.div>
            ))}
          </div>
        )
      )}

      {/* ── Load more sentinel / skeleton ──────────────────────── */}
      {visibleCount < filteredAndSorted.length && (
        <div ref={loadMoreRef} className="mt-6">
          <div className={`grid gap-6 ${isMobile ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {Array.from({ length: Math.min(3, filteredAndSorted.length - visibleCount) }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-xl border border-white/5 bg-white/[0.03]" />
            ))}
          </div>
        </div>
      )}

      {/* ── All loaded ─────────────────────────────────────────── */}
      {visibleCount >= filteredAndSorted.length && filteredAndSorted.length > INITIAL_LOAD[device] && (
        <p className="mt-8 text-center text-xs text-[var(--text-secondary)]">
          All {filteredAndSorted.length} posts loaded
        </p>
      )}
    </div>
  );
}

// ── Skeleton for Suspense fallback ───────────────────────────────
export function BlogGridSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-full animate-pulse rounded-lg bg-white/5" />
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-7 w-20 animate-pulse rounded-full bg-white/5" />
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="h-72 animate-pulse rounded-xl bg-white/5" />
        ))}
      </div>
    </div>
  );
}
