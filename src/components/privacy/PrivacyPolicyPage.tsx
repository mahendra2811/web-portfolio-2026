import type { ReactNode } from "react";

export type DataItem = {
  label: string;
  detail?: string;
};

export type Permission = {
  name: string;
  why: string;
  scope?: string;
  dataLeaves?: boolean;
};

export type ThirdParty = {
  name: string;
  purpose: string;
  href?: string;
};

export type AppMeta = {
  name: string;
  packageOrDomain: string;
  packageLabel?: string; // "Package Name" or "Domain" or "App ID"
  platform: string;
  minVersion?: string;
  minVersionLabel?: string;
  category: string;
  developer: string;
  developerCountry: string;
  contactEmail: string;
  policyUrl: string;
  effectiveDate: string;
  lastUpdated: string;
  policyVersion: string;
  distribution?: string; // "Google Play Store" or "Direct download / sideload"
};

export type PrivacyConfig = {
  app: AppMeta;
  intro: ReactNode; // 1-3 sentences describing what the app does
  tldr: ReactNode[]; // bullet list of key takeaways
  notCollected?: ReactNode[]; // overrides default list if provided
  collectedAuto: ReactNode[]; // bullets describing what's collected automatically
  collectedUserProvided?: ReactNode[]; // bullets describing user-provided info
  usageReasons?: ReactNode[]; // why we use collected data
  permissions?: Permission[]; // omit for web apps
  onDeviceStorage: ReactNode[];
  thirdParties: ThirdParty[];
  internationalTransfers?: ReactNode;
  retention?: ReactNode[]; // overrides default if provided
  optOutControls: ReactNode[];
  securityNotes?: ReactNode[];
  backupNote?: ReactNode;
  childrenNote?: ReactNode;
};

const DEFAULT_NOT_COLLECTED: ReactNode[] = [
  <><strong>Personally identifiable information (PII)</strong> — name, email, phone number, address, government IDs, or financial details. The App does not ask for any of these.</>,
  <><strong>Account credentials</strong> — there are no accounts to log into.</>,
  <><strong>Precise or coarse location data</strong> — GPS, Wi-Fi triangulation, cell-tower, or IP-derived location are not used.</>,
  <><strong>Contacts, SMS, calendar, call logs, or microphone audio</strong> (unless explicitly required by the App&apos;s purpose and listed in §7).</>,
  <><strong>Photos or media outside what you explicitly choose</strong> via the system file picker.</>,
  <><strong>Biometric data</strong> — when biometric authentication is used, it is handled by the operating system; the App never sees the biometric template.</>,
  <><strong>Advertising identifiers</strong> — the App does not request or use the Google Advertising ID. <strong>No AdMob, no ad SDKs are integrated.</strong></>,
];

const DEFAULT_USAGE: ReactNode[] = [
  <><strong>Diagnose and fix crashes</strong> and stability issues in the App.</>,
  <><strong>Measure feature usage in aggregate</strong> to decide what to improve next.</>,
  <><strong>Monitor App performance</strong> to keep the App fast on entry-level devices.</>,
  <><strong>Respond to your direct support email</strong>, if you send one.</>,
  <><strong>Comply with legal obligations</strong> when required.</>,
];

const DEFAULT_RETENTION: ReactNode[] = [
  <><strong>Your data inside the App:</strong> stored on your Device for as long as you keep it. Deleting it inside the App or clearing app storage removes it immediately.</>,
  <><strong>Anonymized analytics events:</strong> retained by Firebase according to Google&apos;s default retention windows (up to 14 months for event-level data).</>,
  <><strong>Crash reports:</strong> retained for up to 90 days by Firebase Crashlytics.</>,
  <><strong>Support emails:</strong> retained as long as needed to resolve your request, then for a reasonable period for record-keeping. You may request deletion at any time.</>,
];

type Toc = { id: string; label: string };

