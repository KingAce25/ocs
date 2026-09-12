import { createClient } from "@@/lib/supabase/server";
import PagesEditor from "@/components/admin/PagesEditor";

export const metadata = { title: "Manage Pages — OCS Admin" };

export default async function AdminPages() {
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
      .eq("module", "Pages")
      .single();

    canEdit = permission?.granted ?? false;
  }

  const { data: pages, error } = await supabase
    .from("page_content")
    .select("*")
    .order("section", { ascending: true });

  if (error) {
    console.error("Failed to fetch page content:", error);
  }

  return <PagesEditor initialPages={pages ?? []} canEdit={canEdit} />;
}
