"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { analyticsEvents } from "./events";
import { capture, resetOnceKeysForPage } from "./capture";
import { getCaseStudySlug, getPageKey } from "./route-registry";
import {
  getIsFirstSession,
  getMeaningfulInteractionCount,
  getSessionDurationSeconds,
  getSessionPageCount,
  incrementSessionPageCount,
  persistCampaignParams,
} from "./utils";

export function PageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPageRef = React.useRef<{
    key: string;
    pathname: string;
    startedAt: number;
    maxScroll: number;
  } | null>(null);
  const lastEndedPageRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    const queryString = searchParams.toString();
    const pageViewKey = `${pathname}?${queryString}`;
    const previous = previousPageRef.current;

    if (previous?.key === pageViewKey) return;

    if (previous) {
      capture(analyticsEvents.sessionEnded, {
        exit_page: getPageKey(previous.pathname),
        exit_pathname: previous.pathname,
        duration_seconds: Math.round((Date.now() - previous.startedAt) / 1000),
        page_count: getSessionPageCount(),
        meaningful_interaction_count: getMeaningfulInteractionCount(),
        max_scroll_percentage: previous.maxScroll,
      });
    }

    persistCampaignParams(queryString);
    resetOnceKeysForPage(pageViewKey);

    const pageCount = incrementSessionPageCount();
    const isFirstPageInSession = pageCount === 1;
    const isFirstSession = getIsFirstSession();
    const page = getPageKey(pathname);

    if (isFirstPageInSession) {
      capture(analyticsEvents.sessionStarted, {
        landing_page: page,
        landing_pathname: pathname,
        is_first_session: isFirstSession,
      });
    }

    capture(analyticsEvents.pageViewed, {
      page,
      pathname,
      search: queryString || undefined,
      is_landing_page: isFirstPageInSession,
      is_first_session: isFirstSession,
      entry_source: document.referrer ? "referral" : "direct",
      case_study_slug: getCaseStudySlug(pathname),
    });

    if (page === "case_study_detail") {
      capture(analyticsEvents.caseStudyViewed, {
        case_study_slug: getCaseStudySlug(pathname),
      });
    }

    if (page === "not_found" || document.title.toLowerCase().includes("not found")) {
      capture(analyticsEvents.notFoundViewed, {
        attempted_pathname: pathname,
      });
    }

    previousPageRef.current = {
      key: pageViewKey,
      pathname,
      startedAt: Date.now(),
      maxScroll: 0,
    };
    lastEndedPageRef.current = null;
  }, [pathname, searchParams]);

  React.useEffect(() => {
    const updateMaxScroll = () => {
      const doc = document.documentElement;
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      const percentage = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      if (previousPageRef.current) {
        previousPageRef.current.maxScroll = Math.max(
          previousPageRef.current.maxScroll,
          percentage
        );
      }
    };

    const endSession = () => {
      updateMaxScroll();
      const current = previousPageRef.current;
      if (current?.key && lastEndedPageRef.current === current.key) return;
      lastEndedPageRef.current = current?.key ?? window.location.pathname;

      capture(
        analyticsEvents.sessionEnded,
        {
          exit_page: getPageKey(window.location.pathname),
          exit_pathname: window.location.pathname,
          session_duration_seconds: getSessionDurationSeconds(),
          page_duration_seconds: current
            ? Math.round((Date.now() - current.startedAt) / 1000)
            : undefined,
          page_count: getSessionPageCount(),
          meaningful_interaction_count: getMeaningfulInteractionCount(),
          max_scroll_percentage: current?.maxScroll ?? 0,
          bounce:
            getSessionPageCount() <= 1 && getMeaningfulInteractionCount() === 0,
        },
        { transport: "sendBeacon" }
      );
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") endSession();
    };

    window.addEventListener("scroll", updateMaxScroll, { passive: true });
    window.addEventListener("pagehide", endSession);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("scroll", updateMaxScroll);
      window.removeEventListener("pagehide", endSession);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return null;
}
