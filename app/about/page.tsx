import type { Metadata } from "next";
import { PageHero, SectionHeading, Eyebrow, Chevron } from "@/components/Bits";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { coreValues, timeline, company } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sky Accelerate Group is a Malaysian advisory group focused on compliance and business support for the construction and related industries, built on operational roots since 2023.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Sky Accelerate Group"
        title="Structured Advisory. Responsible Growth."
        subtitle="An independent Malaysian advisory group built on structured process and long-term client relationships."
      />

      {/* WHO WE ARE */}
      <section className="section-pad">
        <div className="container-content grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Eyebrow>Introduction</Eyebrow>
            <h2 className="text-3xl md:text-4xl mt-5">Who We Are</h2>
          </div>
          <Reveal className="md:col-span-7 md:col-start-6 space-y-5 text-graphite leading-relaxed" delay={0.1}>
            <p>
              {company.legalName} is a Malaysian advisory group focused on
              compliance and business support for the construction and
              related business industries. We work as an independent
              advisory partner, not as a licensing agent or a representative
              of any government authority.
            </p>
            <p>
              Our clients come to us because they need more than a
              submitted form — they need someone who understands the
              regulatory process, the documentation involved, the risks at
              stake, and the overall compliance pathway their business
              needs to follow.
            </p>
          </Reveal>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section-pad bg-paper-dim border-y border-steel-line">
        <div className="container-content">
          <SectionHeading
            eyebrow="Our Story"
            title="A Structured Evolution"
            subtitle="Sky Accelerate Group's operational roots trace back to 2023. The company itself was incorporated in 2026 as the next stage of that development."
          />
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

      {/* VISION & MISSION */}
      <section className="section-pad">
        <Stagger className="container-content grid md:grid-cols-2 gap-16">
          <StaggerItem>
            <Eyebrow>Vision</Eyebrow>
            <h2 className="text-2xl md:text-3xl mt-5 mb-5">Our Vision</h2>
            <p className="text-graphite leading-relaxed">
              To become a trusted and reliable one-stop compliance advisory
              group for the construction, industry and related businesses.
            </p>
          </StaggerItem>
          <StaggerItem>
            <Eyebrow>Mission</Eyebrow>
            <h2 className="text-2xl md:text-3xl mt-5 mb-5">Our Mission</h2>
            <p className="text-graphite leading-relaxed mb-4">
              We support businesses through comprehensive compliance
              advisory involving:
            </p>
            <ul className="space-y-3 text-graphite">
              {[
                "Regulatory and construction-related licensing support",
                "Manpower and labour compliance advisory",
                "Business and financial support advisory through trusted partners",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Chevron className="h-2.5 w-2.5 mt-1.5" tone="steel" />
                  {item}
                </li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>
      </section>

      {/* VALUES — inline flowing row, not boxed cards */}
      <section className="section-pad bg-navy-800 text-paper">
        <div className="container-content">
          <SectionHeading eyebrow="What Guides Us" title="Our Values" light />
          <Stagger className="grid md:grid-cols-3 gap-x-10 gap-y-10">
            {coreValues.map((v, i) => (
              <StaggerItem
                key={v.ref}
                className={`pt-6 ${i > 0 ? "md:border-l md:border-paper/10 md:pl-10" : ""}`}
              >
                <h3 className="text-xl mb-3">{v.title}</h3>
                <p className="text-sm text-steel leading-relaxed">{v.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="section-pad">
        <Reveal className="container-content max-w-prose mx-auto text-center">
          <Eyebrow>Our Philosophy</Eyebrow>
          <p className="text-2xl md:text-3xl font-serif italic text-ink leading-snug mt-6 mb-6">
            &ldquo;Compliance should not be treated simply as paperwork. It
            is part of responsible business operations and long-term risk
            management.&rdquo;
          </p>
          <p className="text-graphite leading-relaxed">
            We see every registration, renewal or submission as one part of
            a larger picture — how a business protects itself, plans ahead,
            and continues to operate with confidence within a regulated
            industry. That is the lens we bring to every engagement.
          </p>
        </Reveal>
      </section>
    </>
  );
}
