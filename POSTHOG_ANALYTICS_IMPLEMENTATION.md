# PostHog Analytics Implementation

This document is the implementation source of truth for frontend-only PostHog analytics on the Stickman Design static marketing website.

Scope: static marketing website only. There is no backend, authentication, API, or database instrumentation in this plan. All tracking is browser-side and anonymous unless a future form or explicit lead capture flow creates a consented identifier.

Primary references:

- Project routes and components inspected in `app/`, `components/marketing/`, `components/layouts/`, and `lib/case-studies-data.js`.
- PostHog Next.js docs: https://posthog.com/docs/libraries/next-js
- PostHog JavaScript SDK docs: https://posthog.com/docs/libraries/js
- PostHog capture events docs: https://posthog.com/docs/product-analytics/capture-events
- Local Next 16 docs inspected: `node_modules/next/dist/docs/01-app/02-guides/analytics.md`, `use-pathname.md`, and `use-search-params.md`.

## 1. Website Analytics Strategy

### Primary Business Goals

The website sells Stickman Design's UX services for SaaS onboarding and dashboard redesign. The primary business goal is to turn qualified visitors into booked calls through `https://cal.eu/savio`.

### Marketing Goals

- Understand which acquisition sources, campaigns, landing pages, and service pages create meaningful engagement.
- Identify which case studies attract visitors and which ones drive the strongest intent.
- Compare the positioning performance of onboarding services versus dashboard services.

### Conversion Goals

- Primary conversion: click `Book Your Free Call` leading to `https://cal.eu/savio`.
- Secondary conversion: click `mailto:shout@stickman.design`.
- Assisted conversions: visit service pages, view work cards, click case-study cards, reach the contact section, and return to the booking CTA after consuming proof.

### Engagement Goals

- Measure scroll depth and section visibility across every route.
- Measure interaction with visual/product storytelling elements: home calculator, gap animation, dashboard warp field, focus cards, work cards, mobile menu, and legal email links.
- Detect pages and sections where users disengage before seeing proof or conversion CTAs.

### Content Performance Goals

- Rank case studies by views, card clicks, scroll completion, and booking-assisted conversions.
- Rank service page sections by visibility and time in view.
- Identify which content types produce downstream CTA clicks: calculator, philosophy, focus cards, process cards, work cards, case-study detail sections.

### User Behavior Goals

- Understand user paths through home, service pages, case studies, about, legal pages, and 404 recovery.
- Segment visitors by source, device, landing page, engagement depth, case-study interest, and CTA intent.
- Use session recordings and heatmaps to diagnose low-performing landing pages and CTAs.

### Core KPIs

| KPI | Definition | Why It Matters |
| --- | --- | --- |
| Total Visitors | Count of distinct sessions or people, depending on dashboard context. | Measures top-of-funnel site reach. |
| Unique Visitors | Distinct anonymous PostHog persons. | Reduces inflation from repeat sessions. |
| Returning Visitors | Visitors with more than one session. | Indicates brand recall and consideration behavior. |
| Bounce Rate | Single-page sessions with low engagement and no meaningful interaction. | Reveals landing-page mismatch or weak first-screen relevance. |
| Average Session Duration | Time between `session_started` and `session_ended`, or PostHog session duration. | Measures depth of consideration. |
| Pages per Session | Number of `page_viewed` events per session. | Shows whether visitors explore proof and service pages. |
| CTA Click Rate | `cta_clicked` divided by `page_viewed` or section views. | Primary conversion intent metric. |
| Form Conversion Rate | Not currently applicable because no forms exist. Track if future forms are added. | Keeps future lead-capture performance measurable. |
| Scroll Completion Rate | Visitors reaching 90% or 100% page depth. | Indicates content consumption and page length quality. |
| Landing Page Performance | Page views, engaged sessions, CTA clicks, case-study clicks, exits by landing page. | Shows which entry pages convert traffic. |
| Exit Pages | Last page before session end. | Identifies drop-off surfaces. |
| Traffic Source Performance | Engagement and conversion by UTM, referrer, channel, and click IDs. | Shows which channels bring qualified visitors. |

Recommended north-star metric: qualified booking intent, measured by `cta_clicked` where `destination_host = "cal.eu"` and `cta_type = "primary_booking"`.

## 2. Event Naming Convention

Use lowercase `snake_case` event names. Prefer reusable behavioral names over visual implementation names.

PostHog recommends meaningful object-action style names such as `[object] [verb]`. For this codebase, use snake_case equivalents for consistency and query simplicity.

### Naming Rules

- Use `snake_case`: `cta_clicked`, not `CTA Clicked` or `clickCTA`.
- Use past-tense action names for completed actions: `page_viewed`, `section_viewed`, `card_clicked`.
- Keep names reusable across pages; differentiate with properties.
- Avoid UI-specific wording that may change, such as `black_button_clicked`; use `cta_clicked` with `cta_variant`.
- Reserve high-volume events for important behavior only.
- Track impressions with `*_viewed`; track actions with `*_clicked`, `*_opened`, `*_changed`, or `*_completed`.
- Do not track raw PII in event properties.

### Event Names For This Site

- `page_viewed`
- `session_started`
- `session_ended`
- `section_viewed`
- `section_time_spent`
- `scroll_depth_reached`
- `navigation_clicked`
- `logo_clicked`
- `mobile_menu_opened`
- `mobile_menu_closed`
- `cta_clicked`
- `button_clicked`
- `card_viewed`
- `card_clicked`
- `case_study_viewed`
- `case_study_card_clicked`
- `case_study_section_viewed`
- `calculator_viewed`
- `calculator_started`
- `calculator_input_changed`
- `calculator_completed`
- `tooltip_opened`
- `popover_opened`
- `interactive_visual_engaged`
- `email_clicked`
- `external_link_clicked`
- `social_link_clicked`
- `legal_link_clicked`
- `not_found_viewed`
- `not_found_recovery_clicked`
- `web_vital_reported`

Events that are not currently applicable because the site does not render these interactions:

- `form_viewed`
- **`form_started`**
- `field_focused`
- `field_completed`
- `form_validation_failed`
- `form_abandoned`
- `form_submitted`
- `video_started`
- `video_completed`
- `download_clicked`
- `accordion_opened`
- `tab_changed`
- `modal_opened`
- `carousel_changed`
- `search_performed`
- `filter_changed`
- `copy_clicked`
- `phone_clicked`
- `whatsapp_clicked`

Keep these reserved for future additions.

## 3. Global Event Properties

Every custom event should merge a shared global property object.

