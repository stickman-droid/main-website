import posthog from "posthog-js";

if (
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    defaults: "2026-05-30",
    capture_pageview: false,
    capture_exceptions: true,
    autocapture: true,
    person_profiles: "identified_only",
    loaded: (posthogInstance) => {
      if (process.env.NODE_ENV === "development") {
        posthogInstance.debug();
      }
    },
  });
}
