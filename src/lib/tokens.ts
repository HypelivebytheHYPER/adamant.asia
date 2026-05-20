/** Design token constants — single source of truth for values that
 *  cannot be expressed as CSS custom properties (e.g., Next.js metadata).
 *  Keep in sync with `globals.css` :root tokens.
 */

export const TOKENS = {
  color: {
    background: "#f2f2ee",
    foreground: "#1b1b18",
    primary: "#0f766e",
    accent: "#9a4707",
    stone: "#6b6560",
    dim: "#7a746d",
    surface: "#ffffff",
    surfaceRaised: "#fafaf8",
    warm: "#f5f0e8",
  },
  radius: {
    base: "0.5rem" /* 8px */,
  },
} as const;
