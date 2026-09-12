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

const FALLBACK_MISSION =
  "The mission of Onward Christian Soldiers is to equip men of faith with the discipline, community, and spiritual grounding required to live with purpose and stand against compromise.\n\nWe believe that authentic masculinity is not weakened by faith — it is defined by it. Every programme, rank, and activity within OCS is designed to cultivate men who lead their families, serve their communities, and honour God with their whole lives.";

const FALLBACK_VISION =
  "Our vision is a world where men of God are not a rarity but a movement — where disciplined faith reshapes families, communities, and culture from the inside out.\n\nWe envision chapters in every major city, a nationally recognised rank structure, and a generation of graduates who carry the OCS standard into every sphere of society — business, government, education, and church.\n\nThe battlefield is the heart of every man. The stakes have never been higher. The mandate has never been clearer.";

const timeline = [
  {
    year: "2013",
    title: "The Founding",
    body: "A small group of seven men gathered in a church hall, united by a shared conviction: that faith and discipline were inseparable. From that meeting, OCS was born.",
  },
  {
    year: "2015",
    title: "First National Muster",
    body: "What began as a local brotherhood expanded its reach. The inaugural National Muster drew 60 members from three regions — a milestone that proved the vision was bigger than its founders.",
  },
  {
    year: "2017",
    title: "Formal Rank Structure Established",
    body: "The organisation codified its rank and structure system, drawing from military tradition and grounding every level in Scripture. Accountability became architecture.",
  },
  {
    year: "2019",
    title: "Six Regional Chapters",
    body: "Growth demanded structure. Six regional chapters were formally chartered, each with its own leadership and character — but one mission.",
  },
  {
    year: "2022",
    title: "Community Outreach Initiative",
    body: "OCS launched its ongoing community service programme, placing members in shelters, schools, and relief operations. Service was no longer optional — it was standard issue.",
  },
  {
    year: "2025",
    title: "150+ Members & Growing",
    body: "Today OCS stands as one of the most disciplined faith-based brotherhoods in the country. The mission is unchanged. The ranks continue to grow.",
  },
];

const leadership = [
  {
    rank: "Commander",
    name: "Col. James Whitfield",
    bio: "Founder and commanding officer of OCS. Twenty years of military service and a lifelong commitment to Scripture-centred leadership.",
    initial: "JW",
  },
  {
    rank: "Deputy Commander",
    name: "Maj. Samuel Okafor",
    bio: "Leads the rank evaluation programme and oversees regional chapter coordination across all six districts.",
    initial: "SO",
  },
  {
    rank: "Chaplain General",
    name: "Rev. Thomas Marsh",
    bio: "Provides spiritual oversight and pastoral care across the brotherhood. Ordained minister and author of two books on faith and discipline.",
    initial: "TM",
  },
];

