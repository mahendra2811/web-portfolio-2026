import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";
const contactEmail = "mahendrapuniya92@gmail.com";
const effectiveDate = "2026-05-24";

export const metadata: Metadata = {
  title: "pdfNest — Privacy Policy",
  description:
    "Privacy policy for the pdfNest Android application. All PDF and document processing happens 100% on-device. Files never leave your phone.",
  alternates: { canonical: `${siteUrl}/pdfnest/privacy` },
  openGraph: {
    title: "pdfNest — Privacy Policy",
    description:
      "Privacy policy for the pdfNest Android application. All PDF and document processing happens 100% on-device.",
    url: `${siteUrl}/pdfnest/privacy`,
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function PdfNestPrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-16 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <article className="prose prose-neutral mx-auto max-w-3xl px-6 dark:prose-invert">
        <h1>Privacy Policy</h1>

        <p>
          This privacy policy applies to the <strong>pdfNest</strong> Android
          application (hereby referred to as &quot;Application&quot;) for mobile
          devices, created by Mahendra Singh Puniya (hereby referred to as
          &quot;Service Provider&quot;) as a free, on-device service. The
          Application is provided &quot;AS IS&quot;.
        </p>

        <p>
          <strong>The core principle:</strong> all PDF, document, scan, and
          image processing performed by pdfNest happens entirely on your device.
          Your files, file contents, document text, and scanned images are{" "}
          <strong>never uploaded</strong> to any server, never shared with the
          Service Provider, and never transmitted to any third party.
        </p>

        <h2>Information Collection and Use</h2>

        <p>
          The Application collects a limited amount of diagnostic and usage
          information when you use it, exclusively through Google Firebase
          services. This information may include:
        </p>
        <ul>
          <li>Your device&apos;s Internet Protocol address (e.g. IP address)</li>
          <li>
            The screens of the Application that you visit, the time and date of
            your visit, and the time spent on those screens
          </li>
          <li>The total time spent in the Application</li>
          <li>
            The operating system, OS version, device model, and language settings
            on your mobile device
          </li>
          <li>
            Anonymized crash reports and stack traces (via Firebase Crashlytics)
            when the Application encounters an error
          </li>
        </ul>

        <p>
          The Application <strong>does not</strong> collect precise or coarse
          location information about your mobile device.
        </p>

        <p>
          The Application <strong>does not</strong> use Artificial Intelligence
          (AI) technologies to process your data or your documents. All OCR
          (text recognition) is performed on-device using Google ML Kit, which
          does not transmit document content to any server.
        </p>

        <p>
          The Application <strong>does not</strong> require you to create an
          account, log in, or provide any personally identifiable information to
          function. All features are available without registration.
        </p>

        <h2>Third-Party Services</h2>

        <p>
          The Application uses the following Google Firebase services, which
          process only the anonymized analytics and diagnostic data described
          above:
        </p>
        <ul>
          <li>
            <strong>Firebase Analytics</strong> — anonymized usage statistics
          </li>
          <li>
            <strong>Firebase Crashlytics</strong> — anonymized crash reports
          </li>
          <li>
            <strong>Firebase Performance Monitoring</strong> — anonymized
            performance metrics
          </li>
          <li>
            <strong>Firebase Remote Config</strong> — feature flag delivery
          </li>
          <li>
            <strong>Firebase Cloud Messaging</strong> — optional push
            notifications for app updates and tips (you may disable these in
            your device&apos;s notification settings)
          </li>
        </ul>

        <p>
          The Service Provider may disclose User Provided and Automatically
          Collected Information:
        </p>
        <ul>
          <li>
            as required by law, such as to comply with a subpoena or similar
            legal process;
          </li>
          <li>
            when they believe in good faith that disclosure is necessary to
            protect their rights, protect your safety or the safety of others,
            investigate fraud, or respond to a government request;
          </li>
          <li>
            with trusted service providers (Google Firebase) who work on their
            behalf, do not have an independent use of the information disclosed
            to them, and have agreed to adhere to the rules set forth in this
            privacy statement.
          </li>
        </ul>

        <h2>Opt-Out Rights</h2>

        <p>You can stop the collection of analytics information at any time by:</p>
        <ul>
          <li>
            Opening pdfNest, going to <strong>Settings → Privacy</strong>, and
            turning off the &quot;Help improve pdfNest&quot; toggle. This stops
            Firebase Analytics and Performance Monitoring. Crashlytics will
            continue to collect anonymized crash reports so the Service Provider
            can fix bugs; you can disable crash reporting from the same screen.
          </li>
          <li>
            Uninstalling the Application, using the standard uninstall process
            available on your mobile device or via the Google Play Store.
          </li>
        </ul>

        <h2>Data Retention Policy</h2>

        <p>
          The Service Provider will retain anonymized analytics data for as long
          as it is useful to improve the Application and for a reasonable time
          thereafter. If you would like the Service Provider to delete any data
          associated with your device&apos;s instance of the Application, please
          contact them at{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a> and they will
          respond within a reasonable time.
        </p>

        <h2>Children</h2>

        <p>
          The Service Provider does not use the Application to knowingly solicit
          data from or market to children under the age of 13.
        </p>

        <p>
          The Service Provider does not knowingly collect personally
          identifiable information from children. The Service Provider
          encourages all children to never submit any personally identifiable
          information through the Application and/or Services. The Service
          Provider encourages parents and legal guardians to monitor their
          children&apos;s internet usage and to help enforce this Policy by
          instructing their children never to provide personally identifiable
          information through the Application and/or Services without their
          permission. If you have reason to believe that a child has provided
          personally identifiable information to the Service Provider through
          the Application and/or Services, please contact the Service Provider
          at <a href={`mailto:${contactEmail}`}>{contactEmail}</a> so that they
          will be able to take the necessary actions. You must also be at least
          16 years of age to consent to the processing of your personally
          identifiable information in your country (in some countries the
          Service Provider may allow your parent or guardian to do so on your
          behalf).
        </p>

        <h2>Security</h2>

        <p>
          The Service Provider is concerned about safeguarding the
          confidentiality of your information. Because all your document and
          file content stays on your device, the strongest security guarantee
          comes from this design itself: there is no server-side copy of your
          documents to be breached. For the limited anonymized analytics that
          are transmitted, the Service Provider relies on Google Firebase&apos;s
          physical, electronic, and procedural safeguards.
        </p>

        <h2>Compliance with Indian Data Protection Law</h2>

        <p>
          The Application is designed to comply with the Digital Personal Data
          Protection Act, 2023 (DPDP Act). Because all file processing happens
          on-device and no personally identifiable information is collected by
          default, the Application minimizes the scope of personal data
          processing as required by the Act.
        </p>

        <h2>Changes</h2>

        <p>
          This Privacy Policy may be updated from time to time for any reason.
          The Service Provider will notify you of any changes to the Privacy
          Policy by updating this page with the new Privacy Policy. You are
          advised to consult this Privacy Policy regularly for any changes, as
          continued use is deemed approval of all changes.
        </p>

        <p>
          This privacy policy is effective as of <strong>{effectiveDate}</strong>.
        </p>

        <h2>Your Consent</h2>

        <p>
          By using the Application, you are consenting to the processing of
          your information as set forth in this Privacy Policy now and as
          amended in the future.
        </p>

        <h2>Contact Us</h2>

        <p>
          If you have any questions regarding privacy while using the
          Application, or have questions about the practices, please contact
          the Service Provider via email at{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>

        <hr />

        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Last updated: {effectiveDate}
        </p>
      </article>
    </main>
  );
}
