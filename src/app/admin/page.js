import Head from "next/head";
import Link from "next/link";
import AdminLayout from "../../components/AdminLayout";

// Placeholder data — replace with Supabase queries
const stats = [
  {
    label: "Blog Posts",
    value: 8,
    sub: "3 drafts",
    href: "/admin/blog",
    color: "gold",
  },
  {
    label: "Events",
    value: 8,
    sub: "2 upcoming",
    href: "/admin/events",
    color: "teal",
  },
  {
    label: "Gallery Items",
    value: 12,
    sub: "Awaiting review: 0",
    href: "/admin/gallery",
    color: "purple",
  },
  {
    label: "Active Members",
    value: 153,
    sub: "6 pending",
    href: "/admin/permissions",
    color: "coral",
  },
];

const recentActivity = [
  {
    action: "Blog post published",
    detail: "Annual National Muster — Registration Now Open",
    time: "2h ago",
    type: "publish",
  },
  {
    action: "New member enquiry",
    detail: "Contact form submission from John Mensah",
    time: "5h ago",
    type: "contact",
  },
  {
    action: "Gallery upload",
    detail: "12 photos from Easter Outreach 2025",
    time: "1d ago",
    type: "media",
  },
  {
    action: "Rank promotion",
    detail: "3 members promoted at Spring Ceremony",
    time: "2d ago",
    type: "rank",
  },
  {
    action: "Event created",
    detail: "Q2 Leadership Training — May 3–4",
    time: "3d ago",
    type: "event",
  },
  {
    action: "Admin added",
    detail: "Cpl. David Mensah granted blog permissions",
    time: "4d ago",
    type: "admin",
  },
];

const quickActions = [
  {
    label: "New Blog Post",
    href: "/admin/blog/new",
    desc: "Write and publish an article",
  },
  {
    label: "New Event",
    href: "/admin/events/new",
    desc: "Schedule a chapter event",
  },
  {
    label: "Upload Photos",
    href: "/admin/gallery",
    desc: "Add images to the gallery",
  },
  {
    label: "Manage Permissions",
    href: "/admin/permissions",
    desc: "Update admin access",
  },
];

const colorMap = {
  gold: {
    border: "border-[#c9a84c]/25",
    bg: "bg-[#c9a84c]/[0.06]",
    text: "text-[#c9a84c]",
    sub: "text-[#c9a84c]/50",
  },
  teal: {
    border: "border-[#1D9E75]/25",
    bg: "bg-[#1D9E75]/[0.06]",
    text: "text-[#5DCAA5]",
    sub: "text-[#5DCAA5]/50",
  },
  purple: {
    border: "border-[#534AB7]/25",
    bg: "bg-[#534AB7]/[0.06]",
    text: "text-[#AFA9EC]",
    sub: "text-[#AFA9EC]/50",
  },
  coral: {
    border: "border-[#D85A30]/25",
    bg: "bg-[#D85A30]/[0.06]",
    text: "text-[#F0997B]",
    sub: "text-[#F0997B]/50",
  },
};

const activityIcons = {
  publish: "↑",
  contact: "✉",
  media: "▣",
  rank: "★",
  event: "◈",
  admin: "⊕",
};

// Mock user — replace with real Supabase session
const mockUser = { name: "Col. Caleb Oladimeji", role: "super_admin" };

export default function AdminDashboard() {
  return (
    <>
      <Head>
        <title>Dashboard — OCS Admin</title>
      </Head>
      <AdminLayout user={mockUser}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-1">
              Command Panel
            </p>
            <h1 className="font-['Cormorant_Garamond'] text-white text-4xl font-600">
              Dashboard
            </h1>
            <p className="text-white/35 text-sm font-['Barlow'] mt-1">
              Welcome back, {mockUser.name}. Here is your overview.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => {
              const c = colorMap[s.color];
              return (
                <Link
                  key={s.label}
                  href={s.href}
                  className={`border ${c.border} ${c.bg} p-6 hover:brightness-110 transition-all duration-200 group`}
                >
                  <p
                    className={`text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-3 ${c.sub}`}
                  >
                    {s.label}
                  </p>
                  <p
                    className={`font-['Cormorant_Garamond'] text-5xl font-700 leading-none mb-2 ${c.text}`}
                  >
                    {s.value}
                  </p>
                  <p className="text-white/30 text-xs font-['Barlow']">
                    {s.sub}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent activity */}
            <div className="lg:col-span-2 border border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="font-['Cormorant_Garamond'] text-white text-xl font-600">
                  Recent Activity
                </h2>
                <span className="text-white/25 text-xs font-['Barlow_Condensed'] tracking-wider uppercase">
                  Last 7 days
                </span>
              </div>
              <ul className="divide-y divide-white/[0.06]">
                {recentActivity.map((a, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-[#c9a84c]/40 text-sm mt-0.5 w-5 shrink-0 text-center">
                      {activityIcons[a.type]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/70 text-sm font-['Barlow'] font-500">
                        {a.action}
                      </p>
                      <p className="text-white/35 text-xs font-['Barlow'] truncate mt-0.5">
                        {a.detail}
                      </p>
                    </div>
                    <span className="text-white/20 text-xs font-['Barlow'] shrink-0">
                      {a.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick actions */}
            <div className="flex flex-col gap-4">
              <div className="border border-white/10 bg-white/[0.02]">
                <div className="px-6 py-4 border-b border-white/10">
                  <h2 className="font-['Cormorant_Garamond'] text-white text-xl font-600">
                    Quick Actions
                  </h2>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  {quickActions.map((a) => (
                    <Link
                      key={a.href}
                      href={a.href}
                      className="flex items-center gap-3 px-4 py-3 border border-white/10 hover:border-[#c9a84c]/30 hover:bg-[#c9a84c]/[0.04] transition-all duration-200 group"
                    >
                      <span className="text-[#c9a84c]/30 group-hover:text-[#c9a84c]/60 transition-colors text-xs">
                        +
                      </span>
                      <div>
                        <p className="text-white/70 text-sm font-['Barlow'] font-500 group-hover:text-white/90 transition-colors">
                          {a.label}
                        </p>
                        <p className="text-white/25 text-xs font-['Barlow']">
                          {a.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Scripture */}
              <div className="border border-[#c9a84c]/15 bg-[#c9a84c]/[0.03] px-6 py-5">
                <p className="text-[#c9a84c]/40 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-3">
                  Daily Reminder
                </p>
                <blockquote className="font-['Cormorant_Garamond'] text-white/60 text-sm italic leading-relaxed mb-2">
                  &quot;Whatever you do, work at it with all your heart, as
                  working for the Lord, not for human masters.&quot;
                </blockquote>
                <cite className="text-[#c9a84c]/40 text-[10px] tracking-widest uppercase font-['Barlow_Condensed'] not-italic">
                  Colossians 3:23
                </cite>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
