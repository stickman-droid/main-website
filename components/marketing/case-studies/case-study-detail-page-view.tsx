import NextLink from "next/link";
import Image from "next/image";

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

export function CaseStudyDetailPageView({
  caseStudy,
}: {
  caseStudy: CaseStudy;
}) {
  return (
    <article className="min-h-screen bg-background text-[#3D3D3D] lg:pb-8">
      <div className="px-6 py-5 sm:py-10">
        <nav className="hidden w-full lg:block lg:pl-15">
          <div className="flex flex-wrap items-center justify-start gap-1.5 text-left text-sm lg:text-[11px] font-mono tracking-[0.2em] text-[#3D3D3D] uppercase sm:flex-nowrap">
            <NextLink
              href="/"
              className="whitespace-nowrap transition-colors hover:text-zinc-600"
            >
              Home
            </NextLink>
            <span className="whitespace-nowrap text-[#3D3D3D]">.</span>
            <NextLink
              href="/case-studies"
              className="whitespace-nowrap transition-colors hover:text-zinc-600"
            >
              Case Studies
            </NextLink>
            <span className="whitespace-nowrap text-[#3D3D3D]">.</span>
            <span className="text-[#3D3D3D]">{caseStudy.title}</span>
          </div>
        </nav>
      </div>

      {/* Main article column */}
      <div className="mx-auto max-w-[1024px] px-6">
        {/* Centered Heading Section */}
        <header className="flex flex-col items-center text-center space-y-3 pt-2 pb-12 sm:pt-4 sm:pb-16">
          <p className="text-[11px] font-mono font-bold tracking-[0.3em] text-zinc-400 uppercase">
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
                className="rounded-full border border-black/8 bg-[#F8F8F8] px-4 py-1.5 text-[13px] font-medium text-zinc-500 transition-colors hover:bg-black/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Hero Image */}
        <div className="mb-20 -mx-3 overflow-hidden sm:-mx-8 lg:mx-0 xl:-mx-10">
          {caseStudy.heroImage.image ? (
            <div className="relative aspect-[21/8] w-full rounded-[24px] bg-zinc-50">
              <Image
                src={caseStudy.heroImage.image}
                alt={caseStudy.heroImage.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="flex aspect-[21/8] items-center justify-center rounded-[24px] bg-zinc-50">
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-300 uppercase">
                Hero Visual Placeholder
              </span>
            </div>
          )}
        </div>

        {/* Dynamic Content Sections */}
        <div className="mx-auto max-w-[620px] space-y-10">
          {caseStudy.content.map((block, index) => {
            if (block.type === "description") {
              return (
                <section key={index} className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-400 uppercase">
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
                  {block.points && block.points.length > 0 ? (
                    <ul className="space-y-1 text-[16px] sm:text-[18px] leading-[1.6] text-zinc-600 font-medium marker:text-zinc-400 marker:text-sm marker:font-semibold">
                      {block.points.map((point) => (
                        <li key={point} className="list-disc">
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div
                      className="text-[16px] sm:text-[18px] leading-[1.7] text-zinc-600 font-medium whitespace-pre-wrap"
                    >
                      {block.description}
                    </div>
                  )}
                </section>
              );
            }

            return (
              <section key={index} className="space-y-2">
                <div className="overflow-hidden rounded-[20px]">
                  {block.image ? (
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={block.image}
                        alt={block.title}
                        fill
                        className="object-contain"
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
                  <p className="text-[11px] font-mono font-medium tracking-[0.1em] text-zinc-400 uppercase">
                    {block.eyebrow} — {block.title}
                  </p>
                  <p className="text-sm italic text-zinc-400">
                    {block.caption}
                  </p>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </article>
  );
}

