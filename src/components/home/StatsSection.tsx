"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ParallaxFloat,
  OrbitRings,
  FormulaText,
  DNAHelix,
} from "@/components/shared/ParallaxFloat";
import { pioneers, fields } from "@/lib/data";

const floatingItems = [
  {
    content: <OrbitRings size={90} color="#C9A87C" />,
    x: 4,
    y: 12,
    speed: 0.3,
    rotate: 10,
    opacity: 0.06,
  },
  {
    content: <FormulaText text="∇ × E = −∂B/∂t" size={14} color="#7A7680" />,
    x: 90,
    y: 18,
    speed: -0.2,
    rotate: -5,
    opacity: 0.08,
  },
  {
    content: <DNAHelix size={80} color="#C9A87C" />,
    x: 92,
    y: 60,
    speed: 0.25,
    rotate: 8,
    opacity: 0.06,
  },
  {
    content: <FormulaText text="2πr" size={18} color="#7A7680" />,
    x: 6,
    y: 80,
    speed: 0.15,
    rotate: 6,
    opacity: 0.08,
  },
];

const galleryImages = pioneers
  .filter((p) => p.image)
  .slice(0, 10)
  .map((p) => ({
    src: p.image,
    name: p.name,
    field: fields.find((f) => f.id === p.field)?.nameCn ?? "",
  }));

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1200;
    const steps = 50;
    const inc = value / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= value) {
        setN(value);
        clearInterval(t);
      } else {
        setN(Math.floor(cur));
      }
    }, dur / steps);
    return () => clearInterval(t);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1 (0→0.45): text zooms from 6vw to 180vw
  const fontSize = useTransform(
    scrollYProgress,
    [0, 0.45],
    ["6vw", "180vw"]
  );
  const textY = useTransform(scrollYProgress, [0, 0.45], ["0%", "15%"]);
  const textScale = useTransform(scrollYProgress, [0, 0.45], [1, 1.2]);
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.45], [1, 0]);

  // Background pattern fades away
  const bgOpacity = useTransform(scrollYProgress, [0.15, 0.35], [1, 0]);

  // Phase 2 (0.45→1): gallery images + content fade in
  const galleryOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  const galleryScale = useTransform(scrollYProgress, [0.4, 0.6], [0.92, 1]);

  // Content section fades in later
  const contentOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.55, 0.7], [40, 0]);

  return (
    <>
      <section ref={containerRef} className="relative h-[400vh] bg-museum-bg">
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Ornamental bg (fades out as text zooms) */}
          <motion.div className="absolute inset-0" style={{ opacity: bgOpacity }}>
            <div className="absolute inset-0 opacity-[0.03]">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="classical-bg" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
                    <path d="M30,30 Q50,20 70,30 Q80,50 70,70 Q50,80 30,70 Q20,50 30,30" fill="none" stroke="#C9A87C" strokeWidth="0.6" />
                    <path d="M230,30 Q250,20 270,30 Q280,50 270,70 Q250,80 230,70 Q220,50 230,30" fill="none" stroke="#C9A87C" strokeWidth="0.6" />
                    <path d="M130,130 Q150,120 170,130 Q180,150 170,170 Q150,180 130,170 Q120,150 130,130" fill="none" stroke="#C9A87C" strokeWidth="0.4" />
                    <line x1="70" y1="50" x2="230" y2="50" stroke="#C9A87C" strokeWidth="0.3" strokeDasharray="8,5" />
                    <line x1="150" y1="70" x2="150" y2="230" stroke="#C9A87C" strokeWidth="0.3" strokeDasharray="8,5" />
                    {[[50, 150], [150, 250], [250, 150], [100, 100], [200, 200]].map(([cx, cy], i) => (
                      <circle key={i} cx={cx} cy={cy} r="1.5" fill="#C9A87C" fillOpacity="0.4" />
                    ))}
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#classical-bg)" />
              </svg>
            </div>
            <ParallaxFloat items={floatingItems} />
          </motion.div>

          {/* ── Phase 1: Zooming text ── */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: textOpacity }}
          >
            <motion.h2
              className="font-display font-light text-white/90 uppercase tracking-[0.05em] leading-none whitespace-nowrap text-center"
              style={{
                fontSize,
                y: textY,
                scale: textScale,
              }}
            >
              Our
              <br />
              <em className="display-italic text-museum-gold-light normal-case">Pioneers</em>
            </motion.h2>
          </motion.div>

          {/* ── Phase 2: Classical dark gallery with geometric lines ── */}
          <motion.div
            className="absolute inset-0"
            style={{ opacity: galleryOpacity, scale: galleryScale }}
          >
            {/* Deep dark base */}
            <div className="absolute inset-0 bg-[#060608]" />

            {/* Classical portrait mosaic — very low opacity background */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-0">
              {galleryImages.slice(0, 8).map((img, i) => {
                const placements = [
                  { col: "1 / 3", row: "1 / 2" },
                  { col: "3 / 4", row: "1 / 3" },
                  { col: "4 / 5", row: "1 / 2" },
                  { col: "1 / 2", row: "2 / 4" },
                  { col: "2 / 3", row: "2 / 3" },
                  { col: "4 / 5", row: "2 / 4" },
                  { col: "2 / 4", row: "3 / 4" },
                  { col: "1 / 2", row: "1 / 2" },
                ];
                const p = placements[i % placements.length];
                return (
                  <div
                    key={i}
                    className="overflow-hidden"
                    style={{
                      gridColumn: p.col,
                      gridRow: p.row,
                      opacity: 0.15 + (i % 3) * 0.05,
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.name}
                      className="w-full h-full object-cover grayscale"
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>

            {/* Dark overlay to deepen the portraits */}
            <div className="absolute inset-0" style={{
              background:
                "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(6,6,8,0.55) 0%, rgba(6,6,8,0.8) 100%)",
            }} />

            {/* Warm atmospheric glow */}
            <div className="absolute inset-0" style={{
              background:
                "radial-gradient(ellipse 50% 40% at 30% 25%, rgba(180,140,80,0.08) 0%, transparent 70%), " +
                "radial-gradient(ellipse 40% 35% at 75% 70%, rgba(120,90,60,0.06) 0%, transparent 65%)",
            }} />

            {/* Geometric line decorations — Shopify Editions style */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              {/* Large orbital rings */}
              <circle cx="15%" cy="20%" r="18%" fill="none" stroke="rgba(201,168,124,0.15)" strokeWidth="0.5" />
              <circle cx="15%" cy="20%" r="12%" fill="none" stroke="rgba(201,168,124,0.1)" strokeWidth="0.5" />
              <circle cx="85%" cy="75%" r="22%" fill="none" stroke="rgba(201,168,124,0.12)" strokeWidth="0.5" />
              <circle cx="85%" cy="75%" r="15%" fill="none" stroke="rgba(201,168,124,0.08)" strokeWidth="0.5" />

              {/* Thin connecting lines */}
              <line x1="0%" y1="35%" x2="100%" y2="35%" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
              <line x1="0%" y1="65%" x2="100%" y2="65%" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
              <line x1="25%" y1="0%" x2="25%" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              <line x1="75%" y1="0%" x2="75%" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

              {/* Diagonal accent lines */}
              <line x1="0%" y1="0%" x2="40%" y2="100%" stroke="rgba(201,168,124,0.08)" strokeWidth="0.5" />
              <line x1="60%" y1="0%" x2="100%" y2="100%" stroke="rgba(201,168,124,0.08)" strokeWidth="0.5" />

              {/* Small accent circles at intersections */}
              <circle cx="25%" cy="35%" r="4" fill="none" stroke="rgba(201,168,124,0.25)" strokeWidth="0.5" />
              <circle cx="75%" cy="35%" r="4" fill="none" stroke="rgba(201,168,124,0.25)" strokeWidth="0.5" />
              <circle cx="25%" cy="65%" r="4" fill="none" stroke="rgba(201,168,124,0.25)" strokeWidth="0.5" />
              <circle cx="75%" cy="65%" r="4" fill="none" stroke="rgba(201,168,124,0.25)" strokeWidth="0.5" />
              <circle cx="50%" cy="50%" r="5" fill="none" stroke="rgba(201,168,124,0.2)" strokeWidth="0.6" />

              {/* Diamond shapes */}
              <path d="M 50% 15% L 53% 20% L 50% 25% L 47% 20% Z" fill="none" stroke="rgba(201,168,124,0.15)" strokeWidth="0.5" />
              <path d="M 50% 75% L 53% 80% L 50% 85% L 47% 80% Z" fill="none" stroke="rgba(201,168,124,0.15)" strokeWidth="0.5" />

              {/* Dotted arcs */}
              <path d="M 10% 50% Q 25% 30% 40% 50%" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeDasharray="2,6" />
              <path d="M 60% 50% Q 75% 70% 90% 50%" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeDasharray="2,6" />

              {/* Tiny node dots */}
              {[[10, 20], [30, 80], [50, 10], [70, 90], [90, 30], [20, 55], [80, 45], [45, 70], [55, 30], [15, 85]].map(([x, y], i) => (
                <circle key={i} cx={`${x}%`} cy={`${y}%`} r="1.5" fill="rgba(201,168,124,0.3)" />
              ))}
            </svg>

            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "256px 256px",
            }} />

            {/* Vignette */}
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)",
            }} />

            {/* Mission statement */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: contentOpacity, y: contentY }}
            >
              <div className="text-center max-w-3xl px-8 relative z-10">
                <div className="w-12 h-px bg-museum-gold/30 mx-auto mb-8" />
                <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl text-white/90 display-italic leading-relaxed">
                  Our mission is to celebrate and preserve the stories of women
                  pioneers, inviting visitors to engage with the rich legacy of
                  their contributions through a contemporary platform.
                </blockquote>
                <p className="font-display text-base sm:text-lg text-white/35 display-italic mt-6">
                  我们的使命是颂扬和保存女性先驱的故事，
                  邀请访客通过当代平台感受她们贡献的丰厚遗产。
                </p>
                <div className="w-12 h-px bg-museum-gold/30 mx-auto mt-8" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats in normal document flow so Counter useInView triggers correctly */}
      <div className="relative bg-museum-bg">
        <div className="max-w-4xl mx-auto text-center px-5 sm:px-8 lg:px-10 py-24">
          <div className="grid grid-cols-3 gap-8 mb-16">
            {[
              { value: 111, label: "Pioneers", labelCn: "位先驱" },
              { value: 10, label: "Fields", labelCn: "个领域" },
              { value: 4000, suffix: "+", label: "Years", labelCn: "年历史" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl sm:text-5xl text-museum-gold font-light">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs tracking-[0.15em] uppercase text-white/30 mt-2">
                  {s.label}
                </p>
                <p className="text-xs text-white/20 mt-0.5">{s.labelCn}</p>
              </div>
            ))}
          </div>

          <div className="divider opacity-40 mb-16" />

          <div className="bg-museum-surface border border-white/[0.06] rounded-sm p-8 sm:p-10">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-museum-gold/70 mb-3">
              Open Collection
            </p>
            <p className="font-display text-lg sm:text-xl text-white/80">
              Continuously Updated &middot; Contributions Welcome
            </p>
            <p className="text-sm text-white/35 mt-2">
              持续更新中 &middot; 欢迎投稿
            </p>
            <p className="text-xs text-white/20 mt-4 max-w-md mx-auto leading-relaxed">
              This is a living collection. We welcome suggestions for additional
              pioneers, corrections to existing entries, and contributions of
              public domain images.
            </p>
            <p className="text-xs text-white/15 mt-2">
              欢迎推荐新的先驱人物、指正内容错误，或贡献公有领域图片。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
