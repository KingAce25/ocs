"use client";

import { useState } from "react";
import { createClient } from "@@/lib/supabase/client";

export default function PagesEditor({ initialPages, canEdit }) {
  const supabase = createClient();

  const [pages, setPages] = useState(initialPages);
  const [activeId, setActiveId] = useState(initialPages[0]?.id ?? null);
  const [draft, setDraft] = useState(initialPages[0]?.content ?? "");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const activePage = pages.find((p) => p.id === activeId);

  function selectPage(id) {
    setActiveId(id);
    setDraft(pages.find((p) => p.id === id)?.content ?? "");
    setSaved(false);
    setError("");
  }

  async function handleSave() {
    if (!canEdit) return;
    setSaving(true);
    setError("");

    const { error: updateError } = await supabase
      .from("page_content")
      .update({ content: draft, updated_at: new Date().toISOString() })
      .eq("id", activeId);

    setSaving(false);

    if (updateError) {
      console.error("Failed to save page content:", updateError);
      setError("Failed to save. Please try again.");
      return;
    }

    setPages((prev) =>
      prev.map((p) => (p.id === activeId ? { ...p, content: draft } : p)),
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (pages.length === 0) {
    return (
      <div className="max-w-5xl mx-auto">
        <p className="text-white/30 text-sm font-['Barlow']">
          No page content found. Seed the `page_content` table to get started.
        </p>
      </div>
    );
  }

  return (
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
          {!canEdit && <span className="text-white/20"> · view only</span>}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Page list */}
        <aside className="lg:w-56 shrink-0">
          <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
            {pages.map((p) => (
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
            {canEdit && (
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
            )}
          </div>

          <textarea
            rows={12}
            value={draft}
            readOnly={!canEdit}
            onChange={(e) => {
              if (!canEdit) return;
              setDraft(e.target.value);
              setSaved(false);
            }}
            className={`w-full bg-white/[0.04] border border-white/15 text-white/80 font-['Barlow'] text-sm leading-relaxed placeholder-white/20 px-5 py-4 outline-none transition-colors resize-y ${
              canEdit
                ? "focus:border-[#c9a84c]/50"
                : "cursor-not-allowed opacity-70"
            }`}
          />

          {error && (
            <p className="text-red-400 text-xs font-['Barlow']">{error}</p>
          )}

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
  );
}
