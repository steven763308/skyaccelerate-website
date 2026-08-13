import Link from "next/link";
import { SectionHeading, Eyebrow, Chevron } from "@/components/Bits";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { HomeHero } from "@/components/HomeHero";
import {
  processSteps,
  differentiators,
  timeline,
  caseReviews,
  insightPlaceholders,
  company,
} from "@/lib/site-config";

export default function HomePage() {
  return (
    <>
      {/* SECTION 1 — HERO / COVER BANNER */}
      <HomeHero />

      {/* SECTION 2 — INTRODUCTION */}
      <section className="section-pad">
        <div className="container-content grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Eyebrow>About Our Approach</Eyebrow>
            <h2 className="text-3xl md:text-4xl mt-5">
              Navigating Compliance with Clarity
            </h2>
          </div>
          <Reveal className="md:col-span-7 md:col-start-6" delay={0.1}>
            <p className="text-lg leading-relaxed text-graphite">
              Businesses operating in regulated industries often face
              changing requirements, layered documentation obligations and
              multiple authorities to satisfy at once. Sky Accelerate Group
              works alongside our clients as an advisory partner —
              helping them understand what applies to their business, what
              is required, and how to move through the process with
              structure and confidence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 3 — CORE EXPERTISE (asymmetric editorial layout, not a card grid) */}
      <section className="section-pad bg-paper-dim border-y border-steel-line">
        <div className="container-content grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <SectionHeading eyebrow="Core Expertise" title="Where We Focus" />
            <p className="text-sm text-graphite leading-relaxed max-w-xs">
              Our primary area of expertise remains CIDB compliance and
              registration advisory.{" "}
              <Link href="/cidb-advisory" className="underline underline-offset-4 text-ink">
                Explore CIDB Advisory
              </Link>
            </p>
          </div>
          <Stagger className="md:col-span-7 md:col-start-6 space-y-0">
            {[
              {
                title: "Contractor Compliance",
                body: "CIDB contractor registration, renewal, upgrading and related advisory.",
              },
              {
                title: "Personnel Compliance",
                body: "CIDB personnel registration and related compliance support.",
              },
              {
                title: "Regulatory Advisory",
                body: "Selected regulatory, documentation and business support advisory.",
              },
            ].map((item, i) => (
              <StaggerItem
                key={item.title}
                className={`flex gap-5 py-7 ${i > 0 ? "border-t border-steel-line" : ""}`}
              >
                <Chevron className="h-3 w-3 mt-2" tone="steel" />
                <div>
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="text-graphite text-sm leading-relaxed mt-2">
                    {item.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SECTION 4 — OUR APPROACH (legitimate sequence — numbering earned) */}
      <section className="section-pad">
        <div className="container-content">
          <SectionHeading
            eyebrow="Our Process"
            title="Our Approach"
            subtitle="A structured process from first conversation to follow-up — not a promise of outcome, but a commitment to how we work."
          />
          <Stagger className="grid md:grid-cols-5 gap-8">
            {processSteps.map((step, i) => (
              <StaggerItem key={step.ref} className="relative">
                <span className="font-serif text-4xl text-steel/50">
                  {step.ref}
                </span>
                <h3 className="text-lg mt-4 mb-3">{step.title}</h3>
                <p className="text-sm text-graphite leading-relaxed">
                  {step.body}
                </p>
                {i < processSteps.length - 1 && (
                  <span className="hidden md:block absolute top-4 -right-4 h-px w-8 bg-steel-line" />
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SECTION 5 — WHY SKY ACCELERATE (flowing list, no boxed grid) */}
      <section className="section-pad bg-navy-800 text-paper">
        <div className="container-content">
          <SectionHeading
            eyebrow="Differentiation"
            title="Why Sky Accelerate"
            light
          />
          <Stagger className="grid md:grid-cols-2 gap-x-14">
            {differentiators.map((d, i) => (
              <StaggerItem
                key={d.ref}
                className={`flex gap-5 py-8 ${
                  i >= 2 ? "border-t border-paper/10" : ""
                }`}
              >
                <Chevron className="h-3 w-3 mt-2" tone="paper" />
                <div>
                  <h3 className="text-xl mb-2">{d.title}</h3>
                  <p className="text-sm text-steel leading-relaxed">
                    {d.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SECTION 6 — COMPANY EVOLUTION */}
      <section className="section-pad">
        <div className="container-content">
          <SectionHeading eyebrow="Our History" title="Built on Experience. Structured for Growth." />
          <Stagger className="grid md:grid-cols-3 gap-10">
            {timeline.map((t) => (
              <StaggerItem key={t.year} className="relative pl-6 border-l border-steel-line">
                <span className="font-serif text-sm text-graphite">
                  {t.year}
                </span>
                <h3 className="text-lg mt-3 mb-3">{t.title}</h3>
                <p className="text-sm text-graphite leading-relaxed">
                  {t.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SECTION 7 — CASE REVIEWS */}
      <section className="section-pad bg-paper-dim border-y border-steel-line">
        <div className="container-content">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
            <SectionHeading eyebrow="Case Reviews" title="Selected Case Reviews" />
            <Link
              href="/case-reviews"
              className="text-xs tracking-wide2 uppercase underline underline-offset-4 mb-14"
            >
              View All
            </Link>
          </div>
          <Stagger className="grid md:grid-cols-2 gap-10">
            {caseReviews.slice(0, 2).map((c) => (
              <StaggerItem key={c.ref} className="border-t border-steel-line pt-6">
                <h3 className="text-lg mb-3">{c.category}</h3>
                <p className="text-sm text-graphite leading-relaxed mb-4">
                  {c.situation}
                </p>
                <p className="text-xs text-graphite/70 italic">
                  Results vary according to circumstances and applicable
                  regulatory requirements.
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SECTION 8 — INSIGHTS */}
      <section className="section-pad">
        <div className="container-content">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
            <SectionHeading eyebrow="Knowledge Centre" title="Insights" />
            <Link
              href="/insights"
              className="text-xs tracking-wide2 uppercase underline underline-offset-4 mb-14"
            >
              View All
            </Link>
          </div>
          <Stagger className="grid md:grid-cols-3 gap-8">
            {insightPlaceholders.slice(0, 3).map((a) => (
              <StaggerItem key={a.ref} className="border-t border-steel-line pt-5">
                <p className="text-xs text-graphite mb-3">{a.category}</p>
                <h3 className="text-base leading-snug">{a.title}</h3>
                <span className="inline-block mt-4 text-xs text-steel">
                  {a.status}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section className="bg-navy-800 text-paper">
        <Reveal className="container-content py-24 md:py-32 text-center">
          <h2 className="text-3xl md:text-4xl max-w-2xl mx-auto">
            Need Clarity on a Compliance Requirement?
          </h2>
          <p className="text-steel mt-6 max-w-xl mx-auto leading-relaxed">
            Speak with our advisory team to understand the requirements,
            documentation and appropriate next steps for your business.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary bg-paper text-ink hover:bg-steel/40">
              Request a Consultation
            </Link>
            <a
              href={company.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light"
            >
              WhatsApp Our Team
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
