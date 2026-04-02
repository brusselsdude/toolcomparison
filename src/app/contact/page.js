'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[-8%] w-[400px] h-[400px] bg-electric-500 rounded-full blur-[140px] opacity-[0.05]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-midnight-500 mb-8">
            <Link href="/" className="hover:text-electric-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-midnight-300">Contact</span>
          </nav>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-midnight-300 leading-relaxed">
            Have a suggestion for a comparison? Found an error? Want to partner with us? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Info sidebar */}
          <div className="md:col-span-2 space-y-6">
            {[
              {
                icon: '💡',
                title: 'Suggest a Comparison',
                desc: 'Think we should compare two tools? Let us know and we\'ll add it to our roadmap.',
              },
              {
                icon: '🐛',
                title: 'Report an Error',
                desc: 'Pricing changed? Feature updated? Help us stay accurate.',
              },
              {
                icon: '🤝',
                title: 'Partnerships',
                desc: 'Interested in working together? Reach out with your proposal.',
              },
            ].map((item) => (
              <div key={item.title} className="glass-card p-5">
                <span className="text-xl">{item.icon}</span>
                <h3 className="font-display text-sm font-semibold text-white mt-2">{item.title}</h3>
                <p className="text-xs text-midnight-400 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {sent ? (
              <div className="glass-card p-10 text-center">
                <span className="text-5xl">✅</span>
                <h2 className="font-display text-2xl font-bold text-white mt-4 mb-2">Message Sent!</h2>
                <p className="text-midnight-400 mb-6">
                  Thanks for reaching out. We&apos;ll get back to you within 48 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="text-sm text-electric-400 hover:text-electric-300 transition-colors"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-midnight-400 uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-midnight-925 border border-white/[0.06] text-white text-sm placeholder:text-midnight-600 focus:outline-none focus:border-electric-500/50 focus:ring-2 focus:ring-electric-500/10 transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-midnight-400 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-midnight-925 border border-white/[0.06] text-white text-sm placeholder:text-midnight-600 focus:outline-none focus:border-electric-500/50 focus:ring-2 focus:ring-electric-500/10 transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-midnight-400 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-midnight-925 border border-white/[0.06] text-white text-sm focus:outline-none focus:border-electric-500/50 focus:ring-2 focus:ring-electric-500/10 transition-all"
                  >
                    <option value="">Select a topic...</option>
                    <option value="suggestion">Suggest a Comparison</option>
                    <option value="error">Report an Error</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-midnight-400 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-midnight-925 border border-white/[0.06] text-white text-sm placeholder:text-midnight-600 focus:outline-none focus:border-electric-500/50 focus:ring-2 focus:ring-electric-500/10 transition-all resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-electric-500 hover:bg-electric-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-electric-500/20 hover:shadow-electric-400/25"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
