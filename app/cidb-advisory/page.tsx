import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeading, NoteBox, Chevron } from "@/components/Bits";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { processSteps } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "CIDB Advisory",
  description:
    "Structured CIDB compliance and registration advisory for Malaysian contractors — covering contractor registration, renewal, grade upgrading, personnel registration, and product & material compliance guidance.",
  alternates: { canonical: "/cidb-advisory" },
};

const contractorItems = [
  {
    title: "New Registration",
    body: "Advisory on eligibility, applicable category and grade, and the documentation required to prepare a structured submission.",
  },
  {
    title: "Renewal",
    body: "Review of renewal timelines and updated documentation requirements to support a timely, well-organised submission.",
  },
  {
    title: "Grade Upgrade",
    body: "Assessment of financial, technical and personnel criteria relevant to the desired grade band, with guidance on closing documentation gaps.",
  },
  {
    title: "Related Applications",
    body: "Advisory support on other contractor-related applications and submissions as they arise.",
  },
];

const personnelItems = [
  {
    title: "New Registration",
    body: "Guidance on personnel registration requirements as part of overall workforce compliance.",
  },
  {
    title: "Renewal",
    body: "Support in tracking renewal timelines and preparing the relevant documentation.",
  },
  {
    title: "Related Applications",
    body: "Advisory on other personnel-related registration matters as required.",
  },
];

const faqs = [
  {
    q: "Does Sky Accelerate Group guarantee approval of a CIDB application?",
    a: "No. Approvals remain at the sole discretion of CIDB and are subject to the applicable requirements at the time of submission. We provide structured advisory and preparation support — we do not represent CIDB and cannot guarantee outcomes or processing timelines.",
  },
  {
    q: "Is Sky Accelerate Group affiliated with CIDB?",
    a: "No. Sky Accelerate Group is an independent advisory company and is not a government authority or an official representative of CIDB.",
  },
  {
    q: "What documents are typically required?",
    a: "This varies depending on the type of application and the company's current standing. Requirements may vary depending on company circumstances and prevailing regulatory requirements — we review this individually with each client.",
  },
  {
    q: "Can Sky Accelerate Group handle CIDB product and material compliance applications?",
    a: "Not at this time. We currently provide regulatory consultation and compliance guidance for product and material compliance matters, but application handling for this category is not yet available.",
  },
];

export default function CidbAdvisoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Primary Area of Expertise"
        title="CIDB Compliance & Registration Advisory"
        subtitle="Structured guidance for Malaysian contractors navigating registration, renewal, upgrading and related compliance requirements."
      />

      {/* CONTRACTOR REGISTRATION */}
      <section className="section-pad">
        <div className="container-content">
          <SectionHeading
            eyebrow="Contractors"
            title="Contractor Registration & Compliance Advisory"
            subtitle="We help clients understand eligibility, documentation, registration requirements and the overall application pathway — rather than simply lodging a form on their behalf."
          />
          <Stagger className="grid md:grid-cols-2 border-t border-l border-steel-line">
            {contractorItems.map((item) => (
              <StaggerItem
                key={item.title}
                className="py-7 px-0 md:px-8 border-r border-b border-steel-line"
              >
                <h3 className="text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-graphite leading-relaxed">
                  {item.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PERSONNEL REGISTRATION */}
      <section className="section-pad bg-paper-dim border-y border-steel-line">
        <div className="container-content">
          <SectionHeading
            eyebrow="Personnel"
            title="CIDB Personnel Registration"
            subtitle="Positioned as part of a company's broader workforce and personnel compliance, not a standalone paperwork exercise."
          />
          <Stagger className="grid md:grid-cols-3 gap-10">
            {personnelItems.map((item) => (
              <StaggerItem key={item.title} className="border-t border-steel-line pt-6">
                <h3 className="text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-graphite leading-relaxed">
                  {item.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PRODUCT & MATERIAL COMPLIANCE */}
      <section className="section-pad">
        <div className="container-content">
          <SectionHeading
            eyebrow="Products & Materials"
            title="Product & Material Compliance"
            subtitle="Currently available as regulatory consultation and compliance guidance."
          />
          <Stagger className="grid md:grid-cols-2 gap-8 mb-8">
            <StaggerItem className="border-t border-steel-line pt-6">
              <h3 className="text-lg mb-3">Regulatory Consultation</h3>
              <p className="text-sm text-graphite leading-relaxed">
                Advisory on the regulatory considerations relevant to
                product and material compliance within the construction
                sector.
              </p>
            </StaggerItem>
            <StaggerItem className="border-t border-steel-line pt-6">
              <h3 className="text-lg mb-3">Compliance Guidance</h3>
              <p className="text-sm text-graphite leading-relaxed">
                General guidance to help clients understand applicable
                compliance expectations for products and materials.
              </p>
            </StaggerItem>
          </Stagger>
          <NoteBox>
            Application handling for CIDB product and material compliance
            is currently not available. Our role in this area is limited
            to regulatory consultation and compliance guidance.
          </NoteBox>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-pad bg-navy-800 text-paper">
        <div className="container-content">
          <SectionHeading eyebrow="How We Work" title="Our Process" light />
          <Stagger className="grid md:grid-cols-5 gap-8">
            {processSteps.map((step) => (
              <StaggerItem key={step.ref}>
                <span className="font-serif text-4xl text-paper/25">
                  {step.ref}
                </span>
                <h3 className="text-lg mt-4 mb-3">{step.title}</h3>
                <p className="text-sm text-steel leading-relaxed">
                  {step.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* DOCUMENTS COMMONLY REQUIRED */}
      <section className="section-pad">
        <div className="container-content grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <SectionHeading eyebrow="Preparation" title="Information Commonly Required" />
          </div>
          <Reveal className="md:col-span-7 md:col-start-6" delay={0.1}>
            <Stagger as="ul" className="space-y-4 text-ink">
              {[
                "Company registration and shareholding information",
                "Financial statements and supporting financial records",
                "Technical personnel and project experience details",
                "Prior registration or licensing history, where applicable",
              ].map((item) => (
                <StaggerItem key={item} as="li" className="flex gap-4 border-b border-steel-line pb-4">
                  <Chevron className="h-2.5 w-2.5 mt-2" tone="steel" />
                  <span>{item}</span>
                </StaggerItem>
              ))}
            </Stagger>
            <p className="text-sm text-graphite mt-6">
              Requirements may vary depending on company circumstances and
              prevailing regulatory requirements. We confirm the exact
              documentation needed during our initial assessment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-paper-dim border-y border-steel-line">
        <div className="container-content">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
          <Stagger className="border-t border-steel-line max-w-3xl">
            {faqs.map((f) => (
              <StaggerItem key={f.q} className="py-7 border-b border-steel-line">
                <h3 className="text-base font-medium mb-3">{f.q}</h3>
                <p className="text-sm text-graphite leading-relaxed">
                  {f.a}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-24">
        <Reveal className="container-content text-center">
          <h2 className="text-2xl md:text-3xl mb-6 max-w-lg mx-auto">
            Discuss Your Contractor Registration Requirements
          </h2>
          <Link href="/contact" className="btn-primary">
            Request a Consultation
          </Link>
        </Reveal>
      </section>
    </>
  );
}
