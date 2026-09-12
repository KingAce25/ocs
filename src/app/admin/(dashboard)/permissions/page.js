import { redirect } from "next/navigation";
import { createClient } from "@@/lib/supabase/server";
import PermissionsManager from "@/components/admin/PermissionsManager";

const MODULES = ["Blog", "Events", "Gallery", "Ranks", "Pages"];

export const metadata = { title: "Permissions — OCS Admin" };

export default async function AdminPermissions() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: currentProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (currentProfile?.role !== "super_admin") {
    redirect("/admin");
  }

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, rank, role")
    .eq("role", "admin");

  const { data: permissionRows } = await supabase
    .from("admin_permissions")
    .select("profile_id, module, granted");

  // Need emails too — profiles doesn't store them, auth.users does.
  // Service-role lookup is unnecessary here since we already have user IDs;
  // simplest is to store email on profiles at invite time instead of
  // round-tripping to auth.admin. Assuming a `profiles.email` column exists
  // (add: alter table profiles add column email text) kept in sync via the
  // handle_new_user trigger reading NEW.email.
  const admins = (profiles ?? []).map((p) => {
    const permissions = {};
    MODULES.forEach((m) => {
      const row = permissionRows?.find(
        (r) => r.profile_id === p.id && r.module === m,
      );
      permissions[m] = row?.granted ?? false;
    });
    return {
      id: p.id,
      name: p.full_name,
      email: p.email,
      rank: p.rank,
      permissions,
    };
  });

  return <PermissionsManager initialAdmins={admins} />;
}
