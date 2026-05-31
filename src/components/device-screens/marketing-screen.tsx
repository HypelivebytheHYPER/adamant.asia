"use client";

/**
 * Marketing System — in-device social analytics dashboard.
 * Metric cards, sparkline chart, content pipeline.
 */

export function MarketingScreen() {
  // Sparkline points (scaled to SVG viewBox)
  const points = "4,46 14,38 24,42 34,28 44,32 54,18 64,22 74,10 84,14 94,6 104,10 114,2";

  return (
    <div className="flex h-full w-full flex-col text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-11 pb-2">
        <span className="text-[9px] font-semibold tracking-wide text-white/40">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/40">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.73 21a1.999 1.999 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="h-3 w-5 rounded-sm border border-white/20" />
        </div>
      </div>

      {/* Greeting */}
      <div className="px-5 pt-1">
        <p className="text-[9px] text-white/40">Saturday, Oct 24</p>
        <h2 className="mt-1 text-[18px] font-semibold tracking-tight">Overview</h2>
      </div>

      {/* Metric cards */}
      <div className="mt-4 flex gap-2 px-5">
        {[
          { label: "Followers", value: "12.4K", change: "+8.2%", color: "text-emerald-400" },
          { label: "Engage", value: "4.2%", change: "+1.1%", color: "text-emerald-400" },
          { label: "Posts", value: "34", change: "+6", color: "text-emerald-400" },
        ].map((m) => (
          <div key={m.label} className="flex-1 rounded-2xl bg-white/[0.04] p-2.5 ring-1 ring-white/[0.05]">
            <p className="text-[8px] text-white/40">{m.label}</p>
            <p className="mt-1 text-[13px] font-bold tracking-tight">{m.value}</p>
            <p className={`text-[8px] font-medium ${m.color}`}>{m.change}</p>
          </div>
        ))}
      </div>

      {/* Sparkline chart */}
      <div className="mx-5 mt-4 rounded-2xl bg-white/[0.04] p-3.5 ring-1 ring-white/[0.05]">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold">Reach</p>
          <span className="text-[9px] text-emerald-400 font-medium">+12.4%</span>
        </div>
        <svg viewBox="0 0 118 50" className="mt-2 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`M${points} L114,50 L4,50 Z`}
            fill="url(#areaGrad)"
          />
          <polyline
            points={points}
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="114" cy="2" r="3" fill="#0a0a0a" stroke="#2dd4bf" strokeWidth="2" />
        </svg>
        <div className="mt-2 flex justify-between">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <span key={d} className="text-[7px] text-white/25">{d}</span>
          ))}
        </div>
      </div>

      {/* Content pipeline */}
      <div className="mt-5 px-5">
        <p className="mb-3 text-[9px] font-semibold uppercase tracking-wider text-white/30">Pipeline</p>
        <div className="space-y-3">
          {[
            { title: "Dealer Campaign", stage: "Live", color: "bg-emerald-400" },
            { title: "IG Reel Series", stage: "Review", color: "bg-amber-400" },
            { title: "Product Launch", stage: "Draft", color: "bg-white/20" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-2.5">
              <div className={`h-2 w-2 rounded-full ${item.color} shadow-[0_0_6px_currentColor]`} />
              <p className="flex-1 text-[10px] text-white/70">{item.title}</p>
              <span className="text-[8px] font-medium text-white/40">{item.stage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini post card */}
      <div className="mx-5 mt-5 rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-pink-500 to-orange-500" />
          <div>
            <p className="text-[10px] font-semibold">New drop preview</p>
            <p className="text-[8px] text-white/40">Scheduled · 2:00 PM</p>
          </div>
        </div>
        <div className="mt-2 flex gap-1">
          <span className="rounded bg-white/[0.05] px-1 py-0.5 text-[7px] text-white/40">#launch</span>
          <span className="rounded bg-white/[0.05] px-1 py-0.5 text-[7px] text-white/40">#product</span>
        </div>
      </div>

      <div className="mt-auto pb-8" />
    </div>
  );
}
