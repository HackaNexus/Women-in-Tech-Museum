import Link from "next/link";
import { notFound } from "next/navigation";
import { fields, getPioneersByField, getFieldBySlug, getInitials, formatLifespan } from "@/lib/data";

export function generateStaticParams() {
  return fields.map((f) => ({ field: f.slug }));
}

export default async function FieldPage({
  params,
}: {
  params: Promise<{ field: string }>;
}) {
  const { field: slug } = await params;
  const field = getFieldBySlug(slug);
  if (!field) notFound();

  const list = getPioneersByField(field.id);

  return (
    <div className="bg-museum-ivory min-h-screen pt-24">
      {/* Field header */}
      <section
        className="pb-16 px-5 sm:px-8 lg:px-10"
        style={{
          background: `linear-gradient(135deg, ${field.color}0D 0%, transparent 50%)`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-museum-stone tracking-wide mb-10">
            <Link href="/" className="hover:text-museum-gold transition-colors">
              Home
            </Link>
            <span className="mx-2 text-museum-line">/</span>
            <Link
              href="/exhibitions"
              className="hover:text-museum-gold transition-colors"
            >
              Exhibitions
            </Link>
            <span className="mx-2 text-museum-line">/</span>
            <span className="text-museum-ink">{field.nameCn}</span>
          </nav>

          <div className="flex items-start gap-4">
            <div
              className="w-1 h-14 rounded-full flex-none mt-1"
              style={{ backgroundColor: field.color }}
            />
            <div>
              <h1 className="font-display text-4xl sm:text-5xl text-museum-ink">
                {field.nameCn}
              </h1>
              <p className="text-museum-slate mt-1">{field.name}</p>
            </div>
          </div>

          <p className="mt-8 text-museum-ink max-w-3xl leading-relaxed">
            {field.description}
          </p>
          <p className="mt-3 text-museum-slate max-w-3xl text-sm leading-relaxed">
            {field.descriptionCn}
          </p>
        </div>
      </section>

      {/* Pioneer grid */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-24">
        <p className="text-sm text-museum-stone mb-10">
          {list.length} pioneers in this exhibition
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {list.map((p) => (
            <Link
              key={p.id}
              href={`/exhibitions/${field.slug}/${p.slug}`}
              className="group"
            >
              <div className="portrait-frame aspect-[3/4] rounded-sm mb-4">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  />
                ) : (
                  <div className="portrait-initials w-full h-full text-2xl">
                    {getInitials(p.name)}
                  </div>
                )}
              </div>
              <h3 className="font-display text-base text-museum-ink group-hover:text-museum-gold-dark transition-colors">
                {p.name}
              </h3>
              <p className="text-sm text-museum-slate">{p.nameCn}</p>
              <p className="text-xs text-museum-stone mt-1">
                {formatLifespan(p.born, p.died)}
              </p>
              <p className="text-xs text-museum-stone mt-1.5 line-clamp-2 leading-relaxed">
                {p.taglineCn}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
