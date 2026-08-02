"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function CaseStudiesClient({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".case-study-card");

    cards.forEach((card, index) => {
      if (index < 2) {
        // Premium entrance for the first two cards on page load
        gsap.fromTo(
          card,
          { opacity: 0, y: 24, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            delay: 0.1 + index * 0.1,
            ease: "power2.out",
          }
        );
      } else {
        // Standard reveal on scroll for the rest
        gsap.fromTo(
          card,
          { opacity: 0, y: 28, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            delay: (index % 2) * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen overflow-x-clip bg-background text-[#252525]">
      {children}
    </main>
  );
}
