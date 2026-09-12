import { createClient } from "@/lib/supabase/client";

export async function getLatestNews(limit = 3) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("title, excerpt, tag, slug, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to fetch latest news:", error);
    return [];
  }

  return data.map((post) => ({
    title: post.title,
    excerpt: post.excerpt,
    tag: post.tag,
    href: `/blog/${post.slug}`,
    date: new Date(post.published_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));
}

// Stub — holding off until stats source is decided
export async function getStats() {
  return [];
}
