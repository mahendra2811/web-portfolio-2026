import Link from "next/link";
import type { SimplePrivacyPolicy } from "@/data/privacy-policy";

export function SimplePrivacyPolicyPage({ policy }: { policy: SimplePrivacyPolicy }) {
  return (
    <main className="min-h-screen bg-white py-16 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <article className="mx-auto max-w-3xl px-6">
        <header className="mb-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="mb-2 text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
            Privacy Policy
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{policy.name}</h1>
          <p className="mb-5 text-base leading-7 text-neutral-700 dark:text-neutral-300">
            {policy.intro}
          </p>
          <dl className="grid gap-3 border-t border-neutral-200 pt-5 text-sm sm:grid-cols-2 dark:border-neutral-800">
            {policy.identifier && (
              <div>
                <dt className="font-semibold text-neutral-500 dark:text-neutral-400">
                  {policy.identifier.label}
                </dt>
                <dd className="mt-1 font-mono">{policy.identifier.value}</dd>
              </div>
            )}
            <div>
              <dt className="font-semibold text-neutral-500 dark:text-neutral-400">Last updated</dt>
              <dd className="mt-1">{policy.lastUpdated}</dd>
            </div>
          </dl>
        </header>

        <nav
          aria-label="Policy contents"
          className="mb-10 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800"
        >
          <h2 className="mb-3 text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
            Contents
          </h2>
          <ul className="grid gap-2 text-sm sm:grid-cols-2">
            {policy.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  {section.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="text-indigo-600 hover:underline dark:text-indigo-400">
                Contact
              </a>
            </li>
          </ul>
        </nav>

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
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc space-y-2 pl-6">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          <section aria-labelledby="contact">
            <h2 id="contact" className="mb-3 scroll-mt-24 text-2xl font-semibold tracking-tight">
              Contact
            </h2>
            <p className="text-base leading-7 text-neutral-700 dark:text-neutral-300">
              {policy.contactText ??
                "For questions about this product or its privacy practices, email"}{" "}
              <a
                href={`mailto:${policy.contactEmail}`}
                className="text-indigo-600 hover:underline dark:text-indigo-400"
              >
                {policy.contactEmail}
              </a>
              . If you contact us, we receive the information you choose to send in your email.
            </p>
          </section>
        </div>

        <footer className="mt-12 border-t border-neutral-200 pt-6 text-sm dark:border-neutral-800">
          {policy.relatedLink && (
            <>
              <Link
                href={policy.relatedLink.href}
                className="text-indigo-600 hover:underline dark:text-indigo-400"
              >
                {policy.relatedLink.label}
              </Link>
              <span className="mx-3 text-neutral-400">·</span>
            </>
          )}
          <Link href="/privacy" className="text-indigo-600 hover:underline dark:text-indigo-400">
            All privacy policies
          </Link>
        </footer>
      </article>
    </main>
  );
}
