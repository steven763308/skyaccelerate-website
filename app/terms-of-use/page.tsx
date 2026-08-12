import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/Legal";
import { company } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing the use of the Sky Accelerate Group Sdn. Bhd. website.",
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <LegalLayout eyebrow="Legal" title="Terms of Use" updated="January 2026">
      <p>
        These Terms of Use govern your access to and use of the website
        operated by {company.legalName} ({company.registrationNo}) at{" "}
        {company.domain} (the &ldquo;Website&rdquo;). By accessing or using
        the Website, you agree to be bound by these Terms.
      </p>

      <LegalSection num="TU/01" title="Purpose of the Website">
        <p>
          This Website is provided to give general information about Sky
          Accelerate Group and our advisory services. Content on this
          Website is for informational purposes only and does not
          constitute legal, financial or regulatory advice.
        </p>
      </LegalSection>

      <LegalSection num="TU/02" title="No Guarantee of Outcome">
        <p>
          Nothing on this Website constitutes a guarantee of approval,
          licence issuance, registration outcome or processing timeline
          by any regulatory authority. Regulatory outcomes remain at the
          sole discretion of the relevant authorities.
        </p>
      </LegalSection>

      <LegalSection num="TU/03" title="Intellectual Property">
        <p>
          All content on this Website, including text, graphics, logos and
          layout, is the property of {company.legalName} unless otherwise
          stated, and may not be reproduced or used without our prior
          written consent.
        </p>
      </LegalSection>

      <LegalSection num="TU/04" title="Third-Party Links and References">
        <p>
          References to regulatory authorities such as CIDB, MOF, JKKP,
          SPAN or SSM are made solely in relation to their respective
          regulatory functions. Such references do not imply affiliation,
          appointment, endorsement or partnership between Sky Accelerate
          Group and those authorities.
        </p>
      </LegalSection>

      <LegalSection num="TU/05" title="Limitation of Liability">
        <p>
          To the fullest extent permitted by law, {company.legalName}{" "}
          shall not be liable for any loss or damage arising from your use
          of, or reliance on, information provided on this Website.
          Specific advisory engagements are governed by the separate terms
          agreed with each client.
        </p>
      </LegalSection>

      <LegalSection num="TU/06" title="Changes to These Terms">
        <p>
          We may update these Terms of Use from time to time. Continued
          use of the Website after changes are posted constitutes
          acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection num="TU/07" title="Governing Law">
        <p>
          These Terms are governed by the laws of Malaysia, without regard
          to conflict of law principles.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
