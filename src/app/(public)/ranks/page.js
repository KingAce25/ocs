"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import RankInsignia from "./RankInsignia";
import { getRanksContent } from "@/lib/ranksContent";

function useInView(threshold = 0.15) {
  const [node, setNode] = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [node, threshold]);

  return [setNode, inView];
}

const tierColors = {
  teal: {
    badge: "border-[#1D9E75]/50 bg-[#1D9E75]/10 text-[#5DCAA5]",
    accent: "bg-[#1D9E75]",
    bar: "bg-[#1D9E75]/20 border-[#1D9E75]/30",
    dot: "border-[#1D9E75] bg-[#0a0f1e]",
    label: "text-[#5DCAA5]",
  },
  gold: {
    badge: "border-[#c9a84c]/50 bg-[#c9a84c]/10 text-[#c9a84c]",
    accent: "bg-[#c9a84c]",
    bar: "bg-[#c9a84c]/20 border-[#c9a84c]/30",
    dot: "border-[#c9a84c] bg-[#0a0f1e]",
    label: "text-[#c9a84c]",
  },
  coral: {
    badge: "border-[#D85A30]/50 bg-[#D85A30]/10 text-[#F0997B]",
    accent: "bg-[#D85A30]",
    bar: "bg-[#D85A30]/20 border-[#D85A30]/30",
    dot: "border-[#D85A30] bg-[#0a0f1e]",
    label: "text-[#F0997B]",
  },
};

