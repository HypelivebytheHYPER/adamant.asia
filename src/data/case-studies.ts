export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  service: "SaaS Mini Build" | "AI Workflow" | "Marketing System" | "KOL Leaderboard";
  headline: string;
  challenge: string;
  solution: string;
  outcome: string;
  tags: string[];
  /** Headline result, shown large on the visual (e.g. "70%"). */
  metric: string;
  /** Short label under the metric (e.g. "faster campaign setup"). */
  metricLabel: string;
  /** Optional hero image (media.hypelive.app). Falls back to a branded gradient when absent. */
  image?: string;
  imageAlt?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "kol-leaderboard",
    client: "Regional beauty brand",
    industry: "Beauty / e-commerce",
    service: "KOL Leaderboard",
    headline: "Replaced spreadsheet KOL tracking with a live campaign dashboard.",
    challenge:
      "The marketing team managed 40+ influencers across three markets using shared spreadsheets. Campaign status, content deadlines, and performance data were scattered, causing missed posts and duplicated outreach.",
    solution:
      "Built a KOL leaderboard that centralises creator profiles, campaign pipelines, content approvals, and real-time performance scoring. Integrated with Shopify and Meta for automatic revenue attribution.",
    outcome:
      "Campaign set-up time dropped by 70%. The team now identifies top-performing creators in under a minute and replicates winning campaign structures in one click.",
    tags: ["KOL leaderboard", "Campaign tracking", "Shopify integration", "Meta Ads"],
    metric: "70%",
    metricLabel: "faster campaign setup",
    image: "/images/case-studies/kol-leaderboard.jpg",
    imageAlt: "Beauty content creator filming a product review for a campaign",
  },
  {
    id: "ai-sdr",
    client: "B2B software company",
    industry: "SaaS",
    service: "AI Workflow",
    headline: "Automated outbound research and follow-up for the sales team.",
    challenge:
      "Sales reps spent two hours a day researching prospects, drafting personalisation lines, and scheduling follow-ups. Lead response time averaged 26 hours.",
    solution:
      "Built an AI workflow that enriches inbound leads, drafts contextual outreach, and schedules multi-step follow-ups via email and LinkedIn. Handoffs to reps happen only when a prospect replies.",
    outcome:
      "Outbound volume tripled while research time fell by 85%. Average first-response time dropped from 26 hours to under 2 hours.",
    tags: ["AI workflow", "Sales automation", "Lead enrichment", "Email sequencing"],
    metric: "3×",
    metricLabel: "outbound volume, 85% less research",
    image: "/images/case-studies/ai-sdr.jpg",
    imageAlt: "Business professional working on a laptop in a modern office",
  },
  {
    id: "inventory-saas",
    client: "F&B distributor",
    industry: "Food & beverage",
    service: "SaaS Mini Build",
    headline: "Custom inventory tool that replaced three manual trackers.",
    challenge:
      "Stock levels, purchase orders, and supplier lead times lived in separate spreadsheets. Teams reordered based on guesswork, leading to frequent stockouts and over-ordering.",
    solution:
      "Delivered a two-week SaaS mini build with automated reorder suggestions, supplier dashboards, and WhatsApp alerts for low-stock SKUs. Connected to existing accounting software.",
    outcome:
      "Stockouts reduced by 60% and excess inventory by 25%. The operations team now reorders in minutes instead of hours.",
    tags: ["SaaS mini build", "Inventory management", "WhatsApp alerts", "Supplier dashboard"],
    metric: "60%",
    metricLabel: "fewer stockouts",
    image: "/images/case-studies/inventory-saas.jpg",
    imageAlt: "Warehouse worker in a large distribution center",
  },
  {
    id: "marketing-system",
    client: "Financial services firm",
    industry: "Fintech",
    service: "Marketing System",
    headline: "Unified marketing operations from content to compliance approval.",
    challenge:
      "Marketing campaigns required compliance sign-off on every asset. Assets lived in shared drives, feedback was buried in email threads, and launch deadlines slipped weekly.",
    solution:
      "Built a marketing system with content calendars, approval workflows, version control, and a compliance review queue. Assets are automatically routed to the right reviewer based on asset type.",
    outcome:
      "Average campaign launch time improved from 3 weeks to 5 days. Compliance review turnaround dropped by 50%.",
    tags: ["Marketing system", "Approval workflow", "Compliance", "Content calendar"],
    metric: "5 days",
    metricLabel: "to launch — was 3 weeks",
    image: "/images/case-studies/marketing-system.jpg",
    imageAlt: "Marketing team collaborating in a meeting at a modern office",
  },
];
