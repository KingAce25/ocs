"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@@/lib/supabase/server";

const MODULE = "Blog";

async function assertCanEditBlog(supabase, userId) {
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

export async function savePost({
  id,
  title,
  tag,
  status,
  authorName,
  content,
  quoteText,
  quoteReference,
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const canEdit = await assertCanEditBlog(supabase, user.id);
  if (!canEdit) {
    return { error: "You don't have permission to manage blog posts." };
  }

  const dbStatus = status === "Published" ? "published" : "draft";
  const excerpt =
    content.slice(0, 160).trim() + (content.length > 160 ? "…" : "");

  if (id) {
    const { data: existing } = await supabase
      .from("blog_posts")
      .select("status")
      .eq("id", id)
      .single();

    const payload = {
      title,
      tag,
      status: dbStatus,
      content,
      excerpt,
      quote_text: quoteText || null,
      quote_reference: quoteReference || null,
      author_name: authorName,
    };

    if (dbStatus === "published" && existing?.status !== "published") {
      payload.published_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from("blog_posts")
      .update(payload)
      .eq("id", id);

    if (error) {
      console.error("Failed to update post:", error);
      return { error: "Failed to save post." };
    }

    revalidatePath("/admin/blog");
    return { success: true, id };
  }

  let slug = slugify(title);
  const { count } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .eq("slug", slug);

  if ((count ?? 0) > 0) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  const { data: inserted, error } = await supabase
    .from("blog_posts")
    .insert({
      title,
      slug,
      tag,
      status: dbStatus,
      content,
      excerpt,
      quote_text: quoteText || null,
      quote_reference: quoteReference || null,
      author_id: user.id,
      author_name: authorName,
      published_at: dbStatus === "published" ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to create post:", error);
    return { error: "Failed to create post." };
  }

  revalidatePath("/admin/blog");
  return { success: true, id: inserted.id };
}

export async function deletePost(id) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const canEdit = await assertCanEditBlog(supabase, user.id);
  if (!canEdit) {
    return { error: "You don't have permission to delete posts." };
  }

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete post:", error);
    return { error: "Failed to delete post." };
  }

  revalidatePath("/admin/blog");
  return { success: true };
}