export default function RanksAndStructure() {
  const [ranks, setRanks] = useState(null);
  const [error, setError] = useState(false);
  const [selectedRank, setSelectedRank] = useState(null);
  const [heroRef, heroInView] = useInView(0.1);
  const [pyramidRef, pyramidInView] = useInView(0.1);
  const [ranksRef, ranksInView] = useInView(0.05);

  useEffect(() => {
    let cancelled = false;

    async function loadRanks() {
      try {
        const data = await getRanksContent();
        if (!cancelled) setRanks(data);
      } catch (err) {
        console.error("Failed to load ranks content:", err);
        if (!cancelled) setError(true);
      }
    }

    loadRanks();
    return () => {
      cancelled = true;
    };
  }, []);

  const allRanks = (ranks ?? []).flatMap((t) =>
    t.members.map((m) => ({ ...m, tier: t.tier, color: t.color })),
  );
  const selected = allRanks.find((r) => r.rank === selectedRank);

  return (
    <div className="bg-[#0a0f1e] min-h-screen font-['Barlow',sans-serif]">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

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
            The Chain of Command
          </p>
          <h1
            className={`font-['Cormorant_Garamond'] text-white text-[clamp(3rem,8vw,6rem)] font-700 leading-none tracking-tight mb-8 transition-all duration-700 delay-100 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Ranks &amp; Structure
          </h1>
          <div
            className={`flex items-center justify-center gap-4 mb-8 transition-all duration-700 delay-200 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="h-px w-12 bg-[#c9a84c]/40" />
            <span className="text-[#c9a84c]/60 text-sm font-['Cormorant_Garamond'] italic">
              Earned, Not Given
            </span>
            <div className="h-px w-12 bg-[#c9a84c]/40" />
          </div>
          <p
            className={`text-white/55 text-lg font-300 leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-300 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Every rank in OCS is earned through demonstrated faith, discipline,
            and service. There are no shortcuts — only the road of proven
            character.
          </p>
        </div>
      </section>

      {error ? (
        <section className="px-6 pb-28">
          <div className="max-w-2xl mx-auto text-center py-20">
            <p className="text-white/50 text-lg font-['Cormorant_Garamond'] italic">
              We&apos;re unable to load Ranks &amp; Structure right now.
            </p>
            <p className="text-white/30 text-sm mt-2">
              Please try again shortly, or contact us if the issue persists.
            </p>
          </div>
        </section>
      ) : ranks === null ? (
        <section className="px-6 pb-28">
          <div className="max-w-2xl mx-auto flex flex-col gap-2 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-9 bg-white/5 rounded" />
            ))}
          </div>
        </section>
      ) : (
        <>
          {/* ── RANK PYRAMID ── */}
          <section ref={pyramidRef} className="py-16 px-6">
            <div className="max-w-2xl mx-auto">
              <p
                className={`text-center text-white/30 text-xs tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-10 transition-all duration-700 ${pyramidInView ? "opacity-100" : "opacity-0"}`}
              >
                Command hierarchy — highest to lowest
              </p>
              <div className="flex flex-col items-center gap-2">
                {[...allRanks].reverse().map((r, i) => {
                  const c = tierColors[r.color];
                  const maxW = 100,
                    minW = 22;
                  const w =
                    minW +
                    ((maxW - minW) / (allRanks.length - 1)) *
                      (allRanks.length - 1 - i);
                  return (
                    <button
                      key={r.rank}
                      onClick={() =>
                        setSelectedRank(selectedRank === r.rank ? null : r.rank)
                      }
                      className={`h-9 flex items-center justify-center gap-3 border transition-all duration-300 group ${
                        selectedRank === r.rank
                          ? `${c.bar} ${c.label}`
                          : "border-white/10 bg-white/[0.02] text-white/50 hover:text-white/80 hover:border-white/20"
                      }`}
                      style={{
                        width: `${w}%`,
                        transitionDelay: pyramidInView ? `${i * 30}ms` : "0ms",
                        opacity: pyramidInView ? 1 : 0,
                        transform: pyramidInView
                          ? "translateY(0)"
                          : "translateY(8px)",
                      }}
                    >
                      <span className="font-['Barlow_Condensed'] text-[10px] tracking-[0.15em] uppercase">
                        {r.abbreviation}
                      </span>
                      <span className="font-['Cormorant_Garamond'] text-sm font-500 hidden sm:block truncate max-w-[160px]">
                        {r.rank}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                {ranks.map((t) => (
                  <div key={t.tier} className="flex items-center gap-2">
                    <div
                      className={`w-2.5 h-2.5 rounded-full border-2 ${tierColors[t.color].dot}`}
                    />
                    <span className="text-white/35 text-xs font-['Barlow_Condensed'] tracking-wide">
                      {t.tier}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── RANK DETAIL PANEL ── */}
          {selected && (
            <section className="px-6 pb-8">
              <div
                key={selected.rank}
                className="max-w-3xl mx-auto border border-[#c9a84c]/30 bg-[#c9a84c]/[0.04] p-8 relative"
              >
                {[
                  "top-0 left-0 border-t-2 border-l-2",
                  "top-0 right-0 border-t-2 border-r-2",
                  "bottom-0 left-0 border-b-2 border-l-2",
                  "bottom-0 right-0 border-b-2 border-r-2",
                ].map((cls, i) => (
                  <div
                    key={i}
                    className={`absolute w-4 h-4 border-[#c9a84c]/50 ${cls}`}
                  />
                ))}
                <button
                  onClick={() => setSelectedRank(null)}
                  className="absolute top-6 right-6 text-white/30 hover:text-white/70 transition-colors text-2xl leading-none z-10"
                >
                  ×
                </button>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                  {/* Animated insignia */}
                  <div className="shrink-0">
                    <RankInsignia rank={selected.rank} size="lg" />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <div
                      className={`inline-flex items-center gap-2 border px-3 py-1 mb-3 ${tierColors[selected.color].badge}`}
                    >
                      <span className="font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase">
                        {selected.tier}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-4 justify-center sm:justify-start flex-wrap">
                      <span
                        className={`font-['Barlow_Condensed'] text-sm tracking-widest ${tierColors[selected.color].label}`}
                      >
                        {selected.abbreviation}
                      </span>
                      <h3
                        className="font-['Cormorant_Garamond'] text-white text-3xl font-600 opacity-0 animate-[fadeInName_0.6s_ease-out_forwards]"
                        style={{ animationDelay: "850ms" }}
                      >
                        {selected.rank}
                      </h3>
                      <span className="text-white/20 text-xs font-['Barlow_Condensed']">
                        Level {selected.level}
                      </span>
                    </div>
                    <p className="text-white/60 leading-relaxed font-300 mt-4">
                      {selected.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                  <div>
                    <p
                      className={`text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-4 ${tierColors[selected.color].label}`}
                    >
                      Requirements
                    </p>
                    <ul className="flex flex-col gap-3">
                      {selected.requirements.map((req) => (
                        <li
                          key={req}
                          className="flex items-start gap-3 text-sm text-white/55 font-300"
                        >
                          <span
                            className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${tierColors[selected.color].accent}`}
                          />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p
                      className={`text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-4 ${tierColors[selected.color].label}`}
                    >
                      Responsibilities
                    </p>
                    <ul className="flex flex-col gap-3">
                      {selected.responsibilities.map((res) => (
                        <li
                          key={res}
                          className="flex items-start gap-3 text-sm text-white/55 font-300"
                        >
                          <span
                            className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${tierColors[selected.color].accent}`}
                          />
                          {res}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── FULL RANK LIST ── */}
          <section ref={ranksRef} className="py-16 px-6 pb-28">
            <div className="max-w-6xl mx-auto">
              {ranks.map((tier, ti) => {
                const c = tierColors[tier.color];
                return (
                  <div key={tier.tier} className="mb-16 last:mb-0">
                    <div
                      className={`flex items-center gap-4 mb-8 transition-all duration-700 ${ranksInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                      style={{ transitionDelay: `${ti * 100}ms` }}
                    >
                      <div className={`h-px flex-1 ${c.accent} opacity-20`} />
                      <span
                        className={`font-['Barlow_Condensed'] text-xs tracking-[0.3em] uppercase ${c.label}`}
                      >
                        {tier.tier}
                      </span>
                      <div className={`h-px flex-1 ${c.accent} opacity-20`} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {tier.members.map((member, mi) => (
                        <button
                          key={member.rank}
                          onClick={() =>
                            setSelectedRank(
                              selectedRank === member.rank ? null : member.rank,
                            )
                          }
                          className={`text-left border p-6 transition-all duration-300 group ${
                            selectedRank === member.rank
                              ? `${c.bar}`
                              : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                          } ${ranksInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                          style={{
                            transitionDelay: `${ti * 100 + mi * 60}ms`,
                          }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className={`border px-2 py-1 ${c.badge}`}>
                              <span className="font-['Barlow_Condensed'] text-[10px] tracking-[0.2em]">
                                {member.abbreviation}
                              </span>
                            </div>
                            <span className="text-white/15 text-xs font-['Barlow_Condensed'] tracking-wider">
                              LVL {member.level}
                            </span>
                          </div>
                          <h3
                            className={`font-['Cormorant_Garamond'] text-xl font-600 mb-3 transition-colors duration-200 ${selectedRank === member.rank ? c.label : "text-white group-hover:text-white/90"}`}
                          >
                            {member.rank}
                          </h3>
                          <p className="text-white/40 text-sm leading-relaxed font-300 line-clamp-3">
                            {member.description}
                          </p>
                          <p
                            className={`mt-4 text-xs tracking-wider uppercase font-['Barlow_Condensed'] transition-colors duration-200 ${selectedRank === member.rank ? c.label : "text-white/20 group-hover:text-white/40"}`}
                          >
                            {selectedRank === member.rank
                              ? "Close ×"
                              : "View details →"}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* ── PROMOTION PROCESS ── */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.015] border-y border-white/10" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-14">
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-4">
              How Promotion Works
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-white text-4xl font-600">
              The Path Forward
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: "Time in Rank",
                body: "Minimum service periods at each rank ensure maturity cannot be bypassed.",
              },
              {
                step: "02",
                title: "Character Review",
                body: "Peers and officers provide honest assessment of conduct, faithfulness, and growth.",
              },
              {
                step: "03",
                title: "Evaluation Board",
                body: "From Junior Inspector upward, a formal board reviews readiness for greater responsibility.",
              },
              {
                step: "04",
                title: "Commander Approval",
                body: "All promotions to commissioned ranks require senior command approval.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="border border-white/10 bg-white/[0.02] p-7"
              >
                <span className="font-['Cormorant_Garamond'] text-[#c9a84c]/25 text-5xl font-700 leading-none block mb-5">
                  {s.step}
                </span>
                <h3 className="font-['Cormorant_Garamond'] text-white text-xl font-600 mb-3">
                  {s.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed font-300">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="border border-[#c9a84c]/20 bg-[#c9a84c]/[0.03] p-14 relative">
            {[
              "top-0 left-0 border-t-2 border-l-2",
              "top-0 right-0 border-t-2 border-r-2",
              "bottom-0 left-0 border-b-2 border-l-2",
              "bottom-0 right-0 border-b-2 border-r-2",
            ].map((cls, i) => (
              <div
                key={i}
                className={`absolute w-5 h-5 border-[#c9a84c]/60 ${cls}`}
              />
            ))}
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-5">
              Begin at Constable
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-white text-4xl font-600 leading-tight mb-5">
              Every Commander General Was Once a Constable
            </h2>
            <p className="text-white/50 font-300 leading-relaxed mb-8">
              The highest rank begins with a single step of obedience. If you
              are ready to enlist, we are ready to receive you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-8 py-4 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase font-700 transition-all duration-300 group"
              >
                Enlist Now
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </Link>
              <Link
                href="/rules"
                className="inline-flex items-center border border-white/20 hover:border-[#c9a84c]/50 text-white/60 hover:text-[#c9a84c] px-8 py-4 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase transition-all duration-300"
              >
                Read the Rules
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeInName {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
