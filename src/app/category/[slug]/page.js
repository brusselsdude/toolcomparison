import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES, getAllCategories } from '@/data/categories';
import { getComparisonsByCategory } from '@/data/comparisons';
import { getPostsByCategory } from '@/data/postsRegistry';
import ComparisonCard from '@/components/ComparisonCard';

const SITE_URL = 'https://tooldecisionengine.com';

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map(slug => ({ slug }));
}

export function generateMetadata({ params }) {
  const cat = CATEGORIES[params.slug];
  if (!cat) return {};
  const url = `${SITE_URL}/category/${cat.slug}/`;
  return {
    title: `Best ${cat.name} Tools Compared — ${cat.name} Comparisons`,
    description: `${cat.description} Find the best ${cat.name.toLowerCase()} tools with in-depth, side-by-side comparisons and expert verdicts.`,
    alternates: { canonical: url },
    openGraph: { title: `${cat.name} Comparisons`, description: cat.description, url },
  };
}

export default function CategoryPage({ params }) {
  const cat = CATEGORIES[params.slug];
  if (!cat) notFound();

  const seen = new Set();
  const posts = [...getComparisonsByCategory(params.slug), ...getPostsByCategory(params.slug)]
    .filter(p => { if (seen.has(p.slug)) return false; seen.add(p.slug); return true; })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const allCats = getAllCategories();
  const pageUrl = `${SITE_URL}/category/${cat.slug}/`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#collection`,
        name: `${cat.name} Tool Comparisons`,
        description: cat.description,
        url: pageUrl,
        isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website` },
        numberOfItems: posts.length,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: cat.name },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[-8%] w-[400px] h-[400px] rounded-full blur-[130px] opacity-[0.06]" style={{ background: cat.accent }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-midnight-500 mb-8">
            <Link href="/" className="hover:text-electric-400 transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-midnight-300">{cat.name}</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} border ${cat.border} flex items-center justify-center text-3xl`}>{cat.emoji}</div>
            <div>
              <h1 className="font-display text-4xl font-extrabold text-white tracking-tight">{cat.name}</h1>
              <p className="text-midnight-400 mt-1">{cat.description}</p>
            </div>
          </div>
          <p className="text-sm text-midnight-500 mt-4">{posts.length} comparison{posts.length !== 1 ? 's' : ''}</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        {posts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map(c => <ComparisonCard key={c.slug} comparison={c} />)}
          </div>
        ) : (
          <div className="text-center py-20"><p className="text-midnight-500 text-lg">No comparisons yet.</p></div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="border-t border-white/[0.04] pt-14">
          <h2 className="font-display text-xl font-bold text-white mb-6">Other Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {allCats.filter(c => c.slug !== cat.slug).map(c => (
              <Link key={c.slug} href={`/category/${c.slug}/`} className={`group bg-gradient-to-br ${c.gradient} border ${c.border} rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]`}>
                <span className="text-xl">{c.emoji}</span>
                <h3 className="font-display text-sm font-semibold text-white mt-1.5">{c.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
