import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeading, NoteBox, Chevron } from "@/components/Bits";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { services } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Services",
  description:
    "In-house compliance advisory and partner-supported services from Sky Accelerate Group, spanning CIDB registration, personnel compliance, and construction-related regulatory support.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const inHouse = services.filter((s) => s.category === "In-House Advisory");
  const partner = services.filter(
    (s) => s.category === "Partner-Supported Services"
  );

  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Services"
        subtitle="A clear distinction between what Sky Accelerate Group advises and delivers in-house, and what is coordinated through trusted professional partners."
      />

      <section className="section-pad">
        <div className="container-content">
          <SectionHeading
            eyebrow="In-House"
            title="In-House Advisory"
            subtitle="Services advised on and delivered directly by Sky Accelerate Group, led by our core CIDB compliance expertise."
          />
          <Stagger className="border-t border-steel-line">
            {inHouse.map((s, i) => (
              <StaggerItem
                key={s.slug}
                className="grid md:grid-cols-12 gap-6 py-9 border-b border-steel-line"
              >
                <div className="md:col-span-1 pt-1">
                  <span className="font-serif text-xl text-steel">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-lg">{s.title}</h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-sm text-graphite leading-relaxed mb-3">
                    {s.summary}
                  </p>
                  <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-3">
                    {s.scope.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs text-graphite"
                      >
                        <Chevron className="h-2 w-2" tone="steel" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {s.note && <div className="mt-3"><NoteBox>{s.note}</NoteBox></div>}
                  <Link
                    href="/contact"
                    className="inline-block mt-4 text-xs tracking-wide2 uppercase underline underline-offset-4"
                  >
                    Discuss This Service
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-pad bg-paper-dim border-y border-steel-line">
        <div className="container-content">
          <SectionHeading
            eyebrow="Partner-Supported"
            title="Partner-Supported Services"
            subtitle="Extended regulatory support coordinated through trusted professional partners where appropriate. These are not performed directly in-house."
          />
          <Stagger className="border-t border-steel-line">
            {partner.map((s, i) => (
              <StaggerItem
                key={s.slug}
                className="grid md:grid-cols-12 gap-6 py-9 border-b border-steel-line"
              >
                <div className="md:col-span-1 pt-1">
                  <span className="font-serif text-xl text-steel">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-lg">{s.title}</h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-sm text-graphite leading-relaxed mb-3">
                    {s.summary}
                  </p>
                  <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {s.scope.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs text-graphite"
                      >
                        <Chevron className="h-2 w-2" tone="steel" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-block mt-4 text-xs tracking-wide2 uppercase underline underline-offset-4"
                  >
                    Discuss This Service
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-20">
        <Reveal className="container-content text-center">
          <h2 className="text-2xl md:text-3xl mb-6">
            Not Sure Which Service Applies?
          </h2>
          <Link href="/contact" className="btn-primary">
            Request a Consultation
          </Link>
        </Reveal>
      </section>
    </>
  );
}
