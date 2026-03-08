"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import { DaVinciLines } from "./DaVinciLines";
import {
  ParallaxFloat,
  AtomIcon,
  OrbitRings,
  FormulaText,
  CompassRose,
  DNAHelix,
} from "@/components/shared/ParallaxFloat";
import { stats } from "@/lib/data";

const heroFloatingItems = [
  { content: <AtomIcon size={80} color="#C9A87C" />, x: 6, y: 12, speed: 0.6, rotate: 15, opacity: 0.3 },
  { content: <OrbitRings size={100} color="#A07D52" />, x: 88, y: 18, speed: -0.4, rotate: 10, opacity: 0.25 },
  { content: <FormulaText text="E = mc²" size={22} color="#C9A87C" />, x: 10, y: 75, speed: 0.3, rotate: -8, opacity: 0.3 },
  { content: <CompassRose size={75} color="#A07D52" />, x: 90, y: 72, speed: 0.5, rotate: 12, opacity: 0.22 },
  { content: <DNAHelix size={100} color="#C9A87C" />, x: 3, y: 42, speed: -0.35, rotate: 5, opacity: 0.22 },
  { content: <FormulaText text="∫ f(x)dx" size={18} color="#A07D52" />, x: 93, y: 48, speed: 0.25, rotate: -5, opacity: 0.25 },
];

const scatteredPhotos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/db/Margaret_Hamilton_-_restoration.jpg",
    alt: "Margaret Hamilton",
    className: "w-28 sm:w-36 lg:w-44 aspect-[3/4]",
    style: { top: "8%", left: "4%", rotate: "-6deg" },
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Marie_Curie_c._1920s.jpg",
    alt: "Marie Curie",
    className: "w-24 sm:w-32 lg:w-40 aspect-[3/4]",
    style: { top: "12%", right: "5%", rotate: "4deg" },
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Fei-Fei_Li_at_AI_for_Good_2017.jpg/500px-Fei-Fei_Li_at_AI_for_Good_2017.jpg",
    alt: "Fei-Fei Li",
    className: "w-20 sm:w-28 lg:w-32 aspect-[3/4]",
    style: { bottom: "18%", left: "6%", rotate: "5deg" },
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Maryam_Mirzakhani_in_Seoul_2014.jpg",
    alt: "Maryam Mirzakhani",
    className: "w-22 sm:w-30 lg:w-36 aspect-[3/4]",
    style: { bottom: "15%", right: "4%", rotate: "-3deg" },
  },
];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.8 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeInOut" } },
};

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-museum-bg"
    >
      <DaVinciLines />

      <div className="absolute inset-0 bg-museum-bg" />

      <ParallaxFloat items={heroFloatingItems} />

      {/* Scattered portrait photos — Lumen style */}
      {scatteredPhotos.map((photo, i) => (
        <motion.div
          key={i}
          className={`absolute ${photo.className} photo-frame overflow-hidden opacity-0 hidden sm:block`}
          style={photo.style}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + i * 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <motion.div style={{ y: bgY }}>
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-80 transition-all duration-700"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className="text-museum-gold text-[0.65rem] tracking-[0.45em] uppercase mb-10"
          >
            An Online Exhibition
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-light leading-[0.95]"
          >
            Women{" "}
            <em className="display-italic text-museum-gold-light">in</em>
            <br />
            Tech Museum
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="w-16 h-px bg-museum-gold/40 mx-auto my-10"
          />

          <motion.p
            variants={fadeUp}
            className="text-white/80 text-xl sm:text-2xl font-display display-italic"
          >
            她们改变了世界
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-white/65 text-sm mt-6 tracking-widest"
          >
            {stats.pioneerCount} Pioneers&ensp;/&ensp;{stats.fieldCount} Fields&ensp;/&ensp;{stats.yearSpan.toLocaleString()}+ Years
          </motion.p>

          <motion.div variants={fadeUp} className="mt-14">
            <Link
              href="/exhibitions"
              className="inline-block border border-museum-gold/40 text-museum-gold text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-museum-gold/10 hover:border-museum-gold/60 transition-all duration-500"
            >
              Begin Exploring
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-[0.6rem] tracking-[0.3em] uppercase text-white/75">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-museum-gold/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
