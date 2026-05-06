"use client";

import Head from "next/head";
import { useState } from "react";

const mockUser = { name: "Col. Caleb Oladimeji", role: "super_admin" };

const editablePages = [
  {
    id: "mission",
    label: "Mission Statement",
    section: "About Us",
    content:
      "The mission of Onward Christian Soldiers is to equip men of faith with the discipline, community, and spiritual grounding required to live with purpose and stand against compromise.",
  },
  {
    id: "vision",
    label: "Vision Statement",
    section: "About Us",
    content:
      "Our vision is a world where men of God are not a rarity but a movement — where disciplined faith reshapes families, communities, and culture from the inside out.",
  },
  {
    id: "history",
    label: "History",
    section: "About Us",
    content:
      "A small group of seven men gathered in a church hall in 2013, united by a shared conviction: that faith and discipline were inseparable. From that meeting, OCS was born.",
  },
  {
    id: "rules-preamble",
    label: "Rules Preamble",
    section: "Rules & Regulations",
    content:
      "We, the members of Onward Christian Soldiers, covenant together to uphold the following rules and regulations — not out of obligation alone, but out of a shared commitment to the mission God has placed before us.",
  },
  {
    id: "home-subtitle",
    label: "Home Page Subtitle",
    section: "Home",
    content:
      "A faith-based brotherhood forged in discipline and Scripture — equipping men to stand firm against every scheme of the enemy.",
  },
  {
    id: "contact-intro",
    label: "Contact Page Intro",
    section: "Contact",
    content:
      "Whether you are considering enlistment, have a question about an event, or want to connect with your nearest chapter — we want to hear from you.",
  },
];

export default function AdminPages() {
  const [pages, setPages] = useState(editablePages);
  const [activeId, setActiveId] = useState(editablePages[0].id);
  const [draft, setDraft] = useState(editablePages[0].content);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const activePage = pages.find((p) => p.id === activeId);

  function selectPage(id) {
    setActiveId(id);
    setDraft(pages.find((p) => p.id === id)?.content ?? "");
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    // TODO: supabase.from('page_content').upsert({ id: activeId, content: draft })
    await new Promise((r) => setTimeout(r, 700));
    setPages((prev) =>
      prev.map((p) => (p.id === activeId ? { ...p, content: draft } : p)),
    );
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <Head>
        <title>Manage Pages — OCS Admin</title>
      </Head>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-1">
            Organisation
          </p>
          <h1 className="font-['Cormorant_Garamond'] text-white text-4xl font-600">
            Manage Pages
          </h1>
          <p className="text-white/35 text-sm font-['Barlow'] mt-1">
            Edit site copy without touching code.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Page list */}
          <aside className="lg:w-56 shrink-0">
            <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
              {editablePages.map((p) => (
                <button
                  key={p.id}
                  onClick={() => selectPage(p.id)}
                  className={`text-left px-4 py-3 border shrink-0 transition-all duration-150 ${
                    activeId === p.id
                      ? "border-[#c9a84c]/40 bg-[#c9a84c]/10 text-[#c9a84c]"
                      : "border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
                  }`}
                >
                  <p className="font-['Barlow_Condensed'] text-xs tracking-wide whitespace-nowrap">
                    {p.label}
                  </p>
                  <p className="text-[0.65rem] opacity-50 font-['Barlow'] whitespace-nowrap mt-0.5">
                    {p.section}
                  </p>
                </button>
              ))}
            </nav>
          </aside>

          {/* Editor */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/25 text-xs font-['Barlow']">
                  {activePage?.section}
                </p>
                <h2 className="font-['Cormorant_Garamond'] text-white text-2xl font-600">
                  {activePage?.label}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                {saved && (
                  <span className="text-[#5DCAA5] text-xs font-['Barlow_Condensed'] tracking-wider uppercase">
                    ✓ Saved
                  </span>
                )}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-[#c9a84c] hover:bg-[#b8972e] disabled:opacity-60 text-[#0a0f1e] px-5 py-2 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase font-700 transition-all"
                >
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </div>

            <textarea
              rows={12}
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                setSaved(false);
              }}
              className="w-full bg-white/[0.04] border border-white/15 text-white/80 font-['Barlow'] text-sm leading-relaxed placeholder-white/20 px-5 py-4 outline-none focus:border-[#c9a84c]/50 transition-colors resize-y"
            />

            <div className="border border-white/10 bg-white/[0.02] px-5 py-4">
              <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-2">
                Live Preview
              </p>
              <p className="text-white/60 text-sm font-['Barlow'] font-300 leading-relaxed italic">
                {draft || "No content yet."}
              </p>
            </div>

            <p className="text-white/20 text-xs font-['Barlow'] text-right">
              {draft.length} characters
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
