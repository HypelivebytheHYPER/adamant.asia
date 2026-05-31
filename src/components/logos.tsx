"use client";

/** ------------------------------------------------------------------
 *  Platform Logos — inline SVG for use in TrustedPlatforms marquee
 *  All paths simplified for inline rendering. No external assets.
 *  ------------------------------------------------------------------ */

export function LogoLark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Lark"
    >
      <rect x="0" y="6" width="28" height="28" rx="6" fill="#3370FF" />
      <circle cx="18" cy="14" r="4" fill="white" />
      <circle cx="10" cy="22" r="4" fill="white" opacity="0.6" />
      <circle cx="18" cy="22" r="4" fill="white" opacity="0.9" />
      <text
        x="36"
        y="27"
        fill="currentColor"
        fontSize="20"
        fontWeight="700"
        fontFamily="system-ui, -apple-system"
      >
        Lark
      </text>
    </svg>
  );
}

export function LogoGoogle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 272 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Google"
    >
      <path
        d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
        fill="#EA4335"
      />
      <path
        d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
        fill="#FBBC05"
      />
      <path
        d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
        fill="#4285F4"
      />
      <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
      <path
        d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 3.61-11.59 12.93z"
        fill="#EA4335"
      />
      <path
        d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"
        fill="#4285F4"
      />
    </svg>
  );
}

export function LogoMeta({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 150 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Meta"
    >
      <path
        d="M17.5 10C10.6 10 5 15.37 5 22.5c0 4.2 2 7.8 5 10.1l5.1-12.3c.4-.9 1.3-1.5 2.4-1.5 1 0 1.9.6 2.4 1.5l1.3 3.1c.6-1.4 1.9-2.4 3.5-2.4 1.3 0 2.4.7 3.1 1.8l.8-1.9c.4-.9 1.3-1.5 2.4-1.5 1 0 1.9.6 2.4 1.5l5.1 12.3c3-2.3 5-5.9 5-10.1 0-7.13-5.6-12.5-12.5-12.5-4.1 0-7.7 2.1-10 5.4-2.3-3.3-5.9-5.4-10-5.4z"
        fill="#0081FB"
      />
      <path
        d="M17.5 12.5c1.7 0 3.3.5 4.7 1.4l-2.6 6.3-2.6-6.3c1.4-.9 3-1.4 4.7-1.4c-1.5-2.3-3.7-3.9-6.3-4.8 1.5 1.1 2.7 2.7 3.5 4.5l2 5 2-5c.8-1.8 2-3.4 3.5-4.5-2.6.9-4.8 2.5-6.3 4.8z"
        fill="none"
      />
      <text
        x="55"
        y="33"
        fill="currentColor"
        fontSize="22"
        fontWeight="700"
        fontFamily="system-ui, -apple-system"
      >
        Meta
      </text>
    </svg>
  );
}

export function LogoLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="LINE"
    >
      <rect x="0" y="2" width="36" height="36" rx="10" fill="#06C755" />
      <path
        d="M26 16h-3v8h3v-8zm-5.5 0h-3v8h3v-4.5l2.5 4.5h3.5l-3.5-4 3-4h-3.5l-2 2.7V16zM13 16h-3v8h7v-2.5h-4v-1h4V18h-4v-2z"
        fill="white"
      />
      <text
        x="44"
        y="28"
        fill="currentColor"
        fontSize="20"
        fontWeight="700"
        fontFamily="system-ui, -apple-system"
      >
        LINE
      </text>
    </svg>
  );
}

export function LogoTikTok({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 130 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="TikTok"
    >
      <path
        d="M27.5 9.5c-1.5.5-3 1-4.5 1.5L22 16l-8 2.5c1.5 0 3-.5 4-1.5l4-3.5V32c0 1.5-1 3-3 3-1.5 0-3-1-3-3s1-3 3-3c.3 0 .5 0 .8.2l2.5-4c-1-.5-2-.8-3.3-.8-4 0-7.5 3.5-7.5 7.5s3.5 7.5 7.5 7.5c4.5 0 7.5-3.5 7.5-7.5V15l1.5-2-4-3.5z"
        fill="currentColor"
      />
      <text
        x="36"
        y="28"
        fill="currentColor"
        fontSize="20"
        fontWeight="700"
        fontFamily="system-ui, -apple-system"
      >
        TikTok
      </text>
    </svg>
  );
}

export function LogoShopify({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 150 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Shopify"
    >
      <path
        d="M22.5 7.5c-4.5 1-6.5 3-6.5 3l-4 12.5c3 0 5-1 6-2l-2-8 .5-.1.2-.1c1.5.5 3 2 5 1.5 2-.5 3-2 3-3.5 0-2-2-3.5-4-3.5l-.2.1z"
        fill="#96BF48"
      />
      <path
        d="M27 6.5c0 .5-.1 1-.3 1.5-.5 1.5-1.5 3-3.5 3.5-.5.1-1 .1-1.5.1-.5-.1-1-.3-1.3-.5-.2-.2-.3-.3-.5-.5 0-.1-.1-.2-.2-.3-.2-.3-.3-.7-.3-1.1 0-.5.1-1 .3-1.5.5-1.5 1.5-3 3.5-3.5.5-.1 1-.1 1.5-.1.5.1 1 .3 1.3.5.2.2.3.3.5.5 0 .1.1.2.2.3.2.3.3.7.3 1.1v.5z"
        fill="none"
        stroke="#96BF48"
        strokeWidth="1.5"
      />
      <path
        d="M18 20.5c2-1 4-1.5 6.5-1.5 4 0 7 1.5 7 4.5 0 6-13.5 7-13.5 7L18 20.5z"
        fill="#96BF48"
      />
      <text
        x="42"
        y="28"
        fill="currentColor"
        fontSize="20"
        fontWeight="600"
        fontFamily="system-ui, -apple-system"
      >
        Shopify
      </text>
    </svg>
  );
}

