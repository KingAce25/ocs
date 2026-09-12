import { createClient } from "@@/lib/supabase/server";
import RanksTable from "@/components/admin/RanksTable";

export const metadata = { title: "Ranks & Structure — OCS Admin" };

export default async function AdminRanks() {
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
      .eq("module", "Ranks")
      .single();

    canEdit = permission?.granted ?? false;
  }

  const { data: ranks, error } = await supabase
    .from("ranks")
    .select("*")
    .order("level", { ascending: true });

  if (error) {
    console.error("Failed to fetch ranks:", error);
  }

  return <RanksTable initialRanks={ranks ?? []} canEdit={canEdit} />;
}
