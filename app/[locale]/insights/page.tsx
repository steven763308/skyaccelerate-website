import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero, SectionHeading } from "@/components/Bits";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { getSiteContent } from "@/lib/site-content";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "InsightsPage" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
    alternates: { canonical: "/insights" },
  };
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("InsightsPage");
  const { insightPlaceholders } = await getSiteContent(locale as Locale);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <section className="section-pad">
        <div className="container-content">
          <Reveal className="border border-steel-line bg-paper-dim px-6 py-5 mb-16 max-w-3xl">
            <p className="text-sm text-graphite leading-relaxed">
              {t("developingNote")}
            </p>
          </Reveal>

          <SectionHeading eyebrow={t("upcoming.eyebrow")} title={t("upcoming.title")} />

          <Stagger className="grid md:grid-cols-3 gap-x-10 gap-y-10">
            {insightPlaceholders.map((a) => (
              <StaggerItem
                key={a.ref}
                className="pt-6 border-t border-steel-line flex flex-col justify-between min-h-[200px]"
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
