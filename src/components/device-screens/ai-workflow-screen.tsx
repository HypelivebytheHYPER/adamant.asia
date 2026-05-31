"use client";

/**
 * AI Workflow — in-device automation engine UI.
 * Flow nodes, connection lines, status log.
 */

export function AiWorkflowScreen() {
  return (
    <div className="flex h-full w-full flex-col text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-11 pb-2">
        <span className="text-[9px] font-semibold tracking-wide text-white/40">9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[9px] font-medium text-emerald-400">12 Active</span>
        </div>
      </div>

      <div className="px-5 pt-1">
        <h2 className="text-[18px] font-semibold tracking-tight">Workflow Engine</h2>
        <p className="mt-1 text-[11px] text-white/40">Everything runs while you sleep</p>
      </div>

      {/* Flow diagram */}
      <div className="relative mx-5 mt-5 flex flex-col items-center gap-0">
        {/* Node 1 — Trigger */}
        <div className="relative z-10 flex w-full items-center gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-3 ring-1 ring-white/[0.06]">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/15">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-amber-400">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-semibold">Trigger</p>
            <p className="text-[9px] text-white/40">New form submission</p>
          </div>
          <span className="ml-auto text-[9px] font-medium text-amber-400">1.2s</span>
        </div>

        {/* Connector line */}
        <div className="relative h-6 w-[1px] bg-white/10">
          <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2">
            <div
              className="h-full w-full"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 100%)",
                animation: "pulseDown 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        {/* Node 2 — AI Parse */}
        <div className="relative z-10 flex w-full items-center gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-3 ring-1 ring-white/[0.06]">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-500/15">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-sky-400">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-semibold">AI Parse</p>
            <p className="text-[9px] text-white/40">Score + route lead</p>
          </div>
          <span className="ml-auto text-[9px] font-medium text-sky-400">0.4s</span>
        </div>

        {/* Connector line */}
        <div className="relative h-6 w-[1px] bg-white/10">
          <div
            className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 100%)",
              animation: "pulseDown 1.5s 0.5s ease-in-out infinite",
            }}
          />
        </div>

        {/* Node 3 — Action */}
        <div className="relative z-10 flex w-full items-center gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-3 ring-1 ring-white/[0.06]">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-semibold">Action</p>
            <p className="text-[9px] text-white/40">Notify team + create task</p>
          </div>
          <span className="ml-auto text-[9px] font-medium text-emerald-400">Done</span>
        </div>
      </div>

      {/* Throughput stat */}
      <div className="mx-5 mt-5 rounded-2xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/[0.05]">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-white/50">Today</p>
          <p className="text-[9px] font-medium text-emerald-400">+24% vs yesterday</p>
        </div>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-[20px] font-bold tracking-tight">1,284</span>
          <span className="text-[10px] text-white/40">runs</span>
        </div>
        {/* Mini bar */}
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
        </div>
      </div>

      {/* Log */}
      <div className="mt-5 px-5">
        <p className="mb-2.5 text-[9px] font-semibold uppercase tracking-wider text-white/30">Recent runs</p>
        <div className="space-y-3">
          {[
            { icon: "✓", color: "text-emerald-400", text: "Lead scored · 94 pts", time: "Now" },
            { icon: "✓", color: "text-emerald-400", text: "Slack alert sent", time: "1m" },
            { icon: "✓", color: "text-emerald-400", text: "CRM record updated", time: "2m" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2.5">
              <span className={`text-[10px] ${item.color}`}>{item.icon}</span>
              <p className="flex-1 text-[10px] text-white/60">{item.text}</p>
              <p className="text-[8px] text-white/30">{item.time}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pb-8" />
    </div>
  );
}
