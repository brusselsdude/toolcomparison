import Link from 'next/link';

export const metadata = {
  title: 'About Us — Our Team, Mission & Methodology',
  description: 'Meet the NILUS team behind Tool Decision Engine. Learn about our testing methodology, editorial principles, and why we built this platform.',
  alternates: { canonical: 'https://tooldecisionengine.com/about/' },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-[-10%] w-[400px] h-[400px] bg-electric-500 rounded-full blur-[140px] opacity-[0.05]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-midnight-500 mb-8">
            <Link href="/" className="hover:text-electric-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-midnight-300">About</span>
          </nav>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            About Tool Decision Engine
          </h1>
          <p className="text-lg text-midnight-300 leading-relaxed">
            Tool Decision Engine is a publication by <strong className="text-white">NILUS</strong>, dedicated to helping professionals, teams, and businesses choose the right software tools through honest, data-driven comparisons.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="space-y-10">

          {/* Mission */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center text-xl">🎯</div>
              <h2 className="font-display text-xl font-bold text-white">Our Mission</h2>
            </div>
            <div className="space-y-4 text-midnight-300 leading-relaxed">
              <p>Choosing the right software shouldn&rsquo;t require hours of research, dozens of open tabs, and guessing which review is paid placement. Tool Decision Engine exists to solve that problem.</p>
              <p>We publish in-depth, side-by-side comparisons across every software category that matters: AI assistants, cloud platforms, project management tools, CRMs, cybersecurity products, developer tools, marketing platforms, and more. Every article includes our honest verdict, backed by real-world testing.</p>
              <p>Our goal is simple: help you make better tool decisions, faster. No fluff. No hidden agendas. Just clear, actionable analysis.</p>
            </div>
          </div>

          {/* Team */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-xl">👥</div>
              <h2 className="font-display text-xl font-bold text-white">Our Team</h2>
            </div>
            <div className="space-y-4 text-midnight-300 leading-relaxed mb-8">
              <p>Tool Decision Engine is produced by <strong className="text-white">NILUS</strong>, a technology consulting and publishing company. Our editorial team combines hands-on industry experience with a commitment to independent, unbiased analysis.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  name: 'Thomas Verhoeven',
                  role: 'Founder & Editor-in-Chief',
                  bio: 'Enterprise architect with 15+ years in IT consulting. Leads editorial direction and ensures every comparison meets our quality standards.',
                  emoji: '🧑‍💼',
                },
                {
                  name: 'Sarah De Clerck',
                  role: 'Senior Technical Writer',
                  bio: 'Former DevOps engineer turned tech writer. Covers cloud platforms, developer tools, and infrastructure comparisons.',
                  emoji: '👩‍💻',
                },
                {
                  name: 'Marc Janssen',
                  role: 'Product Analyst',
                  bio: 'Background in SaaS product management. Specializes in productivity tools, CRMs, and business software evaluations.',
                  emoji: '📊',
                },
                {
                  name: 'Elena Petrova',
                  role: 'Research & SEO Editor',
                  bio: 'Digital marketing specialist. Ensures our content reaches the people who need it while maintaining editorial integrity.',
                  emoji: '🔍',
                },
              ].map((member) => (
                <div key={member.name} className="bg-midnight-925 border border-white/[0.04] rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-midnight-900 flex items-center justify-center text-lg">{member.emoji}</div>
                    <div>
                      <p className="text-sm font-semibold text-white">{member.name}</p>
                      <p className="text-[11px] text-electric-400">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-midnight-400 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl">🔬</div>
              <h2 className="font-display text-xl font-bold text-white">Our Methodology</h2>
            </div>
            <div className="space-y-4 text-midnight-300 leading-relaxed">
              <p>Every comparison on Tool Decision Engine follows a structured, repeatable methodology. We don&rsquo;t just read feature lists — we use each tool in scenarios that match how real teams actually work.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-8">
              {[
                { step: '01', title: 'Hands-On Testing', desc: 'We sign up, configure, and use each tool for actual tasks — not synthetic benchmarks. Every comparison is based on real experience.' },
                { step: '02', title: 'Side-by-Side Tasks', desc: 'The same task is performed in each tool to ensure fair, apples-to-apples comparison across features, UX, and performance.' },
                { step: '03', title: 'Scoring Framework', desc: 'We evaluate on a consistent 1–10 scale across usability, feature depth, pricing value, performance, and ecosystem strength.' },
                { step: '04', title: 'Clear Verdicts', desc: 'Every comparison ends with a definitive recommendation, including who each tool is best for and specific use-case guidance.' },
                { step: '05', title: 'Fact Checking', desc: 'Pricing, features, and availability claims are verified against official sources before publication. We cite our sources.' },
                { step: '06', title: 'Regular Updates', desc: 'Software changes fast. We revisit and update comparisons when tools release major updates or change pricing.' },
              ].map((item) => (
                <div key={item.step} className="bg-midnight-925 border border-white/[0.04] rounded-xl p-4">
                  <span className="font-mono text-xs text-electric-400 font-semibold">{item.step}</span>
                  <h3 className="font-display text-sm font-semibold text-white mt-1.5">{item.title}</h3>
                  <p className="text-xs text-midnight-400 mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Policy */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl">📜</div>
              <h2 className="font-display text-xl font-bold text-white">Editorial Policy</h2>
            </div>
            <div className="space-y-4 text-midnight-300 leading-relaxed">
              <p><strong className="text-white">Independence first.</strong> Our verdicts are never influenced by partnerships, sponsorships, or advertising relationships. We call it like we see it — even when a tool&rsquo;s marketing team disagrees.</p>
              <p><strong className="text-white">Affiliate transparency.</strong> Some links on our site are affiliate links. This means we may earn a commission if you make a purchase through our link, at no additional cost to you. Affiliate relationships never influence our scores, verdicts, or editorial content. We recommend tools we believe in, regardless of whether they have an affiliate program.</p>
              <p><strong className="text-white">Advertising disclosure.</strong> We display ads through Google AdSense to support the free publication of our content. Advertisements are clearly distinguishable from editorial content and do not influence our comparisons.</p>
              <p><strong className="text-white">Corrections policy.</strong> If we get something wrong, we fix it. Readers can report errors through our <Link href="/contact/" className="text-electric-400 hover:text-electric-300">contact page</Link>, and we publish corrections promptly.</p>
              <p><strong className="text-white">Context over rankings.</strong> The &ldquo;best&rdquo; tool depends on your specific needs. We always explain who each tool is best for, not just which one scores highest overall.</p>
            </div>
          </div>

          {/* Company Info */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-xl">🏢</div>
              <h2 className="font-display text-xl font-bold text-white">Company Information</h2>
            </div>
            <div className="space-y-3 text-midnight-300 leading-relaxed">
              <p><strong className="text-white">Company:</strong> NILUS</p>
              <p><strong className="text-white">Website:</strong> <a href="https://tooldecisionengine.com" className="text-electric-400">tooldecisionengine.com</a></p>
              <p><strong className="text-white">Contact:</strong> <Link href="/contact/" className="text-electric-400">tooldecisionengine.com/contact</Link></p>
              <p><strong className="text-white">Content:</strong> 700+ in-depth tool comparisons across 9 categories</p>
              <p><strong className="text-white">Founded:</strong> 2025</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-electric-500 hover:bg-electric-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-electric-500/20 hover:shadow-electric-400/25 hover:-translate-y-0.5"
            >
              Browse Comparisons <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
