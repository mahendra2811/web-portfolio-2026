import Link from "next/link";
import { formulaNestPrivacy as policy } from "@/data/formulanest-privacy";
import { createPrivacyMetadata } from "@/lib/privacy-metadata";

export const metadata = createPrivacyMetadata(
  policy,
  "/privacy/formulanest",
  "FormulaNest privacy policy: local study preferences, bookmarks, revision history, practice tests, sharing, backups, and deletion.",
);

export default function Page() {
  return (
    <main className="min-h-screen bg-white py-16 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <article className="mx-auto max-w-3xl px-6">
        <header className="mb-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Privacy Policy — {policy.name}
          </h1>
          <p className="mb-5 font-semibold">Last updated: {policy.lastUpdated}</p>
          <p className="text-base leading-7 text-neutral-700 dark:text-neutral-300">
            {policy.intro}
          </p>
        </header>

        <div className="space-y-9">
          {policy.sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2
                id={section.id}
                className="mb-3 scroll-mt-24 text-2xl font-semibold tracking-tight"
              >
                {section.title}
              </h2>
              <div className="space-y-4 text-base leading-7 text-neutral-700 dark:text-neutral-300">
                {section.blocks.map((block, index) =>
                  block.type === "paragraph" ? (
                    <p key={index}>{block.text}</p>
                  ) : (
                    <ul key={index} className="list-disc space-y-2 pl-6">
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
            </section>
          ))}

          <section aria-labelledby="contact">
            <h2 id="contact" className="mb-3 text-2xl font-semibold tracking-tight">
              Contact
            </h2>
            <div className="space-y-4 text-base leading-7 text-neutral-700 dark:text-neutral-300">
              <p>For privacy questions, contact:</p>
              <p>
                <strong>Developer or organization:</strong> {policy.developer}
              </p>
              <p>
                <strong>Privacy contact email:</strong>{" "}
                <a
                  href={`mailto:${policy.contactEmail}`}
                  className="text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  {policy.contactEmail}
                </a>
              </p>
            </div>
          </section>
        </div>

        <footer className="mt-12 border-t border-neutral-200 pt-6 text-sm dark:border-neutral-800">
          <Link href="/privacy" className="text-indigo-600 hover:underline dark:text-indigo-400">
            All privacy policies
          </Link>
        </footer>
      </article>
    </main>
  );
}
