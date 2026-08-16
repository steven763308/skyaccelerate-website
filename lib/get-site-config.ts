import * as en from "./site-config";
import * as zh from "./site-config.zh";
import type { Locale } from "@/i18n/routing";

const configs = { en, zh };

export function getSiteConfig(locale: Locale) {
  return configs[locale] ?? configs.en;
}
