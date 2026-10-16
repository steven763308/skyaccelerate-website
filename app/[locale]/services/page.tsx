import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SectionHeading, NoteBox, Chevron } from "@/components/Bits";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { getSiteContent } from "@/lib/site-content";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
    alternates: { canonical: "/services" },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations();
  const tCommon = await getTranslations("common");
  const { services } = await getSiteContent(locale as Locale);
  const inHouse = services.filter((s) => s.category === "In-House Advisory");
  const partner = services.filter(
    (s) => s.category === "Partner-Supported Services"
  );

  return (
    <>
      <PageHero
        eyebrow={t("ServicesPage.hero.eyebrow")}
        title={t("ServicesPage.hero.title")}
        subtitle={t("ServicesPage.hero.subtitle")}
      />

      <section className="section-pad">
        <div className="container-content">
          <SectionHeading
            eyebrow={t("ServicesPage.inHouse.eyebrow")}
            title={t("ServicesPage.inHouse.title")}
            subtitle={t("ServicesPage.inHouse.subtitle")}
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
                    {tCommon("discussThisService")}
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
            eyebrow={t("ServicesPage.partner.eyebrow")}
            title={t("ServicesPage.partner.title")}
            subtitle={t("ServicesPage.partner.subtitle")}
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
                    {tCommon("discussThisService")}
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
            {t("ServicesPage.cta.title")}
          </h2>
          <Link href="/contact" className="btn-primary">
            {tCommon("requestConsultation")}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
