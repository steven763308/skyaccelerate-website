// Shared by the public endpoints (contact, careers, analytics).
//
// --- Basic in-memory rate limiting ---------------------------------------
// Best-effort spam throttle: caps requests per IP within a rolling window.
// Serverless functions on Vercel are ephemeral and can run as multiple
// concurrent instances, so this state isn't shared globally — it only
// protects within a single warm instance. That's sufficient to blunt basic
// bots/retries; for guaranteed cross-instance limiting, back this with
// Vercel KV / Upstash Redis instead.
export function createRateLimiter(max: number, windowMs: number) {
  const log = new Map<string, number[]>();

  return function isLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (log.get(ip) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    log.set(ip, recent);

    // Opportunistically forget IPs with no recent activity so the map
    // doesn't grow unbounded over the life of a warm instance.
    if (log.size > 500) {
      for (const [key, timestamps] of log) {
        if (timestamps.every((t) => now - t >= windowMs)) log.delete(key);
      }
    }

    return recent.length > max;
  };
}

// Form submissions: 5 per IP per 10 minutes.
export const isRateLimited = createRateLimiter(5, 10 * 60 * 1000);

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
