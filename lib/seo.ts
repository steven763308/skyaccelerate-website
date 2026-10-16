import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getSiteContent, type SeoPageKey } from "./site-content";

// A page's metadata with any title/description set in SAG (Website Content →
// SEO) taking precedence over the built-in wording.
export async function withSeo(locale: string, page: SeoPageKey, metadata: Metadata): Promise<Metadata> {
  const { seo } = await getSiteContent(locale as Locale);
  const override = seo[page];
  if (!override?.title && !override?.description) return metadata;

  const title = override.title ?? metadata.title;
  const description = override.description ?? metadata.description;
  return {
    ...metadata,
    title,
    description,
    openGraph: { ...metadata.openGraph, ...(override.title && { title: override.title }), ...(override.description && { description: override.description }) },
    twitter: { ...metadata.twitter, ...(override.title && { title: override.title }), ...(override.description && { description: override.description }) },
  };
}
