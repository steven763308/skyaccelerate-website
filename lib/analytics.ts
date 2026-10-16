import { createHash } from "crypto";

// Server-side helpers for /api/track: turn a raw beacon into an anonymous
// analytics event. Nothing here can identify a person — the visitor hash
// mixes in a secret and the date, so it can't be reversed and changes daily.

const BOT_UA =
  // WhatsApp's link-preview fetcher is "WhatsApp/x.y" (real WhatsApp users
  // open links in their own browser); other previewers say bot/preview.
  /bot|crawl|spider|slurp|preview|facebookexternalhit|^whatsapp\/|headless|lighthouse|pingdom|uptime|monitor|curl|wget|python|axios|node-fetch|go-http|java\//i;

export const isBot = (ua: string) => !ua || BOT_UA.test(ua);

export const deviceOf = (ua: string): "mobile" | "tablet" | "desktop" => {
  if (/iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(ua)) return "tablet";
  if (/Mobi|iPhone|iPod|Android|IEMobile|Opera Mini/i.test(ua)) return "mobile";
  return "desktop";
};

export const browserOf = (ua: string): string => {
  if (/Edg\//.test(ua)) return "Edge";
  if (/OPR\/|Opera/.test(ua)) return "Opera";
  if (/SamsungBrowser/.test(ua)) return "Samsung Internet";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Chrome\/|CriOS\//.test(ua)) return "Chrome";
  if (/Safari\//.test(ua)) return "Safari";
  return "Other";
};

// Known referrers grouped under a readable name; anything else is shown by
// its host. utm_source, when present, wins.
const SOURCE_RULES: [RegExp, string][] = [
  [/(^|\.)google\./, "Google"],
  [/(^|\.)bing\.com$/, "Bing"],
  [/(^|\.)yahoo\./, "Yahoo"],
  [/(^|\.)duckduckgo\.com$/, "DuckDuckGo"],
  [/(^|\.)baidu\.com$/, "Baidu"],
  [/(^|\.)(facebook\.com|fb\.com|fb\.me)$/, "Facebook"],
  [/(^|\.)instagram\.com$/, "Instagram"],
  [/(^|\.)(linkedin\.com|lnkd\.in)$/, "LinkedIn"],
  [/(^|\.)(t\.co|twitter\.com|x\.com)$/, "X"],
  [/(^|\.)(youtube\.com|youtu\.be)$/, "YouTube"],
  [/(^|\.)(whatsapp\.com|wa\.me)$/, "WhatsApp"],
  [/(^|\.)xiaohongshu\.com$/, "Xiaohongshu"],
  [/(^|\.)chatgpt\.com$|(^|\.)openai\.com$/, "ChatGPT"],
];

const UTM_ALIASES: Record<string, string> = {
  fb: "Facebook",
  facebook: "Facebook",
  ig: "Instagram",
  instagram: "Instagram",
  google: "Google",
  linkedin: "LinkedIn",
  whatsapp: "WhatsApp",
  wa: "WhatsApp",
  email: "Email",
  newsletter: "Email",
};

export const hostOf = (url: string): string | null => {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
};

export const sourceOf = (referrerHost: string | null, ownHost: string | null, utmSource: string | null): string => {
  if (utmSource) {
    const key = utmSource.trim().toLowerCase();
    return UTM_ALIASES[key] ?? utmSource.trim().slice(0, 60);
  }
  if (!referrerHost || (ownHost && referrerHost === ownHost)) return "Direct";
  return SOURCE_RULES.find(([re]) => re.test(referrerHost))?.[1] ?? referrerHost;
};

export const visitorHash = (ip: string, ua: string, secret: string, now = new Date()): string => {
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kuala_Lumpur" }).format(now);
  return createHash("sha256").update(`${day}|${ip}|${ua}|${secret}`).digest("hex").slice(0, 32);
};
