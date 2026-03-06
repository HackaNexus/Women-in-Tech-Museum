import { Hero } from "@/components/home/Hero";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { FieldGrid } from "@/components/home/FieldGrid";
import { StatsSection } from "@/components/home/StatsSection";
import { DiscoveriesPreview } from "@/components/home/DiscoveriesPreview";
import { ScrollSection } from "@/components/shared/ScrollSection";

export default function HomePage() {
  return (
    <>
      <Hero />

      <FeaturedCarousel />

      <DiscoveriesPreview />

      <ScrollSection>
        <FieldGrid />
      </ScrollSection>

      <StatsSection />
    </>
  );
}