const TOC: Toc[] = [
  { id: "about", label: "1. About This Policy" },
  { id: "summary", label: "2. Quick Summary (TL;DR)" },
  { id: "definitions", label: "3. Definitions" },
  { id: "not-collected", label: "4. What We Do NOT Collect" },
  { id: "collected", label: "5. Information We Collect" },
  { id: "use", label: "6. How We Use Information" },
  { id: "permissions", label: "7. Device Permissions" },
  { id: "on-device", label: "8. On-Device Data Storage" },
  { id: "third-parties", label: "9. Third-Party Services" },
  { id: "transfers", label: "10. International Data Transfers" },
  { id: "retention", label: "11. Data Retention" },
  { id: "rights", label: "12. Your Rights (DPDP Act 2023)" },
  { id: "controls", label: "13. Opt-Out and Controls" },
  { id: "children", label: "14. Children's Privacy" },
  { id: "security", label: "15. Security" },
  { id: "backup", label: "16. Backup and Sync" },
  { id: "changes", label: "17. Changes to This Policy" },
  { id: "grievance", label: "18. Grievance Officer" },
  { id: "contact", label: "19. Contact Us" },
];

const TOC_NO_PERMISSIONS: Toc[] = TOC.filter((t) => t.id !== "permissions").map(
  (t, idx) => ({ ...t, label: `${idx + 1}. ${t.label.replace(/^\d+\. /, "")}` }),
);