| Property | Source | Why It Exists |
| --- | --- | --- |
| `page` | Canonical page key, e.g. `home`, `dashboards`, `case_study_detail`. | Stable reporting across route changes and title changes. |
| `pathname` | `window.location.pathname` or `usePathname()`. | Route-level breakdown. |
| `url` | `window.location.href`. | Full landing and campaign context. |
| `page_title` | `document.title`. | Human-readable reporting. |
| `referrer` | `document.referrer`. | Source path or external referral. |
| `browser` | PostHog automatic property or parsed user agent. | Browser compatibility analysis. |
| `os` | PostHog automatic property or parsed user agent. | Platform analysis. |
| `device_type` | Derived from viewport/user agent: `desktop`, `tablet`, `mobile`. | Conversion and layout comparison. |
| `screen_resolution` | `${screen.width}x${screen.height}`. | Device quality and layout analysis. |
| `viewport` | `${window.innerWidth}x${window.innerHeight}`. | Responsive behavior analysis. |
| `language` | `navigator.language`. | Localization and audience insight. |
| `country` | PostHog geo property when available. | Market performance. |
| `city` | PostHog geo property when available. | Regional audience clustering. |
| `utm_source` | URL query param. | Campaign source attribution. |
| `utm_medium` | URL query param. | Channel type attribution. |
| `utm_campaign` | URL query param. | Campaign performance. |
| `utm_term` | URL query param. | Paid search keyword/ad-group reporting. |
| `utm_content` | URL query param. | Creative or CTA variant reporting. |
| `gclid` | URL query param. | Google Ads attribution. |
| `fbclid` | URL query param. | Meta click attribution. |
| `timestamp` | ISO string. | Debugging and export analysis. |
| `environment` | `process.env.NODE_ENV` plus optional `NEXT_PUBLIC_APP_ENV`. | Separates production from development. |
| `release_version` | `NEXT_PUBLIC_RELEASE_VERSION` or package/version/build SHA. | Regression analysis by release. |
| `scroll_percentage` | For scroll events and section events. | Content consumption context. |
| `session_id` | PostHog session ID if available. | Session-level joins. |
| `is_first_session` | PostHog or local first-seen marker. | New versus returning behavior. |
| `traffic_channel` | Derived from UTMs/referrer. | Executive-friendly channel reporting. |

Do not send names, emails, phone numbers, free-text messages, IP overrides, or any value captured from user text inputs unless consent and privacy review are added.

## 4. Page Tracking

Implement a client component mounted in `app/layout.tsx`, for example `components/analytics/page-tracker.tsx`, using `usePathname()` and `useSearchParams()`. Wrap it in `Suspense` because `useSearchParams()` can force client rendering in static routes in Next 16.

Use a custom `page_viewed` event in addition to PostHog's default `$pageview` only if the team wants clean custom taxonomy. If both are enabled, dashboards must choose one source of truth to avoid double counting.

### Page Inventory

| Route | Page Key | Title | Source File | Components | Tracking Requirements |
| --- | --- | --- | --- | --- | --- |
| `/` | `home` | Onboarding & Dashboard UX Design Agency | `app/page.tsx` | `HomePageView`, `Hero`, `GapSection`, `OfferSection`, `WorkSection`, `ContactSection` | Page view, hero CTA, case-study CTA, calculator, section views, scroll depth, exit, time spent. |
| `/onboarding` | `onboarding` | SaaS Onboarding UX Redesign | `app/onboarding/page.tsx` and `app/onboarding/layout.tsx` | `FluidBackground`, onboarding hero, `FocusSection`, `ProcessSection`, `WorkSection(category="Onboarding")`, `ContactSection` | Page view, visual engagement, section views, work-card clicks, booking CTA, scroll depth. |
| `/dashboards` | `dashboards` | SaaS Dashboard UX Redesign | `app/(marketing)/dashboards/page.tsx` | `DashboardsPageView`, `WarpField`, dashboard `FocusGridSection`, `ProcessSection`, `WorkSection(category="Dashboard")`, `ContactSection` | Page view, warp field interactions, focus-card hovers, work-card clicks, booking CTA, scroll depth. |
| `/case-studies` | `case_studies_index` | SaaS UX Case Studies | `app/(marketing)/case-studies/page.tsx` | `CaseStudiesPageView`, `CaseStudiesClient`, `ContactSection` | Page view, case-study card impressions/clicks, booking CTA, scroll depth. |
| `/case-studies/more-speed-for-the-logistics-titan` | `case_study_detail` | Logistics Onboarding UX Redesign Case Study | `app/(marketing)/case-studies/[slug]/page.tsx` | `CaseStudyDetailPageView` | Page view with slug/title/tags, breadcrumb clicks, section views, image views, scroll completion. |
| `/case-studies/onboarding-the-village` | `case_study_detail` | Medical Platform Onboarding UX Case Study | same dynamic route | same | Same as above. |
| `/case-studies/esg-compliance-fatigue` | `case_study_detail` | ESG Compliance Onboarding UX Case Study | same dynamic route | same | Same as above. |
| `/case-studies/digital-sme-bank-delays` | `case_study_detail` | SME Banking Dashboard UX Case Study | same dynamic route | same | Same as above. |
| `/case-studies/on-demand-realty-reality-check` | `case_study_detail` | PropTech Onboarding UX Redesign Case Study | same dynamic route | same | Same as above. |
| `/case-studies/germany-risk-dashboard` | `case_study_detail` | Risk Intelligence Dashboard UX Case Study | same dynamic route | same | Same as above. |
| `/case-studies/storm-response-dashboard-ux-redesign` | `case_study_detail` | Emergency Response Dashboard UX Case Study | same dynamic route | same | Same as above. |
| `/case-studies/balancing-minimalism-with-operational-utility` | `case_study_detail` | Industrial IoT Dashboard UX Case Study | same dynamic route | same | Same as above. |
| `/about-us` | `about_us` | About Stickman Design | `app/(marketing)/about-us/page.tsx` | `AboutUsHero`, `DynamicStatusCards`, `PhilosophySection`, `FounderSection`, `ContactSection` | Page view, status/philosophy/founder section views, booking CTA, scroll depth. |
| `/privacy` | `privacy` | Privacy Policy | `app/(marketing)/privacy/page.tsx` | `PrivacyPageView` | Page view, breadcrumb Home click, email click, scroll depth. |
| `/terms` | `terms` | Terms of Service | `app/(marketing)/terms/page.tsx` | `TermsPageView` | Page view, breadcrumb Home click, email click, scroll depth. |
| 404 | `not_found` | Not Found | `app/not-found.tsx` | `NotFoundPageView`, `NoiseAnimation` | `not_found_viewed`, recovery CTA click, scroll not required unless page becomes longer. |

For every page:

- Capture `page_viewed` on initial load and client-side route changes.
- Record `entry_source` from referrer and UTMs.
- Record `is_landing_page` when it is the first page in the session.
- Record `exit_page` using `visibilitychange`, `pagehide`, or `beforeunload` with a throttled `session_ended`.
- Record `time_spent_seconds` on page exit and route change.
- Record bounce when session ends with one page view and no meaningful interaction.
- Capture scroll depth at 25%, 50%, 75%, 90%, and 100%.
- Track section visibility using `IntersectionObserver`.

