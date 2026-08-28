/**
 * Best-effort, in-memory rate limiter for API routes.
 *
 * LIMITATION: Vercel serverless functions are not guaranteed to share
 * memory across invocations or instances — under real concurrent load,
 * or after a cold start, this Map resets. This is a real but partial
 * defense layer, not a hard guarantee. For a hard guarantee, back this
 * with a shared store (e.g. Vercel KV / Upstash Redis) — deliberately
 * not added here since that means provisioning a new paid/free-tier
 * service, which we didn't want to do without sign-off.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Periodically forget stale buckets so this Map doesn't grow unbounded
// across a long-lived warm instance.
const MAX_TRACKED_KEYS = 5000;

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

/**
 * Returns whether `key` (usually an IP address) is still within
 * `limit` requests per `windowMs` milliseconds.
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    if (buckets.size >= MAX_TRACKED_KEYS) {
      buckets.clear();
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: limit - existing.count,
    resetAt: existing.resetAt,
  };
}

/** Best-effort extraction of the caller's IP from standard proxy headers. */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return headers.get("x-real-ip") ?? "unknown";
}
