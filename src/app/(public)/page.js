"use client";

import Link from "next/link";
import Logo from "../../../public/Futuristic Onward Christian Soldiers logo.png";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const pillars = [
  {
    icon: "✝",
    title: "Faith",
    desc: "Grounded in Scripture, we march under the banner of Christ — our captain, our strength, our purpose.",
  },
  {
    icon: "⚔",
    title: "Discipline",
    desc: "Rigorous structure and personal accountability shape soldiers of character and unwavering resolve.",
  },
  {
    icon: "🛡",
    title: "Brotherhood",
    desc: "Bound by covenant, not convenience. We stand together in victory, hardship, and service.",
  },
  {
    icon: "🏅",
    title: "Excellence",
    desc: "Mediocrity has no place here. We pursue the highest standard in body, mind, and spirit.",
  },
];

const stats = [
  { value: "150+", label: "Active Members" },
  { value: "12", label: "Years of Service" },
  { value: "6", label: "Regional Chapters" },
  { value: "40+", label: "Annual Events" },
];

const latestNews = [
  {
    date: "March 2025",
    tag: "Announcement",
    title: "Annual National Muster — Registration Now Open",
    excerpt:
      "Join hundreds of brothers from across the country for three days of training, fellowship, and worship.",
    href: "/blog/annual-muster-2025",
  },
  {
    date: "February 2025",
    tag: "Ranks",
    title: "New Promotions — February Rank Ceremony",
    excerpt:
      "Fifteen members were elevated in rank following their rigorous evaluation boards. Congratulations to all.",
    href: "/blog/february-rank-ceremony",
  },
  {
    date: "January 2025",
    tag: "Community",
    title: "OCS Volunteers at City Shelter — 200 Meals Served",
    excerpt:
      "Our community outreach platoon mobilised to serve those in need. A reminder of why we soldier on.",
    href: "/blog/shelter-outreach",
  },
];

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