Example payload:

```json
{
  "event": "page_viewed",
  "properties": {
    "page": "dashboards",
    "pathname": "/dashboards",
    "page_title": "SaaS Dashboard UX Redesign | Stickman Design",
    "entry_source": "organic",
    "is_landing_page": true,
    "utm_source": "linkedin",
    "device_type": "desktop"
  }
}
```

## 5. Component-Level Tracking

### Global Header (`components/layouts/header.tsx`)

| Interaction | Event | Trigger | Properties | Why It Matters |
| --- | --- | --- | --- | --- |
| Desktop logo click | `logo_clicked` | Click logo link to `/` | `location: "header_desktop"`, `destination: "/"` | Measures brand-home navigation. |
| Mobile top logo click | `logo_clicked` | Click mobile logo | `location: "header_mobile_top"` | Measures mobile recovery to home. |
| Desktop nav click | `navigation_clicked` | Click Onboarding, Dashboards, Case Studies, About Us | `nav_location: "header_desktop"`, `nav_label`, `destination`, `is_active` | Shows primary path selection. |
| Desktop email click | `email_clicked` | Click Email mailto link | `nav_location: "header_desktop"`, `email: "shout@stickman.design"` | Secondary lead intent. |
| Desktop booking CTA | `cta_clicked` | Click `Book Your Free Call` | `cta_id: "header_desktop_book_call"`, `cta_type: "primary_booking"`, `destination: "https://cal.eu/savio"` | Top-of-page conversion intent. |
| Mobile marquee nav | `navigation_clicked` | Click bottom nav Onboarding, Dashboards, Case Studies | `nav_location: "mobile_bottom_marquee"`, `nav_label`, `destination` | Mobile route preference. |
| Mobile menu open | `mobile_menu_opened` | Sheet trigger click | `nav_location: "mobile_bottom"` | Mobile intent to see full navigation. |
| Mobile menu close | `mobile_menu_closed` | X close or link close | `method: "close_button" | "nav_click" | "cta_click"` | Menu usability and abandonment. |
| Mobile sheet nav click | `navigation_clicked` | Click sheet nav item | `nav_location: "mobile_sheet"`, `nav_label`, `destination` | Tracks hidden nav usage. |
| Mobile sheet booking CTA | `cta_clicked` | Click sheet booking CTA | `cta_id: "mobile_sheet_book_call"`, `cta_type: "primary_booking"` | Mobile conversion intent. |

Example:

```json
{
  "event": "navigation_clicked",
  "properties": {
    "page": "home",
    "nav_location": "header_desktop",
    "nav_label": "Dashboards",
    "destination": "/dashboards",
    "link_type": "internal"
  }
}
```

### Global Footer (`components/layouts/footer.tsx`)

Track footer logo, internal footer links, legal links, and social links.

- Event: `navigation_clicked` for Home, Onboarding, Dashboards, Case Studies, About Us.
- Event: `legal_link_clicked` for Privacy Policy and Terms of Use.
- Event: `social_link_clicked` for LinkedIn and YouTube.
- Event: `logo_clicked` for footer logo.

Properties: `nav_location: "footer_mobile" | "footer_desktop"`, `link_label`, `destination`, `link_type`, `social_network`.

### Home Hero (`components/marketing/home/hero.tsx`)

| Interaction | Event | Trigger | Properties | Why It Matters |
| --- | --- | --- | --- | --- |
| Hero visible | `section_viewed` | 50% of hero in viewport | `section_id: "home_hero"` | Baseline denominator for hero CTA rate. |
| Book call click | `cta_clicked` | Click hero primary CTA | `cta_id: "home_hero_book_call"`, `cta_type: "primary_booking"`, `position: "hero_primary"` | Primary home conversion. |
| See case studies click | `cta_clicked` | Click `See What We Made` | `cta_id: "home_hero_case_studies"`, `cta_type: "proof_navigation"`, `destination: "/case-studies"` | Proof-seeking behavior. |
| Dot grid engagement | `interactive_visual_engaged` | First pointer movement over hero grid per session | `visual_id: "home_hero_dot_grid"` | Measures whether visual treatment attracts interaction. |

### Calculator (`components/marketing/home/calculator.tsx`)

The calculator has three sliders: Monthly Sign-ups, Acquisition Cost (CAC), and Drop-off Rate. It has a desktop tooltip and mobile popover.

| Interaction | Event | Trigger | Properties | Why It Matters |
| --- | --- | --- | --- | --- |
| Calculator visible | `calculator_viewed` | 50% visible | `calculator_id: "cost_of_confusion"` | Denominator for calculator engagement. |
| First slider change | `calculator_started` | First `onValueChange` in session/page | `initial_users`, `initial_cac`, `initial_dropoff`, `initial_annual_loss` | Shows active interest in quantifying the problem. |
| Slider changed | `calculator_input_changed` | Debounced slider value change, max one event every 750ms per slider | `input_name`, `value`, `annual_loss`, `users`, `cac`, `dropoff` | Shows which assumptions visitors explore. |
| Calculator completed | `calculator_completed` | User changes at least two sliders or spends 10+ seconds interacting | `users`, `cac`, `dropoff`, `annual_loss`, `interaction_count` | Higher-intent engagement. |
| Info tooltip/popover | `tooltip_opened` or `popover_opened` | Tooltip hover/focus or mobile popover open | `content_id: "cost_of_confusion_info"` | Indicates desire to understand the model. |

Do not track every Recharts hover tooltip; that would create noisy events.

Example:

```json
{
  "event": "calculator_input_changed",
  "properties": {
    "page": "home",
    "calculator_id": "cost_of_confusion",
    "input_name": "dropoff_rate",
    "value": 42,
    "users": 1700,
    "cac": 120,
    "annual_loss": 1028160
  }
}
```

### Gap Section (`components/marketing/home/gap-section.tsx`)

- `section_viewed` for `home_gap`.
- `interactive_visual_engaged` for `broken_box` when desktop hover starts or mobile auto-animation first enters view. Properties: `interaction_type: "hover" | "touch" | "auto_in_view"`, `section_id: "home_gap"`.

### Offer Section (`components/marketing/home/offer-section.tsx`)

- `section_viewed` for `home_offer`.
- `card_viewed` for offer cards: Activation, Retention, Growth Partner.
- Optional `card_hovered` only if Product wants qualitative interest by service; throttle to one per card per page view.

### Work Section (`components/marketing/home/work-section.tsx`)

Used on:

- Home: 4 selected case studies.
- Onboarding page: all onboarding-tagged case studies.
- Dashboards page: all dashboard-tagged case studies.

Track:

- `section_viewed` with `section_id: "selected_work"`, `work_category: "Home" | "Onboarding" | "Dashboard"`.
- `card_viewed` for each `.project-card` when visible.
- `case_study_card_clicked` when a project card is clicked.
- `cta_clicked` for `View Case Studies`.
- `section_time_spent` for the pinned scroll section because it is a long interaction surface.

