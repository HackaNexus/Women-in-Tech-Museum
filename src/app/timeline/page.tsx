"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { pioneers, fields, getInitials, formatLifespan } from "@/lib/data";
import { useState, useMemo, useRef } from "react";

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
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const clipBottom = useTransform(scrollYProgress, [0, 0.5], [30, 0]);
  const clipPath = useTransform(clipBottom, (v) => `inset(0 0 ${v}% 0)`);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.10, 0.20]);
  const linesOpacity = useTransform(scrollYProgress, [0, 0.3], [0.85, 1]);

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
    <div className="bg-museum-bg min-h-screen pt-24 relative overflow-hidden">
      {/* Ada Lovelace background portrait — scroll-driven reveal from top to bottom */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ clipPath }}
      >
        <motion.img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg"
          alt=""
          className="w-full h-full object-cover object-top grayscale"
          style={{ opacity: bgOpacity }}
        />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.85) 100%)",
        }} />
      </motion.div>
      {/* Geometric line decorations — visibility synced with background */}
      <motion.svg
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ opacity: linesOpacity }}
      >
        <circle cx="10%" cy="15%" r="15%" fill="none" stroke="rgba(201,168,124,0.25)" strokeWidth="0.5" />
        <circle cx="90%" cy="80%" r="18%" fill="none" stroke="rgba(201,168,124,0.20)" strokeWidth="0.5" />
        <circle cx="90%" cy="80%" r="12%" fill="none" stroke="rgba(201,168,124,0.14)" strokeWidth="0.5" />
        <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
        <line x1="0%" y1="70%" x2="100%" y2="70%" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
        <line x1="20%" y1="0%" x2="20%" y2="100%" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" />
        <line x1="80%" y1="0%" x2="80%" y2="100%" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" />
        <line x1="0%" y1="5%" x2="35%" y2="100%" stroke="rgba(201,168,124,0.14)" strokeWidth="0.5" />
        <line x1="65%" y1="0%" x2="100%" y2="95%" stroke="rgba(201,168,124,0.14)" strokeWidth="0.5" />
        <circle cx="20%" cy="30%" r="3" fill="none" stroke="rgba(201,168,124,0.38)" strokeWidth="0.5" />
        <circle cx="80%" cy="30%" r="3" fill="none" stroke="rgba(201,168,124,0.38)" strokeWidth="0.5" />
        <circle cx="80%" cy="70%" r="3" fill="none" stroke="rgba(201,168,124,0.38)" strokeWidth="0.5" />
        {[[8, 45], [35, 85], [55, 15], [75, 55], [92, 25], [15, 75], [65, 90], [45, 40]].map(([x, y], i) => (
          <circle key={i} cx={`${x}%`} cy={`${y}%`} r="1.2" fill="rgba(201,168,124,0.50)" />
        ))}
      </motion.svg>

      <section ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-24">
        <nav className="text-xs text-white/45 tracking-wide mb-10">
          <Link href="/" className="hover:text-museum-gold transition-colors">Home</Link>
          <span className="mx-2 text-white/18">/</span>
          <span className="text-white/60">Timeline</span>
        </nav>

        <p className="text-[0.65rem] tracking-[0.4em] uppercase text-museum-gold/60 mb-4">
          Chronology
        </p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-light mb-2">
          Timeline
        </h1>
        <p className="text-white/45 mb-14">
          时间长廊 &mdash; 4,000 years of women in STEM
        </p>
        <p className="text-[0.65rem] text-white/55 mb-8">
          按出生年份筛选 · Filter by birth year
        </p>

        {/* Era pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setEraIdx(null)}
            className={`px-4 py-2 rounded-sm text-xs tracking-wide transition-colors ${
              eraIdx === null
                ? "bg-museum-gold text-museum-bg"
                : "text-white/55 border border-white/18 hover:border-museum-gold/40"
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
                  ? "bg-museum-gold text-museum-bg"
                  : "text-white/55 border border-white/18 hover:border-museum-gold/40"
              }`}
            >
              {e.cn} <span className="text-white/70">/ {e.label}</span>
            </button>
          ))}
        </div>

        {/* Field pills */}
        <div className="flex flex-wrap gap-2 mb-14">
          <button
            onClick={() => setFieldId(null)}
            className={`px-3 py-1.5 rounded-sm text-xs transition-colors ${
              fieldId === null
                ? "bg-museum-gold text-museum-bg"
                : "text-white/55 border border-white/18 hover:border-museum-gold/40"
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
                  : "text-white/55 border border-white/18 hover:border-museum-gold/40"
              }`}
              style={fieldId === f.id ? { backgroundColor: f.color } : undefined}
            >
              {f.nameCn} <span className="text-white/70">/ {f.name}</span>
            </button>
          ))}
        </div>

        {/* Timeline entries */}
        <div className="relative">
          <div className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-px bg-white/[0.06]" />

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
                  <div className="absolute left-5 sm:left-1/2 -translate-x-1/2 z-10 mt-5">
                    <div className="w-2 h-2 rounded-full ring-2 ring-museum-bg bg-museum-gold" />
                  </div>

                  <div className={`ml-12 sm:ml-0 sm:w-1/2 ${left ? "sm:pr-10 sm:text-right" : "sm:pl-10"}`}>
                    <Link
                      href={`/exhibitions/${f?.slug}/${p.slug}`}
                      className="group inline-block bg-museum-surface border border-white/[0.06] rounded-sm p-4 hover:border-museum-gold/20 hover:shadow-lg hover:shadow-black/20 transition-all max-w-sm"
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
                          <h3 className="font-display text-sm text-white/80 group-hover:text-museum-gold transition-colors">
                            {p.name}
                          </h3>
                          <p className="text-xs text-white/45">{p.nameCn}</p>
                        </div>
                      </div>
                      <p className={`text-[0.7rem] text-white/35 mt-2 ${left ? "sm:text-right" : ""}`}>
                        {formatLifespan(p.born, p.died)}
                      </p>
                      <p className={`text-xs text-white/45 mt-1 line-clamp-2 ${left ? "sm:text-right" : ""}`}>
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
          <div className="text-center py-24 text-white/45">
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
    </div>  );
}
