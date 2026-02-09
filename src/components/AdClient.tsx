'use client';

import { useEffect, useRef, useState } from 'react';

interface AdClientProps {
  children: React.ReactNode;
  adId: string;
  title: string;
  placement: string;
  trackingEnabled?: boolean; // Optional, defaults to true
}

export default function AdClient({ 
  children, 
  adId, 
  title, 
  placement, 
  trackingEnabled = true 
}: AdClientProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [impressionSent, setImpressionSent] = useState(false);

  // 1. IMPRESSION TRACKING
  useEffect(() => {
    // If tracking is explicitly disabled (false), do nothing.
    if (trackingEnabled === false || impressionSent || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          
          if (window.gtag) {
            window.gtag('event', 'ad_impression', {
              event_category: 'Ads',
              event_label: title,
              ad_id: adId,
              ad_placement: placement
            });
            console.log(`📊 Tracked Impression: ${title}`);
          }
          
          setImpressionSent(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [adId, title, placement, trackingEnabled, impressionSent]);

  // 2. CLICK TRACKING
  const handleClick = () => {
    if (trackingEnabled === false) return;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_click', {
        event_category: 'Ads',
        event_label: title,
        ad_id: adId,
        ad_placement: placement
      });
      console.log(`🖱️ Tracked Click: ${title}`);
    }
  };

  return (
    <div ref={ref} onClick={handleClick} className="relative w-full h-full cursor-pointer">
      {children}
    </div>
  );
}