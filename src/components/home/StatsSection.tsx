"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ParallaxFloat,
  OrbitRings,
  FormulaText,
  DNAHelix,
} from "@/components/shared/ParallaxFloat";

const floatingItems = [
  {
    content: <OrbitRings size={90} color="#B8956A" />,
    x: 4,
    y: 12,
    speed: 0.3,
    rotate: 10,
    opacity: 0.12,
  },
  {
    content: <FormulaText text="∇ × E = −∂B/∂t" size={14} color="#8A8A9A" />,
    x: 90,
    y: 18,
    speed: -0.2,
    rotate: -5,
    opacity: 0.12,
  },
  {
    content: <DNAHelix size={80} color="#B8956A" />,
    x: 92,
    y: 60,
    speed: 0.25,
    rotate: 8,
    opacity: 0.1,
  },
  {
    content: <FormulaText text="2πr" size={18} color="#8A8A9A" />,
    x: 6,
    y: 80,
    speed: 0.15,
    rotate: 6,
    opacity: 0.12,
  },
];

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
  return (
    <section className="relative py-28 px-5 sm:px-8 lg:px-10 overflow-hidden">
      {/* Classical engraving-style SVG background */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="classical-bg" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
              {/* Ornamental frame corners */}
              <path d="M30,30 Q50,20 70,30 Q80,50 70,70 Q50,80 30,70 Q20,50 30,30" fill="none" stroke="#B8956A" strokeWidth="0.6" />
              <path d="M230,30 Q250,20 270,30 Q280,50 270,70 Q250,80 230,70 Q220,50 230,30" fill="none" stroke="#B8956A" strokeWidth="0.6" />
              <path d="M130,130 Q150,120 170,130 Q180,150 170,170 Q150,180 130,170 Q120,150 130,130" fill="none" stroke="#B8956A" strokeWidth="0.4" />
              {/* Decorative lines */}
              <line x1="70" y1="50" x2="230" y2="50" stroke="#B8956A" strokeWidth="0.3" strokeDasharray="8,5" />
              <line x1="150" y1="70" x2="150" y2="230" stroke="#B8956A" strokeWidth="0.3" strokeDasharray="8,5" />
              {/* Small stars */}
              {[[50, 150], [150, 250], [250, 150], [100, 100], [200, 200]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="1.5" fill="#B8956A" fillOpacity="0.4" />
              ))}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#classical-bg)" />
        </svg>
      </div>

      <ParallaxFloat items={floatingItems} />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.blockquote
          className="font-display text-2xl sm:text-3xl text-museum-ink leading-snug italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          &ldquo;The history of technology is incomplete without the stories
          of the women who built it.&rdquo;
        </motion.blockquote>
        <motion.p
          className="font-display text-base sm:text-lg text-museum-slate mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          没有女性建造者的故事，技术史就是不完整的。
        </motion.p>

        <div className="divider my-14" />

        <div className="grid grid-cols-3 gap-8">
          {[
            { value: 111, label: "Pioneers", labelCn: "位先驱" },
            { value: 10, label: "Fields", labelCn: "个领域" },
            { value: 4000, suffix: "+", label: "Years", labelCn: "年历史" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl sm:text-4xl text-museum-gold">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs tracking-[0.15em] uppercase text-museum-stone mt-2">
                {s.label}
              </p>
              <p className="text-xs text-museum-stone/60 mt-0.5">{s.labelCn}</p>
            </div>
          ))}
        </div>

        <div className="divider my-14" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-museum-cream rounded-sm p-8 sm:p-10"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-museum-gold mb-3">
            Open Collection
          </p>
          <p className="font-display text-lg sm:text-xl text-museum-ink">
            Continuously Updated &middot; Contributions Welcome
          </p>
          <p className="text-sm text-museum-slate mt-2">
            持续更新中 &middot; 欢迎投稿
          </p>
          <p className="text-xs text-museum-stone mt-4 max-w-md mx-auto leading-relaxed">
            This is a living collection. We welcome suggestions for additional
            pioneers, corrections to existing entries, and contributions of
            public domain images. Help us tell a more complete story.
          </p>
          <p className="text-xs text-museum-stone/60 mt-2">
            这是一个持续成长的数据库。欢迎推荐新的先驱人物、指正内容错误，或贡献公有领域图片。帮助我们讲述更完整的故事。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
