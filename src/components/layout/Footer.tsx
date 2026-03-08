"use client";

import Link from "next/link";
import { pioneers, fields, stats, formatLifespan } from "@/lib/data";

const galleryPioneers = pioneers
  .filter((p) => p.image)
  .sort((a, b) => a.id - b.id)
  .slice(0, 28);

const row1 = galleryPioneers.slice(0, 14);
const row2 = galleryPioneers.slice(14);

function GalleryCard({
  pioneer,
}: {
  pioneer: (typeof pioneers)[0];
}) {
  const field = fields.find((f) => f.id === pioneer.field);
  return (
    <Link
      href={`/exhibitions/${field?.slug}/${pioneer.slug}`}
      className="group flex-none w-56 sm:w-64"
    >
      <div className="photo-frame aspect-square overflow-hidden rounded-sm mb-3">
        <img
          src={pioneer.image}
          alt={pioneer.name}
          className="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          loading="lazy"
        />
      </div>
      <h4 className="font-display text-sm text-white/60 group-hover:text-museum-gold transition-colors display-italic">
        {pioneer.name}
      </h4>
      <p className="text-[0.6rem] text-white/55 mt-0.5">
        {field?.name}
      </p>
      <p className="text-[0.6rem] text-white/35">
        {formatLifespan(pioneer.born, pioneer.died)}
      </p>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative">
      {/* ── Gallery section with textured background ── */}
      <section className="relative overflow-hidden">
        {/* Warm textured background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 120% 80% at 20% 50%, rgba(60,30,15,0.35) 0%, transparent 70%), " +
                "radial-gradient(ellipse 100% 60% at 80% 30%, rgba(20,40,50,0.3) 0%, transparent 70%), " +
                "radial-gradient(ellipse 80% 50% at 50% 80%, rgba(50,25,40,0.25) 0%, transparent 70%), " +
                "#0A0A0A",
            }}
          />
          {/* Grainy noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat",
              backgroundSize: "512px 512px",
            }}
          />
          {/* Subtle warm dust particles */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(1px 1px at 20% 30%, rgba(201,168,124,0.8), transparent), " +
                "radial-gradient(1px 1px at 40% 70%, rgba(201,168,124,0.6), transparent), " +
                "radial-gradient(1px 1px at 60% 20%, rgba(201,168,124,0.7), transparent), " +
                "radial-gradient(1px 1px at 80% 60%, rgba(201,168,124,0.5), transparent), " +
                "radial-gradient(1.5px 1.5px at 10% 80%, rgba(201,168,124,0.6), transparent), " +
                "radial-gradient(1px 1px at 70% 45%, rgba(201,168,124,0.7), transparent), " +
                "radial-gradient(1.5px 1.5px at 90% 15%, rgba(201,168,124,0.5), transparent)",
              backgroundSize: "300px 300px",
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Large title — "Reflection Of Science" */}
          <div className="pt-20 sm:pt-28 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-10">
            <div className="max-w-7xl mx-auto flex items-center gap-6">
              <h2 className="font-display text-5xl sm:text-7xl lg:text-[6.5rem] text-white/90 font-light leading-[0.95] flex-none">
                <em className="display-italic">Reflection</em>
              </h2>
              <div className="hidden sm:block flex-1 h-px bg-white/10" />
              <h2 className="font-display text-5xl sm:text-7xl lg:text-[6.5rem] text-white/90 font-light leading-[0.95] flex-none">
                <em className="display-italic">Of</em>{" "}
                <span className="text-museum-gold-light">Science</span>
              </h2>
            </div>
          </div>

          {/* Horizontal scrolling gallery row 1 — left to right */}
          <div className="overflow-hidden pb-8">
            <div className="flex gap-6 px-6 animate-marquee-slow whitespace-nowrap">
              {[...row1, ...row1].map((p, i) => (
                <GalleryCard key={`r1-${i}`} pioneer={p} />
              ))}
            </div>
          </div>

          {/* Horizontal scrolling gallery row 2 — right to left */}
          <div className="overflow-hidden pb-16 sm:pb-20">
            <div className="flex gap-6 px-6 animate-marquee-reverse whitespace-nowrap">
              {[...row2, ...row2].map((p, i) => (
                <GalleryCard key={`r2-${i}`} pioneer={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand marquee ── */}
      <div className="overflow-hidden py-12 sm:py-16" style={{ backgroundColor: "#c9a87f" }}>
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-[3rem] sm:text-[5rem] lg:text-[7rem] font-light tracking-[0.05em] uppercase mx-8"
              style={{
                WebkitTextStroke: "1px rgba(100,80,40,0.45)",
                color: "transparent",
              }}
            >
              Women in Tech Museum&ensp;&middot;&ensp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Footer info ── */}
      <div className="bg-museum-bg">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pb-16 pt-4">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <p className="font-display text-xs tracking-[0.25em] uppercase text-white/70 mb-4">
                Women in Tech Museum
              </p>
              <p className="text-sm leading-relaxed text-white/55 max-w-xs">
                Celebrating {stats.pioneerCount} women pioneers across {stats.fieldCount} fields of science,
                technology, engineering, and mathematics.
              </p>
            </div>

            <nav className="flex flex-col gap-3">
              <p className="text-xs tracking-[0.2em] uppercase text-white/45 mb-1">
                Navigate
              </p>
              {[
                { href: "/exhibitions", label: "Exhibitions" },
                { href: "/timeline", label: "Timeline" },
                { href: "/about", label: "About" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-white/55 hover:text-museum-gold transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-white/45 mb-3">
                Credits
              </p>
              <p className="text-xs leading-relaxed text-white/45">
                All biographical content is original, based on historical
                research. Portrait images are sourced from Wikimedia Commons
                and other public domain collections.
              </p>
            </div>
          </div>

          <div className="divider mt-12 mb-6 opacity-30" />

          <div className="flex items-center justify-between">
            <p className="text-xs text-white/35">
              &copy; {new Date().getFullYear()} Women in Tech Museum
            </p>
            <p className="text-[0.6rem] tracking-[0.2em] uppercase text-white/25">
              The Essence of Herstory
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
