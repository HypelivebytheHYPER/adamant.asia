"use client";

import { BlurFade } from "@/components/blur-fade";
import { KOLDashboardMockup } from "@/components/kol-dashboard-mockup";

const beforeAfter = [
  { before: "6 spreadsheets", after: "1 dashboard" },
  { before: "47 LINE messages", after: "Auto-status updates" },
  { before: "3 hours reporting", after: "1-click export" },
];

export function Progress() {
  return (
    <section id="progress" className="section-pad bg-surface relative overflow-hidden">
      <div className="container relative">
        <div className="max-w-2xl space-block-sm">
          <BlurFade delay={0.1}>
            <h2 className="text-display text-foreground mb-4">
              KOL campaigns used to take <em className="italic">6 hours</em>. Now they take 6 minutes.
            </h2>
          </BlurFade>
          <BlurFade delay={0.18}>
            <p className="text-body text-stone max-w-md">
              One dashboard. Every influencer. Every campaign. Every update.
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.2} className="space-block max-w-4xl mx-auto">
          <KOLDashboardMockup />
        </BlurFade>

        <BlurFade delay={0.1}>
          <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
            {beforeAfter.map((row) => (
              <div key={row.before} className="text-center py-3 border-t border-border/50">
                <p className="text-caption text-stone line-through decoration-accent/40">{row.before}</p>
                <p className="text-caption text-primary font-medium mt-0.5">{row.after}</p>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
