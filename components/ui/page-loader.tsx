"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "@/components/ui/loader";

const NAVIGATION_DELAY_MS = 120; // Only show loader if navigation takes longer than 120ms
const MIN_VISIBLE_MS = 350;      // If loader appears, keep visible for at least 350ms to avoid flashing
const FADE_DURATION_MS = 350;    // Duration of fade-out animation
const SAFETY_TIMEOUT_MS = 6000;  // Auto-hide if navigation takes longer than 6s (aborted/failed)

export function PageLoader() {
  // Initial page load: show loader first, then smoothly fade out
  const [mounted, setMounted] = useState(true);
  const [fading, setFading] = useState(false);
  const pathname = usePathname();

  // Track the current pathname to detect actual route changes
  const currentPathRef = useRef(pathname);
  // Navigation detection refs
  const navTimerRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const minVisibleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isNavigatingRef = useRef(false);
  const loaderShownAtRef = useRef<number>(0);

  // 1. Initial page load splash: shows loader first, then fades out once page is ready
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 600);

    const removeTimer = setTimeout(() => {
      setMounted(false);
    }, 600 + FADE_DURATION_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const triggerShowLoader = () => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    loaderShownAtRef.current = Date.now();

    setMounted(true);
    setFading(false);

    // Safety timeout to prevent permanently stuck loader
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    safetyTimerRef.current = setTimeout(() => {
      triggerHideLoader();
    }, SAFETY_TIMEOUT_MS);
  };

  const triggerHideLoader = () => {
    if (navTimerRef.current) {
      clearTimeout(navTimerRef.current);
      navTimerRef.current = null;
    }
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }

    if (!isNavigatingRef.current) return;

    // Ensure loader is visible for at least MIN_VISIBLE_MS to avoid a jarring micro-flash
    const elapsed = Date.now() - loaderShownAtRef.current;
    const remainingTime = Math.max(0, MIN_VISIBLE_MS - elapsed);

    if (minVisibleTimerRef.current) clearTimeout(minVisibleTimerRef.current);

    minVisibleTimerRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
      setFading(true);
      setTimeout(() => {
        setMounted(false);
      }, FADE_DURATION_MS);
    }, remainingTime);
  };

  // 2. Listen to route completion (pathname changes)
  useEffect(() => {
    if (currentPathRef.current === pathname) return;
    currentPathRef.current = pathname;

    // If navigation completed quickly (e.g. cached page), cancel pending timer so loader never appears
    if (navTimerRef.current) {
      clearTimeout(navTimerRef.current);
      navTimerRef.current = null;
    }

    // If loader was shown because navigation was slow, smoothly fade it out now that the new page is ready
    if (isNavigatingRef.current) {
      triggerHideLoader();
    }
  }, [pathname]);

  // 3. Listen to navigation triggers (clicks on internal links, browser back/forward)
  useEffect(() => {
    const handleNavigationStart = () => {
      if (navTimerRef.current) {
        clearTimeout(navTimerRef.current);
      }
      // Only show loader if the route transition takes longer than NAVIGATION_DELAY_MS
      navTimerRef.current = setTimeout(() => {
        triggerShowLoader();
      }, NAVIGATION_DELAY_MS);
    };

    const handleClick = (e: MouseEvent) => {
      // Ignore clicks with modifier keys (open in new tab/window) or non-primary clicks
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      // Ignore links that open in new window or are downloads
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;

      // Ignore in-page hash links, protocols, etc.
      if (
        rawHref.startsWith("#") ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:") ||
        rawHref.startsWith("javascript:")
      ) {
        return;
      }

      try {
        const targetUrl = new URL(anchor.href, window.location.href);

        // Only handle internal links
        if (targetUrl.origin !== window.location.origin) return;

        // If clicking a link to the exact same page/search, ignore
        if (
          targetUrl.pathname === window.location.pathname &&
          targetUrl.search === window.location.search
        ) {
          return;
        }

        // Start delayed navigation loader
        handleNavigationStart();
      } catch {
        // Ignore URL parsing errors
      }
    };

    const handlePopState = () => {
      handleNavigationStart();
    };

    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      if (minVisibleTimerRef.current) clearTimeout(minVisibleTimerRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden={fading}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-350 ease-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <Loader />
    </div>
  );
}

export default PageLoader;
