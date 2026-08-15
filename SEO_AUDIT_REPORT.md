# SEO Audit Report

## Executive Summary

- Overall SEO Score: 72/100
- Critical Issues:
  - No structured data / JSON-LD anywhere.
  - Web app manifest is incomplete and references missing icon files.
  - Heavy client-side animation/JS across primary marketing pages risks Core Web Vitals.
- High Priority:
  - Missing `og:image` and `twitter:image` on all pages.
  - Many title tags are too long or inconsistent.
  - Nested `<main>` landmarks across most pages.
  - Some case-study images have empty or weak alt text.
  - Production lint fails.
- Medium Priority:
  - Sitemap `lastModified` uses build time for every URL.
  - No breadcrumb schema.
  - No security/cache/header configuration.
  - No hreflang or `x-default`.
- Low Priority:
  - Copy typos weaken snippet quality.
  - Unused/default assets remain in `public`.
  - No analytics/Search Console verification detected.

---

## Critical Issues

### 1. Missing Structured Data

Severity: Critical

Location: Entire app

Problem: No `application/ld+json`, Schema.org, Organization, WebSite, WebPage, BreadcrumbList, Service, Article, CaseStudy-like Article, Person, or FAQ schema exists.

Impact: Lower eligibility for rich results, weaker entity understanding, weaker AI-search extraction.

Recommendation: Add JSON-LD at minimum for `Organization`, `WebSite`, page-level `WebPage`, `Service` on `/onboarding` and `/dashboards`, `BreadcrumbList`, `Person` on `/about-us`, and `Article`/`CreativeWork` for case studies.

### 2. Broken/Inadequate Manifest

Severity: Critical

Location: `public/site.webmanifest`, `app/layout.tsx`

Problem: Manifest has empty `name` and `short_name`, and references `/android-chrome-192x192.png` and `/android-chrome-512x512.png`, which are not present in `public`.

Impact: Broken PWA/browser metadata, poor mobile install/share signals.

Recommendation: Set real app name values and add the missing icons or remove those references.

### 3. Heavy Client-Side Rendering and Animation

Severity: Critical

Location: Most marketing components

Problem: Primary pages rely heavily on `"use client"`, GSAP, canvas, Recharts, sliders, Base UI, and animation effects. Build output shows large chunks up to ~397 KB JS and CSS ~178 KB.

Impact: LCP, INP, CPU time, hydration cost, and mobile rendering can hurt rankings through page experience.

Recommendation: Convert static marketing content to Server Components, isolate interactive widgets with dynamic import, defer non-critical animations, and honor reduced-motion.

---

## High Priority

### 1. Missing Social Preview Images

Severity: High

Location: `lib/seo.ts`, `app/layout.tsx`

Problem: `openGraph.images` and `twitter.images` are missing globally and per page. Twitter card is `summary_large_image` but no image is supplied.

Impact: Poor social previews and weaker discoverability when links are shared.

Recommendation: Add a default 1200x630 OG image and route-specific images for services/case studies.

### 2. Title Strategy Problems

Severity: High

Location: `lib/page-seo.ts`, `lib/seo.ts`, legal pages

Problem: `buildPageMetadata()` uses absolute titles, bypassing the root title template. Legal pages are just "Privacy Policy" / "Terms of Service" without brand. Several titles exceed ideal SERP length.

Impact: Truncated SERP titles, inconsistent brand presentation, lower CTR.

Recommendation: Use templated titles where appropriate and keep important terms within ~50-60 characters.

### 3. Nested Main Landmarks

Severity: High

Location: `app/layout.tsx` plus page views using `<main>`

Problem: Root layout wraps all content in `<main>`, while many page components also render `<main>`.

Impact: Invalid/unclear landmark structure for accessibility and crawlers.

Recommendation: Keep a single `<main>` in either the layout or each page, not both.

### 4. Case Study SEO Gap

Severity: High

Location: `lib/case-studies-data.js`, `lib/page-seo.ts`

Problem: Slug `balancing-minimalism-with-operational-utility` has no dedicated SEO entry, so it falls back to plain title/description.

Impact: Weaker SERP targeting for one indexed sitemap URL.

Recommendation: Add explicit title, description, canonical path, OG image, and schema for every case study.

### 5. Image Alt Issues

Severity: High

Location: `components/marketing/case-studies/case-study-detail-page-view.tsx`

Problem: Image blocks use `alt={block.title}`. Many data blocks have empty titles, producing empty alt text for meaningful UI screenshots.

Impact: Weaker image SEO and accessibility.

