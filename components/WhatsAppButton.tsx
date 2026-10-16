import { getLocale, getTranslations } from "next-intl/server";
import { getSiteContent } from "@/lib/site-content";
import type { Locale } from "@/i18n/routing";

export default async function WhatsAppButton() {
  const t = await getTranslations("common");
  const { company } = await getSiteContent((await getLocale()) as Locale);

  return (
    <a
      href={company.contact.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsappUs")}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-navy-800 text-paper pl-4 pr-5 py-3 text-xs tracking-wide uppercase border border-paper/10 shadow-[0_8px_24px_rgba(14,23,41,0.25)] hover:bg-navy-700 transition-colors"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-steel" />
      {t("whatsappUs")}
    </a>
  );
}
