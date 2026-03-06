"use client";

import { motion } from "framer-motion";
import { fields } from "@/lib/data";
import { Shelf } from "@/components/shared/Shelf";
import { FieldCard } from "@/components/shared/FieldCard";
import {
  ParallaxFloat,
  AtomIcon,
  DNAHelix,
  CompassRose,
  FormulaText,
} from "@/components/shared/ParallaxFloat";

const floatingItems = [
  {
    content: <AtomIcon size={90} color="#C9A87C" />,
    x: 93,
    y: 6,
    speed: -0.3,
    rotate: 12,
    opacity: 0.08,
  },
  {
    content: <DNAHelix size={110} color="#C9A87C" />,
    x: 2,
    y: 45,
    speed: 0.4,
    rotate: 8,
    opacity: 0.06,
  },
  {
    content: <CompassRose size={80} color="#C9A87C" />,
    x: 92,
    y: 68,
    speed: -0.25,
    rotate: -10,
    opacity: 0.06,
  },
  {
    content: <FormulaText text="F = ma" size={18} color="#C9A87C" />,
    x: 4,
    y: 85,
    speed: 0.2,
    rotate: 6,
    opacity: 0.08,
  },
];

export function FieldGrid() {
  const mid = Math.ceil(fields.length / 2);
  const row1 = fields.slice(0, mid);
  const row2 = fields.slice(mid);

  return (
    <section className="relative py-24 sm:py-32 bg-museum-deep overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="map-grid" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              {Array.from({ length: 5 }).map((_, i) => (
                <g key={i}>
                  <line x1={i * 50} y1="0" x2={i * 50} y2="200" stroke="#C9A87C" strokeWidth="0.3" />
                  <line x1="0" y1={i * 50} x2="200" y2={i * 50} stroke="#C9A87C" strokeWidth="0.3" />
                </g>
              ))}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
        </svg>
      </div>

      <ParallaxFloat items={floatingItems} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-museum-gold/60 mb-5">
            Explore
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl text-white font-light leading-[1.05]">
            <em className="display-italic text-white/60">Exhibition</em>
            <br />
            <em className="display-italic text-museum-gold-light">Halls</em>
          </h2>
          <p className="text-white/25 mt-4 text-lg">领域展台</p>
        </motion.div>

        <div className="bookshelf-wrapper bookshelf-dark">
          {[row1, row2].map((row, rowIdx) => (
            <Shelf key={rowIdx}>
              {row.map((field, i) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 35, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    delay: i * 0.075,
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <FieldCard field={field} />
                </motion.div>
              ))}
            </Shelf>
          ))}
        </div>
      </div>
    </section>
  );
}
