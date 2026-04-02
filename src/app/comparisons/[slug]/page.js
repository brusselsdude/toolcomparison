import Link from 'next/link';
import { notFound } from 'next/navigation';
import { comparisons, getComparisonBySlug, getComparisonsByCategory } from '@/data/comparisons';
import { postsRegistry, getPostMeta, getPostsByCategory } from '@/data/postsRegistry';
import { getCategoryBySlug } from '@/data/categories';
import ComparisonCard from '@/components/ComparisonCard';
import ArticleContent from '@/components/ArticleContent';

const SITE_URL = 'https://tooldecisionengine.com';

export async function generateStaticParams() {
  const seen = new Set();
  return [...comparisons, ...postsRegistry]
    .filter(c => { if (seen.has(c.slug)) return false; seen.add(c.slug); return true; })
    .map(c => ({ slug: c.slug }));
}

function loadFullPost(slug) {
  try { return require(`@/data/posts/${slug}.js`).default; } catch { return null; }
}

export function generateMetadata({ params }) {
  const old = getComparisonBySlug(params.slug);
  const meta = getPostMeta(params.slug);
  const post = old || meta;
  if (!post) return {};

  const title = post.seoTitle || post.title;
  const url = `${SITE_URL}/comparisons/${post.slug}/`;
  const cat = getCategoryBySlug(post.category);

  return {
    title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      section: cat?.name || 'Comparison',
      tags: post.tools || [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.description,
    },
  };
}

