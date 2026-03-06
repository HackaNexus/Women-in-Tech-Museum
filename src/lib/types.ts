export interface Pioneer {
  id: number;
  name: string;
  nameCn: string;
  slug: string;
  field: string;
  born: number;
  died: number | null;
  nationality: string;
  nationalityCn: string;
  tagline: string;
  taglineCn: string;
  bio: string;
  bioCn: string;
  achievements: string[];
  achievementsCn: string[];
  era: string;
  imageCredit: string;
  featured: boolean;
  image: string;
  quote: string;
  quoteCn: string;
  quoteSource: string;
  references: string[];
}

export interface Field {
  id: string;
  name: string;
  nameCn: string;
  slug: string;
  description: string;
  descriptionCn: string;
  icon: string;
  color: string;
  count: number;
}
