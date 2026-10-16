import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeading, Eyebrow, Chevron } from "@/components/Bits";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { HomeHero } from "@/components/HomeHero";
import { getSiteContent, isPublishedArticle } from "@/lib/site-content";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations();
  const { processSteps, differentiators, timeline, caseReviews, insightPlaceholders, company } =
    await getSiteContent(locale as Locale);

  return (
    <>
      {/* SECTION 1 — HERO / COVER BANNER */}
      <HomeHero />

      {/* SECTION 2 — INTRODUCTION */}
      <section className="section-pad">
        <div className="container-content grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Eyebrow>{t("HomePage.intro.eyebrow")}</Eyebrow>
            <h2 className="text-3xl md:text-4xl mt-5">
              {t("HomePage.intro.title")}
            </h2>
          </div>
          <Reveal className="md:col-span-7 md:col-start-6" delay={0.1}>
            <p className="text-lg leading-relaxed text-graphite">
              {t("HomePage.intro.body")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 3 — CORE EXPERTISE (asymmetric editorial layout, not a card grid) */}
      <section className="section-pad bg-paper-dim border-y border-steel-line">
        <div className="container-content grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <SectionHeading
              eyebrow={t("HomePage.coreExpertise.eyebrow")}
              title={t("HomePage.coreExpertise.title")}
            />
            <p className="text-sm text-graphite leading-relaxed max-w-xs">
              {t("HomePage.coreExpertise.note")}{" "}
              <Link href="/cidb-advisory" className="underline underline-offset-4 text-ink">
                {t("HomePage.coreExpertise.link")}
              </Link>
            </p>
          </div>
          <Stagger className="md:col-span-7 md:col-start-6 space-y-0">
            {(t.raw("HomePage.coreExpertise.items") as { title: string; body: string }[]).map(
              (item, i) => (
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
              )
            )}
          </Stagger>
        </div>
      </section>

      {/* SECTION 4 — OUR APPROACH (legitimate sequence — numbering earned) */}
      <section className="section-pad">
        <div className="container-content">
          <SectionHeading
            eyebrow={t("HomePage.process.eyebrow")}
            title={t("HomePage.process.title")}
            subtitle={t("HomePage.process.subtitle")}
          />
          <Stagger className="grid md:grid-cols-5 gap-8">
            {processSteps.map((step, i) => (
              <StaggerItem key={`${step.ref}-${i}`} className="relative">
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
            eyebrow={t("HomePage.why.eyebrow")}
            title={t("HomePage.why.title")}
            light
          />
          <Stagger className="grid md:grid-cols-2 gap-x-14">
            {differentiators.map((d, i) => (
              <StaggerItem
                key={`${d.ref}-${i}`}
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
          <SectionHeading
            eyebrow={t("HomePage.history.eyebrow")}
            title={t("HomePage.history.title")}
          />
          <Stagger className="grid md:grid-cols-3 gap-10">
            {timeline.map((tl, idx) => (
              <StaggerItem key={`${tl.year}-${idx}`} className="relative pl-6 border-l border-steel-line">
                <span className="font-serif text-sm text-graphite">
                  {tl.year}
                </span>
                <h3 className="text-lg mt-3 mb-3">{tl.title}</h3>
                <p className="text-sm text-graphite leading-relaxed">
                  {tl.body}
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
            <SectionHeading
              eyebrow={t("HomePage.caseReviews.eyebrow")}
              title={t("HomePage.caseReviews.title")}
            />
            <Link
              href="/case-reviews"
              className="text-xs tracking-wide2 uppercase underline underline-offset-4 mb-14"
            >
              {t("common.viewAll")}
            </Link>
          </div>
          <Stagger className="grid md:grid-cols-2 gap-10">
            {caseReviews.slice(0, 2).map((c, idx) => (
              <StaggerItem key={`${c.ref}-${idx}`} className="border-t border-steel-line pt-6">
                <h3 className="text-lg mb-3">{c.category}</h3>
                <p className="text-sm text-graphite leading-relaxed mb-4">
                  {c.situation}
                </p>
                <p className="text-xs text-graphite/70 italic">
                  {t("common.resultsVary")}
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
            <SectionHeading
              eyebrow={t("HomePage.insights.eyebrow")}
              title={t("HomePage.insights.title")}
            />
            <Link
              href="/insights"
              className="text-xs tracking-wide2 uppercase underline underline-offset-4 mb-14"
            >
              {t("common.viewAll")}
            </Link>
          </div>
          <Stagger className="grid md:grid-cols-3 gap-8">
            {/* Published articles first, then upcoming topics. */}
            {[...insightPlaceholders.filter(isPublishedArticle), ...insightPlaceholders.filter((a) => !isPublishedArticle(a))]
              .slice(0, 3)
              .map((a, i) => (
                <StaggerItem key={a.slug || a.ref || i} className="border-t border-steel-line pt-5">
                  <p className="text-xs text-graphite mb-3">{a.category}</p>
                  <h3 className="text-base leading-snug">
                    {isPublishedArticle(a) ? (
                      <Link href={`/insights/${a.slug}`} className="hover:underline underline-offset-4">
                        {a.title}
                      </Link>
                    ) : (
                      a.title
                    )}
                  </h3>
                  {!isPublishedArticle(a) && a.status && (
                    <span className="inline-block mt-4 text-xs text-steel">{a.status}</span>
                  )}
                </StaggerItem>
              ))}
          </Stagger>
        </div>
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section className="bg-navy-800 text-paper">
        <Reveal className="container-content py-24 md:py-32 text-center">
          <h2 className="text-3xl md:text-4xl max-w-2xl mx-auto">
            {t("HomePage.finalCta.title")}
          </h2>
          <p className="text-steel mt-6 max-w-xl mx-auto leading-relaxed">
            {t("HomePage.finalCta.body")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary bg-paper text-ink hover:bg-steel/40">
              {t("common.requestConsultation")}
            </Link>
            <a
              href={company.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light"
            >
              {t("common.whatsappOurTeam")}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
