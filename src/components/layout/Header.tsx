"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const links = [
  { href: "/exhibitions", label: "Exhibitions" },
  { href: "/discoveries", label: "Discoveries" },
  { href: "/timeline", label: "Timeline" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-museum-bg/80 glass border-b border-white/[0.06] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-display text-[0.8rem] tracking-[0.25em] uppercase text-white/90 hover:text-museum-gold transition-colors duration-300"
          >
            Women in Tech Museum
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[0.75rem] tracking-[0.15em] uppercase text-white/60 hover:text-museum-gold transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/exhibitions"
              className="text-[0.7rem] tracking-[0.15em] uppercase border border-white/20 text-white/70 px-5 py-2 hover:border-museum-gold/50 hover:text-museum-gold transition-all duration-300"
            >
              Explore
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white/80"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-6 pt-2 border-t border-white/[0.06]">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm tracking-[0.12em] uppercase text-white/60 hover:text-museum-gold transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
