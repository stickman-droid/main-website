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
    };
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-background text-[#3D3D3D]">
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

      <section className="overflow-x-clip pb-16 sm:pb-20 lg:pb-0 xl:pb-8">
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
                className={`group relative overflow-hidden rounded-[24px] will-change-transform transition-[transform,opacity,filter,box-shadow] duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.18)] ${getCardMotion(index, !!visibleCards[index]).card}`}
              >
                {/* Full-bleed image */}
                <div
                  style={{ transitionDelay: `${80 + Math.min(index * 70, 240)}ms` }}
                  className={`relative min-h-[300px] w-full transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:min-h-[360px] lg:min-h-[400px] xl:min-h-[340px] ${getCardMotion(index, !!visibleCards[index]).image}`}
                >
                  {caseStudy.heroImage.image ? (
                    <Image
                      src={caseStudy.heroImage.image}
                      alt={caseStudy.heroImage.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-100">
                      <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-300 uppercase">
                        Image Placeholder
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom overlay — blur + gradient */}
                <div
                  style={{
                    transitionDelay: `${150 + Math.min(index * 70, 240)}ms`,
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, #000000 100%)",
                  }}
                  className={`absolute inset-x-0 bottom-0 space-y-3 px-5 py-5 transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${getCardMotion(index, !!visibleCards[index]).content}`}
                >
                  <h2 className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
                    {caseStudy.title}
                  </h2>

                  <div
                    style={{ transitionDelay: `${220 + Math.min(index * 70, 240)}ms` }}
                    className={`flex flex-wrap gap-2 transition-[transform,opacity] duration-[820ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${getCardMotion(index, !!visibleCards[index]).tags}`}
                  >
                    {caseStudy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#3D3D3D]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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

