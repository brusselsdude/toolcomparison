import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Tool Decision Engine. Read our terms and conditions for using the site.',
  alternates: { canonical: 'https://tooldecisionengine.com/terms/' },
};

export default function TermsPage() {
  return (
    <section className="relative pt-28 pb-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-[-10%] w-[400px] h-[400px] bg-electric-500 rounded-full blur-[140px] opacity-[0.04]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6">
        <nav className="flex items-center gap-2 text-sm text-midnight-500 mb-8">
          <Link href="/" className="hover:text-electric-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-midnight-300">Terms of Service</span>
        </nav>

        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-midnight-400 text-sm mb-12">Last updated: March 15, 2026</p>

        <div className="article-body space-y-6">
          <p>Welcome to Tool Decision Engine (<a href="https://tooldecisionengine.com">tooldecisionengine.com</a>), operated by NILUS (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using this website (the &ldquo;Site&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree with these Terms, please do not use the Site.</p>

          <h2>1. Use of the Site</h2>
          <p>You may use the Site for lawful purposes only. You agree not to:</p>
          <ul>
            <li>Use the Site in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to any part of the Site, its servers, or any connected systems</li>
            <li>Use automated tools (scrapers, bots) to extract content from the Site without our written permission</li>
            <li>Reproduce, distribute, or republish our content without proper attribution and permission</li>
            <li>Interfere with or disrupt the operation of the Site or its infrastructure</li>
          </ul>

          <h2>2. Intellectual Property</h2>
          <p>All content on this Site — including articles, comparisons, reviews, graphics, logos, and design elements — is the intellectual property of NILUS or its content creators and is protected by copyright and other intellectual property laws.</p>
          <p>You may share links to our content freely. You may quote brief excerpts (up to 100 words) with proper attribution and a link back to the original article. Reproduction of full articles or substantial portions without written permission is prohibited.</p>

          <h2>3. Content Disclaimer</h2>
          <p>The information published on Tool Decision Engine is provided for informational and educational purposes only. It does not constitute professional advice of any kind, including but not limited to financial, legal, or technical advice.</p>
          <p>While we strive for accuracy and regularly update our comparisons, software tools change frequently — features, pricing, availability, and capabilities may differ from what is described on our Site. We strongly recommend verifying all information on the official websites of the tools being compared before making purchasing decisions.</p>

          <h3>3.1 No Guarantees</h3>
          <p>We make no warranties or representations regarding:</p>
          <ul>
            <li>The completeness, accuracy, or reliability of any content on the Site</li>
            <li>The suitability of any tool for your specific use case or requirements</li>
            <li>The continued availability of any tool, feature, or pricing mentioned on the Site</li>
            <li>The results you may achieve by using any tool discussed on the Site</li>
          </ul>

          <h3>3.2 Editorial Independence</h3>
          <p>Our comparisons and verdicts are based on independent testing, research, and analysis conducted by the NILUS editorial team. Our recommendations are our honest opinions. Affiliate partnerships and advertising relationships do not influence our editorial verdicts or scores.</p>

          <h2>4. Affiliate Links and Advertising</h2>
          <p>Some links on the Site may be affiliate links. This means we may earn a commission if you click through and make a purchase, at no additional cost to you. Affiliate commissions help support the operation of this Site.</p>
          <p>We also display advertisements through Google AdSense and potentially other advertising networks. The presence of advertisements does not constitute an endorsement of the advertised products or services.</p>

          <h2>5. User Submissions</h2>
          <p>If you submit content to us through the contact form, email, or any other means (suggestions, corrections, feedback), you grant us a non-exclusive, royalty-free, perpetual license to use, modify, and incorporate such content at our discretion. You represent that you have the right to submit such content and that it does not infringe any third-party rights.</p>

          <h2>6. Third-Party Links and Services</h2>
          <p>The Site contains links to third-party websites, products, and services. These links are provided for convenience and reference only. We do not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party websites. Accessing third-party sites is at your own risk.</p>

          <h2>7. Limitation of Liability</h2>
          <p>To the fullest extent permitted by applicable law, NILUS and its directors, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising from your use of or inability to use the Site, even if we have been advised of the possibility of such damages.</p>
          <p>In no event shall our total liability exceed the amount you have paid to us (if any) in the 12 months preceding the event giving rise to the liability.</p>

          <h2>8. Indemnification</h2>
          <p>You agree to indemnify and hold harmless NILUS and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising from your use of the Site or violation of these Terms.</p>

          <h2>9. Modifications to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of the Site after changes are posted constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.</p>

          <h2>10. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of Belgium, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts located in Brussels, Belgium.</p>

          <h2>11. Severability</h2>
          <p>If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.</p>

          <h2>12. Contact Information</h2>
          <p>If you have questions about these Terms, please contact us:</p>
          <ul>
            <li><strong>Company:</strong> NILUS</li>
            <li><strong>Website:</strong> <a href="https://tooldecisionengine.com">tooldecisionengine.com</a></li>
            <li><strong>Email:</strong> legal@tooldecisionengine.com</li>
            <li><strong>Contact page:</strong> <a href="/contact/">tooldecisionengine.com/contact</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
