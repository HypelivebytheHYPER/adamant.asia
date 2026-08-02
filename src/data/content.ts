export interface SectionContent {
  id: string;
  headline: string;
  subheadline?: string;
  body?: string;
  ctaText?: string;
  ctaLink?: string;
  cta2Text?: string;
  cta2Link?: string;
  tag?: string;
  enabled: boolean;
}

export interface TestimonialContent {
  name: string;
  industry: string;
  before: string;
  after: string;
  quote: string;
}

export interface StatContent {
  value: string;
  label: string;
}

export interface ProcessPhaseContent {
  num: string;
  title: string;
  detail: string;
  icon: string;
}

export interface SolutionContent {
  icon: string;
  title: string;
  description: string;
  subtitle: string;
  detail: string;
  href: string;
  pills: string[];
  screen: "saas" | "marketing" | "aiworkflow" | "kol";
}

export interface MarqueeItemContent {
  text: string;
  isSeparator: boolean;
}

export interface NavLinkContent {
  label: string;
  href: string;
  children?: NavLinkContent[];
}

export interface ContactInfoContent {
  email: string;
  location: string;
}

export interface FAQItemContent {
  q: string;
  a: string;
}

export interface ServicePageContent {
  slug: string;
  name: string;
  headline: string;
  hook: string;
  body: string;
  useCases: { title: string; description: string }[];
  process: { num: string; title: string; detail: string }[];
  faq: FAQItemContent[];
  testimonialIds: number[]; // indices into testimonials array
}

export interface PracticeContent {
  tag: string;
  headline: string;
  body: string;
  tags: string[];
  href: string;
  accent: "teal" | "amber";
}

export interface VerifyServiceContent {
  num: string;
  title: string;
  body: string;
}

export interface TrustItemContent {
  title: string;
  body: string;
}

export interface VerifyDarkContent {
  tag: string;
  headline: string;
  body: string;
  badges: string[];
  ctaText: string;
  ctaLink: string;
  services: VerifyServiceContent[];
  trust: TrustItemContent[];
}

export interface VerifyProcessStepContent {
  num: string;
  title: string;
  detail: string;
}

export interface VerifyProcessContent {
  tag: string;
  headline: string;
  body: string;
  phases: VerifyProcessStepContent[];
}

