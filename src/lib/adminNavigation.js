/**
 * Shared admin sidebar navigation.
 *
 * BACKEND INTEGRATION POINT
 * ─────────────────────────
 * Currently static. When roles/permissions are driven by the backend,
 * replace getAdminNavGroups() with a real fetch, e.g.:
 *
 *   export async function getAdminNavGroups() {
 *     const res = await fetch("/api/admin/navigation", { cache: "no-store" });
 *     if (!res.ok) throw new Error(`Admin navigation fetch failed: ${res.status}`);
 *     const data = await res.json();
 *     return data.groups;
 *   }
 *
 * This lets nav items/groups be controlled server-side per role instead
 * of just hidden client-side (see isSuperAdmin filtering in AdminLayout).
 */

export const ADMIN_NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/admin", icon: "▪" }],
  },
  {
    label: "Content",
    items: [
      { label: "Blog Posts", href: "/admin/blog", icon: "▪" },
      { label: "Events", href: "/admin/events", icon: "▪" },
      { label: "Gallery", href: "/admin/gallery", icon: "▪" },
    ],
  },
  {
    label: "Organisation",
    items: [
      { label: "Ranks", href: "/admin/ranks", icon: "▪" },
      { label: "Pages", href: "/admin/pages", icon: "▪" },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Permissions", href: "/admin/permissions", icon: "▪" },
      { label: "Settings", href: "/admin/settings", icon: "▪" },
    ],
  },
];

export async function getAdminNavGroups() {
  return ADMIN_NAV_GROUPS;
}
