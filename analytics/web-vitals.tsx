"use client";

import { useReportWebVitals } from "next/web-vitals";
import { analyticsEvents } from "./events";
import { capture } from "./capture";

export function WebVitals() {
  useReportWebVitals((metric) => {
    capture(analyticsEvents.webVitalReported, {
      metric_name: metric.name,
      value: metric.value,
      rating: "rating" in metric ? metric.rating : undefined,
      id: metric.id,
      navigation_type: metric.navigationType,
    });
  });

  return null;
}
