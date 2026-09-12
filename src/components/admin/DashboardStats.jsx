"use client";
import Link from "next/link";

const colorMap = {
  gold: {
    border: "border-[#c9a84c]/25",
    bg: "bg-[#c9a84c]/[0.06]",
    text: "text-[#c9a84c]",
    sub: "text-[#c9a84c]/50",
  },
  teal: {
    border: "border-[#1D9E75]/25",
    bg: "bg-[#1D9E75]/[0.06]",
    text: "text-[#5DCAA5]",
    sub: "text-[#5DCAA5]/50",
  },
  purple: {
    border: "border-[#534AB7]/25",
    bg: "bg-[#534AB7]/[0.06]",
    text: "text-[#AFA9EC]",
    sub: "text-[#AFA9EC]/50",
  },
  coral: {
    border: "border-[#D85A30]/25",
    bg: "bg-[#D85A30]/[0.06]",
    text: "text-[#F0997B]",
    sub: "text-[#F0997B]/50",
  },
};

export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      {stats.map((s) => {
        const c = colorMap[s.color];
        return (
          <Link
            key={s.label}
            href={s.href}
            className={`border ${c.border} ${c.bg} p-6 hover:brightness-110 transition-all duration-200 group`}
          >
            <p
              className={`text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-3 ${c.sub}`}
            >
              {s.label}
            </p>
            <p
              className={`font-['Cormorant_Garamond'] text-5xl font-700 leading-none mb-2 ${c.text}`}
            >
              {s.value}
            </p>
            <p className="text-white/30 text-xs font-['Barlow']">{s.sub}</p>
          </Link>
        );
      })}
    </div>
  );
}