export default function Home() {
  const [pillarsRef, pillarsInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [newsRef, newsInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  return (
    <>
      <div className="bg-[#0a0f1e] min-h-screen font-['Barlow',sans-serif]">
        {/* <Navbar /> */}

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background texture — diagonal lines */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* Radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(201,168,76,0.08),transparent)]" />
          {/* Top & bottom fade */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a0f1e] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0f1e] to-transparent" />

          {/* Decorative cross */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.06]">
            <Image src={Logo} alt="" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            {/* Eyebrow */}
            <p className="text-[#c9a84c] text-xs tracking-[0.35em] uppercase font-['Barlow_Condensed'] font-600 mb-8 animate-fade-in">
              Est. 2013 &nbsp;·&nbsp; Faith &nbsp;·&nbsp; Discipline
              &nbsp;·&nbsp; Brotherhood
            </p>

            {/* Main headline */}
            <h1 className="font-['Cormorant_Garamond'] text-white leading-[0.95] mb-8">
              <span className="block text-[clamp(3.5rem,9vw,8rem)] font-700 tracking-tight">
                Onward
              </span>
              <span className="block text-[clamp(4.0rem,13vw,9rem)] font-900 tracking-tight text-[#c9a84c]">
                Christian
              </span>
              <span className="block text-[clamp(3.5rem,9vw,8rem)] font-700 tracking-tight">
                Soldiers
              </span>
              <span className="block text-[clamp(3.5rem,5vw,8rem)] font-500 tracking-tight text-[#c9a84c]">
                (OCS)
              </span>
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-[#c9a84c]/40" />
              <span className="text-[#c9a84c] text-lg font-['Cormorant_Garamond'] italic">
                Ephesians 6:11
              </span>
              <div className="h-px w-16 bg-[#c9a84c]/40" />
            </div>

            <p className="text-white/60 text-lg font-300 leading-relaxed max-w-2xl mx-auto mb-12 font-['Barlow']">
              A faith-based brotherhood forged in discipline and Scripture —
              equipping men to stand firm against every scheme of the enemy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-8 py-4 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase font-700 transition-all duration-300"
              >
                Who We Are
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 border border-white/20 hover:border-[#c9a84c]/60 text-white/70 hover:text-[#c9a84c] px-8 py-4 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase font-500 transition-all duration-300"
              >
                Join the Ranks
              </Link>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
            <span className="text-white text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed']">
              Scroll
            </span>
            <div className="w-px h-10 bg-white/40 animate-pulse" />
          </div>
        </section>

        {/* ── STATS BAND ── */}
        <section
          ref={statsRef}
          className="border-y border-white/10 bg-white/[0.02] py-12"
        >
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`text-center transition-all duration-700 ${
                  statsInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="font-['Cormorant_Garamond'] text-[#c9a84c] text-5xl font-700 leading-none mb-2">
                  {s.value}
                </p>
                <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed']">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PILLARS ── */}
        <section ref={pillarsRef} className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-700 ${
                pillarsInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-4">
                What We Stand For
              </p>
              <h2 className="font-['Cormorant_Garamond'] text-white text-5xl md:text-6xl font-600 leading-tight">
                The Four Pillars
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((p, i) => (
                <div
                  key={p.title}
                  className={`group border border-white/10 hover:border-[#c9a84c]/40 bg-white/[0.02] hover:bg-white/[0.04] p-8 transition-all duration-500 ${
                    pillarsInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="text-3xl mb-6 opacity-70 group-hover:opacity-100 transition-opacity">
                    {p.icon}
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-[#c9a84c] text-2xl font-600 mb-4 tracking-wide">
                    {p.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed font-300">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SCRIPTURE BANNER ── */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#c9a84c]/[0.05] border-y border-[#c9a84c]/20" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative max-w-4xl mx-auto text-center">
            <p className="text-[#c9a84c]/50 text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-6">
              Our Foundation
            </p>
            <blockquote className="font-['Cormorant_Garamond'] text-white text-3xl md:text-5xl font-400 italic leading-snug mb-8">
              &quot;Put on the full armor of God, so that you can take your
              stand against the devil&apos;s schemes.&quot;
            </blockquote>
            <cite className="text-[#c9a84c] text-sm tracking-[0.3em] uppercase font-['Barlow_Condensed'] not-italic">
              Ephesians 6:11 — NIV
            </cite>
          </div>
        </section>

        {/* ── LATEST NEWS ── */}
        <section ref={newsRef} className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div
              className={`flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 transition-all duration-700 ${
                newsInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-4">
                  From the Field
                </p>
                <h2 className="font-['Cormorant_Garamond'] text-white text-5xl font-600 leading-tight">
                  Latest News
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-[#c9a84c] text-sm tracking-[0.2em] uppercase font-['Barlow_Condensed'] hover:text-white transition-colors duration-200 shrink-0"
              >
                All Posts →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((post, i) => (
                <Link
                  href={post.href}
                  key={post.title}
                  className={`group border border-white/10 hover:border-[#c9a84c]/40 bg-white/[0.02] hover:bg-white/[0.04] p-8 flex flex-col transition-all duration-500 ${
                    newsInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] border border-[#c9a84c]/30 px-2 py-1">
                      {post.tag}
                    </span>
                    <span className="text-white/30 text-xs font-['Barlow']">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-white text-xl font-600 leading-snug mb-4 group-hover:text-[#c9a84c] transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed font-300 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 text-[#c9a84c] text-xs tracking-wider uppercase font-['Barlow_Condensed'] group-hover:translate-x-1 transition-transform duration-200">
                    Read More →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section ref={ctaRef} className="py-28 px-6">
          <div
            className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
              ctaInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="border border-[#c9a84c]/20 bg-[#c9a84c]/[0.03] p-16 relative overflow-hidden">
              {/* Corner accents */}
              {[
                "top-0 left-0 border-t-2 border-l-2",
                "top-0 right-0 border-t-2 border-r-2",
                "bottom-0 left-0 border-b-2 border-l-2",
                "bottom-0 right-0 border-b-2 border-r-2",
              ].map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-6 h-6 border-[#c9a84c]/60 ${cls}`}
                />
              ))}

              <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-6">
                Join the Brotherhood
              </p>
              <h2 className="font-['Cormorant_Garamond'] text-white text-4xl md:text-5xl font-600 leading-tight mb-6">
                Are You Ready to Enlist?
              </h2>
              <p className="text-white/50 leading-relaxed mb-10 font-300 font-['Barlow']">
                OCS is more than an organisation — it is a calling. If you are
                committed to faith, discipline, and brotherhood, we want to hear
                from you.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-10 py-4 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase font-700 transition-all duration-300 group"
              >
                Apply Now
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease forwards;
        }
      `}</style>
    </>
  );
}
