'use client';

import Script from 'next/script';

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Graceful Failure: If no ID is set, render nothing.
  // This prevents 404 errors on the script and console spam.
  if (!gaId) return null;

  return (
    <>
      {/* 1. Load the GTags Library (Async) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive" // Loads immediately after hydration
      />

      {/* 2. Initialize the Data Layer */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
            send_page_view: true // Auto-track page views
          });
        `}
      </Script>
    </>
  );
}