/**
 * blog-schema.ts — the contract between Claude and src/data/blog.ts.
 *
 * This mirrors `BlogPostContent` exactly, minus the fields the server owns
 * (slug-independent metadata: publishedAt, author, image). Those are filled in
 * by the cron route so the model can never invent a broken Unsplash ID or
 * mis-attribute authorship.
 *
 * Constraint keywords (min/max/minLength) are deliberately absent — the
 * structured-output JSON Schema subset rejects them. Shape is enforced here,
 * quality thresholds are enforced in `validateGeneratedPost` below.
 */

import { z } from "zod";

export const BLOG_SECTION_TYPES = [
  "why-it-matters",
  "comparison",
  "deep-dive",
  "recommendation",
  "sources",
] as const;

export const GeneratedSectionSchema = z.object({
  type: z.enum(BLOG_SECTION_TYPES),
  heading: z.string().describe("Sentence-case H2. No markdown syntax."),
  paragraphs: z
    .array(z.string())
    .describe("2-4 paragraphs of plain prose. No markdown, no HTML."),
  bullets: z
    .array(z.string())
    .describe("Supporting bullets. Empty array when the section needs none."),
});

export const GeneratedComparisonTableSchema = z.object({
  heading: z.string(),
  headers: z.array(z.string()),
  rows: z
    .array(z.array(z.string()))
    .describe("Each row must have exactly as many cells as there are headers."),
});

export const GeneratedPostSchema = z.object({
  slug: z
    .string()
    .describe("URL slug: lowercase, hyphen-separated, ASCII letters and digits only."),
  title: z.string().describe("Question-as-headline, under 70 characters where possible."),
  directAnswer: z
    .string()
    .describe("2-3 sentences that answer targetQuery outright, quotable standalone."),
  description: z.string().describe("Meta description, 140-160 characters."),
  readTime: z.number().int().describe("Estimated reading time in whole minutes."),
  targetQuery: z.string().describe("The exact search query this post is written to win."),
  keywords: z.array(z.string()),
  sections: z
    .array(GeneratedSectionSchema)
    .describe(
      "In order: why-it-matters, comparison, deep-dive, recommendation, sources."
    ),
  faq: z.array(z.object({ q: z.string(), a: z.string() })),
  comparisonTables: z.array(GeneratedComparisonTableSchema),
  methodology: z
    .string()
    .describe("How the claims were sourced, including the news articles used."),
  relatedPosts: z
    .array(z.string())
    .describe("Slugs chosen only from the existing-slug list given in the prompt."),
  imageAlt: z.string().describe("Descriptive alt text for the article's hero image."),
});

export type GeneratedPost = z.infer<typeof GeneratedPostSchema>;

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Quality gate. The schema guarantees shape; this guarantees the post is
 * actually publishable. Returns the list of problems — empty means good.
 */
export function validateGeneratedPost(
  post: GeneratedPost,
  existingSlugs: string[]
): string[] {
  const problems: string[] = [];

  if (!SLUG_RE.test(post.slug)) {
    problems.push(`slug "${post.slug}" is not a clean lowercase-hyphen slug`);
  }
  if (existingSlugs.includes(post.slug)) {
    problems.push(`slug "${post.slug}" already exists`);
  }
  if (post.title.trim().length < 20) {
    problems.push("title is too short to be a real headline");
  }
  if (post.directAnswer.trim().length < 80) {
    problems.push("directAnswer is too short to stand alone as an answer");
  }
  if (post.description.trim().length < 80) {
    problems.push("description is too short for a meta description");
  }
  if (post.keywords.length < 3) {
    problems.push("fewer than 3 keywords");
  }
  if (post.sections.length < 3) {
    problems.push(`only ${post.sections.length} sections; need at least 3`);
  }
  post.sections.forEach((s, i) => {
    if (s.paragraphs.length === 0) {
      problems.push(`section ${i} ("${s.heading}") has no paragraphs`);
    }
  });
  if (post.faq.length < 3) {
    problems.push(`only ${post.faq.length} FAQ entries; need at least 3`);
  }
  post.comparisonTables.forEach((t, i) => {
    const bad = t.rows.findIndex((r) => r.length !== t.headers.length);
    if (bad !== -1) {
      problems.push(
        `comparisonTables[${i}] row ${bad} has ${t.rows[bad].length} cells but ${t.headers.length} headers`
      );
    }
  });
  post.relatedPosts.forEach((slug) => {
    if (!existingSlugs.includes(slug)) {
      problems.push(`relatedPosts references unknown slug "${slug}"`);
    }
  });
  if (post.readTime < 1 || post.readTime > 60) {
    problems.push(`readTime ${post.readTime} is out of range`);
  }

  return problems;
}
