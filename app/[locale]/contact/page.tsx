import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero, Eyebrow } from "@/components/Bits";
import ContactForm from "@/components/ContactForm";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { getSiteContent } from "@/lib/site-content";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const { company } = await getSiteContent(locale as Locale);
  const t = await getTranslations("ContactPage");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <section className="section-pad">
        <div className="container-content grid md:grid-cols-12 gap-16">
          <Reveal className="md:col-span-7">
            <ContactForm />
          </Reveal>

          <Stagger className="md:col-span-4 md:col-start-9">
            <StaggerItem className="border-t border-steel-line pt-6 mb-10">
              <Eyebrow>{t("office")}</Eyebrow>
              <p className="text-sm text-ink leading-relaxed mt-3">
                {company.legalName}
                <br />
                {company.address.line1}
                <br />
                {company.address.line2}
              </p>
            </StaggerItem>

            <StaggerItem className="border-t border-steel-line pt-6 mb-10">
              <Eyebrow>{t("email")}</Eyebrow>
              <a
                href={`mailto:${company.contact.email}`}
                className="text-sm text-ink hover:text-graphite underline underline-offset-4 mt-3 inline-block"
              >
                {company.contact.email}
              </a>
            </StaggerItem>

            <StaggerItem className="border-t border-steel-line pt-6 mb-10">
              <Eyebrow>{t("phoneWhatsapp")}</Eyebrow>
              <a
                href={`tel:${company.contact.phoneHref}`}
                className="block text-sm text-ink hover:text-graphite mt-3"
              >
                {company.contact.phoneDisplay}
              </a>
              <a
                href={company.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-xs tracking-wide2 uppercase underline underline-offset-4"
              >
                {tCommon("whatsappOurTeam")}
              </a>
            </StaggerItem>

            <StaggerItem className="border-t border-steel-line pt-6">
              <Eyebrow>{t("registrationNo")}</Eyebrow>
              <p className="text-sm text-graphite mt-3">
                {company.registrationNo}
              </p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>
    </>
  );
}
