"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { analyticsEvents } from "./events";
import { capture } from "./capture";
import { getCaseStudySlug, getPageKey } from "./route-registry";
import { sanitizeId } from "./utils";

function getSectionMetadata(element: Element, index: number) {
  const explicitId = element.getAttribute("data-analytics-section");
  const heading = element.querySelector("h1, h2, h3")?.textContent?.trim();
  const title = element.getAttribute("aria-label") ?? heading ?? `Section ${index + 1}`;
  const sectionId = explicitId ?? sanitizeId(title) ?? `section_${index + 1}`;

  return {
    section_id: sectionId,
    section_title: title,
    content_type: "section",
    position: index + 1,
  };
}

function getCardMetadata(element: Element, index: number) {
  const href = element.getAttribute("href") ?? undefined;
  const title =
    element.querySelector("h2, h3")?.textContent?.trim() ??
    element.textContent?.trim() ??
    `Card ${index + 1}`;

  return {
    card_id: element.getAttribute("data-analytics-card") ?? sanitizeId(title),
    card_title: title,
    card_type: element.classList.contains("case-study-card")
      ? "case_study"
      : "work_card",
    destination: href,
    position: index + 1,
    content_type: "card",
  };
}

export function SectionTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const pageViewKey = `${pathname}?${searchParams.toString()}`;
    const observed = [
      ...Array.from(document.querySelectorAll("main section, article > section")),
      ...Array.from(document.querySelectorAll("a.case-study-card, a.project-card")),
    ];

    const visibleSince = new WeakMap<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target;
          const isCard =
            element.matches("a.case-study-card") || element.matches("a.project-card");

          if (entry.isIntersecting) {
            visibleSince.set(element, Date.now());

            if (isCard) {
              const cards = Array.from(
                document.querySelectorAll("a.case-study-card, a.project-card")
              );
              const metadata = getCardMetadata(element, cards.indexOf(element));
              capture(analyticsEvents.cardViewed, metadata, {
                onceKey: `${pageViewKey}:card:${metadata.card_id}`,
              });
              return;
            }

            const sections = Array.from(
              document.querySelectorAll("main section, article > section")
            );
            const metadata = getSectionMetadata(element, sections.indexOf(element));
            const event =
              getPageKey(pathname) === "case_study_detail"
                ? analyticsEvents.caseStudySectionViewed
                : analyticsEvents.sectionViewed;

            capture(
              event,
              {
                ...metadata,
                case_study_slug: getCaseStudySlug(pathname),
              },
              { onceKey: `${pageViewKey}:section:${metadata.section_id}` }
            );
            return;
          }

          const since = visibleSince.get(element);
          if (!since || isCard) return;

          const sections = Array.from(
            document.querySelectorAll("main section, article > section")
          );
          const metadata = getSectionMetadata(element, sections.indexOf(element));
          const visibleTimeSeconds = Math.round((Date.now() - since) / 1000);

          if (visibleTimeSeconds > 0) {
            capture(analyticsEvents.sectionTimeSpent, {
              ...metadata,
              visible_time_seconds: visibleTimeSeconds,
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    observed.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname, searchParams]);

  return null;
}
