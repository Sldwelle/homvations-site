/**
 * AI/API spend guardrail — scaffold.
 *
 * homvations-site itself does not call any AI provider today (Purple Pizza
 * AI is a separate app/domain, out of reach from this repo). This helper
 * exists so that WHEN this site (or a future app in the hub) adds an AI
 * call, it's one import away from a hard $5/day ceiling instead of an
 * unbounded bill.
 *
 * Backed by a `ai_usage_daily` table (date primary key, cost_usd numeric)
 * in this project's Supabase database — see the migration that creates it.
 * Falls back to "allow" if that table isn't reachable, so a guard-rail
 * outage never takes the whole site down; it logs loudly instead.
 *
 * Example usage in a future API route before calling an AI provider:
 *
 *   import { canSpend, recordAiSpend } from "@/lib/aiSpendGuard";
 *
 *   if (!(await canSpend(estimatedCostUsd))) {
 *     return new Response("Daily AI budget reached — try again tomorrow.", { status: 429 });
 *   }
 *   const result = await callSomeAiProvider(...);
 *   await recordAiSpend(actualCostUsd);
 */

import { createClient } from "@supabase/supabase-js";

const DAILY_AI_BUDGET_USD = Number(process.env.DAILY_AI_BUDGET_USD ?? 5);

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !key) return null;
  return createClient(url, key);
}

function todayUtcDateString(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10); // YYYY-MM-DD
}

/** Today's recorded AI spend in USD, or 0 if the tracking table isn't reachable yet. */
export async function getTodayAiSpend(): Promise<number> {
  const supabase = getServerSupabase();
  if (!supabase) return 0;

  const { data, error } = await supabase
    .from("ai_usage_daily")
    .select("cost_usd")
    .eq("usage_date", todayUtcDateString())
    .maybeSingle();

  if (error) {
    console.warn("[aiSpendGuard] could not read today's AI spend:", error.message);
    return 0;
  }
  return data?.cost_usd ?? 0;
}

/** Whether spending `estimatedCostUsd` more today would stay within the daily budget. */
export async function canSpend(estimatedCostUsd: number): Promise<boolean> {
  const spentSoFar = await getTodayAiSpend();
  return spentSoFar + estimatedCostUsd <= DAILY_AI_BUDGET_USD;
}

/** Records additional AI spend for today (upserts, adding to any existing total). */
export async function recordAiSpend(costUsd: number): Promise<void> {
  const supabase = getServerSupabase();
  if (!supabase) return;

  const today = todayUtcDateString();
  const spentSoFar = await getTodayAiSpend();

  const { error } = await supabase
    .from("ai_usage_daily")
    .upsert({ usage_date: today, cost_usd: spentSoFar + costUsd });

  if (error) {
    console.warn("[aiSpendGuard] could not record AI spend:", error.message);
  }
}

export { DAILY_AI_BUDGET_USD };
