"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const STORAGE_KEY = "stickman_cookie_banner_dismissed";
const HERO_REVEALED_EVENT = "stickman:home-hero-revealed";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") return;

    const reveal = () => setIsVisible(true);

    // Pages with a hero reveal animation (e.g. the calculator on home) dispatch
    // this once their entrance animation finishes, so the banner doesn't pop in
    // mid-animation. Pages without one show the banner right away.
    if (!document.querySelector(".hero-reveal")) {
      const frame = requestAnimationFrame(reveal);
      return () => cancelAnimationFrame(frame);
    }

    window.addEventListener(HERO_REVEALED_EVENT, reveal, { once: true });
    return () => window.removeEventListener(HERO_REVEALED_EVENT, reveal);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Privacy-friendly analytics notice"
      className="cookie-banner fixed inset-x-0 bottom-0 z-[70] w-full rounded-t-[16px] border border-[#d9d9d9] bg-white px-5 pt-6 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] text-center opacity-100 shadow-[0_12px_35px_rgba(0,0,0,0.18)] sm:px-6 sm:pt-7 lg:inset-x-auto lg:right-6 lg:bottom-6 lg:h-[312px] lg:w-[542.6322021484375px] lg:rounded-[16px] lg:py-12 lg:text-left"
    >
      <div className="flex flex-col items-center gap-3.5 sm:gap-4 lg:grid lg:grid-cols-[1fr_136px] lg:gap-4">
        <div className="order-2 flex w-full flex-col items-center lg:order-1 lg:block">
          <h2 className="font-heading whitespace-nowrap text-[17px] font-bold tracking-tight text-[#1f1f1f] min-[360px]:text-[19px] min-[390px]:text-[20px] sm:text-[22px] lg:whitespace-normal lg:text-[30px] lg:leading-[1.08]">
            We won&apos;t serve <br className="hidden lg:inline" />you any cookies
          </h2>
          <div className="mx-auto w-full max-w-[380px] lg:mx-0 lg:max-w-none">
            <p className="mt-2 text-[13px] leading-[1.45] text-[#4a4a4a] sm:mt-2.5 sm:text-[14px] lg:mt-3 lg:text-[15px]">
              <span className="lg:hidden">
                We use privacy-friendly, cookieless analytics to give useful insights from visits without identifying or tracking individual visitors.
              </span>
              <span className="hidden lg:inline">
                <span className="block whitespace-nowrap">
                  We use privacy-friendly, cookieless analytics to
                </span>
                <span className="block whitespace-nowrap">
                  give us useful insights, helping us learn from visits
                </span>
                <span className="block whitespace-nowrap">
                  without identifying or tracking individual visitors.
                </span>
              </span>
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="mt-4 flex h-11 w-full items-center justify-center rounded-[6px] bg-[#1f1f1f] px-4 text-[14px] font-semibold text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#1f1f1f]/30 sm:text-[15px] lg:mt-4 lg:h-11 lg:w-[220px] lg:text-[16px] lg:font-bold"
            >
              Respect My Privacy
            </button>
          </div>
        </div>
        <Image
          src="/cookies.svg"
          alt=""
          width={133}
          height={198}
          priority
          className="order-1 h-auto w-[68px] sm:w-[76px] lg:order-2 lg:w-[136px]"
        />
      </div>
    </aside>
  );
}
