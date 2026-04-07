import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug.current}`}>
      <Card className="overflow-hidden group h-full">
        <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden bg-surface-muted">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 gradient-mesh flex items-center justify-center">
              <span className="text-4xl font-bold text-primary-500/20 font-[family-name:var(--font-display)]">
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

        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.categories.map((cat) => (
            <Badge key={cat.slug.current} variant="primary">{cat.title}</Badge>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">{post.excerpt}</p>

        <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime} min read
          </span>
        </div>
      </Card>
    </Link>
  );
}