Example card click:

```json
{
  "event": "case_study_card_clicked",
  "properties": {
    "page": "onboarding",
    "component": "WorkSection",
    "section_id": "selected_work",
    "case_study_slug": "esg-compliance-fatigue",
    "case_study_title": "ESG Compliance Fatigue",
    "case_study_tags": ["Legal-Tech / Sustainability", "Onboarding"],
    "card_position": 3,
    "destination": "/case-studies/esg-compliance-fatigue"
  }
}
```

### Contact Section (`components/marketing/home/contact-section.tsx`)

Used on Home, Onboarding, Dashboards, Case Studies index, and About Us.

Track:

- `section_viewed` with `section_id: "contact"`.
- `cta_clicked` for `Book Your Free Call`.
- `card_viewed` or `section_viewed` for pill group only if the team wants to analyze message resonance; do not emit per-pill views by default because pills are non-clickable.

Example:

```json
{
  "event": "cta_clicked",
  "properties": {
    "page": "case_studies_index",
    "component": "ContactSection",
    "cta_id": "case_studies_contact_book_call",
    "cta_text": "Book Your Free Call",
    "cta_type": "primary_booking",
    "position": "bottom_contact",
    "destination": "https://cal.eu/savio"
  }
}
```

### Onboarding Page (`app/onboarding/page.tsx`)

This route currently defines its own page view instead of using `components/marketing/onboarding/onboarding-page-view.tsx`.

Track:

- `section_viewed`: `onboarding_hero`, `onboarding_focus`, `onboarding_process`, `selected_work`, `contact`.
- `interactive_visual_engaged`: `onboarding_fluid_background` only if future pointer events are enabled; current canvas is `pointer-events-none`, so visibility is enough.
- `card_viewed`: focus cards and process cards.
- Work-section events as above.
- Contact CTA as above.

### Dashboard Page (`components/marketing/dashboards/dashboards-page-view.tsx`)

Track:

- `section_viewed`: `dashboards_hero`, `dashboards_focus`, `dashboards_process`, `selected_work`, `contact`.
- `interactive_visual_engaged` for `WarpField` pointer down, drag, and wheel acceleration. Throttle to one event per interaction type per page view.
- `card_viewed` for focus cards and process cards.
- Work-section events as above.

Example:

```json
{
  "event": "interactive_visual_engaged",
  "properties": {
    "page": "dashboards",
    "component": "WarpField",
    "visual_id": "dashboard_warp_field",
    "interaction_type": "pointer_down"
  }
}
```

### Focus Cards

Onboarding focus cards in `components/marketing/onboarding/focus-section.tsx`:

- Greeting & Connection
- Value Reinforcement
- Guided Orientation
- Action-Driven Help
- Friction Mitigation

Dashboard focus cards in `components/marketing/dashboards/focus-grid-section.tsx`:

- Information Hierarchy
- Signal-Driven Alerts
- Intuitive Navigation
- System Feedback States
- Action Visibility
- Role Consistency

Track `card_viewed` for each card. Track `card_hovered` or `interactive_visual_engaged` only once per card if the team wants hover interest. Do not track every `onPointerMove`.

### Process Section (`components/marketing/onboarding/process-section.tsx`)

Used on Onboarding and Dashboards. Track:

- `section_viewed`.
- `card_viewed` for each step.
- `section_time_spent`.

Properties: `process_variant: "onboarding_default" | "dashboard"`, `step_number`, `step_title`.

### About Page Components

`AboutUsHero`:

- `section_viewed` for `about_hero`.
- `card_viewed` for `DynamicStatusCards` group.

`DynamicStatusCards`:

- Track card impressions only: Headquarters, Work Bandwidth.
- Do not track weather fetches. They are not user interactions and can introduce noisy or failure-biased analytics.

`PhilosophySection`:

- `section_viewed` for `about_philosophy`.
- `card_viewed` for the four philosophy cards.

`FounderSection`:

- `section_viewed` for `about_founder`.
- Optional `section_time_spent`.

### Case Studies Index (`components/marketing/case-studies/case-studies-page-view.tsx`)

Track:

- `section_viewed`: `case_studies_hero`, `case_studies_grid`, `contact`.
- `card_viewed` and `case_study_card_clicked` for all 8 case studies.
- `cta_clicked` for contact booking CTA.

### Case Study Detail (`components/marketing/case-studies/case-study-detail-page-view.tsx`)

Track:

- `case_study_viewed` on page load with slug, title, tags.
- `section_viewed` for header, hero image, and each content block.
- `case_study_section_viewed` with block index and block type.
- `navigation_clicked` for breadcrumb Home and Case Studies.
- `scroll_depth_reached`.
- `section_time_spent` for long-form content blocks.

### Legal Pages

`PrivacyPageView` and `TermsPageView`:

- `page_viewed`.
- `section_viewed` for each numbered legal section if legal/content engagement matters; otherwise page scroll depth is enough.
- `navigation_clicked` for breadcrumb Home.
- `email_clicked` for `mailto:shout@stickman.design`.

### 404 Page

`NotFoundPageView`:

- `not_found_viewed` with `attempted_pathname`.
- `not_found_recovery_clicked` when `Let's Go Home` is clicked.

## 6. Scroll Analytics

Track scroll depth at:

- 25%
- 50%
- 75%
- 90%
- 100%

Rules:

- Fire once per milestone per page view.
- Reset milestones on route change.
- Include `max_scroll_percentage`, `document_height`, and `viewport_height`.
- For short pages where document height is near viewport height, record `scrollable: false` and avoid synthetic 100% if it would distort analysis.

Section visibility:

- Use `IntersectionObserver`.
- Fire `section_viewed` when at least 50% of a section is visible for 500ms, or 25% for large sections taller than the viewport.
- Fire once per section per page view.
- Track `section_time_spent` with accumulated visible time when leaving the section, route changing, or page hiding.

Recommended section IDs:

| Page | Section IDs |
| --- | --- |
| Home | `home_hero`, `home_gap`, `home_offer`, `selected_work`, `contact` |
| Onboarding | `onboarding_hero`, `onboarding_focus`, `onboarding_process`, `selected_work`, `contact` |
| Dashboards | `dashboards_hero`, `dashboards_focus`, `dashboards_process`, `selected_work`, `contact` |
| Case Studies | `case_studies_hero`, `case_studies_grid`, `contact` |
| Case Study Detail | `case_study_header`, `case_study_hero_image`, `case_study_content_block` |
| About Us | `about_hero`, `about_status_cards`, `about_philosophy`, `about_founder`, `contact` |
| Privacy | `privacy_content`, `privacy_contact` |
| Terms | `terms_content`, `terms_contact` |

## 7. CTA Analytics

Use one event name: `cta_clicked`. Differentiate CTAs with `cta_id`, `cta_text`, `cta_type`, `component`, `page`, `destination`, and `position`.

