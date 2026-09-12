import Link from "next/link";

export default function QuickActions({ actions }) {
  return (
    <div className="border border-white/10 bg-white/[0.02]">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="font-['Cormorant_Garamond'] text-white text-xl font-600">
          Quick Actions
        </h2>
      </div>
      <div className="p-4 flex flex-col gap-2">
        {actions.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="flex items-center gap-3 px-4 py-3 border border-white/10 hover:border-[#c9a84c]/30 hover:bg-[#c9a84c]/[0.04] transition-all duration-200 group"
          >
            <span className="text-[#c9a84c]/30 group-hover:text-[#c9a84c]/60 transition-colors text-xs">
              +
            </span>
            <div>
              <p className="text-white/70 text-sm font-['Barlow'] font-500 group-hover:text-white/90 transition-colors">
                {a.label}
              </p>
              <p className="text-white/25 text-xs font-['Barlow']">{a.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
