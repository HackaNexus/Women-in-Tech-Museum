"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { pioneers, fields, getFieldById, getInitials } from "@/lib/data";
import type { Pioneer } from "@/lib/types";

interface FloatingItem {
  text: string;
  pioneer: Pioneer;
  fieldColor: string;
  fieldName: string;
  x: number;
  y: number;
  size: "sm" | "md" | "lg";
}

const PREVIEW_POSITIONS = [
  { x: 5, y: 8, size: "lg" as const },
  { x: 52, y: 4, size: "sm" as const },
  { x: 78, y: 12, size: "md" as const },
  { x: 20, y: 22, size: "md" as const },
  { x: 60, y: 20, size: "lg" as const },
  { x: 88, y: 28, size: "sm" as const },
  { x: 10, y: 36, size: "sm" as const },
  { x: 38, y: 34, size: "lg" as const },
  { x: 72, y: 38, size: "md" as const },
  { x: 25, y: 50, size: "md" as const },
  { x: 55, y: 48, size: "sm" as const },
  { x: 82, y: 52, size: "lg" as const },
  { x: 8, y: 62, size: "lg" as const },
  { x: 42, y: 64, size: "sm" as const },
  { x: 68, y: 60, size: "md" as const },
  { x: 18, y: 76, size: "sm" as const },
  { x: 50, y: 78, size: "lg" as const },
  { x: 85, y: 74, size: "md" as const },
];

const sizeClass: Record<string, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base sm:text-lg",
};

const sizeOpacity: Record<string, number> = {
  sm: 0.25,
  md: 0.4,
  lg: 0.6,
};

function buildPreviewItems(): FloatingItem[] {
  const selected: FloatingItem[] = [];
  const perField = new Map<string, Pioneer[]>();
  for (const p of pioneers) {
    const arr = perField.get(p.field) || [];
    arr.push(p);
    perField.set(p.field, arr);
  }

  const pickIndices = [0, 3, 1, 4, 2, 5, 0, 2, 4, 1, 3, 5, 0, 4, 2, 1, 3, 5];
  let slotIdx = 0;
  for (const f of fields) {
    const arr = perField.get(f.id) || [];
    if (arr.length === 0) continue;
    const count = Math.min(2, PREVIEW_POSITIONS.length - slotIdx, arr.length);
    for (let j = 0; j < count; j++) {
      if (slotIdx >= PREVIEW_POSITIONS.length) break;
      const pIdx = pickIndices[slotIdx % pickIndices.length] % arr.length;
      const p = arr[pIdx];
      const pos = PREVIEW_POSITIONS[slotIdx];
      selected.push({
        text: p.achievementsCn[0] || p.taglineCn,
        pioneer: p,
        fieldColor: f.color,
        fieldName: f.nameCn,
        x: pos.x,
        y: pos.y,
        size: pos.size,
      });
      slotIdx++;
    }
  }
  return selected;
}

function PreviewCard({ item, index }: { item: FloatingItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute"
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: hovered ? 20 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className={`whitespace-nowrap cursor-default ${sizeClass[item.size]}`}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: sizeOpacity[item.size] }}
        viewport={{ once: true }}
        whileHover={{ opacity: 0.9, scale: 1.04 }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
      >
        <span style={{ color: `${item.fieldColor}66` }}>/</span>
        <span className="text-white/70 tracking-wide font-light ml-1">{item.text}</span>
      </motion.div>

      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 top-full mt-2 bg-museum-surface/95 glass border border-white/[0.08] px-3 py-2 min-w-[180px]"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 flex-shrink-0 portrait-frame rounded-full overflow-hidden">
              {item.pioneer.image ? (
                <img
                  src={item.pioneer.image}
                  alt={item.pioneer.name}
                  className="w-full h-full object-cover grayscale"
                  loading="lazy"
                />
              ) : (
                <div className="portrait-initials w-full h-full text-[0.5rem]">
                  {getInitials(item.pioneer.name)}
                </div>
              )}
            </div>
            <div>
              <p className="text-xs text-white/80">{item.pioneer.nameCn}</p>
              <p className="text-[0.6rem]" style={{ color: item.fieldColor }}>{item.fieldName}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function DiscoveriesPreview() {
  const items = useMemo(() => buildPreviewItems(), []);

  return (
    <section className="relative py-28 sm:py-36 bg-museum-bg overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-museum-gold/60 mb-5">
            Collection Index
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl text-white font-light leading-[1.05]">
              Discoveries{" "}
              <em className="display-italic text-museum-gold-light">&</em>
              <br />
              <em className="display-italic text-white/60">Inventions</em>
            </h2>
            <Link
              href="/discoveries"
              className="group inline-flex items-center gap-3 text-white/40 hover:text-museum-gold transition-colors duration-300 self-start sm:self-auto"
            >
              <span className="text-sm tracking-wide">Explore All</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
          <p className="text-white/20 mt-4 text-sm">
            悬停探索每项成就背后的先驱者
          </p>
        </motion.div>

        {/* Floating constellation */}
        <div className="relative" style={{ height: "60vh", minHeight: 420, maxHeight: 600 }}>
          {/* Decorative lines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            <line x1="0%" y1="60%" x2="100%" y2="60%" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            <line x1="33%" y1="0%" x2="33%" y2="100%" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
            <line x1="66%" y1="0%" x2="66%" y2="100%" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          </svg>

          {items.map((item, i) => (
            <PreviewCard key={`${item.pioneer.id}-${i}`} item={item} index={i} />
          ))}

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-museum-bg to-transparent pointer-events-none" />
        </div>

        {/* Bottom link */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link
            href="/discoveries"
            className="inline-block border border-white/15 text-white/50 text-xs tracking-[0.2em] uppercase px-10 py-4 hover:border-museum-gold/40 hover:text-museum-gold transition-all duration-500"
          >
            View Full Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
