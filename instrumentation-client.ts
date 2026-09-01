import posthog from "posthog-js"

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

if (!projectToken) {
  if (process.env.NODE_ENV === "development") {
    console.warn(
      "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured. Analytics tracking is disabled."
    )
  }
} else if (!host) {
  if (process.env.NODE_ENV === "development") {
    console.warn(
      "NEXT_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured. Analytics tracking is disabled."
    )
  }
} else {
  posthog.init(projectToken, {
    api_host: host,
    defaults: "2026-01-30",
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  })
}
