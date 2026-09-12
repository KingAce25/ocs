const activityIcons = {
  publish: "↑",
  contact: "✉",
  media: "▣",
  rank: "★",
  event: "◈",
  admin: "⊕",
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hrs = Math.floor(diff / 3600000);
  if (hrs < 1) return "just now";
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function RecentActivity({ activity }) {
  return (
    <div className="lg:col-span-2 border border-white/10 bg-white/[0.02]">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <h2 className="font-['Cormorant_Garamond'] text-white text-xl font-600">
          Recent Activity
        </h2>
        <span className="text-white/25 text-xs font-['Barlow_Condensed'] tracking-wider uppercase">
          Last 7 days
        </span>
      </div>
      {activity.length === 0 ? (
        <p className="text-white/30 text-sm px-6 py-8 text-center">
          No activity yet.
        </p>
      ) : (
        <ul className="divide-y divide-white/[0.06]">
          {activity.map((a, i) => (
            <li
              key={i}
              className="flex items-start gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-[#c9a84c]/40 text-sm mt-0.5 w-5 shrink-0 text-center">
                {activityIcons[a.type] ?? "•"}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-white/70 text-sm font-['Barlow'] font-500">
                  {a.action}
                </p>
                <p className="text-white/35 text-xs font-['Barlow'] truncate mt-0.5">
                  {a.detail}
                </p>
              </div>
              <span className="text-white/20 text-xs font-['Barlow'] shrink-0">
                {timeAgo(a.created_at)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
