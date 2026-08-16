"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getSiteConfig } from "@/lib/get-site-config";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/i18n/routing";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const { nav, company } = getSiteConfig(locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-paper/95 backdrop-blur border-b transition-shadow duration-300 ${
        scrolled
          ? "border-steel-line shadow-[0_4px_24px_rgba(14,23,41,0.06)]"
          : "border-transparent"
      }`}
    >
      <div
        className={`container-content flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? "h-20" : "h-24"
        }`}
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/brand/logo-full.png"
            alt="Sky Accelerate Group"
            width={724}
            height={286}
            priority
            className={`w-auto transition-[height] duration-300 ${
              scrolled ? "h-11" : "h-14"
            }`}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] tracking-wide text-ink/75 hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <LanguageSwitcher />
          <Link href="/contact" className="btn-primary">
            {t("common.requestConsultation")}
          </Link>
        </div>

        <button
          aria-label={t("header.toggleMenu")}
          aria-expanded={open}
          className="lg:hidden flex flex-col gap-1.5 h-10 w-10 items-center justify-center"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-px w-6 bg-ink transition-transform ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-transform ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-steel-line bg-paper">
          <div className="container-content py-6 flex flex-col gap-5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm tracking-wide text-ink"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-1">
              <LanguageSwitcher />
            </div>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary justify-center mt-2"
            >
              {t("common.requestConsultation")}
            </Link>
            <a
              href={company.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline justify-center"
            >
              {t("common.whatsappUs")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
