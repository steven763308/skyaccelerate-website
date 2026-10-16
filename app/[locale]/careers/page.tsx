import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Chevron, PageHero, SectionHeading } from "@/components/Bits";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import CareersForm from "@/components/CareersForm";
import { getSiteContent } from "@/lib/site-content";
import { withSeo } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

// Openings are managed in SAG (Website Content → Careers); applications go
// to SAG's Talent Pool via /api/careers.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CareersPage" });
  return withSeo(locale, "careers", {
    title: t("metaTitle"),
    description: t("hero.subtitle"),
    alternates: { canonical: "/careers" },
  });
}

function BulletList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-graphite mb-3">{title}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm text-ink leading-relaxed">
            <Chevron className="h-2.5 w-2.5 mt-1.5 shrink-0" tone="steel" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("CareersPage");
  const { careers } = await getSiteContent(locale as Locale);

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className="section-pad">
        <div className="container-content">
          <SectionHeading eyebrow={t("openings.eyebrow")} title={t("openings.title")} />

          {careers.length === 0 ? (
            <Reveal className="border border-steel-line bg-paper-dim px-6 py-5 max-w-3xl">
              <p className="text-sm text-graphite leading-relaxed">{t("noOpenings")}</p>
            </Reveal>
          ) : (
            <Stagger className="space-y-12">
              {careers.map((job) => (
                <StaggerItem
                  key={job.slug}
                  as="article"
                  className="grid md:grid-cols-12 gap-8 border-t border-steel-line pt-10"
                >
                  <div className="md:col-span-4" id={job.slug}>
                    <h3 className="text-2xl leading-snug">{job.title}</h3>
                    {(job.location || job.employmentType) && (
                      <p className="mt-3 text-sm text-graphite">
                        {[job.location, job.employmentType].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <a href="#apply" className="inline-block mt-6 text-sm underline underline-offset-4">
                      {t("applyForThis")}
                    </a>
                  </div>
                  <div className="md:col-span-8 space-y-8">
                    <p className="text-graphite leading-relaxed whitespace-pre-line">{job.summary}</p>
                    <div className="grid sm:grid-cols-2 gap-8">
                      <BulletList title={t("responsibilities")} items={job.responsibilities} />
                      <BulletList title={t("requirements")} items={job.requirements} />
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>

      <section id="apply" className="section-pad bg-paper-dim">
        <div className="container-content grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <SectionHeading eyebrow={t("apply.eyebrow")} title={t("apply.title")} />
          </div>
          <div className="md:col-span-8">
            <CareersForm positions={careers.map((j) => ({ slug: j.slug, title: j.title }))} />
          </div>
        </div>
      </section>
    </>
  );
}
