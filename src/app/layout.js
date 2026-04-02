import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const SITE_URL = 'https://tooldecisionengine.com';
const SITE_NAME = 'Tool Decision Engine';
const SITE_DESC = 'In-depth, side-by-side comparisons of the best software tools. AI, SaaS, cloud, dev tools, and more — tested and reviewed so you can choose with confidence.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Find the Best Tool for Every Job`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  keywords: [
    'tool comparison', 'software comparison', 'best software tools', 'SaaS comparison',
    'AI tools comparison', 'ChatGPT vs Claude', 'best project management tool',
    'best CRM', 'best VPN', 'cloud comparison', 'AWS vs Azure',
    'developer tools', 'SEO tools comparison', 'no-code tools', 'automation tools',
  ],
  authors: [{ name: 'NILUS', url: SITE_URL }],
  creator: SITE_NAME,
  publisher: 'NILUS',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Find the Best Tool for Every Job`,
    description: SITE_DESC,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Find the Best Tool for Every Job`,
    description: SITE_DESC,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESC,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?search={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'NILUS',
      url: SITE_URL,
      description: SITE_DESC,
      foundingDate: '2025',
      sameAs: [],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-7Q1336M9BB" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-7Q1336M9BB');`,
          }}
        />

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5660843310926667"
          crossOrigin="anonymous"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