Recommendation: Add explicit alt/caption fields to case-study image data.

### 6. Lint Fails

Severity: High

Location: `components/layouts/header.tsx`, `components/marketing/dashboards/particle-head.tsx`, `types/three-shim.d.ts`

Problem: `npm run lint` fails with 7 errors.

Impact: Build quality risk and possible future deploy failure.

Recommendation: Fix React purity issues, `@ts-ignore`, `any`, empty interface, and header effect state update.

---

## Medium Priority

### Metadata Gaps

Severity: Medium

Location: `app/layout.tsx`, `lib/seo.ts`

Problem: Missing `theme-color`, Apple mobile web app metadata, authors/creator/publisher, category, and page-specific OG locale on child metadata. No alternate languages or `x-default`.

Impact: Smaller but meaningful snippet/platform quality gap.

Recommendation: Add global brand metadata and only use hreflang if localized versions exist.

### Sitemap Accuracy

Severity: Medium

Location: `app/sitemap.ts`

Problem: Every URL gets `lastModified = new Date()` at build time. Legal pages and old case studies should not appear freshly updated every build.

Impact: Crawlers may distrust update signals.

Recommendation: Store per-page `updatedAt` dates and use realistic `changeFrequency`/priority.

### Missing Breadcrumbs

Severity: Medium

Location: All marketing pages

Problem: Visual breadcrumbs are often plain spans, not semantic breadcrumb nav, and no BreadcrumbList schema exists.

Impact: Lower accessibility and rich result eligibility.

Recommendation: Use the existing `components/ui/breadcrumb.tsx` or semantic `<nav aria-label="Breadcrumb">`.

### Security/Header SEO

Severity: Medium

Location: `next.config.ts`

Problem: No `headers()` config for CSP, HSTS, Referrer-Policy, Permissions-Policy, X-Content-Type-Options, or caching rules.

Impact: Security and Lighthouse best-practice gaps.

Recommendation: Add production headers and cache static assets aggressively.

### Image/Asset Weight

Severity: Medium

Location: `public/`

Problem: Several SVGs are extremely large due embedded bitmaps, including `tech_buildings.svg` ~23 MB, `brokrage.svg` ~21 MB, `hospital.svg` ~13 MB.

Impact: Severe if referenced later; currently risky repo bloat and accidental LCP disaster.

Recommendation: Convert large illustrative SVGs to optimized WebP/AVIF or remove unused assets.

---

## Low Priority

### Copy Quality Issues

Severity: Low

Location: `lib/page-seo.ts`, content data

Problem: Copy typos: "spcailize", "hashbaord", "thier", "loosing", mojibake characters in source strings.

Impact: Lower trust and weaker snippet quality.

Recommendation: Proofread SEO metadata and page copy.

### Unused Remote Image Pattern

Severity: Low

Location: `next.config.ts`

Problem: Allows `images.unsplash.com` though no Unsplash images were detected.

Impact: Unnecessary remote image policy surface.

Recommendation: Remove unless planned.

### Canonical Environment Risk

Severity: Low

Location: `.env`, `lib/site-config.ts`

Problem: `NEXT_PUBLIC_SITE_URL` is not set; code falls back to `https://stickman.design`.

Impact: Fine in production if canonical domain is correct, risky in preview/staging.

Recommendation: Set explicit production env and consider preview-safe canonical policy.

---

## File-by-File Findings

### `app/layout.tsx`

- Strong base metadata with `metadataBase`, canonical, icons, manifest, robots, OpenGraph, and Twitter.
- Missing OG/Twitter images.
- Missing `theme-color`.
- Missing Apple mobile app metadata.
- Missing JSON-LD.
- Root layout wraps children in `<main>`, creating nested-main issues with page-level `<main>`.
- Manual `<head><style>` block for font CSS variables is probably unnecessary with `next/font` variables.
- Header is a client component on every page, increasing global hydration cost.

### `lib/seo.ts`

- Good shared canonical and metadata builder.
- Missing `openGraph.images`.
- Missing `twitter.images`.
- Missing author/creator/publisher fields.
- Does not allow per-page metadata type, robots override, alternates, or image overrides.
- Uses absolute page titles, bypassing root title template.

### `lib/page-seo.ts`

- Centralized page metadata is good.
- Several titles are too long for predictable SERP display.
- Typo in about page description: `spcailize`.
- Typo in banking case-study description: `hashbaord`.
- One case-study slug is missing: `balancing-minimalism-with-operational-utility`.

### `lib/site-config.ts`