export function PrivacyPolicyPage({ config }: { config: PrivacyConfig }) {
  const { app } = config;
  const hasPermissions = !!config.permissions && config.permissions.length > 0;
  const toc = hasPermissions ? TOC : TOC_NO_PERMISSIONS;
  const notCollected = config.notCollected ?? DEFAULT_NOT_COLLECTED;
  const usage = config.usageReasons ?? DEFAULT_USAGE;
  const retention = config.retention ?? DEFAULT_RETENTION;
  const packageLabel = app.packageLabel ?? "Package Name";
  const minVersionLabel = app.minVersionLabel ?? "Minimum Version";

  return (
    <main className="min-h-screen bg-white py-16 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <article className="prose prose-neutral mx-auto max-w-3xl px-6 dark:prose-invert">
        {/* Header */}
        <header className="not-prose mb-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Privacy Policy
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
            {app.name} — Privacy Policy
          </h1>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            <MetaRow label="Application" value={app.name} />
            <MetaRow label={packageLabel} value={app.packageOrDomain} mono />
            <MetaRow label="Platform" value={app.platform} />
            {app.distribution && (
              <MetaRow label="Distribution" value={app.distribution} />
            )}
            {app.minVersion && (
              <MetaRow label={minVersionLabel} value={app.minVersion} />
            )}
            <MetaRow label="Category" value={app.category} />
            <MetaRow
              label="Developer"
              value={`${app.developer} (${app.developerCountry})`}
            />
            <div>
              <dt className="font-semibold text-neutral-500 dark:text-neutral-400">
                Contact
              </dt>
              <dd>
                <a
                  href={`mailto:${app.contactEmail}`}
                  className="text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  {app.contactEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-neutral-500 dark:text-neutral-400">
                Policy URL
              </dt>
              <dd>
                <a
                  href={app.policyUrl}
                  className="break-all text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  {app.policyUrl}
                </a>
              </dd>
            </div>
            <MetaRow label="Effective Date" value={app.effectiveDate} />
            <MetaRow label="Last Updated" value={app.lastUpdated} />
            <MetaRow label="Policy Version" value={`v${app.policyVersion}`} />
          </dl>
        </header>

        {/* Table of Contents */}
        <nav
          aria-label="Table of contents"
          className="not-prose mb-12 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Contents
          </h2>
          <ol className="grid grid-cols-1 gap-y-1 text-sm sm:grid-cols-2">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-neutral-700 hover:text-indigo-600 hover:underline dark:text-neutral-300 dark:hover:text-indigo-400"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* 1. About */}
        <h2 id="about">1. About This Policy</h2>
        <p>
          This Privacy Policy (the &quot;Policy&quot;) describes how the{" "}
          <strong>{app.name}</strong> application (the &quot;Application&quot;,
          the &quot;App&quot;), identified by{" "}
          <code>{app.packageOrDomain}</code>, handles information when you
          install or use it.
        </p>
        <div className="not-prose my-4">{config.intro}</div>
        <p>
          The Application is developed and operated by{" "}
          <strong>{app.developer}</strong> (the &quot;Developer&quot;,
          &quot;Service Provider&quot;, &quot;we&quot;, &quot;us&quot;,
          &quot;our&quot;). It is provided on an &quot;AS IS&quot; basis.
        </p>
        <p>
          This Policy is designed to comply with the{" "}
          <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>{" "}
          of India, the Google Play{" "}
          <strong>Developer Program Policies</strong>, the Play{" "}
          <strong>Data Safety</strong> disclosure requirements, and applicable
          provisions of the EU General Data Protection Regulation (GDPR) where
          relevant.
        </p>

        {/* 2. Summary */}
        <h2 id="summary">2. Quick Summary (TL;DR)</h2>
        <p>If you only read one section, read this:</p>
        <ul>
          {config.tldr.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        {/* 3. Definitions */}
        <h2 id="definitions">3. Definitions</h2>
        <ul>
          <li>
            <strong>&quot;Application&quot;</strong> / <strong>&quot;App&quot;</strong>{" "}
            — the {app.name} software identified by{" "}
            <code>{app.packageOrDomain}</code>.
          </li>
          <li>
            <strong>&quot;User&quot;</strong> / <strong>&quot;You&quot;</strong>{" "}
            — any natural person who installs, opens, or otherwise uses the
            Application.
          </li>
          <li>
            <strong>&quot;Personal Data&quot;</strong> — any data relating to
            an identified or identifiable natural person, as defined by the
            DPDP Act 2023.
          </li>
          <li>
            <strong>&quot;Diagnostic Data&quot;</strong> — anonymized crash
            reports, performance metrics, and aggregated usage events sent to
            our third-party services.
          </li>
          <li>
            <strong>&quot;On-Device&quot;</strong> — computation, storage, or
            processing that occurs entirely on your device with no network
            transmission.
          </li>
        </ul>

        {/* 4. Not Collected */}
        <h2 id="not-collected">4. What We Do NOT Collect</h2>
        <p>
          The following are <strong>never</strong> transmitted off your device
          by the Application:
        </p>
        <ol>
          {notCollected.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>

        {/* 5. Collected */}
        <h2 id="collected">5. Information We Collect</h2>

        <h3>5.1 Information Collected Automatically (Diagnostic Data)</h3>
        <p>
          When analytics are enabled (see §13 for how to disable), the
          following anonymized, aggregated data may be collected:
        </p>
        <ul>
          {config.collectedAuto.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h3>5.2 Information You Provide (Optional)</h3>
        <ul>
          {(config.collectedUserProvided ?? [
            <>
              <strong>If you contact us by email</strong> at{" "}
              <a href={`mailto:${app.contactEmail}`}>{app.contactEmail}</a>,
              we will receive whatever you write in that email. We use this
              only to respond to your request.
            </>,
          ]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        {/* 6. Use */}
        <h2 id="use">6. How We Use Information</h2>
        <p>The limited information described in §5 is used only to:</p>
        <ol>
          {usage.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
        <p>
          We do <strong>not</strong> use any collected information for
          advertising, profiling, automated decision-making with legal
          consequences, or resale.
        </p>

        {/* 7. Permissions (only if applicable) */}
        {hasPermissions && (
          <>
            <h2 id="permissions">7. Device Permissions</h2>
            <p>
              The Application requests only the runtime permissions it needs
              to function. You may grant or deny each permission individually.
            </p>
            {config.permissions!.map((p, i) => (
              <div key={i} className="mb-4">
                <h3 className="mb-1">
                  7.{i + 1} {p.name}
                </h3>
                <ul>
                  <li>
                    <strong>Why:</strong> {p.why}
                  </li>
                  {p.scope && (
                    <li>
                      <strong>Scope:</strong> {p.scope}
                    </li>
                  )}
                  {typeof p.dataLeaves === "boolean" && (
                    <li>
                      <strong>Data leaves the device:</strong>{" "}
                      {p.dataLeaves ? "Yes" : "No"}
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </>
        )}

        {/* 8. On-device */}
        <h2 id="on-device">8. On-Device Data Storage</h2>
        <p>
          The Application stores the following on your device only, in
          private storage that other apps cannot access:
        </p>
        <ul>
          {config.onDeviceStorage.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        {/* 9. Third parties */}
        <h2 id="third-parties">9. Third-Party Services</h2>
        <p>
          The Application uses the following third-party services, each of
          which has its own privacy policy. We have configured each to collect
          the minimum data needed to function.
        </p>
        <ul>
          {config.thirdParties.map((tp, i) => (
            <li key={i}>
              <strong>{tp.name}</strong> — {tp.purpose}
              {tp.href && (
                <>
                  {" "}
                  (
                  <a href={tp.href} target="_blank" rel="noreferrer">
                    privacy info
                  </a>
                  )
                </>
              )}
            </li>
          ))}
        </ul>
        <p>We may disclose information described in §5:</p>
        <ul>
          <li>
            as required by law, such as to comply with a subpoena, court
            order, or similar legal process from Indian authorities;
          </li>
          <li>
            when we believe in good faith that disclosure is necessary to
            protect our rights, protect your safety or the safety of others,
            investigate fraud, or respond to a lawful government request;
          </li>
          <li>
            with trusted service providers listed above, who process data on
            our behalf, do not use the data for independent purposes, and
            have agreed to safeguards consistent with this Policy.
          </li>
        </ul>

        {/* 10. Transfers */}
        <h2 id="transfers">10. International Data Transfers</h2>
        <div className="not-prose my-4">
          {config.internationalTransfers ?? (
            <p className="prose prose-neutral dark:prose-invert">
              The third-party services listed in §9 are operated primarily by
              Google LLC and may process the anonymized diagnostic data
              described in §5 on servers located outside India, including in
              the United States and the European Union. Google maintains
              contractual and technical safeguards, including Standard
              Contractual Clauses where applicable. By using the Application
              with analytics enabled, you consent to this processing.
            </p>
          )}
        </div>

        {/* 11. Retention */}
        <h2 id="retention">11. Data Retention</h2>
        <ul>
          {retention.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p>
          To request deletion of any data associated with your installation,
          contact us at{" "}
          <a href={`mailto:${app.contactEmail}`}>{app.contactEmail}</a>.
        </p>

        {/* 12. Rights */}
        <h2 id="rights">12. Your Rights (DPDP Act 2023)</h2>
        <p>
          Under the Digital Personal Data Protection Act, 2023, you have the
          following rights:
        </p>
        <ol>
          <li>
            <strong>Right to access</strong> — you may request a summary of
            the personal data we hold about you.
          </li>
          <li>
            <strong>Right to correction and erasure</strong> — you may request
            that inaccurate data be corrected, or that your data be deleted.
          </li>
          <li>
            <strong>Right to grievance redressal</strong> — contact our
            Grievance Officer (see §18).
          </li>
          <li>
            <strong>Right to nominate</strong> — you may nominate another
            individual to exercise your rights in case of your death or
            incapacity.
          </li>
          <li>
            <strong>Right to withdraw consent</strong> — at any time you may
            disable analytics in the App and uninstall it.
          </li>
        </ol>
        <p>
          To exercise any of these rights, write to{" "}
          <a href={`mailto:${app.contactEmail}`}>{app.contactEmail}</a>. We
          will respond within a reasonable time, typically within 30 days.
        </p>

        {/* 13. Controls */}
        <h2 id="controls">13. Opt-Out and Controls</h2>
        <ul>
          {config.optOutControls.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        {/* 14. Children */}
        <h2 id="children">14. Children&apos;s Privacy</h2>
        <div className="not-prose my-4">
          {config.childrenNote ?? (
            <p className="prose prose-neutral dark:prose-invert">
              The Application is intended for general use by adults. We do
              not direct the Application to children under 13 and we do not
              knowingly collect personal information from children. If you
              are under 18 in India (or under the age of digital consent in
              your country), you should obtain consent from a parent or
              legal guardian before installing the App. If you believe a
              child has provided personal information through the App,
              please contact{" "}
              <a href={`mailto:${app.contactEmail}`}>{app.contactEmail}</a>{" "}
              and we will take prompt steps to delete it.
            </p>
          )}
        </div>

        {/* 15. Security */}
        <h2 id="security">15. Security</h2>
        <ul>
          {(config.securityNotes ?? [
            <>
              All network traffic uses HTTPS / TLS 1.2 or higher.
            </>,
            <>
              The Application stores sensitive data in private app storage
              that other apps cannot access.
            </>,
            <>
              Despite our efforts, no method of transmission over the
              Internet or method of electronic storage is 100% secure. We
              cannot guarantee absolute security.
            </>,
          ]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        {/* 16. Backup */}
        <h2 id="backup">16. Backup and Sync</h2>
        <div className="not-prose my-4">
          {config.backupNote ?? (
            <p className="prose prose-neutral dark:prose-invert">
              The Application does <strong>not</strong> run any automatic
              cloud backup or sync of your data. Android&apos;s system-level
              backup may include the App&apos;s private storage, depending
              on your device settings. You can disable this in Android
              Settings → System → Backup.
            </p>
          )}
        </div>

        {/* 17. Changes */}
        <h2 id="changes">17. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we do,
          we will:
        </p>
        <ul>
          <li>update the &quot;Last Updated&quot; date at the top of this page;</li>
          <li>bump the Policy Version number for material changes;</li>
          <li>
            for significant changes that affect your rights, surface an
            in-app notice on next launch.
          </li>
        </ul>
        <p>
          Continued use of the Application after a change becomes effective
          constitutes your acceptance of the updated Policy.
        </p>

        {/* 18. Grievance Officer */}
        <h2 id="grievance">18. Grievance Officer</h2>
        <p>
          In compliance with the DPDP Act 2023 and the Information Technology
          Act 2000, the Grievance Officer for the Application is:
        </p>
        <ul>
          <li>
            <strong>Name:</strong> {app.developer}
          </li>
          <li>
            <strong>Designation:</strong> Developer &amp; Data Protection
            Contact, {app.name}
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${app.contactEmail}`}>{app.contactEmail}</a>
          </li>
          <li>
            <strong>Jurisdiction:</strong> {app.developerCountry}
          </li>
          <li>
            <strong>Response window:</strong> within 30 days of receipt of a
            valid request, in accordance with the DPDP Act.
          </li>
        </ul>

        {/* 19. Contact */}
        <h2 id="contact">19. Contact Us</h2>
        <p>
          For any questions, concerns, requests, or complaints regarding this
          Privacy Policy or your data, write to us at{" "}
          <a href={`mailto:${app.contactEmail}`}>{app.contactEmail}</a>.
        </p>
        <p>
          Please include &quot;{app.name} Privacy&quot; in the subject line so
          we can route your request quickly.
        </p>

        <hr />

        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          By installing or using the Application, you acknowledge that you
          have read and understood this Privacy Policy and consent to the
          processing of your information as described herein.
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          <strong>Effective Date:</strong> {app.effectiveDate} ·{" "}
          <strong>Last Updated:</strong> {app.lastUpdated} ·{" "}
          <strong>Version:</strong> v{app.policyVersion}
        </p>
      </article>
    </main>
  );
}

function MetaRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="font-semibold text-neutral-500 dark:text-neutral-400">
        {label}
      </dt>
      <dd
        className={
          mono
            ? "font-mono text-neutral-900 dark:text-neutral-100"
            : "text-neutral-900 dark:text-neutral-100"
        }
      >
        {value}
      </dd>
    </div>
  );
}
