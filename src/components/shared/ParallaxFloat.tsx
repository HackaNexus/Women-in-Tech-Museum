"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface FloatingItem {
  content: React.ReactNode;
  /** Position as percentage of container (0-100) */
  x: number;
  y: number;
  /** Parallax speed multiplier: >0 moves up on scroll, <0 moves down */
  speed: number;
  /** Rotation range in degrees */
  rotate?: number;
  opacity?: number;
  scale?: number;
}

interface ParallaxFloatProps {
  items: FloatingItem[];
  className?: string;
}

function FloatItem({ item, scrollYProgress, index }: { item: FloatingItem; scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]; index: number }) {
  const speed = item.speed;
  const y = useTransform(scrollYProgress, [0, 1], [speed * 60, -speed * 60]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [-(item.rotate ?? 0), item.rotate ?? 0]
  );

  // 每个图标不同的浮动周期，营造有机感
  const floatDuration = 4 + (index % 3) * 1.5;
  const floatOffset = 6 + (index % 4) * 2;

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        y,
        rotate,
        opacity: item.opacity ?? 0.15,
        scale: item.scale ?? 1,
      }}
    >
      <motion.div
        animate={{
          y: [-floatOffset, floatOffset, -floatOffset],
          x: [0, floatOffset * 0.5, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        {item.content}
      </motion.div>
    </motion.div>
  );
}

export function ParallaxFloat({ items, className = "" }: ParallaxFloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      {items.map((item, i) => (
        <FloatItem key={i} item={item} scrollYProgress={scrollYProgress} index={i} />
      ))}
    </div>
  );
}

/* Pre-built SVG scientific decorations */
export function AtomIcon({ size = 60, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="1.2">
      <ellipse cx="40" cy="40" rx="35" ry="14" transform="rotate(0 40 40)" />
      <ellipse cx="40" cy="40" rx="35" ry="14" transform="rotate(60 40 40)" />
      <ellipse cx="40" cy="40" rx="35" ry="14" transform="rotate(120 40 40)" />
      <circle cx="40" cy="40" r="3" fill={color} />
    </svg>
  );
}

export function DNAHelix({ size = 80, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size * 0.4} height={size} viewBox="0 0 32 80" fill="none" stroke={color} strokeWidth="1">
      {Array.from({ length: 8 }).map((_, i) => {
        const y = 5 + i * 10;
        const phase = i * 0.8;
        const x1 = 16 + Math.sin(phase) * 12;
        const x2 = 16 - Math.sin(phase) * 12;
        return (
          <g key={i}>
            <line x1={x1} y1={y} x2={x2} y2={y} strokeOpacity="0.4" />
            <circle cx={x1} cy={y} r="1.5" fill={color} fillOpacity="0.6" />
            <circle cx={x2} cy={y} r="1.5" fill={color} fillOpacity="0.6" />
          </g>
        );
      })}
      <path d="M4,2 Q16,20 28,40 Q16,60 4,78" strokeOpacity="0.6" />
      <path d="M28,2 Q16,20 4,40 Q16,60 28,78" strokeOpacity="0.6" />
    </svg>
  );
}

export function FormulaText({ text, size = 16, color = "currentColor" }: { text: string; size?: number; color?: string }) {
  return (
    <span
      className="font-mono italic whitespace-nowrap"
      style={{ fontSize: size, color }}
    >
      {text}
    </span>
  );
}

export function OrbitRings({ size = 70, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 70 70" fill="none" stroke={color} strokeWidth="0.8">
      <circle cx="35" cy="35" r="10" />
      <circle cx="35" cy="35" r="20" strokeDasharray="4,3" />
      <circle cx="35" cy="35" r="30" strokeDasharray="2,4" />
      <circle cx="55" cy="35" r="2" fill={color} fillOpacity="0.5" />
      <circle cx="35" cy="15" r="1.5" fill={color} fillOpacity="0.5" />
    </svg>
  );
}

export function GridPattern({ size = 100, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="0.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i}>
          <line x1={i * 20} y1="0" x2={i * 20} y2="100" />
          <line x1="0" y1={i * 20} x2="100" y2={i * 20} />
        </g>
      ))}
      <circle cx="40" cy="60" r="15" strokeWidth="0.8" />
      <path d="M20,20 L40,60 L80,40" strokeWidth="0.8" />
    </svg>
  );
}

export function CompassRose({ size = 80, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="0.8">
      <circle cx="40" cy="40" r="28" />
      <circle cx="40" cy="40" r="18" strokeDasharray="3,3" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const len = angle % 90 === 0 ? 28 : 18;
        return (
          <line
            key={angle}
            x1="40"
            y1="40"
            x2={40 + Math.cos(rad) * len}
            y2={40 + Math.sin(rad) * len}
            strokeWidth={angle % 90 === 0 ? "1.2" : "0.6"}
          />
        );
      })}
      <text x="40" y="10" textAnchor="middle" fontSize="6" fill={color} stroke="none">N</text>
      <text x="40" y="76" textAnchor="middle" fontSize="6" fill={color} stroke="none">S</text>
    </svg>
  );
}
