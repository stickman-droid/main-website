"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ContactSection } from "@/components/marketing/home/contact-section";
import { caseStudies } from "@/lib/case-studies-data";

export function CaseStudiesPageView() {
  const [visibleCards, setVisibleCards] = useState<Record<number, boolean>>({});
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleCards((current) => {
          const next = { ...current };

          for (const entry of entries) {
            const index = Number(
              (entry.target as HTMLElement).dataset.caseStudyIndex
            );

            next[index] = entry.isIntersecting;
          }

          return next;
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    for (const card of cardRefs.current) {
      if (card) {
        observer.observe(card);
      }
    }

    return () => observer.disconnect();
  }, []);

  function getCardMotion(index: number, isVisible: boolean) {
    const fromLeft = index % 2 === 0;

    return {
      card: isVisible
        ? "translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100 blur-0"
        : fromLeft
          ? "-translate-x-14 translate-y-8 -rotate-[1.6deg] scale-[0.965] opacity-0 blur-[6px]"
          : "translate-x-14 translate-y-8 rotate-[1.6deg] scale-[0.965] opacity-0 blur-[6px]",
      image: isVisible
        ? "translate-y-0 scale-100 opacity-100"
        : "translate-y-6 scale-[1.04] opacity-0",
      content: isVisible
        ? "translate-y-0 opacity-100"
        : "translate-y-5 opacity-0",
      tags: isVisible
        ? "translate-y-0 opacity-100"
        : "translate-y-4 opacity-0",
      description: isVisible
        ? "translate-y-0 opacity-100"
        : "translate-y-4 opacity-0",
    };
  }

  return (
    <main className="min-h-screen bg-background text-[#3D3D3D]">
      <section className="w-full py-8 sm:py-10 lg:py-12">
        <div className="mx-auto w-full px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-start gap-1.5 text-left text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-400 uppercase">
            <span>Home</span>
            <span className="text-zinc-200">.</span>
            <span>Case Studies</span>
          </div>

          <div className="mx-auto mt-8 max-w-4xl text-center sm:mt-10">
            <h1
              className="text-[36px] font-bold tracking-tight text-[#3D3D3D] leading-[1.1]"
              style={{ fontFamily: "var(--font-heading, serif)" }}
            >
              Problems we&apos;ve Solved.
              <br />
              Results That Speak
            </h1>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 lg:pb-0 xl:pb-8">
        <div className="mx-auto w-full px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 xl:mx-auto xl:max-w-[1080px] xl:gap-8">
            {caseStudies.map((caseStudy, index) => (
              <Link
                key={caseStudy.slug}
                href={`/case-studies/${caseStudy.slug}`}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                data-case-study-index={index}
                style={{
                  transitionDelay: `${Math.min(index * 70, 240)}ms`,
                }}
                className={`group overflow-hidden rounded-[24px] border border-black/8 bg-background shadow-[0_20px_60px_rgba(0,0,0,0.05)] will-change-transform transition-[transform,opacity,filter,box-shadow] duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.08)] ${getCardMotion(index, !!visibleCards[index]).card}`}
              >
                <div
                  style={{
                    transitionDelay: `${80 + Math.min(index * 70, 240)}ms`,
                  }}
                  className={`border-b border-black/8 bg-[#FFFFFF] p-4 transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-5 xl:p-4 ${getCardMotion(index, !!visibleCards[index]).image}`}
                >
                  {caseStudy.heroImage.image ? (
                    <div className="relative min-h-[220px] overflow-hidden rounded-[20px] sm:min-h-[260px] lg:min-h-[280px] xl:min-h-[220px]">
                      <Image
                        src={caseStudy.heroImage.image}
                        alt={caseStudy.heroImage.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex min-h-[220px] items-center justify-center rounded-[20px] border border-dashed border-black/10 bg-background sm:min-h-[260px] lg:min-h-[280px] xl:min-h-[220px]">
                      <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-300 uppercase">
                        Image Placeholder
                      </span>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    transitionDelay: `${150 + Math.min(index * 70, 240)}ms`,
                  }}
                  className={`space-y-5 px-5 py-6 transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-6 sm:py-8 xl:space-y-4 xl:px-5 xl:py-5 ${getCardMotion(index, !!visibleCards[index]).content}`}
                >
                  <div className="space-y-3">
                    <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#3D3D3D] sm:text-[28px] xl:text-[24px]">
                      {caseStudy.title}
                    </h2>

                    <div
                      style={{
                        transitionDelay: `${220 + Math.min(index * 70, 240)}ms`,
                      }}
                      className={`flex flex-wrap gap-2 transition-[transform,opacity] duration-[820ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${getCardMotion(index, !!visibleCards[index]).tags}`}
                    >
                      {caseStudy.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-black/8 bg-background px-3 py-1.5 text-[11px] font-semibold text-zinc-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p
                    style={{
                      transitionDelay: `${280 + Math.min(index * 70, 240)}ms`,
                    }}
                    className={`text-[15px] leading-relaxed text-zinc-500 transition-[transform,opacity] duration-[820ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-[16px] xl:text-[15px] ${getCardMotion(index, !!visibleCards[index]).description}`}
                  >
                    {caseStudy.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}

