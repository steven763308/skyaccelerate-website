import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Newsreader, Work_Sans, Oswald, Noto_Sans_SC } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { routing, type Locale } from "@/i18n/routing";
import { getSiteContent } from "@/lib/site-content";
import { SiteContentProvider } from "@/components/SiteContentProvider";

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Chinese-glyph fallback for both the sans and display stacks (see
// tailwind.config.ts) — Work Sans / Oswald only cover Latin, so without
// this the browser falls back to whatever default CJK font the OS
// happens to ship, which reads noticeably smaller/lighter than the
// Latin type next to it. Not preloaded: it's a large font family and
// only the unicode ranges actually used on the page are fetched.
const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sc",
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const { company } = await getSiteContent((hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as Locale);

  return {
    metadataBase: new URL(company.siteUrl),
    title: {
      default: t("defaultTitle"),
      template: `%s | ${company.shortName}`,
    },
    description: t("defaultDescription"),
    keywords: [
      "CIDB Consultant Malaysia",
      "CIDB Registration Malaysia",
      "CIDB Contractor Registration",
      "CIDB Renewal",
      "CIDB Grade Upgrade",
      "Construction Compliance Malaysia",
      "Contractor Compliance Advisory",
    ],
    openGraph: {
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      url: company.siteUrl,
      siteName: company.shortName,
      locale: locale === "zh" ? "zh_CN" : "en_MY",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
    },
    alternates: {
      canonical: locale === "en" ? "/" : `/${locale}`,
      languages: {
        en: "/",
        zh: "/zh",
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enables static rendering for this locale.
  setRequestLocale(locale);
  const { company, nav, serviceDropdownOptions } = await getSiteContent(locale);

  return (
    <html
      lang={locale}
      className={`${serif.variable} ${sans.variable} ${display.variable} ${notoSansSC.variable}`}
    >
      <body className="font-sans">
        <NextIntlClientProvider>
          <SiteContentProvider content={{ company, nav, serviceDropdownOptions }}>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </SiteContentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
