import { PageWrapper } from "@/components/layout/PageWrapper";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function AdminProjectsPage() {
  return (
    <PageWrapper className="py-section-sm">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">
          Manage Projects
        </h1>
        <Badge variant="warning">Coming Soon</Badge>
      </div>
      <Card>
        <p className="py-8 text-center text-[var(--text-secondary)]">
          Project management via the admin panel is coming soon. Currently, projects are defined in{" "}
          <code className="text-primary-400 font-[family-name:var(--font-mono)]">
            src/data/projects.ts
          </code>
          .
        </p>
      </Card>
    </PageWrapper>
  );
}
