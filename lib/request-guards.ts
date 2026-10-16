// Shared by the public form endpoints (contact, careers).
//
// --- Basic in-memory rate limiting ---------------------------------------
// Best-effort spam throttle: caps submissions per IP within a rolling
// window. Serverless functions on Vercel are ephemeral and can run as
// multiple concurrent instances, so this state isn't shared globally —
// it only protects within a single warm instance. That's sufficient to
// blunt basic bots/retries; for guaranteed cross-instance limiting, back
// this with Vercel KV / Upstash Redis instead.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5; // max submissions per IP per window
const submissionLog = new Map<string, number[]>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  submissionLog.set(ip, recent);

  // Opportunistically forget IPs with no recent activity so the map
  // doesn't grow unbounded over the life of a warm instance.
  if (submissionLog.size > 500) {
    for (const [key, timestamps] of submissionLog) {
      if (timestamps.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        submissionLog.delete(key);
      }
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}
