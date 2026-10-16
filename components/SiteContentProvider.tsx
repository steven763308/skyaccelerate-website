"use client";

import { createContext, useContext } from "react";
import type { SiteContent } from "@/lib/site-content";

// Only what client components use — everything passed here is embedded in
// every page's HTML, so keep the bulky sections (services, case reviews...)
// on the server.
export type ClientSiteContent = Pick<SiteContent, "company" | "nav" | "serviceDropdownOptions">;

// Hands the server-loaded site content (built-in config + whatever was
// published from SAG) to client components such as the Header and the
// contact form, which can't fetch it themselves.
const SiteContentContext = createContext<ClientSiteContent | null>(null);

export function SiteContentProvider({ content, children }: { content: ClientSiteContent; children: React.ReactNode }) {
  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent(): ClientSiteContent {
  const content = useContext(SiteContentContext);
  if (!content) throw new Error("useSiteContent must be used inside <SiteContentProvider>");
  return content;
}