- Sensible fallback URL.
- `.env` lacks `NEXT_PUBLIC_SITE_URL`, so production depends on fallback.
- Site description contains mojibake in source output for punctuation.

### `app/sitemap.ts`

- Includes home, service pages, case-study index, legal pages, and all case-study slugs.
- Uses build-time `new Date()` for every `lastModified`.
- Legal pages have high `priority: 0.8`, likely too high.
- Case studies have uniform update frequency despite static content.

### `app/robots.ts`

- Valid robots route.
- Allows all crawlable URLs.
- Points to sitemap.
- No parameter disallow rules, which is acceptable because no faceted/search routes were found.

### `public/site.webmanifest`

- Empty `name`.
- Empty `short_name`.
- References missing Android Chrome icons.
- Theme/background are set to white.

### `app/page.tsx`

- Uses shared metadata.
- Static page wrapper is good.
- All substantive page content is in mostly client components.

### `app/onboarding/layout.tsx`

- Provides metadata for `/onboarding`.
- Works, but metadata lives in route layout while the page itself is client-only.

### `app/onboarding/page.tsx`

- Entire route is a client component.
- Renders a nested `<main>`.
- Duplicates the older `components/marketing/onboarding/onboarding-page-view.tsx` concept.
- Good single H1.
- Breadcrumb is visual spans, not semantic breadcrumb navigation.

### `components/marketing/onboarding/onboarding-page-view.tsx`

- Appears unused by `app/onboarding/page.tsx`.
- Also renders nested `<main>` if used.
- Has a different H1/content than the actual onboarding page, risking content drift.

### `app/(marketing)/dashboards/page.tsx`

- Good static metadata.
- Page content is delegated to a client component.

### `components/marketing/dashboards/dashboards-page-view.tsx`

- Renders nested `<main>`.
- Good H1 and content depth.
- Breadcrumb is non-semantic.
- Depends on canvas animation and reused client components.

### `components/marketing/dashboards/warp-field.tsx`

- Decorative canvas lacks `aria-hidden`.
- Continuous animation can cost CPU.
- No reduced-motion handling.

### `components/marketing/dashboards/particle-head.tsx`

- Loads remote S3 OBJ file.
- Fails lint for `@ts-ignore`, `any`, and `Math.random()` purity.
- Potentially large/fragile third-party dependency for non-essential visual content.
- Not detected as used in current route, but remains high-risk if imported.

### `components/marketing/dashboards/focus-grid-section.tsx`

- Client component for mostly static content.
- Good H2/H3 hierarchy.
- Spotlight hover logic is fine visually, but could be server-rendered with progressive enhancement.

### `app/(marketing)/about-us/page.tsx`

- Good static metadata.
- Content delegated to client component.

### `components/marketing/about-us/about-us-page-view.tsx`

- Renders nested `<main>`.
- Good content depth for E-E-A-T.
- Uses wrapper divs with negative margins that could contribute to mobile layout instability.

### `components/marketing/about-us/about-us-hero.tsx`

- Client-only for dynamic time/weather cards.
- Fetches `open-meteo.com` client-side.
- Good H1 and business location signal.
- No Organization/Person schema.
- Live time/weather has little SEO value and increases client work.

### `components/marketing/about-us/founder-section.tsx`

- Strong founder/person E-E-A-T content.
- Image alt `Savio` is acceptable but could be more descriptive.
- Founder photo is marked `priority`, though it is not necessarily LCP.
- No Person schema.

### `components/marketing/about-us/philosophy-section.tsx`

- Good headings and supporting copy.
- Client-only for animation.
- Unused `handlePointerMove` lint warning.

### `app/(marketing)/case-studies/page.tsx`

- Good static metadata.
- Page content delegated to client component.

### `components/marketing/case-studies/case-studies-page-view.tsx`

- Renders nested `<main>`.
- Good H1 and internal links to every case study.
- Case-study cards are initially `opacity-0`; content exists in HTML, but visual reveal should account for no-JS/reduced-motion.
- Unused `index` lint warning.
- No collection/list schema.

### `app/(marketing)/case-studies/[slug]/page.tsx`

- Uses `generateStaticParams`.
- Uses `dynamicParams = false`.
- Good not-found handling for unknown slugs.
- Uses `generateMetadata`.
- Missing dedicated metadata for one slug.
- Dynamic metadata correctly resolves at build for static params.

### `components/marketing/case-studies/case-study-detail-page-view.tsx`