### CTA Inventory

| CTA ID | Text | Component | Page(s) | Destination | CTA Type | Position |
| --- | --- | --- | --- | --- | --- | --- |
| `header_desktop_book_call` | Book Your Free Call | `Header` | All pages desktop | `https://cal.eu/savio` | `primary_booking` | `header_desktop` |
| `mobile_sheet_book_call` | Book Your Free Call | `Header` mobile sheet | All pages mobile | `https://cal.eu/savio` | `primary_booking` | `mobile_sheet` |
| `home_hero_book_call` | Book Your Free Call | `Hero` | `/` | `https://cal.eu/savio` | `primary_booking` | `hero_primary` |
| `home_hero_case_studies` | See What We Made | `Hero` | `/` | `/case-studies` | `proof_navigation` | `hero_secondary` |
| `work_view_case_studies` | View Case Studies | `WorkSection` | `/`, `/onboarding`, `/dashboards` | `/case-studies` | `proof_navigation` | `selected_work_bottom` |
| `{page}_contact_book_call` | Book Your Free Call | `ContactSection` | `/`, `/onboarding`, `/dashboards`, `/case-studies`, `/about-us` | `https://cal.eu/savio` | `primary_booking` | `bottom_contact` |
| `not_found_go_home` | Let's Go Home | `NotFoundPageView` | 404 | `/` | `recovery_navigation` | `404_center` |
| `privacy_email` | shout@stickman.design | `PrivacyPageView` | `/privacy` | `mailto:shout@stickman.design` | `email_contact` | `legal_contact` |
| `terms_email` | shout@stickman.design | `TermsPageView` | `/terms` | `mailto:shout@stickman.design` | `email_contact` | `legal_contact` |

Case-study cards are tracked with `case_study_card_clicked`, not `cta_clicked`, because they are content cards.

## 8. Navigation Analytics

Track these navigation surfaces:

- Header desktop links: Onboarding, Dashboards, Case Studies, About Us, Email.
- Header desktop logo.
- Header desktop booking CTA.
- Mobile top logo.
- Mobile bottom marquee links: Onboarding, Dashboards, Case Studies.
- Mobile hamburger menu open/close.
- Mobile sheet links: Onboarding, Dashboards, Case Studies, About Us, Email.
- Mobile sheet booking CTA.
- Footer logo.
- Footer links: Home, Onboarding, Dashboards, Case Studies, About Us.
- Footer legal links: Privacy Policy, Terms of Use.
- Footer social links: LinkedIn, YouTube.
- Breadcrumb links in case-study detail, legal pages, and 404 recovery.

Properties:

```json
{
  "nav_location": "header_desktop",
  "link_label": "Case Studies",
  "destination": "/case-studies",
  "link_type": "internal",
  "current_pathname": "/dashboards",
  "is_active": false
}
```

Classify links:

- `internal`: same-site routes.
- `external`: `https://cal.eu/savio`, LinkedIn, YouTube.
- `email`: `mailto:shout@stickman.design`.
- `legal`: privacy and terms.

## 9. Forms Analytics

No forms are currently rendered in the inspected app routes or marketing components. Do not implement form tracking now.

If a future form is added, implement:

- `form_viewed`
- `form_started`
- `field_focused`
- `field_completed`
- `validation_error`
- `form_abandoned`
- `form_submitted`
- `submission_success`

Required properties:

- `form_id`
- `form_name`
- `page`
- `field_name` for field-level events
- `validation_error_type` for errors
- `completion_time_seconds`
- `field_count`
- `completed_field_count`

Do not send field values, names, emails, phone numbers, or message content unless explicitly approved and minimized.

## 10. Conversion Funnels

### Funnel 1: Homepage Booking Intent

1. `page_viewed` where `page = "home"`
2. `section_viewed` where `section_id = "home_hero"`
3. `calculator_viewed` or `section_viewed` where `section_id = "home_gap"`
4. `cta_clicked` where `cta_type = "primary_booking"`

Breakdowns: device type, traffic channel, UTM campaign, new vs returning.

### Funnel 2: Proof-Seeking Journey

1. `page_viewed` where `page in ["home", "onboarding", "dashboards"]`
2. `cta_clicked` where `cta_type = "proof_navigation"` or `case_study_card_clicked`
3. `page_viewed` where `page = "case_studies_index"` or `page = "case_study_detail"`
4. `scroll_depth_reached` where `milestone >= 75`
5. `cta_clicked` where `cta_type = "primary_booking"`

### Funnel 3: Onboarding Service Intent

1. `page_viewed` where `page = "onboarding"`
2. `section_viewed` where `section_id = "onboarding_focus"`
3. `section_viewed` where `section_id = "selected_work"`
4. `case_study_card_clicked` where `case_study_tags` contains `Onboarding`
5. `cta_clicked` where `cta_type = "primary_booking"`

### Funnel 4: Dashboard Service Intent

1. `page_viewed` where `page = "dashboards"`
2. `interactive_visual_engaged` where `visual_id = "dashboard_warp_field"` or `section_viewed` where `section_id = "dashboards_focus"`
3. `section_viewed` where `section_id = "selected_work"`
4. `case_study_card_clicked` where `case_study_tags` contains `Dashboard`
5. `cta_clicked` where `cta_type = "primary_booking"`

### Funnel 5: Case Study to Booking

1. `case_study_viewed`
2. `case_study_section_viewed` where `block_subtitle` is `THE PROBLEM` or equivalent
3. `case_study_section_viewed` where `block_subtitle` is `THE RESULT` or equivalent
4. `cta_clicked` where `cta_type = "primary_booking"` in same or later session

### Funnel 6: Mobile Navigation to Conversion

1. `mobile_menu_opened` or `navigation_clicked` where `nav_location = "mobile_bottom_marquee"`
2. `navigation_clicked` where `link_type = "internal"`
3. `section_viewed` where `section_id = "contact"`
4. `cta_clicked` where `cta_type = "primary_booking"`

### Funnel 7: 404 Recovery

1. `not_found_viewed`
2. `not_found_recovery_clicked`
3. `page_viewed` where `page = "home"`
4. Any meaningful engagement event or `cta_clicked`

## 11. Dashboard Recommendations

### Executive Dashboard

- Metrics: unique visitors, sessions, booking CTA clicks, booking CTA rate, returning visitors, top landing pages.
- Charts: weekly trend line, source breakdown, device breakdown, top conversion pages table.
- Filters: production only, exclude internal traffic.
- Time windows: 7 days, 30 days, quarter.
- Breakdowns: traffic channel, page, device type.

### Marketing Dashboard

- Metrics: landing page conversion, source/medium/campaign performance, referrer performance, new vs returning.
- Charts: channel conversion funnel, UTM campaign table, top referrers, landing-to-CTA trend.
- Filters: campaign params, device type, geography.
- Time windows: campaign flight dates and 30 days.

