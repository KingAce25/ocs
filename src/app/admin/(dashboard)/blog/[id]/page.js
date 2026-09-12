import { redirect } from "next/navigation";
import { createClient } from "@@/lib/supabase/server";
import BlogPostForm from "@/components/admin/BlogPostForm";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: id === "new" ? "New Post — OCS Admin" : "Edit Post — OCS Admin",
  };
}

export default async function BlogPostEditorPage({ params }) {
  const { id } = await params;
  const isNew = id === "new";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
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

  if (!canEdit) {
    redirect("/admin");
  }

  let initialPost = null;

  if (!isNew) {
    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !post) {
      redirect("/admin/blog");
    }

    initialPost = {
      id: post.id,
      title: post.title,
      tag: post.tag ?? "",
      status: post.status === "published" ? "Published" : "Draft",
      author: post.author_name ?? profile?.full_name ?? "",
      content: post.content ?? "",
      quoteText: post.quote_text ?? "",
      quoteReference: post.quote_reference ?? "",
    };
  }

  return (
    <BlogPostForm
      initialPost={initialPost}
      defaultAuthorName={profile?.full_name ?? user.email}
      isNew={isNew}
    />
  );
}