- Uses `<article>`, which is good.
- Good single H1 and H2 hierarchy.
- Breadcrumb nav exists, but no `aria-label="Breadcrumb"` and no schema.
- Hero image uses `priority`, appropriate for likely LCP.
- Content images use `alt={block.title}`, which is empty for many image blocks.
- Image captions often empty because source data is empty.
- No Article/CreativeWork schema.

### `lib/case-studies-data.js`

- Strong content depth across case studies.
- Contains typo `thier`.
- Contains mojibake in some punctuation.
- Several image blocks have empty `title`, `caption`, and `eyebrow`.
- Missing explicit `updatedAt`, `publishedAt`, `author`, and image alt fields.

### `app/(marketing)/privacy/page.tsx`

- Metadata exists.
- Title is generic and lacks brand.

### `components/marketing/legal/privacy-page-view.tsx`

- Renders nested `<main>`.
- Good legal/trust content.
- Contact section is commented out, weakening trust/contact signals.
- Breadcrumb is semantic enough for home link but not a breadcrumb nav.

### `app/(marketing)/terms/page.tsx`

- Metadata exists.
- Title is generic and lacks brand.

### `components/marketing/legal/terms-page-view.tsx`

- Renders nested `<main>`.
- Good legal/trust content.
- Contact details are commented out.
- Breadcrumb is not a breadcrumb nav.

### `app/not-found.tsx`

- Custom not-found route exists.
- No dedicated metadata for 404 page.

### `components/marketing/not-found/not-found-page-view.tsx`

- Renders nested `<main>`.
- Image is marked `priority`, acceptable for 404 but not SEO critical.
- Button has typo-like class `radius-[6px]`; visual issue more than SEO.

### `components/marketing/not-found/noise-animation.tsx`

- Client-only decorative animation.
- Should be `aria-hidden` where rendered.
- Not SEO critical except for page experience on 404.

### `components/layouts/header.tsx`

- Good crawlable nav links.
- Mobile bottom nav exposes Onboarding, Dashboards, Case Studies only; About Us is hidden behind menu.
- Uses two priority logo images, producing global preloads.
- Lint error for synchronous `setState` inside effect.
- External booking links use `rel="noreferrer"` but not `noopener`; modern browsers imply noopener for `_blank`, but explicit `noopener noreferrer` is clearer.

### `components/layouts/footer.tsx`

- Good footer internal links and legal links.
- Good external social links with accessible labels.
- Could support Organization schema `sameAs`.

### `components/marketing/home/home-page-view.tsx`

- Mostly static page composed of client components.
- No issue with section order.

### `components/marketing/home/hero.tsx`

- Client-only due GSAP and interactive components.
- Good H1.
- LCP may be text, but calculator and dot canvas increase main-thread work.
- Imports unused `Heading` and `Text`.

### `components/marketing/home/calculator.tsx`

- Client-only Recharts/slider widget above the fold.
- Production build emitted Recharts width/height warning.
- Potential LCP/INP risk.
- Labels are visible text, but slider accessibility depends on UI primitive behavior.

### `components/utility/interactive-dot-grid.tsx`

- Decorative canvas correctly has `aria-hidden="true"`.
- Continuous animation can cost CPU.
- No reduced-motion handling.

### `components/marketing/home/gap-section.tsx`

- Client-only for animation/interactive `BrokenBox`.
- Good H2.
- Text typo: "your users don't just get frustrated and they drift" should likely be revised.
- Decorative SVG is `aria-hidden`.

### `components/marketing/home/offer-section.tsx`

- Client-only for animation.
- Typo: `loosing` should be `losing`.
- Good H2/H3 hierarchy.

### `components/marketing/home/work-section.tsx`

- Client-only, GSAP pinned scroll section.
- Heavy animation and layout pinning can hurt INP/CLS.
- Good internal links to case studies.
- Card images have decent alt based on project title.
- Unused `i` lint warning.

### `components/marketing/home/contact-section.tsx`

- Client-only for animation.
- Good CTA copy and booking link.
- No visible email/contact address in this section.
- Unused `i` lint warning.

### `components/marketing/onboarding/focus-section.tsx`

- Client-only animation.
- Good H2/H3 hierarchy.
- Onboarding image alt texts are generic: "Onboarding Screen 1/2/3".
- Unused `handlePointerMove` lint warning.

### `components/marketing/onboarding/process-section.tsx`

- Client-only animation.
- Good H2/H3 hierarchy.
- Decorative arrow SVGs lack `aria-hidden`.

### `components/marketing/onboarding/fluid-background.tsx`

- Decorative canvas lacks `aria-hidden`.
- Continuous animation with many particles can hurt mobile CPU.
- No reduced-motion handling.

