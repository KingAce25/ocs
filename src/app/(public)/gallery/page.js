"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

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

const FILTERS = [
  "All",
  "Muster",
  "Ceremony",
  "Training",
  "Outreach",
  "Fellowship",
];

// Placeholder gallery items — replace src with real Supabase Storage URLs
const gallery = [
  {
    id: 1,
    category: "Muster",
    year: 2024,
    title: "National Muster 2024 — Opening Assembly",
    src: null,
    wide: true,
  },
  {
    id: 2,
    category: "Ceremony",
    year: 2024,
    title: "Rank Promotion — February 2024",
    src: null,
    wide: false,
  },
  {
    id: 3,
    category: "Training",
    year: 2024,
    title: "Morning PT — Q1 Leadership Cohort",
    src: null,
    wide: false,
  },
  {
    id: 4,
    category: "Outreach",
    year: 2024,
    title: "City Shelter Volunteer Day",
    src: null,
    wide: false,
  },
  {
    id: 5,
    category: "Muster",
    year: 2024,
    title: "National Muster 2024 — Worship Session",
    src: null,
    wide: false,
  },
  {
    id: 6,
    category: "Fellowship",
    year: 2024,
    title: "Brotherhood Night — Atlanta Chapter",
    src: null,
    wide: true,
  },
  {
    id: 7,
    category: "Ceremony",
    year: 2023,
    title: "Annual Christmas Service 2023",
    src: null,
    wide: false,
  },
  {
    id: 8,
    category: "Training",
    year: 2023,
    title: "Advanced Leadership Training Weekend",
    src: null,
    wide: false,
  },
  {
    id: 9,
    category: "Muster",
    year: 2023,
    title: "National Muster 2023 — Promotion Ceremony",
    src: null,
    wide: true,
  },
  {
    id: 10,
    category: "Outreach",
    year: 2023,
    title: "Easter Community Outreach 2023",
    src: null,
    wide: false,
  },
  {
    id: 11,
    category: "Fellowship",
    year: 2023,
    title: "New Member Welcome Dinner",
    src: null,
    wide: false,
  },
  {
    id: 12,
    category: "Training",
    year: 2023,
    title: "Recruit Orientation — Q3 Cohort",
    src: null,
    wide: false,
  },
];

// Deterministic placeholder colors per item (no images yet)
const placeholderPalettes = [
  ["#0f1a2e", "#1a2d4a"],
  ["#1a1008", "#2e1d0a"],
  ["#0a1a12", "#0e2a1e"],
  ["#1a0a0a", "#2e1010"],
  ["#12101a", "#1e1530"],
  ["#0a1218", "#101e28"],
];

const categoryAccents = {
  Muster: "#c9a84c",
  Ceremony: "#F0997B",
  Training: "#5DCAA5",
  Outreach: "#AFA9EC",
  Fellowship: "#D3D1C7",
};

