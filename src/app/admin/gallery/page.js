"use client";

import Head from "next/head";
import { useState } from "react";

const mockUser = { name: "Col. Caleb Oladimeji", role: "super_admin" };

const cats = ["Muster", "Ceremony", "Training", "Outreach", "Fellowship"];

const mockPhotos = [
  {
    id: 1,
    title: "National Muster 2024 — Opening Assembly",
    category: "Muster",
    year: 2024,
  },
  {
    id: 2,
    title: "Rank Promotion — February 2024",
    category: "Ceremony",
    year: 2024,
  },
  {
    id: 3,
    title: "Morning PT — Q1 Leadership Cohort",
    category: "Training",
    year: 2024,
  },
  {
    id: 4,
    title: "City Shelter Volunteer Day",
    category: "Outreach",
    year: 2024,
  },
  {
    id: 5,
    title: "National Muster 2024 — Worship Session",
    category: "Muster",
    year: 2024,
  },
  {
    id: 6,
    title: "Brotherhood Night — Atlanta Chapter",
    category: "Fellowship",
    year: 2024,
  },
];

export function AdminGallery() {
  const [photos, setPhotos] = useState(mockPhotos);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
    year: new Date().getFullYear(),
  });
  const [adding, setAdding] = useState(false);

  function handleAdd() {
    if (!form.title || !form.category) return;
    setPhotos((p) => [...p, { id: Date.now(), ...form }]);
    setForm({ title: "", category: "", year: new Date().getFullYear() });
    setAdding(false);
  }

  const inputCls =
    "bg-white/[0.04] border border-white/15 text-white/80 font-['Barlow'] text-sm px-3 py-2 outline-none focus:border-[#c9a84c]/40 transition-colors w-full";

  return (
    <>
      <Head>
        <title>Manage Gallery — OCS Admin</title>
      </Head>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-1">
              Content
            </p>
            <h1 className="font-['Cormorant_Garamond'] text-white text-4xl font-600">
              Gallery
            </h1>
          </div>
          <button
            onClick={() => setAdding(true)}
            className="bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-5 py-2.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase font-700 transition-all"
          >
            + Upload Photo
          </button>
        </div>

        {/* Upload form */}
        {adding && (
          <div className="border border-[#c9a84c]/20 bg-[#c9a84c]/[0.03] p-6 mb-6">
            <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-4">
              Add New Photo
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Photo title…"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                className={inputCls}
              />
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className={`${inputCls} cursor-pointer`}
              >
                <option value="">Select category…</option>
                {cats.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <input
                type="number"
                value={form.year}
                onChange={(e) =>
                  setForm((f) => ({ ...f, year: e.target.value }))
                }
                className={inputCls}
              />
            </div>
            <div className="border-2 border-dashed border-white/15 rounded p-8 text-center mb-4">
              <p className="text-white/30 text-sm font-['Barlow']">
                Drag & drop image or click to browse
              </p>
              <p className="text-white/15 text-xs font-['Barlow'] mt-1">
                JPG, PNG up to 10MB — stored in Supabase Storage
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-5 py-2 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase font-700 transition-all"
              >
                Save
              </button>
              <button
                onClick={() => setAdding(false)}
                className="border border-white/15 text-white/40 hover:text-white/70 px-5 py-2 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((p) => (
            <div
              key={p.id}
              className="border border-white/10 bg-white/[0.02] group"
            >
              <div className="aspect-[4/3] bg-white/[0.04] flex items-center justify-center border-b border-white/10">
                <p className="text-white/15 text-xs font-['Barlow_Condensed'] tracking-wider uppercase">
                  No image
                </p>
              </div>
              <div className="p-4 flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-white/70 text-sm font-['Barlow'] truncate">
                    {p.title}
                  </p>
                  <p className="text-white/25 text-xs font-['Barlow'] mt-0.5">
                    {p.category} · {p.year}
                  </p>
                </div>
                <button
                  onClick={() => setDeleteConfirm(p.id)}
                  className="text-white/20 hover:text-red-400 text-xs transition-colors shrink-0"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
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
              Delete Photo?
            </h3>
            <p className="text-white/50 text-sm font-['Barlow'] mb-6">
              This will remove the photo permanently.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setPhotos((p) => p.filter((x) => x.id !== deleteConfirm));
                  setDeleteConfirm(null);
                }}
                className="flex-1 bg-red-500/80 hover:bg-red-500 text-white py-2.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-white/15 text-white/50 py-2.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase"
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

export default AdminGallery;
