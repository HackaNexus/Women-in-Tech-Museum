"use client";

import { motion } from "framer-motion";
import { fields, stats } from "@/lib/data";
import { Shelf } from "@/components/shared/Shelf";
import { FieldCard } from "@/components/shared/FieldCard";

export default function ExhibitionsPage() {
  const mid = Math.ceil(fields.length / 2);
  const row1 = fields.slice(0, mid);
  const row2 = fields.slice(mid);

  return (
    <div className="bg-museum-bg min-h-screen pt-24">
      <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pb-24">
        <p className="text-[0.65rem] tracking-[0.4em] uppercase text-museum-gold/60 mb-4">
          Explore
        </p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-light mb-2">
          Exhibition Halls
        </h1>
        <p className="text-white/45 text-lg mb-16">
          展览馆 &mdash; {stats.fieldCount} fields, {stats.pioneerCount} pioneers
        </p>

        <div className="bookshelf-wrapper bookshelf-dark">
          {[row1, row2].map((row, rowIdx) => (
            <Shelf key={rowIdx}>
              {row.map((field, i) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: rowIdx * 0.15 + i * 0.08,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  <FieldCard field={field} />
                </motion.div>
              ))}
            </Shelf>
          ))}
        </div>
      </section>
    </div>
  );
}
