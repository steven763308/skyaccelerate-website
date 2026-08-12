import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/Bits";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { insightPlaceholders } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Sky Accelerate Group's knowledge hub covering CIDB contractor registration, renewal, grade requirements, personnel compliance and construction regulatory updates.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Knowledge Centre"
        title="Insights"
        subtitle="Practical, plain-language guidance on CIDB compliance and related regulatory topics for contractors and businesses in the construction industry."
      />

      <section className="section-pad">
        <div className="container-content">
          <Reveal className="border border-steel-line bg-paper-dim px-6 py-5 mb-16 max-w-3xl">
            <p className="text-sm text-graphite leading-relaxed">
              This section is being developed as part of our ongoing
              knowledge centre. Articles marked below are in draft and
              pending verification before publication — we do not publish
              regulatory guidance until it has been checked for accuracy.
            </p>
          </Reveal>

          <SectionHeading eyebrow="Coming Soon" title="Upcoming Topics" />

          <Stagger className="grid md:grid-cols-3 gap-x-10 gap-y-10">
            {insightPlaceholders.map((a, i) => (
              <StaggerItem
                key={a.ref}
                className={`pt-6 border-t border-steel-line flex flex-col justify-between min-h-[200px]`}
              >
                <div>
                  <p className="text-xs text-graphite mb-3">{a.category}</p>
                  <h3 className="text-lg leading-snug">{a.title}</h3>
                </div>
                <span className="inline-block mt-6 text-xs text-steel border border-steel-line px-2.5 py-1 w-fit">
                  {a.status}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
