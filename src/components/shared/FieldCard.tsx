"use client";

import Link from "next/link";
import { getPioneersByField } from "@/lib/data";
import type { Field } from "@/lib/types";

export const fieldImages: Record<string, string> = {
  "computer-science":
    "https://upload.wikimedia.org/wikipedia/commons/d/db/Margaret_Hamilton_-_restoration.jpg",
  mathematics:
    "https://upload.wikimedia.org/wikipedia/commons/b/b1/Maryam_Mirzakhani_in_Seoul_2014.jpg",
  physics:
    "https://upload.wikimedia.org/wikipedia/commons/c/c8/Marie_Curie_c._1920s.jpg",
  chemistry:
    "https://upload.wikimedia.org/wikipedia/commons/6/66/Emmanuelle_Charpentier.jpg",
  "biology-medicine":
    "https://upload.wikimedia.org/wikipedia/commons/f/f4/Rachel-Carson.jpg",
  "astronomy-space":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Valentina_Tereshkova_%282024-02-29%29_crop.jpg/960px-Valentina_Tereshkova_%282024-02-29%29_crop.jpg",
  engineering:
    "https://upload.wikimedia.org/wikipedia/commons/8/83/Hedy_Lamarr_Publicity_Photo_for_The_Heavenly_Body_1944.jpg",
  "earth-environment":
    "https://upload.wikimedia.org/wikipedia/commons/f/f8/Marie_Tharp_working_with_fathometer_record_%28cropped%29.jpg",
  "genetics-biotech":
    "https://upload.wikimedia.org/wikipedia/commons/5/5d/Professor_Jennifer_Doudna_ForMemRS.jpg",
  "data-science-ai":
    "https://upload.wikimedia.org/wikipedia/commons/9/98/Dorothy_Vaughan_2.jpg",
};

export function FieldCard({ field }: { field: Field }) {
  const bgImg = fieldImages[field.id];
  const pioneers = getPioneersByField(field.id);
  const names = pioneers
    .slice(0, 3)
    .map((p) => p.name)
    .join(" / ");

  return (
    <Link
      href={`/exhibitions/${field.slug}`}
      className="book-item group block flex-none"
    >
      <div className="book-3d">
        <div className="relative w-full h-full aspect-[3/4] overflow-hidden rounded-[2px]">
          {/* Photo layer */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-[1.2s] ease-out grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-[1.06]"
            style={{
              backgroundImage: bgImg ? `url('${bgImg}')` : undefined,
              backgroundColor: bgImg ? undefined : "#222",
            }}
          />

          {/* Cinematic gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

          {/* Color accent glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/3 opacity-0 group-hover:opacity-30 transition-opacity duration-700"
            style={{
              background: `linear-gradient(to top, ${field.color}, transparent)`,
            }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-4 sm:p-5">
            <div className="flex justify-between items-start">
              <span
                className="inline-block w-2 h-2 rounded-full mt-0.5 opacity-80"
                style={{ backgroundColor: field.color }}
              />
              <span className="text-[0.6rem] text-white/40 tracking-[0.15em] uppercase">
                {pioneers.length}
              </span>
            </div>

            <div>
              <h3 className="font-display text-white text-lg sm:text-xl leading-[1.15] mb-1">
                {field.nameCn}
              </h3>
              <p className="text-white/50 text-[0.6rem] sm:text-[0.65rem] tracking-[0.08em] uppercase leading-snug">
                {field.name}
              </p>

              <div className="mt-2 max-h-0 group-hover:max-h-16 overflow-hidden transition-all duration-500 ease-out">
                <div className="pt-2 border-t border-white/10">
                  <p className="text-white/40 text-[0.6rem] leading-relaxed tracking-wide">
                    {names}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
