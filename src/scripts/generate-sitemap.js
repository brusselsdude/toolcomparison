// This script generates a static sitemap.xml at build time
// Run: node src/scripts/generate-sitemap.js
// Or it's called by the build-sitemap npm script

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://tooldecisionengine.com';
const TODAY = new Date().toISOString().split('T')[0];

// Load data
const { comparisons } = require('../data/comparisons');
const { postsRegistry } = require('../data/postsRegistry');
const { CATEGORIES } = require('../data/categories');

// Deduplicate slugs
const allSlugs = new Map();
comparisons.forEach(c => allSlugs.set(c.slug, c.date));
postsRegistry.forEach(p => { if (!allSlugs.has(p.slug)) allSlugs.set(p.slug, p.date); });

const urls = [];

// Static pages
urls.push({ loc: '/', priority: '1.0', changefreq: 'daily', lastmod: TODAY });
urls.push({ loc: '/about/', priority: '0.6', changefreq: 'monthly', lastmod: TODAY });
urls.push({ loc: '/contact/', priority: '0.5', changefreq: 'monthly', lastmod: TODAY });
urls.push({ loc: '/privacy/', priority: '0.4', changefreq: 'yearly', lastmod: TODAY });
urls.push({ loc: '/terms/', priority: '0.4', changefreq: 'yearly', lastmod: TODAY });

// Category pages
Object.keys(CATEGORIES).forEach(slug => {
  urls.push({ loc: `/category/${slug}/`, priority: '0.8', changefreq: 'weekly', lastmod: TODAY });
});

// All comparison/article pages
allSlugs.forEach((date, slug) => {
  urls.push({ loc: `/comparisons/${slug}/`, priority: '0.9', changefreq: 'monthly', lastmod: date || TODAY });
});

// Build XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(u => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const outPath = path.join(__dirname, '../../public/sitemap.xml');
fs.writeFileSync(outPath, xml);
console.log(`✅ Sitemap generated: ${urls.length} URLs → public/sitemap.xml`);
