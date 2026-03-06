"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { pioneers, fields, getInitials, formatLifespan } from "@/lib/data";
import { useState, useMemo } from "react";

const eras = [
  { label: "Ancient", cn: "古代", range: [-4000, 500] },
  { label: "15th–17th C.", cn: "15–17世纪", range: [1400, 1700] },
  { label: "18th C.", cn: "18世纪", range: [1700, 1800] },
  { label: "19th C.", cn: "19世纪", range: [1800, 1900] },
  { label: "Early 20th C.", cn: "20世纪初", range: [1900, 1950] },
  { label: "Late 20th C.", cn: "20世纪后期", range: [1950, 2000] },
  { label: "21st C.", cn: "21世纪", range: [2000, 2100] },
];

export default function TimelinePage() {
  const [eraIdx, setEraIdx] = useState<number | null>(null);
  const [fieldId, setFieldId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let r = [...pioneers].sort((a, b) => a.born - b.born);
    if (eraIdx !== null) {
      const [lo, hi] = eras[eraIdx].range;
      r = r.filter((p) => p.born >= lo && p.born < hi);
    }
    if (fieldId) r = r.filter((p) => p.field === fieldId);
    return r;
  }, [eraIdx, fieldId]);

  return (
    <div className="bg-museum-ivory min-h-screen pt-24">
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-24">
        <nav className="text-xs text-museum-stone tracking-wide mb-10">
          <Link href="/" className="hover:text-museum-gold transition-colors">Home</Link>
          <span className="mx-2 text-museum-line">/</span>
          <span className="text-museum-ink">Timeline</span>
        </nav>

        <p className="text-xs tracking-[0.3em] uppercase text-museum-gold mb-3">
          Chronology
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-museum-ink mb-2">
          Timeline
        </h1>
        <p className="text-museum-slate mb-14">
          时间长廊 &mdash; 4,000 years of women in STEM
        </p>

        {/* Era pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setEraIdx(null)}
            className={`px-4 py-2 rounded-sm text-xs tracking-wide transition-colors ${
              eraIdx === null
                ? "bg-museum-ink text-white"
                : "bg-white text-museum-slate border border-museum-line hover:border-museum-gold"
            }`}
          >
            All Eras
          </button>
          {eras.map((e, i) => (
            <button
              key={i}
              onClick={() => setEraIdx(eraIdx === i ? null : i)}
              className={`px-4 py-2 rounded-sm text-xs tracking-wide transition-colors ${
                eraIdx === i
                  ? "bg-museum-ink text-white"
                  : "bg-white text-museum-slate border border-museum-line hover:border-museum-gold"
              }`}
            >
              {e.cn}
            </button>
          ))}
        </div>

        {/* Field pills */}
        <div className="flex flex-wrap gap-2 mb-14">
          <button
            onClick={() => setFieldId(null)}
            className={`px-3 py-1.5 rounded-sm text-xs transition-colors ${
              fieldId === null
                ? "bg-museum-gold text-white"
                : "bg-white text-museum-slate border border-museum-line hover:border-museum-gold"
            }`}
          >
            All Fields
          </button>
          {fields.map((f) => (
            <button
              key={f.id}
              onClick={() => setFieldId(fieldId === f.id ? null : f.id)}
              className={`px-3 py-1.5 rounded-sm text-xs transition-colors ${
                fieldId === f.id
                  ? "text-white"
                  : "bg-white text-museum-slate border border-museum-line hover:border-museum-gold"
              }`}
              style={fieldId === f.id ? { backgroundColor: f.color } : undefined}
            >
              {f.nameCn}
            </button>
          ))}
        </div>

        {/* Timeline entries */}
        <div className="relative">
          <div className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-px bg-museum-line" />

          <div className="space-y-6">
            {filtered.map((p, i) => {
              const f = fields.find((x) => x.id === p.field);
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.8), duration: 0.35 }}
                  className={`relative flex items-start ${
                    left ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-5 sm:left-1/2 -translate-x-1/2 z-10 mt-5">
                    <div
                      className="w-2 h-2 rounded-full ring-2 ring-museum-ivory"
                      style={{ backgroundColor: f?.color || "#999" }}
                    />
                  </div>

                  {/* Card */}
                  <div className={`ml-12 sm:ml-0 sm:w-1/2 ${left ? "sm:pr-10 sm:text-right" : "sm:pl-10"}`}>
                    <Link
                      href={`/exhibitions/${f?.slug}/${p.slug}`}
                      className="group inline-block bg-white rounded-sm p-4 border border-museum-line hover:border-museum-gold/40 hover:shadow-sm transition-all max-w-sm"
                    >
                      <div className={`flex items-center gap-3 ${left ? "sm:flex-row-reverse" : ""}`}>
                        <div className="portrait-frame w-10 h-10 rounded-full flex-none overflow-hidden">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="portrait-initials w-full h-full text-xs">
                              {getInitials(p.name)}
                            </div>
                          )}
                        </div>
                        <div className={left ? "sm:text-right" : ""}>
                          <h3 className="font-display text-sm text-museum-ink group-hover:text-museum-gold-dark transition-colors">
                            {p.name}
                          </h3>
                          <p className="text-xs text-museum-stone">{p.nameCn}</p>
                        </div>
                      </div>
                      <p className={`text-[0.7rem] text-museum-stone/60 mt-2 ${left ? "sm:text-right" : ""}`}>
                        {formatLifespan(p.born, p.died)}
                      </p>
                      <p className={`text-xs text-museum-slate mt-1 line-clamp-2 ${left ? "sm:text-right" : ""}`}>
                        {p.taglineCn}
                      </p>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-museum-stone">
            <p>No results for this filter combination.</p>
            <button
              onClick={() => { setEraIdx(null); setFieldId(null); }}
              className="mt-3 text-museum-gold hover:underline text-sm"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
