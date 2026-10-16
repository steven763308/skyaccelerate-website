import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSiteContent } from "@/lib/site-content";
import { flattenNav } from "@/lib/site-config";
import type { Locale } from "@/i18n/routing";

export default async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const { company, nav, footerLegalLinks } = await getSiteContent(locale);

  return (
    <footer className="bg-navy-800 text-paper">
      <div className="container-content pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/brand/logo-mark.png"
                alt="Sky Accelerate Group mark"
                width={589}
                height={215}
                className="h-8 w-auto"
              />
              <span className="font-serif text-lg">Sky Accelerate Group</span>
            </div>
            <p className="text-sm text-steel leading-relaxed max-w-xs">
              {company.legalName}
              <br />
              {company.registrationNo}
            </p>
            <p className="text-sm text-steel leading-relaxed mt-4 max-w-xs">
              {company.address.line1}
              <br />
              {company.address.line2}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow-light mb-4">{t("footer.companyHeading")}</p>
            <ul className="space-y-3">
              {/* Every page, flattened out of the header's dropdown groups (minus Home). */}
              {flattenNav(nav).slice(1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-steel hover:text-paper transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow-light mb-4">{t("footer.contactHeading")}</p>
            <ul className="space-y-3 text-sm text-steel">
              <li>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="hover:text-paper transition-colors"
                >
                  {company.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${company.contact.phoneHref}`}
                  className="hover:text-paper transition-colors"
                >
                  {company.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={company.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-paper transition-colors"
                >
                  {t("common.whatsappOurTeam")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline border-steel-line-dark mt-14 pt-8">
          <p className="text-xs leading-relaxed text-steel max-w-3xl">
            {t("footer.disclaimer", { legalName: company.legalName })}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 mt-8 text-xs text-steel">
          <p>
            © {new Date().getFullYear()} {company.legalName}.{" "}
            {t("footer.rightsReserved")}
          </p>
          <div className="flex gap-6">
            {footerLegalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-paper transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
