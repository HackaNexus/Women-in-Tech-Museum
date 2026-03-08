"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { pioneers, fields, getFieldById, getInitials } from "@/lib/data";
import type { Pioneer, Field } from "@/lib/types";

const ROMAN = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ"];

type CardSize = "sm" | "md" | "lg";

interface DiscoveryItem {
  id: string;
  achievement: string;
  achievementCn: string;
  pioneer: Pioneer;
  field: Field;
  size: CardSize;
  offset: number;
}

const SIZE_CYCLE: CardSize[] = ["lg", "sm", "md", "sm", "lg", "md", "sm", "md", "lg", "sm"];
const OFFSET_CYCLE = [5, 45, 20, 65, 10, 55, 30, 70, 15, 50, 35, 60, 8, 42, 25, 72, 18, 58];

function buildDiscoveries(): Map<string, DiscoveryItem[]> {
  const map = new Map<string, DiscoveryItem[]>();
  for (const f of fields) {
    const fieldPioneers = pioneers.filter((p) => p.field === f.id);
    const items: DiscoveryItem[] = fieldPioneers.map((pioneer, i) => ({
      id: `${f.id}-${pioneer.id}`,
      achievement: pioneer.achievements[0] || pioneer.tagline,
      achievementCn: pioneer.achievementsCn[0] || pioneer.taglineCn,
      pioneer,
      field: f,
      size: SIZE_CYCLE[i % SIZE_CYCLE.length],
      offset: OFFSET_CYCLE[i % OFFSET_CYCLE.length],
    }));
    map.set(f.id, items);
  }
  return map;
}

const sizeText: Record<CardSize, string> = {
  sm: "text-xs sm:text-sm",
  md: "text-sm sm:text-base lg:text-lg",
  lg: "text-base sm:text-lg lg:text-xl",
};

const sizePy: Record<CardSize, string> = {
  sm: "py-3 sm:py-4",
  md: "py-4 sm:py-6",
  lg: "py-5 sm:py-8",
};

const sizeBaseOpacity: Record<CardSize, string> = {
  sm: "opacity-75",
  md: "opacity-88",
  lg: "opacity-95",
};

