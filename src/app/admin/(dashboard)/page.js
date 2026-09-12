import { createClient } from "@@/lib/supabase/server";
import DashboardStats from "@/components/admin/DashboardStats";
import RecentActivity from "@/components/admin/RecentActivity";
import QuickActions from "@/components/admin/QuickActions";

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

export const metadata = { title: "Dashboard — OCS Admin" };

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: postCount },
    { count: draftCount },
    { count: eventCount },
    { count: upcomingCount },
    { count: galleryCount },
    { count: pendingGalleryCount },
    { count: memberCount },
    { count: pendingMemberCount },
    { data: activity },
  ] = await Promise.all([
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true })
      .eq("status", "draft"),
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("status", "upcoming"),
    supabase.from("gallery_items").select("*", { count: "exact", head: true }),
    supabase
      .from("gallery_items")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase.from("members").select("*", { count: "exact", head: true }),
    supabase
      .from("members")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("activity_log")
      .select("action, detail, type, created_at")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const stats = [
    {
      label: "Blog Posts",
      value: postCount ?? 0,
      sub: `${draftCount ?? 0} drafts`,
      href: "/admin/blog",
      color: "gold",
    },
    {
      label: "Events",
      value: eventCount ?? 0,
      sub: `${upcomingCount ?? 0} upcoming`,
      href: "/admin/events",
      color: "teal",
    },
    {
      label: "Gallery Items",
      value: galleryCount ?? 0,
      sub: `Awaiting review: ${pendingGalleryCount ?? 0}`,
      href: "/admin/gallery",
      color: "purple",
    },
    {
      label: "Active Members",
      value: memberCount ?? 0,
      sub: `${pendingMemberCount ?? 0} pending`,
      href: "/admin/permissions",
      color: "coral",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-1">
          Command Panel
        </p>
        <h1 className="font-['Cormorant_Garamond'] text-white text-4xl font-600">
          Dashboard
        </h1>
      </div>
      <DashboardStats stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivity activity={activity ?? []} />
        <div className="flex flex-col gap-4">
          <QuickActions actions={quickActions} />
          <div className="border border-[#c9a84c]/15 bg-[#c9a84c]/[0.03] px-6 py-5">
            <p className="text-[#c9a84c]/40 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-3">
              Daily Reminder
            </p>
            <blockquote className="font-['Cormorant_Garamond'] text-white/60 text-sm italic leading-relaxed mb-2">
              &quot;Whatever you do, work at it with all your heart, as working
              for the Lord, not for human masters.&quot;
            </blockquote>
            <cite className="text-[#c9a84c]/40 text-[10px] tracking-widest uppercase font-['Barlow_Condensed'] not-italic">
              Colossians 3:23
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
}
