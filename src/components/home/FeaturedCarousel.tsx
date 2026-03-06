"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedPioneers, getFieldById, getInitials } from "@/lib/data";
import type { Pioneer } from "@/lib/types";
import {
  ParallaxFloat,
  GridPattern,
  FormulaText,
  CompassRose,
} from "@/components/shared/ParallaxFloat";

const floatingItems = [
  {
    content: <GridPattern size={140} color="#B8956A" />,
    x: 90,
    y: 8,
    speed: 0.3,
    rotate: 8,
    opacity: 0.1,
  },
  {
    content: <FormulaText text="∑(n=1→∞)" size={18} color="#8A8A9A" />,
    x: 3,
    y: 82,
    speed: -0.2,
    rotate: -6,
    opacity: 0.15,
  },
  {
    content: <FormulaText text="φ = 1.618…" size={16} color="#8A8A9A" />,
    x: 88,
    y: 78,
    speed: 0.25,
    rotate: 4,
    opacity: 0.14,
  },
  {
    content: <CompassRose size={65} color="#B8956A" />,
    x: 2,
    y: 15,
    speed: 0.35,
    rotate: -8,
    opacity: 0.1,
  },
];

function Card({ pioneer, index }: { pioneer: Pioneer; index: number }) {
  const field = getFieldById(pioneer.field);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link
        href={`/exhibitions/${field?.slug ?? pioneer.field}/${pioneer.slug}`}
        className="group block w-72 flex-none"
      >
        <div className="portrait-frame aspect-[3/4] rounded-sm mb-4">
          {pioneer.image ? (
            <img
              src={pioneer.image}
              alt={pioneer.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
          ) : (
            <div className="portrait-initials w-full h-full text-3xl">
              {getInitials(pioneer.name)}
            </div>
          )}
          <div className="absolute inset-0 overlay-bottom opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <p className="text-xs tracking-[0.15em] uppercase text-museum-stone mb-1.5">
          {field?.name}
        </p>
        <h3 className="font-display text-lg text-museum-ink group-hover:text-museum-gold-dark transition-colors duration-300">
          {pioneer.name}
        </h3>
        <p className="text-sm text-museum-slate mt-0.5">{pioneer.nameCn}</p>
        <p className="text-sm text-museum-stone mt-2 line-clamp-2 leading-relaxed">
          {pioneer.tagline}
        </p>
      </Link>
    </motion.div>
  );
}

export function FeaturedCarousel() {
  const featured = getFeaturedPioneers();

  return (
    <section className="relative py-24 px-5 sm:px-8 lg:px-10 overflow-hidden">
      {/* Vitruvian Man background — verified working URL */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/2/22/Da_Vinci_Vitruve_Luc_Viatour.jpg')",
          backgroundSize: "600px",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          filter: "grayscale(1)",
        }}
      />

      <ParallaxFloat items={floatingItems} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-museum-gold mb-3">
          Featured
        </p>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-museum-ink">
              Pioneering Figures
            </h2>
            <p className="text-museum-slate mt-2">杰出先驱</p>
          </div>
          <Link
            href="/timeline"
            className="group flex items-center gap-1.5 text-sm text-museum-stone hover:text-museum-gold-dark transition-colors duration-300 mb-1"
          >
            <span>跟随时间线看更多</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
        <div className="mb-12" />

        <div className="flex gap-8 overflow-x-auto scroll-clean pb-4">
          {featured.map((p, i) => (
            <Card key={p.id} pioneer={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
