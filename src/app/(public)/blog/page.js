"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const TAGS = [
  "All",
  "Announcement",
  "Ranks",
  "Community",
  "Events",
  "Devotional",
  "Training",
];

const posts = [
  {
    slug: "annual-muster-2025",
    tag: "Announcement",
    date: "March 15, 2025",
    title: "Annual National Muster — Registration Now Open",
    excerpt:
      "Join hundreds of brothers from across the country for three days of training, fellowship, and worship. This year's muster will be held at Camp Covenant, Georgia.",
    featured: true,
    readTime: "3 min read",
    author: "Col. James Whitfield",
  },
  {
    slug: "february-rank-ceremony",
    tag: "Ranks",
    date: "February 28, 2025",
    title: "New Promotions — February Rank Ceremony",
    excerpt:
      "Fifteen members were elevated in rank following their rigorous evaluation boards. Congratulations to all who have proven their character and commitment.",
    featured: false,
    readTime: "4 min read",
    author: "Maj. Samuel Okafor",
  },
  {
    slug: "shelter-outreach-january",
    tag: "Community",
    date: "January 20, 2025",
    title: "OCS Volunteers at City Shelter — 200 Meals Served",
    excerpt:
      "Our community outreach platoon mobilised over the weekend to serve those in need. A reminder of why we soldier on — not for ourselves, but for others.",
    featured: false,
    readTime: "3 min read",
    author: "Cpl. David Mensah",
  },
  {
    slug: "armor-of-god-series",
    tag: "Devotional",
    date: "January 10, 2025",
    title: "Devotional Series: The Full Armor of God",
    excerpt:
      "A six-part devotional series walking through Ephesians 6:10–18. Each piece of armor unpacked for the modern Christian soldier — beginning with the Belt of Truth.",
    featured: false,
    readTime: "8 min read",
    author: "Rev. Thomas Marsh",
  },
  {
    slug: "leadership-training-q1",
    tag: "Training",
    date: "December 30, 2024",
    title: "Q1 Leadership Training Programme — What to Expect",
    excerpt:
      "The first quarter leadership training cohort opens in February. Here is everything prospective candidates need to know about the application process and curriculum.",
    featured: false,
    readTime: "5 min read",
    author: "WO Marcus Adeyemi",
  },
  {
    slug: "christmas-service-recap",
    tag: "Events",
    date: "December 26, 2024",
    title: "Christmas Service Recap — A Night to Remember",
    excerpt:
      "Over 120 members and families gathered for the annual OCS Christmas service. Here are the highlights, photos, and a word from the Chaplain General.",
    featured: false,
    readTime: "4 min read",
    author: "Rev. Thomas Marsh",
  },
  {
    slug: "new-chapter-announcement",
    tag: "Announcement",
    date: "December 1, 2024",
    title: "New Chapter Chartered in Lagos — OCS Goes International",
    excerpt:
      "After months of preparation, OCS has formally chartered its first international chapter in Lagos, Nigeria. A historic step in the expansion of the brotherhood.",
    featured: false,
    readTime: "3 min read",
    author: "Col. James Whitfield",
  },
  {
    slug: "physical-fitness-standards",
    tag: "Training",
    date: "November 18, 2024",
    title: "Updated Physical Fitness Standards for 2025",
    excerpt:
      "The national leadership has approved updated fitness benchmarks for all ranks from Corporal and above. Review the new standards and begin preparing now.",
    featured: false,
    readTime: "5 min read",
    author: "SSG Kenneth Osei",
  },
];

const tagColors = {
  Announcement: "border-[#c9a84c]/40 text-[#c9a84c] bg-[#c9a84c]/10",
  Ranks: "border-[#D85A30]/40 text-[#F0997B] bg-[#D85A30]/10",
  Community: "border-[#1D9E75]/40 text-[#5DCAA5] bg-[#1D9E75]/10",
  Events: "border-[#534AB7]/40 text-[#AFA9EC] bg-[#534AB7]/10",
  Devotional: "border-[#993556]/40 text-[#ED93B1] bg-[#993556]/10",
  Training: "border-[#888780]/40 text-[#D3D1C7] bg-[#888780]/10",
};

