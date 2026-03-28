import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';

export default function Footer() {
  const catCols = [
    Object.values(CATEGORIES).slice(0, 5),
    Object.values(CATEGORIES).slice(5),
  ];

  return (
    <footer className="relative bg-midnight-950 border-t border-white/[0.04]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-electric-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-400 to-electric-600 flex items-center justify-center text-white font-display font-bold text-sm">T</div>
              <span className="font-display text-lg font-bold text-white tracking-tight">
                Tool<span className="text-electric-400">Decision</span>
              </span>
            </Link>
            <p className="text-sm text-midnight-400 leading-relaxed">
              In-depth, side-by-side comparisons of the best software tools. A publication by NILUS.
            </p>
            <div className="mt-5 flex gap-2 flex-wrap">
              {['AI', 'SaaS', 'Cloud', 'DevOps', 'SEO', 'Security'].map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-[10px] bg-midnight-900 text-midnight-400 rounded-full border border-midnight-800">{tag}</span>
              ))}
            </div>
          </div>

          {/* Categories col 1 */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-electric-400 mb-4">Categories</h4>
            <div className="space-y-2.5">
              {catCols[0].map((cat) => (
                <Link key={cat.slug} href={`/category/${cat.slug}/`} className="flex items-center gap-2 text-midnight-400 hover:text-white transition-colors text-sm">
                  <span>{cat.emoji}</span><span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories col 2 */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-electric-400 mb-4">More Categories</h4>
            <div className="space-y-2.5">
              {catCols[1].map((cat) => (
                <Link key={cat.slug} href={`/category/${cat.slug}/`} className="flex items-center gap-2 text-midnight-400 hover:text-white transition-colors text-sm">
                  <span>{cat.emoji}</span><span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Company + Legal links */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-electric-400 mb-4">Company</h4>
            <div className="space-y-2.5">
              <Link href="/about/" className="block text-midnight-400 hover:text-white transition-colors text-sm">About Us</Link>
              <Link href="/contact/" className="block text-midnight-400 hover:text-white transition-colors text-sm">Contact</Link>
            </div>

            <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-electric-400 mb-4 mt-8">Legal</h4>
            <div className="space-y-2.5">
              <Link href="/privacy/" className="block text-midnight-400 hover:text-white transition-colors text-sm">Privacy Policy</Link>
              <Link href="/terms/" className="block text-midnight-400 hover:text-white transition-colors text-sm">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Affiliate & Ad Disclosure */}
        <div className="border-t border-white/[0.04] pt-8 pb-6 space-y-4">
          <div className="bg-midnight-925 border border-white/[0.04] rounded-xl px-5 py-4">
            <p className="text-[10px] font-semibold text-midnight-500 uppercase tracking-[0.12em] mb-1.5">
              Affiliate &amp; Advertising Disclosure
            </p>
            <p className="text-xs text-midnight-600 leading-relaxed">
              Tool Decision Engine is an independent publication by NILUS. Some links on this site are affiliate links — we may earn a commission if you make a purchase, at no extra cost to you. Affiliate partnerships never influence our editorial verdicts or scores. We also display advertisements through Google AdSense to support the free publication of our content. Ads are clearly distinguishable from editorial content. For more information, read our <Link href="/privacy/" className="text-midnight-400 underline hover:text-midnight-300">Privacy Policy</Link> and <Link href="/terms/" className="text-midnight-400 underline hover:text-midnight-300">Terms of Service</Link>.
            </p>
          </div>

          <div className="bg-midnight-925 border border-white/[0.04] rounded-xl px-5 py-4">
            <p className="text-[10px] font-semibold text-midnight-500 uppercase tracking-[0.12em] mb-1.5">
              Content Disclaimer
            </p>
            <p className="text-xs text-midnight-600 leading-relaxed">
              Content on Tool Decision Engine is for informational purposes only. Software tools, pricing, and features change frequently. Always verify details on official websites before making purchasing decisions. We are not responsible for decisions made based on the information published on this site.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-midnight-600 text-xs">
            &copy; {new Date().getFullYear()} NILUS — ToolDecisionEngine.com — All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-midnight-600">
            <Link href="/about/" className="hover:text-midnight-400 transition-colors">About</Link>
            <span className="text-midnight-800">·</span>
            <Link href="/contact/" className="hover:text-midnight-400 transition-colors">Contact</Link>
            <span className="text-midnight-800">·</span>
            <Link href="/privacy/" className="hover:text-midnight-400 transition-colors">Privacy</Link>
            <span className="text-midnight-800">·</span>
            <Link href="/terms/" className="hover:text-midnight-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
