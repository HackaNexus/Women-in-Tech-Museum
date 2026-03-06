import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-museum-deep text-museum-stone">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-xs tracking-[0.25em] uppercase text-museum-cream/90 mb-4">
              Women in Tech Museum
            </p>
            <p className="text-sm leading-relaxed text-museum-stone/80 max-w-xs">
              Celebrating 100 women pioneers across 10 fields of science,
              technology, engineering, and mathematics.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <p className="text-xs tracking-[0.2em] uppercase text-museum-cream/60 mb-1">Navigate</p>
            {[
              { href: "/exhibitions", label: "Exhibitions" },
              { href: "/timeline", label: "Timeline" },
              { href: "/about", label: "About" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-museum-stone/80 hover:text-museum-gold-light transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-museum-cream/60 mb-3">Credits</p>
            <p className="text-xs leading-relaxed text-museum-stone/60">
              All biographical content is original, based on historical research.
              Portrait images are sourced from Wikimedia Commons and other public
              domain collections.
            </p>
          </div>
        </div>

        <div className="divider mt-12 mb-6 opacity-20" />

        <p className="text-xs text-museum-stone/40 text-center">
          &copy; {new Date().getFullYear()} Women in Tech Museum
        </p>
      </div>
    </footer>
  );
}
