"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { analyticsEvents } from "./events";
import { capture } from "./capture";

const milestones = [25, 50, 75, 90, 100];

export function ScrollTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reachedRef = React.useRef(new Set<number>());

  React.useEffect(() => {
    reachedRef.current = new Set<number>();
  }, [pathname, searchParams]);

  React.useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const percentage =
        scrollable <= 0 ? 100 : Math.min(100, Math.round((window.scrollY / scrollable) * 100));

      milestones.forEach((milestone) => {
        if (percentage >= milestone && !reachedRef.current.has(milestone)) {
          reachedRef.current.add(milestone);
          capture(
            analyticsEvents.scrollDepthReached,
            {
              milestone,
              scroll_percentage: milestone,
            },
            { onceKey: `${pathname}?${searchParams.toString()}:scroll:${milestone}` }
          );
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname, searchParams]);

  return null;
}
