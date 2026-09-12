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
      className="cookie-banner fixed inset-x-0 bottom-0 z-[70] w-full rounded-t-[16px] border border-[#d9d9d9] bg-white px-6 pb-[calc(env(safe-area-inset-bottom)+60px)] pt-14 text-center opacity-100 shadow-[0_12px_35px_rgba(0,0,0,0.18)] lg:inset-x-auto lg:right-6 lg:bottom-6 lg:h-[312px] lg:w-[542.6322021484375px] lg:rounded-[16px] lg:py-12 lg:text-left"
    >
      <div className="flex flex-col items-center gap-6 lg:grid lg:grid-cols-[1fr_136px] lg:gap-4">
        <div className="order-2 lg:order-1">
          <h2 className="font-heading text-[32px] leading-[1.08] font-bold text-[#1f1f1f] lg:text-[30px]">
            Our Cookie Jar
            <br />
            Is Always Kept Empty
          </h2>
          <p className="mt-3 text-[13px] leading-[1.45] text-[#4a4a4a] min-[380px]:text-[16px] lg:text-[15px]">
            <span className="lg:hidden">
              <span className="block whitespace-nowrap">
                We use privacy-friendly, cookieless analytics
              </span>
              <span className="block whitespace-nowrap">
                to give useful insights from visits without
              </span>
              <span className="block whitespace-nowrap">
                identifying or tracking individual visitors.
              </span>
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
            className="mt-8 h-14 w-full rounded-[6px] bg-[#1f1f1f] px-4 text-[20px] font-bold text-white transition-colors hover:bg-black focus-visible:ring-3 focus-visible:ring-[#1f1f1f]/30 focus-visible:outline-none lg:mt-4 lg:h-11 lg:w-[220px] lg:text-[16px]"
          >
            Respect My Privacy
          </button>
        </div>
        <Image
          src="/cookies.svg"
          alt=""
          width={133}
          height={198}
          priority
          className="order-1 h-auto w-[132px] lg:order-2 lg:w-[136px]"
        />
      </div>
    </aside>
  );
}
