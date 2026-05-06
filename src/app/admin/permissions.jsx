"use client";

import Head from "next/head";
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";

const mockUser = { name: "Col. James Whitfield", role: "super_admin" };

const MODULES = ["Blog", "Events", "Gallery", "Ranks", "Pages"];

const initAdmins = [
  {
    id: 1,
    name: "Maj. Samuel Okafor",
    email: "s.okafor@ocs.org",
    rank: "Major",
    permissions: {
      Blog: true,
      Events: true,
      Gallery: false,
      Ranks: true,
      Pages: false,
    },
  },
  {
    id: 2,
    name: "Rev. Thomas Marsh",
    email: "t.marsh@ocs.org",
    rank: "Chaplain General",
    permissions: {
      Blog: true,
      Events: false,
      Gallery: false,
      Ranks: false,
      Pages: true,
    },
  },
  {
    id: 3,
    name: "WO Marcus Adeyemi",
    email: "m.adeyemi@ocs.org",
    rank: "Warrant Officer",
    permissions: {
      Blog: true,
      Events: true,
      Gallery: true,
      Ranks: false,
      Pages: false,
    },
  },
  {
    id: 4,
    name: "SSG Kenneth Osei",
    email: "k.osei@ocs.org",
    rank: "Staff Sergeant",
    permissions: {
      Blog: false,
      Events: true,
      Gallery: true,
      Ranks: false,
      Pages: false,
    },
  },
  {
    id: 5,
    name: "Cpl. David Mensah",
    email: "d.mensah@ocs.org",
    rank: "Corporal",
    permissions: {
      Blog: true,
      Events: false,
      Gallery: false,
      Ranks: false,
      Pages: false,
    },
  },
];

export default function AdminPermissions() {
  const [admins, setAdmins] = useState(initAdmins);
  const [saved, setSaved] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", rank: "" });

  function toggle(adminId, module) {
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === adminId
          ? {
              ...a,
              permissions: {
                ...a.permissions,
                [module]: !a.permissions[module],
              },
            }
          : a,
      ),
    );
    setSaved(false);
  }

  function removeAdmin(id) {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  }

  async function handleSave() {
    // TODO: supabase update permissions for each admin
    await new Promise((r) => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function addAdmin() {
    if (!newAdmin.name || !newAdmin.email) return;
    setAdmins((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newAdmin,
        permissions: {
          Blog: false,
          Events: false,
          Gallery: false,
          Ranks: false,
          Pages: false,
        },
      },
    ]);
    setNewAdmin({ name: "", email: "", rank: "" });
    setAdding(false);
  }

  const inputCls =
    "bg-white/[0.04] border border-white/15 text-white/80 font-['Barlow'] text-sm px-3 py-2 outline-none focus:border-[#c9a84c]/40 transition-colors";

  return (
    <>
      <Head>
        <title>Permissions — OCS Admin</title>
      </Head>
      <AdminLayout user={mockUser}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
            <div>
              <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-1">
                Administration
              </p>
              <h1 className="font-['Cormorant_Garamond'] text-white text-4xl font-600">
                Permissions Manager
              </h1>
              <p className="text-white/35 text-sm font-['Barlow'] mt-1">
                {admins.length} / 6 admin slots used
              </p>
            </div>
            <div className="flex items-center gap-3">
              {saved && (
                <span className="text-[#5DCAA5] text-xs font-['Barlow_Condensed'] tracking-wider uppercase">
                  ✓ Saved
                </span>
              )}
              <button
                onClick={() => setAdding(true)}
                disabled={admins.length >= 6}
                className="border border-white/20 hover:border-[#c9a84c]/40 text-white/50 hover:text-[#c9a84c] disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase transition-all"
              >
                + Add Admin
              </button>
              <button
                onClick={handleSave}
                className="bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-5 py-2 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase font-700 transition-all"
              >
                Save All
              </button>
            </div>
          </div>

          {/* Add admin form */}
          {adding && (
            <div className="border border-[#c9a84c]/20 bg-[#c9a84c]/[0.03] p-6 mb-6">
              <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-4">
                Invite New Admin
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <input
                  placeholder="Full name…"
                  value={newAdmin.name}
                  onChange={(e) =>
                    setNewAdmin((a) => ({ ...a, name: e.target.value }))
                  }
                  className={`${inputCls} w-full`}
                />
                <input
                  placeholder="Email address…"
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin((a) => ({ ...a, email: e.target.value }))
                  }
                  className={`${inputCls} w-full`}
                />
                <input
                  placeholder="Rank / Title…"
                  value={newAdmin.rank}
                  onChange={(e) =>
                    setNewAdmin((a) => ({ ...a, rank: e.target.value }))
                  }
                  className={`${inputCls} w-full`}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={addAdmin}
                  className="bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-5 py-2 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase font-700 transition-all"
                >
                  Add Admin
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

          {/* Permissions grid */}
          <div className="border border-white/10 bg-white/[0.02] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-[10px] tracking-[0.2em] uppercase font-['Barlow_Condensed'] text-white/25 px-6 py-3">
                      Admin
                    </th>
                    {MODULES.map((m) => (
                      <th
                        key={m}
                        className="text-center text-[10px] tracking-[0.2em] uppercase font-['Barlow_Condensed'] text-white/25 px-4 py-3"
                      >
                        {m}
                      </th>
                    ))}
                    <th className="w-12" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {admins.map((admin) => (
                    <tr
                      key={admin.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <p className="text-white/80 text-sm font-['Barlow'] font-500">
                          {admin.name}
                        </p>
                        <p className="text-white/30 text-xs font-['Barlow']">
                          {admin.rank} · {admin.email}
                        </p>
                      </td>
                      {MODULES.map((module) => (
                        <td key={module} className="px-4 py-4 text-center">
                          <button
                            onClick={() => toggle(admin.id, module)}
                            className={`w-9 h-5 rounded-full border transition-all duration-200 relative ${
                              admin.permissions[module]
                                ? "bg-[#c9a84c] border-[#c9a84c]"
                                : "bg-transparent border-white/20 hover:border-white/40"
                            }`}
                            title={`${admin.permissions[module] ? "Revoke" : "Grant"} ${module} access`}
                          >
                            <span
                              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${admin.permissions[module] ? "left-4" : "left-0.5"}`}
                            />
                          </button>
                        </td>
                      ))}
                      <td className="px-4 py-4">
                        <button
                          onClick={() => removeAdmin(admin.id)}
                          className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 text-xs transition-all"
                          title="Remove admin"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Slot indicator */}
          <div className="mt-4 flex items-center gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`w-8 h-2 rounded-full ${i < admins.length ? "bg-[#c9a84c]/60" : "bg-white/10"}`}
              />
            ))}
            <p className="text-white/25 text-xs font-['Barlow']">
              {admins.length} of 6 admin slots used
            </p>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
