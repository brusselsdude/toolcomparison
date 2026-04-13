const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://tooldecisionengine.com';

const content = `# Tool Decision Engine — robots.txt
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl-delay for polite bots
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /
`;

const outPath = path.join(__dirname, '../../public/robots.txt');
fs.writeFileSync(outPath, content);
console.log('✅ robots.txt generated → public/robots.txt');
