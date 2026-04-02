import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Tool Decision Engine. Learn how we collect, use, and protect your personal information.',
  alternates: { canonical: 'https://tooldecisionengine.com/privacy/' },
};

export default function PrivacyPage() {
  return (
    <section className="relative pt-28 pb-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-[-10%] w-[400px] h-[400px] bg-electric-500 rounded-full blur-[140px] opacity-[0.04]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6">
        <nav className="flex items-center gap-2 text-sm text-midnight-500 mb-8">
          <Link href="/" className="hover:text-electric-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-midnight-300">Privacy Policy</span>
        </nav>

        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-midnight-400 text-sm mb-12">Last updated: March 15, 2026</p>

        <div className="article-body space-y-6">
          <p>At Tool Decision Engine (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), operated by NILUS, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://tooldecisionengine.com">tooldecisionengine.com</a> (the &ldquo;Site&rdquo;).</p>

          <h2>1. Information We Collect</h2>

          <h3>1.1 Information You Provide</h3>
          <p>We may collect personal information that you voluntarily provide when you:</p>
          <ul>
            <li>Fill out our contact form (name, email address, message)</li>
            <li>Subscribe to our newsletter (email address)</li>
            <li>Leave comments or feedback on our articles</li>
          </ul>

          <h3>1.2 Information Collected Automatically</h3>
          <p>When you visit our Site, we automatically collect certain information about your device and usage, including:</p>
          <ul>
            <li>IP address (anonymized where required by law)</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring URLs and pages visited</li>
            <li>Time and date of visits</li>
            <li>Approximate geographic location (country/region level)</li>
            <li>Device type (mobile, desktop, tablet)</li>
          </ul>

          <h3>1.3 Cookies and Tracking Technologies</h3>
          <p>We use cookies and similar tracking technologies to collect and track information about your browsing activity. These include:</p>
          <ul>
            <li><strong>Essential cookies:</strong> Required for the Site to function properly (session management, security).</li>
            <li><strong>Analytics cookies:</strong> Used to understand how visitors interact with the Site. We use Google Analytics to collect anonymized usage statistics.</li>
            <li><strong>Advertising cookies:</strong> Used by our advertising partners (including Google AdSense) to serve relevant ads and measure ad performance.</li>
          </ul>
          <p>You can control cookie preferences through your browser settings or through the cookie consent banner on our Site. Most browsers allow you to refuse cookies or alert you when cookies are being sent.</p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To provide, maintain, and improve our Site and content</li>
            <li>To respond to your inquiries and fulfill your requests</li>
            <li>To send periodic newsletters (only if you opted in)</li>
            <li>To analyze Site usage and optimize user experience</li>
            <li>To display relevant advertisements through Google AdSense</li>
            <li>To detect, prevent, and address technical issues or abuse</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>3. Google AdSense and Advertising</h2>
          <p>We use Google AdSense to display advertisements on our Site. Google AdSense uses cookies to serve ads based on your prior visits to our Site and other websites. Google&rsquo;s use of advertising cookies enables it and its partners to serve ads based on your visit to our Site and/or other sites on the Internet.</p>
          <p>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info/choices</a>.</p>
          <p>For more information on how Google uses data when you use our Site, please review <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google&rsquo;s Privacy &amp; Terms</a>.</p>

          <h2>4. Google Analytics</h2>
          <p>We use Google Analytics to analyze the use of our Site. Google Analytics collects information such as how often users visit the Site, what pages they visit, and what other sites they used prior to coming to our Site. We use the information from Google Analytics to improve our Site and content.</p>
          <p>Google Analytics collects the IP address assigned to you on the date you visit the Site, but not your name or other identifying information. Google&rsquo;s ability to use and share information collected by Google Analytics is restricted by the <a href="https://www.google.com/analytics/terms/" target="_blank" rel="noopener noreferrer">Google Analytics Terms of Service</a> and the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</p>
          <p>You can prevent Google Analytics from recognizing you on return visits by disabling cookies in your browser or by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</p>

          <h2>5. Third-Party Links</h2>
          <p>Our Site may contain links to third-party websites, products, or services. We are not responsible for the privacy practices of these third parties. We encourage you to read the privacy policies of every website you visit.</p>

          <h2>6. Affiliate Disclosure</h2>
          <p>Some of the links on our Site may be affiliate links. This means that if you click on the link and purchase an item, we may receive an affiliate commission at no extra cost to you. This does not influence our editorial content or reviews. Our comparisons and verdicts are always based on independent testing and analysis.</p>

          <h2>7. Data Sharing and Disclosure</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:</p>
          <ul>
            <li><strong>Service providers:</strong> We may share data with trusted third parties who assist us in operating our Site (e.g., hosting providers, analytics services, email service providers).</li>
            <li><strong>Legal requirements:</strong> We may disclose your information if required by law or in response to valid legal process.</li>
            <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction.</li>
          </ul>

          <h2>8. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>

          <h2>9. Your Rights (GDPR / EEA Users)</h2>
          <p>If you are located in the European Economic Area (EEA), you have certain rights under the General Data Protection Regulation (GDPR), including:</p>
          <ul>
            <li>The right to access your personal data</li>
            <li>The right to rectify inaccurate personal data</li>
            <li>The right to request deletion of your personal data</li>
            <li>The right to restrict processing of your personal data</li>
            <li>The right to data portability</li>
            <li>The right to object to processing of your personal data</li>
            <li>The right to withdraw consent at any time</li>
          </ul>
          <p>To exercise any of these rights, please contact us at the email address below.</p>

          <h2>10. California Privacy Rights (CCPA)</h2>
          <p>If you are a California resident, you have the right to request disclosure of the categories and specific pieces of personal information we have collected about you, the categories of sources from which the information is collected, the business purpose for collecting the information, and the categories of third parties with whom we share the information. To make such a request, please contact us using the details below.</p>

          <h2>11. Children&rsquo;s Privacy</h2>
          <p>Our Site is not directed to children under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that a child under 16 has provided us with personal information, we will take steps to delete such information.</p>

          <h2>12. Data Retention</h2>
          <p>We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. Contact form submissions are retained for up to 24 months. Analytics data is retained according to the default retention settings of Google Analytics.</p>

          <h2>13. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date. Your continued use of the Site after changes are posted constitutes your acceptance of the revised Privacy Policy.</p>

          <h2>14. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us:</p>
          <ul>
            <li><strong>Company:</strong> NILUS</li>
            <li><strong>Website:</strong> <a href="https://tooldecisionengine.com">tooldecisionengine.com</a></li>
            <li><strong>Email:</strong> privacy@tooldecisionengine.com</li>
            <li><strong>Contact page:</strong> <a href="/contact/">tooldecisionengine.com/contact</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