const categoryPills = {
  Muster: "border-[#c9a84c]/40 text-[#c9a84c] bg-[#c9a84c]/10",
  Ceremony: "border-[#D85A30]/40 text-[#F0997B] bg-[#D85A30]/10",
  Training: "border-[#1D9E75]/40 text-[#5DCAA5] bg-[#1D9E75]/10",
  Outreach: "border-[#534AB7]/40 text-[#AFA9EC] bg-[#534AB7]/10",
  Fellowship: "border-[#888780]/40 text-[#D3D1C7] bg-[#888780]/10",
};

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null); // index into filtered array
  const [heroRef, heroInView] = useInView(0.1);
  const [gridRef, gridInView] = useInView(0.05);

  const filtered = gallery.filter(
    (item) => activeFilter === "All" || item.category === activeFilter,
  );

  // Keyboard nav for lightbox
  const handleKey = useCallback(
    (e) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % filtered.length);
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i - 1 + filtered.length) % filtered.length);
    },
    [lightbox, filtered.length],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const currentItem = lightbox !== null ? filtered[lightbox] : null;
  const palette = (id) =>
    placeholderPalettes[(id - 1) % placeholderPalettes.length];

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
              In the Field
            </p>
            <h1
              className={`font-['Cormorant_Garamond'] text-white text-[clamp(3rem,8vw,6rem)] font-700 leading-none tracking-tight mb-8 transition-all duration-700 delay-100 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Gallery &amp; Media
            </h1>
            <div
              className={`flex items-center justify-center gap-4 mb-8 transition-all duration-700 delay-200 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div className="h-px w-12 bg-[#c9a84c]/40" />
              <span className="text-[#c9a84c]/60 text-sm font-['Cormorant_Garamond'] italic">
                A Brotherhood Captured
              </span>
              <div className="h-px w-12 bg-[#c9a84c]/40" />
            </div>
            <p
              className={`text-white/55 text-lg font-300 leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-300 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Moments from the field — musters, rank ceremonies, outreach days,
              and the bonds forged between brothers.
            </p>
          </div>
        </section>

        {/* ── STATS STRIP ── */}
        <section className="border-y border-white/10 bg-white/[0.02] py-8 px-6 mb-10">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
            {[
              { value: `${gallery.length}+`, label: "Photos" },
              { value: "12", label: "Years documented" },
              { value: "6", label: "Event categories" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-['Cormorant_Garamond'] text-[#c9a84c] text-4xl font-700 leading-none mb-1">
                  {s.value}
                </p>
                <p className="text-white/35 text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed']">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FILTER ── */}
        <section className="px-6 pb-8">
          <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setActiveFilter(f);
                  setLightbox(null);
                }}
                className={`px-4 py-2 border font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase transition-all duration-200 ${
                  activeFilter === f
                    ? "border-[#c9a84c]/50 bg-[#c9a84c]/10 text-[#c9a84c]"
                    : "border-white/10 bg-white/[0.02] text-white/40 hover:text-white/70 hover:border-white/20"
                }`}
              >
                {f}
                <span className="ml-2 text-[0.65rem] opacity-50">
                  {f === "All"
                    ? gallery.length
                    : gallery.filter((g) => g.category === f).length}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ── MASONRY GRID ── */}
        <section ref={gridRef} className="px-6 pb-28">
          <div className="max-w-6xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/30 font-['Cormorant_Garamond'] text-2xl italic">
                  No photos in this category yet.
                </p>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {filtered.map((item, i) => {
                  const [bg1, bg2] = palette(item.id);
                  const accent = categoryAccents[item.category];
                  return (
                    <button
                      key={item.id}
                      onClick={() => setLightbox(i)}
                      className={`group w-full break-inside-avoid block text-left border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-500 ${
                        gridInView
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                      style={{ transitionDelay: `${i * 60}ms` }}
                    >
                      {/* Image / placeholder */}
                      <div
                        className={`relative overflow-hidden ${item.wide ? "aspect-[16/9]" : "aspect-[4/3]"}`}
                        style={{
                          background: `linear-gradient(135deg, ${bg1}, ${bg2})`,
                        }}
                      >
                        {item.src ? (
                          <Image
                            src={item.src}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          // Placeholder — decorative cross pattern
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                              width="48"
                              height="48"
                              viewBox="0 0 48 48"
                              fill="none"
                              opacity="0.15"
                            >
                              <rect
                                x="21"
                                y="4"
                                width="6"
                                height="40"
                                fill={accent}
                              />
                              <rect
                                x="4"
                                y="18"
                                width="40"
                                height="6"
                                fill={accent}
                              />
                            </svg>
                            <div
                              className="absolute inset-0 opacity-[0.06]"
                              style={{
                                backgroundImage: `repeating-linear-gradient(45deg, ${accent} 0, ${accent} 1px, transparent 0, transparent 50%)`,
                                backgroundSize: "16px 16px",
                              }}
                            />
                          </div>
                        )}
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-['Barlow_Condensed'] text-xs tracking-[0.3em] uppercase border border-white/40 px-4 py-2">
                            View
                          </span>
                        </div>
                      </div>

                      {/* Caption */}
                      <div className="px-4 py-3 bg-white/[0.02] flex items-center justify-between gap-3">
                        <p className="text-white/60 text-xs font-['Barlow'] leading-snug truncate">
                          {item.title}
                        </p>
                        <span
                          className={`border px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase font-['Barlow_Condensed'] shrink-0 ${categoryPills[item.category]}`}
                        >
                          {item.category}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 px-6 border-t border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_100%_at_50%_50%,rgba(201,168,76,0.04),transparent)]" />
          <div className="relative max-w-3xl mx-auto text-center">
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-5">
              Submit Media
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-white text-4xl font-600 leading-tight mb-5">
              Have Photos to Share?
            </h2>
            <p className="text-white/50 font-300 leading-relaxed mb-8">
              Chapter photographers and event coordinators can submit photos
              through the admin panel. All media is reviewed before publication.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-8 py-4 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase font-700 transition-all duration-300 group"
              >
                Contact Us
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center border border-white/20 hover:border-[#c9a84c]/50 text-white/60 hover:text-[#c9a84c] px-8 py-4 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase transition-all duration-300"
              >
                Upcoming Events
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ── LIGHTBOX ── */}
      {currentItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-white/50 hover:text-white transition-colors font-['Barlow_Condensed'] text-sm tracking-widest uppercase flex items-center gap-2"
            >
              Close ×
            </button>

            {/* Image area */}
            <div
              className={`relative w-full overflow-hidden border border-white/10 ${currentItem.wide ? "aspect-[16/9]" : "aspect-[4/3]"}`}
              style={{
                background: `linear-gradient(135deg, ${palette(currentItem.id)[0]}, ${palette(currentItem.id)[1]})`,
              }}
            >
              {currentItem.src ? (
                <Image
                  src={currentItem.src}
                  alt={currentItem.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 48 48"
                    fill="none"
                    opacity="0.12"
                  >
                    <rect
                      x="21"
                      y="4"
                      width="6"
                      height="40"
                      fill={categoryAccents[currentItem.category]}
                    />
                    <rect
                      x="4"
                      y="18"
                      width="40"
                      height="6"
                      fill={categoryAccents[currentItem.category]}
                    />
                  </svg>
                  <p className="absolute bottom-6 left-0 right-0 text-center text-white/20 text-xs font-['Barlow_Condensed'] tracking-widest uppercase">
                    Photo placeholder — add image via admin panel
                  </p>
                </div>
              )}
            </div>

            {/* Caption + nav */}
            <div className="flex items-center justify-between mt-4 gap-4">
              <button
                onClick={() =>
                  setLightbox(
                    (i) => (i - 1 + filtered.length) % filtered.length,
                  )
                }
                className="text-white/40 hover:text-[#c9a84c] transition-colors font-['Barlow_Condensed'] text-sm tracking-wider uppercase"
              >
                ← Prev
              </button>

              <div className="text-center flex-1">
                <p className="text-white/70 text-sm font-['Barlow'] mb-1">
                  {currentItem.title}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <span
                    className={`border px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase font-['Barlow_Condensed'] ${categoryPills[currentItem.category]}`}
                  >
                    {currentItem.category}
                  </span>
                  <span className="text-white/25 text-xs font-['Barlow']">
                    {currentItem.year}
                  </span>
                  <span className="text-white/20 text-xs">
                    {lightbox + 1} / {filtered.length}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setLightbox((i) => (i + 1) % filtered.length)}
                className="text-white/40 hover:text-[#c9a84c] transition-colors font-['Barlow_Condensed'] text-sm tracking-wider uppercase"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
