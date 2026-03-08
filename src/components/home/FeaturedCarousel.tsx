"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { getFeaturedPioneers, getFieldById, getInitials } from "@/lib/data";
import type { Pioneer } from "@/lib/types";

function RevealImage({
  pioneer,
  scrollYProgress,
  revealRange,
  parallaxRange,
  className,
}: {
  pioneer: Pioneer;
  scrollYProgress: MotionValue<number>;
  revealRange: [number, number];
  parallaxRange: [number, number];
  className?: string;
}) {
  const field = getFieldById(pioneer.field);
  const clipPercent = useTransform(scrollYProgress, revealRange, [100, 0]);
  const clipPath = useTransform(clipPercent, (v) => `inset(0% ${v}% 0% 0%)`);
  const y = useTransform(scrollYProgress, [0, 1], parallaxRange);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <motion.div className={className} style={{ clipPath, y }}>
      <Link
        href={`/exhibitions/${field?.slug ?? pioneer.field}/${pioneer.slug}`}
        className="group block w-full h-full"
      >
        <div className="photo-frame overflow-hidden w-full h-full relative">
          {pioneer.image ? (
            <motion.img
              src={pioneer.image}
              alt={pioneer.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700"
              style={{ scale: imgScale }}
              loading="lazy"
            />
          ) : (
            <div className="portrait-initials w-full h-full text-3xl bg-museum-surface">
              {getInitials(pioneer.name)}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

function GalleryCard({ pioneer, index }: { pioneer: Pioneer; index: number }) {
  const field = getFieldById(pioneer.field);
  const isOdd = index % 2 === 1;

  const textBlock = (
    <>
      <h3 className="font-display text-base text-white/90 group-hover:text-museum-gold transition-colors duration-300">
        {pioneer.name}
      </h3>
      <p className="text-[0.6rem] tracking-[0.1em] uppercase text-museum-gold/50 mt-0.5">
        {field?.name}
      </p>
      <p className="text-xs text-white/65 mt-1 line-clamp-2 leading-relaxed">
        {pioneer.tagline}
      </p>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className=""
    >
      <Link
        href={`/exhibitions/${field?.slug ?? pioneer.field}/${pioneer.slug}`}
        className="group block"
      >
        {isOdd && <div className="mb-3">{textBlock}</div>}
        <div className="photo-frame overflow-hidden aspect-square">
          {pioneer.image ? (
            <img
              src={pioneer.image}
              alt={pioneer.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="portrait-initials w-full h-full text-3xl bg-museum-surface">
              {getInitials(pioneer.name)}
            </div>
          )}
        </div>
        {!isOdd && <div className="mt-3">{textBlock}</div>}
      </Link>
    </motion.div>
  );
}

export function FeaturedCarousel() {
  const featured = getFeaturedPioneers();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const heroRight = featured[3]; // Marie Curie
  const heroLeft = featured[0]; // Ada Lovelace
  const carouselPioneers = featured.filter(
    (p) => p.id !== heroRight.id && p.id !== heroLeft.id
  );

  const titleOpacity = useTransform(scrollYProgress, [0.02, 0.12], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.02, 0.12], [60, 0]);

  const descOpacity = useTransform(scrollYProgress, [0.15, 0.28], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.15, 0.28], [40, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 sm:py-36 lg:py-44 px-5 sm:px-8 lg:px-10 overflow-hidden bg-museum-bg"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Lumen-style asymmetric hero layout */}
        <div className="relative lg:min-h-[85vh]">
          {/* Title — upper left */}
          <motion.div
            className="relative z-10 max-w-xl"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            <p className="text-[0.65rem] tracking-[0.4em] uppercase text-museum-gold/60 mb-6">
              Featured
            </p>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl text-white font-light leading-[1.05]">
              A{" "}
              <em className="display-italic text-white/85">(Journey)</em>
              <br />
              Through{" "}
              <em className="display-italic text-museum-gold-light">
                Science
              </em>
            </h2>
          </motion.div>

          {/* Image — upper right: clip-path scroll reveal + parallax */}
          <RevealImage
            pioneer={heroRight}
            scrollYProgress={scrollYProgress}
            revealRange={[0.04, 0.28]}
            parallaxRange={[-30, 50]}
            className="
              lg:absolute lg:top-0 lg:right-0
              relative mt-12 lg:mt-0
              w-full sm:w-[65%] lg:w-[38%] xl:w-[36%]
              aspect-[3/4]
            "
          />

          {/* Description + About link — center area */}
          <motion.div
            className="
              relative z-10
              lg:absolute lg:left-[28%] lg:top-[58%]
              max-w-md mt-14 lg:mt-0
            "
            style={{ opacity: descOpacity, y: descY }}
          >
            <p className="text-white/85 text-base leading-relaxed font-light">
              Step into a world where brilliance transcends boundaries. Here, you
              are invited to explore a curated collection of pioneering women in
              science, where each story reveals layers of discovery, resilience,
              and the enduring beauty of human curiosity.
            </p>
            <p className="text-white/85 text-sm leading-relaxed font-light mt-3">
              步入一个才华超越边界的世界。在这里，你将探索一组杰出女性科学先驱的故事，每一段历程都揭示着发现的力量、坚韧的精神，以及人类求知欲的永恒之美。
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 mt-8 text-white/80 hover:text-white transition-colors duration-300"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 group-hover:border-white/40 transition-colors duration-300">
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-sm tracking-wide">About Us</span>
            </Link>
          </motion.div>

          {/* Image — lower left: clip-path scroll reveal + parallax (staggered) */}
          <RevealImage
            pioneer={heroLeft}
            scrollYProgress={scrollYProgress}
            revealRange={[0.1, 0.35]}
            parallaxRange={[-15, 35]}
            className="
              lg:absolute lg:bottom-0 lg:left-0
              relative mt-14 lg:mt-0
              w-full sm:w-[55%] lg:w-[28%] xl:w-[26%]
              aspect-[4/5]
            "
          />
        </div>

        {/* Divider */}
        <div className="divider my-20 sm:my-28" />

        {/* Staggered gallery grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-10 items-center">
          {carouselPioneers.map((p, i) => (
            <GalleryCard key={p.id} pioneer={p} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-end">
          <Link
            href="/timeline"
            className="group flex items-center gap-2 text-sm text-white/65 hover:text-museum-gold transition-colors duration-300"
          >
            <span className="tracking-wide">跟随时间线看更多</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