export function LogoStripe({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 110 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Stripe"
    >
      <path
        d="M23 28.5c-2.5 0-4.5-1-6-2.5l2-2.5c1 1 2.5 2 4 2 1 0 2-.5 2-1.5 0-2.5-8-1.5-8-7.5 0-3 2.5-5 6-5 2 0 4 1 5.5 2.5l-2 2.5c-1-.5-2-1.5-3.5-1.5-1 0-1.5.5-1.5 1.5 0 2 8 1 8 7.5 0 3-2 5.5-5.5 5.5v.5z"
        fill="#635BFF"
      />
      <text
        x="35"
        y="28"
        fill="currentColor"
        fontSize="20"
        fontWeight="600"
        fontFamily="system-ui, -apple-system"
      >
        Stripe
      </text>
    </svg>
  );
}

export function LogoOpenAI({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="OpenAI"
    >
      <path
        d="M18.5 10c-4.5 0-8 3.5-8.5 7.5-.5 0-1-.5-1.5-.5-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5c.5 0 1-.5 1.5-.5.5 4 4 7 8.5 7 4 0 7-2.5 8-6 .5.1 1 .5 1.5.5 3 0 5.5-2.5 5.5-5.5s-2.5-5.5-5.5-5.5c-.5 0-1 .5-1.5.5-.5-3.5-3.5-6-8-8zM18.5 13c2.5 0 4.5 1.5 5.5 3.5L22 18c-.5-1.5-2-2.5-3.5-2.5S15 16.5 14.5 18l-2-1.5c1-2 3-3.5 5.5-3.5z"
        fill="currentColor"
      />
      <text
        x="40"
        y="27"
        fill="currentColor"
        fontSize="19"
        fontWeight="600"
        fontFamily="system-ui, -apple-system"
      >
        OpenAI
      </text>
    </svg>
  );
}

export function LogoCloudflare({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Cloudflare"
    >
      <path
        d="M25 12c-5 0-8.5 3.5-8.5 8 0 .5 0 1 .1 1.5l-1.5.3C12 22.5 9 25.5 9 29c0 3.5 2.5 5.5 6 5.5h14c3 0 6-2 6-5.5 0-3-2-5.5-5-5.5l-.5-.1c0-.5.1-1 .1-1.5 0-5-3.5-9.5-8.5-9.5l-1 .1z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M25 14c-4 0-6.5 2.5-6.5 6.5 0 .3 0 .7.1 1l1-.1c-.1-.3-.1-.5-.1-.9 0-3.5 2-5.5 5.5-5.5 3 0 5.5 2 5.5 5.5l-.1.9h4.5c1.5 0 3 1 3 3s-1.5 3-3 3H15c-1.5 0-3-1-3-3s1.5-3 3-3h1.5c0-.3.1-.6.1-.9 0-3.5-2-5.5-5.5-5.5S3.5 17 3.5 20.5c0 .3 0 .6.1.9H2c-1.5 0-3 1-3 3s1.5 3 3 3h23c1.5 0 3-1 3-3s-1.5-3-3-3h-4.5l-.1-.9C19.5 16.5 22 14 25 14z"
        fill="currentColor"
      />
      <text
        x="40"
        y="28"
        fill="currentColor"
        fontSize="20"
        fontWeight="600"
        fontFamily="system-ui, -apple-system"
      >
        Cloudflare
      </text>
    </svg>
  );
}

export function LogoVercel({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 150 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Vercel"
    >
      <path d="M19 8L35 34H3L19 8z" fill="currentColor" />
      <text
        x="44"
        y="28"
        fill="currentColor"
        fontSize="20"
        fontWeight="700"
        fontFamily="system-ui, -apple-system"
      >
        Vercel
      </text>
    </svg>
  );
}

export function LogoNotion({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 150 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Notion"
    >
      <rect
        x="2"
        y="2"
        width="34"
        height="36"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M10 12h18v2H10zm0 7h14v2H10zm0 7h16v2H10z"
        fill="currentColor"
      />
      <text
        x="44"
        y="28"
        fill="currentColor"
        fontSize="20"
        fontWeight="600"
        fontFamily="system-ui, -apple-system"
      >
        Notion
      </text>
    </svg>
  );
}

export function LogoSlack({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Slack"
    >
      <rect x="2" y="2" width="8" height="8" rx="2" fill="#E01E5A" />
      <rect x="12" y="2" width="8" height="8" rx="2" fill="#36C5F0" />
      <rect x="2" y="12" width="8" height="8" rx="2" fill="#ECB22E" />
      <rect x="12" y="12" width="8" height="8" rx="2" fill="#2EB67D" />
      <text
        x="28"
        y="20"
        fill="currentColor"
        fontSize="20"
        fontWeight="700"
        fontFamily="system-ui, -apple-system"
      >
        Slack
      </text>
    </svg>
  );
}
