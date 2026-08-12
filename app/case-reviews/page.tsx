import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/Bits";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { caseReviews } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Case Reviews",
  description:
    "Anonymised case reviews illustrating how Sky Accelerate Group approaches CIDB registration, renewal, grade upgrading and regulatory issue resolution.",
  alternates: { canonical: "/case-reviews" },
};

export default function CaseReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected Case Reviews"
        title="How We Work, In Practice"
        subtitle="Anonymised reviews of representative engagements, structured around the situation, the regulatory requirement, our role, and the outcome."
      />

      <section className="section-pad">
        <div className="container-content">
          <Reveal className="border border-steel-line bg-paper-dim px-6 py-5 mb-16 max-w-3xl">
            <p className="text-sm text-graphite leading-relaxed">
              Case details below are anonymised to protect client
              confidentiality. Identifying information, registration
              numbers and confidential documents have been removed or
              generalised. Results vary according to circumstances and
              applicable regulatory requirements — these reviews describe
              our advisory approach, not guaranteed outcomes.
            </p>
          </Reveal>

          <Stagger className="space-y-16">
            {caseReviews.map((c) => (
              <StaggerItem
                key={c.ref}
                as="article"
                className="grid md:grid-cols-12 gap-8 border-t border-steel-line pt-10"
              >
                <div className="md:col-span-3">
                  <h2 className="text-xl leading-snug">{c.category}</h2>
                </div>
                <div className="md:col-span-9 grid sm:grid-cols-2 gap-x-10 gap-y-6">
                  <div>
                    <p className="eyebrow mb-2">Situation</p>
                    <p className="text-sm text-graphite leading-relaxed">
                      {c.situation}
                    </p>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Regulatory Requirement</p>
                    <p className="text-sm text-graphite leading-relaxed">
                      {c.requirement}
                    </p>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Our Role</p>
                    <p className="text-sm text-graphite leading-relaxed">
                      {c.role}
                    </p>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Outcome</p>
                    <p className="text-sm text-graphite leading-relaxed">
                      {c.outcome}
                    </p>
                  </div>
                  <div className="sm:col-span-2 pt-2">
                    <p className="text-xs text-graphite/70 italic">
                      Important note: results vary according to
                      circumstances and applicable regulatory requirements.
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-24 bg-navy-800 text-paper">
        <Reveal className="container-content text-center">
          <h2 className="text-2xl md:text-3xl mb-6 max-w-lg mx-auto">
            Discuss a Situation Similar to Yours
          </h2>
          <Link href="/contact" className="btn-primary bg-paper text-ink hover:bg-steel/40">
            Request a Consultation
          </Link>
        </Reveal>
      </section>
    </>
  );
}
