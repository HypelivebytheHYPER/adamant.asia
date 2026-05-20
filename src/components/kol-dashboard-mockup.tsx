"use client";

import { Search, Settings, MoreHorizontal, CheckCircle2, Clock, DollarSign, MessageSquare, TrendingUp, MousePointerClick, Eye } from "lucide-react";

const kols = [
  { name: "Thida", handle: "@thida.style", followers: "125K", status: "live", statusLabel: "Live" },
  { name: "Min", handle: "@min.eats", followers: "89K", status: "review", statusLabel: "Review" },
  { name: "Sarin", handle: "@sarin.teach", followers: "210K", status: "done", statusLabel: "Done" },
  { name: "Ploy", handle: "@ploy.kitchen", followers: "67K", status: "brief", statusLabel: "Brief" },
  { name: "Jin", handle: "@jin.fitness", followers: "156K", status: "live", statusLabel: "Live" },
];

const pipeline = [
  { stage: "Brief", count: 3, color: "bg-stone/20 text-stone" },
  { stage: "Content", count: 2, color: "bg-amber/20 text-amber" },
  { stage: "Live", count: 5, color: "bg-teal/20 text-teal" },
];

const activities = [
  { icon: CheckCircle2, iconColor: "text-teal", text: "Thida content posted", time: "2m ago" },
  { icon: Clock, iconColor: "text-amber", text: "Min draft submitted", time: "1h ago" },
  { icon: DollarSign, iconColor: "text-primary", text: "Sarin invoice paid", time: "3h ago" },
  { icon: MessageSquare, iconColor: "text-stone", text: "Ploy brief approved", time: "5h ago" },
];

const metrics = [
  { label: "Reach", value: "1.2M", icon: Eye, change: "+12%" },
  { label: "Engage", value: "4.8%", icon: TrendingUp, change: "+0.6%" },
  { label: "Clicks", value: "8.5K", icon: MousePointerClick, change: "+23%" },
];

const awaiting = [
  { name: "Min", type: "Draft", item: "Summer collection video" },
  { name: "Jin", type: "Revision", item: "Workout series #3" },
];

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    live: "bg-teal",
    review: "bg-amber",
    done: "bg-primary",
    brief: "bg-stone",
  };
  return <span className={`inline-block w-1.5 h-1.5 rounded-full ${colors[status] ?? "bg-stone"}`} />;
}

export function KOLDashboardMockup() {
  return (
    <div
      className="rounded-xl border border-border overflow-hidden bg-surface shadow-rest"
      role="img"
      aria-label="KOL campaign dashboard mockup showing influencer roster, campaign pipeline, activity feed, performance metrics, and content approval queue"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-foreground border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal" />
          <span className="text-caption font-medium text-inverse">KOL Campaign Hub</span>
        </div>
        <div className="flex items-center gap-2 text-inverse-muted">
          <Search size={12} />
          <Settings size={12} />
        </div>
      </div>

      {/* Body — 3 columns on desktop */}
      <div className="grid md:grid-cols-[160px_1fr_180px] divide-y md:divide-y-0 md:divide-x divide-border/50">
        {/* Left: KOL Roster */}
        <div className="p-3 bg-foreground/5">
          <p className="text-micro text-stone mb-2.5">KOLs</p>
          <div className="space-y-2">
            {kols.map((k) => (
              <div key={k.name} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px] font-medium text-foreground/70">{k.name[0]}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium text-foreground truncate">{k.name}</p>
                  <p className="text-[9px] text-stone truncate">{k.handle}</p>
                </div>
                <StatusDot status={k.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Center: Pipeline + Activity */}
        <div className="p-3">
          {/* Pipeline */}
          <p className="text-micro text-stone mb-2.5">Pipeline</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {pipeline.map((p) => (
              <div key={p.stage} className="rounded-lg border border-border/60 p-2 text-center">
                <p className={`text-[10px] font-medium ${p.color.split(" ")[1]}`}>{p.stage}</p>
                <p className={`text-headline mt-0.5 ${p.color.split(" ")[1]}`}>{p.count}</p>
              </div>
            ))}
          </div>

          {/* Activity */}
          <p className="text-micro text-stone mb-2">Recent</p>
          <div className="space-y-1.5">
            {activities.map((a, i) => (
              <div key={i} className="flex items-center gap-2 py-1">
                <a.icon size={10} className={a.iconColor} />
                <span className="text-[10px] text-foreground flex-1">{a.text}</span>
                <span className="text-[9px] text-stone flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Metrics + Queue */}
        <div className="p-3 bg-background/50">
          <p className="text-micro text-stone mb-2.5">This Week</p>
          <div className="space-y-2 mb-4">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-lg bg-surface border border-border/40 p-2">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[9px] text-stone">{m.label}</span>
                  <m.icon size={9} className="text-primary" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-caption font-medium text-foreground">{m.value}</span>
                  <span className="text-[9px] text-teal">{m.change}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-micro text-stone mb-2">Awaiting</p>
          <div className="space-y-1.5">
            {awaiting.map((a, i) => (
              <div key={i} className="rounded-lg bg-amber/5 border border-amber/20 p-2">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] font-medium text-foreground">{a.name}</span>
                  <span className="text-[8px] text-amber px-1 py-0.5 rounded bg-amber/10">{a.type}</span>
                </div>
                <p className="text-[9px] text-stone truncate">{a.item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
