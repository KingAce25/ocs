/**
 * Rank → insignia recipe lookup.
 *
 * This is plain data (not visual code), so it's extracted the same way
 * as other rank content. It must be kept in sync with the rank names in
 * lib/ranksContent.js — if a rank is renamed or added there without a
 * matching entry here, RankInsignia has no recipe to render and will
 * fall back to the generic placeholder (see RankInsignia.jsx).
 *
 * BACKEND INTEGRATION POINT
 * ─────────────────────────
 * If ranks become fully backend-managed (added/renamed via the future
 * /admin/ranks page), consider storing each rank's insignia recipe
 * alongside its other fields in the same database record, and fetching
 * both together — rather than keeping this as a separate hardcoded map
 * that has to be manually updated every time a rank changes.
 */

export const INSIGNIA_MAP = {
  Constable: { repeated: { symbol: "chevron", count: 1 } },
  Corporal: { repeated: { symbol: "chevron", count: 2 } },
  Sergeant: { repeated: { symbol: "chevron", count: 3 } },

  "Junior Inspector": { repeated: { symbol: "bar", count: 1 } },
  "Full Inspector": { repeated: { symbol: "bar", count: 2 } },
  "Senior Inspector": { repeated: { symbol: "bar", count: 3 } },

  "Second Lieutenant": { repeated: { symbol: "star2", count: 1 } },
  Lieutenant: { repeated: { symbol: "star2", count: 2 } },
  Captain: { repeated: { symbol: "star2", count: 3 } },

  Major: { top: "eagle" },
  "Lieutenant Colonel": { top: "eagle", starsRow2: 1 },
  Colonel: { top: "eagle", starsRow2: 2 },
  "Brigadier General": { top: "eagle", starsRow2: 3 },
  "Major General": { top: "eagle", emblem: true },
  "One Star General": { top: "eagle", starsRow2: 1, emblem: true },
  "Two Star General": { top: "eagle", starsRow2: 2, emblem: true },
  "Three Star General": { top: "eagle", starsRow: 3, emblem: true },

  "Assistant Commander General": {
    top: "star",
    swords: true,
    flankingStars: 2,
    emblem: true,
  },
  "Deputy Commander General": {
    top: "eagle",
    swords: true,
    flankingStars: 2,
    emblem: true,
  },
  "Commander General": {
    stackedTop: "emblem",
    top: "star",
    swords: true,
    flankingStars: 2,
    emblem: true,
  },
  "Grand Commander": {
    stackedTop: "wreath",
    top: "eagle",
    swords: true,
    flankingStars: 2,
    emblem: true,
  },
};
