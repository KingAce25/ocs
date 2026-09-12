"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@@/lib/supabase/server";
import { createAdminClient } from "@@/lib/supabase/admin";

const MODULES = ["Blog", "Events", "Gallery", "Ranks", "Pages"];
const MAX_ADMIN_SLOTS = 6;

async function assertSuperAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated.");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "super_admin") {
    throw new Error("Only super admins can manage permissions.");
  }
}

export async function inviteAdmin({ name, email, rank }) {
  await assertSuperAdmin();

  const supabase = await createClient();
  const { count } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "admin");

  if ((count ?? 0) >= MAX_ADMIN_SLOTS) {
    return { error: `All ${MAX_ADMIN_SLOTS} admin slots are in use.` };
  }

  const adminClient = createAdminClient();

  const { data, error } = await adminClient.auth.admin.inviteUserByEmail(
    email,
    { data: { full_name: name } },
  );

  if (error) {
    console.error("Failed to invite admin:", error);
    return { error: error.message };
  }

  const newUserId = data.user.id;

  // Trigger creates the profiles row automatically; give it a moment then
  // set the rank/title, which the trigger doesn't know about.
  await adminClient.from("profiles").update({ rank }).eq("id", newUserId);

  // Seed permission rows (all false) so the UI has something to toggle.
  await adminClient.from("admin_permissions").insert(
    MODULES.map((module) => ({
      profile_id: newUserId,
      module,
      granted: false,
    })),
  );

  revalidatePath("/admin/permissions");
  return { success: true };
}

export async function removeAdmin(profileId) {
  await assertSuperAdmin();

  const adminClient = createAdminClient();
  const { error } = await adminClient.auth.admin.deleteUser(profileId);

  if (error) {
    console.error("Failed to remove admin:", error);
    return { error: error.message };
  }

  // profiles + admin_permissions rows cascade-delete via FK on auth.users
  revalidatePath("/admin/permissions");
  return { success: true };
}

export async function savePermissions(admins) {
  await assertSuperAdmin();

  const supabase = await createClient();

  const rows = admins.flatMap((admin) =>
    MODULES.map((module) => ({
      profile_id: admin.id,
      module,
      granted: !!admin.permissions[module],
    })),
  );

  const { error } = await supabase
    .from("admin_permissions")
    .upsert(rows, { onConflict: "profile_id,module" });

  if (error) {
    console.error("Failed to save permissions:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/permissions");
  return { success: true };
}
