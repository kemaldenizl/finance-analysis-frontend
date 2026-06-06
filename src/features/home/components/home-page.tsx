import { CapabilitiesSection } from "@/src/features/home/components/capabilities-section";
import { DataEntrySection } from "@/src/features/home/components/data-entry-section";
import { FinalCtaSection } from "@/src/features/home/components/final-cta-section";
import { HeroSection } from "@/src/features/home/components/hero-section";
import { WorkflowAndInsightsSection } from "@/src/features/home/components/workflow-and-insights-section";
import { AISection } from "@/src/features/home/components/ai-section";
import { getAccessToken } from "@/src/shared/lib/auth/token-cookie";

export async function HomePage() {
  const isAuthenticated = Boolean(await getAccessToken());

  if (isAuthenticated) {
    return (
      <>
        <AISection />
        <CapabilitiesSection />
        <WorkflowAndInsightsSection />
        <DataEntrySection />
      </>
    );
  }

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
