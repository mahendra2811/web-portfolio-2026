import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MessageSquare, FolderKanban, BookOpen, LayoutDashboard } from "lucide-react";

const adminLinks = [
  {
    href: "/admin/contacts",
    label: "Contact Submissions",
    icon: MessageSquare,
    description: "View messages from the contact form",
    ready: true,
  },
  {
    href: "/admin/projects",
    label: "Manage Projects",
    icon: FolderKanban,
    description: "Add, edit, or remove projects",
    ready: false,
  },
  {
    href: "/admin/blog",
    label: "Blog Management",
    icon: BookOpen,
    description: "Manage blog posts via Sanity",
    ready: false,
  },
];

export default function AdminDashboardPage() {
  return (
    <PageWrapper className="py-section-sm">
      <div className="mb-8 flex items-center gap-3">
        <LayoutDashboard className="text-primary-400 h-6 w-6" />
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">
          Admin Dashboard
        </h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {adminLinks.map(({ href, label, icon: Icon, description, ready }) => (
          <Link key={href} href={href}>
            <Card className="h-full">
              <div className="mb-3 flex items-start justify-between">
                <div className="glass rounded-card p-2">
                  <Icon className="text-primary-400 h-5 w-5" />
                </div>
                {!ready && <Badge variant="warning">Coming Soon</Badge>}
              </div>
              <h3 className="mb-1 font-semibold">{label}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}
