import computerScience from "../data/pioneers/computer-science.json";
import mathematics from "../data/pioneers/mathematics.json";
import physics from "../data/pioneers/physics.json";
import chemistry from "../data/pioneers/chemistry.json";
import biologyMedicine from "../data/pioneers/biology-medicine.json";
import astronomySpace from "../data/pioneers/astronomy-space.json";
import engineering from "../data/pioneers/engineering.json";
import earthEnvironment from "../data/pioneers/earth-environment.json";
import geneticsBiotech from "../data/pioneers/genetics-biotech.json";
import dataScienceAi from "../data/pioneers/data-science-ai.json";
import fieldsData from "../data/fields.json";
import type { Pioneer, Field } from "./types";

export const pioneers: Pioneer[] = [
  ...(computerScience as Pioneer[]),
  ...(mathematics as Pioneer[]),
  ...(physics as Pioneer[]),
  ...(chemistry as Pioneer[]),
  ...(biologyMedicine as Pioneer[]),
  ...(astronomySpace as Pioneer[]),
  ...(engineering as Pioneer[]),
  ...(earthEnvironment as Pioneer[]),
  ...(geneticsBiotech as Pioneer[]),
  ...(dataScienceAi as Pioneer[]),
];
export const fields: Field[] = fieldsData as Field[];

export function getPioneersByField(fieldId: string): Pioneer[] {
  return pioneers.filter((p) => p.field === fieldId);
}

export function getPioneerBySlug(slug: string): Pioneer | undefined {
  return pioneers.find((p) => p.slug === slug);
}

export function getFieldBySlug(slug: string): Field | undefined {
  return fields.find((f) => f.slug === slug);
}

export function getFieldById(id: string): Field | undefined {
  return fields.find((f) => f.id === id);
}

export function getFeaturedPioneers(): Pioneer[] {
  return pioneers.filter((p) => p.featured);
}

export function getRelatedPioneers(pioneer: Pioneer, limit = 3): Pioneer[] {
  return pioneers
    .filter((p) => p.field === pioneer.field && p.id !== pioneer.id)
    .slice(0, limit);
}

export function formatLifespan(born: number, died: number | null): string {
  const bornStr = born < 0 ? `c. ${Math.abs(born)} BCE` : `${born}`;
  if (died === null) return `b. ${bornStr}`;
  const diedStr = died < 0 ? `${Math.abs(died)} BCE` : `${died}`;
  return `${bornStr}\u2009\u2013\u2009${diedStr}`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((part) => !part.includes("/"))
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
