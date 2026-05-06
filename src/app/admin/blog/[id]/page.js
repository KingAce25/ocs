"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const mockUser = { name: "Col. Caleb Oladimeji", role: "super_admin" };

const TAGS = [
  "Announcement",
  "Ranks",
  "Community",
  "Events",
  "Devotional",
  "Training",
];

const emptyPost = {
  title: "",
  tag: "",
  status: "Draft",
  author: mockUser.name,
  content: "",
  quoteText: "",
  quoteReference: "",
};

export default function BlogPostEditor() {
  const router = useRouter();
  const params = useParams();
  const isNew = !params?.id || params.id === "new";

  const [form, setForm] = useState(emptyPost);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key])
      setErrors((e) => {
        const n = { ...e };
        delete n[key];
        return n;
      });
    setSaved(false);
  }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.tag) e.tag = "Please select a tag.";
    if (!form.content.trim()) e.content = "Content cannot be empty.";
    return e;
  }

  async function handleSave(publish = false) {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSaving(true);
    try {
      // TODO: supabase.from('posts').upsert({ ...form, status: publish ? 'Published' : 'Draft' })
      await new Promise((r) => setTimeout(r, 800));
      if (publish) setForm((f) => ({ ...f, status: "Published" }));
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  const inputBase =
    "w-full bg-white/[0.04] border border-white/15 text-white/85 font-['Barlow'] text-sm placeholder-white/20 px-4 py-3 outline-none focus:border-[#c9a84c]/50 transition-colors";
  const errBorder = "border-red-500/50";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div>
          <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-1">
            Blog Posts
          </p>
          <h1 className="font-['Cormorant_Garamond'] text-white text-4xl font-600">
            {isNew ? "New Post" : "Edit Post"}
          </h1>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {saved && (
            <span className="text-[#5DCAA5] text-xs font-['Barlow_Condensed'] tracking-wider uppercase">
              ✓ Saved
            </span>
          )}
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="border border-white/20 hover:border-white/40 text-white/55 hover:text-white/80 px-4 py-2 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase transition-all disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Draft"}
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-5 py-2 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase font-700 transition-all disabled:opacity-50"
          >
            {form.status === "Published" ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main editor */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Title */}
          <div>
            <label className="block text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-2">
              Title <span className="text-[#c9a84c]">*</span>
            </label>
            <input
              type="text"
              placeholder="Post title…"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className={`${inputBase} text-lg ${errors.title ? errBorder : ""}`}
            />
            {errors.title && (
              <p className="mt-1.5 text-red-400 text-xs font-['Barlow']">
                {errors.title}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed']">
                Content <span className="text-[#c9a84c]">*</span>
              </label>
              <span className="text-white/20 text-[10px] font-['Barlow']">
                {form.content.length} chars
              </span>
            </div>
            <textarea
              rows={18}
              placeholder={
                "Write your post content here…\n\nParagraph breaks will be preserved."
              }
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              className={`${inputBase} resize-y leading-relaxed ${errors.content ? errBorder : ""}`}
            />
            {errors.content && (
              <p className="mt-1.5 text-red-400 text-xs font-['Barlow']">
                {errors.content}
              </p>
            )}
          </div>

          {/* Scripture / Quote block */}
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <label className="block text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-4">
              Scripture Quote <span className="text-white/20">(optional)</span>
            </label>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Quote text…"
                value={form.quoteText}
                onChange={(e) => set("quoteText", e.target.value)}
                className={`${inputBase} italic`}
              />
              <input
                type="text"
                placeholder="Reference — e.g. Ephesians 6:11"
                value={form.quoteReference}
                onChange={(e) => set("quoteReference", e.target.value)}
                className={inputBase}
              />
            </div>
            {form.quoteText && (
              <div className="mt-4 border-l-4 border-[#c9a84c]/30 pl-5 py-1">
                <p className="text-white/50 text-sm italic font-['Cormorant_Garamond'] leading-snug">
                  &quot;{form.quoteText}&quot;
                </p>
                {form.quoteReference && (
                  <p className="text-[#c9a84c]/50 text-xs tracking-widest uppercase font-['Barlow_Condensed'] mt-2">
                    — {form.quoteReference}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0 flex flex-col gap-4">
          {/* Status */}
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-4">
              Status
            </p>
            <div className="flex gap-2">
              {["Draft", "Published"].map((s) => (
                <button
                  key={s}
                  onClick={() => set("status", s)}
                  className={`flex-1 py-2 border font-['Barlow_Condensed'] text-xs tracking-[0.15em] uppercase transition-all ${
                    form.status === s
                      ? s === "Published"
                        ? "border-[#1D9E75]/50 bg-[#1D9E75]/10 text-[#5DCAA5]"
                        : "border-white/30 bg-white/10 text-white/80"
                      : "border-white/10 text-white/25 hover:text-white/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Tag */}
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-4">
              Tag <span className="text-[#c9a84c]">*</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => set("tag", t)}
                  className={`px-3 py-1 border text-xs tracking-[0.15em] uppercase font-['Barlow_Condensed'] transition-all ${
                    form.tag === t
                      ? "border-[#c9a84c]/50 bg-[#c9a84c]/10 text-[#c9a84c]"
                      : "border-white/10 text-white/30 hover:text-white/60"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            {errors.tag && (
              <p className="mt-2 text-red-400 text-xs font-['Barlow']">
                {errors.tag}
              </p>
            )}
          </div>

          {/* Author */}
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <label className="block text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-3">
              Author
            </label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => set("author", e.target.value)}
              className="w-full bg-white/[0.04] border border-white/15 text-white/70 font-['Barlow'] text-sm px-3 py-2 outline-none focus:border-[#c9a84c]/40 transition-colors"
            />
          </div>

          {/* Preview */}
          {form.title && (
            <div className="border border-white/10 bg-white/[0.02] p-5">
              <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-3">
                Preview
              </p>
              <div className="flex items-center gap-2 mb-2">
                {form.tag && (
                  <span className="border border-[#c9a84c]/30 text-[#c9a84c] px-2 py-0.5 text-[10px] tracking-widest uppercase font-['Barlow_Condensed']">
                    {form.tag}
                  </span>
                )}
                <span
                  className={`text-[10px] font-['Barlow_Condensed'] tracking-wider px-2 py-0.5 border ${
                    form.status === "Published"
                      ? "border-[#1D9E75]/30 text-[#5DCAA5]"
                      : "border-white/15 text-white/30"
                  }`}
                >
                  {form.status}
                </span>
              </div>
              <p className="text-white/70 text-sm font-['Cormorant_Garamond'] font-600 leading-snug">
                {form.title}
              </p>
              {form.content && (
                <p className="text-white/30 text-xs font-['Barlow'] mt-2 line-clamp-3 leading-relaxed">
                  {form.content}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="border border-white/10 bg-white/[0.02] p-5 flex flex-col gap-2">
            <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-1">
              Actions
            </p>
            <Link
              href="/admin/blog"
              className="text-white/35 hover:text-white/60 text-sm font-['Barlow'] transition-colors"
            >
              ← Back to all posts
            </Link>
            {!isNew && (
              <button className="text-left text-red-400/60 hover:text-red-400 text-sm font-['Barlow'] transition-colors">
                Delete post
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
