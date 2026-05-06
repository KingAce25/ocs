"use client";
import { useRouter } from "next/navigation";

import Link from "next/link";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const typeColors = {
  Muster: "border-[#c9a84c]/40 text-[#c9a84c] bg-[#c9a84c]/10",
  Training: "border-[#1D9E75]/40 text-[#5DCAA5] bg-[#1D9E75]/10",
  Outreach: "border-[#534AB7]/40 text-[#AFA9EC] bg-[#534AB7]/10",
  Ceremony: "border-[#D85A30]/40 text-[#F0997B] bg-[#D85A30]/10",
  Fellowship: "border-[#888780]/40 text-[#D3D1C7] bg-[#888780]/10",
};

function formatFull(str) {
  const d = new Date(str + "T00:00:00");
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export default function EventContent({ event, relatedEvents }) {
  const multiDay = event.startDate !== event.endDate;

  return (
    <>
      <div className="bg-[#0a0f1e] min-h-screen font-['Barlow',sans-serif]">
        {/* ── HERO ── */}
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

          <div className="relative max-w-4xl mx-auto">
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
                href="/events"
                className="text-white/30 hover:text-[#c9a84c] transition-colors"
              >
                Events
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-[#c9a84c]/70 truncate max-w-[200px]">
                {event.type}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span
                className={`border px-3 py-1 text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] ${typeColors[event.type]}`}
              >
                {event.type}
              </span>
              <span className="text-white/30 text-xs font-['Barlow']">
                {event.chapter}
              </span>
            </div>

            <h1 className="font-['Cormorant_Garamond'] text-white text-4xl md:text-5xl lg:text-6xl font-700 leading-tight tracking-tight mb-10">
              {event.title}
            </h1>

            {/* Meta bar */}
            <div className="flex flex-wrap gap-6 pb-10 border-b border-white/10">
              <div>
                <p className="text-white/30 text-xs font-['Barlow_Condensed'] tracking-widest uppercase mb-1">
                  Date
                </p>
                <p className="text-white/80 text-sm font-['Barlow']">
                  {multiDay
                    ? `${formatFull(event.startDate)} — ${formatFull(event.endDate)}`
                    : formatFull(event.startDate)}
                </p>
              </div>
              <div>
                <p className="text-white/30 text-xs font-['Barlow_Condensed'] tracking-widest uppercase mb-1">
                  Location
                </p>
                <p className="text-white/80 text-sm font-['Barlow']">
                  {event.location}
                </p>
              </div>
              {event.spots !== null && (
                <div>
                  <p className="text-white/30 text-xs font-['Barlow_Condensed'] tracking-widest uppercase mb-1">
                    Availability
                  </p>
                  <p className="text-[#c9a84c] text-sm font-['Barlow_Condensed'] tracking-wide">
                    {event.spots} spots remaining
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── CONTENT + SIDEBAR ── */}
        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12">
            {/* Body */}
            <div className="flex-1 min-w-0">
              {event.body?.map((block, i) => {
                if (block.type === "paragraph")
                  return (
                    <p
                      key={i}
                      className="text-white/65 text-lg leading-[1.9] font-300 mb-8"
                    >
                      {block.text}
                    </p>
                  );
                if (block.type === "heading")
                  return (
                    <h2
                      key={i}
                      className="font-['Cormorant_Garamond'] text-white text-3xl font-600 mt-12 mb-6"
                    >
                      {block.text}
                    </h2>
                  );
                if (block.type === "quote")
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
                return null;
              })}

              {/* Schedule */}
              {event.schedule && (
                <div className="mt-12">
                  <h2 className="font-['Cormorant_Garamond'] text-white text-3xl font-600 mb-8">
                    Programme Schedule
                  </h2>
                  <div className="flex flex-col gap-6">
                    {event.schedule.map((day, di) => (
                      <div
                        key={di}
                        className="border border-white/10 bg-white/[0.02]"
                      >
                        <div className="border-b border-white/10 px-6 py-4">
                          <h3 className="font-['Cormorant_Garamond'] text-[#c9a84c] text-xl font-600">
                            {day.day}
                          </h3>
                        </div>
                        <ul className="px-6 py-4 flex flex-col gap-2">
                          {day.items.map((item, ii) => (
                            <li
                              key={ii}
                              className="text-white/55 text-sm font-300 font-['Barlow'] flex items-start gap-3"
                            >
                              <span className="text-[#c9a84c]/30 mt-0.5">
                                —
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mt-12 pt-8 border-t border-white/10">
                <Link
                  href="/events"
                  className="flex items-center gap-3 text-white/40 hover:text-[#c9a84c] transition-colors font-['Barlow_Condensed'] text-sm tracking-wider uppercase"
                >
                  ← All Events
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0">
              <div className="lg:sticky lg:top-28 flex flex-col gap-4">
                {/* Register CTA */}
                <div className="border border-[#c9a84c]/25 bg-[#c9a84c]/[0.04] p-6 relative">
                  {[
                    "top-0 left-0 border-t-2 border-l-2",
                    "top-0 right-0 border-t-2 border-r-2",
                    "bottom-0 left-0 border-b-2 border-l-2",
                    "bottom-0 right-0 border-b-2 border-r-2",
                  ].map((cls, i) => (
                    <div
                      key={i}
                      className={`absolute w-4 h-4 border-[#c9a84c]/40 ${cls}`}
                    />
                  ))}
                  <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-4">
                    Register
                  </p>
                  {event.spots !== null && (
                    <div className="mb-5">
                      <div className="flex justify-between text-xs font-['Barlow_Condensed'] mb-2">
                        <span className="text-white/40">Spots filled</span>
                        <span className="text-[#c9a84c]">
                          {event.spots} left
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#c9a84c] rounded-full"
                          style={{
                            width: `${((event.spotsTotal - event.spots) / event.spotsTotal) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] py-3 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase font-700 transition-all duration-300"
                  >
                    Register Now →
                  </Link>
                </div>

                {/* Details card */}
                <div className="border border-white/10 bg-white/[0.02] p-6">
                  <p className="text-white/30 text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-5">
                    Event Details
                  </p>
                  <ul className="flex flex-col gap-4">
                    {[
                      { label: "Type", value: event.type },
                      { label: "Chapter", value: event.chapter },
                      { label: "Location", value: event.location },
                      {
                        label: "Date",
                        value: multiDay
                          ? `${formatFull(event.startDate)} –\n${formatFull(event.endDate)}`
                          : formatFull(event.startDate),
                      },
                    ].map(({ label, value }) => (
                      <li key={label}>
                        <p className="text-white/25 text-xs font-['Barlow_Condensed'] tracking-wider uppercase mb-1">
                          {label}
                        </p>
                        <p className="text-white/65 text-sm font-['Barlow'] whitespace-pre-line">
                          {value}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* ── RELATED EVENTS ── */}
        {relatedEvents.length > 0 && (
          <section className="px-6 pb-24 border-t border-white/10 pt-16">
            <div className="max-w-4xl mx-auto">
              <p className="text-white/30 text-xs tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-8">
                Related Events
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedEvents.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/events/${rel.slug}`}
                    className="group border border-white/10 hover:border-[#c9a84c]/30 bg-white/[0.02] hover:bg-white/[0.04] p-6 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`border px-2 py-1 text-xs tracking-[0.15em] uppercase font-['Barlow_Condensed'] ${typeColors[rel.type]}`}
                      >
                        {rel.type}
                      </span>
                    </div>
                    <h3 className="font-['Cormorant_Garamond'] text-white text-lg font-600 group-hover:text-[#c9a84c] transition-colors duration-200 mb-2">
                      {rel.title}
                    </h3>
                    <p className="text-white/30 text-xs font-['Barlow']">
                      {formatFull(rel.startDate)} · {rel.location}
                    </p>
                    <p className="mt-4 text-[#c9a84c]/50 text-xs tracking-wider uppercase font-['Barlow_Condensed'] group-hover:text-[#c9a84c] transition-colors">
                      View →
                    </p>
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
