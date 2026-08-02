/**
 * analytics-ids.ts — Analytics configuration constants.
 *
 * These are PUBLIC env vars (NEXT_PUBLIC_*) used client-side.
 * Set them in Vercel dashboard or .env.local:
 *
 *   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
 *   NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
