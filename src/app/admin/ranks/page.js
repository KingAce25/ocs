"use client";
import { useState } from "react";

const mockUser = { name: "Col. James Whitfield", role: "super_admin" };

const initRanks = [
  { id: 1, rank: "Constable", abbr: "CONS", tier: "Enlisted", level: 1 },
  { id: 2, rank: "Corporal", abbr: "CPL", tier: "Enlisted", level: 2 },
  { id: 3, rank: "Sergeant", abbr: "SGT", tier: "Enlisted", level: 3 },
  {
    id: 4,
    rank: "Junior Inspector",
    abbr: "J-INSP",
    tier: "Non-Commissioned Officers",
    level: 4,
  },
  {
    id: 5,
    rank: "Full Inspector",
    abbr: "INSP",
    tier: "Non-Commissioned Officers",
    level: 5,
  },
  {
    id: 6,
    rank: "Senior Inspector",
    abbr: "S-INSP",
    tier: "Non-Commissioned Officers",
    level: 6,
  },
  {
    id: 7,
    rank: "Second Lieutenant",
    abbr: "2LT",
    tier: "Commissioned Officers",
    level: 7,
  },
  {
    id: 8,
    rank: "Lieutenant",
    abbr: "LT",
    tier: "Commissioned Officers",
    level: 8,
  },
  {
    id: 9,
    rank: "Captain",
    abbr: "CPT",
    tier: "Commissioned Officers",
    level: 9,
  },
  {
    id: 10,
    rank: "Major",
    abbr: "MAJ",
    tier: "Commissioned Officers",
    level: 10,
  },
  {
    id: 11,
    rank: "Lieutenant Colonel",
    abbr: "LT COL",
    tier: "Commissioned Officers",
    level: 11,
  },
  {
    id: 12,
    rank: "Colonel",
    abbr: "COL",
    tier: "Commissioned Officers",
    level: 12,
  },
  {
    id: 13,
    rank: "Brigadier General",
    abbr: "BGEN",
    tier: "Commissioned Officers",
    level: 13,
  },
  {
    id: 14,
    rank: "Major General",
    abbr: "MGEN",
    tier: "Commissioned Officers",
    level: 14,
  },
  {
    id: 15,
    rank: "One Star General",
    abbr: "1GEN",
    tier: "Commissioned Officers",
    level: 15,
  },
  {
    id: 16,
    rank: "Two Star General",
    abbr: "2GEN",
    tier: "Commissioned Officers",
    level: 16,
  },
  {
    id: 17,
    rank: "Three Star General",
    abbr: "3GEN",
    tier: "Commissioned Officers",
    level: 17,
  },
  {
    id: 18,
    rank: "Assistant Commander General",
    abbr: "ACG",
    tier: "Commissioned Officers",
    level: 18,
  },
  {
    id: 19,
    rank: "Deputy Commander General",
    abbr: "DCG",
    tier: "Commissioned Officers",
    level: 19,
  },
  {
    id: 20,
    rank: "Commander General",
    abbr: "CG",
    tier: "Commissioned Officers",
    level: 20,
  },
  {
    id: 21,
    rank: "Grand Commander",
    abbr: "GC",
    tier: "Commissioned Officers",
    level: 21,
  },
];

const tierColors = {
  Enlisted: "border-[#1D9E75]/40 text-[#5DCAA5]",
  "Non-Commissioned Officers": "border-[#c9a84c]/40 text-[#c9a84c]",
  "Commissioned Officers": "border-[#D85A30]/40 text-[#F0997B]",
};

const TIERS = [
  "Enlisted",
  "Non-Commissioned Officers",
  "Commissioned Officers",
];

export default function AdminRanks() {
  const [ranks, setRanks] = useState(initRanks);
  const [editing, setEditing] = useState(null);
  const [saved, setSaved] = useState(false);

  function handleEdit(r) {
    setEditing({ ...r });
    setSaved(false);
  }
  function handleSave() {
    setRanks((p) => p.map((r) => (r.id === editing.id ? editing : r)));
    setEditing(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const inputCls =
    "bg-white/[0.04] border border-white/15 text-white/80 font-['Barlow'] text-sm px-3 py-2 outline-none focus:border-[#c9a84c]/40 transition-colors w-full";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-1">
            Organisation
          </p>
          <h1 className="font-['Cormorant_Garamond'] text-white text-4xl font-600">
            Ranks &amp; Structure
          </h1>
          <p className="text-white/35 text-sm font-['Barlow'] mt-1">
            21 ranks across 5 tiers
          </p>
        </div>
        {saved && (
          <span className="text-[#5DCAA5] text-xs font-['Barlow_Condensed'] tracking-wider uppercase">
            ✓ Saved
          </span>
        )}
      </div>

      <div className="border border-white/10 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {["Level", "Abbr", "Rank", "Tier", ""].map((h) => (
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
              {ranks.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-6 py-3 w-16">
                    <span className="font-['Cormorant_Garamond'] text-white/25 text-lg font-700">
                      {r.level}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="font-['Barlow_Condensed'] text-white/50 text-xs tracking-widest">
                      {r.abbr}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-['Cormorant_Garamond'] text-white/80 text-lg font-600">
                      {r.rank}
                    </p>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`border px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase font-['Barlow_Condensed'] ${tierColors[r.tier]}`}
                    >
                      {r.tier}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEdit(r)}
                      className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-[#c9a84c] text-xs font-['Barlow_Condensed'] tracking-wider uppercase transition-all"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-white/10">
          <p className="text-white/20 text-xs font-['Barlow']">
            {ranks.length} ranks total
          </p>
        </div>
      </div>

      {/* Edit modal */}
      {editing && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setEditing(null)}
        >
          <div
            className="bg-[#0a0f1e] border border-white/15 p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-['Cormorant_Garamond'] text-white text-2xl font-600 mb-6">
              Edit Rank
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-white/30 text-[10px] tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-2">
                  Rank Name
                </label>
                <input
                  value={editing.rank}
                  onChange={(e) =>
                    setEditing((r) => ({ ...r, rank: e.target.value }))
                  }
                  className={inputCls}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/30 text-[10px] tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-2">
                    Abbreviation
                  </label>
                  <input
                    value={editing.abbr}
                    onChange={(e) =>
                      setEditing((r) => ({ ...r, abbr: e.target.value }))
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-white/30 text-[10px] tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-2">
                    Level
                  </label>
                  <input
                    type="number"
                    value={editing.level}
                    onChange={(e) =>
                      setEditing((r) => ({
                        ...r,
                        level: parseInt(e.target.value),
                      }))
                    }
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/30 text-[10px] tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-2">
                  Tier
                </label>
                <select
                  value={editing.tier}
                  onChange={(e) =>
                    setEditing((r) => ({ ...r, tier: e.target.value }))
                  }
                  className={`${inputCls} cursor-pointer`}
                >
                  {TIERS.map((t) => (
                    <option key={t} className="bg-[#0a0f1e]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] py-2.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase font-700 transition-all"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditing(null)}
                className="flex-1 border border-white/15 text-white/50 hover:text-white/80 py-2.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
