"use client";

/**
 * SaaS Mini Build — in-device project dashboard.
 * Native-feeling dark UI with progress ring, stat pills, and activity feed.
 */

export function SaasBuildScreen() {
  const progress = 78;
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex h-full w-full flex-col text-white">
      {/* Status bar mimic */}
      <div className="flex items-center justify-between px-5 pt-11 pb-2">
        <span className="text-[9px] font-semibold tracking-wide text-white/40">9:41</span>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
          <span className="text-[9px] font-medium text-emerald-400">Live</span>
        </div>
      </div>

      {/* Header */}
      <div className="px-5 pt-1">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-[9px] font-semibold text-emerald-400">Sprint 3</span>
        </div>
        <h2 className="mt-3 text-[20px] font-semibold tracking-tight leading-tight">
          Campaign Hub
        </h2>
        <p className="mt-1 text-[11px] text-white/40">Building · 2 days left</p>
      </div>

      {/* Progress ring */}
      <div className="relative mt-5 flex items-center justify-center">
        <svg width="130" height="130" viewBox="0 0 130 130" className="-rotate-90">
          <circle cx="65" cy="65" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <circle
            cx="65"
            cy="65"
            r="42"
            fill="none"
            stroke="#34d399"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-[28px] font-bold tracking-tighter">{progress}%</span>
          <p className="text-[9px] font-medium text-white/40 uppercase tracking-wider">Done</p>
        </div>
      </div>

      {/* Stat pills */}
      <div className="mt-4 flex items-center justify-center gap-2.5 px-5">
        <div className="flex flex-col items-center rounded-2xl bg-white/[0.04] px-4 py-2.5">
          <span className="text-[14px] font-bold">47</span>
          <span className="text-[9px] text-white/40">Commits</span>
        </div>
        <div className="flex flex-col items-center rounded-2xl bg-white/[0.04] px-4 py-2.5">
          <span className="text-[14px] font-bold">12</span>
          <span className="text-[9px] text-white/40">Deploys</span>
        </div>
      </div>

      {/* Project card */}
      <div className="mx-5 mt-5 rounded-2xl bg-white/[0.04] p-3.5 ring-1 ring-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0f766e]/30 text-[11px] font-bold text-teal-300">
            CH
          </div>
          <div>
            <p className="text-[11px] font-semibold">Campaign Hub</p>
            <p className="text-[9px] text-white/40">v2.4 · internal tool</p>
          </div>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {["React", "Next.js", "Lark API"].map((tag) => (
            <span key={tag} className="rounded-md bg-white/[0.05] px-1.5 py-0.5 text-[8px] font-medium text-white/50">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div className="mt-5 px-5">
        <p className="mb-2.5 text-[9px] font-semibold uppercase tracking-wider text-white/30">Activity</p>
        <div className="space-y-3">
          {[
            { color: "bg-emerald-400", text: "Deploy successful", time: "2m ago" },
            { color: "bg-amber-400", text: "API integration review", time: "1h ago" },
            { color: "bg-sky-400", text: "Dashboard component added", time: "3h ago" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2.5">
              <span className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
              <p className="flex-1 text-[10px] text-white/70">{item.text}</p>
              <p className="text-[8px] text-white/30">{item.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-auto pb-8 px-5">
        <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2 ring-1 ring-emerald-500/20">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[10px] font-medium text-emerald-300">Build passed all checks</span>
        </div>
      </div>
    </div>
  );
}
