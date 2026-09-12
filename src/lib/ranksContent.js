/**
 * Ranks & Structure content.
 * Backed by Supabase (`ranks` table).
 *
 * Returns a flat array of tiers directly — e.g.
 *   [{ tier, color, members: [...] }, ...]
 * NOT wrapped in a `{ tiers: [...] }` object, to match how
 * (public)/ranks/page.js consumes it (ranks.flatMap(...)).
 */

import { createClient } from "@@/lib/supabase/client";

// Tier → accent color lives here, not in the DB, since it's a
// presentation concern tied to the fixed 3-tier check constraint
// on `ranks.tier`.
const TIER_COLOR = {
  Enlisted: "teal",
  "Non-Commissioned Officers": "gold",
  "Commissioned Officers": "coral",
};

const TIER_ORDER = [
  "Enlisted",
  "Non-Commissioned Officers",
  "Commissioned Officers",
];

export async function getRanksContent() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("ranks")
    .select("*")
    .order("level");

  if (error) throw error;

  const byTier = {};
  for (const r of data ?? []) {
    (byTier[r.tier] ??= []).push({
      rank: r.rank,
      abbreviation: r.abbr,
      level: r.level,
      description: r.description,
      requirements: r.requirements ?? [],
      responsibilities: r.responsibilities ?? [],
    });
  }

  return TIER_ORDER.filter((tier) => byTier[tier]).map((tier) => ({
    tier,
    color: TIER_COLOR[tier],
    members: byTier[tier],
  }));
}
