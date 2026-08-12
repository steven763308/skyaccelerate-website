import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/Legal";
import { company } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important disclaimer regarding the independent, non-governmental status of Sky Accelerate Group Sdn. Bhd. and the nature of its advisory services.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Disclaimer" updated="January 2026">
      <LegalSection num="DIS/01" title="Independent Advisory Status">
        <p>
          {company.legalName} ({company.registrationNo}) is an independent
          advisory company. We are not a government authority, department
          or agency, and we are not an official representative of CIDB,
          MOF, JKKP, SPAN, SSM or any other Malaysian regulatory authority
          unless specifically stated and legally authorised.
        </p>
      </LegalSection>

      <LegalSection num="DIS/02" title="No Guarantee of Outcome">
        <p>
          We provide structured, practical and responsible advisory
          services relating to regulatory compliance. We do not guarantee
          approval, licence issuance, registration outcome, grade
          determination or any specific processing timeline. All
          regulatory outcomes remain subject to the assessment and
          discretion of the relevant authorities.
        </p>
      </LegalSection>

      <LegalSection num="DIS/03" title="Partner-Supported Services">
        <p>
          Certain services described on this Website — including
          corporate registration support, JKKP, MOF and SPAN-related
          support, and other licensing or permit support — are
          coordinated through trusted professional partners rather than
          performed directly in-house. Where this applies, it is clearly
          indicated on the relevant service description.
        </p>
      </LegalSection>

      <LegalSection num="DIS/04" title="General Information Only">
        <p>
          Content on this Website, including our Insights section, is
          provided for general informational purposes and reflects our
          understanding at the time of publication. Regulatory
          requirements may change, and requirements may vary depending on
          company circumstances and prevailing regulatory requirements. We
          recommend obtaining specific advice for your situation before
          taking action.
        </p>
      </LegalSection>

      <LegalSection num="DIS/05" title="Case Reviews">
        <p>
          Case reviews published on this Website are anonymised and
          presented for illustrative purposes. Results vary according to
          circumstances and applicable regulatory requirements, and past
          outcomes do not guarantee similar results for other clients.
        </p>
      </LegalSection>

      <LegalSection num="DIS/06" title="Contact">
        <p>
          If you have any questions about this Disclaimer, please contact
          us at{" "}
          <a
            href={`mailto:${company.contact.email}`}
            className="underline underline-offset-4"
          >
            {company.contact.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
