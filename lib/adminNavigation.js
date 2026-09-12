export const ADMIN_NAV_GROUPS = [
  {
    label: "Content",
    items: [
      { label: "Dashboard", href: "/admin" },
      { label: "Blog", href: "/admin/blog" },
      { label: "Events", href: "/admin/events" },
      { label: "Gallery", href: "/admin/gallery" },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Permissions", href: "/admin/permissions" },
      { label: "Settings", href: "/admin/settings" },
    ],
  },
];

// Stub — returns the static groups. Wire this to Supabase later if nav
// needs to be dynamic (e.g. per-role or feature-flagged items).
export async function getAdminNavGroups() {
  return ADMIN_NAV_GROUPS;
}
