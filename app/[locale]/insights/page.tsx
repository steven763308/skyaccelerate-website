import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero, SectionHeading } from "@/components/Bits";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Link } from "@/i18n/navigation";
import { getSiteContent, isPublishedArticle } from "@/lib/site-content";
import { withSeo } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "InsightsPage" });
  return withSeo(locale, "insights", {
    title: t("hero.title"),
    description: t("hero.subtitle"),
    alternates: { canonical: "/insights" },
  });
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
  const articles = insightPlaceholders.filter(isPublishedArticle);
  const upcoming = insightPlaceholders.filter((item) => !isPublishedArticle(item));

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <section className="section-pad">
        <div className="container-content">
          {articles.length > 0 && (
            <div className="mb-24">
              <SectionHeading eyebrow={t("articles.eyebrow")} title={t("articles.title")} />
              <Stagger className="grid md:grid-cols-3 gap-x-10 gap-y-12">
                {articles.map((a) => (
                  <StaggerItem key={a.slug} className="pt-6 border-t border-ink flex flex-col">
                    <p className="text-xs text-graphite mb-3">
                      {a.category}
                      {a.date && <span className="text-steel"> · {a.date}</span>}
                    </p>
                    <h3 className="text-lg leading-snug">
                      <Link href={`/insights/${a.slug}`} className="hover:underline underline-offset-4">
                        {a.title}
                      </Link>
                    </h3>
                    {a.summary && <p className="mt-3 text-sm text-graphite leading-relaxed">{a.summary}</p>}
                    <Link href={`/insights/${a.slug}`} className="mt-5 text-sm text-ink underline underline-offset-4 w-fit">
                      {t("readArticle")}
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}

          {upcoming.length > 0 && (
            <>
              <Reveal className="border border-steel-line bg-paper-dim px-6 py-5 mb-16 max-w-3xl">
                <p className="text-sm text-graphite leading-relaxed">
                  {t("developingNote")}
                </p>
              </Reveal>

              <SectionHeading eyebrow={t("upcoming.eyebrow")} title={t("upcoming.title")} />

              <Stagger className="grid md:grid-cols-3 gap-x-10 gap-y-10">
                {upcoming.map((a, i) => (
                  <StaggerItem
                    key={a.ref || i}
                    className="pt-6 border-t border-steel-line flex flex-col justify-between min-h-[200px]"
                  >
                    <div>
                      <p className="text-xs text-graphite mb-3">{a.category}</p>
                      <h3 className="text-lg leading-snug">{a.title}</h3>
                    </div>
                    {a.status && (
                      <span className="inline-block mt-6 text-xs text-steel border border-steel-line px-2.5 py-1 w-fit">
                        {a.status}
                      </span>
                    )}
                  </StaggerItem>
                ))}
              </Stagger>
            </>
          )}
        </div>
      </section>
    </>
  );
}
