import { PageWrapper } from "@/components/layout/PageWrapper";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function AdminProjectsPage() {
  return (
    <PageWrapper className="py-section-sm">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Manage Projects</h1>
        <Badge variant="warning">Coming Soon</Badge>
      </div>
      <Card>
        <p className="text-[var(--text-secondary)] text-center py-8">
          Project management via the admin panel is coming soon. Currently, projects are defined in <code className="text-primary-400 font-[family-name:var(--font-mono)]">src/data/projects.ts</code>.
        </p>
      </Card>
    </PageWrapper>
  );
}
