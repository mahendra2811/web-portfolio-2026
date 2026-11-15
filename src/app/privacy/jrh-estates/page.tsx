import Link from "next/link";

export const metadata = { title: "JRH Estates Privacy Policy" };

// Based on JRH Estates' src/app/privacy/page.tsx.
export default function Page() {
  return (
    <main className="min-h-screen bg-white py-16 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <article className="mx-auto max-w-3xl space-y-6 px-6 leading-7">
        <h1 className="text-4xl font-bold">JRH Estates Privacy Policy</h1>
        <p>When you submit an enquiry, JRH Estates uses your name, phone number, project preferences and message to respond and help arrange a site visit. Please do not include financial or identity documents.</p>
        <h2 className="text-2xl font-semibold">How enquiries are handled</h2>
        <p>The enquiry form opens WhatsApp with your details prefilled. Your enquiry is sent to the configured business number only when you tap Send in WhatsApp. The form does not submit your details to the website backend. WhatsApp processes any information you send under its own privacy policy.</p>
        <h2 className="text-2xl font-semibold">Website analytics</h2>
        <p>When configured, Google Analytics may process browser, device and usage information and use cookies. The enquiry name, phone number and message are not sent to Google Analytics. Browser settings can restrict cookies and tracking.</p>
        <h2 className="text-2xl font-semibold">Your choices</h2>
        <p>You may ask JRH Estates to correct or delete enquiry information using its contact options. WhatsApp and Google Maps are external services with their own privacy policies.</p>
        <Link href="/privacy" className="text-indigo-600 hover:underline dark:text-indigo-400">All privacy policies</Link>
      </article>
    </main>
  );
}
