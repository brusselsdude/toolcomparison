'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/data/categories';

const cats = Object.values(CATEGORIES).slice(0, 6);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const catRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setCatOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClick(e) {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-midnight-950/90 backdrop-blur-xl shadow-xl shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-400 to-electric-600 flex items-center justify-center text-white font-display font-bold text-sm group-hover:scale-110 transition-transform">
            T
          </div>
          <span className="font-display text-lg font-bold text-white tracking-tight">
            Tool<span className="text-electric-400">Decision</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-electric-400' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-electric-400 rounded-full" />
                )}
              </Link>
            );
          })}

          {/* Categories dropdown */}
          <div className="relative" ref={catRef}>
            <button
              onClick={() => setCatOpen(!catOpen)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
                pathname.startsWith('/category') ? 'text-electric-400' : 'text-white/70 hover:text-white'
              }`}
            >
              Categories
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${catOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 10 6" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 1l4 4 4-4" />
              </svg>
            </button>

            {catOpen && (
              <div className="absolute top-full right-0 mt-3 w-72 bg-midnight-925 border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-white/5">
                  <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.15em]">
                    Browse by Category
                  </p>
                </div>
                {Object.values(CATEGORIES).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={() => setCatOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.04] group"
                  >
                    <span className="text-lg">{cat.emoji}</span>
                    <div>
                      <p className="text-sm font-medium text-white/85 group-hover:text-white transition-colors">
                        {cat.name}
                      </p>
                      <p className="text-[11px] text-white/30">{cat.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-4 bg-midnight-950 border-t border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-3 text-sm font-medium transition-colors ${
                pathname === link.href ? 'text-electric-400' : 'text-white/70'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-white/5 mt-2 pt-3">
            <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.15em] mb-2">Categories</p>
            {Object.values(CATEGORIES).map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="block py-2.5 text-sm text-white/70 hover:text-electric-400 transition-colors"
              >
                {cat.emoji} {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
