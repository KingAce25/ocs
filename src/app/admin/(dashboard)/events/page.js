import { createClient } from "@@/lib/supabase/server";
import EventList from "@/components/admin/EventList";

export const metadata = { title: "Manage Events — OCS Admin" };

function formatDateRange(start, end) {
  const startD = new Date(start);
  const opts = { month: "short", day: "numeric", year: "numeric" };

  if (!end) return startD.toLocaleDateString("en-US", opts);

  const endD = new Date(end);
  const sameMonth =
    startD.getMonth() === endD.getMonth() &&
    startD.getFullYear() === endD.getFullYear();

  if (sameMonth) {
    return `${startD.toLocaleDateString("en-US", { month: "short" })} ${startD.getDate()}–${endD.getDate()}, ${endD.getFullYear()}`;
  }
  return `${startD.toLocaleDateString("en-US", opts)} – ${endD.toLocaleDateString("en-US", opts)}`;
}

export default async function AdminEvents() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  let canEdit = profile?.role === "super_admin";

  if (!canEdit) {
    const { data: permission } = await supabase
      .from("admin_permissions")
      .select("granted")
      .eq("profile_id", user.id)
      .eq("module", "Events")
      .single();

    canEdit = permission?.granted ?? false;
  }

  const { data: events, error } = await supabase
    .from("events")
    .select(
      "id, title, event_type, event_date, end_date, location, chapter, spots_total",
    )
    .order("event_date", { ascending: true });

  if (error) {
    console.error("Failed to fetch events:", error);
  }

  const formattedEvents = (events ?? []).map((e) => ({
    id: e.id,
    title: e.title,
    type: e.event_type,
    date: formatDateRange(e.event_date, e.end_date),
    location: e.location,
    chapter: e.chapter,
    spots: e.spots_total,
  }));

  return <EventList initialEvents={formattedEvents} canEdit={canEdit} />;
}