### Content Dashboard

- Metrics: case-study views, case-study card clicks, scroll completion, section views, assisted CTA clicks.
- Charts: case-study leaderboard, content drop-off by block, card CTR table.
- Filters: tag (`Onboarding`, `Dashboard`), source, device.
- Time windows: 30 and 90 days.

### Conversion Dashboard

- Metrics: primary booking CTA clicks, CTA CTR by location, proof-navigation assisted conversion, email clicks.
- Charts: CTA inventory table, funnel drop-offs, path analysis to booking click.
- Filters: page, cta_type, device, traffic channel.
- Time windows: 7, 30, and 90 days.

### User Engagement Dashboard

- Metrics: average session duration, pages per session, scroll depth completion, section time, interactive visual engagement.
- Charts: scroll-depth distribution, section time heat table, engagement by device.
- Filters: page, returning visitor, source.
- Time windows: 30 days.

### Landing Page Dashboard

- Metrics: landing page sessions, bounce rate, CTA rate, scroll completion, exits.
- Charts: landing-page table, first interaction path, exit-page chart.
- Filters: landing page, source, device.
- Time windows: 30 days.

### CTA Performance Dashboard

- Metrics: impressions by section, clicks, CTR, downstream paths, external destination.
- Charts: CTA ID leaderboard, page/position matrix, mobile vs desktop CTA CTR.
- Filters: cta_type, page, component, device.
- Time windows: 7 and 30 days.

## 12. Content Performance

Track these content entities:

- Most viewed pages: `page_viewed`.
- Most viewed sections: `section_viewed`.
- Most viewed cards: `card_viewed`.
- Most clicked cards: `card_clicked` and `case_study_card_clicked`.
- Most viewed case studies: `case_study_viewed`.
- Most viewed case-study blocks: `case_study_section_viewed`.
- Most expanded FAQs: not applicable; no FAQ exists.
- Most watched videos: not applicable; no embedded videos exist.
- Top performing content: content that produces same-session or next-session `cta_clicked` where `cta_type = "primary_booking"`.

Recommended content properties:

- `content_type`: `section`, `card`, `case_study`, `case_study_block`, `visual`.
- `content_id`
- `content_title`
- `content_tags`
- `position`
- `page`
- `component`

## 13. Session Analytics

Use PostHog's session analytics and add lightweight custom session events only where useful.

Track:

- `session_started`: first page view in a session.
- `session_ended`: `pagehide` or last visibility change, with `session_duration_seconds`, `page_count`, `meaningful_interaction_count`, `max_scroll_percentage`.
- Pages per session: count `page_viewed` per PostHog session.
- Returning visitors: PostHog person/session properties.
- Deep sessions: sessions with 2+ pages or 75%+ scroll or any primary CTA click.
- Rage clicks: use PostHog autocapture/session recording where enabled; do not create custom rage-click logic unless PostHog defaults are insufficient.
- Dead clicks: use PostHog heatmaps/session recordings and optional custom click listener only for known interactive zones.
- Average engagement time: active visible time, excluding hidden tab time.

Meaningful interactions:

- `cta_clicked`
- `case_study_card_clicked`
- `calculator_started`
- `calculator_completed`
- `email_clicked`
- `social_link_clicked`
- `interactive_visual_engaged`
- `scroll_depth_reached` at 75% or greater

## 14. User Segmentation

Recommended cohorts:

- New visitors: first session only.
- Returning visitors: 2+ sessions.
- Organic traffic: search referrer or `utm_medium = organic`.
- Paid traffic: `gclid` present or `utm_medium in ["cpc", "paid", "paid_social"]`.
- Social traffic: LinkedIn, YouTube, X/Twitter, Instagram, Facebook referrers or UTMs.
- Direct traffic: no referrer and no UTMs.
- High engagement visitors: 75%+ scroll or 2+ pages or 60+ active seconds.
- Low engagement visitors: bounce or less than 10 seconds and no meaningful interaction.
- Visitors who reached contact: `section_viewed` where `section_id = "contact"`.
- Visitors who clicked CTAs: any `cta_clicked`.
- Visitors who clicked booking CTA: `cta_clicked` where `cta_type = "primary_booking"`.
- Visitors who clicked email: `email_clicked`.
- Visitors who reached case studies: page viewed case-study index or detail.
- Onboarding-intent visitors: viewed `/onboarding` or clicked onboarding-tagged case study.
- Dashboard-intent visitors: viewed `/dashboards` or clicked dashboard-tagged case study.
- Calculator-engaged visitors: `calculator_started` or `calculator_completed`.

## 15. Feature Flags

Useful future PostHog Feature Flags:

- `hero_headline_experiment`: alternate home headline/positioning.
- `hero_primary_cta_copy_experiment`: `Book Your Free Call` versus alternate intent copy.
- `show_calendar_cta_in_work_section`: add booking CTA after work cards.
- `contact_section_layout_experiment`: alternate contact copy/pill layout.
- `case_study_grid_order_experiment`: sort case studies by service tag, recency, or best proof.
- `onboarding_page_hero_variant`: alternate onboarding hero framing.
- `dashboards_page_hero_variant`: alternate dashboard hero framing.
- `calculator_default_values_experiment`: alternate default slider values.
- `mobile_nav_layout_experiment`: marquee bottom nav versus simpler icon/text nav.

Use descriptive flag names. Do not reuse experiment flags for permanent releases.

## 16. A/B Testing Opportunities

Recommended experiments:

- Home hero headline: clarity/problem-led versus outcome-led.
- CTA wording: `Book Your Free Call` versus `Find the Growth Blocker` or `Get a UX Review`.
- CTA placement: add secondary booking CTA after calculator or selected work.
- Hero secondary CTA: `See What We Made` versus `View Case Studies`.
- Calculator prominence: calculator visible in hero versus below hero.
- Service page section ordering: Focus before Process versus Process before Focus.
- Work-section card ordering: dashboard proof first versus onboarding proof first.
- Contact section copy: direct audit offer versus consultative "let's talk" copy.
- Case-study card ordering on `/case-studies`.
- Case-study detail proof density: result statement near top versus current narrative order.
- Mobile navigation: current marquee versus static bottom nav.
- Dashboard `WarpField` intensity: calmer animation versus current interactive warp field.

Primary success metric: `cta_clicked` where `cta_type = "primary_booking"`.

Secondary metrics: scroll completion, case-study clicks, section views, time spent, bounce rate.

## 17. Heatmap Recommendations

Enable PostHog heatmaps on:

- `/`: highest strategic landing page; evaluate hero CTA, calculator, and selected work clicks.
- `/onboarding`: service-page engagement and contact CTA visibility.
- `/dashboards`: service-page engagement, `WarpField`, focus cards, and contact CTA visibility.
- `/case-studies`: card click distribution and grid ordering.
- `/case-studies/[slug]`: long-form content scroll and image engagement; start with top 3 by traffic.
- `/about-us`: evaluate credibility content and contact CTA.
- Mobile views of all primary routes: current bottom navigation is distinctive and should be validated.

