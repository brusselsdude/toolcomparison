'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import ComparisonCard from '@/components/ComparisonCard';
import { getAllCategories } from '@/data/categories';
import { comparisons } from '@/data/comparisons';
import { postsRegistry } from '@/data/postsRegistry';

const PER_PAGE = 12;

export default function HomePage() {
  const categories = getAllCategories();

  // Merge old + new, deduplicate by slug, sort by date
  const allPosts = useMemo(() => {
    const map = new Map();
    // Old comparisons first (they have scores)
    comparisons.forEach(c => map.set(c.slug, c));
    // New posts (don't overwrite old ones that have richer data)
    postsRegistry.forEach(p => { if (!map.has(p.slug)) map.set(p.slug, p); });
    return [...map.values()].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, []);

  const featured = useMemo(() => allPosts.filter(p => p.featured).slice(0, 6), [allPosts]);
  // If no featured, take first 6
  const featuredDisplay = featured.length > 0 ? featured : allPosts.slice(0, 6);

  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = allPosts;
    if (catFilter) list = list.filter(c => c.category === catFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        (c.title || '').toLowerCase().includes(q) ||
        (c.seoTitle || '').toLowerCase().includes(q) ||
        (c.description || '').toLowerCase().includes(q) ||
        (c.tools || []).some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [allPosts, search, catFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Category counts
  const catCounts = useMemo(() => {
    const counts = {};
    allPosts.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return counts;
  }, [allPosts]);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-[-12%] w-[500px] h-[500px] bg-electric-500 rounded-full blur-[140px] opacity-[0.07] animate-glow-pulse" />
          <div className="absolute bottom-20 right-[-5%] w-[400px] h-[400px] bg-electric-400 rounded-full blur-[120px] opacity-[0.05] animate-glow-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600 rounded-full blur-[160px] opacity-[0.04]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }} />
        </div>

        <div className="relative w-full max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-electric-500/10 border border-electric-500/20 rounded-full px-4 py-1.5 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-electric-400 animate-pulse" />
                <span className="text-sm text-electric-300 font-medium">{allPosts.length}+ comparisons. Updated for 2026.</span>
              </div>

              <h1 className="font-display text-5xl md:text-[3.5rem] font-extrabold text-white leading-[1.08] mb-6 tracking-tight">
                Find the <span className="gradient-text">right tool</span>
                <br />for every decision.
              </h1>

              <p className="text-lg text-midnight-300 leading-relaxed mb-10 max-w-lg">
                In-depth, side-by-side comparisons of the best software tools — AI assistants, SaaS platforms, cloud services, dev tools, and more.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <a href="#comparisons" className="inline-flex items-center gap-2 bg-electric-500 hover:bg-electric-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-electric-500/20 hover:shadow-electric-400/25 hover:-translate-y-0.5">
                  Browse Comparisons →
                </a>
                <Link href="/about" className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20 hover:-translate-y-0.5">
                  How We Test
                </Link>
              </div>

              <div className="flex flex-wrap gap-8 pt-5 border-t border-white/[0.06]">
                {[
                  { value: '9', label: 'Categories', sub: 'AI to Security' },
                  { value: `${allPosts.length}`, label: 'Comparisons', sub: 'With verdicts' },
                  { value: '0', label: 'Bias', sub: 'Always honest' },
                ].map((s, i) => (
                  <div key={i}>
                    <span className="font-display text-3xl font-bold text-electric-400 leading-none">{s.value}</span>
                    <p className="text-sm font-medium text-white/80 mt-1">{s.label}</p>
                    <p className="text-[11px] text-midnight-500">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating cards */}
            <div className="hidden lg:flex flex-col gap-3.5 items-end">
              {[
                { emoji: '🤖', text: 'AI Tools', value: `${catCounts['ai-tools'] || 0} articles`, color: 'from-violet-500/20 to-violet-700/10', border: 'border-violet-500/20', off: 'mr-8' },
                { emoji: '☁️', text: 'Cloud & DevOps', value: `${catCounts['cloud-dev'] || 0} articles`, color: 'from-sky-500/20 to-sky-700/10', border: 'border-sky-500/20', off: 'mr-2' },
                { emoji: '🔐', text: 'Cybersecurity', value: `${catCounts['cybersecurity'] || 0} articles`, color: 'from-red-500/20 to-red-700/10', border: 'border-red-500/20', off: 'mr-14' },
                { emoji: '💻', text: 'Dev Tools', value: `${catCounts['dev-tools'] || 0} articles`, color: 'from-lime-500/20 to-lime-700/10', border: 'border-lime-500/20', off: 'mr-6' },
                { emoji: '📈', text: 'Marketing & SEO', value: `${catCounts['marketing-seo'] || 0} articles`, color: 'from-pink-500/20 to-pink-700/10', border: 'border-pink-500/20', off: 'mr-10' },
              ].map((card, i) => (
                <div key={i} className={`${card.off} w-60 bg-gradient-to-br ${card.color} border ${card.border} rounded-2xl px-5 py-4 backdrop-blur-sm animate-fade-up`} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-xl shrink-0">{card.emoji}</div>
                    <div>
                      <p className="text-[11px] text-white/40 font-medium">{card.text}</p>
                      <p className="text-sm font-semibold text-white mt-0.5">{card.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="relative -mt-6 z-20 max-w-6xl mx-auto px-6">
        <h2 className="font-display text-2xl font-bold text-white mb-2">Browse by Category</h2>
        <p className="text-midnight-400 text-sm mb-6">{categories.length} categories · {allPosts.length} comparisons</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/category/${cat.slug}`} className={`group bg-gradient-to-br ${cat.gradient} border ${cat.border} rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
              <span className="text-2xl">{cat.emoji}</span>
              <h3 className="font-display text-sm font-semibold text-white mt-2 leading-snug">{cat.name}</h3>
              <p className="text-[11px] text-white/40 mt-0.5">{catCounts[cat.slug] || 0} articles</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ FEATURED ═══ */}
      <section className="max-w-6xl mx-auto px-6 pt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 rounded-full bg-electric-400" />
          <h2 className="font-display text-2xl font-bold text-white">Featured Comparisons</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredDisplay.map((c) => <ComparisonCard key={c.slug} comparison={c} />)}
        </div>
      </section>

      {/* ═══ ALL COMPARISONS ═══ */}
      <section id="comparisons" className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-3xl font-bold text-white">All Comparisons</h2>
            <p className="text-midnight-400 mt-1">{filtered.length} articles{catFilter ? ` in ${categories.find(c => c.slug === catFilter)?.name || catFilter}` : ''}</p>
          </div>
          <div className="relative w-full sm:w-80">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-midnight-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search tools or topics..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-midnight-925 border border-white/[0.06] text-white text-sm placeholder:text-midnight-600 focus:outline-none focus:border-electric-500/50 focus:ring-2 focus:ring-electric-500/10 transition-all" />
          </div>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => { setCatFilter(''); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${!catFilter ? 'bg-electric-500 text-white' : 'bg-midnight-900 text-midnight-400 hover:text-white border border-midnight-800'}`}>
            All ({allPosts.length})
          </button>
          {categories.map(cat => (
            <button key={cat.slug} onClick={() => { setCatFilter(cat.slug); setPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${catFilter === cat.slug ? 'bg-electric-500 text-white' : 'bg-midnight-900 text-midnight-400 hover:text-white border border-midnight-800'}`}>
              {cat.emoji} {cat.name} ({catCounts[cat.slug] || 0})
            </button>
          ))}
        </div>

        {paged.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paged.map((c) => <ComparisonCard key={c.slug} comparison={c} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-midnight-500 text-lg">No comparisons found for &ldquo;{search}&rdquo;</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-white/[0.06] text-midnight-400 text-sm hover:bg-white/[0.03] disabled:opacity-30 transition-colors">
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
              .reduce((acc, p, i, arr) => {
                if (i > 0 && p - arr[i - 1] > 1) acc.push({ type: 'gap', key: `g${p}` });
                acc.push({ type: 'page', value: p, key: p });
                return acc;
              }, [])
              .map(item => item.type === 'gap'
                ? <span key={item.key} className="px-2 text-midnight-600">…</span>
                : <button key={item.key} onClick={() => setPage(item.value)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${item.value === page ? 'bg-electric-500 text-white' : 'border border-white/[0.06] text-midnight-400 hover:bg-white/[0.03]'}`}>
                    {item.value}
                  </button>
              )}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border border-white/[0.06] text-midnight-400 text-sm hover:bg-white/[0.03] disabled:opacity-30 transition-colors">
              Next →
            </button>
          </div>
        )}
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-925 via-midnight-950 to-midnight-925" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="relative max-w-2xl mx-auto px-6 py-24 text-center">
          <span className="text-4xl">📬</span>
          <h2 className="font-display text-3xl font-bold text-white mt-4 mb-3">Never pick the wrong tool again.</h2>
          <p className="text-midnight-400 mb-8">Get our latest comparisons delivered to your inbox. No spam, just clarity.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder:text-midnight-600 focus:outline-none focus:border-electric-500/50" />
            <button type="submit" className="px-6 py-3 bg-electric-500 hover:bg-electric-400 text-white font-semibold rounded-xl transition-colors whitespace-nowrap">Subscribe</button>
          </form>
          <p className="text-midnight-600 text-xs mt-3">Free. No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}
