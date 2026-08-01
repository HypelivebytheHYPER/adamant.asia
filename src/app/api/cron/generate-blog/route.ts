/**
 * GET /api/cron/generate-blog
 *
 * Auto-blog generator. Runs on the Vercel cron declared in vercel.json.
 *
 *   1. Authenticate the caller against CRON_SECRET.
 *   2. Pull recent data-fraud coverage from NewsAPI (NEWS_API_KEY).
 *   3. Ask Claude for a full BlogPostContent-shaped post (ANTHROPIC_API_KEY).
 *   4. Validate it, then commit it into src/data/generated-posts.json on main
 *      via the GitHub Contents API (GITHUB_TOKEN) — which triggers a Vercel
 *      rebuild and publishes the post immediately, with no review gate.
 *
 * Every failure mode returns a non-2xx with a machine-readable `step` field so
 * a silently-broken cron shows up in Vercel logs instead of quietly no-opping.
 *
 * Manual run:
 *   curl -H "Authorization: Bearer $CRON_SECRET" https://adamant.asia/api/cron/generate-blog
 *   ...add ?dryRun=1 to generate and validate without committing.
 */

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { getAllPosts, type BlogPostContent } from "@/data/blog";
import {
  GeneratedPostSchema,
  validateGeneratedPost,
  type GeneratedPost,
} from "@/lib/blog-schema";
import { fetchNewsArticles, NewsError, type NewsArticle } from "@/lib/news";
import {
  getRepoFile,
  putRepoFile,
  GitHubError,
  REPO_OWNER,
  REPO_NAME,
  REPO_BRANCH,
} from "@/lib/github-repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const GENERATED_POSTS_PATH = "src/data/generated-posts.json";

const AUTHOR: BlogPostContent["author"] = {
  name: "Samantha Tng",
  slug: "samantha-tng",
  role: "Founder, Adamant",
  bio: "Built 40+ SaaS tools and marketing systems for teams in Southeast Asia. Former growth lead turned product builder.",
};

/**
 * Hero images. Hand-picked real Unsplash IDs — the model is never asked to
 * invent one, because a hallucinated ID renders as a broken <Image>. Only
 * images.unsplash.com is allowed by next.config.ts remotePatterns.
 */
