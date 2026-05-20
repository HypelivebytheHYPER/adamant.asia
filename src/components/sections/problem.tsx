"use client";

import { BlurFade } from "@/components/blur-fade";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/terminal";
import { MessageSquare, Mail, ShoppingCart, HelpCircle, CheckCircle2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Before: chaotic notifications ── */
const chaosNotifications = [
  { icon: MessageSquare, color: "text-teal", label: "LINE", msg: "Min: Where is the price list?", time: "2m ago" },
  { icon: Mail, color: "text-primary", label: "Email", msg: "Supplier: Updated invoice #4021", time: "5m ago" },
  { icon: HelpCircle, color: "text-accent", label: "Team", msg: "Ploy: How do I process a refund?", time: "8m ago" },
  { icon: ShoppingCart, color: "text-stone", label: "Orders", msg: "New order #8392 — pending review", time: "12m ago" },
  { icon: MessageSquare, color: "text-teal", label: "LINE", msg: "Client: Can we meet tomorrow?", time: "15m ago" },
  { icon: Mail, color: "text-primary", label: "Email", msg: "3 overdue invoices need chasing", time: "22m ago" },
];

function NotificationCard({
  icon: Icon,
  color,
  label,
  msg,
  time,
}: {
  icon: React.ElementType;
  color: string;
  label: string;
  msg: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-background border border-border/60 p-3">
      <div className={cn("flex-shrink-0", color)}>
        <Icon size={16} strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-stone uppercase tracking-wider">{label}</span>
          <span className="text-[10px] text-dim">{time}</span>
        </div>
        <p className="text-caption text-foreground truncate">{msg}</p>
      </div>
      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-accent animate-pulse" />
    </div>
  );
}

/* ── After: terminal ── */
function SystemTerminal() {
  return (
    <Terminal title="adamant-system" className="h-full">
      <div className="space-y-2">
        <TypingAnimation delay={200} duration={25}>
          $ adamant init --workflow=sales
        </TypingAnimation>
        <AnimatedSpan delay={800} className="text-primary">
          <CheckCircle2 size={12} className="inline mr-1.5" />
          Connected: LINE, Lark, Email, Shopify
        </AnimatedSpan>
        <AnimatedSpan delay={1100} className="text-primary">
          <CheckCircle2 size={12} className="inline mr-1.5" />
          Auto-responder: active
        </AnimatedSpan>
        <AnimatedSpan delay={1400} className="text-primary">
          <CheckCircle2 size={12} className="inline mr-1.5" />
          Dashboard: live
        </AnimatedSpan>
        <TypingAnimation delay={1800} duration={20}>
          $ adamant status
        </TypingAnimation>
        <AnimatedSpan delay={2200} className="text-inverse-muted">
          <Zap size={12} className="inline mr-1.5 text-primary" />
          23 questions answered today · 0 waiting · 12s avg
        </AnimatedSpan>
        <TypingAnimation delay={2600} duration={20}>
          $ _
        </TypingAnimation>
      </div>
    </Terminal>
  );
}

export function Problem() {
  return (
    <section id="problem" className="section-pad bg-background relative overflow-hidden">
      <div className="container relative">
        <div className="max-w-2xl space-block-sm">
          <BlurFade>
            <h2 className="text-display text-foreground mb-4">
              Your team asks <em className="italic">you</em> for everything.
            </h2>
          </BlurFade>
          <BlurFade delay={0.12}>
            <p className="text-body text-stone max-w-md">
              Every answer goes through you. Revenue sits while you search.
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.2} className="space-block">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Before — all notifications visible */}
            <div className="rounded-xl bg-surface border border-border p-5">
              <p className="text-micro text-accent uppercase tracking-wider mb-4">Before</p>
              <div className="flex flex-col gap-2">
                {chaosNotifications.map((n, i) => (
                  <NotificationCard key={i} {...n} />
                ))}
              </div>
              <p className="text-caption text-stone mt-4 text-center">
                Everything converges on one person.
              </p>
            </div>

            {/* After — terminal */}
            <div className="rounded-xl bg-surface border border-border p-5">
              <p className="text-micro text-primary uppercase tracking-wider mb-4">After</p>
              <SystemTerminal />
              <p className="text-caption text-stone mt-4 text-center">
                One system handles every channel.
              </p>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.1} className="max-w-md">
          <div className="flex items-baseline gap-3 py-3 border-t border-border/50">
            <span className="text-headline text-primary flex-shrink-0">40%</span>
            <span className="text-body text-stone">of daily tasks are repeated work that could be automated</span>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
