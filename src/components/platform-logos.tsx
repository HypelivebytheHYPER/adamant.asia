"use client";

/**
 * Platform logos — official monochrome SVG marks for tools Adamant integrates with.
 *
 * Sources:
 * - Simple Icons (@icons-pack/react-simple-icons) for 15 available brands
 * - Official brand SVGs for Slack (Wikimedia) and OpenAI (lobe-icons/unpkg)
 * - Custom Lark mark (not available in icon libraries)
 * - Google "G" mark for Google Workspace (SiGoogle from Simple Icons)
 *
 * All logos rendered at consistent size with currentColor fill for theming.
 */

import { cn } from "@/lib/utils";

// Simple Icons — official monochrome brand marks
import {
  SiLine,
  SiWhatsapp,
  SiGmail,
  SiGoogle,
  SiNotion,
  SiAirtable,
  SiZapier,
  SiMake,
  SiShopify,
  SiStripe,
  SiHubspot,
  SiMeta,
  SiTiktok,
  SiInstagram,
  SiFacebook,
  SiGooglesheets,
} from "@icons-pack/react-simple-icons";

interface LogoProps {
  className?: string;
}

const iconSize = "h-7 w-auto";

/** LINE — Simple Icons official mark */
export function LineLogo({ className }: LogoProps) {
  return <SiLine className={cn(iconSize, className)} aria-label="LINE" color="currentColor" />;
}

/** Lark — official ByteDance Lark wing mark (custom) */
export function LarkLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn(iconSize, className)} aria-label="Lark">
      <path d="M14 36L30 12L36 20L20 44L14 36Z" fill="currentColor" fillOpacity="0.12"/>
      <path d="M14 36L30 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M30 12L36 20L20 44L14 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** WhatsApp — Simple Icons official mark */
export function WhatsAppLogo({ className }: LogoProps) {
  return <SiWhatsapp className={cn(iconSize, className)} aria-label="WhatsApp" color="currentColor" />;
}

/** Gmail — Simple Icons official mark */
export function GmailLogo({ className }: LogoProps) {
  return <SiGmail className={cn(iconSize, className)} aria-label="Gmail" color="currentColor" />;
}

/** Google Workspace — official Google "G" mark */
export function GoogleWorkspaceLogo({ className }: LogoProps) {
  return <SiGoogle className={cn(iconSize, className)} aria-label="Google Workspace" color="currentColor" />;
}

/** Slack — official hash mark (from Wikimedia Commons, monochrome) */
export function SlackLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 127 127" xmlns="http://www.w3.org/2000/svg" className={cn(iconSize, className)} aria-label="Slack">
      <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z" fill="currentColor"/>
      <path d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z" fill="currentColor"/>
      <path d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z" fill="currentColor"/>
      <path d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm-6.6 0c0-7.3-5.9-13.2-13.2-13.2-7.3 0-13.2 5.9-13.2 13.2v33c0 7.3 5.9 13.2 13.2 13.2 7.3 0 13.2-5.9 13.2-13.2v-33z" fill="currentColor"/>
    </svg>
  );
}

/** Notion — Simple Icons official mark */
export function NotionLogo({ className }: LogoProps) {
  return <SiNotion className={cn(iconSize, className)} aria-label="Notion" color="currentColor" />;
}

/** Airtable — Simple Icons official mark */
export function AirtableLogo({ className }: LogoProps) {
  return <SiAirtable className={cn(iconSize, className)} aria-label="Airtable" color="currentColor" />;
}

/** Zapier — Simple Icons official mark */
export function ZapierLogo({ className }: LogoProps) {
  return <SiZapier className={cn(iconSize, className)} aria-label="Zapier" color="currentColor" />;
}

/** Make (Integromat) — Simple Icons official mark */
export function MakeLogo({ className }: LogoProps) {
  return <SiMake className={cn(iconSize, className)} aria-label="Make" color="currentColor" />;
}

/** Shopify — Simple Icons official mark */
export function ShopifyLogo({ className }: LogoProps) {
  return <SiShopify className={cn(iconSize, className)} aria-label="Shopify" color="currentColor" />;
}

/** Stripe — Simple Icons official mark */
export function StripeLogo({ className }: LogoProps) {
  return <SiStripe className={cn(iconSize, className)} aria-label="Stripe" color="currentColor" />;
}

/** HubSpot — Simple Icons official mark */
export function HubSpotLogo({ className }: LogoProps) {
  return <SiHubspot className={cn(iconSize, className)} aria-label="HubSpot" color="currentColor" />;
}

/** Meta — Simple Icons official mark */
export function MetaLogo({ className }: LogoProps) {
  return <SiMeta className={cn(iconSize, className)} aria-label="Meta" color="currentColor" />;
}

/** TikTok — Simple Icons official mark */
export function TikTokLogo({ className }: LogoProps) {
  return <SiTiktok className={cn(iconSize, className)} aria-label="TikTok" color="currentColor" />;
}

/** Instagram — Simple Icons official mark */
export function InstagramLogo({ className }: LogoProps) {
  return <SiInstagram className={cn(iconSize, className)} aria-label="Instagram" color="currentColor" />;
}

/** Facebook — Simple Icons official mark */
export function FacebookLogo({ className }: LogoProps) {
  return <SiFacebook className={cn(iconSize, className)} aria-label="Facebook" color="currentColor" />;
}

/** Google Sheets — Simple Icons official mark */
export function GoogleSheetsLogo({ className }: LogoProps) {
  return <SiGooglesheets className={cn(iconSize, className)} aria-label="Google Sheets" color="currentColor" />;
}

/** OpenAI — official geometric mark (from lobe-icons/unpkg, monochrome) */
export function OpenAILogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg" className={cn(iconSize, className)} aria-label="OpenAI">
      <path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z"/>
    </svg>
  );
}
