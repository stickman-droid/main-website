"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ContactSection } from "@/components/marketing/home/contact-section";
import { caseStudies } from "@/lib/case-studies-data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function CaseStudiesPageView() {
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
      <section className="w-full py-8 sm:py-10 lg:py-12">
        <div className="mx-auto w-full px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-start gap-1.5 text-left text-[11px] font-mono font-bold tracking-[0.2em] text-[#8e8e8e] uppercase">
            <span>Home</span>
            <span className="text-zinc-200">.</span>
            <span>Case Studies</span>
          </div>

          <div className="mx-auto mt-8 max-w-4xl text-center sm:mt-10">
            <h1
              className="text-[50px] lg:text-[56px] font-bold tracking-tight text-[#252525] leading-[1.1]"
              style={{ fontFamily: "var(--font-heading, serif)" }}
            >
              Problems We&apos;ve Solved.
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
                className="case-study-card opacity-0 group relative overflow-hidden rounded-[24px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.18)] bg-zinc-50"
              >
                {/* Image Container */}
                <div className="relative min-h-[300px] w-full sm:min-h-[360px] lg:min-h-[400px] xl:min-h-[340px]">
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
                  className="absolute inset-x-0 bottom-0 space-y-3 px-5 py-5"
                  style={{
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, #000000 100%)",
                  }}
                >
                  <h2 className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
                    {caseStudy.title}
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    {caseStudy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#252525]"
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
