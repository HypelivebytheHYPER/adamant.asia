"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { GA_ID, GTM_ID } from "@/lib/analytics-ids";

/**
 * GoogleAnalytics — GA4 + GTM loader with route-change tracking.
 *
 * Place inside <body> in RootLayout. Uses Next.js Script component
 * for optimal loading (afterInteractive).
 */

function RouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined" || !window.gtag) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    window.gtag("config", GA_ID, {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  const hasGA = Boolean(GA_ID);
  const hasGTM = Boolean(GTM_ID);

  if (!hasGA && !hasGTM) return null;

  return (
    <>
      {/* ─── GTM (head) ─── */}
      {hasGTM && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      )}

      {/* ─── GA4 (head) ─── */}
      {hasGA && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  send_page_view: false,
                  allow_google_signals: true,
                  allow_ad_personalization_signals: true,
                  cookie_flags: 'SameSite=None;Secure',
                  cookie_expires: 63072000,
                  custom_map: {
                    'dimension1': 'cta_location',
                    'dimension2': 'cta_label',
                    'dimension3': 'form_source'
                  }
                });
              `,
            }}
          />
        </>
      )}

      {/* ─── Route change tracking ─── */}
      <Suspense fallback={null}>
        <RouteTracker />
      </Suspense>
    </>
  );
}
