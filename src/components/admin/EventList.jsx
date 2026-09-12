"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { deleteEvent } from "@/app/admin/(dashboard)/events/actions";

const typeColors = {
  Muster: "border-[#c9a84c]/40 text-[#c9a84c]",
  Training: "border-[#1D9E75]/40 text-[#5DCAA5]",
  Outreach: "border-[#534AB7]/40 text-[#AFA9EC]",
  Ceremony: "border-[#D85A30]/40 text-[#F0997B]",
  Fellowship: "border-[#888780]/40 text-[#D3D1C7]",
};

export default function EventList({ initialEvents, canEdit }) {
  const [events, setEvents] = useState(initialEvents);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = events.filter(
    (e) => !search || e.title.toLowerCase().includes(search.toLowerCase()),
  );

  function handleDelete(id) {
    startTransition(async () => {
      const result = await deleteEvent(id);
      if (result?.error) {
        setError(result.error);
        setDeleteConfirm(null);
        return;
      }
      setEvents((prev) => prev.filter((e) => e.id !== id));
      setDeleteConfirm(null);
    });
  }

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-1">
              Content
            </p>
            <h1 className="font-['Cormorant_Garamond'] text-white text-4xl font-600">
              Events
            </h1>
            {!canEdit && (
              <p className="text-white/20 text-xs font-['Barlow'] mt-1">
                View only
              </p>
            )}
          </div>
          {canEdit && (
            <Link
              href="/admin/events/new"
              className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-5 py-2.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase font-700 transition-all"
            >
              + New Event
            </Link>
          )}
        </div>

        {error && (
          <div className="border border-red-500/30 bg-red-500/[0.05] text-red-400 text-sm font-['Barlow'] px-4 py-3 mb-6">
            {error}
          </div>
        )}

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
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-white/25 font-['Cormorant_Garamond'] italic text-lg"
                    >
                      No events found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((ev) => (
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
                          className={`border px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase font-['Barlow_Condensed'] ${typeColors[ev.type] ?? "border-white/20 text-white/40"}`}
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
                            {ev.spots} total
                          </p>
                        ) : (
                          <p className="text-white/20 text-xs font-['Barlow']">
                            Open
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {canEdit && (
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
                        )}
                      </td>
                    </tr>
                  ))
                )}
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
          onClick={() => !isPending && setDeleteConfirm(null)}
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
                onClick={() => handleDelete(deleteConfirm)}
                disabled={isPending}
                className="flex-1 bg-red-500/80 hover:bg-red-500 disabled:opacity-50 text-white py-2.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase transition-colors"
              >
                {isPending ? "Deleting…" : "Delete"}
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={isPending}
                className="flex-1 border border-white/15 text-white/50 hover:text-white/80 py-2.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase transition-colors disabled:opacity-50"
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
