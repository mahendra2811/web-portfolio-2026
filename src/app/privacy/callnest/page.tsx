import { SimplePrivacyPolicyPage } from "@/components/privacy/SimplePrivacyPolicyPage";
import { callNestPrivacy } from "@/data/callnest-privacy";
import { createPrivacyMetadata } from "@/lib/privacy-metadata";

export const metadata = createPrivacyMetadata(
  callNestPrivacy,
  "/privacy/callnest",
  "callNest privacy policy for call and contact data, connected services and account deletion.",
);
export default function Page() {
  return <SimplePrivacyPolicyPage policy={callNestPrivacy} />;
}
