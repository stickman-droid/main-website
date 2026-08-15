"use client";

import posthog from "posthog-js";
import type { AnalyticsEventName, AnalyticsProperties } from "./events";
import { analyticsEvents } from "./events";
import { getGlobalProperties } from "./properties";
import { incrementMeaningfulInteraction } from "./utils";

const onceKeys = new Set<string>();

const meaningfulEvents = new Set<AnalyticsEventName>([
  analyticsEvents.ctaClicked,
  analyticsEvents.caseStudyCardClicked,
  analyticsEvents.calculatorStarted,
  analyticsEvents.calculatorCompleted,
  analyticsEvents.emailClicked,
  analyticsEvents.socialLinkClicked,
  analyticsEvents.interactiveVisualEngaged,
]);

export function isAnalyticsEnabled() {
  return Boolean(
    typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
  );
}

export function resetOnceKeysForPage(pageViewKey: string) {
  Array.from(onceKeys).forEach((key) => {
    if (!key.startsWith(`${pageViewKey}:`)) onceKeys.delete(key);
  });
}

export function capture(
  event: AnalyticsEventName,
  properties: AnalyticsProperties = {},
  options: { onceKey?: string; transport?: "sendBeacon" | "fetch" } = {}
) {
  if (!isAnalyticsEnabled()) return;

  if (options.onceKey) {
    if (onceKeys.has(options.onceKey)) return;
    onceKeys.add(options.onceKey);
  }

  const payload = {
    ...getGlobalProperties(),
    ...properties,
  };

  if (
    meaningfulEvents.has(event) ||
    (event === analyticsEvents.scrollDepthReached &&
      Number(properties.scroll_percentage ?? properties.milestone ?? 0) >= 75)
  ) {
    incrementMeaningfulInteraction();
  }

  posthog.capture(event, payload, options.transport ? { transport: options.transport } : undefined);
}
