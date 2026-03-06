"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "herstory-museum-entered";

export function MuseumGate() {
  const [visible, setVisible] = useState(false);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const entered = sessionStorage.getItem(STORAGE_KEY);
    if (!entered) setVisible(true);
  }, []);

  useEffect(() => {
    if (visible) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  const handleEnter = () => {
    setEntering(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => setVisible(false), 1200);
  };

  return (
    <AnimatePresence>
      {visible && (
      <motion.div
        key="museum-gate"
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Left panel */}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 bg-museum-bg"
          initial={{ x: 0 }}
          animate={entering ? { x: "-50vw" } : {}}
          transition={{ duration: 1, ease: [0.65, 0.01, 0.05, 0.99] }}
        />
        {/* Right panel */}
        <motion.div
          className="absolute inset-y-0 right-0 w-1/2 bg-museum-bg"
          initial={{ x: 0 }}
          animate={entering ? { x: "50vw" } : {}}
          transition={{ duration: 1, ease: [0.65, 0.01, 0.05, 0.99] }}
        />

        {/* Central seam line */}
        <motion.div
          className="absolute inset-y-0 left-1/2 w-px bg-white/20 -translate-x-1/2"
          initial={{ opacity: 1 }}
          animate={entering ? { opacity: 0 } : {}}
          transition={{ duration: 0.25, delay: 0.1 }}
        />

        {/* Bottom cloud/wave pattern */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          initial={{ opacity: 0.6 }}
          animate={entering ? { opacity: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <svg
            className="w-full h-full opacity-30"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,80 Q150,40 300,80 T600,80 T900,80 T1200,80 L1200,120 L0,120 Z"
              fill="rgba(201,168,124,0.15)"
            />
            <path
              d="M0,100 Q200,60 400,100 T800,100 T1200,100 L1200,120 L0,120 Z"
              fill="rgba(201,168,124,0.08)"
            />
          </svg>
        </motion.div>

        {/* Content — centered, fades before panels open */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center px-8"
          initial={{ opacity: 1 }}
          animate={entering ? { opacity: 0 } : {}}
          transition={{ duration: 0.35 }}
        >
          <p className="font-display text-2xl sm:text-3xl text-white/70 italic mb-2">
            Women in Tech Museum
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-light tracking-wide mb-6">
            <span className="block">Science</span>
            <span className="block text-museum-gold-light">In Heritage</span>
          </h1>
          <p className="text-white/40 text-sm mb-10 max-w-xs">
            4,000 years of women pioneers in STEM
          </p>
          <button
            onClick={handleEnter}
            className="px-8 py-3 border border-white/40 text-white/80 text-sm tracking-widest uppercase hover:bg-white/10 hover:border-museum-gold/60 transition-colors duration-300"
          >
            Enter Museum
          </button>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
