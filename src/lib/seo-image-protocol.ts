/**
 * SEO Image Alt Text Protocol — Adamant.asia
 *
 * Rule: Every <img> must have an alt attribute. The alt describes what
 * the image *shows*, not what it *is*. Write for someone who cannot see
 * the screen.
 *
 * ─────────────────────────────────────────────────────────────────
 *
 * Category 1: Product / UI Screenshots (demos, mockups, dashboards)
 * Pattern:    "{Product name} interface showing {key feature}"
 * Bad:        "Dashboard screenshot"
 * Good:       "Campaign Hub interface showing influencer pipeline with
 *              live status indicators and weekly performance metrics"
 *
 * Category 2: Portfolio / Case Study Work
 * Pattern:    "{Project name} — {descriptor}. {What user sees in frame}"
 * Bad:        "Project image"
 * Good:       "Social Command Centre — multi-brand scheduling dashboard
 *              displaying post calendar and engagement analytics charts"
 *
 * Category 3: Team / People
 * Pattern:    "{Name}, {role}, {action/context}"
 * Bad:        "Team photo"
 * Good:       "Sarah Kim, Product Designer, reviewing wireframes during
 *              a design critique session"
 *
 * Category 4: Decorative / Presentational
 * Pattern:    alt=""
 * When:       Image adds no information beyond styling or branding.
 *              The surrounding text already communicates everything.
 *
 * Category 5: Icons / Symbols inline with text
 * Pattern:    alt="" + aria-hidden="true"
 * When:       The adjacent text label already communicates the meaning.
 *
 * ─────────────────────────────────────────────────────────────────
 *
 * Style rules:
 *   - Never start with "Image of..." or "Picture of..." (screen readers
 *     already announce it as an image).
 *   - Use sentence case, not Title Case.
 *   - Max ~125 characters (screen reader sentence break).
 *   - Include keywords naturally — do not keyword-stuff.
 *   - For dynamic content, derive alt from data, not hardcode.
 */

/** Helpers — use these instead of inline string concatenation */

export function altScreenshot(
  product: string,
  feature: string
): string {
  return `${product} interface showing ${feature}`;
}

export function altPortfolio(
  project: string,
  descriptor: string,
  visibleContent: string
): string {
  return `${project} — ${descriptor}. ${visibleContent}`;
}

export function altPerson(
  name: string,
  role: string,
  context: string
): string {
  return `${name}, ${role}, ${context}`;
}

export function altDecorative(): "" {
  return "";
}
