"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scientific/geometric construction lines that draw themselves on load,
 * inspired by Shopify Editions' Da Vinci lines technique.
 * Uses SVG stroke-dasharray/dashoffset animation.
 */
export function DaVinciLines() {
  const [phase, setPhase] = useState(0); // 0=hidden, 1=drawing, 2=drawn, 3=faded
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const lineOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.6, 0]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 3800);
    const t3 = setTimeout(() => setPhase(3), 5500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{ opacity: lineOpacity }}
      className="davinci-lines fixed inset-0 z-[2] pointer-events-none overflow-hidden"
      data-phase={phase}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dash-pattern"
            patternUnits="userSpaceOnUse"
            width="6"
            height="1"
          >
            <rect x="0" y="0" width="2" height="1" fill="currentColor" opacity="0.3" />
          </pattern>
        </defs>

        {/* ── Group 1: Horizontal & vertical grid lines ── */}
        <g className="line-group" data-group="1">
          {/* Horizontal center */}
          <line x1="-100" y1="540" x2="2020" y2="540" />
          {/* Golden ratio horizontals */}
          <line x1="-100" y1="334" x2="2020" y2="334" />
          <line x1="-100" y1="746" x2="2020" y2="746" />
          {/* Vertical center */}
          <line x1="960" y1="-100" x2="960" y2="1180" />
          {/* Golden ratio verticals */}
          <line x1="594" y1="-100" x2="594" y2="1180" />
          <line x1="1326" y1="-100" x2="1326" y2="1180" />
        </g>

        {/* ── Group 2: Diagonals ── */}
        <g className="line-group" data-group="2">
          <line x1="0" y1="0" x2="1920" y2="1080" />
          <line x1="1920" y1="0" x2="0" y2="1080" />
          <line x1="0" y1="540" x2="960" y2="0" />
          <line x1="960" y1="0" x2="1920" y2="540" />
        </g>

        {/* ── Group 3: Circles — orbital / golden spiral references ── */}
        <g className="line-group" data-group="3">
          <circle cx="960" cy="540" r="280" />
          <circle cx="960" cy="540" r="180" />
          <circle cx="960" cy="540" r="440" />
          {/* Small accent circles at intersections */}
          <circle cx="594" cy="334" r="6" className="accent-dot" />
          <circle cx="1326" cy="334" r="6" className="accent-dot" />
          <circle cx="594" cy="746" r="6" className="accent-dot" />
          <circle cx="1326" cy="746" r="6" className="accent-dot" />
          <circle cx="960" cy="540" r="4" className="accent-dot" />
        </g>

        {/* ── Group 4: Scientific arcs & tangent lines ── */}
        <g className="line-group" data-group="4">
          <path d="M 480,540 A 480,480 0 0,1 960,60" fill="none" />
          <path d="M 1440,540 A 480,480 0 0,0 960,60" fill="none" />
          <path d="M 480,540 A 480,480 0 0,0 960,1020" fill="none" />
          <path d="M 1440,540 A 480,480 0 0,1 960,1020" fill="none" />
        </g>
      </svg>
    </motion.div>
  );
}
