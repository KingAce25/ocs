import { notFound } from "next/navigation";
import { createClient } from "@@/lib/supabase/server";
import { createAdminClient } from "@@/lib/supabase/admin";
import EventContent from "./EventContent";

export const revalidate = 60;

const MONTHS_FULL = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatFull(iso) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}`;
}

function buildBodyBlocks(description) {
  return (description || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((text) => ({ type: "paragraph", text }));
}

// Build time — no request/cookies exist yet, so use the service-role client.
export async function generateStaticParams() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("events")
    .select("slug")
    .neq("status", "cancelled");

  if (error) {
    console.error("generateStaticParams failed to load events:", error.message);
    return [];
  }

  // Defensive: skip any row with a missing/null slug rather than letting
  // Next.js fail the whole build on { slug: null } (typeof null === "object").
  return (data ?? [])
    .filter((e) => typeof e.slug === "string" && e.slug.length > 0)
    .map((e) => ({ slug: e.slug }));
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: event, error } = await supabase
    .from("events")
    .select(
      "slug, title, event_type, event_date, end_date, location, chapter, spots_total, description, schedule, status",
    )
    .eq("slug", slug)
    .neq("status", "cancelled")
    .single();

  if (error || !event) {
    notFound();
  }

  const { data: related } = await supabase
    .from("events")
    .select("slug, title, event_type, event_date, location, status")
    .neq("status", "cancelled")
    .eq("event_type", event.event_type)
    .neq("slug", slug)
    .order("event_date", { ascending: true })
    .limit(2);

  const mappedEvent = {
    slug: event.slug,
    title: event.title,
    type: event.event_type || "Fellowship",
    startDate: event.event_date,
    endDate: event.end_date || event.event_date,
    location: event.location || "",
    chapter: event.chapter || "",
    spotsTotal: event.spots_total,
    body: buildBodyBlocks(event.description),
    schedule:
      Array.isArray(event.schedule) && event.schedule.length > 0
        ? event.schedule
        : null,
  };

  const relatedEvents = (related ?? []).map((r) => ({
    slug: r.slug,
    title: r.title,
    type: r.event_type || "Fellowship",
    startDate: r.event_date,
    location: r.location || "",
  }));

  return (
    <EventContent
      event={mappedEvent}
      relatedEvents={relatedEvents}
      formatFull={formatFull}
    />
  );
}
