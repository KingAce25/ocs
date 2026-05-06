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

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const FILTERS = [
  "All",
  "Muster",
  "Training",
  "Outreach",
  "Ceremony",
  "Fellowship",
];

const events = [
  {
    slug: "national-muster-2025",
    title: "Annual National Muster",
    type: "Muster",
    startDate: "2025-07-18",
    endDate: "2025-07-20",
    location: "Camp Covenant, Blue Ridge, GA",
    chapter: "National",
    featured: true,
    spots: 40,
    spotsTotal: 350,
    description:
      "The flagship annual gathering of the OCS brotherhood. Three days of training, worship, fellowship, and the rank promotion ceremony.",
  },
  {
    slug: "q2-leadership-training",
    title: "Q2 Leadership Training",
    type: "Training",
    startDate: "2025-05-03",
    endDate: "2025-05-04",
    location: "OCS National HQ, Atlanta, GA",
    chapter: "National",
    featured: false,
    spots: 12,
    spotsTotal: 30,
    description:
      "A two-day intensive for members pursuing promotion to Staff Sergeant and above. Application required.",
  },
  {
    slug: "easter-outreach-2025",
    title: "Easter Community Outreach",
    type: "Outreach",
    startDate: "2025-04-19",
    endDate: "2025-04-19",
    location: "Various Locations",
    chapter: "All Chapters",
    featured: false,
    spots: null,
    spotsTotal: null,
    description:
      "All chapters mobilise simultaneously for community service — food drives, shelter volunteering, and neighbourhood clean-up.",
  },
  {
    slug: "spring-rank-ceremony",
    title: "Spring Rank Promotion Ceremony",
    type: "Ceremony",
    startDate: "2025-04-05",
    endDate: "2025-04-05",
    location: "OCS National HQ, Atlanta, GA",
    chapter: "National",
    featured: false,
    spots: null,
    spotsTotal: null,
    description:
      "Formal promotion ceremony for Q1 evaluation board graduates. Open to all members and immediate family.",
  },
  {
    slug: "brotherhood-night-march",
    title: "Brotherhood Night — March",
    type: "Fellowship",
    startDate: "2025-03-28",
    endDate: "2025-03-28",
    location: "Atlanta Chapter Hall",
    chapter: "Atlanta",
    featured: false,
    spots: null,
    spotsTotal: null,
    description:
      "Monthly chapter fellowship evening. Scripture study, dinner, and open discussion. Guests welcome.",
  },
  {
    slug: "recruit-orientation-q2",
    title: "Recruit Orientation — Q2 Cohort",
    type: "Training",
    startDate: "2025-04-12",
    endDate: "2025-04-12",
    location: "OCS National HQ, Atlanta, GA",
    chapter: "National",
    featured: false,
    spots: 8,
    spotsTotal: 20,
    description:
      "Mandatory orientation for all new Recruits beginning their 90-day probationary period in Q2 2025.",
  },
  {
    slug: "lagos-chapter-launch",
    title: "Lagos Chapter Launch Event",
    type: "Fellowship",
    startDate: "2025-03-15",
    endDate: "2025-03-15",
    location: "Lagos, Nigeria",
    chapter: "Lagos",
    featured: false,
    spots: null,
    spotsTotal: null,
    description:
      "Formal launch celebration for OCS's first international chapter. Senior leadership in attendance.",
  },
  {
    slug: "physical-fitness-assessment",
    title: "Annual Physical Fitness Assessment",
    type: "Training",
    startDate: "2025-06-14",
    endDate: "2025-06-14",
    location: "Various Chapter Locations",
    chapter: "All Chapters",
    featured: false,
    spots: null,
    spotsTotal: null,
    description:
      "Mandatory annual PT assessment for all members Corporal and above. New 2025 standards apply.",
  },
];