export default function Blog() {
  const [activeTag, setActiveTag] = useState("All");
  const [heroRef, heroInView] = useInView(0.1);
  const [postsRef, postsInView] = useInView(0.05);

  const featured = posts.find((p) => p.featured);
  const filtered = posts
    .filter((p) => !p.featured)
    .filter((p) => activeTag === "All" || p.tag === activeTag);

  return (
    <>
      <div className="bg-[#0a0f1e] min-h-screen font-['Barlow',sans-serif]">
        {/* ── HERO ── */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#c9a84c 0,#c9a84c 1px,transparent 0,transparent 50%)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(201,168,76,0.07),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0f1e] to-transparent" />

          <div ref={heroRef} className="relative max-w-4xl mx-auto text-center">
            <p
              className={`text-[#c9a84c] text-xs tracking-[0.35em] uppercase font-['Barlow_Condensed'] mb-6 transition-all duration-700 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              From the Field
            </p>
            <h1
              className={`font-['Cormorant_Garamond'] text-white text-[clamp(3rem,8vw,6rem)] font-700 leading-none tracking-tight mb-8 transition-all duration-700 delay-100 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Blog &amp; News
            </h1>
            <div
              className={`flex items-center justify-center gap-4 mb-8 transition-all duration-700 delay-200 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div className="h-px w-12 bg-[#c9a84c]/40" />
              <span className="text-[#c9a84c]/60 text-sm font-['Cormorant_Garamond'] italic">
                Dispatches from the Brotherhood
              </span>
              <div className="h-px w-12 bg-[#c9a84c]/40" />
            </div>
            <p
              className={`text-white/55 text-lg font-300 leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-300 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Announcements, devotionals, event recaps, and stories from the
              frontlines of faith and service.
            </p>
          </div>
        </section>

        {/* ── FEATURED POST ── */}
        {featured && (
          <section className="px-6 pb-16">
            <div className="max-w-6xl mx-auto">
              <p className="text-white/30 text-xs tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-6">
                Featured
              </p>
              <Link
                href={`/blog/${featured.slug}`}
                className="group block border border-[#c9a84c]/20 bg-[#c9a84c]/[0.03] hover:border-[#c9a84c]/40 hover:bg-[#c9a84c]/[0.06] transition-all duration-300 p-10 md:p-14 relative overflow-hidden"
              >
                {[
                  "top-0 left-0 border-t-2 border-l-2",
                  "top-0 right-0 border-t-2 border-r-2",
                  "bottom-0 left-0 border-b-2 border-l-2",
                  "bottom-0 right-0 border-b-2 border-r-2",
                ].map((cls, i) => (
                  <div
                    key={i}
                    className={`absolute w-5 h-5 border-[#c9a84c]/40 ${cls}`}
                  />
                ))}
                <div className="max-w-3xl">
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      className={`border px-3 py-1 text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] ${tagColors[featured.tag]}`}
                    >
                      {featured.tag}
                    </span>
                    <span className="text-white/30 text-xs font-['Barlow']">
                      {featured.date}
                    </span>
                    <span className="text-white/20 text-xs font-['Barlow']">
                      ·
                    </span>
                    <span className="text-white/30 text-xs font-['Barlow']">
                      {featured.readTime}
                    </span>
                  </div>
                  <h2 className="font-['Cormorant_Garamond'] text-white text-3xl md:text-4xl font-600 leading-tight mb-6 group-hover:text-[#c9a84c] transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-white/50 leading-relaxed font-300 mb-8 text-lg">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-sm font-['Barlow']">
                      By {featured.author}
                    </span>
                    <span className="text-[#c9a84c] text-sm tracking-widest uppercase font-['Barlow_Condensed'] group-hover:translate-x-1 transition-transform duration-200">
                      Read Article →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* ── TAG FILTER ── */}
        <section className="px-6 pb-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-2 border font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase transition-all duration-200 ${
                    activeTag === tag
                      ? "border-[#c9a84c]/50 bg-[#c9a84c]/10 text-[#c9a84c]"
                      : "border-white/10 bg-white/[0.02] text-white/40 hover:text-white/70 hover:border-white/20"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── POSTS GRID ── */}
        <section ref={postsRef} className="px-6 pb-28">
          <div className="max-w-6xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/30 font-['Cormorant_Garamond'] text-2xl italic">
                  No posts in this category yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((post, i) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className={`group border border-white/10 hover:border-[#c9a84c]/30 bg-white/[0.02] hover:bg-white/[0.04] p-8 flex flex-col transition-all duration-500 ${
                      postsInView
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <span
                        className={`border px-2 py-1 text-xs tracking-[0.15em] uppercase font-['Barlow_Condensed'] ${tagColors[post.tag] || "border-white/20 text-white/50"}`}
                      >
                        {post.tag}
                      </span>
                      <span className="text-white/25 text-xs font-['Barlow']">
                        {post.date}
                      </span>
                    </div>

                    <h3 className="font-['Cormorant_Garamond'] text-white text-xl font-600 leading-snug mb-4 group-hover:text-[#c9a84c] transition-colors duration-200 flex-1">
                      {post.title}
                    </h3>

                    <p className="text-white/40 text-sm leading-relaxed font-300 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.07]">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-white/30 text-xs font-['Barlow']">
                          {post.author}
                        </span>
                        <span className="text-white/20 text-xs font-['Barlow']">
                          {post.readTime}
                        </span>
                      </div>
                      <span className="text-[#c9a84c]/60 text-xs tracking-wider uppercase font-['Barlow_Condensed'] group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all duration-200">
                        Read →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
