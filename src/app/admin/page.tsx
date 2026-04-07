import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MessageSquare, FolderKanban, BookOpen, LayoutDashboard } from "lucide-react";

const adminLinks = [
  { href: "/admin/contacts", label: "Contact Submissions", icon: MessageSquare, description: "View messages from the contact form", ready: true },
  { href: "/admin/projects", label: "Manage Projects", icon: FolderKanban, description: "Add, edit, or remove projects", ready: false },
  { href: "/admin/blog", label: "Blog Management", icon: BookOpen, description: "Manage blog posts via Sanity", ready: false },
];

export default function AdminDashboardPage() {
  return (
    <PageWrapper className="py-section-sm">
      <div className="flex items-center gap-3 mb-8">
        <LayoutDashboard className="h-6 w-6 text-primary-400" />
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Admin Dashboard</h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminLinks.map(({ href, label, icon: Icon, description, ready }) => (
          <Link key={href} href={href}>
            <Card className="h-full">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 glass rounded-card">
                  <Icon className="h-5 w-5 text-primary-400" />
                </div>
                {!ready && <Badge variant="warning">Coming Soon</Badge>}
              </div>
              <h3 className="font-semibold mb-1">{label}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}
