/**
 * Shared site navigation data.
 *
 * BACKEND INTEGRATION POINT
 * ─────────────────────────
 * Currently static. When the backend is ready, replace the body of
 * getNavLinks() with a real fetch, e.g.:
 *
 *   export async function getNavLinks() {
 *     const res = await fetch("/api/navigation", { next: { revalidate: 300 } });
 *     if (!res.ok) throw new Error(`Navigation fetch failed: ${res.status}`);
 *     const data = await res.json();
 *     return data.links;
 *   }
 *
 * Both Navbar and Footer consume this single source, so nothing else
 * needs to change when you switch it over.
 */

export const NAV_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Ranks & Structure", href: "/ranks" },
  { label: "Rules & Regulations", href: "/rules" },
  { label: "Blog", href: "/blog" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export async function getNavLinks() {
  return NAV_LINKS;
}
