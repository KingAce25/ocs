import { createClient } from "@@/lib/supabase/server";
import BlogClient from "./BlogClient";

export const revalidate = 60;

function estimateReadTime(text) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, content, tag, author_name, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to load blog_posts:", error.message);
  }

  const posts = (data ?? []).map((p, i) => ({
    slug: p.slug,
    tag: p.tag || "Announcement",
    date: formatDate(p.published_at),
    title: p.title,
    excerpt: p.excerpt || "",
    readTime: estimateReadTime(p.content),
    author: p.author_name || "OCS Staff",
    featured: i === 0, // most recently published post is treated as featured
  }));

  return <BlogClient posts={posts} />;
}
