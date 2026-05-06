"use client";

import Head from "next/head";
import { useState } from "react";

const mockUser = { name: "Col. Caleb Oladimeji", role: "super_admin" };

export default function AdminSettings() {
  const [general, setGeneral] = useState({
    siteName: "Onward Christian Soldiers",
    tagline: "Faith · Discipline · Brotherhood",
    contactEmail: "hq@ocs.org",
    contactPhone: "+1 (404) 000-0000",
    foundedYear: "2013",
  });
  const [notifications, setNotifications] = useState({
    contactFormEmail: true,
    newMemberAlert: true,
    weeklyDigest: false,
  });
  const [password, setPassword] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [saved, setSaved] = useState({});
  const [saving, setSaving] = useState({});
  const [pwError, setPwError] = useState("");

  async function saveSection(key) {
    setSaving((s) => ({ ...s, [key]: true }));
    await new Promise((r) => setTimeout(r, 700));
    setSaving((s) => ({ ...s, [key]: false }));
    setSaved((s) => ({ ...s, [key]: true }));
    setTimeout(() => setSaved((s) => ({ ...s, [key]: false })), 2000);
  }

  async function savePassword() {
    if (!password.current) {
      setPwError("Current password required.");
      return;
    }
    if (password.next.length < 8) {
      setPwError("New password must be at least 8 characters.");
      return;
    }
    if (password.next !== password.confirm) {
      setPwError("Passwords do not match.");
      return;
    }
    setPwError("");
    await saveSection("password");
    setPassword({ current: "", next: "", confirm: "" });
  }

  const inputCls =
    "w-full bg-white/[0.04] border border-white/15 text-white/80 font-['Barlow'] text-sm px-4 py-2.5 outline-none focus:border-[#c9a84c]/50 transition-colors";

  function Section({ id, title, children, onSave }) {
    return (
      <div className="border border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="font-['Cormorant_Garamond'] text-white text-xl font-600">
            {title}
          </h2>
          {onSave && (
            <div className="flex items-center gap-3">
              {saved[id] && (
                <span className="text-[#5DCAA5] text-xs font-['Barlow_Condensed'] tracking-wider uppercase">
                  ✓ Saved
                </span>
              )}
              <button
                onClick={onSave}
                disabled={saving[id]}
                className="bg-[#c9a84c] hover:bg-[#b8972e] disabled:opacity-50 text-[#0a0f1e] px-4 py-1.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase font-700 transition-all"
              >
                {saving[id] ? "Saving…" : "Save"}
              </button>
            </div>
          )}
        </div>
        <div className="p-6">{children}</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Settings — OCS Admin</title>
      </Head>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-1">
            Administration
          </p>
          <h1 className="font-['Cormorant_Garamond'] text-white text-4xl font-600">
            Settings
          </h1>
          <p className="text-white/35 text-sm font-['Barlow'] mt-1">
            Site-wide configuration — Super Admin only.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* General */}
          <Section
            id="general"
            title="General"
            onSave={() => saveSection("general")}
          >
            <div className="flex flex-col gap-4">
              {[
                { label: "Site Name", key: "siteName" },
                { label: "Tagline", key: "tagline" },
                {
                  label: "Contact Email",
                  key: "contactEmail",
                  type: "email",
                },
                { label: "Contact Phone", key: "contactPhone" },
                { label: "Founded Year", key: "foundedYear" },
              ].map(({ label, key, type = "text" }) => (
                <div key={key} className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-white/40 text-xs tracking-[0.15em] uppercase font-['Barlow_Condensed'] col-span-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={general[key]}
                    onChange={(e) =>
                      setGeneral((g) => ({ ...g, [key]: e.target.value }))
                    }
                    className={`${inputCls} col-span-2`}
                  />
                </div>
              ))}
            </div>
          </Section>

          {/* Notifications */}
          <Section
            id="notifications"
            title="Notifications"
            onSave={() => saveSection("notifications")}
          >
            <div className="flex flex-col gap-4">
              {[
                {
                  label: "Contact form submission alerts",
                  key: "contactFormEmail",
                  desc: "Email HQ when a contact form is submitted",
                },
                {
                  label: "New member enquiry alerts",
                  key: "newMemberAlert",
                  desc: "Email HQ when an enlistment enquiry is received",
                },
                {
                  label: "Weekly activity digest",
                  key: "weeklyDigest",
                  desc: "Send a weekly summary of site activity to the Commander",
                },
              ].map(({ label, key, desc }) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-4 py-2 border-b border-white/[0.06] last:border-0"
                >
                  <div>
                    <p className="text-white/70 text-sm font-['Barlow']">
                      {label}
                    </p>
                    <p className="text-white/25 text-xs font-['Barlow'] mt-0.5">
                      {desc}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setNotifications((n) => ({ ...n, [key]: !n[key] }))
                    }
                    className={`w-10 h-5.5 rounded-full border relative shrink-0 transition-all duration-200 ${
                      notifications[key]
                        ? "bg-[#c9a84c] border-[#c9a84c]"
                        : "bg-transparent border-white/25"
                    }`}
                    style={{ height: "22px", width: "40px" }}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${notifications[key] ? "left-5" : "left-0.5"}`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Section>

          {/* Change Password */}
          <Section id="password" title="Change Password">
            <div className="flex flex-col gap-4">
              {[
                { label: "Current Password", key: "current" },
                { label: "New Password", key: "next" },
                { label: "Confirm New Password", key: "confirm" },
              ].map(({ label, key }) => (
                <div key={key} className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-white/40 text-xs tracking-[0.15em] uppercase font-['Barlow_Condensed']">
                    {label}
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password[key]}
                    onChange={(e) => {
                      setPassword((p) => ({ ...p, [key]: e.target.value }));
                      setPwError("");
                    }}
                    className={`${inputCls} col-span-2`}
                    autoComplete="new-password"
                  />
                </div>
              ))}
              {pwError && (
                <p className="text-red-400 text-xs font-['Barlow'] col-span-3">
                  {pwError}
                </p>
              )}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={savePassword}
                  className="bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-5 py-2 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase font-700 transition-all"
                >
                  Update Password
                </button>
                {saved.password && (
                  <span className="text-[#5DCAA5] text-xs font-['Barlow_Condensed'] tracking-wider uppercase">
                    ✓ Updated
                  </span>
                )}
              </div>
            </div>
          </Section>

          {/* Danger zone */}
          <Section id="danger" title="Danger Zone">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4 py-3 border border-red-500/20 bg-red-500/[0.04] px-5">
                <div>
                  <p className="text-red-400/80 text-sm font-['Barlow'] font-500">
                    Clear all draft content
                  </p>
                  <p className="text-red-400/40 text-xs font-['Barlow'] mt-0.5">
                    Permanently delete all unpublished drafts
                  </p>
                </div>
                <button className="border border-red-500/40 text-red-400/70 hover:text-red-400 hover:border-red-500/70 px-4 py-1.5 font-['Barlow_Condensed'] text-xs tracking-[0.15em] uppercase transition-all shrink-0">
                  Clear Drafts
                </button>
              </div>
              <div className="flex items-center justify-between gap-4 py-3 border border-red-500/20 bg-red-500/[0.04] px-5">
                <div>
                  <p className="text-red-400/80 text-sm font-['Barlow'] font-500">
                    Export all data
                  </p>
                  <p className="text-red-400/40 text-xs font-['Barlow'] mt-0.5">
                    Download a full JSON backup of all site content
                  </p>
                </div>
                <button className="border border-red-500/40 text-red-400/70 hover:text-red-400 hover:border-red-500/70 px-4 py-1.5 font-['Barlow_Condensed'] text-xs tracking-[0.15em] uppercase transition-all shrink-0">
                  Export
                </button>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}
