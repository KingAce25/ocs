import { createClient } from "@@/lib/supabase/client";

/**
 * Get homepage statistics from Supabase
 */
export async function getStats() {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_public_home_stats");

  if (error) {
    console.error("Failed to load homepage stats:", error);

    throw error;
  }

  const currentYear = new Date().getFullYear();

  let yearsOfService = 0;

  if (data?.founded_year) {
    const foundedYear = parseInt(data.founded_year, 10);

    if (!Number.isNaN(foundedYear)) {
      yearsOfService = Math.max(0, currentYear - foundedYear);
    }
  }

  return [
    {
      value: `${data?.active_members ?? 0}+`,
      label: "Active Members",
    },
    {
      value: `${yearsOfService}`,
      label: "Years of Service",
    },
    {
      value: `${data?.regional_chapters ?? 0}`,
      label: "Regional Chapters",
    },
    {
      value: `${data?.annual_events ?? 0}+`,
      label: "Annual Events",
    },
  ];
}

/**
 * Get latest published news from Supabase
 */
export async function getLatestNews(limit = 3) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, tag, published_at")
    .eq("status", "published")
    .not("published_at", "is", null)
    .order("published_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    console.error("Failed to load latest news:", error);

    throw error;
  }

  return (data ?? []).map((post) => ({
    id: post.id,

    date: new Date(post.published_at).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),

    tag: post.tag ?? "News",

    title: post.title,

    excerpt: post.excerpt ?? "",

    href: `/blog/${post.slug}`,
  }));
}

/**
 * Get editable page content from Supabase
 *
 * Example:
 * getPageContent("home-subtitle")
 */
export async function getPageContent(id) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("page_content")
    .select("content")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Failed to load page content: ${id}`, error);

    return "";
  }

  return data?.content ?? "";
}