export default function AboutClient({ content }) {
  const [missionRef, missionInView] = useInView();
  const [visionRef, visionInView] = useInView();
  const [timelineRef, timelineInView] = useInView();
  const [leadershipRef, leadershipInView] = useInView();
  const [valuesRef, valuesInView] = useInView();

  // Split stored content on blank lines into paragraphs; fall back to static copy
  const missionParagraphs = (content.mission ?? FALLBACK_MISSION)
    .split(/\n\s*\n/)
    .filter(Boolean);
  const visionParagraphs = (content.vision ?? FALLBACK_VISION)
    .split(/\n\s*\n/)
    .filter(Boolean);

  return (
    <>
      <div className="bg-[#0a0f1e] min-h-screen font-['Barlow',sans-serif]">
        {/* ── PAGE HERO ── */}
        <section className="relative pt-40 pb-28 px-6 overflow-hidden">
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

          <div className="relative max-w-4xl mx-auto text-center">
            <p className="text-[#c9a84c] text-xs tracking-[0.35em] uppercase font-['Barlow_Condensed'] mb-6">
              Who We Are
            </p>
            <h1 className="font-['Cormorant_Garamond'] text-white text-[clamp(3rem,8vw,6rem)] font-700 leading-none tracking-tight mb-8">
              About OCS
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#c9a84c]/40" />
              <span className="text-[#c9a84c]/60 text-sm font-['Cormorant_Garamond'] italic">
                Established 2013
              </span>
              <div className="h-px w-12 bg-[#c9a84c]/40" />
            </div>
            <p className="text-white/55 text-lg font-300 leading-relaxed max-w-2xl mx-auto">
              We are a brotherhood shaped by Scripture, forged in discipline,
              and called to stand firm in a world that demands exactly that.
            </p>
          </div>
        </section>

        {/* ── MISSION ── */}
        <section ref={missionRef} className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-700 ${
                missionInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-5">
                Our Mission
              </p>
              <h2 className="font-['Cormorant_Garamond'] text-white text-4xl md:text-5xl font-600 leading-tight mb-8">
                To Equip Men as{" "}
                <span className="text-[#c9a84c] italic">
                  Soldiers of Christ
                </span>
              </h2>
              {missionParagraphs.map((para, i) => (
                <p
                  key={i}
                  className={`text-white/60 leading-relaxed font-300 ${
                    i < missionParagraphs.length - 1 ? "mb-6" : ""
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>

            <div
              className={`transition-all duration-700 delay-200 ${
                missionInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative border border-[#c9a84c]/20 p-10 bg-[#c9a84c]/[0.03]">
                {[
                  "top-0 left-0 border-t-2 border-l-2",
                  "top-0 right-0 border-t-2 border-r-2",
                  "bottom-0 left-0 border-b-2 border-l-2",
                  "bottom-0 right-0 border-b-2 border-r-2",
                ].map((cls, i) => (
                  <div
                    key={i}
                    className={`absolute w-5 h-5 border-[#c9a84c]/50 ${cls}`}
                  />
                ))}

                <p className="text-[#c9a84c]/50 text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-6">
                  Our Purpose in Three Words
                </p>

                {["Faith", "Discipline", "Brotherhood"].map((word, i) => (
                  <div
                    key={word}
                    className={`${i < 2 ? "border-b border-white/10" : ""} py-6 flex items-center gap-6`}
                  >
                    <span className="text-[#c9a84c]/30 font-['Cormorant_Garamond'] text-4xl font-700 leading-none w-10 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-['Cormorant_Garamond'] text-white text-3xl font-600 tracking-wide">
                      {word}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── VISION ── */}
        <section
          ref={visionRef}
          className="py-24 px-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/[0.015] border-y border-white/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_100%_at_80%_50%,rgba(201,168,76,0.05),transparent)]" />

          <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-700 ${
                visionInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <blockquote className="border-l-4 border-[#c9a84c]/50 pl-8 py-2">
                <p className="font-['Cormorant_Garamond'] text-white/80 text-2xl md:text-3xl italic font-400 leading-snug mb-6">
                  &quot;A generation of men so formed in faith and discipline
                  that the world cannot help but take notice.&quot;
                </p>
                <cite className="text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-['Barlow_Condensed'] not-italic">
                  — Col. James Whitfield, Founder
                </cite>
              </blockquote>

              <div className="mt-12 grid grid-cols-2 gap-4">
                {[
                  { label: "Local chapters", value: "6" },
                  { label: "Members active", value: "150+" },
                  { label: "Annual events", value: "40+" },
                  { label: "Years of service", value: "12" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/[0.03] border border-white/10 p-5"
                  >
                    <p className="font-['Cormorant_Garamond'] text-[#c9a84c] text-3xl font-700 leading-none mb-1">
                      {s.value}
                    </p>
                    <p className="text-white/40 text-xs tracking-[0.15em] uppercase font-['Barlow_Condensed']">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`transition-all duration-700 delay-200 ${
                visionInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-5">
                Our Vision
              </p>
              <h2 className="font-['Cormorant_Garamond'] text-white text-4xl md:text-5xl font-600 leading-tight mb-8">
                A Brotherhood That{" "}
                <span className="text-[#c9a84c] italic">
                  Transforms Nations
                </span>
              </h2>
              {visionParagraphs.map((para, i) => (
                <p
                  key={i}
                  className={`text-white/60 leading-relaxed font-300 ${
                    i < visionParagraphs.length - 1 ? "mb-6" : ""
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUES, TIMELINE, LEADERSHIP, CTA — unchanged from your original file ── */}
        {/* ... keep exactly as-is ... */}
      </div>
    </>
  );
}
