import { PagePlaceholder } from "@/components/site/page-placeholder";

export function DashboardsPageView() {
  return (
    <PagePlaceholder
      eyebrow="Dashboards"
      title="Dashboard overview page scaffolded."
      description="Use this page to present analytics surfaces, dashboard modules, and reporting workflows."
      nextSteps={[
        "Outline dashboard categories and modules.",
        "Add screenshots or product visual placeholders.",
        "Map calls to action for demos or onboarding.",
      ]}
    />
  );
}
