"use client";

import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const mockUser = { name: "Col. Caleb Oladimeji", role: "super_admin" };

const mockEvents = [
  {
    id: 1,
    title: "Annual National Muster",
    type: "Muster",
    date: "Jul 18–20, 2025",
    location: "Blue Ridge, GA",
    chapter: "National",
    spots: 40,
  },
  {
    id: 2,
    title: "Q2 Leadership Training",
    type: "Training",
    date: "May 3–4, 2025",
    location: "Atlanta, GA",
    chapter: "National",
    spots: 12,
  },
  {
    id: 3,
    title: "Easter Community Outreach",
    type: "Outreach",
    date: "Apr 19, 2025",
    location: "Various",
    chapter: "All Chapters",
    spots: null,
  },
  {
    id: 4,
    title: "Spring Rank Promotion Ceremony",
    type: "Ceremony",
    date: "Apr 5, 2025",
    location: "Atlanta, GA",
    chapter: "National",
    spots: null,
  },
  {
    id: 5,
    title: "Brotherhood Night — March",
    type: "Fellowship",
    date: "Mar 28, 2025",
    location: "Atlanta, GA",
    chapter: "Atlanta",
    spots: null,
  },
  {
    id: 6,
    title: "Recruit Orientation — Q2 Cohort",
    type: "Training",
    date: "Apr 12, 2025",
    location: "Atlanta, GA",
    chapter: "National",
    spots: 8,
  },
];

const typeColors = {
  Muster: "border-[#c9a84c]/40 text-[#c9a84c]",
  Training: "border-[#1D9E75]/40 text-[#5DCAA5]",
  Outreach: "border-[#534AB7]/40 text-[#AFA9EC]",
  Ceremony: "border-[#D85A30]/40 text-[#F0997B]",
  Fellowship: "border-[#888780]/40 text-[#D3D1C7]",
};

export default function AdminEvents() {
  const [events, setEvents] = useState(mockEvents);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = events.filter(
    (e) => !search || e.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Head>
        <title>Manage Events — OCS Admin</title>
      </Head>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-1">
              Content
            </p>
            <h1 className="font-['Cormorant_Garamond'] text-white text-4xl font-600">
              Events
            </h1>
          </div>
          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-5 py-2.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase font-700 transition-all"
          >
            + New Event
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search events…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-5 bg-white/[0.04] border border-white/15 text-white/80 font-['Barlow'] text-sm placeholder-white/20 px-4 py-2.5 outline-none focus:border-[#c9a84c]/40 transition-colors"
        />

        <div className="border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {[
                    "Title",
                    "Type",
                    "Date",
                    "Location",
                    "Chapter",
                    "Spots",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] tracking-[0.2em] uppercase font-['Barlow_Condensed'] text-white/25 px-5 py-3 first:pl-6"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filtered.map((ev) => (
                  <tr
                    key={ev.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-4 max-w-[200px]">
                      <p className="text-white/80 text-sm font-['Barlow'] font-500 truncate">
                        {ev.title}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`border px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase font-['Barlow_Condensed'] ${typeColors[ev.type]}`}
                      >
                        {ev.type}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-white/40 text-xs font-['Barlow'] whitespace-nowrap">
                        {ev.date}
                      </p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <p className="text-white/35 text-xs font-['Barlow'] truncate max-w-[140px]">
                        {ev.location}
                      </p>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <p className="text-white/35 text-xs font-['Barlow']">
                        {ev.chapter}
                      </p>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      {ev.spots !== null ? (
                        <p className="text-[#c9a84c] text-xs font-['Barlow_Condensed']">
                          {ev.spots} left
                        </p>
                      ) : (
                        <p className="text-white/20 text-xs font-['Barlow']">
                          Open
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/events/${ev.id}`}
                          className="text-white/40 hover:text-[#c9a84c] text-xs font-['Barlow_Condensed'] tracking-wider uppercase transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(ev.id)}
                          className="text-white/25 hover:text-red-400 text-xs font-['Barlow_Condensed'] tracking-wider uppercase transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-white/10">
            <p className="text-white/20 text-xs font-['Barlow']">
              {filtered.length} event{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {deleteConfirm && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="bg-[#0a0f1e] border border-white/15 p-8 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-['Cormorant_Garamond'] text-white text-2xl font-600 mb-3">
              Delete Event?
            </h3>
            <p className="text-white/50 text-sm font-['Barlow'] mb-6">
              This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEvents((p) => p.filter((e) => e.id !== deleteConfirm));
                  setDeleteConfirm(null);
                }}
                className="flex-1 bg-red-500/80 hover:bg-red-500 text-white py-2.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-white/15 text-white/50 hover:text-white/80 py-2.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
