import { Hero } from "@/components/home/Hero";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { FieldGrid } from "@/components/home/FieldGrid";
import { StatsSection } from "@/components/home/StatsSection";
import { ScrollSection } from "@/components/shared/ScrollSection";

export default function HomePage() {
  return (
    <>
      {/* Hero has its own scroll-driven animation internally */}
      <Hero />

      <ScrollSection noEnterFade={false} noExitFade={false}>
        <FeaturedCarousel />
      </ScrollSection>

      <ScrollSection>
        <FieldGrid />
      </ScrollSection>

      <ScrollSection noExitFade>
        <StatsSection />
      </ScrollSection>
    </>
  );
}
