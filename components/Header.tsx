"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { NavItem } from "@/lib/site-config";
import { useSiteContent } from "@/components/SiteContentProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations();
  const { nav, company } = useSiteContent();
  const pathname = usePathname();
  const isActive = (item: NavItem) =>
    item.href === "/"
      ? pathname === "/"
      : [item, ...(item.children ?? [])].some((l) => pathname === l.href || pathname.startsWith(`${l.href}/`));

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

        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {nav.map((item) => {
            const linkClass = `inline-flex items-center gap-1.5 text-[13px] tracking-wide transition-colors ${
              isActive(item) ? "text-ink" : "text-ink/75 hover:text-ink"
            }`;
            if (!item.children?.length) {
              return (
                <Link key={item.href} href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              );
            }
            // Opens on hover and on keyboard focus (focus-within); the
            // parent label still links to its own page.
            return (
              <div key={item.href} className="relative group">
                <Link href={item.href} aria-haspopup="true" className={`${linkClass} py-3`}>
                  {item.label}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 10 6"
                    className="h-1.5 w-2.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                  >
                    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </Link>
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <ul className="min-w-[210px] border border-steel-line bg-paper py-2 shadow-[0_12px_32px_rgba(14,23,41,0.10)]">
                    {item.children.map((child) => {
                      const active = pathname === child.href;
                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block px-5 py-2.5 text-[13px] tracking-wide transition-colors hover:bg-paper-dim ${
                              active ? "text-ink" : "text-ink/75 hover:text-ink"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
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
            {nav.map((item) =>
              item.children?.length ? (
                <div key={item.href}>
                  <p className="text-sm tracking-wide text-ink">{item.label}</p>
                  <div className="mt-3 ml-1 flex flex-col gap-3 border-l border-steel-line pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="text-sm tracking-wide text-ink/75"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-sm tracking-wide text-ink"
                >
                  {item.label}
                </Link>
              )
            )}
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
