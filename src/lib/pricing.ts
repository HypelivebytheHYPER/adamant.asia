"use server";

import { BitableClient, authFromEnv, type LarkRecord } from "./lark-api";

const BASE_TOKEN = process.env.LARK_BASE_TOKEN;
const TABLE_ID = process.env.LARK_TABLE_ID_PRICING || "tblH8sKzoqv0c5KD";

export interface PricingItem {
  id: string;
  scope: string;
  category: string;
  description: string;
  whatIncluded: string;
  timeline: string;
  bestFor: string;
  price: string;
  priceRangeNotes: string;
  order: number;
  priceValue: number;
}

function extractText(v: unknown): string {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (Array.isArray(v) && v.length > 0 && typeof v[0] === "object" && v[0] !== null && "text" in v[0]) {
    return v.map((seg: { text?: string }) => seg.text ?? "").join("");
  }
  if (typeof v === "object" && v !== null && "value" in v && Array.isArray((v as { value?: unknown[] }).value)) {
    const first = (v as { value: unknown[] }).value[0];
    return first !== undefined ? String(first) : "";
  }
  return "";
}

function parseRecord(r: LarkRecord): PricingItem {
  const f = r.fields;

  const categoryRaw = f["Category"];
  const category = typeof categoryRaw === "string" ? categoryRaw : "";

  return {
    id: r.record_id,
    scope: extractText(f["Scope"]),
    category,
    description: extractText(f["Description"]),
    whatIncluded: extractText(f["What Included"]),
    timeline: extractText(f["Timeline"]),
    bestFor: extractText(f["Best For"]),
    price: extractText(f["Fees (SGD)"]).replace(/^S\$/g, "$"),
    priceRangeNotes: extractText(f["Price Range Notes"]).replace(/S\$/g, "$"),
    order: (f["Order"] as number) || 0,
    priceValue: (f["SGD Price"] as number) || 0,
  };
}

