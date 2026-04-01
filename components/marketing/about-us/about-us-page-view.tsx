import { PagePlaceholder } from "@/components/site/page-placeholder";

export function AboutUsPageView() {
  return (
    <PagePlaceholder
      eyebrow="About Us"
      title="Company story page scaffolded."
      description="Use this page for brand narrative, team credibility, values, and company milestones."
      nextSteps={[
        "Add mission, vision, and differentiators.",
        "Create team, leadership, and timeline sections.",
        "Include trust signals and a contact path.",
      ]}
    />
  );
}
