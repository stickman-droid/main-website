import { PagePlaceholder } from "@/components/site/page-placeholder";

export function NotFoundPageView() {
  return (
    <PagePlaceholder
      eyebrow="404"
      title="Page not found."
      description="The requested page does not exist or may have moved. Link this page back to the primary site journeys."
      nextSteps={[
        "Add clear navigation back to the homepage.",
        "Include helpful links to active sections.",
        "Track 404 traffic sources if needed.",
      ]}
    />
  );
}
