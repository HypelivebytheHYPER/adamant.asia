"use client";

/**
 * Platform logos — clean SVG marks for tools Adamant integrates with.
 * Used in the TrustedBy marquee and potentially elsewhere.
 * All logos are simplified monochrome versions for consistency.
 */

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/** LINE — simplified chat bubble mark */
export function LineLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="LINE">
      <path d="M24 4C12.95 4 4 11.16 4 20c0 5.76 3.37 10.83 8.44 13.72.33.19.53.53.53.9l-.17 2.87c-.05.83.68 1.5 1.5 1.35l3.4-.75c.29-.06.59-.02.86.13 1.92 1.05 4.08 1.6 6.34 1.6 11.05 0 20-7.16 20-16S35.05 4 24 4z" fill="currentColor" fillOpacity="0.08"/>
      <path d="M18 19h-2v6h2v-6zm8 0h-2v6h2v-6zm-4 0h-2v6h2v-6zm8 0h-2v6h2v-6z" fill="currentColor"/>
    </svg>
  );
}

/** Lark — stylized bird wing mark */
export function LarkLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="Lark">
      <path d="M36 12L20 28l-8-8 24-8z" fill="currentColor" fillOpacity="0.08"/>
      <path d="M36 12L20 28l-8-8 24-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M20 28v8l-4-4 4-4z" fill="currentColor"/>
    </svg>
  );
}

/** WhatsApp — speech bubble with phone */
export function WhatsAppLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="WhatsApp">
      <path d="M24 4C13.5 4 5 12.06 5 22c0 2.95.78 5.73 2.14 8.15L4 42l12.3-3.03A18.78 18.78 0 0024 40c10.5 0 19-8.06 19-18S34.5 4 24 4z" fill="currentColor" fillOpacity="0.08"/>
      <path d="M18.5 16.5c-.5 1.5-.3 3.2.6 4.6.8 1.2 2 2.2 3.4 2.8 1 .4 2 .5 3 .3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 4C13.5 4 5 12.06 5 22c0 2.95.78 5.73 2.14 8.15L4 42l12.3-3.03A18.78 18.78 0 0024 40c10.5 0 19-8.06 19-18S34.5 4 24 4z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

/** Gmail — envelope M mark */
export function GmailLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="Gmail">
      <path d="M8 14v20h32V14L24 26 8 14z" fill="currentColor" fillOpacity="0.08"/>
      <path d="M8 14l16 12 16-12M8 14v20h32V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Google Workspace — grid of dots */
export function GoogleWorkspaceLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="Google Workspace">
      <circle cx="14" cy="14" r="3" fill="currentColor"/>
      <circle cx="24" cy="14" r="3" fill="currentColor"/>
      <circle cx="34" cy="14" r="3" fill="currentColor"/>
      <circle cx="14" cy="24" r="3" fill="currentColor"/>
      <circle cx="24" cy="24" r="3" fill="currentColor"/>
      <circle cx="34" cy="24" r="3" fill="currentColor"/>
      <circle cx="14" cy="34" r="3" fill="currentColor"/>
      <circle cx="24" cy="34" r="3" fill="currentColor"/>
      <circle cx="34" cy="34" r="3" fill="currentColor"/>
    </svg>
  );
}

/** Slack — hash mark */
export function SlackLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="Slack">
      <path d="M18 8h-4a4 4 0 000 8h4V8zM18 18h-4a4 4 0 100 8h4v-8zM30 18v-4a4 4 0 10-8 0v4h8zM30 18v4a4 4 0 11-8 0v-4h8zM30 30h4a4 4 0 100-8h-4v8zM30 30v4a4 4 0 11-8 0v-4h8zM18 30v4a4 4 0 108 0v-4h-8zM18 30h-4a4 4 0 110-8h4v8z" fill="currentColor" fillOpacity="0.15"/>
      <path d="M18 8h-4a4 4 0 000 8h4V8zM18 18h-4a4 4 0 100 8h4v-8zM30 18v-4a4 4 0 10-8 0v4h8zM30 18v4a4 4 0 11-8 0v-4h8zM30 30h4a4 4 0 100-8h-4v8zM30 30v4a4 4 0 11-8 0v-4h8zM18 30v4a4 4 0 108 0v-4h-8zM18 30h-4a4 4 0 110-8h4v8z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

/** Notion — N cube mark */
export function NotionLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="Notion">
      <path d="M10 12l8-4 20 4-8 4-20-4z" fill="currentColor" fillOpacity="0.08"/>
      <path d="M10 12v24l8 4V16l-8-4z" fill="currentColor" fillOpacity="0.12"/>
      <path d="M18 16v24l20-4V12l-20 4z" fill="currentColor" fillOpacity="0.06"/>
      <path d="M10 12l8-4 20 4-8 4-20-4zM10 12v24l8 4V16M18 16v24l20-4V12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}

/** Airtable — grid table mark */
export function AirtableLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="Airtable">
      <path d="M24 6L8 14v4l16 8 16-8v-4L24 6z" fill="currentColor" fillOpacity="0.12"/>
      <path d="M8 18v16l16 8 16-8V18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M24 26v16M8 18l16 8 16-8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}