export default function ComparisonPage({ params }) {
  const oldPost = getComparisonBySlug(params.slug);
  const newPost = oldPost ? null : loadFullPost(params.slug);
  const meta = oldPost || getPostMeta(params.slug);
  if (!meta && !newPost) notFound();

  const post = oldPost || newPost;
  const cat = getCategoryBySlug(post.category);

  const scores = post.scores || {};
  const hasScores = Object.keys(scores).length > 0;
  const topScore = hasScores ? Math.max(...Object.values(scores)) : 0;

  const relatedOld = post.category ? getComparisonsByCategory(post.category).filter(c => c.slug !== post.slug) : [];
  const relatedNew = post.category ? getPostsByCategory(post.category).filter(p => p.slug !== post.slug) : [];
  const related = [...relatedOld, ...relatedNew].slice(0, 3);

  const pageUrl = `${SITE_URL}/comparisons/${post.slug}/`;
  const title = post.seoTitle || post.title;

  // ── JSON-LD: Article + BreadcrumbList ──
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        author: { '@type': 'Organization', name: 'Tool Decision Engine', url: SITE_URL },
        publisher: { '@type': 'Organization', name: 'Tool Decision Engine', url: SITE_URL },
        mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
        inLanguage: 'en-US',
        about: (post.tools || []).map(t => ({ '@type': 'SoftwareApplication', name: t })),
        ...(post.verdict ? { review: {
          '@type': 'Review',
          reviewBody: post.verdictNote || `${post.verdict} is our top pick.`,
          itemReviewed: { '@type': 'SoftwareApplication', name: post.verdict },
          author: { '@type': 'Organization', name: 'Tool Decision Engine' },
          ...(hasScores && topScore ? { reviewRating: { '@type': 'Rating', ratingValue: topScore, bestRating: 10, worstRating: 1 } } : {}),
        }} : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          ...(cat ? [{ '@type': 'ListItem', position: 2, name: cat.name, item: `${SITE_URL}/category/${cat.slug}/` }] : []),
          { '@type': 'ListItem', position: cat ? 3 : 2, name: title },
        ],
      },
    ],
  };

  // Extract FAQ items from content for FAQ schema
  const faqItems = [];
  const content = post.content || '';
  const faqMatch = content.match(/<h2>FAQ<\/h2>([\s\S]*?)(?=<h2>|$)/);
  if (faqMatch) {
    const faqBlock = faqMatch[1];
    const qas = [...faqBlock.matchAll(/<h3>(.*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)];
    qas.forEach(m => {
      faqItems.push({
        '@type': 'Question',
        name: m[1].replace(/<[^>]+>/g, ''),
        acceptedAnswer: { '@type': 'Answer', text: m[2].replace(/<[^>]+>/g, '').trim() },
      });
    });
  }
  if (faqItems.length > 0) {
    jsonLd['@graph'].push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqItems,
    });
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[-10%] w-[400px] h-[400px] bg-electric-500 rounded-full blur-[140px] opacity-[0.06]" />
          <div className="absolute bottom-0 right-[-5%] w-[350px] h-[350px] bg-violet-600 rounded-full blur-[120px] opacity-[0.04]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-midnight-500 mb-8 flex-wrap">
            <Link href="/" className="hover:text-electric-400 transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            {cat && (
              <>
                <Link href={`/category/${cat.slug}/`} className="hover:text-electric-400 transition-colors">{cat.name}</Link>
                <span aria-hidden="true">/</span>
              </>
            )}
            <span className="text-midnight-300 truncate">{title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-5 flex-wrap">
            {cat && (
              <Link href={`/category/${cat.slug}/`} className={`px-3 py-1 rounded-full text-xs font-semibold ${cat.tagClass} hover:opacity-80 transition-opacity`}>
                {cat.emoji} {cat.name}
              </Link>
            )}
            <time dateTime={post.date} className="text-xs text-midnight-500">
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span className="text-xs text-midnight-600" aria-hidden="true">·</span>
            <span className="text-xs text-midnight-500">{post.readTime} min read</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
            {post.title}
          </h1>

          <p className="text-lg text-midnight-300 leading-relaxed max-w-2xl mb-10">{post.description}</p>

          {post.tools && post.tools.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {post.tools.map(tool => (
                <span key={tool} className="px-3 py-1.5 text-sm font-medium bg-midnight-900 text-midnight-200 rounded-lg border border-midnight-800">{tool}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SCORES + VERDICT ── */}
      {(hasScores || post.verdict) && (
        <section className="max-w-4xl mx-auto px-6 mb-14">
          <div className={`grid ${hasScores ? 'md:grid-cols-2' : ''} gap-5`}>
            {hasScores && (
              <div className="glass-card p-6">
                <h2 className="font-display text-sm font-semibold text-midnight-400 uppercase tracking-wider mb-5">Our Scores</h2>
                <div className="space-y-4">
                  {Object.entries(scores).sort(([,a],[,b]) => b - a).map(([tool, score]) => {
                    const isWinner = score === topScore;
                    return (
                      <div key={tool}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-sm font-medium ${isWinner ? 'text-white' : 'text-midnight-300'}`}>
                            {tool}
                            {isWinner && <span className="ml-2 text-[10px] text-electric-400 font-semibold uppercase">Winner</span>}
                          </span>
                          <span className={`text-lg font-display font-bold ${isWinner ? 'text-electric-400' : 'text-midnight-400'}`}>
                            {score}<span className="text-xs text-midnight-600">/10</span>
                          </span>
                        </div>
                        <div className="h-2.5 bg-midnight-900 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{
                            width: `${(score / 10) * 100}%`,
                            background: isWinner ? 'linear-gradient(90deg, #06b6d4, #22d3ee, #22ff88)' : 'linear-gradient(90deg, #1e293b, #334155)',
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {post.verdict && (
              <div className="glass-card p-6 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-electric-500 rounded-full blur-[80px] opacity-[0.07]" />
                <div className="relative">
                  <h2 className="font-display text-sm font-semibold text-midnight-400 uppercase tracking-wider mb-4">Our Verdict</h2>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric-500/20 to-electric-600/10 border border-electric-500/20 flex items-center justify-center">
                      <span className="text-2xl">{post.emoji}</span>
                    </div>
                    <div>
                      <p className="text-xs text-midnight-500 uppercase tracking-wider">Winner</p>
                      <p className="font-display text-2xl font-bold text-white">{post.verdict}</p>
                    </div>
                  </div>
                  {post.verdictNote && <p className="text-sm text-midnight-300 leading-relaxed">{post.verdictNote}</p>}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── ARTICLE ── */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <ArticleContent content={post.content} mermaids={post.mermaids || []} title={title} />
      </section>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="border-t border-white/[0.04] pt-14">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 rounded-full bg-electric-400" />
              <h2 className="font-display text-2xl font-bold text-white">Related Comparisons</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(c => <ComparisonCard key={c.slug} comparison={c} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
