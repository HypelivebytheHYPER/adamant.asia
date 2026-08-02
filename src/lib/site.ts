/**
 * site.ts — Canonical domain and SEO constants.
 *
 * Single source of truth for the production domain.
 * Import here, not hardcoded, so domain migrations are one-line changes.
 */

export const SITE_URL = "https://adamant.asia";
export const SITE_NAME = "Adamant";
export const OG_IMAGE = `${SITE_URL}/opengraph-image`; // Next.js OG image API

/** Default OG/Twitter image (fallback when no page-specific image) */

/** Company contact */
export const CONTACT_EMAIL = "sam@adamant.asia";

/** Chat links — used instead of displaying a phone number */
export const WHATSAPP_CHAT_URL = "https://wa.me/message/BSROJ4X2IRGOH1";
export const TELEGRAM_CHAT_URL = "https://t.me/sstng";

/** Social profiles for Organization schema */
export const SOCIAL_PROFILES = {
  linkedin: "https://www.linkedin.com/in/sstng",
};
