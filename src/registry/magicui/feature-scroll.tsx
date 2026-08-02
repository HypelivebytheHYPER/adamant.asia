"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DeviceFrame } from "@/components/ui/iphone";
import {
  SaasBuildScreen,
  MarketingScreen,
  AiWorkflowScreen,
  KolScreen,
} from "@/components/device-screens";
import type { SolutionContent } from "@/data/content";

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
/*  Screen map                                                        */
/* ------------------------------------------------------------------ */

const screenMap: Record<SolutionContent["screen"], React.ReactNode> = {
  saas: <SaasBuildScreen />,
  marketing: <MarketingScreen />,
  aiworkflow: <AiWorkflowScreen />,
  kol: <KolScreen />,
};

/* ------------------------------------------------------------------ */
/*  Section export                                                    */
/* ------------------------------------------------------------------ */

interface ShowcaseProps {
  headline: string;
  subheadline: string;
  solutions: SolutionContent[];
}

export function SolutionScrollShowcase({ headline, subheadline, solutions }: ShowcaseProps) {
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

      {solutions.map((solution, index) => {
        const num = String(index + 1).padStart(2, "0");
        const direction = index % 2 === 0 ? "rtl" : "ltr";
        const rotate = index % 2 === 0 ? "right" : "left";

        return (
          <FeatureScrollContainer
            key={solution.title}
            direction={direction}
            topPosition="10%"
            visual={
              <DeviceFrame rotate={rotate}>
                {screenMap[solution.screen]}
              </DeviceFrame>
            }
          >
            <TextBlock
              num={num}
              title={solution.title}
              subtitle={solution.subtitle}
              detail={solution.detail}
              href={solution.href}
              pills={solution.pills}
            />
          </FeatureScrollContainer>
        );
      })}
    </div>
  );
}
