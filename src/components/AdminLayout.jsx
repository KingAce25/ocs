"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "../../public/new.png";

const navGroups = [
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

export default function AdminLayout({ children, user }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // TODO: Replace with real Supabase session check
  // const { data: { session } } = await supabase.auth.getSession()
  const isSuperAdmin = user?.role === "super_admin";

  function isActive(href) {
    if (href === "/admin") return router.pathname === "/admin";
    return pathname.startsWith(href);
  }

  async function handleSignOut() {
    // TODO: await supabase.auth.signOut()
    localStorage.removeItem("ocs_admin_auth");
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#060a14] font-['Barlow',sans-serif] flex">
      {/* ── SIDEBAR ── */}
      <>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-[#0a0f1e] border-r border-white/10 z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          {/* Logo */}
          <div className="px-6 py-5 border-b border-white/10 shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full border-0.5 flex items-center justify-center shrink-0 overflow-hidden">
                <Image src={Logo} alt="" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-serif text-xs tracking-wide">
                  Onward Christian
                </span>
                <span className="text-[#c9a84c] text-xs tracking-widest">
                  Soldiers
                </span>
              </div>
            </Link>
          </div>

          {/* User pill */}
          {user && (
            <div className="px-4 py-3 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 px-3 py-2 rounded">
                <div className="w-7 h-7 rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#c9a84c] text-xs font-semibold">
                    {user.name?.[0] ?? "A"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-xs font-medium truncate">
                    {user.name ?? "Admin"}
                  </p>
                  <p className="text-[#c9a84c]/60 text-[10px] tracking-wider uppercase">
                    {isSuperAdmin ? "Super Admin" : "Admin"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            {navGroups.map((group) => {
              // Hide Permissions & Settings for non-super-admins
              if (!isSuperAdmin && group.label === "Administration")
                return null;
              return (
                <div key={group.label} className="mb-6">
                  <p className="text-white/20 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] px-3 mb-2">
                    {group.label}
                  </p>
                  <ul className="flex flex-col gap-0.5">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 text-sm rounded transition-all duration-150 font-['Barlow'] ${
                            isActive(item.href)
                              ? "bg-[#c9a84c]/15 text-[#c9a84c] border border-[#c9a84c]/20"
                              : "text-white/45 hover:text-white/80 hover:bg-white/[0.04] border border-transparent"
                          }`}
                        >
                          <span
                            className={`text-[6px] ${isActive(item.href) ? "text-[#c9a84c]" : "text-white/20"}`}
                          >
                            ■
                          </span>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </nav>

          {/* Bottom actions */}
          <div className="px-3 py-4 border-t border-white/10 shrink-0 flex flex-col gap-1">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2 text-sm text-white/35 hover:text-white/60 rounded hover:bg-white/[0.03] transition-all duration-150 font-['Barlow']"
            >
              <span className="text-[6px] text-white/15">■</span>
              View Public Site ↗
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2 text-sm text-white/35 hover:text-red-400 rounded hover:bg-red-500/[0.05] transition-all duration-150 font-['Barlow'] text-left w-full"
            >
              <span className="text-[6px] text-white/15">■</span>
              Sign Out
            </button>
          </div>
        </aside>
      </>

      {/* ── MAIN ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-[#060a14]/95 backdrop-blur border-b border-white/10 px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white/40 hover:text-white/80 transition-colors p-1"
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <rect y="3" width="20" height="1.5" rx="1" />
              <rect y="9" width="20" height="1.5" rx="1" />
              <rect y="15" width="20" height="1.5" rx="1" />
            </svg>
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-['Barlow_Condensed'] tracking-wider">
            <span className="text-white/25">Admin</span>
            {router.pathname !== "/admin" && (
              <>
                <span className="text-white/15">/</span>
                <span className="text-[#c9a84c]/70 capitalize">
                  {pathname.split("/").pop()?.replace("-", " ")}
                </span>
              </>
            )}
          </div>

          <div className="w-5 lg:hidden" />
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
