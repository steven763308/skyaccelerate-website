"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Cookie-free, anonymous analytics for the Marketing Dashboard in SAG.
// Sends a page view on every route change and a click event for contact
// actions (WhatsApp, phone, email, "Request a Consultation"). Nothing is
// stored in the browser; /api/track turns the beacon into an anonymous
// event. Off in development and for visitors with Do Not Track / GPC on.

type Beacon =
  | { kind: "pageview"; path: string; referrer: string; locale: string; utm: Record<string, string> }
  | { kind: "click"; name: string; path: string; locale: string };

const optedOut = () => {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav.doNotTrack === "1" || nav.globalPrivacyControl === true;
};

const send = (payload: Beacon) => {
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" }))) return;
  } catch {
    // fall through to fetch
  }
  fetch("/api/track", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => undefined);
};

const utmFrom = (search: string) => {
  const params = new URLSearchParams(search);
  const utm: Record<string, string> = {};
  for (const key of ["source", "medium", "campaign"]) {
    const value = params.get(`utm_${key}`);
    if (value) utm[key] = value;
  }
  return utm;
};

// Which contact action a click was, if any. data-track="..." overrides.
const clickName = (target: EventTarget | null): string | null => {
  const el = target instanceof Element ? target.closest("a, [data-track]") : null;
  if (!el) return null;
  const explicit = el.getAttribute("data-track");
  if (explicit) return explicit;
  const href = el.getAttribute("href") ?? "";
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return "whatsapp";
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("mailto:")) return "email";
  if (/^(\/zh)?\/contact\/?$/.test(href)) return "consultation";
  return null;
};

export default function Analytics() {
  const pathname = usePathname();
  const enabled = process.env.NODE_ENV === "production";

  useEffect(() => {
    if (!enabled || optedOut()) return;
    send({
      kind: "pageview",
      path: window.location.pathname,
      referrer: document.referrer,
      locale: document.documentElement.lang,
      utm: utmFrom(window.location.search),
    });
  }, [pathname, enabled]);

  useEffect(() => {
    if (!enabled || optedOut()) return;
    const onClick = (e: MouseEvent) => {
      const name = clickName(e.target);
      if (name) send({ kind: "click", name, path: window.location.pathname, locale: document.documentElement.lang });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [enabled]);

  return null;
}
