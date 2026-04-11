import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

function highlight(text: string, query?: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-primary-500/20 px-0.5 text-inherit">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

interface PostCardCompactProps {
  post: BlogPost;
  searchQuery?: string;
}

export function PostCardCompact({ post, searchQuery }: PostCardCompactProps) {
  return (
    <article itemScope itemType="https://schema.org/BlogPosting">
      <Link
        href={`/blog/${post.slug.current}`}
        className="glass-card flex gap-4 rounded-xl p-3 transition-colors hover:border-white/10"
      >
        {/* Thumbnail */}
        <div className="bg-surface-muted relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <div className="gradient-mesh absolute inset-0 flex items-center justify-center">
              <span className="text-primary-500/20 text-xl font-bold">{post.title.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="mb-1 line-clamp-2 text-sm font-semibold leading-tight" itemProp="headline">
            {highlight(post.title, searchQuery)}
          </h3>
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <time dateTime={post.publishedAt} itemProp="datePublished">
              {formatDate(post.publishedAt)}
            </time>
            <span>&middot;</span>
            <span>{post.readingTime} min</span>
          </div>
          {post.categories.length > 0 && (
            <div className="mt-1.5 flex gap-1">
              {post.categories.slice(0, 2).map((cat) => (
                <Badge key={cat.slug.current} variant="primary" className="!px-1.5 !py-0 !text-[10px]">
                  {cat.title}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
