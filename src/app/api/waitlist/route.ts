import { createClient } from "@supabase/supabase-js";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { getTodaysSignupCap, startOfTodayUtcIso } from "@/lib/signupCap";

// Sign-up requests are handled server-side (not written to Supabase
// directly from the browser) so we get one chokepoint for validation,
// bot checks, rate limiting, and the growth cap before anything touches
// the database.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_FORM_FILL_MS = 1500; // real people take at least this long; bots don't
const RATE_LIMIT_MAX = 5; // requests
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes, per IP

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return createClient(url, key);
}

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    company?: string; // honeypot — real users never fill this in
    startedAt?: number;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, company, startedAt } = body;

  // --- bot protection ---------------------------------------------------
  // Honeypot: a hidden field real users never see or fill in.
  if (company) {
    // Pretend success so bots don't learn the honeypot tipped us off.
    return Response.json({ ok: true });
  }
  // Minimum time-on-form: instant submissions are almost always scripted.
  if (typeof startedAt === "number" && Date.now() - startedAt < MIN_FORM_FILL_MS) {
    return Response.json({ ok: true });
  }

  // --- input validation ---------------------------------------------------
  const cleanName = (name ?? "").trim();
  const cleanEmail = (email ?? "").trim().toLowerCase();
  if (!cleanName || cleanName.length > 120) {
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!cleanEmail || cleanEmail.length > 254 || !EMAIL_RE.test(cleanEmail)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  // --- rate limiting -------------------------------------------------------
  const ip = getClientIp(request.headers);
  const rateLimit = checkRateLimit(`waitlist:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!rateLimit.allowed) {
    return Response.json(
      { error: "Too many attempts. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  const supabase = getSupabase();

  // --- sign-up growth cap ---------------------------------------------------
  const todaysCap = getTodaysSignupCap();
  const { count, error: countError } = await supabase
    .from("waitlist_leads")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startOfTodayUtcIso());

  if (countError) {
    console.error("[waitlist] could not check today's sign-up count:", countError.message);
  } else if (typeof count === "number" && count >= todaysCap) {
    return Response.json(
      {
        error:
          "We're growing steadily and today's sign-up spots are full — please check back tomorrow!",
      },
      { status: 429 }
    );
  }

  // --- write the sign-up ---------------------------------------------------
  const { error: insertError } = await supabase
    .from("waitlist_leads")
    .insert([{ name: cleanName, email: cleanEmail }]);

  if (insertError) {
    // Surface a friendly message; log detail server-side only.
    console.error("[waitlist] insert failed:", insertError.message);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  return Response.json({ ok: true });
}