Do not prioritize heatmaps for `/privacy` or `/terms` except to validate legal email clicks.

## 18. Session Recording Recommendations

Enable session recordings for production traffic, with privacy controls:

- Mask text inputs by default, even though no forms currently exist.
- Mask or avoid capturing future PII fields.
- Sample at a controlled rate if traffic is high.
- Exclude internal IPs and development environment.
- Use URL targeting for `/`, `/onboarding`, `/dashboards`, `/case-studies`, and `/case-studies/*`.
- Keep recordings for UX diagnosis, not individual profiling.

Use recordings to inspect:

- Users who click booking CTA.
- Users who reach 75% scroll but do not click.
- Users who interact with the calculator but do not convert.
- Users who open mobile menu but abandon.
- Users who visit 404 and do not recover.

## 19. Event Taxonomy

| Event Name | Category | Page | Component | Trigger | Properties | Priority | Dashboard |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `page_viewed` | Page | All | Page tracker | Initial load and route change | `page`, `pathname`, `page_title`, `is_landing_page`, UTMs | P0 | Executive, Marketing |
| `session_started` | Session | All | Analytics provider | First event in session | `landing_page`, `traffic_channel`, UTMs | P0 | Executive |
| `session_ended` | Session | All | Analytics provider | Page hide/session timeout | `duration_seconds`, `page_count`, `max_scroll_percentage` | P1 | Engagement |
| `scroll_depth_reached` | Engagement | All scrollable | Scroll tracker | Milestone reached | `milestone`, `scroll_percentage`, `page` | P0 | Engagement, Landing |
| `section_viewed` | Engagement | All primary pages | Section tracker | Section visible | `section_id`, `section_title`, `component` | P0 | Content |
| `section_time_spent` | Engagement | All primary pages | Section tracker | Section exit/page exit | `section_id`, `visible_time_seconds` | P1 | Content, Engagement |
| `navigation_clicked` | Navigation | All | Header/Footer/Breadcrumb | Internal nav click | `nav_location`, `link_label`, `destination` | P0 | Marketing |
| `logo_clicked` | Navigation | All | Header/Footer | Logo click | `location`, `destination` | P2 | Engagement |
| `mobile_menu_opened` | Navigation | All mobile | Header | Sheet trigger | `nav_location` | P0 | Navigation |
| `mobile_menu_closed` | Navigation | All mobile | Header | Close/link click | `method` | P1 | Navigation |
| `cta_clicked` | Conversion | All conversion pages | Hero/Header/Contact/Work | CTA click | `cta_id`, `cta_type`, `cta_text`, `destination`, `position` | P0 | Conversion, CTA |
| `email_clicked` | Conversion | Header, legal | Header/Legal | `mailto:` click | `email`, `component`, `position` | P0 | Conversion |
| `external_link_clicked` | Navigation | All | Shared link wrapper | External link click | `destination`, `destination_host`, `link_label` | P1 | Marketing |
| `social_link_clicked` | Navigation | All | Footer | Social click | `social_network`, `destination` | P1 | Marketing |
| `legal_link_clicked` | Navigation | All | Footer | Privacy/terms click | `destination`, `link_label` | P2 | Engagement |
| `card_viewed` | Content | Service/About/Work/Case Studies | Cards | Card visible | `card_id`, `card_title`, `card_type`, `position` | P1 | Content |
| `card_clicked` | Content | Future generic cards | Cards | Card click | `card_id`, `destination` | P1 | Content |
| `case_study_viewed` | Content | Case detail | Case detail | Detail load | `case_study_slug`, `case_study_title`, `case_study_tags` | P0 | Content |
| `case_study_card_clicked` | Content | Home/Service/Case index | Work/Case grid | Case card click | `case_study_slug`, `case_study_tags`, `card_position` | P0 | Content, Conversion |
| `case_study_section_viewed` | Content | Case detail | Case detail block | Block visible | `block_index`, `block_type`, `block_title`, `block_subtitle` | P1 | Content |
| `calculator_viewed` | Engagement | Home | Calculator | Visible | `calculator_id` | P0 | Engagement |
| `calculator_started` | Engagement | Home | Calculator | First slider change | `initial_users`, `initial_cac`, `initial_dropoff` | P0 | Conversion |
| `calculator_input_changed` | Engagement | Home | Calculator | Debounced slider change | `input_name`, `value`, `annual_loss` | P1 | Engagement |
| `calculator_completed` | Engagement | Home | Calculator | Two sliders changed or 10s interaction | `users`, `cac`, `dropoff`, `annual_loss` | P0 | Conversion |
| `tooltip_opened` | Engagement | Home | Calculator | Desktop info tooltip opens | `content_id`, `component` | P2 | Engagement |
| `popover_opened` | Engagement | Home | Calculator | Mobile info popover opens | `content_id`, `component` | P2 | Engagement |
| `interactive_visual_engaged` | Engagement | Home/Onboarding/Dashboards | Canvas/visuals | First meaningful interaction | `visual_id`, `interaction_type` | P1 | Engagement |
| `not_found_viewed` | Error/Recovery | 404 | NotFoundPageView | 404 render | `attempted_pathname`, `referrer` | P0 | Landing |
| `not_found_recovery_clicked` | Error/Recovery | 404 | NotFoundPageView | Home CTA click | `destination` | P0 | Landing |
| `web_vital_reported` | Performance | All | Web vitals | Next web vital | `metric_name`, `value`, `rating`, `id` | P1 | Performance |

## 20. Analytics Folder Structure

Recommended structure:

```text
analytics/
  provider.tsx
  events.ts
  properties.ts
  capture.ts
  page-tracking.tsx
  scroll-tracking.tsx
  section-tracking.tsx
  hooks.ts
  link-tracking.tsx
  cta-registry.ts
  route-registry.ts
  content-registry.ts
  utils.ts
```

Responsibilities:

- `provider.tsx`: optional React wrapper if using `@posthog/react`; for `posthog-js` singleton only, keep provider minimal.
- `events.ts`: event name constants and TypeScript union types.
- `properties.ts`: global property builder and UTM parsing.
- `capture.ts`: single safe capture wrapper with environment guard, debug logging in development, and duplicate suppression.
- `page-tracking.tsx`: route-change tracking using `usePathname()` and `useSearchParams()`.
- `scroll-tracking.tsx`: scroll milestones and page max depth.
- `section-tracking.tsx`: reusable IntersectionObserver hook/component.
- `hooks.ts`: `useTrackSection`, `useTrackCTA`, `useTrackLink`, `useTrackCalculator`.
- `link-tracking.tsx`: `TrackedLink` wrapper around Next `Link` and normal `a`.
- `cta-registry.ts`: canonical CTA IDs and metadata.
- `route-registry.ts`: page keys, titles, static routes, dynamic case-study route mapping.
- `content-registry.ts`: section IDs, card IDs, and case-study metadata mapping.
- `utils.ts`: device type, channel derivation, throttle/debounce, session helpers.

