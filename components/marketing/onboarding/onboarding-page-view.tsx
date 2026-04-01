import { PagePlaceholder } from "@/components/site/page-placeholder";

export function OnboardingPageView() {
  return (
    <PagePlaceholder
      eyebrow="Onboarding"
      title="Onboarding experience page scaffolded."
      description="This route is ready for setup steps, activation flow, FAQs, and implementation guidance."
      nextSteps={[
        "Add step-by-step onboarding milestones.",
        "Surface setup expectations and required inputs.",
        "Include support, FAQ, and handoff content.",
      ]}
    />
  );
}
