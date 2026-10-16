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

// Sections that only exist in SAG (no built-in equivalent).
export type InsightItem = {
  ref: string;
  category: string;
  title: string;
  status?: string;
  slug?: string;
  date?: string;
  summary?: string;
  body?: string;
};

export type JobOpening = {
  slug: string;
  title: string;
  location?: string;
  employmentType?: string;
  summary: string;
  responsibilities?: string[];
  requirements?: string[];
};

export type Announcement = { enabled: boolean; message?: string; linkLabel?: string; linkHref?: string };

export type SeoPageKey = "home" | "about" | "services" | "cidbAdvisory" | "caseReviews" | "insights" | "careers" | "contact";
export type SeoOverrides = Partial<Record<SeoPageKey, { title?: string; description?: string }>>;

export type AutoReply = { enabled: boolean; subject?: string; body?: string };

export type SiteContent = Omit<{ -readonly [K in keyof StaticConfig]: StaticConfig[K] }, "insightPlaceholders"> & {
  insightPlaceholders: InsightItem[];
  careers: JobOpening[];
  announcement: Announcement;
  seo: SeoOverrides;
  autoReply: AutoReply;
};

// An insight with a slug and body is a full article at /insights/<slug>.
export const isPublishedArticle = (item: InsightItem): item is InsightItem & { slug: string; body: string } =>
  Boolean(item.slug && item.body);

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
  careers: ["slug", "title", "summary"],
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

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const stringField = (source: Record<string, unknown>, key: string) =>
  isString(source[key]) && source[key] ? (source[key] as string) : undefined;

export function mergeSiteContent(base: StaticConfig, published: PublishedSections | null): SiteContent {
  const merged: SiteContent = {
    ...base,
    careers: [],
    announcement: { enabled: false },
    seo: {},
    autoReply: { enabled: false },
  };
  if (!published) return merged;

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

  // Careers & insights slugs become URLs — drop anything not URL-safe.
  merged.careers = merged.careers.filter((job) => SLUG.test(job.slug));
  merged.insightPlaceholders = merged.insightPlaceholders.map((item) =>
    item.slug && !SLUG.test(item.slug) ? { ...item, slug: undefined } : item
  );

  const announcement = published.announcement;
  if (isObject(announcement)) {
    const message = stringField(announcement, "message");
    const linkHref = stringField(announcement, "linkHref");
    merged.announcement = {
      enabled: announcement.enabled === true && Boolean(message),
      message,
      linkLabel: stringField(announcement, "linkLabel"),
      // Same rule SAG enforces: a site path or an https URL, nothing else.
      linkHref: linkHref && /^(\/[^\s]*|https:\/\/[^\s"'<>]+)$/.test(linkHref) ? linkHref : undefined,
    };
  }

  const seo = published.seo;
  if (isObject(seo)) {
    for (const [page, value] of Object.entries(seo)) {
      if (!isObject(value)) continue;
      merged.seo[page as SeoPageKey] = { title: stringField(value, "title"), description: stringField(value, "description") };
    }
  }

  const autoReply = published.autoReply;
  if (isObject(autoReply)) {
    const subject = stringField(autoReply, "subject");
    const body = stringField(autoReply, "body");
    merged.autoReply = { enabled: autoReply.enabled === true && Boolean(subject && body), subject, body };
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
