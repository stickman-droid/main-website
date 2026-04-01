import { PagePlaceholder } from "@/components/site/page-placeholder";

export function CaseStudiesPageView() {
  return (
    <PagePlaceholder
      eyebrow="Case Studies"
      title="Proof-driven case studies hub scaffolded."
      description="This route is ready for featured stories, KPI summaries, and industry-specific results."
      nextSteps={[
        "Add a featured case study hero.",
        "Create reusable study cards and filters.",
        "Prepare a detail page strategy if individual stories are needed.",
      ]}
    />
  );
}