const typeColors = {
  Muster: {
    pill: "border-[#c9a84c]/40 text-[#c9a84c] bg-[#c9a84c]/10",
    dot: "bg-[#c9a84c]",
  },
  Training: {
    pill: "border-[#1D9E75]/40 text-[#5DCAA5] bg-[#1D9E75]/10",
    dot: "bg-[#1D9E75]",
  },
  Outreach: {
    pill: "border-[#534AB7]/40 text-[#AFA9EC] bg-[#534AB7]/10",
    dot: "bg-[#534AB7]",
  },
  Ceremony: {
    pill: "border-[#D85A30]/40 text-[#F0997B] bg-[#D85A30]/10",
    dot: "bg-[#D85A30]",
  },
  Fellowship: {
    pill: "border-[#888780]/40 text-[#D3D1C7] bg-[#888780]/10",
    dot: "bg-[#888780]",
  },
};

function formatDate(str) {
  const d = new Date(str + "T00:00:00");
  return {
    day: d.getDate(),
    month: MONTHS[d.getMonth()],
    year: d.getFullYear(),
  };
}

function isMultiDay(start, end) {
  return start !== end;
}

function isSoon(dateStr) {
  const diff =
    (new Date(dateStr + "T00:00:00") - new Date()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 14;
}

export default function Events() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [view, setView] = useState("list"); // "list" | "calendar"
  const [heroRef, heroInView] = useInView(0.1);
  const [eventsRef, eventsInView] = useInView(0.05);

  const featured = events.find((e) => e.featured);
  const filtered = events
    .filter((e) => !e.featured)
    .filter((e) => activeFilter === "All" || e.type === activeFilter)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  // Calendar state
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const calEvents = events.filter((e) => {
    const d = new Date(e.startDate + "T00:00:00");
    return d.getMonth() === calMonth && d.getFullYear() === calYear;
  });

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
              On the Ground
            </p>
            <h1
              className={`font-['Cormorant_Garamond'] text-white text-[clamp(3rem,8vw,6rem)] font-700 leading-none tracking-tight mb-8 transition-all duration-700 delay-100 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Events &amp; Calendar
            </h1>
            <div
              className={`flex items-center justify-center gap-4 mb-8 transition-all duration-700 delay-200 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div className="h-px w-12 bg-[#c9a84c]/40" />
              <span className="text-[#c9a84c]/60 text-sm font-['Cormorant_Garamond'] italic">
                Where Brotherhood Happens
              </span>
              <div className="h-px w-12 bg-[#c9a84c]/40" />
            </div>
            <p
              className={`text-white/55 text-lg font-300 leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-300 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Musters, training weekends, outreach days, ceremonies, and
              fellowship gatherings — the calendar of a brotherhood in motion.
            </p>
          </div>
        </section>

        {/* ── FEATURED EVENT ── */}
        {featured && (
          <section className="px-6 pb-16">
            <div className="max-w-6xl mx-auto">
              <p className="text-white/30 text-xs tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-6">
                Flagship Event
              </p>
              <Link
                href={`/events/${featured.slug}`}
                className="group block border border-[#c9a84c]/25 bg-[#c9a84c]/[0.03] hover:border-[#c9a84c]/50 hover:bg-[#c9a84c]/[0.06] transition-all duration-300 relative overflow-hidden"
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
                <div className="flex flex-col md:flex-row">
                  {/* Date block */}
                  <div className="md:w-48 shrink-0 bg-[#c9a84c]/10 border-b md:border-b-0 md:border-r border-[#c9a84c]/20 flex flex-col items-center justify-center p-8 gap-1">
                    <span className="font-['Barlow_Condensed'] text-[#c9a84c]/60 text-xs tracking-[0.3em] uppercase">
                      {formatDate(featured.startDate).month} —{" "}
                      {formatDate(featured.endDate).month}
                    </span>
                    <span className="font-['Cormorant_Garamond'] text-[#c9a84c] text-6xl font-700 leading-none">
                      {formatDate(featured.startDate).day}–
                      {formatDate(featured.endDate).day}
                    </span>
                    <span className="font-['Barlow_Condensed'] text-[#c9a84c]/50 text-sm tracking-widest">
                      {formatDate(featured.startDate).year}
                    </span>
                  </div>
                  {/* Info */}
                  <div className="flex-1 p-10">
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className={`border px-3 py-1 text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] ${typeColors[featured.type].pill}`}
                      >
                        {featured.type}
                      </span>
                      <span className="text-white/30 text-xs font-['Barlow']">
                        {featured.chapter}
                      </span>
                    </div>
                    <h2 className="font-['Cormorant_Garamond'] text-white text-3xl md:text-4xl font-600 leading-tight mb-4 group-hover:text-[#c9a84c] transition-colors duration-300">
                      {featured.title}
                    </h2>
                    <p className="text-white/50 leading-relaxed font-300 mb-6">
                      {featured.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                      <div className="flex items-center gap-2 text-white/40 text-sm">
                        <span>📍</span>
                        <span className="font-['Barlow']">
                          {featured.location}
                        </span>
                      </div>
                      {featured.spots !== null && (
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#c9a84c] rounded-full"
                              style={{
                                width: `${((featured.spotsTotal - featured.spots) / featured.spotsTotal) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-[#c9a84c] text-xs font-['Barlow_Condensed'] tracking-wider">
                            {featured.spots} spots left
                          </span>
                        </div>
                      )}
                      <span className="text-[#c9a84c] text-sm tracking-widest uppercase font-['Barlow_Condensed'] group-hover:translate-x-1 transition-transform duration-200">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* ── VIEW TOGGLE + FILTER ── */}
        <section className="px-6 pb-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 border font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase transition-all duration-200 ${
                    activeFilter === f
                      ? "border-[#c9a84c]/50 bg-[#c9a84c]/10 text-[#c9a84c]"
                      : "border-white/10 bg-white/[0.02] text-white/40 hover:text-white/70 hover:border-white/20"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex gap-2 shrink-0">
              {[
                ["list", "List"],
                ["calendar", "Calendar"],
              ].map(([v, label]) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-2 border font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase transition-all duration-200 ${
                    view === v
                      ? "border-white/30 text-white bg-white/10"
                      : "border-white/10 text-white/30 hover:text-white/60"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── LIST VIEW ── */}
        {view === "list" && (
          <section ref={eventsRef} className="px-6 pb-28">
            <div className="max-w-6xl mx-auto flex flex-col gap-4">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-white/30 font-['Cormorant_Garamond'] text-2xl italic">
                    No events in this category.
                  </p>
                </div>
              ) : (
                filtered.map((event, i) => {
                  const start = formatDate(event.startDate);
                  const multiDay = isMultiDay(event.startDate, event.endDate);
                  const end = multiDay ? formatDate(event.endDate) : null;
                  const soon = isSoon(event.startDate);
                  const tc = typeColors[event.type];

                  return (
                    <Link
                      key={event.slug}
                      href={`/events/${event.slug}`}
                      className={`group flex flex-col sm:flex-row border border-white/10 hover:border-[#c9a84c]/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 ${
                        eventsInView
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: `${i * 70}ms` }}
                    >
                      {/* Date column */}
                      <div className="sm:w-36 shrink-0 border-b sm:border-b-0 sm:border-r border-white/10 flex sm:flex-col items-center sm:justify-center gap-3 sm:gap-1 p-5 sm:p-6">
                        <span className="font-['Barlow_Condensed'] text-white/25 text-xs tracking-widest uppercase">
                          {start.month}
                        </span>
                        <span className="font-['Cormorant_Garamond'] text-white text-4xl font-600 leading-none">
                          {start.day}
                          {multiDay ? `–${end.day}` : ""}
                        </span>
                        <span className="font-['Barlow_Condensed'] text-white/20 text-xs">
                          {start.year}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <span
                              className={`border px-2 py-1 text-xs tracking-[0.15em] uppercase font-['Barlow_Condensed'] ${tc.pill}`}
                            >
                              {event.type}
                            </span>
                            {soon && (
                              <span className="border border-white/20 text-white/40 px-2 py-1 text-xs tracking-[0.15em] uppercase font-['Barlow_Condensed']">
                                Coming Soon
                              </span>
                            )}
                            <span className="text-white/25 text-xs font-['Barlow']">
                              {event.chapter}
                            </span>
                          </div>
                          <h3 className="font-['Cormorant_Garamond'] text-white text-xl font-600 group-hover:text-[#c9a84c] transition-colors duration-200 mb-2">
                            {event.title}
                          </h3>
                          <p className="text-white/35 text-sm font-['Barlow'] flex items-center gap-1.5">
                            <span>📍</span> {event.location}
                          </p>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-3 shrink-0">
                          {event.spots !== null && (
                            <div className="text-right">
                              <p className="text-[#c9a84c] text-sm font-['Barlow_Condensed'] tracking-wide">
                                {event.spots} spots
                              </p>
                              <p className="text-white/25 text-xs font-['Barlow']">
                                remaining
                              </p>
                            </div>
                          )}
                          <span className="text-[#c9a84c]/50 text-xs tracking-wider uppercase font-['Barlow_Condensed'] group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all duration-200">
                            Details →
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </section>
        )}

        {/* ── CALENDAR VIEW ── */}
        {view === "calendar" && (
          <section className="px-6 pb-28">
            <div className="max-w-3xl mx-auto">
              {/* Month nav */}
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => {
                    if (calMonth === 0) {
                      setCalMonth(11);
                      setCalYear(calYear - 1);
                    } else setCalMonth(calMonth - 1);
                  }}
                  className="text-white/40 hover:text-[#c9a84c] transition-colors font-['Barlow_Condensed'] text-sm tracking-wider uppercase"
                >
                  ← Prev
                </button>
                <h2 className="font-['Cormorant_Garamond'] text-white text-2xl font-600">
                  {MONTHS[calMonth]} {calYear}
                </h2>
                <button
                  onClick={() => {
                    if (calMonth === 11) {
                      setCalMonth(0);
                      setCalYear(calYear + 1);
                    } else setCalMonth(calMonth + 1);
                  }}
                  className="text-white/40 hover:text-[#c9a84c] transition-colors font-['Barlow_Condensed'] text-sm tracking-wider uppercase"
                >
                  Next →
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div
                    key={d}
                    className="text-center text-white/20 text-xs font-['Barlow_Condensed'] tracking-widest py-2"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-7 border-l border-t border-white/10">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="border-r border-b border-white/10 h-16 sm:h-20"
                  />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = calEvents.filter((e) => {
                    const d = new Date(e.startDate + "T00:00:00");
                    return d.getDate() === day;
                  });
                  const isToday =
                    today.getDate() === day &&
                    today.getMonth() === calMonth &&
                    today.getFullYear() === calYear;
                  return (
                    <div
                      key={day}
                      className={`border-r border-b border-white/10 h-16 sm:h-20 p-1.5 ${isToday ? "bg-white/[0.04]" : ""}`}
                    >
                      <span
                        className={`text-xs font-['Barlow_Condensed'] block mb-1 ${isToday ? "text-[#c9a84c]" : "text-white/30"}`}
                      >
                        {day}
                      </span>
                      {dayEvents.slice(0, 2).map((e) => (
                        <Link key={e.slug} href={`/events/${e.slug}`}>
                          <span
                            className={`block truncate text-[10px] px-1 py-0.5 mb-0.5 rounded-sm font-['Barlow_Condensed'] tracking-wide ${typeColors[e.type]?.pill || ""}`}
                          >
                            {e.title}
                          </span>
                        </Link>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="text-white/25 text-[10px] font-['Barlow_Condensed']">
                          +{dayEvents.length - 2}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                {Object.entries(typeColors).map(([type, colors]) => (
                  <div key={type} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                    <span className="text-white/35 text-xs font-['Barlow_Condensed'] tracking-wide">
                      {type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-20 px-6 relative overflow-hidden border-t border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_100%_at_50%_50%,rgba(201,168,76,0.04),transparent)]" />
          <div className="relative max-w-3xl mx-auto text-center">
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-5">
              Don&apos;t Miss Out
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-white text-4xl font-600 leading-tight mb-5">
              Want to Host a Chapter Event?
            </h2>
            <p className="text-white/50 font-300 leading-relaxed mb-8">
              Chapter Captains can submit events for review and publication
              through the admin panel. All events require commanding officer
              approval before going live.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-8 py-4 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase font-700 transition-all duration-300 group"
              >
                Contact Leadership
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center border border-white/20 hover:border-[#c9a84c]/50 text-white/60 hover:text-[#c9a84c] px-8 py-4 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase transition-all duration-300"
              >
                About OCS
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
