import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalLayout, LegalSection } from "@/components/Legal";
import { company } from "@/lib/site-config";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PrivacyPolicyPage" });
  return {
    title: t("title"),
    alternates: { canonical: "/privacy-policy" },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("PrivacyPolicyPage");
  const tCommon = await getTranslations("common");

  return (
    <LegalLayout eyebrow={tCommon("legal")} title={t("title")} updated={t("updated")}>
      <p>
        {t("intro", {
          legalName: company.legalName,
          registrationNo: company.registrationNo,
        })}
      </p>

      <LegalSection num="PP/01" title={t("sections.0.title")}>
        <p>{t("sections.0.paragraphs.0")}</p>
        <p>{t("sections.0.paragraphs.1")}</p>
      </LegalSection>

      <LegalSection num="PP/02" title={t("sections.1.title")}>
        <p>{t("sections.1.intro")}</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>{t("sections.1.list.0")}</li>
          <li>{t("sections.1.list.1")}</li>
          <li>{t("sections.1.list.2")}</li>
          <li>{t("sections.1.list.3")}</li>
          <li>{t("sections.1.list.4")}</li>
        </ul>
      </LegalSection>

      <LegalSection num="PP/03" title={t("sections.2.title")}>
        <p>{t("sections.2.paragraphs.0")}</p>
        <p>{t("sections.2.paragraphs.1")}</p>
      </LegalSection>

      <LegalSection num="PP/04" title={t("sections.3.title")}>
        <p>{t("sections.3.paragraphs.0")}</p>
      </LegalSection>

      <LegalSection num="PP/05" title={t("sections.4.title")}>
        <p>{t("sections.4.paragraphs.0")}</p>
      </LegalSection>

      <LegalSection num="PP/06" title={t("sections.5.title")}>
        <p>
          {t("sections.5.paragraphs.0", {
            email: company.contact.email,
            phone: company.contact.phoneDisplay,
          })}
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
