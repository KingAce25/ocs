import { createClient } from "@@/lib/supabase/server";
import BlogList from "@/components/admin/BlogList";

export const metadata = { title: "Manage Blog Posts — OCS Admin" };

export default async function AdminBlog() {
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
      .eq("module", "Blog")
      .single();

    canEdit = permission?.granted ?? false;
  }

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("id, title, tag, status, author_name, published_at, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch blog posts:", error);
  }

  const formattedPosts = (posts ?? []).map((p) => ({
    id: p.id,
    title: p.title,
    tag: p.tag,
    status: p.status === "published" ? "Published" : "Draft",
    author: p.author_name ?? "—",
    date: new Date(p.published_at ?? p.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));

  return <BlogList initialPosts={formattedPosts} canEdit={canEdit} />;
}
