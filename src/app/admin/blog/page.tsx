import { PageWrapper } from "@/components/layout/PageWrapper";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function AdminBlogPage() {
  return (
    <PageWrapper className="py-section-sm">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Blog Management</h1>
        <Badge variant="warning">Coming Soon</Badge>
      </div>
      <Card>
        <div className="text-center py-8">
          <p className="text-[var(--text-secondary)] mb-4">
            Blog content is managed through Sanity CMS.
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Set up your Sanity project following <code className="text-primary-400 font-[family-name:var(--font-mono)]">docs/SANITY_SETUP.md</code>, then access Sanity Studio to create and manage posts.
          </p>
        </div>
      </Card>
    </PageWrapper>
  );
}