### `components/site/page-placeholder.tsx`

- Not detected as routed.
- If used later, has generic placeholder content and should be `noindex` until replaced.

### `components/ui/*`

- Mostly generic shadcn/Base UI primitives.
- No direct SEO issue unless imported into public routes.
- Several primitives are client components, so importing them into shared layout/pages increases hydration cost.

### `hooks/use-mobile.ts`

- Used for client-only responsive behavior in `BrokenBox`.
- No direct SEO issue.

### `next.config.ts`

- Minimal config.
- No security headers.
- No redirects/canonical host enforcement.
- No trailing-slash policy.
- Allows Unsplash remote images though unused.

### `package.json`

- Heavy visual dependencies: GSAP, Recharts, Three, React Three Fiber, Drei, Lenis, Base UI.
- No bundle analyzer script.
- No SEO/audit/test script.

### `app/globals.css`

- Includes Tailwind and shadcn CSS.
- Generated CSS bundle is sizable.
- No reduced-motion overrides for marquee/animations.
- Good stable `scrollbar-gutter`.

### `public/`

- Contains valid favicon and Apple touch icon.
- Missing Android manifest icons.
- Contains unused starter assets: `file.svg`, `window.svg`, `vercel.svg`, `next.svg`, likely safe but unnecessary.
- Several SVG assets are extremely large due embedded bitmap content.

---

## Quick Wins

- Add default `og:image` and `twitter:image`.
- Fix `public/site.webmanifest`.
- Add Organization + WebSite JSON-LD globally.
- Add BreadcrumbList JSON-LD to all public pages.
- Fix metadata typos and overlong titles.
- Add SEO entry for `balancing-minimalism-with-operational-utility`.
- Replace nested page `<main>` elements with `<div>`/`section`.
- Fix empty case-study image alts.
- Add `themeColor`/viewport-adjacent mobile metadata through the current Next metadata conventions.
- Add explicit `noopener noreferrer` to external `_blank` links.
- Add `aria-hidden` to decorative canvases and SVG arrows.
- Remove unused large/boilerplate public assets if not needed.

---

## Advanced Improvements

- Convert static marketing sections from Client Components to Server Components.
- Dynamically import calculators, canvas effects, GSAP sections, and 3D visuals.
- Add route-specific OG image generation with `opengraph-image.tsx`.
- Add per-page `updatedAt` content metadata for sitemap.
- Add FAQ sections and FAQ schema on service pages.
- Add security/cache headers in `next.config.ts`.
- Add canonical host redirects at the deployment/platform level.
- Build a small SEO test script to snapshot titles, descriptions, canonicals, schema, and sitemap coverage.
- Add bundle analysis and performance budgets.
- Add no-JS/reduced-motion safe defaults for reveal animations.

---

## Estimated SEO Impact

| Recommendation | Estimated Impact | Why |
| --- | --- | --- |
| Add structured data | High to Very High | Improves entity understanding, rich-result eligibility, and AI search extraction. |
| Add OG/Twitter images | Medium | Improves link sharing CTR and professional discovery surfaces. |
| Reduce client JS/animation | High | Improves Core Web Vitals, mobile UX, crawl rendering efficiency, and INP. |
| Fix manifest/icons/theme metadata | Medium | Improves mobile/browser quality and removes broken metadata. |
| Fix titles/descriptions | High | Improves SERP relevance and CTR. |
| Add breadcrumb semantics/schema | Medium | Improves accessibility and search result context. |
| Fix image alts | Medium | Improves accessibility, image SEO, and topical reinforcement. |
| Optimize large SVG assets | Medium to High | Prevents severe LCP regressions if assets are used and reduces repo/deploy bloat. |
| Add security/cache headers | Medium | Improves Lighthouse best practices and platform trust. |
| Fix lint errors | Medium | Improves maintainability and reduces deploy/future upgrade risk. |
| Clean copy typos | Low to Medium | Improves trust and snippet polish. |

---

## Validation Notes

- `next build` passed and statically prerendered all public routes.
- Public routes generated: `/`, `/_not-found`, `/about-us`, `/case-studies`, `/case-studies/[slug]`, `/dashboards`, `/onboarding`, `/privacy`, `/robots.txt`, `/sitemap.xml`, `/terms`.
- `npm run lint` failed with 7 errors and 7 warnings.
- Production build emitted a Recharts sizing warning from the home calculator.
- Generated HTML confirmed metadata is present in initial HTML.
- Generated HTML confirmed missing `og:image`, missing `twitter:image`, and nested `<main>` landmarks.
