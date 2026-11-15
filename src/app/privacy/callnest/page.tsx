import { SimplePrivacyPolicyPage } from "@/components/privacy/SimplePrivacyPolicyPage";
import { callNestPrivacy } from "@/data/callnest-privacy";
import { createPrivacyMetadata } from "@/lib/privacy-metadata";

export const metadata = createPrivacyMetadata(callNestPrivacy, "/privacy/callnest", "Call Nest privacy policy for call data, connected services, backups and account deletion.");
export default function Page() {
  return <SimplePrivacyPolicyPage policy={callNestPrivacy} />;
}
