"use client";

import * as React from "react";
import { LinkClickTracker } from "./link-tracking";
import { PageTracker } from "./page-tracking";
import { ScrollTracker } from "./scroll-tracking";
import { SectionTracker } from "./section-tracking";
import { WebVitals } from "./web-vitals";

export function AnalyticsRoot() {
  return (
    <>
      <React.Suspense fallback={null}>
        <PageTracker />
        <ScrollTracker />
        <SectionTracker />
      </React.Suspense>
      <LinkClickTracker />
      <WebVitals />
    </>
  );
}