const HERO_IMAGES = [
  {
    unsplashId: "photo-1551288049-bebda4e38f71",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    unsplashId: "photo-1518186285589-2f7649de83e0",
    url: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    unsplashId: "photo-1526374965328-7f61d4dc18c5",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    unsplashId: "photo-1460925895917-afdab827c52f",
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    unsplashId: "photo-1614064641938-3bbee52942c7",
    url: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    unsplashId: "photo-1451187580459-43490279c0fa",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

/** Stable per-slug pick so re-running never reshuffles existing art. */
function pickHeroImage(slug: string) {
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return HERO_IMAGES[hash % HERO_IMAGES.length];
}

function fail(step: string, error: string, status: number, detail?: unknown) {
  console.error(`[generate-blog] ${step}: ${error}`, detail ?? "");
  return NextResponse.json(
    { ok: false, step, error, detail: detail ?? null },
    { status }
  );
}

function buildPrompt(
  articles: NewsArticle[],
  existingPosts: BlogPostContent[],
  today: string
): string {
  const sources = articles
    .map(
      (a, i) =>
        `${i + 1}. "${a.title}" — ${a.source}, ${a.publishedAt.slice(0, 10)}\n   ${a.url}\n   ${a.description}`
    )
    .join("\n");

  const existing = existingPosts
    .map((p) => `- ${p.slug} — "${p.title}" (targets: ${p.targetQuery})`)
    .join("\n");

  return `You write for Adamant (https://adamant.asia), a Southeast Asia agency that builds SaaS tools and marketing systems. Adamant's editorial angle is data fraud: ad fraud, click fraud, bot traffic, attribution fraud, and the gap between what marketing dashboards report and what actually happened.

Today is ${today}.

Write ONE new blog post grounded in the recent coverage below. Do not summarise the news — use it as evidence for a durable, practical answer a business owner can act on.

RECENT COVERAGE
${sources}

POSTS THAT ALREADY EXIST — pick a genuinely different angle, do not overlap these:
${existing}

REQUIREMENTS
- Title is a question a real person would type into a search engine or ask an AI assistant.
- directAnswer answers that question completely in 2-3 sentences, quotable on its own with no surrounding context.
- Sections in this order, one each: why-it-matters, comparison, deep-dive, recommendation, sources. Each has 2-4 substantial paragraphs of plain prose — no markdown syntax, no headings inside paragraphs, no bullet characters.
- Include at least one comparison table with concrete, specific rows. Every row must have exactly as many cells as there are headers.
- 5-8 FAQ entries, each a question someone actually asks, each answered in 2-4 sentences.
- The "sources" section and the methodology field must name the outlets and dates above. Cite only those sources. Never invent a statistic, a study, a dollar figure, or a percentage that is not in the coverage above — if you do not have a number, describe the mechanism instead.
- relatedPosts: choose 2-3 slugs, ONLY from the existing-slug list above.
- Write for someone spending real money on ads. Direct, concrete, no hype, no filler transitions, no "in today's fast-paced world".`;
}

export async function GET(request: NextRequest) {
  const started = Date.now();

  // 1 ── auth ───────────────────────────────────────────────────────────────
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return fail("auth", "CRON_SECRET is not configured", 500);
  }
  if (request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return fail("auth", "Unauthorized", 401);
  }

  const newsApiKey = process.env.NEWS_API_KEY;
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
  const githubToken = process.env.GITHUB_TOKEN;
  const dryRun = request.nextUrl.searchParams.get("dryRun") === "1";

  const missing = [
    !newsApiKey && "NEWS_API_KEY",
    !anthropicApiKey && "ANTHROPIC_API_KEY",
    !githubToken && !dryRun && "GITHUB_TOKEN",
  ].filter(Boolean);
  if (missing.length > 0) {
    return fail("config", `Missing env vars: ${missing.join(", ")}`, 500);
  }

  // 2 ── topics ─────────────────────────────────────────────────────────────
  let articles: NewsArticle[];
  try {
    articles = await fetchNewsArticles(newsApiKey!);
  } catch (err) {
    if (err instanceof NewsError) {
      return fail("news", err.message, 502, err.body.slice(0, 500));
    }
    return fail("news", "News fetch threw", 502, String(err));
  }

  // 3 ── generate ───────────────────────────────────────────────────────────
  const existingPosts = getAllPosts();
  const existingSlugs = existingPosts.map((p) => p.slug);
  const today = new Date().toISOString().slice(0, 10);

  const client = new Anthropic({ apiKey: anthropicApiKey });
  let generated: GeneratedPost;

  try {
    const response = await client.messages.parse({
      model: "claude-opus-5",
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      messages: [
        { role: "user", content: buildPrompt(articles, existingPosts, today) },
      ],
      output_config: {
        format: zodOutputFormat(GeneratedPostSchema),
        effort: "high",
      },
    });

    if (response.stop_reason === "refusal") {
      return fail("generate", "Model declined to generate this post", 502);
    }
    if (!response.parsed_output) {
      return fail(
        "generate",
        `No parsed output (stop_reason: ${response.stop_reason})`,
        502
      );
    }
    generated = response.parsed_output;
  } catch (err) {
    if (err instanceof Anthropic.BadRequestError) {
      return fail("generate", "Bad request to Claude API", 500, err.message);
    }
    if (err instanceof Anthropic.RateLimitError) {
      return fail("generate", "Claude API rate limited", 429, err.message);
    }
    if (err instanceof Anthropic.APIConnectionError) {
      return fail("generate", "Could not reach Claude API", 502, err.message);
    }
    if (err instanceof Anthropic.APIError) {
      return fail("generate", "Claude API error", 502, err.message);
    }
    return fail("generate", "Generation threw", 500, String(err));
  }

  // 4 ── validate ───────────────────────────────────────────────────────────
  const problems = validateGeneratedPost(generated, existingSlugs);
  if (problems.length > 0) {
    return fail("validate", "Generated post failed quality gate", 422, problems);
  }

  const hero = pickHeroImage(generated.slug);
  const { imageAlt, ...rest } = generated;
  const post: BlogPostContent = {
    ...rest,
    publishedAt: today,
    modifiedAt: today,
    author: AUTHOR,
    image: { url: hero.url, alt: imageAlt, unsplashId: hero.unsplashId },
  };

  if (dryRun) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      sourcesUsed: articles.length,
      elapsedMs: Date.now() - started,
      post,
    });
  }

  // 5 ── commit ─────────────────────────────────────────────────────────────
  try {
    const file = await getRepoFile(GENERATED_POSTS_PATH, githubToken!);

    let current: BlogPostContent[];
    try {
      current = JSON.parse(file.text) as BlogPostContent[];
    } catch {
      return fail(
        "commit",
        `${GENERATED_POSTS_PATH} on ${REPO_BRANCH} is not valid JSON — refusing to overwrite`,
        500
      );
    }
    if (!Array.isArray(current)) {
      return fail("commit", `${GENERATED_POSTS_PATH} is not a JSON array`, 500);
    }
    // Re-check against the branch, not just the deployed bundle.
    if (current.some((p) => p.slug === post.slug)) {
      return fail("commit", `slug "${post.slug}" already on ${REPO_BRANCH}`, 409);
    }

    const next = JSON.stringify([...current, post], null, 2) + "\n";
    const { commitSha, commitUrl } = await putRepoFile(
      GENERATED_POSTS_PATH,
      next,
      file.sha,
      `content(blog): add "${post.title}"\n\nAuto-generated from ${articles.length} news sources on ${today}.`,
      githubToken!
    );

    console.log(
      `[generate-blog] published ${post.slug} -> ${commitSha} (${Date.now() - started}ms)`
    );

    return NextResponse.json({
      ok: true,
      slug: post.slug,
      title: post.title,
      url: `https://adamant.asia/blog/${post.slug}`,
      repo: `${REPO_OWNER}/${REPO_NAME}@${REPO_BRANCH}`,
      commitSha,
      commitUrl,
      totalGenerated: current.length + 1,
      sourcesUsed: articles.length,
      elapsedMs: Date.now() - started,
    });
  } catch (err) {
    if (err instanceof GitHubError) {
      // 409 = someone else committed between our read and write. Next run wins.
      return fail("commit", err.message, err.status === 409 ? 409 : 502, err.body.slice(0, 500));
    }
    return fail("commit", "Commit threw", 500, String(err));
  }
}
