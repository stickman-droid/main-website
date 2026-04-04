import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const themeClasses = {
  sand: "bg-[linear-gradient(135deg,#f7f0e4_0%,#ead7bc_100%)]",
  graphite: "bg-[linear-gradient(135deg,#1f232c_0%,#505867_100%)] text-white",
  terracotta: "bg-[linear-gradient(135deg,#f2d2c2_0%,#d57f5f_100%)]",
  steel: "bg-[linear-gradient(135deg,#e2e8f0_0%,#94a3b8_100%)]",
  ocean: "bg-[linear-gradient(135deg,#d6eef1_0%,#5da8b3_100%)]",
  berry: "bg-[linear-gradient(135deg,#f4d7df_0%,#b65f77_100%)]",
} as const;

type CaseStudy = {
  slug: string;
  title: string;
  heading: string;
  description: string;
  tags: string[];
  heroImage: {
    eyebrow: string;
    title: string;
    caption: string;
    theme: string;
  };
  content: Array<
    | {
      type: "description";
      subtitle: string;
      description: string;
    }
    | {
      type: "image";
      eyebrow: string;
      title: string;
      caption: string;
      theme: string;
    }
  >;
};

export function CaseStudyDetailPageView({
  caseStudy,
}: {
  caseStudy: CaseStudy;
}) {
  return (
    <article className="bg-[#f6f3ee] text-[#1c1c1c]">
      <section className="border-b border-black/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 lg:px-8 lg:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center justify-start gap-1.5 text-left text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-400 uppercase">
            <Link href="/" className="transition-colors hover:text-zinc-600">
              Home
            </Link>
            <span className="text-zinc-200">.</span>
            <Link
              href="/case-studies"
              className="transition-colors hover:text-zinc-600"
            >
              Case Studies
            </Link>
            <span className="text-zinc-200">.</span>
            <span className="text-zinc-600">{caseStudy.title}</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-end">
            <div className="space-y-6">
              <p className="text-sm font-semibold tracking-[0.26em] text-black/45 uppercase">
                Challenge Overview
              </p>
              <h1
                className="max-w-4xl text-[36px] font-bold tracking-tight text-[#1c1c1c] leading-[1.1]"
                style={{ fontFamily: "var(--font-heading, serif)" }}
              >
                {caseStudy.heading}
              </h1>
            </div>

            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {caseStudy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-black/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm leading-6 text-black/65 sm:text-base">
                {caseStudy.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div
          className={`relative overflow-hidden rounded-[34px] border border-black/10 px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.08)] sm:px-8 sm:py-10 lg:px-12 lg:py-14 ${themeClasses[caseStudy.heroImage.theme as keyof typeof themeClasses]}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.2),transparent_34%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
            <div className="space-y-4">
              <span className="inline-flex w-fit rounded-full border border-current/15 bg-white/20 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] uppercase">
                {caseStudy.heroImage.eyebrow}
              </span>
              <div className="max-w-2xl space-y-3">
                <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  {caseStudy.heroImage.title}
                </h2>
                <p className="max-w-xl text-sm leading-6 opacity-80 sm:text-base">
                  {caseStudy.heroImage.caption}
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-current/10 bg-white/30 p-5 backdrop-blur-sm">
              <div className="grid gap-3">
                <div className="h-3 rounded-full bg-current/15" />
                <div className="grid grid-cols-[1.3fr_0.9fr] gap-3">
                  <div className="h-28 rounded-[22px] bg-white/45" />
                  <div className="grid gap-3">
                    <div className="h-12 rounded-[18px] bg-white/45" />
                    <div className="h-12 rounded-[18px] bg-white/35" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-16 rounded-[18px] bg-white/40" />
                  <div className="h-16 rounded-[18px] bg-white/30" />
                  <div className="h-16 rounded-[18px] bg-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pb-16 sm:px-6 lg:px-8 lg:gap-10 lg:pb-24">
        {caseStudy.content.map((block, index) => {
          if (block.type === "description") {
            return (
              <div
                key={`${caseStudy.slug}-description-${index}`}
                className="rounded-[28px] border border-black/10 bg-white px-6 py-7 shadow-[0_18px_50px_rgba(0,0,0,0.05)] sm:px-8 sm:py-8"
              >
                <p className="text-sm font-medium tracking-[0.18em] text-black/45 uppercase">
                  {block.subtitle ?? ""}
                </p>
                <p className="mt-4 max-w-3xl text-base leading-8 text-black/70 sm:text-lg">
                  {block.description}
                </p>
              </div>
            );
          }

          return (
            <div
              key={`${caseStudy.slug}-image-${index}`}
              className={`relative overflow-hidden rounded-[30px] border border-black/10 px-6 py-7 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:px-8 sm:py-8 ${themeClasses[block.theme as keyof typeof themeClasses]}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.45),transparent_32%)]" />
              <div className="relative grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(220px,0.75fr)] lg:items-center">
                <div className="space-y-3">
                  <span className="inline-flex w-fit rounded-full border border-current/15 bg-white/20 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] uppercase">
                    {block.eyebrow}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                    {block.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-6 opacity-80 sm:text-base">
                    {block.caption}
                  </p>
                </div>

                <div className="rounded-[26px] border border-current/10 bg-white/30 p-4 backdrop-blur-sm">
                  <div className="grid gap-3">
                    <div className="h-4 w-24 rounded-full bg-current/15" />
                    <div className="grid grid-cols-[1.1fr_0.9fr] gap-3">
                      <div className="h-24 rounded-[18px] bg-white/40" />
                      <div className="grid gap-3">
                        <div className="h-10 rounded-[16px] bg-white/35" />
                        <div className="h-10 rounded-[16px] bg-white/25" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-12 rounded-[14px] bg-white/35" />
                      <div className="h-12 rounded-[14px] bg-white/25" />
                      <div className="h-12 rounded-[14px] bg-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </article>
  );
}
