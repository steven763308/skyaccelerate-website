import { MetadataRoute } from "next";
import { company } from "@/lib/site-config";
import { routing } from "@/i18n/routing";
import { getSiteContent, isPublishedArticle } from "@/lib/site-content";

// Rendered per request (it's fetched rarely) so newly published Insights
// articles appear immediately; the content itself still comes from the
// shared "site-content" cache, not a fresh SAG call each time.
export const dynamic = "force-dynamic";

const routes = [
  "",
  "/about",
  "/services",
  "/cidb-advisory",
  "/case-reviews",
  "/insights",
  "/careers",
  "/contact",
  "/privacy-policy",
  "/terms-of-use",
  "/disclaimer",
];

function localizedPath(locale: string, route: string) {
  if (locale === routing.defaultLocale) return route || "/";
  return `/${locale}${route}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Full Insights articles published from SAG.
  const { insightPlaceholders } = await getSiteContent(routing.defaultLocale);
  const articleRoutes = insightPlaceholders.filter(isPublishedArticle).map((a) => `/insights/${a.slug}`);

  return [...routes, ...articleRoutes].map((route) => ({
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
