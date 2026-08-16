"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="h-4 w-4"
    aria-hidden
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
  </svg>
);

export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("common");

  return (
    <div
      className={`flex items-center gap-1.5 text-[13px] tracking-wide ${
        light ? "text-paper/80" : "text-ink/75"
      }`}
      aria-label={t("languageSwitcherLabel")}
    >
      <GlobeIcon />
      <Link
        href={pathname}
        locale="en"
        className={locale === "en" ? "font-medium underline underline-offset-4" : "hover:underline underline-offset-4"}
      >
        EN
      </Link>
      <span aria-hidden className="opacity-40">
        /
      </span>
      <Link
        href={pathname}
        locale="zh"
        className={locale === "zh" ? "font-medium underline underline-offset-4" : "hover:underline underline-offset-4"}
      >
        中文
      </Link>
    </div>
  );
}
