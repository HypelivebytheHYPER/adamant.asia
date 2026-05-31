"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/animations/blur-fade";
import { DeviceFrame } from "@/components/ui/iphone";
import {
  SaasBuildScreen,
  MarketingScreen,
  AiWorkflowScreen,
  KolScreen,
} from "@/components/device-screens";

/* ------------------------------------------------------------------ */
/*  FeatureScrollContainer — sticky 2-col layout                      */
/* ------------------------------------------------------------------ */

interface FeatureScrollProps {
  direction: "ltr" | "rtl";
  visual: React.ReactNode;
  children: React.ReactNode;
  topPosition?: string;
}

const FeatureScrollContainer: React.FC<FeatureScrollProps> = ({
  direction,
  visual,
  children,
  topPosition = "12vh",
}) => {
  const isLTR = direction === "ltr";

  return (
    <div className="w-full">
      {/* Mobile: stacked */}
      <div className="flex flex-col gap-y-10 lg:hidden">
        <div className={isLTR ? "order-1" : "order-2"}>
          <div className="mx-auto w-full max-w-[300px]">{visual}</div>
        </div>
        <div className={isLTR ? "order-2" : "order-1"}>{children}</div>
      </div>

      {/* Desktop: sticky 2-col */}
      <div className="relative hidden h-fit w-full lg:grid lg:grid-cols-2 lg:gap-12">
        {isLTR ? (
          <>
            {/* LTR → text LEFT (sticky), visual RIGHT */}
            <div
              className="sticky flex items-center justify-end pr-6"
              style={{ top: topPosition }}
            >
              {children}
            </div>
            <div className="flex h-fit items-center justify-start pl-6 py-8">
              {visual}
            </div>
          </>
        ) : (
          <>
            {/* RTL → visual LEFT (scrolls), text RIGHT (sticky) */}
            <div className="flex h-fit items-center justify-end pr-6 py-8">
              {visual}
            </div>
            <div
              className="sticky flex items-center justify-start pl-6"
              style={{ top: topPosition }}
            >
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Text block — editorial typography, matching design system         */
/* ------------------------------------------------------------------ */

interface TextBlockProps {
  num: string;
  title: string;
  subtitle: string;
  detail: string;
  href: string;
  pills: string[];
}

function TextBlock({ num, title, subtitle, detail, href, pills }: TextBlockProps) {
  return (
    <div className="flex w-full max-w-md flex-col gap-3 text-left">
      <span className="text-micro text-stone">
        {num}
      </span>

      <h3 className="text-display text-foreground font-serif">
        {title}
      </h3>

      <p className="text-lead text-stone leading-relaxed">
        {subtitle}
      </p>

      <p className="text-body text-stone leading-relaxed">
        {detail}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2 pt-1 lg:justify-start">
        {pills.map((p) => (
          <span
            key={p}
            className="inline-flex items-center rounded-full border border-border bg-foreground/[0.03] px-2.5 py-1 text-caption text-stone font-medium"
          >
            {p}
          </span>
        ))}
      </div>

      <Link
        href={href}
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 pt-1"
      >
        See how it works
        <ArrowRight
          size={13}
          strokeWidth={2}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section export                                                    */
/* ------------------------------------------------------------------ */

interface ShowcaseProps {
  headline: string;
  subheadline: string;
}

export function SolutionScrollShowcase({ headline, subheadline }: ShowcaseProps) {
  return (
    <div className="flex flex-col gap-16 lg:gap-20">
      {/* Headline — centered, compact */}
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-display text-foreground font-serif">
          {headline}
        </h2>
        <p className="text-lead text-stone mt-3 leading-relaxed">
          {subheadline}
        </p>
      </div>

      {/* Row 1 — RTL: text left (sticky), visual right (scrolls) */}
      <FeatureScrollContainer
        direction="rtl"
        topPosition="10%"
        visual={
          <DeviceFrame rotate="right">
            <SaasBuildScreen />
          </DeviceFrame>
        }
      >
        <TextBlock
          num="01"
          title="SaaS Mini Build"
          subtitle="Custom tools shipped in two weeks. You get working code, not a prototype."
          detail="We scope in one call, build in one sprint, and hand over deployable code with documentation. Most projects start at SGD 13,000."
          href="/solutions/marketing-strategy"
          pills={["2-week sprint", "Full source code", "React + Node"]}
        />
      </FeatureScrollContainer>

      {/* Row 2 — LTR: visual left (scrolls), text right (sticky) */}
      <FeatureScrollContainer
        direction="ltr"
        topPosition="10%"
        visual={
          <DeviceFrame rotate="left">
            <MarketingScreen />
          </DeviceFrame>
        }
      >
        <TextBlock
          num="02"
          title="Marketing System"
          subtitle="Influencer campaigns, content pipelines, and performance tracking — all in one system."
          detail="From first contact to final report. We set up the pipeline, automate the repetitive parts, and train your team to run it independently."
          href="/solutions/campaign-systems"
          pills={["End-to-end pipeline", "Team training", "Lark + Meta"]}
        />
      </FeatureScrollContainer>

      {/* Row 3 — RTL: text left (sticky), visual right (scrolls) */}
      <FeatureScrollContainer
        direction="rtl"
        topPosition="10%"
        visual={
          <DeviceFrame rotate="right">
            <AiWorkflowScreen />
          </DeviceFrame>
        }
      >
        <TextBlock
          num="03"
          title="AI Workflow"
          subtitle="The 40 tasks you repeat every day? Done before you open your laptop."
          detail="No new apps to learn. No disruption. Just the manual work you hate, handled automatically — with full visibility and control."
          href="/solutions/productivity-ai"
          pills={["Zero new tools", "Full audit trail", "OpenAI + Lark"]}
        />
      </FeatureScrollContainer>

      {/* Row 4 — LTR: visual left (scrolls), text right (sticky) */}
      <FeatureScrollContainer
        direction="ltr"
        topPosition="10%"
        visual={
          <DeviceFrame rotate="left">
            <KolScreen />
          </DeviceFrame>
        }
      >
        <TextBlock
          num="04"
          title="KOL Leaderboard"
          subtitle="Gamified creator rankings with real-time scoring."
          detail="Dealer Program — track performance across platforms, rank creators by engagement and conversion, and reward top performers automatically."
          href="/solutions/campaign-systems"
          pills={["Dealer Program", "Real-time scoring", "Multi-platform"]}
        />
      </FeatureScrollContainer>
    </div>
  );
}
