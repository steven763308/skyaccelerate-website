import { MetadataRoute } from "next";
import { company } from "@/lib/site-config";
import { routing } from "@/i18n/routing";

const routes = [
  "",
  "/about",
  "/services",
  "/cidb-advisory",
  "/case-reviews",
  "/insights",
  "/contact",
  "/privacy-policy",
  "/terms-of-use",
  "/disclaimer",
];

function localizedPath(locale: string, route: string) {
  if (locale === routing.defaultLocale) return route || "/";
  return `/${locale}${route}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${company.siteUrl}${localizedPath(routing.defaultLocale, route)}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          `${company.siteUrl}${localizedPath(locale, route)}`,
        ])
      ),
    },
  }));
}
