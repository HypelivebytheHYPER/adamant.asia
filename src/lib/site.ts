/**
 * site.ts — Canonical domain and SEO constants.
 *
 * Single source of truth for the production domain.
 * Import here, not hardcoded, so domain migrations are one-line changes.
 */

export const SITE_URL = "https://adamant.asia";
export const SITE_NAME = "Adamant";

/** Default OG/Twitter image (fallback when no page-specific image) */
export const OG_IMAGE = `${SITE_URL}/opengraph-image`;

/** Company contact */
export const CONTACT_EMAIL = "sam@adamant.asia";

/** Social profiles for Organization schema */
export const SOCIAL_PROFILES = {
  linkedin: "https://www.linkedin.com/in/sstng",
};