const FALLBACK_PRICING: PricingItem[] = [
  { id: "p1", scope: "Introduction call — online", category: "Intro call", description: "We meet, you ask everything, we're honest about fit.", whatIncluded: "How Adamant works + what we've built\nHow we charge and what to expect\nYour pain points + initial feasibility read\nHonest fit assessment — we tell you if we can't help\nWritten follow-up notes shared after", timeline: "45 min", bestFor: "Any company exploring options before committing", price: "Free", priceRangeNotes: "", order: 1, priceValue: 0 },
  { id: "p2", scope: "Discovery — online", category: "Discovery", description: "Paid scoping session that produces a fixed-price build plan.", whatIncluded: "Deep-dive workflow audit (2–3 sessions)\nCurrent process + bottleneck mapping\nTechnical architecture outline\nFixed-scope build proposal with milestones\nFull project brief — ready to execute", timeline: "~1 week", bestFor: "Companies ready to invest in a system", price: "$350", priceRangeNotes: "Credited toward build in full", order: 2, priceValue: 350 },
  { id: "p3", scope: "Discovery — in-person", category: "Discovery", description: "On-site working session at your office.", whatIncluded: "On-site workflow observation + team interviews\nBottleneck identification in the room\nPreliminary solution sketch\nWritten summary + scoping report\nFixed-price build proposal", timeline: "Half-day", bestFor: "Brand teams and ops leads who prefer on-site", price: "$450", priceRangeNotes: "Credited toward build in full", order: 3, priceValue: 450 },
  { id: "p4", scope: "Discovery — in-person (remote travel)", category: "Discovery", description: "On-site session with travel arrangement.", whatIncluded: "On-site workflow observation + team interviews\nBottleneck identification in the room\nPreliminary solution sketch\nWritten summary + scoping report\nFixed-price build proposal", timeline: "Half-day", bestFor: "Teams that need on-site discovery at satellite locations", price: "$450", priceRangeNotes: "Credited toward build in full", order: 4, priceValue: 450 },
  { id: "p5", scope: "Lead gen website + AI qualification", category: "Build", description: "Landing page with automated lead capture and AI-powered qualification.", whatIncluded: "Conversion-optimised landing page\nForm + CRM integration\nAI lead scoring & auto-qualification\nAutomated follow-up sequences\nAnalytics dashboard\n30-day post-launch support", timeline: "2 weeks", bestFor: "Startups, growth-stage companies", price: "$2,800", priceRangeNotes: "up to $4,500\nComplexity-dependent", order: 5, priceValue: 2800 },
  { id: "p6", scope: "Zap — SaaS mini build", category: "Build", description: "Custom internal tool or lightweight app. Working code shipped in 2 weeks.", whatIncluded: "Single-function scoped app\nWorking deployed code — not a prototype\nUser auth + role management\nBasic reporting / data views\nTeam onboarding session\n30-day support included", timeline: "2 weeks", bestFor: "Ops leads, startup founders, agencies", price: "$3,800", priceRangeNotes: "up to $7,500\nPer defined scope", order: 6, priceValue: 3800 },
  { id: "p7", scope: "Compass — AI workflow automation", category: "Build", description: "Automated pipelines connecting tools you already use. No new apps to learn.", whatIncluded: "Workflow audit + automation map\nUp to 5 automated pipelines\nTool integrations (LINE, Lark, Notion, Sheets…)\nAI triggers & smart routing\nStaff training session\n30-day monitoring included", timeline: "1–2 weeks", bestFor: "SMEs, retail, hospitality, manufacturing", price: "$2,200", priceRangeNotes: "up to $5,500\nPer automation scope", order: 7, priceValue: 2200 },
  { id: "p8", scope: "Multi-dealer campaign dashboard", category: "Systems", description: "Network — full campaign OS for dealer and creator programs.", whatIncluded: "Dealer/creator portal with login\nContent submission + moderation queue\nReal-time leaderboard & rankings\nCampaign period + prize tier logic\nAdmin dashboard with full reporting\n60-day post-launch support", timeline: "3–4 weeks", bestFor: "Brands with partner networks, FMCG, automotive", price: "$8,500", priceRangeNotes: "up to $14,000\nScale-dependent", order: 8, priceValue: 8500 },
  { id: "p9", scope: "Influencer campaign OS", category: "Systems", description: "End-to-end influencer program — brief to payment in one dashboard.", whatIncluded: "Creator database + brief distribution\nApproval workflow engine\nDeliverable tracker per creator\nPerformance reporting\nPayment management module\n60-day post-launch support", timeline: "3–5 weeks", bestFor: "Marketing agencies, brand managers", price: "$7,500", priceRangeNotes: "up to $12,000\nPer program scope", order: 9, priceValue: 7500 },
  { id: "p10", scope: "Social media management tool", category: "Systems", description: "Multi-platform scheduler with team approval flows and cross-channel analytics.", whatIncluded: "TikTok, IG, FB, LinkedIn, YouTube\nContent calendar + scheduling\nMulti-level approval workflow\nMulti-brand account management\nPerformance analytics dashboard\n30-day post-launch support", timeline: "2–3 weeks", bestFor: "Digital agencies, multi-brand operators", price: "$5,500", priceRangeNotes: "up to $9,500\nPer brands/users", order: 10, priceValue: 5500 },
  { id: "p11", scope: "Live commerce operations tool", category: "Systems", description: "Real-time order management, host coordination, and session performance tracking.", whatIncluded: "Live session management dashboard\nReal-time order + inventory sync\nHost performance scoring\nPost-session analytics report\nTikTok Shop / Shopee integration (optional)\n60-day post-launch support", timeline: "3–4 weeks", bestFor: "Live commerce brands, MCNs, platforms", price: "$6,800", priceRangeNotes: "up to $11,500\nIntegration complexity varies", order: 11, priceValue: 6800 },
  { id: "p12", scope: "Ops & maintenance retainer", category: "Retainer", description: "Keep your system running, updated, and improving month to month.", whatIncluded: "Bug fixes + platform updates\nUp to 8 hrs/month feature iterations\nMonthly performance review\nPriority response SLA (24 hrs)\nAccess to new AI feature releases", timeline: "Monthly", bestFor: "Post-build clients maintaining live systems", price: "$800", priceRangeNotes: "up to $1,800 / mo\nBased on system complexity", order: 12, priceValue: 800 },
  { id: "p13", scope: "Growth partner retainer", category: "Retainer", description: "Embedded AI and ops partner for ongoing builds, iterations, and strategy.", whatIncluded: "Up to 20 hrs/month build & iteration\nQuarterly strategy session\nNew tool scoping included\nDedicated point of contact\nPriority queue for new projects", timeline: "Monthly", bestFor: "Scale-ups, agencies, growing brands", price: "$2,200", priceRangeNotes: "up to $4,000 / mo\nMin. 3-month commitment", order: 13, priceValue: 2200 },
];

export async function getPricingItems(): Promise<PricingItem[]> {
  if (!BASE_TOKEN) {
    console.warn("[pricing] LARK_BASE_TOKEN not configured, using fallback");
    return FALLBACK_PRICING;
  }
  try {
    const auth = await authFromEnv();
    const client = new BitableClient(auth);

    const res = await client.searchRecords(BASE_TOKEN, TABLE_ID, {
      sort: [{ field_name: "Order", desc: false }],
      field_names: [
        "Scope",
        "Category",
        "Description",
        "What Included",
        "Timeline",
        "Best For",
        "Fees (SGD)",
        "Price Range Notes",
        "Order",
        "SGD Price",
      ],
      page_size: 50,
    });

    return res.items.map(parseRecord);
  } catch {
    return FALLBACK_PRICING;
  }
}

export async function getPricingCategories(): Promise<string[]> {
  const items = await getPricingItems();
  return [...new Set(items.map((i) => i.category).filter(Boolean))];
}
