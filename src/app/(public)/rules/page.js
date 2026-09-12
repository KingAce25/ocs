"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getRulesContent } from "@/lib/rulesContent";

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

export default function RulesAndRegulations() {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [openRule, setOpenRule] = useState(null);
  const [heroRef, heroInView] = useInView(0.1);
  const [rulesRef, rulesInView] = useInView(0.05);

  useEffect(() => {
    let cancelled = false;

    async function loadRules() {
      try {
        const data = await getRulesContent();
        if (!cancelled) {
          setContent(data);
          setActiveCategory(data.categories?.[0]?.id ?? null);
        }
      } catch (err) {
        // No static fallback here — rules are legal/policy content, so
        // showing an error is safer than showing stale or empty rules.
        console.error("Failed to load rules content:", err);
        if (!cancelled) setError(true);
      }
    }

    loadRules();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = content?.categories ?? [];
  const activeData = categories.find((c) => c.id === activeCategory);

  return (
    <>
      <div className="bg-[#0a0f1e] min-h-screen font-['Barlow',sans-serif]">
        {/* ── HERO ── */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(201,168,76,0.07),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0f1e] to-transparent" />

          <div ref={heroRef} className="relative max-w-4xl mx-auto text-center">
            <p
              className={`text-[#c9a84c] text-xs tracking-[0.35em] uppercase font-['Barlow_Condensed'] mb-6 transition-all duration-700 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Standards of the Brotherhood
            </p>
            <h1
              className={`font-['Cormorant_Garamond'] text-white text-[clamp(3rem,8vw,6rem)] font-700 leading-none tracking-tight mb-8 transition-all duration-700 delay-100 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Rules &amp; Regulations
            </h1>
            <div
              className={`flex items-center justify-center gap-4 mb-8 transition-all duration-700 delay-200 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="h-px w-12 bg-[#c9a84c]/40" />
              <span className="text-[#c9a84c]/60 text-sm font-['Cormorant_Garamond'] italic">
                The Standard We Hold
              </span>
              <div className="h-px w-12 bg-[#c9a84c]/40" />
            </div>
            <p
              className={`text-white/55 text-lg font-300 leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-300 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              These are not suggestions. They are the covenant we make with one
              another and with God. Every member enlists knowing what is
              required.
            </p>
          </div>
        </section>

        {/* ── PREAMBLE ── */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto border-l-4 border-[#c9a84c]/40 pl-8">
            <p className="text-[#c9a84c]/60 text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-4">
              Preamble
            </p>
            <p className="text-white/70 text-lg font-['Cormorant_Garamond'] italic leading-relaxed mb-4">
              &quot;We, the members of Onward Christian Soldiers, covenant
              together to uphold the following rules and regulations — not out
              of obligation alone, but out of a shared commitment to the mission
              God has placed before us.&quot;
            </p>
            <p className="text-white/40 text-sm font-300">
              These regulations apply to all members regardless of rank, tenure,
              or chapter. They are reviewed annually by senior leadership and
              updated as necessary. Last updated:{" "}
              <span className="text-[#c9a84c]/70">
                {content?.lastUpdated ?? "—"}
              </span>
            </p>
          </div>
        </section>

        {/* ── RULES BODY ── */}
        <section ref={rulesRef} className="py-16 px-6 pb-28">
          <div className="max-w-6xl mx-auto">
            {error ? (
              <div className="text-center py-20">
                <p className="text-white/50 text-lg font-['Cormorant_Garamond'] italic">
                  We&apos;re unable to load the Rules &amp; Regulations right
                  now.
                </p>
                <p className="text-white/30 text-sm mt-2">
                  Please try again shortly, or contact us if the issue persists.
                </p>
              </div>
            ) : content === null ? (
              <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
                <aside className="lg:w-64 shrink-0 flex flex-col gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-12 bg-white/5 rounded" />
                  ))}
                </aside>
                <div className="flex-1 flex flex-col gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-16 bg-white/5 rounded" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar nav */}
                <aside className="lg:w-64 shrink-0">
                  <div className="lg:sticky lg:top-28">
                    <p className="text-white/30 text-xs tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-4 px-1">
                      Sections
                    </p>
                    <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveCategory(cat.id);
                            setOpenRule(null);
                          }}
                          className={`flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 shrink-0 lg:shrink border ${
                            activeCategory === cat.id
                              ? "border-[#c9a84c]/50 bg-[#c9a84c]/10 text-[#c9a84c]"
                              : "border-white/10 bg-white/[0.02] text-white/50 hover:text-white/80 hover:border-white/20"
                          }`}
                        >
                          <span className="text-lg leading-none">
                            {cat.icon}
                          </span>
                          <span className="font-['Barlow_Condensed'] text-sm tracking-wide whitespace-nowrap">
                            {cat.label}
                          </span>
                        </button>
                      ))}
                    </nav>
                  </div>
                </aside>

                {/* Rules content */}
                <div className="flex-1 min-w-0">
                  {activeData && (
                    <div
                      className={`transition-all duration-500 ${
                        rulesInView
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                    >
                      {/* Section header */}
                      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                        <span className="text-3xl">{activeData.icon}</span>
                        <div>
                          <p className="text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-1">
                            Section{" "}
                            {categories.findIndex(
                              (c) => c.id === activeCategory,
                            ) + 1}
                          </p>
                          <h2 className="font-['Cormorant_Garamond'] text-white text-3xl font-600">
                            {activeData.label}
                          </h2>
                        </div>
                      </div>

                      {/* Rules list */}
                      <div className="flex flex-col gap-3">
                        {activeData.rules.map((rule, i) => (
                          <div
                            key={rule.number}
                            className={`border transition-all duration-300 ${
                              openRule === rule.number
                                ? "border-[#c9a84c]/40 bg-[#c9a84c]/[0.05]"
                                : "border-white/10 bg-white/[0.02] hover:border-white/20"
                            }`}
                            style={{ transitionDelay: `${i * 60}ms` }}
                          >
                            <button
                              className="w-full flex items-center justify-between gap-6 p-6 text-left"
                              onClick={() =>
                                setOpenRule(
                                  openRule === rule.number ? null : rule.number,
                                )
                              }
                            >
                              <div className="flex items-center gap-5">
                                <span className="font-['Cormorant_Garamond'] text-[#c9a84c]/40 text-xl font-600 shrink-0 w-10">
                                  {rule.number}
                                </span>
                                <h3 className="font-['Cormorant_Garamond'] text-white text-xl font-600">
                                  {rule.title}
                                </h3>
                              </div>
                              <span
                                className={`text-[#c9a84c] text-lg shrink-0 transition-transform duration-300 ${
                                  openRule === rule.number ? "rotate-45" : ""
                                }`}
                              >
                                +
                              </span>
                            </button>

                            {openRule === rule.number && (
                              <div className="px-6 pb-6">
                                <div className="pl-15 ml-[60px] border-l border-[#c9a84c]/20 pl-6">
                                  <p className="text-white/60 text-sm leading-relaxed font-300">
                                    {rule.body}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Navigation between sections */}
                  <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/10">
                    {(() => {
                      const idx = categories.findIndex(
                        (c) => c.id === activeCategory,
                      );
                      const prev = categories[idx - 1];
                      const next = categories[idx + 1];
                      return (
                        <>
                          <button
                            onClick={() => prev && setActiveCategory(prev.id)}
                            disabled={!prev}
                            className={`flex items-center gap-3 font-['Barlow_Condensed'] text-sm tracking-wider uppercase transition-all duration-200 ${
                              prev
                                ? "text-white/50 hover:text-[#c9a84c]"
                                : "text-white/20 cursor-not-allowed"
                            }`}
                          >
                            ← {prev ? prev.label : ""}
                          </button>
                          <button
                            onClick={() => next && setActiveCategory(next.id)}
                            disabled={!next}
                            className={`flex items-center gap-3 font-['Barlow_Condensed'] text-sm tracking-wider uppercase transition-all duration-200 ${
                              next
                                ? "text-white/50 hover:text-[#c9a84c]"
                                : "text-white/20 cursor-not-allowed"
                            }`}
                          >
                            {next ? next.label : ""} →
                          </button>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── CLOSING COVENANT ── */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/[0.015] border-y border-white/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_100%_at_50%_50%,rgba(201,168,76,0.04),transparent)]" />
          <div className="relative max-w-3xl mx-auto text-center">
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-6">
              The Covenant
            </p>
            <blockquote className="font-['Cormorant_Garamond'] text-white/80 text-2xl md:text-3xl italic leading-snug mb-8">
              &quot;As iron sharpens iron, so one person sharpens another.&quot;
            </blockquote>
            <cite className="text-[#c9a84c]/60 text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] not-italic">
              Proverbs 27:17
            </cite>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-8 py-4 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase font-700 transition-all duration-300 group"
              >
                Begin Enlistment
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </Link>
              <Link
                href="/ranks"
                className="inline-flex items-center border border-white/20 hover:border-[#c9a84c]/50 text-white/60 hover:text-[#c9a84c] px-8 py-4 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase transition-all duration-300"
              >
                View Ranks
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
