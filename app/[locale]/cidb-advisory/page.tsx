import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SectionHeading, NoteBox, Chevron } from "@/components/Bits";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { getSiteContent } from "@/lib/site-content";
import type { Locale } from "@/i18n/routing";

type Item = { title: string; body: string };
type Faq = { q: string; a: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CidbAdvisoryPage" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
    alternates: { canonical: "/cidb-advisory" },
  };
}

export default async function CidbAdvisoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("CidbAdvisoryPage");
  const tCommon = await getTranslations("common");
  const { processSteps } = await getSiteContent(locale as Locale);

  const contractorItems = t.raw("contractor.items") as Item[];
  const personnelItems = t.raw("personnel.items") as Item[];
  const faqs = t.raw("faq.items") as Faq[];
  const documentItems = t.raw("documents.items") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      {/* CONTRACTOR REGISTRATION */}
      <section className="section-pad">
        <div className="container-content">
          <SectionHeading
            eyebrow={t("contractor.eyebrow")}
            title={t("contractor.title")}
            subtitle={t("contractor.subtitle")}
          />
          <Stagger className="grid md:grid-cols-2 border-t border-l border-steel-line">
            {contractorItems.map((item) => (
              <StaggerItem
                key={item.title}
                className="py-7 px-0 md:px-8 border-r border-b border-steel-line"
              >
                <h3 className="text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-graphite leading-relaxed">
                  {item.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PERSONNEL REGISTRATION */}
      <section className="section-pad bg-paper-dim border-y border-steel-line">
        <div className="container-content">
          <SectionHeading
            eyebrow={t("personnel.eyebrow")}
            title={t("personnel.title")}
            subtitle={t("personnel.subtitle")}
          />
          <Stagger className="grid md:grid-cols-3 gap-10">
            {personnelItems.map((item) => (
              <StaggerItem key={item.title} className="border-t border-steel-line pt-6">
                <h3 className="text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-graphite leading-relaxed">
                  {item.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PRODUCT & MATERIAL COMPLIANCE */}
      <section className="section-pad">
        <div className="container-content">
          <SectionHeading
            eyebrow={t("products.eyebrow")}
            title={t("products.title")}
            subtitle={t("products.subtitle")}
          />
          <Stagger className="grid md:grid-cols-2 gap-8 mb-8">
            <StaggerItem className="border-t border-steel-line pt-6">
              <h3 className="text-lg mb-3">{t("products.consultationTitle")}</h3>
              <p className="text-sm text-graphite leading-relaxed">
                {t("products.consultationBody")}
              </p>
            </StaggerItem>
            <StaggerItem className="border-t border-steel-line pt-6">
              <h3 className="text-lg mb-3">{t("products.guidanceTitle")}</h3>
              <p className="text-sm text-graphite leading-relaxed">
                {t("products.guidanceBody")}
              </p>
            </StaggerItem>
          </Stagger>
          <NoteBox>{t("products.note")}</NoteBox>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-pad bg-navy-800 text-paper">
        <div className="container-content">
          <SectionHeading eyebrow={t("process.eyebrow")} title={t("process.title")} light />
          <Stagger className="grid md:grid-cols-5 gap-8">
            {processSteps.map((step) => (
              <StaggerItem key={step.ref}>
                <span className="font-serif text-4xl text-paper/25">
                  {step.ref}
                </span>
                <h3 className="text-lg mt-4 mb-3">{step.title}</h3>
                <p className="text-sm text-steel leading-relaxed">
                  {step.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* DOCUMENTS COMMONLY REQUIRED */}
      <section className="section-pad">
        <div className="container-content grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <SectionHeading eyebrow={t("documents.eyebrow")} title={t("documents.title")} />
          </div>
          <Reveal className="md:col-span-7 md:col-start-6" delay={0.1}>
            <Stagger as="ul" className="space-y-4 text-ink">
              {documentItems.map((item) => (
                <StaggerItem key={item} as="li" className="flex gap-4 border-b border-steel-line pb-4">
                  <Chevron className="h-2.5 w-2.5 mt-2" tone="steel" />
                  <span>{item}</span>
                </StaggerItem>
              ))}
            </Stagger>
            <p className="text-sm text-graphite mt-6">{t("documents.note")}</p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-paper-dim border-y border-steel-line">
        <div className="container-content">
          <SectionHeading eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
          <Stagger className="border-t border-steel-line max-w-3xl">
            {faqs.map((f) => (
              <StaggerItem key={f.q} className="py-7 border-b border-steel-line">
                <h3 className="text-base font-medium mb-3">{f.q}</h3>
                <p className="text-sm text-graphite leading-relaxed">
                  {f.a}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-24">
        <Reveal className="container-content text-center">
          <h2 className="text-2xl md:text-3xl mb-6 max-w-lg mx-auto">
            {t("cta.title")}
          </h2>
          <Link href="/contact" className="btn-primary">
            {tCommon("requestConsultation")}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
