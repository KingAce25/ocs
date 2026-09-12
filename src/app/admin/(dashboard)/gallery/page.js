import { createClient } from "@@/lib/supabase/server";
import GalleryManager from "@/components/admin/GalleryManager";

export const metadata = { title: "Gallery — OCS Admin" };

export default async function AdminGallery() {
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
      .eq("module", "Gallery")
      .single();

    canEdit = permission?.granted ?? false;
  }

  const { data: photos, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch gallery items:", error);
  }

  return <GalleryManager initialPhotos={photos ?? []} canEdit={canEdit} />;
}
