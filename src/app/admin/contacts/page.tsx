import { PageWrapper } from "@/components/layout/PageWrapper";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminContactsPage() {
  const supabase = await createSupabaseServerClient();

  let contacts: { id: string; name: string; email: string; subject: string | null; message: string; is_read: boolean; created_at: string }[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) contacts = data;
  }

  return (
    <PageWrapper className="py-section-sm">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-6">Contact Submissions</h1>

      {contacts.length === 0 ? (
        <Card>
          <p className="text-[var(--text-secondary)] text-center py-8">
            {supabase ? "No contact submissions yet." : "Supabase not configured. Connect your database to view submissions."}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Card key={contact.id}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{contact.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{contact.email}</p>
                </div>
                <Badge variant={contact.is_read ? "default" : "accent"}>
                  {contact.is_read ? "Read" : "New"}
                </Badge>
              </div>
              {contact.subject && <p className="text-sm font-medium mb-1">{contact.subject}</p>}
              <p className="text-sm text-[var(--text-secondary)]">{contact.message}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-2">
                {new Date(contact.created_at).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
