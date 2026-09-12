import { createClient } from "@@/lib/supabase/server";
import GalleryClient from "./GalleryClient";

export const revalidate = 60; // re-fetch at most once a minute; drop this for fully dynamic

export default async function GalleryPage() {
  const supabase = await createClient();

  const { data: items, error } = await supabase
    .from("gallery_items")
    .select("id, title, category, year, image_url, caption, status")
    .eq("status", "approved")
    .order("year", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load gallery_items:", error.message);
  }

  return <GalleryClient items={items ?? []} />;
}