## 21. Code-Level Recommendations

### PostHog Initialization

Install:

```bash
pnpm add posthog-js
```

Create `instrumentation-client.ts` in the project root, as recommended by current PostHog and Next docs:

```ts
import posthog from "posthog-js";

if (
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: "2026-05-30",
    capture_pageview: false,
    autocapture: true,
    person_profiles: "identified_only",
    loaded: (posthogInstance) => {
      if (process.env.NODE_ENV === "development") {
        posthogInstance.debug();
      }
    },
  });
}
```

Notes:

- Use `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST`.
- Keep `capture_pageview: false` if implementing custom `page_viewed`. If the team prefers PostHog's `$pageview`, keep it enabled and do not also count `page_viewed` for page metrics.
- Because the site has no auth, do not call `posthog.identify()`.
- Keep anonymous PostHog distinct IDs.
- Consider a reverse proxy in the future if tracking blockers materially reduce coverage, but do not add backend tracking for this static site.

### App Layout Integration

In `app/layout.tsx`, add:

- `AnalyticsProvider` or a minimal analytics root component inside `<TooltipProvider>`.
- `PageTracker` wrapped in `Suspense`.
- `ScrollTracker`.
- Optional `WebVitals` client component using `useReportWebVitals`.

### Shared Capture Wrapper

All components should call a shared helper:

```ts
capture("cta_clicked", {
  cta_id: "home_hero_book_call",
  cta_text: "Book Your Free Call",
  cta_type: "primary_booking",
  component: "Hero",
  position: "hero_primary",
  destination: "https://cal.eu/savio",
});
```

The wrapper should:

- Merge global properties.
- Ignore captures when PostHog is not initialized.
- Avoid duplicate page views caused by React Strict Mode in development.
- Support `oncePerPageView` keys for section impressions and scroll milestones.
- Throttle high-frequency inputs and pointer interactions.

### Reusable Tracking Components

Use wrappers rather than adding ad hoc `posthog.capture()` everywhere:

- `TrackedLink` for navigation, footer, social, email, legal, and CTA links.
- `TrackedCTA` if a CTA is not a link.
- `TrackSection` wrapper or `useTrackSection(ref, metadata)`.
- `useTrackScrollDepth({ milestones: [25, 50, 75, 90, 100] })`.
- `useTrackCalculator` for debounced slider analytics.

### Avoid Duplicate Events

- Fire `page_viewed` once per unique `(pathname, search)` change.
- Fire scroll milestones once per page view.
- Fire `section_viewed` once per section per page view.
- Fire `card_viewed` once per card per page view.
- Debounce slider changes.
- Track only first pointer engagement per visual per page view.
- Disable either default `$pageview` or custom `page_viewed` as the primary metric.

### Avoid Event Spam

- Do not capture every pointer move in `GlowCard`, `WarpField`, `InteractiveDotGrid`, or `FluidBackground`.
- Do not capture animation ticks, canvas draw loops, GSAP animation starts, or weather fetch refreshes.
- Do not capture Recharts tooltip hovers.
- Do not capture non-clickable pill views individually unless there is a specific dashboard requirement.

### Maintainability

- Keep event names in `analytics/events.ts`.
- Keep CTA metadata in `analytics/cta-registry.ts`.
- Keep route and section metadata in registries so dashboards stay stable after copy changes.
- Add a short analytics checklist to PR review for any new page, CTA, or interactive component.
- Validate events in PostHog Live Events before merging production instrumentation.

## 22. Implementation Roadmap

### Phase 1: Core Setup

- Add `posthog-js`.
- Add `instrumentation-client.ts`.
- Add analytics folder and capture wrapper.
- Add page tracking.
- Add global property builder and UTM persistence.
- Instrument Header, Footer, all booking CTAs, email links, and social links.
- Add scroll-depth tracking.

### Phase 2: Component Analytics

- Add section tracking to all page sections.
- Instrument Home calculator.
- Instrument WorkSection case-study cards.
- Instrument Case Studies index cards.
- Instrument case-study detail section visibility.
- Instrument mobile menu open/close.
- Instrument interactive visuals with throttled first-engagement events.

### Phase 3: Funnels And Dashboards

- Build dashboards listed in section 11.
- Build funnels listed in section 10.
- Create cohorts listed in section 14.
- Enable heatmaps for priority pages.
- Enable privacy-safe session recordings.
- Validate conversion attribution and remove duplicate/noisy events.

### Phase 4: Experiments And Advanced Insights

- Add feature flags for approved experiments.
- Run A/B tests for hero copy, CTA copy, case-study ordering, and mobile nav.
- Add performance analytics via `useReportWebVitals`.
- Analyze recordings for high-scroll/no-click sessions and calculator/no-booking sessions.
- Use insights to adjust content, CTA placement, and route ordering.

## 23. Final Coverage Checklist

- [x] Every current page has a page tracking plan.
- [x] Every current route is listed, including dynamic case studies and 404.
- [x] Every primary section has a `section_viewed` plan.
- [x] Every current CTA is inventoried.
- [x] Every current button-like conversion action is covered.
- [x] Every current clickable card is covered.
- [x] Every global navigation element is covered.
- [x] Header desktop navigation is covered.
- [x] Header mobile bottom navigation is covered.
- [x] Header mobile sheet open/close and links are covered.
- [x] Footer navigation, legal links, and social links are covered.
- [x] Breadcrumb links are covered.
- [x] Calculator interactions are covered.
- [x] Interactive canvas/visual behavior is covered without event spam.
- [x] Case-study index cards are covered.
- [x] Case-study detail content blocks are covered.
- [x] Legal email links are covered.
- [x] 404 recovery is covered.
- [x] Scroll behavior is covered.
- [x] Section time-spent tracking is covered.
- [x] Session recordings are recommended with privacy controls.
- [x] Heatmaps are recommended for priority pages.
- [x] Funnels are defined for important journeys.
- [x] Dashboards are defined for business functions.
- [x] User cohorts are defined.
- [x] Feature flag opportunities are defined.
- [x] A/B testing opportunities are defined.
- [x] Forms are explicitly marked not applicable because none exist.
- [x] Accordions are explicitly marked not applicable because none are rendered.
- [x] Tabs are explicitly marked not applicable because none are rendered.
- [x] Modals are explicitly marked not applicable; the mobile sheet is covered as mobile navigation.
- [x] Carousels are explicitly marked not applicable because none are rendered.
- [x] Search and filters are explicitly marked not applicable because none exist.
- [x] Downloads are explicitly marked not applicable because none exist.
- [x] Videos are explicitly marked not applicable because none are embedded.
- [x] Phone and WhatsApp clicks are explicitly marked not applicable because none exist.

