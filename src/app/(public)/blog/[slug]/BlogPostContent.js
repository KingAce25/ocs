"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const tagColors = {
  Announcement: "border-[#c9a84c]/40 text-[#c9a84c] bg-[#c9a84c]/10",
  Ranks: "border-[#D85A30]/40 text-[#F0997B] bg-[#D85A30]/10",
  Community: "border-[#1D9E75]/40 text-[#5DCAA5] bg-[#1D9E75]/10",
  Events: "border-[#534AB7]/40 text-[#AFA9EC] bg-[#534AB7]/10",
  Devotional: "border-[#993556]/40 text-[#ED93B1] bg-[#993556]/10",
  Training: "border-[#888780]/40 text-[#D3D1C7] bg-[#888780]/10",
};

export default function BlogPostContent({ post, relatedPosts }) {
  return (
    <>
      <div className="bg-[#0a0f1e] min-h-screen font-['Barlow',sans-serif]">
        {/* ── POST HERO ── */}
        <section className="relative pt-40 pb-20 px-6 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#c9a84c 0,#c9a84c 1px,transparent 0,transparent 50%)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(201,168,76,0.06),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0f1e] to-transparent" />

          <div className="relative max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-10 text-xs font-['Barlow_Condensed'] tracking-wider uppercase">
              <Link
                href="/"
                className="text-white/30 hover:text-[#c9a84c] transition-colors"
              >
                Home
              </Link>
              <span className="text-white/20">/</span>
              <Link
                href="/blog"
                className="text-white/30 hover:text-[#c9a84c] transition-colors"
              >
                Blog
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-[#c9a84c]/70 truncate max-w-[200px]">
                {post.tag}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span
                className={`border px-3 py-1 text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] ${tagColors[post.tag]}`}
              >
                {post.tag}
              </span>
              <span className="text-white/30 text-xs">{post.date}</span>
              <span className="text-white/20 text-xs">·</span>
              <span className="text-white/30 text-xs">{post.readTime}</span>
            </div>

            <h1 className="font-['Cormorant_Garamond'] text-white text-4xl md:text-5xl lg:text-6xl font-700 leading-tight tracking-tight mb-10">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 pb-10 border-b border-white/10">
              <div className="w-10 h-10 rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/10 flex items-center justify-center shrink-0">
                <span className="font-['Cormorant_Garamond'] text-[#c9a84c] text-sm font-600">
                  {post.author.split(" ").pop()[0]}
                </span>
              </div>
              <div>
                <p className="text-white/70 text-sm font-500">{post.author}</p>
                <p className="text-white/30 text-xs">{post.authorRole}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── POST CONTENT ── */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto">
            <div className="prose-ocs">
              {post.content.map((block, i) => {
                if (block.type === "paragraph") {
                  return (
                    <p
                      key={i}
                      className="text-white/65 text-lg leading-[1.9] font-300 mb-8"
                    >
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "heading") {
                  return (
                    <h2
                      key={i}
                      className="font-['Cormorant_Garamond'] text-white text-3xl font-600 mt-14 mb-6"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="border-l-4 border-[#c9a84c]/50 pl-8 my-10 py-2"
                    >
                      <p className="font-['Cormorant_Garamond'] text-white/80 text-2xl italic leading-snug mb-3">
                        &quot;{block.text}&quot;
                      </p>
                      {block.reference && (
                        <cite className="text-[#c9a84c]/60 text-xs tracking-[0.25em] uppercase font-['Barlow_Condensed'] not-italic">
                          — {block.reference}
                        </cite>
                      )}
                    </blockquote>
                  );
                }
                return null;
              })}
            </div>

            {/* Share / Back */}
            <div className="flex items-center justify-between mt-16 pt-10 border-t border-white/10">
              <Link
                href="/blog"
                className="flex items-center gap-3 text-white/40 hover:text-[#c9a84c] transition-colors duration-200 font-['Barlow_Condensed'] text-sm tracking-wider uppercase"
              >
                ← Back to Blog
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-white/25 text-xs font-['Barlow_Condensed'] tracking-wider uppercase">
                  Share
                </span>
                {["Twitter", "Copy Link"].map((action) => (
                  <button
                    key={action}
                    onClick={() => {
                      if (
                        action === "Copy Link" &&
                        typeof window !== "undefined"
                      ) {
                        navigator.clipboard.writeText(window.location.href);
                      }
                    }}
                    className="border border-white/10 hover:border-[#c9a84c]/40 text-white/30 hover:text-[#c9a84c] px-3 py-1.5 font-['Barlow_Condensed'] text-xs tracking-wider uppercase transition-all duration-200"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED POSTS ── */}
        {relatedPosts.length > 0 && (
          <section className="px-6 pb-24 border-t border-white/10 pt-16">
            <div className="max-w-6xl mx-auto">
              <p className="text-white/30 text-xs tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-8">
                Related Posts
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group border border-white/10 hover:border-[#c9a84c]/30 bg-white/[0.02] hover:bg-white/[0.04] p-8 flex flex-col transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className={`border px-2 py-1 text-xs tracking-[0.15em] uppercase font-['Barlow_Condensed'] ${tagColors[rel.tag] || "border-white/20 text-white/50"}`}
                      >
                        {rel.tag}
                      </span>
                      <span className="text-white/25 text-xs">{rel.date}</span>
                    </div>
                    <h3 className="font-['Cormorant_Garamond'] text-white text-xl font-600 leading-snug group-hover:text-[#c9a84c] transition-colors duration-200 mb-4">
                      {rel.title}
                    </h3>
                    <p className="text-white/35 text-sm font-300 line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                    <span className="mt-5 text-[#c9a84c]/50 text-xs tracking-wider uppercase font-['Barlow_Condensed'] group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all duration-200">
                      Read →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
