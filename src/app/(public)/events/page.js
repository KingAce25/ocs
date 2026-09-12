import { createClient } from "@@/lib/supabase/server";
import EventsClient from "./EventsClient";

export const revalidate = 60;

export default async function EventsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select(
      "slug, title, event_type, event_date, end_date, location, chapter, spots_total, description, status",
    )
    .neq("status", "cancelled")
    .order("event_date", { ascending: true });

  if (error) {
    console.error("Failed to load events:", error.message);
  }

  const events = (data ?? []).map((e) => ({
    slug: e.slug,
    title: e.title,
    type: e.event_type || "Fellowship",
    startDate: e.event_date,
    endDate: e.end_date || e.event_date,
    location: e.location || "",
    chapter: e.chapter || "",
    spotsTotal: e.spots_total,
    description: e.description || "",
    status: e.status,
  }));

  // Auto-feature the soonest upcoming event
  const now = new Date();
  const featuredSlug = events.find(
    (e) => e.status === "upcoming" && new Date(e.startDate) >= now,
  )?.slug;

  const eventsWithFeatured = events.map((e) => ({
    ...e,
    featured: e.slug === featuredSlug,
  }));

  return <EventsClient events={eventsWithFeatured} />;
}
