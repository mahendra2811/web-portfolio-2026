export interface SimplePrivacyPolicy {
  name: string;
  lastUpdated: string;
  contactEmail: string;
  intro: string;
  identifier?: { label: string; value: string };
  sections: readonly {
    id: string;
    title: string;
    paragraphs?: readonly string[];
    bullets?: readonly string[];
  }[];
  contactText?: string;
  relatedLink?: { href: string; label: string };
}
