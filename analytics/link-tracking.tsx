"use client";

import * as React from "react";
import { analyticsEvents } from "./events";
import { capture } from "./capture";
import { getPageKey } from "./route-registry";
import { getDestinationHost, getLinkType, sanitizeId } from "./utils";

function getNavLocation(anchor: HTMLAnchorElement) {
  if (anchor.closest("header") && window.innerWidth >= 1024) return "header_desktop";
  if (anchor.closest("header")) return "header_mobile_top";
  if (anchor.closest('[data-slot="sheet-content"]')) return "mobile_sheet";
  if (anchor.closest(".fixed.inset-x-0.bottom-0")) return "mobile_bottom_marquee";
  if (anchor.closest("footer") && window.innerWidth >= 768) return "footer_desktop";
  if (anchor.closest("footer")) return "footer_mobile";
  if (anchor.closest("nav")) return "breadcrumb";
  return "content";
}

function getLabel(anchor: HTMLAnchorElement) {
  return (
    anchor.getAttribute("aria-label") ??
    anchor.textContent?.replace(/\s+/g, " ").trim() ??
    anchor.href
  );
}

function getSectionContext(anchor: HTMLAnchorElement) {
  const section = anchor.closest("section, article, footer, header");
  const explicitId = section?.getAttribute("data-analytics-section");
  const heading = section?.querySelector("h1, h2, h3")?.textContent?.trim();
  const sectionId = explicitId ?? (heading ? sanitizeId(heading) : undefined);

  return {
    section_id: sectionId,
    section_title: heading,
  };
}

function getCtaId({
  currentPage,
  label,
  navLocation,
  sectionId,
}: {
  currentPage: string;
  label: string;
  navLocation: string;
  sectionId?: string;
}) {
  if (navLocation !== "content") {
    return `${sanitizeId(navLocation)}_${sanitizeId(label)}`;
  }

  return [currentPage, sectionId, sanitizeId(label)].filter(Boolean).join("_");
}

export function LinkClickTracker() {
  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const label = getLabel(anchor);
      const href = anchor.getAttribute("href") ?? anchor.href;
      const destination = new URL(href, window.location.href);
      const destinationHost = getDestinationHost(destination.href);
      const linkType = getLinkType(destination);
      const navLocation = getNavLocation(anchor);
      const currentPage = getPageKey(window.location.pathname);
      const sectionContext = getSectionContext(anchor);

      if (
        destination.pathname === "/" &&
        (currentPage === "not_found" || label.toLowerCase().includes("go home"))
      ) {
        capture(analyticsEvents.notFoundRecoveryClicked, {
          destination: destination.pathname,
          link_label: label,
        });
      }

      if (
        anchor.querySelector('img[alt*="Stickman"]') ||
        (destination.pathname === "/" && label.toLowerCase().includes("stickman"))
      ) {
        capture(analyticsEvents.logoClicked, {
          location: navLocation,
          destination: destination.pathname,
          link_type: linkType,
        });
        return;
      }

      if (destination.protocol === "mailto:") {
        capture(analyticsEvents.emailClicked, {
          nav_location: navLocation,
          component: navLocation,
          email: destination.pathname,
          destination: href,
          link_label: label,
        });
        return;
      }

      if (destinationHost === "cal.eu") {
        capture(analyticsEvents.ctaClicked, {
          cta_id: getCtaId({
            currentPage,
            label,
            navLocation,
            sectionId: sectionContext.section_id,
          }),
          cta_text: label,
          cta_type: "primary_booking",
          component: sectionContext.section_title ?? navLocation,
          position: sectionContext.section_id ?? navLocation,
          destination: destination.href,
          destination_host: destinationHost,
          link_type: linkType,
          ...sectionContext,
        });
        return;
      }

      if (destination.pathname === "/case-studies" && navLocation === "content") {
        capture(analyticsEvents.ctaClicked, {
          cta_id: getCtaId({
            currentPage,
            label,
            navLocation,
            sectionId: sectionContext.section_id,
          }),
          cta_text: label,
          cta_type: "proof_navigation",
          component: sectionContext.section_title ?? navLocation,
          position: sectionContext.section_id ?? navLocation,
          destination: destination.pathname,
          link_type: linkType,
          ...sectionContext,
        });
        return;
      }

      if (
        anchor.classList.contains("case-study-card") ||
        anchor.classList.contains("project-card") ||
        destination.pathname.startsWith("/case-studies/")
      ) {
        capture(analyticsEvents.caseStudyCardClicked, {
          case_study_slug: destination.pathname.split("/").filter(Boolean)[1],
          card_title: anchor.querySelector("h2, h3")?.textContent?.trim() ?? label,
          card_position: Array.from(
            document.querySelectorAll("a.case-study-card, a.project-card")
          ).indexOf(anchor) + 1,
          destination: destination.pathname,
          link_type: linkType,
        });
        return;
      }

      if (destinationHost?.includes("linkedin") || destinationHost?.includes("youtube")) {
        capture(analyticsEvents.socialLinkClicked, {
          social_network: destinationHost.includes("linkedin") ? "linkedin" : "youtube",
          destination: destination.href,
          link_label: label,
          nav_location: navLocation,
        });
        return;
      }

      if (destination.pathname === "/privacy" || destination.pathname === "/terms") {
        capture(analyticsEvents.legalLinkClicked, {
          destination: destination.pathname,
          link_label: label,
          nav_location: navLocation,
          link_type: linkType,
        });
        return;
      }

      if (linkType === "internal") {
        capture(analyticsEvents.navigationClicked, {
          nav_location: navLocation,
          nav_label: label,
          link_label: label,
          destination: destination.pathname,
          is_active: destination.pathname === window.location.pathname,
          link_type: linkType,
        });
        return;
      }

      capture(analyticsEvents.externalLinkClicked, {
        destination: destination.href,
        destination_host: destinationHost,
        link_label: label,
        link_type: linkType,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
