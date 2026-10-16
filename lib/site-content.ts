import { getSiteConfig } from "./get-site-config";
import type { Locale } from "@/i18n/routing";

// ---------------------------------------------------------------------------
// Site content = the built-in config in site-config(.zh).ts, overridden by
// whatever has been published from SAG (Marketing → Website Content).
//
// - Pages render statically; the SAG fetch is cached in Next's data cache
//   under the "site-content" tag for up to an hour.
// - Publishing in SAG calls /api/revalidate, which drops that cache so the
//   change shows up within seconds.
// - If SAG is unreachable, a previously cached copy keeps being served
//   (stale-while-revalidate). With no cached copy at all (e.g. a build while
//   SAG is down, or SAG not configured), the built-in config is used.
// - Each section is checked for the right basic shape before it replaces
//   the built-in one, so a malformed section can't break a page.
// ---------------------------------------------------------------------------

export const SITE_CONTENT_TAG = "site-content";
const REVALIDATE_SECONDS = 3600;
const FETCH_TIMEOUT_MS = 10_000;

type StaticConfig = ReturnType<typeof getSiteConfig>;

export type SiteContent = { -readonly [K in keyof StaticConfig]: StaticConfig[K] };

type PublishedSections = Record<string, unknown>;

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const isString = (v: unknown): v is string => typeof v === "string";

// Sections whose items must be objects carrying these string fields.
const LIST_SECTIONS: Record<string, string[]> = {
  services: ["slug", "category", "title", "summary"],
  caseReviews: ["ref", "category", "situation", "requirement", "role", "outcome"],
  insightPlaceholders: ["category", "title"],
  coreValues: ["title", "body"],
  differentiators: ["title", "body"],
  processSteps: ["title", "body"],
  timeline: ["year", "title", "body"],
};

const validList = (value: unknown, required: string[]) =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every((item) => isObject(item) && required.every((key) => isString(item[key])));

async function fetchPublished(locale: Locale): Promise<PublishedSections | null> {
  const baseUrl = process.env.SAG_API_URL?.replace(/\/+$/, "");
  const key = process.env.WEBSITE_API_KEY;
  if (!baseUrl || !key) return null;

  const request = fetch(`${baseUrl}/api/public/website/content?locale=${locale}`, {
    headers: { "X-Website-Key": key },
    next: { revalidate: REVALIDATE_SECONDS, tags: [SITE_CONTENT_TAG] },
  }).then(async (res) => {
    if (!res.ok) throw new Error(`SAG responded ${res.status}`);
    const body = await res.json();
    return isObject(body?.data?.sections) ? (body.data.sections as PublishedSections) : null;
  });

  // Not an AbortSignal: a timeout here only stops us waiting; it must not
  // interfere with Next's caching of the request itself.
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("SAG content request timed out")), FETCH_TIMEOUT_MS)
  );

  try {
    return await Promise.race([request, timeout]);
  } catch (err) {
    console.error(`Using built-in site content (${locale}):`, err instanceof Error ? err.message : err);
    return null;
  }
}

export function mergeSiteContent(base: StaticConfig, published: PublishedSections | null): SiteContent {
  if (!published) return base;
  const merged: SiteContent = { ...base };

  const company = published.company;
  if (isObject(company)) {
    const address = isObject(company.address) ? company.address : {};
    const contact = isObject(company.contact) ? company.contact : {};
    const pickStrings = <T extends Record<string, unknown>>(defaults: T, source: Record<string, unknown>): T => {
      const out = { ...defaults };
      for (const k of Object.keys(defaults)) {
        if (isString(source[k]) && source[k]) (out as Record<string, unknown>)[k] = source[k];
      }
      return out;
    };
    merged.company = {
      ...pickStrings(base.company, company),
      address: pickStrings(base.company.address, address),
      contact: pickStrings(base.company.contact, contact),
    };
  }

  for (const [key, required] of Object.entries(LIST_SECTIONS)) {
    const value = published[key];
    if (validList(value, required)) {
      (merged as Record<string, unknown>)[key] = value;
    } else if (value !== undefined) {
      console.error(`Ignoring malformed "${key}" from SAG; using built-in content.`);
    }
  }

  const options = published.serviceDropdownOptions;
  if (Array.isArray(options) && options.length > 0 && options.every(isString)) {
    merged.serviceDropdownOptions = options;
  }

  return merged;
}

export async function getSiteContent(locale: Locale): Promise<SiteContent> {
  return mergeSiteContent(getSiteConfig(locale), await fetchPublished(locale));
}
