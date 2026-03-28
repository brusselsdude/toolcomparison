'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
    // Disable GA if user declines
    if (typeof window !== 'undefined') {
      window['ga-disable-G-7Q1336M9BB'] = true;
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] p-4 animate-fade-up">
      <div className="max-w-4xl mx-auto bg-midnight-925 border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-midnight-200 leading-relaxed">
              <span className="text-white font-semibold">We value your privacy.</span>{' '}
              We use cookies for analytics and advertising (Google Analytics &amp; Google AdSense) to improve your experience and support our free content.
              Read our{' '}
              <Link href="/privacy/" className="text-electric-400 underline underline-offset-2 hover:text-electric-300">
                Privacy Policy
              </Link>{' '}
              for details.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={decline}
              className="px-4 py-2 text-sm font-medium text-midnight-400 hover:text-white border border-white/[0.08] rounded-lg transition-colors"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="px-5 py-2 text-sm font-semibold text-white bg-electric-500 hover:bg-electric-400 rounded-lg transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
