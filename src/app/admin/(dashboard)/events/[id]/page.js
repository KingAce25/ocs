import { redirect } from "next/navigation";
import { createClient } from "@@/lib/supabase/server";
import EventForm from "@/components/admin/EventForm";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: id === "new" ? "New Event — OCS Admin" : "Edit Event — OCS Admin",
  };
}

export default async function EventEditorPage({ params }) {
  const { id } = await params;
  const isNew = id === "new";

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

  if (!canEdit) {
    redirect("/admin");
  }

  let initialEvent = null;

  if (!isNew) {
    const { data: event, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !event) {
      redirect("/admin/events");
    }

    initialEvent = {
      id: event.id,
      title: event.title,
      type: event.event_type ?? "",
      startDate: event.event_date ? event.event_date.split("T")[0] : "",
      endDate: event.end_date ? event.end_date.split("T")[0] : "",
      location: event.location ?? "",
      chapter: event.chapter ?? "",
      spotsTotal: event.spots_total ?? "",
      description: event.description ?? "",
      schedule: event.schedule ?? [],
    };
  }

  return <EventForm initialEvent={initialEvent} isNew={isNew} />;
}
