"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const EVENT_TYPES = [
  "Muster",
  "Training",
  "Outreach",
  "Ceremony",
  "Fellowship",
];
const CHAPTERS = [
  "National",
  "Atlanta",
  "Houston",
  "New York",
  "Chicago",
  "Lagos",
];

const emptyEvent = {
  title: "",
  type: "",
  startDate: "",
  endDate: "",
  location: "",
  chapter: "",
  spotsTotal: "",
  description: "",
  scheduleDay: "",
  scheduleItems: "",
};

export default function EventEditor() {
  const router = useRouter();
  const params = useParams();
  const isNew = !params?.id || params.id === "new";

  const [form, setForm] = useState(emptyEvent);
  const [schedule, setSchedule] = useState([]);
  const [scheduleForm, setScheduleForm] = useState({ day: "", items: "" });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);

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
    if (!form.type) e.type = "Please select an event type.";
    if (!form.startDate) e.startDate = "Start date is required.";
    if (!form.location.trim()) e.location = "Location is required.";
    if (!form.chapter) e.chapter = "Please select a chapter.";
    if (!form.description.trim()) e.description = "Description is required.";
    return e;
  }

  function addScheduleDay() {
    if (!scheduleForm.day.trim() || !scheduleForm.items.trim()) return;
    setSchedule((prev) => [
      ...prev,
      {
        id: Date.now(),
        day: scheduleForm.day,
        items: scheduleForm.items.split("\n").filter(Boolean),
      },
    ]);
    setScheduleForm({ day: "", items: "" });
    setShowScheduleForm(false);
  }

  function removeScheduleDay(id) {
    setSchedule((prev) => prev.filter((d) => d.id !== id));
  }

  async function handleSave() {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSaving(true);
    try {
      // TODO: supabase.from('events').upsert({ ...form, schedule })
      await new Promise((r) => setTimeout(r, 800));
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  const inputBase =
    "w-full bg-white/[0.04] border border-white/15 text-white/85 font-['Barlow'] text-sm placeholder-white/20 px-4 py-3 outline-none focus:border-[#c9a84c]/50 transition-colors";
  const errBorder = "border-red-500/50";

  const typeColors = {
    Muster: "border-[#c9a84c]/50 bg-[#c9a84c]/10 text-[#c9a84c]",
    Training: "border-[#1D9E75]/50 bg-[#1D9E75]/10 text-[#5DCAA5]",
    Outreach: "border-[#534AB7]/50 bg-[#534AB7]/10 text-[#AFA9EC]",
    Ceremony: "border-[#D85A30]/50 bg-[#D85A30]/10 text-[#F0997B]",
    Fellowship: "border-[#888780]/50 bg-[#888780]/10 text-[#D3D1C7]",
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div>
          <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-1">
            Events
          </p>
          <h1 className="font-['Cormorant_Garamond'] text-white text-4xl font-600">
            {isNew ? "New Event" : "Edit Event"}
          </h1>
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
            className="bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-6 py-2 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase font-700 transition-all disabled:opacity-50"
          >
            {saving ? "Saving…" : isNew ? "Create Event" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main form */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Title */}
          <div>
            <label className="block text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-2">
              Event Title <span className="text-[#c9a84c]">*</span>
            </label>
            <input
              type="text"
              placeholder="Event title…"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className={`${inputBase} text-base ${errors.title ? errBorder : ""}`}
            />
            {errors.title && (
              <p className="mt-1.5 text-red-400 text-xs font-['Barlow']">
                {errors.title}
              </p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-2">
                Start Date <span className="text-[#c9a84c]">*</span>
              </label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => set("startDate", e.target.value)}
                className={`${inputBase} ${errors.startDate ? errBorder : ""}`}
              />
              {errors.startDate && (
                <p className="mt-1.5 text-red-400 text-xs font-['Barlow']">
                  {errors.startDate}
                </p>
              )}
            </div>
            <div>
              <label className="block text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-2">
                End Date{" "}
                <span className="text-white/20">
                  (leave blank for single-day)
                </span>
              </label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => set("endDate", e.target.value)}
                className={inputBase}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-2">
              Location <span className="text-[#c9a84c]">*</span>
            </label>
            <input
              type="text"
              placeholder="Venue name, city…"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              className={`${inputBase} ${errors.location ? errBorder : ""}`}
            />
            {errors.location && (
              <p className="mt-1.5 text-red-400 text-xs font-['Barlow']">
                {errors.location}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed']">
                Description <span className="text-[#c9a84c]">*</span>
              </label>
              <span className="text-white/20 text-[10px] font-['Barlow']">
                {form.description.length} chars
              </span>
            </div>
            <textarea
              rows={6}
              placeholder="Describe this event…"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={`${inputBase} resize-y leading-relaxed ${errors.description ? errBorder : ""}`}
            />
            {errors.description && (
              <p className="mt-1.5 text-red-400 text-xs font-['Barlow']">
                {errors.description}
              </p>
            )}
          </div>

          {/* Spots */}
          <div>
            <label className="block text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-2">
              Total Spots{" "}
              <span className="text-white/20">
                (leave blank for open attendance)
              </span>
            </label>
            <input
              type="number"
              placeholder="e.g. 350"
              value={form.spotsTotal}
              onChange={(e) => set("spotsTotal", e.target.value)}
              className={inputBase}
            />
          </div>

          {/* Programme Schedule */}
          <div className="border border-white/10 bg-white/[0.02]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <p className="text-white/50 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed']">
                Programme Schedule{" "}
                <span className="text-white/20">(optional)</span>
              </p>
              <button
                onClick={() => setShowScheduleForm(true)}
                className="text-[#c9a84c]/60 hover:text-[#c9a84c] text-xs font-['Barlow_Condensed'] tracking-wider uppercase transition-colors"
              >
                + Add Day
              </button>
            </div>

            {schedule.length === 0 && !showScheduleForm && (
              <div className="px-5 py-8 text-center">
                <p className="text-white/20 text-sm font-['Barlow'] italic">
                  No schedule added yet.
                </p>
              </div>
            )}

            {schedule.length > 0 && (
              <div className="divide-y divide-white/[0.06]">
                {schedule.map((day) => (
                  <div key={day.id} className="px-5 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[#c9a84c] text-sm font-['Cormorant_Garamond'] font-600">
                        {day.day}
                      </p>
                      <button
                        onClick={() => removeScheduleDay(day.id)}
                        className="text-white/20 hover:text-red-400 text-xs transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                    <ul className="flex flex-col gap-1">
                      {day.items.map((item, i) => (
                        <li
                          key={i}
                          className="text-white/45 text-xs font-['Barlow'] flex items-start gap-2"
                        >
                          <span className="text-[#c9a84c]/30 mt-0.5">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {showScheduleForm && (
              <div className="px-5 py-4 border-t border-white/10 bg-white/[0.02]">
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Day label — e.g. Friday 18 July"
                    value={scheduleForm.day}
                    onChange={(e) =>
                      setScheduleForm((f) => ({ ...f, day: e.target.value }))
                    }
                    className={inputBase}
                  />
                  <textarea
                    rows={4}
                    placeholder={
                      "One item per line:\n09:00 — Morning PT\n10:00 — Scripture study"
                    }
                    value={scheduleForm.items}
                    onChange={(e) =>
                      setScheduleForm((f) => ({ ...f, items: e.target.value }))
                    }
                    className={`${inputBase} resize-none`}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={addScheduleDay}
                      className="bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-4 py-2 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase font-700 transition-all"
                    >
                      Add Day
                    </button>
                    <button
                      onClick={() => {
                        setShowScheduleForm(false);
                        setScheduleForm({ day: "", items: "" });
                      }}
                      className="border border-white/15 text-white/40 hover:text-white/70 px-4 py-2 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0 flex flex-col gap-4">
          {/* Event Type */}
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-4">
              Event Type <span className="text-[#c9a84c]">*</span>
            </p>
            <div className="flex flex-col gap-2">
              {EVENT_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => set("type", t)}
                  className={`px-3 py-2 border text-xs tracking-[0.15em] uppercase font-['Barlow_Condensed'] text-left transition-all ${
                    form.type === t
                      ? typeColors[t]
                      : "border-white/10 text-white/30 hover:text-white/60 hover:border-white/20"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            {errors.type && (
              <p className="mt-2 text-red-400 text-xs font-['Barlow']">
                {errors.type}
              </p>
            )}
          </div>

          {/* Chapter */}
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-4">
              Chapter <span className="text-[#c9a84c]">*</span>
            </p>
            <div className="flex flex-col gap-2">
              {CHAPTERS.map((ch) => (
                <button
                  key={ch}
                  onClick={() => set("chapter", ch)}
                  className={`px-3 py-2 border text-xs tracking-[0.15em] uppercase font-['Barlow_Condensed'] text-left transition-all ${
                    form.chapter === ch
                      ? "border-[#c9a84c]/50 bg-[#c9a84c]/10 text-[#c9a84c]"
                      : "border-white/10 text-white/30 hover:text-white/60 hover:border-white/20"
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
            {errors.chapter && (
              <p className="mt-2 text-red-400 text-xs font-['Barlow']">
                {errors.chapter}
              </p>
            )}
          </div>

          {/* Summary */}
          {(form.title || form.startDate) && (
            <div className="border border-white/10 bg-white/[0.02] p-5">
              <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-4">
                Summary
              </p>
              <div className="flex flex-col gap-3">
                {form.type && (
                  <div>
                    <p className="text-white/20 text-[10px] font-['Barlow_Condensed'] tracking-wider uppercase mb-1">
                      Type
                    </p>
                    <span
                      className={`border px-2 py-0.5 text-[10px] tracking-widest uppercase font-['Barlow_Condensed'] ${typeColors[form.type] ?? ""}`}
                    >
                      {form.type}
                    </span>
                  </div>
                )}
                {form.startDate && (
                  <div>
                    <p className="text-white/20 text-[10px] font-['Barlow_Condensed'] tracking-wider uppercase mb-1">
                      Date
                    </p>
                    <p className="text-white/60 text-xs font-['Barlow']">
                      {form.startDate}
                      {form.endDate && form.endDate !== form.startDate
                        ? ` → ${form.endDate}`
                        : ""}
                    </p>
                  </div>
                )}
                {form.location && (
                  <div>
                    <p className="text-white/20 text-[10px] font-['Barlow_Condensed'] tracking-wider uppercase mb-1">
                      Location
                    </p>
                    <p className="text-white/60 text-xs font-['Barlow']">
                      {form.location}
                    </p>
                  </div>
                )}
                {form.spotsTotal && (
                  <div>
                    <p className="text-white/20 text-[10px] font-['Barlow_Condensed'] tracking-wider uppercase mb-1">
                      Capacity
                    </p>
                    <p className="text-white/60 text-xs font-['Barlow']">
                      {form.spotsTotal} spots
                    </p>
                  </div>
                )}
                {schedule.length > 0 && (
                  <div>
                    <p className="text-white/20 text-[10px] font-['Barlow_Condensed'] tracking-wider uppercase mb-1">
                      Schedule
                    </p>
                    <p className="text-white/60 text-xs font-['Barlow']">
                      {schedule.length} day{schedule.length > 1 ? "s" : ""}{" "}
                      added
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="border border-white/10 bg-white/[0.02] p-5 flex flex-col gap-2">
            <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-1">
              Actions
            </p>
            <Link
              href="/admin/events"
              className="text-white/35 hover:text-white/60 text-sm font-['Barlow'] transition-colors"
            >
              ← Back to all events
            </Link>
            {!isNew && (
              <button className="text-left text-red-400/60 hover:text-red-400 text-sm font-['Barlow'] transition-colors">
                Delete event
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
