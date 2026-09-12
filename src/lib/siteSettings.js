/**
 * Site-wide settings: metadata, brand copy, footer content.
 *
 * BACKEND INTEGRATION POINT
 * ─────────────────────────
 * Currently static. When the backend is ready, replace the body of
 * getSiteSettings() with a real fetch, e.g.:
 *
 *   export async function getSiteSettings() {
 *     const res = await fetch(`${process.env.API_BASE_URL}/site-settings`, {
 *       next: { revalidate: 300 },
 *     });
 *     if (!res.ok) throw new Error(`Site settings fetch failed: ${res.status}`);
 *     return res.json();
 *   }
 *
 * Both RootLayout (metadata) and Footer (visible content) read from
 * this single source, so nothing else needs to change when you switch it over.
 */

export const SITE_SETTINGS = {
  name: "Onward Christian Soldiers",
  title: "Onward Christian Soldiers — Faith, Discipline, Brotherhood",
  description:
    "Onward Christian Soldiers (OCS) — a faith-based military brotherhood committed to Scripture, service, and excellence.",
  brandBlurb:
    "Standing firm in faith, discipline, and service. A brotherhood built on Scripture and honour.",
  verse: {
    text: "Put on the full armor of God, so that you can take your stand against the devil's schemes.",
    citation: "Ephesians 6:11",
  },
  tagline: "Built with faith & purpose.",
};

export async function getSiteSettings() {
  return SITE_SETTINGS;
}
