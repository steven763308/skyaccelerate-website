import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { getSiteConfig } from "@/lib/get-site-config";
import { getSiteContent } from "@/lib/site-content";
import { routing, type Locale } from "@/i18n/routing";

// Diagnostics for the SAG connection. Open in a browser:
//   /api/site-content-status?key=<WEBSITE_API_KEY>&locale=en
// Shows whether this deployment is configured, what SAG returns right now
// (uncached), and what the site is actually rendering (cached), so a silent
// fallback to the built-in content can be explained.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const digest = (value: string) => createHash("sha256").update(value).digest();

const summarize = (sections: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(sections).map(([k, v]) => [k, Array.isArray(v) ? `${v.length} items` : v && typeof v === "object" ? "object" : typeof v])
  );

export async function GET(req: Request) {
  const url = new URL(req.url);
  const expected = process.env.WEBSITE_API_KEY;
  const provided = url.searchParams.get("key") || req.headers.get("x-website-key") || "";
  if (!expected || !provided || !timingSafeEqual(digest(provided), digest(expected))) {
    return NextResponse.json(
      { error: "Unauthorized", websiteApiKeyConfigured: Boolean(expected) },
      { status: 401 }
    );
  }

  const localeParam = url.searchParams.get("locale") || routing.defaultLocale;
  const locale = ((routing.locales as readonly string[]).includes(localeParam) ? localeParam : routing.defaultLocale) as Locale;
  const baseUrl = process.env.SAG_API_URL?.replace(/\/+$/, "");

  // 1. Live, uncached request to SAG.
  let live: Record<string, unknown>;
  if (!baseUrl) {
    live = { ok: false, error: "SAG_API_URL is not set in this deployment" };
  } else {
    const started = Date.now();
    try {
      const res = await fetch(`${baseUrl}/api/public/website/content?locale=${locale}`, {
        headers: { "X-Website-Key": expected },
        cache: "no-store",
        signal: AbortSignal.timeout(20_000),
      });
      const body = await res.json().catch(() => null);
      const sections = body?.data?.sections;
      live = {
        ok: res.ok,
        status: res.status,
        ms: Date.now() - started,
        message: res.ok ? undefined : body?.message,
        updatedAt: body?.data?.updatedAt,
        sections: sections && typeof sections === "object" ? summarize(sections) : null,
        serviceTitles: Array.isArray(sections?.services) ? sections.services.map((s: { title?: string }) => s.title) : null,
      };
    } catch (err) {
      live = { ok: false, ms: Date.now() - started, error: err instanceof Error ? err.message : String(err) };
    }
  }

  // 2. What pages are rendering (through the shared cache).
  const rendered = await getSiteContent(locale);
  const builtIn = getSiteConfig(locale);

  return NextResponse.json({
    locale,
    deployment: {
      sagApiUrl: baseUrl ?? null,
      vercelEnv: process.env.VERCEL_ENV ?? null,
      gitBranch: process.env.VERCEL_GIT_COMMIT_REF ?? null,
      gitCommit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
    },
    sagLive: live,
    rendered: {
      serviceTitles: rendered.services.map((s) => s.title),
      usingBuiltInServices: JSON.stringify(rendered.services) === JSON.stringify(builtIn.services),
    },
  });
}
