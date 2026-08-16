import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh"],
  defaultLocale: "en",
  // English keeps its existing unprefixed URLs (e.g. /services); Chinese
  // gets a /zh prefix (e.g. /zh/services). Preserves current SEO for the
  // English site while adding a distinct, indexable Chinese version.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
