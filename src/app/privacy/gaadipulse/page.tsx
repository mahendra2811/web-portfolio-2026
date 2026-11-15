import { SimplePrivacyPolicyPage } from "@/components/privacy/SimplePrivacyPolicyPage";
import { gaadiPulsePrivacy } from "@/data/gaadipulse-privacy";
import { createPrivacyMetadata } from "@/lib/privacy-metadata";

export const metadata = createPrivacyMetadata(gaadiPulsePrivacy, "/privacy/gaadipulse", "GaadiPulse privacy policy for vehicle records, accounts and deletion requests.");

export default function Page() {
  return <SimplePrivacyPolicyPage policy={gaadiPulsePrivacy} />;
}
