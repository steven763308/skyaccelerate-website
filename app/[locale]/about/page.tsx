import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero, SectionHeading, Eyebrow, Chevron } from "@/components/Bits";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { getSiteConfig } from "@/lib/get-site-config";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("AboutPage");
  const { coreValues, timeline, company } = getSiteConfig(locale as Locale);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      {/* WHO WE ARE */}
      <section className="section-pad">
        <div className="container-content grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Eyebrow>{t("whoWeAre.eyebrow")}</Eyebrow>
            <h2 className="text-3xl md:text-4xl mt-5">{t("whoWeAre.title")}</h2>
          </div>
          <Reveal className="md:col-span-7 md:col-start-6 space-y-5 text-graphite leading-relaxed" delay={0.1}>
            <p>{t("whoWeAre.body1", { legalName: company.legalName })}</p>
            <p>{t("whoWeAre.body2")}</p>
          </Reveal>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section-pad bg-paper-dim border-y border-steel-line">
        <div className="container-content">
          <SectionHeading
            eyebrow={t("story.eyebrow")}
            title={t("story.title")}
            subtitle={t("story.subtitle")}
          />
          <Stagger className="grid md:grid-cols-3 gap-10">
            {timeline.map((tl) => (
              <StaggerItem key={tl.year} className="relative pl-6 border-l border-steel-line">
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

      {/* VISION & MISSION */}
      <section className="section-pad">
        <Stagger className="container-content grid md:grid-cols-2 gap-16">
          <StaggerItem>
            <Eyebrow>{t("vision.eyebrow")}</Eyebrow>
            <h2 className="text-2xl md:text-3xl mt-5 mb-5">{t("vision.title")}</h2>
            <p className="text-graphite leading-relaxed">{t("vision.body")}</p>
          </StaggerItem>
          <StaggerItem>
            <Eyebrow>{t("mission.eyebrow")}</Eyebrow>
            <h2 className="text-2xl md:text-3xl mt-5 mb-5">{t("mission.title")}</h2>
            <p className="text-graphite leading-relaxed mb-4">{t("mission.intro")}</p>
            <ul className="space-y-3 text-graphite">
              {(t.raw("mission.items") as string[]).map((item) => (
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
          <SectionHeading eyebrow={t("values.eyebrow")} title={t("values.title")} light />
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
          <Eyebrow>{t("philosophy.eyebrow")}</Eyebrow>
          <p className="text-2xl md:text-3xl font-serif italic text-ink leading-snug mt-6 mb-6">
            {t("philosophy.quote")}
          </p>
          <p className="text-graphite leading-relaxed">{t("philosophy.body")}</p>
        </Reveal>
      </section>
    </>
  );
}
