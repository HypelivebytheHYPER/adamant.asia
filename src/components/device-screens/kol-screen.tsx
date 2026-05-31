"use client";

/**
 * KOL Leaderboard — in-device gamified creator ranking UI.
 * Podium top-3 + ranked list with score bars.
 */

export function KolScreen() {
  const podium = [
    { rank: 2, name: "Mia L.", score: 8420, color: "from-slate-300 to-slate-500" },
    { rank: 1, name: "Alex R.", score: 12840, color: "from-amber-300 to-amber-600", crown: true },
    { rank: 3, name: "Jon K.", score: 7160, color: "from-orange-300 to-orange-600" },
  ];

  const list = [
    { rank: 4, name: "Sara T.", score: 6540, highlight: false },
    { rank: 5, name: "Leo M.", score: 5980, highlight: false },
    { rank: 6, name: "Zara P.", score: 5420, highlight: true },
    { rank: 7, name: "Dan W.", score: 4890, highlight: false },
  ];

  const maxScore = 12840;

  return (
    <div className="flex h-full w-full flex-col text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-11 pb-2">
        <span className="text-[9px] font-semibold tracking-wide text-white/40">9:41</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/40">
          <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="px-5 pt-1">
        <h2 className="text-[18px] font-semibold tracking-tight">Leaderboard</h2>
        <p className="mt-1 text-[11px] text-white/40">This week · 47 creators</p>
      </div>

      {/* Podium */}
      <div className="mx-5 mt-5 flex items-end justify-center gap-2">
        {podium.map((p) => (
          <div key={p.rank} className="flex flex-col items-center">
            {/* Crown on #1 */}
            {p.crown && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mb-1 text-amber-400">
                <path d="M2 17l2-9 4 5 4-9 4 9 4-5 2 9H2z" fill="currentColor" />
              </svg>
            )}
            {/* Avatar circle */}
            <div
              className={`flex items-center justify-center rounded-full bg-gradient-to-b ${p.color} shadow-lg ${
                p.rank === 1 ? "h-14 w-14 text-[13px]" : "h-10 w-10 text-[10px]"
              } font-bold text-black/80`}
            >
              {p.name.split(" ")[0][0]}
            </div>
            {/* Name */}
            <p className={`mt-1.5 font-semibold ${p.rank === 1 ? "text-[10px]" : "text-[9px]"}`}>{p.name}</p>
            {/* Score */}
            <p className="text-[9px] text-white/40">{p.score.toLocaleString()}</p>
            {/* Rank badge */}
            <div
              className={`mt-1 rounded-md px-1.5 py-0.5 text-[8px] font-bold ${
                p.rank === 1
                  ? "bg-amber-500/20 text-amber-300"
                  : p.rank === 2
                  ? "bg-slate-400/20 text-slate-300"
                  : "bg-orange-500/20 text-orange-300"
              }`}
            >
              #{p.rank}
            </div>
          </div>
        ))}
      </div>

      {/* Ranked list */}
      <div className="mt-5 px-5">
        <p className="mb-2.5 text-[9px] font-semibold uppercase tracking-wider text-white/30">Rankings</p>
        <div className="space-y-2.5">
          {list.map((item) => {
            const barWidth = `${(item.score / maxScore) * 100}%`;
            return (
              <div
                key={item.rank}
                className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 ${
                  item.highlight
                    ? "bg-primary/10 ring-1 ring-primary/20"
                    : "bg-white/[0.03]"
                }`}
              >
                <span className="w-4 text-center text-[10px] font-bold text-white/30">
                  {item.rank}
                </span>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.08] text-[9px] font-bold text-white/60">
                  {item.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold text-white/80">{item.name}</p>
                    <p className="text-[9px] font-medium text-white/40">{item.score.toLocaleString()}</p>
                  </div>
                  <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-700"
                      style={{ width: barWidth }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-auto pb-8 px-5">
        <div className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.04] py-2.5 ring-1 ring-white/[0.06]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/40">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
          </svg>
          <span className="text-[10px] font-medium text-white/50">Top 10 get featured</span>
        </div>
      </div>
    </div>
  );
}