export const siteContent = {
  sections: {
    hero: {
      id: "hero",
      tag: "Singapore · Southeast Asia",
      headline: "In Southeast Asia, the right partnerships start with the right intelligence.",
      body: "Adamant brings KYC, AML, and AI expertise under one advisory roof — so you can verify before you commit, and build the systems to move after you do.",
      ctaText: "Explore Adamant Verify",
      ctaLink: "/verify",
      cta2Text: "Explore Adamant AI",
      cta2Link: "/ai",
      enabled: true,
    },
    aiHero: {
      id: "ai-hero",
      tag: "Adamant AI — Singapore",
      headline: "AI tools built for your workflow.",
      body: "A Singapore AI agency that builds custom SaaS tools, marketing systems and AI workflow automation — scoped in one call, built in one sprint, handed over with full source code.",
      ctaText: "Book a scope call",
      ctaLink: "#contact",
      enabled: true,
    },
    problem: {
      id: "problem",
      headline: "When was the last time you...",
      enabled: true,
    },
    solutions: {
      id: "solutions",
      headline: "What we build.",
      subheadline:
        "Three ways we help teams move faster. Pick what you need — or start with a scope call and we will tell you what fits.",
      enabled: true,
    },
    process: {
      id: "process",
      headline: "From first call to live system.",
      subheadline:
        "No six-month roadmap. No surprise invoices. Just a clear path from broken to running.",
      enabled: true,
    },
    model: {
      id: "model",
      headline: "Adamant AI Business Solutions — Singapore",
      subheadline:
        "Real working AI systems built in two weeks. SaaS mini builds, marketing systems, AI workflow automation and KOL leaderboards — custom-built for Singapore operations with fixed pricing and full source code handover.",
      ctaText: "Explore Adamant AI Business Solutions",
      ctaLink: "/ai",
      enabled: true,
    },
    proof: {
      id: "proof",
      headline: "What changed.",
      subheadline: "Before and after — in their own words.",
      enabled: true,
    },
    contact: {
      id: "contact",
      tag: "Engage us",
      headline: "Start a conversation.",
      subheadline:
        "All enquiries are handled in strict confidence. Tell us what you need — and which practice you are reaching out about. We reply within 24 hours.",
      ctaText: "Send Message",
      ctaLink: "#contact",
      enabled: true,
    },
    footer: {
      id: "footer",
      headline: "adamant",
      enabled: true,
    },
  } as Record<string, SectionContent>,

  homePractices: {
    verify: {
      tag: "Adamant Verify",
      headline: "Singapore KYC, KYB & AML screening. Know who you are dealing with.",
      body: "Background checks, KYC/KYB verification, AML screening and ongoing counterparty monitoring — delivered as a named, concierge engagement for businesses operating in Singapore and across Southeast Asia.",
      tags: ["KYC / KYB", "AML Screening", "Monitoring"],
      href: "/verify",
      accent: "amber",
    },
    ai: {
      tag: "Adamant AI Business Solutions",
      headline: "Singapore AI agency. Tools built to run without you.",
      body: "Custom SaaS development, marketing systems and AI workflow automation for Singapore companies — scoped in one call, built in one sprint, handed over with full documentation and source code.",
      tags: ["SaaS Build", "AI Workflow", "Marketing Systems"],
      href: "/ai",
      accent: "teal",
    },
  } satisfies Record<string, PracticeContent>,

  verifyDark: {
    tag: "Adamant Verify — Singapore & Southeast Asia",
    headline: "Clarity before commitment. Discretion when it matters most.",
    body: "Without verified counterparties, the cost of a wrong partnership in high-growth markets can be severe. Adamant Verify provides Singapore-based KYC services, KYB verification, AML screening, custom due diligence reports and subscription-based monitoring — with a named relationship manager at every step.",
    badges: ["Powered by Sumsub", "Enterprise Verification", "Compliance", "PDPA Compliant", "Singapore"],
    ctaText: "Request a Consultation",
    ctaLink: "#contact",
    services: [
      {
        num: "01",
        title: "Background Checks & Identity Verification",
        body: "Singapore KYC services for individuals and KYB verification for companies, directors and beneficial owners. Includes AML screening, sanctions checks and PEP screening — delivered as a named engagement, not a self-serve portal.",
      },
      {
        num: "02",
        title: "Due Diligence Reports",
        body: "Custom due diligence reports for Singapore and Southeast Asia counterparties. Beyond raw data — structured narratives with adverse media, reputational checks and actionable recommendations for your specific risk question.",
      },
      {
        num: "03",
        title: "Monitoring Subscription",
        body: "Continuous counterparty vigilance. Automated re-screening at agreed intervals with alert-based notifications on material changes. Monthly or quarterly summary reports managed by your named contact.",
      },
    ],
    trust: [
      {
        title: "Concierge",
        body: "Named relationship manager. No ticketing systems, no automated responses, no self-serve portal.",
      },
      {
        title: "Discreet",
        body: "All engagements handled in strict confidence. Singapore-headquartered, PDPA-compliant operations.",
      },
      {
        title: "Actionable",
        body: "We do not deliver raw data. Every report comes with structured recommendations and a follow-up conversation.",
      },
    ],
  } satisfies VerifyDarkContent,


  verifyProcess: {
    tag: "The Verify Process",
    headline: "From intake to intelligence.",
    body: "Every Adamant Verify engagement follows a structured, confidential process. Nothing begins without a signed scope. Nothing is delivered without a follow-up conversation.",
    phases: [
      {
        num: "01",
        title: "Intake Consultation",
        detail: "You brief us on the subject, the relationship, and the risk question you need answered. We advise on the appropriate check scope — KYC, KYB, AML, or full due diligence — and confirm whether the engagement is within our coverage for the region.",
      },
      {
        num: "02",
        title: "Engagement Agreement",
        detail: "We issue a fixed-scope proposal with a clear fee, timeline, and mutual NDA. No work begins — and no data is collected — without written sign-off from both parties. All engagements are PDPA-compliant by design.",
      },
      {
        num: "03",
        title: "Verification & Screening",
        detail: "Powered by Sumsub's enterprise infrastructure, we run identity verification, entity checks, AML and sanctions screening, and adverse media analysis in parallel. All data handling complies with Singapore PDPA obligations. Your named manager oversees every stage.",
      },
      {
        num: "04",
        title: "Intelligence Report",
        detail: "We deliver a structured narrative report — not a raw data export. Findings are organised by risk indicator, supported by source references, and concluded with actionable recommendations specific to your business context. A debrief call is included with every report.",
      },
      {
        num: "05",
        title: "Ongoing Monitoring",
        detail: "Optional subscription-based re-screening at agreed intervals. Your named manager handles every alert, update, and summary report. Monitoring can begin immediately after your first engagement closes.",
      },
    ],
  } satisfies VerifyProcessContent,


  solutions: [
    {
      icon: "Zap",
      title: "SaaS Mini Build",
      description: "Custom SaaS development in Singapore. Tools shipped in two weeks, full source included.",
      subtitle: "Custom SaaS development for Singapore companies. You get working code, not a prototype.",
      detail: "We scope in one call, build in one sprint, and hand over deployable code with documentation. Most projects start at SGD 13,000.",
      href: "/solutions/marketing-strategy",
      pills: ["2-week sprint", "Full source code", "React + Node"],
      screen: "saas",
    },
    {
      icon: "Network",
      title: "Marketing System",
      description: "Influencer and KOL marketing systems for Singapore brands. Pipelines and campaign tracking, end-to-end.",
      subtitle: "Influencer campaigns, KOL pipelines and performance tracking — all in one system.",
      detail: "From first contact to final report. We set up the pipeline, automate the repetitive parts, and train your team to run it independently.",
      href: "/solutions/campaign-systems",
      pills: ["End-to-end pipeline", "Team training", "Lark + Meta"],
      screen: "marketing",
    },
    {
      icon: "Compass",
      title: "AI Workflow Automation",
      description: "AI workflow automation for Singapore teams. 40+ daily manual tasks automated before you open your laptop.",
      subtitle: "The 40 tasks you repeat every day? Done before you open your laptop.",
      detail: "No new apps to learn. No disruption. Just the manual work you hate, handled automatically — with full visibility and control.",
      href: "/solutions/productivity-ai",
      pills: ["Zero new tools", "Full audit trail", "OpenAI + Lark"],
      screen: "aiworkflow",
    },
  ] satisfies SolutionContent[],

  testimonials: [
    {
      name: "Thida",
      industry: "Manufacturing",
      before: "20 questions a day",
      after: "Silence",
      quote: "I stopped answering questions and started building again.",
    },
    {
      name: "Min",
      industry: "Retail",
      before: "3 months, no system",
      after: "Moving in 3 days",
      quote: "We had a working prototype in three days. Not three months.",
    },
    {
      name: "Sarin",
      industry: "Education",
      before: "$15K quote, unused",
      after: "Fixed in one week",
      quote: "They fixed what was actually broken. Nothing more.",
    },
    {
      name: "Ploy",
      industry: "Hospitality",
      before: "Orders in 3 notebooks",
      after: "Fully handled",
      quote: "No more lost orders.",
    },
  ] satisfies TestimonialContent[],

  stats: [
    { value: "47", label: "teams, off the hook" },
    { value: "2 weeks", label: "from call to live" },
    { value: "30 days", label: "gratis support" },
    { value: "0", label: "status meetings" },
  ] satisfies StatContent[],

  processPhases: [
    {
      num: "01",
      title: "45-minute intro call.",
      detail: "We map your pain points. You see what is possible. If we are a fit, we move to discovery.",
      icon: "Map",
    },
    {
      num: "02",
      title: "Paid discovery.",
      detail: "Fixed-scope plan with clear deliverables, timeline, and cost. You know exactly what you get before we build.",
      icon: "PenTool",
    },
    {
      num: "03",
      title: "Build + tweak.",
      detail: "Two-week sprint. Daily updates. Weekly demos. You watch it come alive and adjust as we go.",
      icon: "Hammer",
    },
    {
      num: "04",
      title: "Deploy.",
      detail: "System goes live. Your team trained. 30 days of support included. Handoff complete.",
      icon: "Rocket",
    },
  ] satisfies ProcessPhaseContent[],

  marqueeItems: [
    { text: "Built to save time.", isSeparator: false },
    { text: "•", isSeparator: true },
    { text: "Agency care. Product speed.", isSeparator: false },
    { text: "•", isSeparator: true },
    { text: "The work you hate, handled.", isSeparator: false },
    { text: "•", isSeparator: true },
    { text: "Two weeks. Not two quarters.", isSeparator: false },
    { text: "•", isSeparator: true },
  ] satisfies MarqueeItemContent[],

  navLinks: [
    { label: "Adamant Verify", href: "/verify" },
    { label: "Adamant AI", href: "/ai" },
    {
      label: "About",
      href: "/about",
      children: [
        { label: "About Adamant", href: "/about" },
        { label: "Founder", href: "/founder" },
      ],
    },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Insights", href: "/insights" },
    { label: "Engage Us", href: "/contact" },
  ] satisfies NavLinkContent[],

  contactInfo: {
    email: "sam@adamant.asia",
    location: "7 Temasek Boulevard, #12-07, Suntec Tower One, Singapore 038987",
  } satisfies ContactInfoContent,

  faq: [
    {
      q: "What exactly do you build?",
      a: "Custom SaaS tools and marketing systems powered by AI. Internal dashboards, customer portals, campaign pipelines, workflow automation — whatever your team needs to move faster. You get working code, not a prototype.",
    },
    {
      q: "How much does it cost?",
      a: "Most projects run between $3,000 and $8,000 depending on scope. We map it together in the intro call. No discovery fees. No hidden costs.",
    },
    {
      q: "What is the paid discovery step?",
      a: "Before we build anything, we spend 1–2 days mapping your exact needs and deliver a fixed-scope plan with timeline and cost. You pay a small fee for this plan. If you proceed, it is credited toward the build.",
    },
    {
      q: "What if it doesn't work for us?",
      a: "You see it working before it goes live. Weekly demos, daily updates. If it doesn't fit, we adjust until it does.",
    },
    {
      q: "What happens after 30 days?",
      a: "Your team knows how to run it. The system is built to not need us. But if something breaks or you want to expand, we are one email away.",
    },
  ] satisfies FAQItemContent[],

  servicePages: [
    {
      slug: "marketing-strategy",
      name: "SaaS Mini Build",
      headline: "SaaS Mini Build",
      hook: "Custom SaaS tools built and shipped in two weeks. Internal dashboards, customer-facing apps, or workflow tools — you get working code, not a prototype.",
      body: "We build real SaaS products — not prototypes, not MVPs that never ship. Internal dashboards, customer portals, workflow tools, or marketing apps. Two weeks from scope to live. You own the codebase. We train your team. Then we leave you alone.",
      useCases: [
        {
          title: "Internal operations dashboard",
          description:
            "A custom dashboard that pulls data from all your tools and shows what matters. Orders, leads, inventory, team workload — one screen instead of five tabs.",
        },
        {
          title: "Customer-facing portal",
          description:
            "Let your customers track orders, submit requests, or manage their account — without you building a full product team.",
        },
        {
          title: "Workflow automation engine",
          description:
            "Rules that move data between tools automatically. Approvals, notifications, routing — built as code that runs on its own.",
        },
      ],
      process: [
        {
          num: "01",
          title: "Scope the build.",
          detail: "We map what the tool needs to do, who uses it, and what it connects to.",
        },
        {
          num: "02",
          title: "Build the product.",
          detail: "Two weeks of focused development. Daily updates. Weekly demos.",
        },
        {
          num: "03",
          title: "Ship and hand off.",
          detail: "Deploy, train your team, and document the system. You own it.",
        },
      ],
      faq: [
        {
          q: "What tech stack do you use?",
          a: "We match your needs — Next.js, React, Python, or no-code/low-code where it fits. We will recommend what makes sense for your timeline and budget.",
        },
        {
          q: "Do we own the code?",
          a: "Yes. Full source code, documentation, and deployment rights. No vendor lock-in.",
        },
        {
          q: "What if we need changes after launch?",
          a: "We include a 30-day support window. After that, your team can maintain it or we can extend support.",
        },
      ],
      testimonialIds: [0, 2],
    },
    {
      slug: "campaign-systems",
      name: "Marketing System Solution",
      headline: "Marketing System Solution",
      hook: "Influencer campaigns, content pipelines, and performance tracking — all in one system that runs without you.",
      body: "One system. Every campaign. Every influencer. Every piece of content. From planning to publish to report — your marketing flows while you focus on the creative.",
      useCases: [
        {
          title: "Campaign planning to execution",
          description:
            "Brief → budget → timeline → publish → report. Every step tracked, every deadline visible, nothing forgotten.",
        },
        {
          title: "KOL / influencer pipeline",
          description:
            "From outreach to contract to content approval to payment — every step visible, every handoff automatic.",
        },
        {
          title: "Content and performance tracking",
          description:
            "Real-time dashboards showing what content is working, what is not, and where the budget is going. Decisions made with data.",
        },
      ],
      process: [
        {
          num: "01",
          title: "Map your marketing flow.",
          detail: "We document every step from plan to publish to report.",
        },
        {
          num: "02",
          title: "Build the system.",
          detail: "One dashboard connecting campaigns, content, approvals, and performance.",
        },
        {
          num: "03",
          title: "Run marketing without chaos.",
          detail: "Your team sees status at a glance. Automations handle the rest.",
        },
      ],
      faq: [
        {
          q: "Which platforms do you integrate with?",
          a: "LINE, WhatsApp, Lark, Instagram, TikTok, Shopify, and most major tools. If it has an API, we can connect it.",
        },
        {
          q: "Can it handle hundreds of influencers?",
          a: "Yes. The system scales with your volume. We have built pipelines managing 200+ KOLs.",
        },
        {
          q: "How is this different from a marketing agency?",
          a: "Agencies run campaigns for you. We build the system that runs campaigns with you. You own it.",
        },
      ],
      testimonialIds: [1, 3],
    },
    {
      slug: "productivity-ai",
      name: "AI Workflow Automation",
      headline: "AI Workflow Automation",
      hook: "The 40 tasks you repeat every day? Done before you open your laptop. AI workflows that connect the tools you already use.",
      body: "We build AI-powered workflows that connect the tools you already use. No new apps to learn. No disruption. Just the manual work you hate, handled automatically.",
      useCases: [
        {
          title: "Auto-routing inquiries",
          description:
            'Customer messages from LINE, WhatsApp, or email automatically reach the right person. No more forwarding. No more "who handles this?"',
        },
        {
          title: "Reports that write themselves",
          description:
            "Daily, weekly, or monthly reports pulled from your data and delivered to your inbox. No copy-paste. No spreadsheet wrestling.",
        },
        {
          title: "Approval workflows that move",
          description:
            "Documents, budgets, or requests route to the right approver and follow up automatically. No chasing signatures. No lost paperwork.",
        },
      ],
      process: [
        {
          num: "01",
          title: "Map your repeated tasks.",
          detail: "We identify the manual work eating your team's time.",
        },
        {
          num: "02",
          title: "Connect your tools.",
          detail: "We wire together Lark, LINE, Sheets, Gmail, or whatever you use.",
        },
        {
          num: "03",
          title: "Watch it run.",
          detail: "Two weeks later, the work finishes before you open it.",
        },
      ],
      faq: [
        {
          q: "Do we need to switch apps?",
          a: "No. We connect what you already use. The AI lives between your tools, not as another app to learn.",
        },
        {
          q: "How long does it take?",
          a: "Most workflows go live in two weeks. Complex ones may take three.",
        },
        {
          q: "What if our process changes?",
          a: "The system is built to adjust. We include tweaks during the 30-day support period.",
        },
      ],
      testimonialIds: [0, 3],
    },
    {
      slug: "kol-leaderboard",
      name: "KOL Leaderboard",
      headline: "KOL Leaderboard",
      hook: "Gamified creator rankings with real-time scoring. Track performance across platforms, rank creators by engagement and conversion, and reward top performers automatically.",
      body: "A live leaderboard system that tracks influencer and creator performance across TikTok, Instagram, and YouTube. Real-time rankings, automated scoring, and transparent rewards — your creators know exactly where they stand and what they need to do to win.",
      useCases: [
        {
          title: "Multi-platform creator tracking",
          description:
            "Connect TikTok, Instagram, YouTube, and LINE accounts. One dashboard showing every creator's content, engagement, and conversion across all channels.",
        },
        {
          title: "Automated engagement scoring",
          description:
            "Set your own scoring rules — views, likes, shares, comments, conversions. The system calculates scores in real time. No spreadsheets. No manual counting.",
        },
        {
          title: "Reward tier management",
          description:
            "Define prize tiers and thresholds. Top 10 gets prize A, top 3 gets prize B. The system tracks who qualifies and when. Automatic notifications when someone hits a tier.",
        },
      ],
      process: [
        {
          num: "01",
          title: "Connect your creators.",
          detail: "We import your creator list and link their social accounts. One CSV upload or API connection — done in minutes.",
        },
        {
          num: "02",
          title: "Set scoring rules.",
          detail: "Define what counts: views, engagement rate, conversions, or a custom formula. You control the weights. The leaderboard updates automatically.",
        },
        {
          num: "03",
          title: "Launch and reward.",
          detail: "Share the leaderboard link with your creators. They see real-time rankings. You see who is winning. Prizes are distributed based on live data.",
        },
      ],
      faq: [
        {
          q: "Which platforms does it track?",
          a: "TikTok, Instagram, YouTube, Facebook, and LINE. If a platform has public metrics, we can pull them. Private accounts require creator consent.",
        },
        {
          q: "How is the score calculated?",
          a: "You set the formula. Default is a weighted mix of views (30%), engagement rate (40%), and conversions (30%). Adjust sliders in the admin panel anytime.",
        },
        {
          q: "Can creators see their own ranking?",
          a: "Yes. Each creator gets a private link showing their position, score breakdown, and what they need to improve to move up. No one sees others' private data.",
        },
      ],
      testimonialIds: [1, 3],
    },
  ] satisfies ServicePageContent[],

  pipelineNodes: [
    { id: "intro", label: "Intro" },
    { id: "discovery", label: "Discovery" },
    { id: "build", label: "Build" },
    { id: "deploy", label: "Deploy" },
  ] satisfies { id: string; label: string }[],
};