/** Zapier — Z lightning mark */
export function ZapierLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="Zapier">
      <circle cx="24" cy="24" r="16" fill="currentColor" fillOpacity="0.08"/>
      <path d="M18 16h8l-6 8h6l-10 10 4-10h-6l4-8z" fill="currentColor" fillOpacity="0.2"/>
      <path d="M18 16h8l-6 8h6l-10 10 4-10h-6l4-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

/** Make (Integromat) — connected nodes */
export function MakeLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="Make">
      <circle cx="12" cy="24" r="4" fill="currentColor" fillOpacity="0.15"/>
      <circle cx="24" cy="14" r="4" fill="currentColor" fillOpacity="0.15"/>
      <circle cx="24" cy="34" r="4" fill="currentColor" fillOpacity="0.15"/>
      <circle cx="36" cy="24" r="4" fill="currentColor" fillOpacity="0.15"/>
      <path d="M15 22l6-6M15 26l6 6M27 18l6 6M27 30l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="24" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="24" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="24" cy="34" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="36" cy="24" r="4" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

/** Shopify — shopping bag */
export function ShopifyLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="Shopify">
      <path d="M32 12l-2 14c-2-1-4-1-6-1s-4.5.5-6 1.5c-1.5 1-2.5 2.5-2.5 4.5 0 3 2.5 5 6 5 3.5 0 6.5-2 8-5l2-14h.5z" fill="currentColor" fillOpacity="0.08"/>
      <path d="M20 16c-1 0-2 .5-2.5 1.5L14 32h6l3-14.5c.5-1 0-1.5-1.5-1.5h-1.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M32 12l-2 14c-2-1-4-1-6-1s-4.5.5-6 1.5c-1.5 1-2.5 2.5-2.5 4.5 0 3 2.5 5 6 5 3.5 0 6.5-2 8-5l2-14h.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

/** Stripe — S mark */
export function StripeLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="Stripe">
      <path d="M24 8c-8 0-14 4-14 10 0 4 3 7 8 8v6c0 2 2 4 6 4s6-2 6-4v-6c5-1 8-4 8-8 0-6-6-10-14-10z" fill="currentColor" fillOpacity="0.08"/>
      <path d="M20 28v4c0 2 2 3 4 3s4-1 4-3v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 18c0-3 2.5-5 6-5s6 2 6 5-2.5 5-6 5-6-2-6-5z" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

/** HubSpot — sprocket ring */
export function HubSpotLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="HubSpot">
      <circle cx="24" cy="24" r="14" fill="currentColor" fillOpacity="0.08"/>
      <circle cx="24" cy="24" r="6" fill="currentColor" fillOpacity="0.15"/>
      <path d="M24 10v8M24 30v8M10 24h8M30 24h8M14.3 14.3l5.6 5.6M28.1 28.1l5.6 5.6M14.3 33.7l5.6-5.6M28.1 19.9l5.6-5.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

/** Meta — infinity loop */
export function MetaLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="Meta">
      <path d="M16 36c-6-4-8-12-4-18s12-8 18-4c6 4 8 12 4 18s-12 8-18 4z" fill="currentColor" fillOpacity="0.08"/>
      <path d="M14 32c-4-6-2-14 4-18s14-2 18 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M34 16c4 6 2 14-4 18s-14 2-18-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

/** TikTok — musical note mark */
export function TikTokLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="TikTok">
      <path d="M30 10v8c4 0 6 2 8 4v-8c-2-2-4-4-8-4z" fill="currentColor" fillOpacity="0.15"/>
      <path d="M30 10v16c0 6-4 10-10 10s-10-4-10-10 4-10 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 18c4 0 6 2 8 4v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

/** Instagram — camera outline */
export function InstagramLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="Instagram">
      <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.08"/>
      <rect x="8" y="8" width="32" height="32" rx="8" stroke="currentColor" strokeWidth="2"/>
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2"/>
      <circle cx="34" cy="14" r="2" fill="currentColor"/>
    </svg>
  );
}

/** Facebook — f letter */
export function FacebookLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="Facebook">
      <rect x="8" y="8" width="32" height="32" rx="6" fill="currentColor" fillOpacity="0.08"/>
      <path d="M28 14h-3c-3 0-5 2-5 5v3h-3v4h3v10h4V26h3l1-4h-4v-3c0-1 0-2 2-2h2v-3z" fill="currentColor" fillOpacity="0.2"/>
      <path d="M28 14h-3c-3 0-5 2-5 5v3h-3v4h3v10h4V26h3l1-4h-4v-3c0-1 0-2 2-2h2v-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

/** Google Sheets — spreadsheet grid */
export function GoogleSheetsLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="Google Sheets">
      <rect x="8" y="8" width="32" height="32" rx="4" fill="currentColor" fillOpacity="0.08"/>
      <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 18h32M8 30h32M18 8v32M30 8v32" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

/** OpenAI — spiral flower mark */
export function OpenAILogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("h-5 w-auto", className)} aria-label="OpenAI">
      <circle cx="24" cy="24" r="14" fill="currentColor" fillOpacity="0.08"/>
      <path d="M24 14c-5.5 0-10 4.5-10 10s4.5 10 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 34c5.5 0 10-4.5 10-10s-4.5-10-10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="24" cy="24" r="3" fill="currentColor"/>
    </svg>
  );
}
