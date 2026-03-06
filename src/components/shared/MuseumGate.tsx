"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { stats } from "@/lib/data";

const STORAGE_KEY = "herstory-museum-entered";

export function MuseumGate() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"idle" | "ready" | "line" | "opening">("idle");
  const lineControls = useAnimation();
  const contentControls = useAnimation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const entered = sessionStorage.getItem(STORAGE_KEY);
    if (!entered) setVisible(true);
  }, []);

  useEffect(() => {
    if (visible) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  // Content fades in on mount
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(async () => {
      setPhase("ready");
      await contentControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [visible, contentControls]);

  const handleEnter = useCallback(async () => {
    if (phase !== "ready") return;
    sessionStorage.setItem(STORAGE_KEY, "1");

    // Step 1: content fades out
    await contentControls.start({
      opacity: 0,
      y: -20,
      transition: { duration: 0.35, ease: "easeIn" },
    });

    // Step 2: vertical line draws in
    setPhase("line");
    await lineControls.start({
      scaleY: 1,
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
    });

    // Step 3: brief hold, then line fades as doors open
    await new Promise((r) => setTimeout(r, 300));
    setPhase("opening");
    lineControls.start({
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    });

    // Wait for door animation (1.1s) then dismiss
    setTimeout(() => setVisible(false), 1200);
  }, [phase, contentControls, lineControls]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="museum-gate"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Left door */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-museum-bg z-[1]"
            animate={phase === "opening" ? { x: "-100%" } : { x: 0 }}
            transition={
              phase === "opening"
                ? { duration: 1.1, ease: [0.76, 0, 0.24, 1] }
                : { duration: 0 }
            }
          />
          {/* Right door */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-museum-bg z-[1]"
            animate={phase === "opening" ? { x: "100%" } : { x: 0 }}
            transition={
              phase === "opening"
                ? { duration: 1.1, ease: [0.76, 0, 0.24, 1] }
                : { duration: 0 }
            }
          />

          {/* Central seam line — draws in from center */}
          <motion.div
            className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 origin-center z-[2]"
            style={{ background: "linear-gradient(to bottom, transparent 2%, rgba(201,168,124,0.45) 25%, rgba(201,168,124,0.45) 75%, transparent 98%)" }}
            initial={{ scaleY: 0, opacity: 1 }}
            animate={lineControls}
          />

          {/* Ornamental diamond at line center */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]"
            initial={{ opacity: 0, scale: 0, rotate: 45 }}
            animate={
              phase === "line"
                ? { opacity: 0.5, scale: 1, rotate: 45 }
                : phase === "opening"
                ? { opacity: 0, scale: 1.5, rotate: 45 }
                : {}
            }
            transition={
              phase === "line"
                ? { duration: 0.6, delay: 0.4, ease: "easeOut" }
                : { duration: 0.3 }
            }
          >
            <div className="w-2.5 h-2.5 border border-museum-gold/50" />
          </motion.div>

          {/* Content */}
          <motion.div
            className="relative z-[3] flex flex-col items-center justify-center text-center px-8"
            initial={{ opacity: 0, y: 24 }}
            animate={contentControls}
          >
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-light tracking-[0.15em] mb-4">
              Women in Tech Museum
            </h1>
            <div className="w-12 h-px bg-museum-gold/40 mx-auto mb-4" />
            <p className="text-white/40 text-sm mb-10 max-w-xs tracking-wide">
              {stats.yearSpan.toLocaleString()}+ years of women pioneers in STEM
            </p>
            <button
              onClick={handleEnter}
              className="group relative px-10 py-3.5 border border-white/30 text-white/70 text-xs tracking-[0.25em] uppercase hover:text-white hover:border-museum-gold/50 transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10">Enter Museum</span>
              <motion.span
                className="absolute inset-0 bg-white/[0.06]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ originX: 0 }}
              />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
