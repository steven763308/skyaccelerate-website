import { NextResponse } from "next/server";
import { browserOf, deviceOf, hostOf, isBot, sourceOf, visitorHash } from "@/lib/analytics";
import { createRateLimiter, getClientIp } from "@/lib/request-guards";

// Receives the browser's analytics beacons (components/Analytics.tsx) and
// forwards an anonymous event to SAG, where the Marketing Dashboard reads
// it. Always answers 204: analytics must never surface errors to visitors.
export const runtime = "nodejs";

const isLimited = createRateLimiter(120, 10 * 60 * 1000);
const SAG_TIMEOUT_MS = 4000;
const CLICK_NAMES = new Set(["whatsapp", "phone", "email", "consultation"]);

const noContent = () => new NextResponse(null, { status: 204 });
const clip = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);

export async function POST(req: Request) {
  const baseUrl = process.env.SAG_API_URL?.replace(/\/+$/, "");
  const key = process.env.WEBSITE_API_KEY;
  if (!baseUrl || !key) return noContent();

  const ua = req.headers.get("user-agent") ?? "";
  if (isBot(ua)) return noContent();
  const ip = getClientIp(req);
  if (isLimited(ip)) return noContent();

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(await req.text());
  } catch {
    return noContent();
  }

  const kind = body.kind === "click" ? "click" : body.kind === "pageview" ? "pageview" : null;
  const path = clip(body.path, 300);
  if (!kind || !path || !path.startsWith("/") || path.startsWith("/api/")) return noContent();
  const name = kind === "click" ? clip(body.name, 40) : null;
  if (kind === "click" && (!name || !CLICK_NAMES.has(name))) return noContent();

  const ownHost = hostOf(req.headers.get("origin") || `https://${req.headers.get("host") ?? ""}`);
  const referrerHost = hostOf(String(body.referrer ?? ""));
  const utm = (body.utm ?? {}) as Record<string, unknown>;
  const utmSource = clip(utm.source, 100);

  const event = {
    kind,
    name,
    path,
    locale: clip(body.locale, 10),
    source: sourceOf(referrerHost, ownHost, utmSource),
    referrerHost: referrerHost && referrerHost !== ownHost ? referrerHost : null,
    utmSource,
    utmMedium: clip(utm.medium, 100),
    utmCampaign: clip(utm.campaign, 150),
    country: req.headers.get("x-vercel-ip-country"),
    device: deviceOf(ua),
    browser: browserOf(ua),
    visitorHash: visitorHash(ip, ua, process.env.ANALYTICS_SALT || key),
    env: process.env.VERCEL_ENV ?? "development",
    occurredAt: new Date().toISOString(),
  };

  try {
    await fetch(`${baseUrl}/api/public/website/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Website-Key": key },
      body: JSON.stringify({ events: [event] }),
      signal: AbortSignal.timeout(SAG_TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (err) {
    console.error("Analytics forward failed:", err instanceof Error ? err.message : err);
  }
  return noContent();
}
