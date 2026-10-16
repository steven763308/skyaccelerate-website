import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalLayout, LegalSection } from "@/components/Legal";
import { getSiteContent } from "@/lib/site-content";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TermsOfUsePage" });
  return {
    title: t("title"),
    alternates: { canonical: "/terms-of-use" },
  };
}

export default async function TermsOfUsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const { company } = await getSiteContent(locale as Locale);
  const t = await getTranslations("TermsOfUsePage");
  const tCommon = await getTranslations("common");

  return (
    <LegalLayout eyebrow={tCommon("legal")} title={t("title")} updated={t("updated")}>
      <p>
        {t("intro", {
          legalName: company.legalName,
          registrationNo: company.registrationNo,
          domain: company.domain,
        })}
      </p>

      <LegalSection num="TU/01" title={t("sections.0.title")}>
        <p>{t("sections.0.paragraphs.0")}</p>
      </LegalSection>

      <LegalSection num="TU/02" title={t("sections.1.title")}>
        <p>{t("sections.1.paragraphs.0")}</p>
      </LegalSection>

      <LegalSection num="TU/03" title={t("sections.2.title")}>
        <p>{t("sections.2.paragraphs.0", { legalName: company.legalName })}</p>
      </LegalSection>

      <LegalSection num="TU/04" title={t("sections.3.title")}>
        <p>{t("sections.3.paragraphs.0")}</p>
      </LegalSection>

      <LegalSection num="TU/05" title={t("sections.4.title")}>
        <p>{t("sections.4.paragraphs.0", { legalName: company.legalName })}</p>
      </LegalSection>

      <LegalSection num="TU/06" title={t("sections.5.title")}>
        <p>{t("sections.5.paragraphs.0")}</p>
      </LegalSection>

      <LegalSection num="TU/07" title={t("sections.6.title")}>
        <p>{t("sections.6.paragraphs.0")}</p>
      </LegalSection>
    </LegalLayout>
  );
}
