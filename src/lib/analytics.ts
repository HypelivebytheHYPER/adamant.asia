/**
 * analytics.ts — GA4 / GTM event tracking for adamant.asia
 *
 * Single source of truth for all analytics events.
 * Uses dataLayer for GTM compatibility + direct gtag for GA4 fallback.
 */

// ─── Types ───────────────────────────────────────────────────────────

export type GAEventName =
  | "page_view"
  | "generate_lead"
  | "contact_form_submit"
  | "contact_form_success"
  | "cta_click"
  | "whatsapp_click"
  | "email_click"
  | "scroll_depth"
  | "outbound_click"
  | "file_download";

export interface GAEventParams {
  [key: string]: string | number | boolean | undefined;
}

// ─── Environment ─────────────────────────────────────────────────────

const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // e.g. G-XXXXXXXXXX
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID; // e.g. GTM-XXXXXX

/** True when either GA4 or GTM is configured */
export const isAnalyticsEnabled = Boolean(GA_ID || GTM_ID);

// ─── Core Event Emitter ──────────────────────────────────────────────

/**
 * Push an event to dataLayer (GTM) and/or gtag (GA4).
 * Safe to call on server — no-ops when window is absent.
 */
export function trackEvent(
  eventName: GAEventName,
  params: GAEventParams = {}
): void {
  if (typeof window === "undefined") return;

  // 1. dataLayer push (GTM)
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }

  // 2. Direct gtag (GA4 standalone)
  if (window.gtag && GA_ID) {
    window.gtag("event", eventName, {
      send_to: GA_ID,
      ...params,
    });
  }

  // Debug log in development
  if (process.env.NODE_ENV === "development") {
     
    console.log("[analytics]", eventName, params);
  }
}

// ─── Convenience Helpers ─────────────────────────────────────────────

/** Track a CTA button click with location context */
export function trackCTA(
  label: string,
  location: string,
  extra?: GAEventParams
): void {
  trackEvent("cta_click", {
    cta_label: label,
    cta_location: location,
    ...extra,
  });
}

/** Track contact form submission start */
export function trackFormSubmit(source: string): void {
  trackEvent("contact_form_submit", { form_source: source });
}

/** Track successful contact form submission */
export function trackFormSuccess(source: string): void {
  trackEvent("contact_form_success", { form_source: source });
  // Also fire generate_lead for GA4 conversion counting
  trackEvent("generate_lead", {
    lead_source: source,
    currency: "USD",
    value: 1,
  });
}

/** Track WhatsApp click */
export function trackWhatsAppClick(location: string): void {
  trackEvent("whatsapp_click", { click_location: location });
}

/** Track email click */
export function trackEmailClick(location: string): void {
  trackEvent("email_click", { click_location: location });
}

/** Track scroll depth milestone (50%, 90%, 100%) */
export function trackScrollDepth(depth: number): void {
  trackEvent("scroll_depth", { depth_percent: depth });
}

/** Track outbound link click */
export function trackOutboundClick(url: string, label?: string): void {
  trackEvent("outbound_click", {
    outbound_url: url,
    link_label: label || url,
  });
}

// ─── Global Declarations ─────────────────────────────────────────────

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (
      command: "config" | "event" | "js" | "consent",
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}
