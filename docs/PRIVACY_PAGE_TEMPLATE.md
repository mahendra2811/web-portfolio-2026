# Add a privacy page

The short-policy format uses one data file and one route. Use it for apps or web pages when the actual policy fits the section layout. The Hindu Calendar implementation is a working example.

## 1. Add the policy content

Create `src/data/my-product-privacy.ts`:

```ts
import type { SimplePrivacyPolicy } from "@/data/privacy-policy";

export const myProductPrivacy = {
  name: "My Product",
  lastUpdated: "29 September 2026",
  contactEmail: "mahendrapuniya92@gmail.com",
  intro: "Explain what the product does and the main privacy facts.",
  // Optional: Android package, website domain, or another identifier.
  identifier: { label: "Website", value: "example.com" },
  sections: [
    {
      id: "information",
      title: "Information we handle",
      paragraphs: ["State exactly what the product stores or collects."],
      bullets: ["Include each meaningful data category."],
    },
    {
      id: "choices",
      title: "Your choices",
      paragraphs: ["Explain how users control or delete their data."],
    },
  ],
  // Optional link back to a project or product page.
  relatedLink: { href: "/projects/my-product", label: "About My Product" },
} satisfies SimplePrivacyPolicy;
```

Replace every example sentence with facts checked against the product. Add sections for permissions, notifications, third parties, retention, backups, or transfers as needed. The shared page displays a contents list and contact email automatically. Section IDs must be unique and URL friendly.

## 2. Add the public URL

Create `src/app/privacy/my-product/page.tsx`:

```tsx
import { SimplePrivacyPolicyPage } from "@/components/privacy/SimplePrivacyPolicyPage";
import { myProductPrivacy } from "@/data/my-product-privacy";
import { createPrivacyMetadata } from "@/lib/privacy-metadata";

export const metadata = createPrivacyMetadata(
  myProductPrivacy,
  "/privacy/my-product",
  "Privacy policy for My Product.",
);

export default function Page() {
  return <SimplePrivacyPolicyPage policy={myProductPrivacy} />;
}
```

The policy URL is then `https://pooniya.com/privacy/my-product`. Add an entry to `src/data/privacy-index.ts` to show it on `/privacy`. If the product appears on `/projects`, add `privacyUrl: "/privacy/my-product"` to its entry in `src/data/projects.ts`.

## 3. Optional second URL

For a second path that displays the same content, create another route file like `src/app/projects/my-product/privacy/page.tsx`, import the same policy and page component, and keep `/privacy/my-product` as the canonical path in `createPrivacyMetadata`.

Before publishing, confirm the contact address, update date, and every data claim against the app's current build. Do not copy claims from another product's policy; its permissions and services may differ.
