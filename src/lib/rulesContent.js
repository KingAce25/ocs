/**
 * Rules & Regulations content.
 * Backed by Supabase (`rule_categories` + `rules` tables).
 */

import { createClient } from "@@/lib/supabase/client";

export async function getRulesContent() {
  const supabase = createClient();

  const [
    { data: categories, error: catErr },
    { data: rules, error: rulesErr },
  ] = await Promise.all([
    supabase.from("rule_categories").select("*").order("sort_order"),
    supabase.from("rules").select("*").order("sort_order"),
  ]);

  if (catErr) throw catErr;
  if (rulesErr) throw rulesErr;

  const rulesByCategory = {};
  for (const rule of rules ?? []) {
    (rulesByCategory[rule.category_id] ??= []).push(rule);
  }

  const latestTimestamp = (rules ?? []).reduce((max, r) => {
    const t = new Date(r.updated_at).getTime();
    return t > max ? t : max;
  }, 0);

  const lastUpdated = latestTimestamp
    ? new Date(latestTimestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : null;

  return {
    categories: (categories ?? []).map((cat) => ({
      id: cat.id,
      label: cat.label,
      icon: cat.icon,
      rules: (rulesByCategory[cat.id] ?? []).map((r) => ({
        number: r.number,
        title: r.title,
        body: r.body,
      })),
    })),
    lastUpdated,
  };
}
