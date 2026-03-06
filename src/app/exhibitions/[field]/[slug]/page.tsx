import Link from "next/link";
import { notFound } from "next/navigation";
import {
  pioneers,
  fields,
  getPioneerBySlug,
  getRelatedPioneers,
  getInitials,
  formatLifespan,
} from "@/lib/data";

export function generateStaticParams() {
  return pioneers.map((p) => {
    const f = fields.find((f) => f.id === p.field);
    return { field: f?.slug || p.field, slug: p.slug };
  });
}

export default async function PioneerPage({
  params,
}: {
  params: Promise<{ field: string; slug: string }>;
}) {
  const { field: fieldSlug, slug } = await params;
  const pioneer = getPioneerBySlug(slug);
  if (!pioneer) notFound();

  const field = fields.find((f) => f.id === pioneer.field);
  if (!field || field.slug !== fieldSlug) notFound();

  const related = getRelatedPioneers(pioneer, 4);

  return (
    <div className="bg-museum-ivory min-h-screen">
      {/* Hero banner with blurred portrait background */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        {pioneer.image ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${pioneer.image}')`,
                filter: "blur(60px) saturate(0.5) brightness(0.4)",
                transform: "scale(1.3)",
              }}
            />
            <div className="absolute inset-0 bg-museum-deep/50" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-museum-deep-soft to-museum-deep" />
        )}

        <div className="relative z-10 max-w-6xl mx-auto w-full px-5 sm:px-8 lg:px-10 pb-12 pt-32">
          <nav className="text-xs text-white/50 tracking-wide mb-10">
            <Link href="/" className="hover:text-museum-gold-light transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/exhibitions" className="hover:text-museum-gold-light transition-colors">
              Exhibitions
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/exhibitions/${field.slug}`}
              className="hover:text-museum-gold-light transition-colors"
            >
              {field.nameCn}
            </Link>
          </nav>

          <div className="flex flex-col sm:flex-row items-start gap-8">
            <div className="portrait-frame w-28 h-36 sm:w-36 sm:h-48 rounded-sm flex-none shadow-2xl border border-white/10">
              {pioneer.image ? (
                <img
                  src={pioneer.image}
                  alt={pioneer.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="portrait-initials w-full h-full text-3xl text-white/40">
                  {getInitials(pioneer.name)}
                </div>
              )}
            </div>

            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                {pioneer.name}
              </h1>
              <p className="font-display text-xl text-white/70 mt-1">
                {pioneer.nameCn}
              </p>
              <div className="flex flex-wrap gap-3 mt-5">
                <span className="text-xs text-white/60 border border-white/20 px-3 py-1 rounded-sm">
                  {formatLifespan(pioneer.born, pioneer.died)}
                </span>
                <span className="text-xs text-white/60 border border-white/20 px-3 py-1 rounded-sm">
                  {pioneer.nationalityCn}
                </span>
                <span
                  className="text-xs text-white/90 px-3 py-1 rounded-sm"
                  style={{ backgroundColor: field.color + "CC" }}
                >
                  {field.nameCn}
                </span>
              </div>
              <p className="font-display text-lg text-museum-gold-light mt-6 italic max-w-xl">
                {pioneer.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote block */}
      {pioneer.quote && (
        <section className="bg-museum-cream border-y border-museum-line">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-10 text-center">
            <blockquote className="font-display text-xl sm:text-2xl text-museum-ink italic leading-relaxed">
              &ldquo;{pioneer.quote}&rdquo;
            </blockquote>
            {pioneer.quoteCn && (
              <p className="text-museum-slate mt-3 text-sm">
                &ldquo;{pioneer.quoteCn}&rdquo;
              </p>
            )}
            {pioneer.quoteSource && (
              <p className="text-xs text-museum-stone mt-3">
                &mdash; {pioneer.quoteSource}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Content */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-museum-gold mb-4">
                Biography
              </p>
              <p className="text-museum-ink text-lg leading-relaxed">
                {pioneer.bio}
              </p>
              <p className="text-museum-slate mt-4 leading-relaxed">
                {pioneer.bioCn}
              </p>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-museum-gold mb-6">
                Key Achievements
              </p>
              <ul className="space-y-4">
                {pioneer.achievements.map((a, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2.5 flex-none"
                      style={{ backgroundColor: field.color }}
                    />
                    <div>
                      <p className="text-museum-ink">{a}</p>
                      <p className="text-sm text-museum-slate">
                        {pioneer.achievementsCn[i]}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* References / Citations */}
            {pioneer.references && pioneer.references.length > 0 && (
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-museum-gold mb-4">
                  References &amp; Citations
                </p>
                <ol className="space-y-2 list-decimal list-inside">
                  {pioneer.references.map((ref, i) => {
                    const urlMatch = ref.match(/(https?:\/\/[^\s,]+)/);
                    return (
                      <li key={i} className="text-sm text-museum-slate leading-relaxed">
                        {urlMatch ? (
                          <>
                            {ref.substring(0, ref.indexOf(urlMatch[1]))}
                            <a
                              href={urlMatch[1]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-museum-gold-dark hover:underline break-all"
                            >
                              {urlMatch[1]}
                            </a>
                            {ref.substring(ref.indexOf(urlMatch[1]) + urlMatch[1].length)}
                          </>
                        ) : (
                          ref
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-museum-cream rounded-sm p-6">
              <p className="text-xs tracking-[0.2em] uppercase text-museum-stone mb-5">
                At a Glance
              </p>
              <dl className="space-y-4 text-sm">
                {[
                  ["Born", pioneer.born < 0 ? `c. ${Math.abs(pioneer.born)} BCE` : String(pioneer.born)],
                  ...(pioneer.died ? [["Died", String(pioneer.died)]] : []),
                  ["Nationality", pioneer.nationality],
                  ["Field", field.name],
                  ["Era", pioneer.era],
                ].map(([dt, dd]) => (
                  <div key={dt}>
                    <dt className="text-museum-stone text-xs">{dt}</dt>
                    <dd className="text-museum-ink">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-museum-cream rounded-sm p-6">
              <p className="text-xs tracking-[0.2em] uppercase text-museum-stone mb-3">
                Image Credit
              </p>
              <p className="text-xs text-museum-stone leading-relaxed">
                {pioneer.imageCredit}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Related pioneers */}
      {related.length > 0 && (
        <section className="bg-museum-cream py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
            <p className="text-xs tracking-[0.2em] uppercase text-museum-gold mb-4">
              Also in {field.nameCn}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/exhibitions/${field.slug}/${r.slug}`}
                  className="group"
                >
                  <div className="portrait-frame aspect-[3/4] rounded-sm mb-3">
                    {r.image ? (
                      <img
                        src={r.image}
                        alt={r.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="portrait-initials w-full h-full">
                        {getInitials(r.name)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-sm text-museum-ink group-hover:text-museum-gold-dark transition-colors">
                    {r.name}
                  </h3>
                  <p className="text-xs text-museum-stone">{r.nameCn}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-10 flex justify-between">
        <Link
          href={`/exhibitions/${field.slug}`}
          className="text-xs tracking-[0.1em] uppercase text-museum-stone hover:text-museum-gold transition-colors"
        >
          &larr; Back to {field.nameCn}
        </Link>
        <Link
          href="/exhibitions"
          className="text-xs tracking-[0.1em] uppercase text-museum-stone hover:text-museum-gold transition-colors"
        >
          All Exhibitions &rarr;
        </Link>
      </div>
    </div>
  );
}
