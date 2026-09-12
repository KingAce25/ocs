"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@@/lib/supabase/server";

const MODULE = "Events";

async function assertCanEditEvents(supabase, userId) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (profile?.role === "super_admin") return true;

  const { data: permission } = await supabase
    .from("admin_permissions")
    .select("granted")
    .eq("profile_id", userId)
    .eq("module", MODULE)
    .single();

  return permission?.granted ?? false;
}

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function saveEvent({
  id,
  title,
  type,
  startDate,
  endDate,
  location,
  chapter,
  spotsTotal,
  description,
  schedule,
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const canEdit = await assertCanEditEvents(supabase, user.id);
  if (!canEdit) {
    return { error: "You don't have permission to manage events." };
  }

  const payload = {
    title,
    event_type: type,
    event_date: startDate,
    end_date: endDate || null,
    location,
    chapter,
    spots_total: spotsTotal ? parseInt(spotsTotal, 10) : null,
    description,
    schedule,
  };

  if (id) {
    const { error } = await supabase
      .from("events")
      .update(payload)
      .eq("id", id);

    if (error) {
      console.error("Failed to update event:", error);
      return { error: "Failed to save event." };
    }

    revalidatePath("/admin/events");
    return { success: true, id };
  }

  let slug = slugify(title);
  const { count } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("slug", slug);

  if ((count ?? 0) > 0) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  const { data: inserted, error } = await supabase
    .from("events")
    .insert({ ...payload, slug })
    .select()
    .single();

  if (error) {
    console.error("Failed to create event:", error);
    return { error: "Failed to create event." };
  }

  revalidatePath("/admin/events");
  return { success: true, id: inserted.id };
}

export async function deleteEvent(id) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const canEdit = await assertCanEditEvents(supabase, user.id);
  if (!canEdit) {
    return { error: "You don't have permission to delete events." };
  }

  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete event:", error);
    return { error: "Failed to delete event." };
  }

  revalidatePath("/admin/events");
  return { success: true };
}
