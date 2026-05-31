import { DeviceFrameLegacy } from "@/components/ui/iphone";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Preview \u2014 Live System Demo | Adamant",
  description:
    "Preview of a live operations dashboard built by Adamant. Revenue tracking, order management, and team analytics in one view.",
  alternates: { canonical: "/dashboard" },
  robots: { index: false, follow: true },
};

const stats = [
  {
    label: "Total Revenue",
    value: "$124K",
    change: "+18.2%",
    changeLabel: "vs last month",
    accent: true,
  },
  {
    label: "Orders",
    value: "340",
  },
  {
    label: "Users",
    value: "1.2K",
  },
  {
    label: "Clicks",
    value: "8.4K",
  },
];

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-16">
      <div className="mb-8 text-center">
        <h1 className="text-sm font-medium uppercase tracking-widest text-stone/60">
          Live Preview
        </h1>
        <p className="mt-1 text-xs text-stone/40">adamant.asia/dashboard</p>
      </div>

      <DeviceFrameLegacy title="Dashboard">
        <div className="flex h-full flex-col bg-background p-5">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold tracking-tight">Dashboard</h2>
            <p className="text-[11px] text-stone/50">
              Today,{" "}
              {new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Revenue — hero stat */}
          <div className="mb-5 rounded-2xl bg-foreground/[0.03] p-4">
            <p className="text-[11px] font-medium uppercase tracking-wide text-stone/50">
              Total Revenue
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight">$124K</p>
            <div className="mt-1 flex items-center gap-1 text-[11px]">
              <span className="font-medium text-emerald-600">
                \u2191 +18.2%
              </span>
              <span className="text-stone/40">vs last month</span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.slice(1).map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-foreground/[0.03] p-3.5"
              >
                <p className="text-[10px] font-medium uppercase tracking-wide text-stone/50">
                  {stat.label}
                </p>
                <p className="mt-1 text-xl font-semibold tracking-tight">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom padding for scroll */}
          <div className="flex-1" />
        </div>
      </DeviceFrameLegacy>
    </main>
  );
}
