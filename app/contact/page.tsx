import type { Metadata } from "next";
import { PageHero, Eyebrow } from "@/components/Bits";
import ContactForm from "@/components/ContactForm";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { company } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Sky Accelerate Group's advisory team about CIDB registration, renewal, grade upgrading, personnel compliance or partner-supported services.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Start a Conversation"
        subtitle="Tell us briefly about your business and requirements, and our advisory team will follow up to discuss the appropriate next steps."
      />

      <section className="section-pad">
        <div className="container-content grid md:grid-cols-12 gap-16">
          <Reveal className="md:col-span-7">
            <ContactForm />
          </Reveal>

          <Stagger className="md:col-span-4 md:col-start-9">
            <StaggerItem className="border-t border-steel-line pt-6 mb-10">
              <Eyebrow>Office</Eyebrow>
              <p className="text-sm text-ink leading-relaxed mt-3">
                {company.legalName}
                <br />
                {company.address.line1}
                <br />
                {company.address.line2}
              </p>
            </StaggerItem>

            <StaggerItem className="border-t border-steel-line pt-6 mb-10">
              <Eyebrow>Email</Eyebrow>
              <a
                href={`mailto:${company.contact.email}`}
                className="text-sm text-ink hover:text-graphite underline underline-offset-4 mt-3 inline-block"
              >
                {company.contact.email}
              </a>
            </StaggerItem>

            <StaggerItem className="border-t border-steel-line pt-6 mb-10">
              <Eyebrow>Phone / WhatsApp</Eyebrow>
              <a
                href={`tel:${company.contact.phoneHref}`}
                className="block text-sm text-ink hover:text-graphite mt-3"
              >
                {company.contact.phoneDisplay}
              </a>
              <a
                href={company.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-xs tracking-wide2 uppercase underline underline-offset-4"
              >
                WhatsApp Our Team
              </a>
            </StaggerItem>

            <StaggerItem className="border-t border-steel-line pt-6">
              <Eyebrow>Registration No.</Eyebrow>
              <p className="text-sm text-graphite mt-3">
                {company.registrationNo}
              </p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>
    </>
  );
}
