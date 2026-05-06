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

export default function About() {
  const [missionRef, missionInView] = useInView();
  const [visionRef, visionInView] = useInView();
  const [timelineRef, timelineInView] = useInView();
  const [leadershipRef, leadershipInView] = useInView();
  const [valuesRef, valuesInView] = useInView();

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
            {/* Text */}
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
              <p className="text-white/60 leading-relaxed mb-6 font-300">
                The mission of Onward Christian Soldiers is to equip men of
                faith with the discipline, community, and spiritual grounding
                required to live with purpose and stand against compromise.
              </p>
              <p className="text-white/60 leading-relaxed font-300">
                We believe that authentic masculinity is not weakened by faith —
                it is defined by it. Every programme, rank, and activity within
                OCS is designed to cultivate men who lead their families, serve
                their communities, and honour God with their whole lives.
              </p>
            </div>

            {/* Accent block */}
            <div
              className={`transition-all duration-700 delay-200 ${
                missionInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative border border-[#c9a84c]/20 p-10 bg-[#c9a84c]/[0.03]">
                {/* Corner accents */}
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
            {/* Accent block (left on vision) */}
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

            {/* Text */}
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
              <p className="text-white/60 leading-relaxed mb-6 font-300">
                Our vision is a world where men of God are not a rarity but a
                movement — where disciplined faith reshapes families,
                communities, and culture from the inside out.
              </p>
              <p className="text-white/60 leading-relaxed mb-6 font-300">
                We envision chapters in every major city, a nationally
                recognised rank structure, and a generation of graduates who
                carry the OCS standard into every sphere of society — business,
                government, education, and church.
              </p>
              <p className="text-white/60 leading-relaxed font-300">
                The battlefield is the heart of every man. The stakes have never
                been higher. The mandate has never been clearer.
              </p>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section ref={valuesRef} className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-700 ${
                valuesInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-4">
                What Guides Us
              </p>
              <h2 className="font-['Cormorant_Garamond'] text-white text-5xl font-600">
                Our Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
              {[
                {
                  title: "Scripture First",
                  body: "Every decision, every rank, every rule flows from the Word of God. We do not add to it or subtract from it.",
                },
                {
                  title: "Honour in All Things",
                  body: "We conduct ourselves with integrity whether seen or unseen, celebrated or unnoticed. Character is not performance.",
                },
                {
                  title: "Accountability Over Comfort",
                  body: "Iron sharpens iron. We speak truth to one another in love, refuse to enable complacency, and celebrate growth.",
                },
                {
                  title: "Service as Calling",
                  body: "We exist not to be served but to serve. Community outreach, mentorship, and sacrifice are non-negotiable parts of membership.",
                },
              ].map((v, i) => (
                <div
                  key={v.title}
                  className={`bg-[#0a0f1e] p-10 transition-all duration-700 ${
                    valuesInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <span className="text-[#c9a84c]/25 font-['Cormorant_Garamond'] text-5xl font-700 leading-none shrink-0 mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-['Cormorant_Garamond'] text-[#c9a84c] text-2xl font-600 mb-3">
                        {v.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed font-300">
                        {v.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HISTORY TIMELINE ── */}
        <section
          ref={timelineRef}
          className="py-24 px-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/[0.015] border-y border-white/10" />

          <div className="relative max-w-4xl mx-auto">
            <div
              className={`text-center mb-20 transition-all duration-700 ${
                timelineInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-4">
                Where We Came From
              </p>
              <h2 className="font-['Cormorant_Garamond'] text-white text-5xl font-600">
                Our History
              </h2>
            </div>

            <div className="relative">
              {/* Vertical spine */}
              <div className="absolute left-[72px] md:left-1/2 top-0 bottom-0 w-px bg-[#c9a84c]/20 md:-translate-x-px" />

              <div className="flex flex-col gap-0">
                {timeline.map((event, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <div
                      key={event.year}
                      className={`relative flex items-start gap-6 md:gap-0 pb-14 last:pb-0 transition-all duration-700 ${
                        timelineInView
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: `${i * 120}ms` }}
                    >
                      {/* Mobile layout */}
                      <div className="md:hidden flex items-start gap-6 pl-0">
                        {/* Year + dot */}
                        <div className="relative shrink-0 w-[72px] text-right">
                          <span className="font-['Cormorant_Garamond'] text-[#c9a84c] text-xl font-600">
                            {event.year}
                          </span>
                          <div className="absolute right-[-9px] top-[6px] w-3 h-3 rounded-full border-2 border-[#c9a84c] bg-[#0a0f1e]" />
                        </div>
                        {/* Content */}
                        <div className="flex-1 pt-0.5">
                          <h3 className="font-['Cormorant_Garamond'] text-white text-xl font-600 mb-2">
                            {event.title}
                          </h3>
                          <p className="text-white/50 text-sm leading-relaxed font-300">
                            {event.body}
                          </p>
                        </div>
                      </div>

                      {/* Desktop alternating layout */}
                      <div className="hidden md:flex w-full items-start">
                        {isLeft ? (
                          <>
                            <div className="w-1/2 text-right pr-12 pt-0.5">
                              <h3 className="font-['Cormorant_Garamond'] text-white text-xl font-600 mb-2">
                                {event.title}
                              </h3>
                              <p className="text-white/50 text-sm leading-relaxed font-300">
                                {event.body}
                              </p>
                            </div>
                            <div className="relative flex flex-col items-center shrink-0">
                              <div className="w-4 h-4 rounded-full border-2 border-[#c9a84c] bg-[#0a0f1e] relative z-10" />
                            </div>
                            <div className="w-1/2 pl-12 pt-0.5">
                              <span className="font-['Cormorant_Garamond'] text-[#c9a84c] text-2xl font-600">
                                {event.year}
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-1/2 text-right pr-12 pt-0.5">
                              <span className="font-['Cormorant_Garamond'] text-[#c9a84c] text-2xl font-600">
                                {event.year}
                              </span>
                            </div>
                            <div className="relative flex flex-col items-center shrink-0">
                              <div className="w-4 h-4 rounded-full border-2 border-[#c9a84c] bg-[#0a0f1e] relative z-10" />
                            </div>
                            <div className="w-1/2 pl-12 pt-0.5">
                              <h3 className="font-['Cormorant_Garamond'] text-white text-xl font-600 mb-2">
                                {event.title}
                              </h3>
                              <p className="text-white/50 text-sm leading-relaxed font-300">
                                {event.body}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── LEADERSHIP ── */}
        <section ref={leadershipRef} className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-700 ${
                leadershipInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-4">
                Those Who Lead
              </p>
              <h2 className="font-['Cormorant_Garamond'] text-white text-5xl font-600">
                Senior Leadership
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {leadership.map((person, i) => (
                <div
                  key={person.name}
                  className={`border border-white/10 bg-white/[0.02] p-8 transition-all duration-700 ${
                    leadershipInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full border-2 border-[#c9a84c]/50 bg-[#c9a84c]/10 flex items-center justify-center mb-6">
                    <span className="font-['Cormorant_Garamond'] text-[#c9a84c] text-xl font-600">
                      {person.initial}
                    </span>
                  </div>
                  <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-2">
                    {person.rank}
                  </p>
                  <h3 className="font-['Cormorant_Garamond'] text-white text-xl font-600 mb-4">
                    {person.name}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed font-300">
                    {person.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="border border-[#c9a84c]/20 bg-[#c9a84c]/[0.03] p-14 relative overflow-hidden">
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
                Next Steps
              </p>
              <h2 className="font-['Cormorant_Garamond'] text-white text-4xl font-600 leading-tight mb-5">
                Ready to Serve?
              </h2>
              <p className="text-white/50 font-300 leading-relaxed mb-8">
                Explore our ranks and structure, or reach out directly to begin
                the enlistment process.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/ranks"
                  className="inline-flex items-center gap-3 bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-8 py-4 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase font-700 transition-all duration-300 group"
                >
                  View Ranks
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center border border-white/20 hover:border-[#c9a84c]/50 text-white/60 hover:text-[#c9a84c] px-8 py-4 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
