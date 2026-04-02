import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center">
        <span className="text-7xl">🔍</span>
        <h1 className="font-display text-5xl font-extrabold text-white mt-6 mb-4">404</h1>
        <p className="text-midnight-400 text-lg mb-8 max-w-md mx-auto">
          This page doesn&apos;t exist. It might have been moved or the URL may be incorrect.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-electric-500 hover:bg-electric-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200"
        >
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
