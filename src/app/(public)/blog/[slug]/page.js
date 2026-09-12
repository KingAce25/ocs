import { notFound } from "next/navigation";
import { createClient } from "@@/lib/supabase/server";
import { createAdminClient } from "@@/lib/supabase/admin";
import BlogPostContent from "./BlogPostContent";

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

// Splits plain-text `content` into paragraphs on blank lines, then
// inserts the single optional quote (quote_text/quote_reference)
// right after the first paragraph.
function buildContentBlocks(content, quoteText, quoteReference) {
  const paragraphs = (content || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const blocks = paragraphs.map((text) => ({ type: "paragraph", text }));

  if (quoteText) {
    blocks.splice(Math.min(1, blocks.length), 0, {
      type: "quote",
      text: quoteText,
      reference: quoteReference || null,
    });
  }

  return blocks;
}

// Runs at BUILD TIME — no request/cookies exist yet, so this must use
// the service-role client (no cookies() dependency), not the
// per-request cookie-based client from lib/supabase/server.js.
export async function generateStaticParams() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("status", "published");

  if (error) {
    console.error(
      "generateStaticParams failed to load blog_posts:",
      error.message,
    );
    return [];
  }

  return (data ?? []).map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  // This runs per-request, so the cookie-based client is fine here.
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select(
      "title, slug, excerpt, content, tag, quote_text, quote_reference, author_name, published_at, status",
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !post) {
    notFound();
  }

  const { data: related } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, tag, published_at")
    .eq("status", "published")
    .eq("tag", post.tag)
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(2);

  const mappedPost = {
    slug: post.slug,
    tag: post.tag || "Announcement",
    date: formatDate(post.published_at),
    title: post.title,
    author: post.author_name || "OCS Staff",
    readTime: estimateReadTime(post.content),
    content: buildContentBlocks(
      post.content,
      post.quote_text,
      post.quote_reference,
    ),
  };

  const relatedPosts = (related ?? []).map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt || "",
    tag: r.tag || "Announcement",
    date: formatDate(r.published_at),
  }));

  return <BlogPostContent post={mappedPost} relatedPosts={relatedPosts} />;
}
