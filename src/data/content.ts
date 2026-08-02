export interface SectionContent {
  id: string;
  headline: string;
  subheadline?: string;
  body?: string;
  ctaText?: string;
  ctaLink?: string;
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
  href: string;
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

export const siteContent = {
  sections: {
    hero: {
      id: "hero",
      headline: "AI agency for SaaS Mini Build & Marketing System Solution.",
      body: "We build custom SaaS tools and marketing systems using AI. Two-week delivery. Your team gets a product that runs — not a deck that gathers dust.",
      ctaText: "Book a free 45-minute intro call",
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
      headline: "SaaS Mini Build. Marketing System Solution. AI Agency.",
      subheadline:
        "We are an AI agency that builds real products — not slide decks. SaaS tools that ship in two weeks. Marketing systems that run without you. You get the speed of a product team with the care of a partner.",
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
      headline: "Book your free 45-minute intro call.",
      subheadline:
        "We will map your pain points and show you what is possible. No pitch. No pressure. If we cannot help, we will tell you.",
      ctaText: "Schedule now",
      ctaLink: "#contact",
      enabled: true,
    },
    footer: {
      id: "footer",
      headline: "adamant",
      enabled: true,
    },
  } as Record<string, SectionContent>,

  solutions: [
    {
      icon: "Zap",
      title: "SaaS Mini Build",
      description:
        "Custom SaaS tools built and shipped in two weeks. Internal dashboards, customer-facing apps, or workflow tools — you get working code, not a prototype.",
      href: "/solutions/marketing-strategy",
    },
    {
      icon: "Network",
      title: "Marketing System Solution",
      description:
        "Influencer campaigns, content pipelines, and performance tracking — all in one system that runs without you. From first contact to final report.",
      href: "/solutions/campaign-systems",
    },
    {
      icon: "Compass",
      title: "AI Workflow Automation",
      description:
        "The 40 tasks you repeat every day? Done before you open your laptop. AI workflows that connect the tools you already use. No new apps to learn.",
      href: "/solutions/productivity-ai",
    },
    {
      icon: "Trophy",
      title: "KOL Leaderboard",
      description:
        "Gamified creator rankings with real-time scoring. Track performance across platforms, rank creators by engagement and conversion, and reward top performers automatically.",
      href: "/solutions/kol-leaderboard",
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
    { label: "Home", href: "/" },
    {
      label: "Solutions",
      href: "#solutions",
      children: [
        { label: "SaaS Mini Build", href: "/solutions/marketing-strategy" },
        { label: "Marketing System", href: "/solutions/campaign-systems" },
        { label: "AI Workflows", href: "/solutions/productivity-ai" },
        { label: "KOL Leaderboard", href: "/solutions/kol-leaderboard" },
      ],
    },
    { label: "Process", href: "/#process" },
    { label: "Fraud Watch", href: "/fraud-watch" },
    { label: "Pricing", href: "/pricing" },
    { label: "Founder", href: "/founder" },
    { label: "Contact", href: "/#contact" },
  ] satisfies NavLinkContent[],

  contactInfo: {
    email: "sam@adamant.asia",
    location: "Remote-first",
  } satisfies ContactInfoContent,

  footerNavLinks: [
    { label: "Home", href: "/" },
    { label: "SaaS Mini Build", href: "/solutions/marketing-strategy" },
    { label: "Marketing System", href: "/solutions/campaign-systems" },
    { label: "AI Workflows", href: "/solutions/productivity-ai" },
    { label: "KOL Leaderboard", href: "/solutions/kol-leaderboard" },
    { label: "Process", href: "/#process" },
    { label: "Fraud Watch", href: "/fraud-watch" },
    { label: "Pricing", href: "/pricing" },
    { label: "Founder", href: "/founder" },
    { label: "Contact", href: "/#contact" },
  ] satisfies NavLinkContent[],

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
