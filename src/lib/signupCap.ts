/**
 * Sign-up growth cap: a fixed daily limit on new waitlist sign-ups that
 * steps up on a schedule, so growth stays steady and predictable rather
 * than spiking. Tune via env vars — no code change needed to adjust the
 * curve.
 */

const LAUNCH_DATE = process.env.SIGNUP_LAUNCH_DATE
  ? new Date(process.env.SIGNUP_LAUNCH_DATE)
  : new Date(); // defaults to "today" the first time this runs in an env without the var set

const BASE_DAILY_CAP = Number(process.env.SIGNUP_BASE_DAILY_CAP ?? 25);
const STEP_INCREMENT = Number(process.env.SIGNUP_STEP_INCREMENT ?? 15);
const STEP_INTERVAL_DAYS = Number(process.env.SIGNUP_STEP_INTERVAL_DAYS ?? 7);
const MAX_DAILY_CAP = Number(process.env.SIGNUP_MAX_DAILY_CAP ?? 500);

/** Today's sign-up cap, given how many days have passed since launch. */
export function getTodaysSignupCap(now: Date = new Date()): number {
  const daysSinceLaunch = Math.max(
    0,
    Math.floor((now.getTime() - LAUNCH_DATE.getTime()) / (1000 * 60 * 60 * 24))
  );
  const steps = Math.floor(daysSinceLaunch / STEP_INTERVAL_DAYS);
  const cap = BASE_DAILY_CAP + steps * STEP_INCREMENT;
  return Math.min(cap, MAX_DAILY_CAP);
}

/** Start of "today" in UTC, as an ISO string, for querying today's sign-up count. */
export function startOfTodayUtcIso(now: Date = new Date()): string {
  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  return start.toISOString();
}
