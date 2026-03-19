import HeroCanvas from "@/components/HeroCanvas";
import ProductSection from "@/components/ProductSection";
import FeatureSection from "@/components/FeatureSection";
import TestimonialSection from "@/components/TestimonialSection";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main className="relative bg-dark selection:bg-accent selection:text-white">
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (max-width: 768px) {
            main {
              background-color: #FDF8F3 !important;
            }
          }
        `
      }} />
      {/* Hero Section */}
      <HeroCanvas />

      {/* Main Content */}
      <div className="relative z-10">
        <ProductSection />
        <FeatureSection />
        <TestimonialSection />
        <FinalCTA />
      </div>

      {/* Background Decor Layer - Subtle Glows */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_20%_20%,#2A1410_0%,transparent_50%)]" />
      <div className="fixed inset-x-0 bottom-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_80%_80%,#E63946_0%,transparent_50%)]" />
    </main>
  );
}