/* ── Pioneer hover popup ── */
function PioneerPopup({ item }: { item: DiscoveryItem }) {
  const { pioneer, field } = item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute z-50 left-0 top-full mt-2"
      style={{ minWidth: 280, maxWidth: 340 }}
    >
      <Link
        href={`/exhibitions/${field.slug}/${pioneer.slug}`}
        className="block bg-museum-surface/95 glass border border-white/[0.08] p-4 group hover:border-museum-gold/30 transition-colors duration-300"
      >
        <div className="flex gap-3.5">
          <div className="w-14 h-18 flex-shrink-0 portrait-frame rounded-sm overflow-hidden">
            {pioneer.image ? (
              <img
                src={pioneer.image}
                alt={pioneer.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
            ) : (
              <div className="portrait-initials w-full h-full text-sm bg-museum-surface-light">
                {getInitials(pioneer.name)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-display text-base text-white/90 group-hover:text-museum-gold transition-colors duration-300 leading-tight">
              {pioneer.name}
            </h4>
            <p className="text-[0.65rem] text-white/80 mt-0.5">{pioneer.nameCn}</p>
            <p className="text-[0.6rem] tracking-[0.06em] uppercase mt-1.5" style={{ color: field.color }}>
              {field.nameCn}
            </p>
            <p className="text-xs text-white/85 mt-1.5 line-clamp-2 leading-relaxed">
              {pioneer.taglineCn}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-[0.6rem] tracking-[0.08em] uppercase text-white/85">
            View Pioneer →
          </span>
          <span className="text-[0.65rem] text-white/80">
            {pioneer.born < 0 ? `${Math.abs(pioneer.born)} BCE` : pioneer.born}
            {pioneer.died ? ` – ${pioneer.died}` : ""}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Single discovery card — Shopify Editions floating label style ── */
function DiscoveryCard({ item, index }: { item: DiscoveryItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`${sizePy[item.size]}`}
      style={{
        paddingLeft: `${item.offset}%`,
        zIndex: hovered ? 40 : 1,
        position: "relative",
      }}
    >
      <div
        className="relative inline-block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          className={`cursor-pointer ${sizeBaseOpacity[item.size]} hover:!opacity-100 transition-opacity duration-300`}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, delay: (index % 5) * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className={`inline-flex items-center gap-2 ${sizeText[item.size]}`}>
            <span className="font-light" style={{ color: `${item.field.color}77` }}>/</span>
            <span className="text-white tracking-wide font-light whitespace-nowrap">
              {item.achievementCn}
            </span>
            {item.size === "lg" && (
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[0.55rem] flex-shrink-0"
                style={{ backgroundColor: `${item.field.color}18`, color: item.field.color }}
              >
                ↗
              </span>
            )}
          </div>
          <p className="text-white/75 text-[0.6rem] mt-0.5 ml-4 whitespace-nowrap">{item.achievement}</p>
        </motion.div>

        <AnimatePresence>
          {hovered && <PioneerPopup item={item} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Field Section ── */
function FieldSection({
  field,
  items,
  index,
}: {
  field: Field;
  items: DiscoveryItem[];
  index: number;
}) {
  return (
    <section id={`field-${field.id}`} className="relative py-12 sm:py-16">
      {/* Field header */}
      <div className="px-6 sm:px-8 lg:pl-56 lg:pr-10 mb-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: field.color }} />
          <h2 className="text-[0.65rem] tracking-[0.2em] uppercase font-medium" style={{ color: field.color }}>
            {field.nameCn} <span className="normal-case tracking-normal text-white/70 font-normal">/ {field.name}</span>
          </h2>
          <div className="flex-1 h-px bg-white/[0.04]" />
          <span className="text-[0.6rem] text-white/85 font-mono">{ROMAN[index]}</span>
        </div>
      </div>

      {/* Cards */}
      <div className="px-6 sm:px-8 lg:pl-56 lg:pr-10">
        <div className="max-w-6xl mx-auto">
          {items.map((item, i) => (
            <DiscoveryCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Sidebar ── */
function Sidebar({
  activeField,
  onFieldClick,
}: {
  activeField: string;
  onFieldClick: (id: string) => void;
}) {
  return (
    <nav className="hidden lg:flex fixed left-0 top-0 bottom-0 w-48 z-30 flex-col justify-center pl-6 pr-4">
      <div className="space-y-0.5">
        {fields.map((f, i) => {
          const isActive = f.id === activeField;
          return (
            <button
              key={f.id}
              onClick={() => onFieldClick(f.id)}
              className={`group flex items-center gap-2.5 w-full text-left py-2 transition-all duration-300 ${
                isActive ? "opacity-100" : "opacity-75 hover:opacity-95"
              }`}
            >
              <span
                className={`text-[0.6rem] font-mono w-7 text-right flex-shrink-0 transition-colors duration-300 ${
                  isActive ? "text-museum-gold" : "text-white/85"
                }`}
              >
                {ROMAN[i]}
              </span>
              <span
                className={`text-[0.7rem] tracking-[0.04em] transition-colors duration-300 truncate ${
                  isActive ? "text-white font-medium" : "text-white/90"
                }`}
              >
                {f.nameCn} <span className="text-white/60">/ {f.name}</span>
              </span>
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="w-1 h-1 rounded-full ml-auto flex-shrink-0"
                  style={{ backgroundColor: f.color }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-8 pb-8">
        <p className="text-[0.55rem] text-white/85 leading-relaxed">
          © Women in Tech
          <br />
          Museum
        </p>
      </div>
    </nav>
  );
}

/* ── Mobile field nav ── */
function MobileFieldNav({
  activeField,
  onFieldClick,
}: {
  activeField: string;
  onFieldClick: (id: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current.querySelector(`[data-field="${activeField}"]`) as HTMLElement | null;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeField]);

  return (
    <div className="lg:hidden sticky top-16 z-30 bg-museum-bg/90 glass border-b border-white/[0.04]">
      <div ref={scrollRef} className="flex overflow-x-auto scroll-clean gap-1 px-4 py-2.5">
        {fields.map((f) => {
          const isActive = f.id === activeField;
          return (
            <button
              key={f.id}
              data-field={f.id}
              onClick={() => onFieldClick(f.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[0.65rem] tracking-wide transition-all duration-300 ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/75 hover:text-white/90"
              }`}
            >
              {f.nameCn} / {f.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function DiscoveriesPage() {
  const [activeField, setActiveField] = useState(fields[0].id);
  const discoveries = useMemo(() => buildDiscoveries(), []);

  const handleFieldClick = useCallback((fieldId: string) => {
    const el = document.getElementById(`field-${fieldId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("field-", "");
            setActiveField(id);
          }
        }
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );

    for (const f of fields) {
      const el = document.getElementById(`field-${f.id}`);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const totalAchievements = useMemo(
    () => pioneers.reduce((acc, p) => acc + p.achievements.length, 0),
    []
  );

  return (
    <div className="relative min-h-screen bg-museum-bg">
      {/* Hero */}
      <header className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 px-6 sm:px-8 lg:pl-56 lg:pr-10">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[0.65rem] tracking-[0.4em] uppercase text-museum-gold/60 mb-6"
          >
            Collection Index
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-5xl sm:text-6xl lg:text-8xl text-white font-light leading-[0.95]"
          >
            Discoveries{" "}
            <em className="display-italic text-museum-gold-light">&</em>
            <br />
            <em className="display-italic text-white/90">Inventions</em>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/75"
          >
            <span>{totalAchievements}+ Contributions</span>
            <span className="w-px h-4 bg-white/10" />
            <span>{fields.length} Fields</span>
            <span className="w-px h-4 bg-white/10" />
            <span>{pioneers.length} Pioneers</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-4 text-white/75 text-sm max-w-lg"
          >
            探索她们的发明、发现与突破——悬停查看每项成就背后的先驱者
            <span className="block text-white/60 mt-1">Explore their inventions, discoveries & breakthroughs — Hover to see the pioneer behind each achievement</span>
          </motion.p>
        </div>
      </header>

      <div className="divider opacity-20 mx-6 sm:mx-8 lg:ml-56 lg:mr-10" />

      {/* Sidebar */}
      <Sidebar activeField={activeField} onFieldClick={handleFieldClick} />

      {/* Mobile field nav */}
      <MobileFieldNav activeField={activeField} onFieldClick={handleFieldClick} />

      {/* Field sections */}
      <main className="relative pt-8 pb-32">
        {fields.map((f, i) => {
          const items = discoveries.get(f.id) || [];
          return <FieldSection key={f.id} field={f} items={items} index={i} />;
        })}
      </main>

      {/* Bottom CTA */}
      <footer className="relative pb-24 px-6 sm:px-8 lg:pl-56 lg:pr-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="divider opacity-20 mb-16" />
          <p className="font-display text-2xl sm:text-3xl text-white/85 display-italic">
            Every discovery tells her story
          </p>
          <p className="text-white/85 text-sm mt-3">每一项发现都诉说着她的故事</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/exhibitions"
              className="text-[0.7rem] tracking-[0.15em] uppercase border border-museum-gold/40 text-museum-gold px-8 py-3 hover:bg-museum-gold/10 transition-all duration-300"
            >
              Browse Pioneers
            </Link>
            <Link
              href="/timeline"
              className="text-[0.7rem] tracking-[0.15em] uppercase border border-white/40 text-white/90 px-8 py-3 hover:border-white/50 hover:text-white transition-all duration-300"
            >
              Timeline
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
