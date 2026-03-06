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
    content: <AtomIcon size={90} color="#D4BFA0" />,
    x: 93,
    y: 6,
    speed: -0.3,
    rotate: 12,
    opacity: 0.12,
  },
  {
    content: <DNAHelix size={110} color="#D4BFA0" />,
    x: 2,
    y: 45,
    speed: 0.4,
    rotate: 8,
    opacity: 0.1,
  },
  {
    content: <CompassRose size={80} color="#D4BFA0" />,
    x: 92,
    y: 68,
    speed: -0.25,
    rotate: -10,
    opacity: 0.1,
  },
  {
    content: <FormulaText text="F = ma" size={18} color="#D4BFA0" />,
    x: 4,
    y: 85,
    speed: 0.2,
    rotate: 6,
    opacity: 0.12,
  },
];

export function FieldGrid() {
  const mid = Math.ceil(fields.length / 2);
  const row1 = fields.slice(0, mid);
  const row2 = fields.slice(mid);

  return (
    <section className="relative py-20 sm:py-28 bg-museum-ink overflow-hidden">
      {/* World map outline background — verified URL */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/e/ea/Equirectangular-projection.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(1) invert(1) brightness(2)",
        }}
      />

      {/* Inline SVG map grid overlay for guaranteed render */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="map-grid" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              {Array.from({ length: 5 }).map((_, i) => (
                <g key={i}>
                  <line x1={i * 50} y1="0" x2={i * 50} y2="200" stroke="#D4BFA0" strokeWidth="0.3" />
                  <line x1="0" y1={i * 50} x2="200" y2={i * 50} stroke="#D4BFA0" strokeWidth="0.3" />
                </g>
              ))}
              <text x="5" y="15" fill="#D4BFA0" fontSize="6" fontFamily="serif" opacity="0.5">45°N</text>
              <text x="5" y="115" fill="#D4BFA0" fontSize="6" fontFamily="serif" opacity="0.5">0°</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
        </svg>
      </div>

      <ParallaxFloat items={floatingItems} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          className="mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs tracking-[0.35em] uppercase text-museum-gold mb-4">
            Explore
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white">
            Exhibition Halls
          </h2>
          <p className="text-white/40 mt-2 text-lg">展览馆</p>
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
