import HeroSection from "@/components/bento/HeroSection";
import TechMarquee from "@/components/bento/TechMarquee";
import FeaturedSection from "@/components/bento/FeaturedSection";
import ShowcaseSection from "@/components/bento/ShowcaseSection";
import DotDivider from "@/components/ui/DotDivider";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900 p-4">
      <div className="@container mx-auto w-full space-y-[1.3cqw] md:w-[min(100%,calc((100svh-2rem)*940/590))]">
        <HeroSection />
        <TechMarquee />
        <FeaturedSection />
        <DotDivider rows={2} className="my-12" />
        <ShowcaseSection />
      </div>
    </main>
  );
}