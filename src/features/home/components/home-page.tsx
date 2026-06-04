import { CapabilitiesSection } from "@/src/features/home/components/capabilities-section";
import { DataEntrySection } from "@/src/features/home/components/data-entry-section";
import { FinalCtaSection } from "@/src/features/home/components/final-cta-section";
import { HeroSection } from "@/src/features/home/components/hero-section";
import { WorkflowAndInsightsSection } from "@/src/features/home/components/workflow-and-insights-section";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FinalCtaSection />
      <CapabilitiesSection />
      <WorkflowAndInsightsSection />
      <DataEntrySection />
    </>
  );
}
