import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/Legal";
import { company } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Sky Accelerate Group Sdn. Bhd. collects, uses and protects personal data provided by clients and website visitors.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      updated="January 2026"
    >
      <p>
        {company.legalName} ({company.registrationNo}) (&ldquo;Sky
        Accelerate Group&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or
        &ldquo;our&rdquo;) respects the privacy of individuals who interact
        with us, including visitors to our website and clients who engage
        our advisory services. This Privacy Policy explains how we
        collect, use, disclose and protect personal data in connection
        with our services and this website.
      </p>

      <LegalSection num="PP/01" title="Information We Collect">
        <p>
          We may collect personal data that you voluntarily provide to us,
          including your name, company name, phone number, email address,
          the service you are enquiring about, and any message or
          supporting information you choose to share through our contact
          form, email, phone or WhatsApp.
        </p>
        <p>
          Where you engage us for advisory services, we may also collect
          business, financial and documentation-related information
          necessary to provide the relevant compliance advisory.
        </p>
      </LegalSection>

      <LegalSection num="PP/02" title="How We Use Your Information">
        <p>We use the personal data we collect to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Respond to enquiries and consultation requests;</li>
          <li>Provide, manage and deliver our advisory services;</li>
          <li>
            Communicate with you regarding your engagement, including
            follow-up guidance;
          </li>
          <li>Comply with applicable legal and regulatory obligations;</li>
          <li>
            Improve our website and services, where data is used in an
            aggregated or anonymised form.
          </li>
        </ul>
      </LegalSection>

      <LegalSection num="PP/03" title="Disclosure to Third Parties">
        <p>
          For certain partner-supported services, we may need to share
          relevant information with trusted professional partners who
          assist in coordinating the applicable process (for example,
          corporate registration or construction-related regulatory
          support). We only share the information reasonably necessary
          for this purpose.
        </p>
        <p>
          We do not sell personal data to third parties for marketing
          purposes.
        </p>
      </LegalSection>

      <LegalSection num="PP/04" title="Data Retention">
        <p>
          We retain personal data for as long as necessary to fulfil the
          purposes described in this Policy, or as required by applicable
          law, after which it is securely disposed of or anonymised.
        </p>
      </LegalSection>

      <LegalSection num="PP/05" title="Your Rights">
        <p>
          Subject to applicable law, you may request access to, correction
          of, or deletion of your personal data held by us. You may also
          withdraw consent to our processing of your data, where
          applicable, by contacting us using the details below.
        </p>
      </LegalSection>

      <LegalSection num="PP/06" title="Contact Us">
        <p>
          For questions regarding this Privacy Policy or how your personal
          data is handled, please contact us at{" "}
          <a
            href={`mailto:${company.contact.email}`}
            className="underline underline-offset-4"
          >
            {company.contact.email}
          </a>{" "}
          or {company.contact.phoneDisplay}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
