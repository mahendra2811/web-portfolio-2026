import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faClock } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article itemScope itemType="https://schema.org/BlogPosting">
      <Link href={`/blog/${post.slug.current}`}>
        <Card className="group h-full overflow-hidden">
          <div className="bg-surface-muted relative -mx-6 -mt-6 mb-4 h-48 overflow-hidden">
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="gradient-mesh absolute inset-0 flex items-center justify-center">
                <span className="text-primary-500/20 font-[family-name:var(--font-display)] text-4xl font-bold">
                  {post.title.charAt(0)}
                </span>
              </div>
            )}
            {post.isPlaceholder && (
              <div className="absolute top-3 right-3">
                <Badge variant="warning">Coming Soon</Badge>
              </div>
            )}
          </div>

          <div className="mb-3 flex flex-wrap gap-1.5">
            {post.categories.map((cat) => (
              <Badge key={cat.slug.current} variant="primary">
                {cat.title}
              </Badge>
            ))}
          </div>

          <h3
            className="group-hover:text-primary-400 mb-2 line-clamp-2 text-lg font-semibold transition-colors"
            itemProp="headline"
          >
            {post.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-[var(--text-secondary)]" itemProp="description">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
            <time dateTime={post.publishedAt} className="flex items-center gap-1" itemProp="datePublished">
              <FontAwesomeIcon
                icon={faCalendarDays}
                className="h-3.5 w-3.5"
                style={{ color: "#6366F1" }}
              />
              {formatDate(post.publishedAt)}
            </time>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} className="h-3.5 w-3.5" style={{ color: "#06B6D4" }} />
              {post.readingTime} min read
            </span>
          </div>
        </Card>
      </Link>
    </article>
  );
}
