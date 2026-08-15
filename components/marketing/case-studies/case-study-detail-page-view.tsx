"use client"

import * as React from "react"
import NextLink from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export type CaseStudy = {
  slug: string;
  title: string;
  heading: string;
  description: string;
  tags: string[];
  heroImage: {
    eyebrow: string;
    title: string;
    caption: string;
    image?: string;
    theme: string;
  };
  content: Array<
    | {
      type: "description";
      subtitle: string;
      title?: string;
      description?: string;
      points?: string[];
    }
    | {
      type: "image";
      eyebrow: string;
      title: string;
      caption: string;
      image?: string;
      theme: string;
    }
  >;
};

function renderFormattedText(text?: string) {
  if (!text) return null;
  if (!text.includes("**")) return text;

  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-[#1C1C1C]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function CaseStudyDetailPageView({
  caseStudy,
}: {
  caseStudy: CaseStudy;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = React.useState<{ src: string; alt: string } | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  useGSAP(() => {
    if (!containerRef.current) return;

    const revealElements = gsap.utils.toArray<HTMLElement>(".reveal-item");

    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 24,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true,
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <article ref={containerRef} className="min-h-screen bg-background text-[#252525] lg:pb-8">
      <div className="px-6 py-5 sm:py-10">
        <nav className="w-full lg:pl-15">
          <div className="flex flex-wrap items-center justify-start gap-1.5 text-left text-[10px] lg:text-[11px] font-mono tracking-[0.2em] text-[#252525] uppercase sm:flex-nowrap">
            <NextLink
              href="/"
              className="whitespace-nowrap transition-colors hover:text-[#252525]"
            >
              Home
            </NextLink>
            <span className="whitespace-nowrap text-[#252525]">.</span>
            <NextLink
              href="/case-studies"
              className="whitespace-nowrap transition-colors hover:text-[#252525]"
            >
              Case Studies
            </NextLink>
            <span className="whitespace-nowrap text-[#252525]">.</span>
            <span className="text-[#252525]">{caseStudy.title}</span>
          </div>
        </nav>
      </div>

      {/* Main article column */}
      <div className="mx-auto max-w-[1024px] px-6">
        {/* Centered Heading Section */}
        <header data-analytics-section="case_study_header" className="reveal-item flex flex-col items-center text-center space-y-3 pt-2 pb-12 sm:pt-4 sm:pb-16">
          <p className="text-[11px] font-mono font-bold tracking-[0.3em] text-[#8e8e8e] uppercase">
            {caseStudy.heroImage.eyebrow}
          </p>

          <h1
            className="text-[38px] sm:text-[40px] lg:text-[48px] font-bold tracking-tight text-[#1C1C1C] leading-[1.15]"
            style={{ fontFamily: "var(--font-heading, serif)" }}
          >
            {caseStudy.heading}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {caseStudy.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/8 bg-[#F8F8F8] px-4 py-1.5 text-[13px] font-medium text-[#252525] transition-colors hover:bg-black/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Hero Image */}
        <div data-analytics-section="case_study_hero_image" className="reveal-item mb-20 -mx-3 overflow-hidden sm:-mx-8 lg:mx-0 xl:-mx-10">
          {caseStudy.heroImage.image ? (
            <div
              className="group cursor-zoom-in relative aspect-[21/8] w-full overflow-hidden bg-zinc-50"
              onClick={() =>
                setSelectedImage({
                  src: caseStudy.heroImage.image!,
                  alt: caseStudy.heroImage.title || caseStudy.title,
                })
              }
            >
              <Image
                src={caseStudy.heroImage.image}
                alt={caseStudy.heroImage.title}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                priority
              />
            </div>
          ) : (
            <div className="flex aspect-[21/8] items-center justify-center bg-zinc-50">
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-300 uppercase">
                Hero Visual Placeholder
              </span>
            </div>
          )}
        </div>

        {/* Dynamic Content Sections */}
        <div className="mx-auto max-w-[620px] space-y-16 pb-20">
          {caseStudy.content.map((block, index) => {
            if (block.type === "description") {
              return (
                <section key={index} data-analytics-section={`case_study_block_${index + 1}`} className="reveal-item space-y-3">
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#8e8e8e] uppercase">
                      {block.subtitle}
                    </p>
                    {block.title && (
                      <h2
                        className="text-[32px] sm:text-[36px] font-bold text-[#1C1C1C] tracking-tight leading-tight"
                        style={{ fontFamily: "var(--font-heading, serif)" }}
                      >
                        {block.title}
                      </h2>
                    )}
                  </div>
                  {block.description && (
                    <div
                      className="text-[16px] sm:text-[18px] leading-[1.7] text-[#252525] font-medium whitespace-pre-wrap"
                    >
                      {renderFormattedText(block.description)}
                    </div>
                  )}
                  {block.points && block.points.length > 0 && (
                    <ul className="space-y-3 text-[16px] sm:text-[18px] leading-[1.6] text-[#252525] font-medium marker:text-[#8e8e8e] marker:text-sm marker:font-semibold pt-1">
                      {block.points.map((point) => (
                        <li key={point} className="list-disc pl-1">
                          {renderFormattedText(point)}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            }

            return (
              <section key={index} data-analytics-section={`case_study_block_${index + 1}`} className="reveal-item space-y-2">
                <div className="w-full overflow-hidden rounded-[20px]">
                  {block.image ? (
                    <div
                      className="group cursor-zoom-in overflow-hidden rounded-[20px] w-full"
                      onClick={() =>
                        setSelectedImage({
                          src: block.image!,
                          alt: block.title || block.caption || `${caseStudy.title} interface screenshot ${index + 1}`,
                        })
                      }
                    >
                      <img
                        src={block.image}
                        alt={
                          block.title ||
                          block.caption ||
                          `${caseStudy.title} interface screenshot ${index + 1}`
                        }
                        className="w-full h-auto rounded-[20px] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center bg-zinc-50 rounded-[20px]">
                      <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-300 uppercase">
                        Image Placeholder
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] font-mono font-medium tracking-[0.1em] text-[#8e8e8e] uppercase">
                    {block.eyebrow} — {block.title}
                  </p>
                  <p className="text-sm italic text-[#8e8e8e]">
                    {block.caption}
                  </p>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Modal for Body Content Images */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8 transition-all duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 z-50 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none"
            aria-label="Close modal"
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[85vh] max-w-[90vw] w-auto h-auto rounded-xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </article>
  );
}
