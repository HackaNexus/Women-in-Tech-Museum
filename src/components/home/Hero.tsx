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

const heroFloatingItems = [
  { content: <AtomIcon size={80} color="#D4BFA0" />, x: 6, y: 12, speed: 0.6, rotate: 15, opacity: 0.2 },
  { content: <OrbitRings size={100} color="#B8956A" />, x: 88, y: 18, speed: -0.4, rotate: 10, opacity: 0.15 },
  { content: <FormulaText text="E = mc²" size={22} color="#D4BFA0" />, x: 10, y: 75, speed: 0.3, rotate: -8, opacity: 0.2 },
  { content: <CompassRose size={75} color="#B8956A" />, x: 90, y: 72, speed: 0.5, rotate: 12, opacity: 0.15 },
  { content: <DNAHelix size={100} color="#D4BFA0" />, x: 3, y: 42, speed: -0.35, rotate: 5, opacity: 0.15 },
  { content: <FormulaText text="∫ f(x)dx" size={18} color="#B8956A" />, x: 93, y: 48, speed: 0.25, rotate: -5, opacity: 0.18 },
  { content: <FormulaText text="λ = h/p" size={16} color="#D4BFA0" />, x: 78, y: 88, speed: -0.2, rotate: 6, opacity: 0.15 },
  { content: <AtomIcon size={50} color="#B8956A" />, x: 20, y: 90, speed: 0.35, rotate: -12, opacity: 0.12 },
];

/** Stagger config for child animations */
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

  // Parallax: content moves up faster than bg
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-museum-deep"
    >
      {/* Da Vinci construction lines */}
      <DaVinciLines />

      {/* Star chart SVG pattern background */}
      <motion.div className="absolute inset-0 opacity-[0.08]" style={{ y: bgY }}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="star-chart" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
              <line x1="50" y1="80" x2="120" y2="50" stroke="#B8956A" strokeWidth="0.5" />
              <line x1="120" y1="50" x2="180" y2="90" stroke="#B8956A" strokeWidth="0.5" />
              <line x1="180" y1="90" x2="250" y2="60" stroke="#B8956A" strokeWidth="0.5" />
              <line x1="250" y1="60" x2="300" y2="100" stroke="#B8956A" strokeWidth="0.5" />
              <line x1="80" y1="200" x2="150" y2="180" stroke="#B8956A" strokeWidth="0.5" />
              <line x1="150" y1="180" x2="220" y2="220" stroke="#B8956A" strokeWidth="0.5" />
              <line x1="220" y1="220" x2="320" y2="190" stroke="#B8956A" strokeWidth="0.5" />
              <line x1="100" y1="300" x2="200" y2="320" stroke="#B8956A" strokeWidth="0.5" />
              <line x1="200" y1="320" x2="280" y2="290" stroke="#B8956A" strokeWidth="0.5" />
              <line x1="280" y1="290" x2="350" y2="340" stroke="#B8956A" strokeWidth="0.5" />
              {[[50,80],[120,50],[180,90],[250,60],[300,100],[80,200],[150,180],[220,220],[320,190],[100,300],[200,320],[280,290],[350,340],[30,150],[370,250],[160,360],[340,40],[200,130],[60,350],[390,150]].map(([cx,cy],i) => (
                <circle key={i} cx={cx} cy={cy} r={i%3===0?2.5:1.5} fill="#B8956A" fillOpacity={0.6+(i%3)*0.15}/>
              ))}
              <circle cx="200" cy="200" r="80" fill="none" stroke="#B8956A" strokeWidth="0.3" strokeDasharray="4,6"/>
              <circle cx="200" cy="200" r="140" fill="none" stroke="#B8956A" strokeWidth="0.2" strokeDasharray="3,8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#star-chart)"/>
        </svg>
      </motion.div>

      {/* Blurred portrait overlay */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/d/db/Margaret_Hamilton_-_restoration.jpg')",
          filter: "blur(40px) saturate(0.6)",
          transform: "scale(1.2)",
          y: bgY,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-museum-deep/60 via-museum-deep/40 to-museum-deep" />

      <ParallaxFloat items={heroFloatingItems} />

      {/* Main content — moves up + fades on scroll */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className="text-museum-gold text-[0.7rem] tracking-[0.4em] uppercase mb-8"
          >
            An Online Exhibition
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-normal leading-[1.1]"
          >
            Women in Tech
            <br />
            Museum
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="w-12 h-px bg-museum-gold mx-auto my-8"
          />

          <motion.p
            variants={fadeUp}
            className="text-white/70 text-lg sm:text-xl font-display"
          >
            她们改变了世界
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-museum-stone text-sm mt-6 tracking-wide"
          >
            111 Pioneers&ensp;/&ensp;10 Fields&ensp;/&ensp;4,000 Years of History
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12">
            <Link
              href="/exhibitions"
              className="inline-block border border-museum-gold/50 text-museum-gold text-xs tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-museum-gold/10 transition-all duration-300"
            >
              Begin Exploring
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-museum-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
