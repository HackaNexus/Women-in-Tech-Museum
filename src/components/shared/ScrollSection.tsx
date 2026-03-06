"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Disable exit fade (useful for first/last sections) */
  noExitFade?: boolean;
  /** Disable enter fade */
  noEnterFade?: boolean;
}

/**
 * Wraps a section with scroll-driven crossfade transitions.
 * As the section enters the viewport it fades/slides in;
 * as it leaves it fades out with a subtle scale-down.
 */
export function ScrollSection({
  children,
  className = "",
  noExitFade = false,
  noEnterFade = false,
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const enterOpacity = noEnterFade ? 1 : 0;
  const exitOpacity = noExitFade ? 1 : 0;

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1],
    [enterOpacity, 1, 1, exitOpacity]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1],
    [noEnterFade ? 0 : 50, 0, 0, noExitFade ? 0 : -30]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1],
    [noEnterFade ? 1 : 0.97, 1, 1, noExitFade ? 1 : 0.98]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
