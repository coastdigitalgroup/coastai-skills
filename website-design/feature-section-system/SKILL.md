---
name: feature-section-system
description:
  Design, structure, and compose product feature sections, feature grids, alternating
  zig-zag feature rows, interactive tabbed feature switchers, and sticky scroll feature
  showcases across marketing websites, SaaS landing pages, and product detail pages.
---

# Feature Section System

## Purpose

The Feature Section System provides a comprehensive methodology for designing, structuring, and composing product feature sections, feature grids, alternating (zig-zag) feature rows, interactive tabbed feature switchers, and sticky scroll feature showcases.

While atomic UI primitives (cards, buttons, icons, tabs) provide individual component styles, a complete feature section governs spatial rhythm, media-to-text visual hierarchy, narrative sequencing, responsive stacking behavior, focal point positioning, and keyboard/screen reader accessibility. Without a dedicated feature section system, product marketing pages frequently suffer from visual monotony, disjointed media-text alignments, layout shifts across screen sizes, mobile stacking order bugs, and inaccessible tabbed switchers.

This system establishes design principles, layout patterns, media aspect ratio constraints, typography hierarchy, responsive reflow rules, and WCAG 2.1 AA accessibility guidelines for high-impact feature presentations.

## Use Cases

- **SaaS Marketing & Product Landing Pages:** Demonstrating core software capabilities, workflows, automation triggers, and integration ecosystems.
- **E-Commerce Product Detail Pages (PDPs):** Highlighting key product specifications, craftsmanship details, materials, and usage scenarios.
- **B2B Solution & Platform Overview Pages:** Presenting multi-persona value propositions, enterprise platform architecture, security controls, and compliance tools.
- **Mobile App & Consumer Hardware Launch Pages:** Showcasing app screens, hardware interfaces, interactive device views, and key feature highlights.
- **Product Update & Feature Announcement Pages:** Explaining new product releases with visual walkthroughs, comparison callouts, and interactive preview tabs.

## When NOT to Use

- **Hero & Above-the-Fold Value Propositions:** For the initial primary page intro and main action block, use `hero-design-system`.
- **Pricing & Tier Comparisons:** For plan feature matrices, feature checkmarks, and pricing tiers, use `pricing-table-ui-system` or `comparison-matrix-system`.
- **Frequently Asked Questions:** For expandable Q&A lists and objection handling disclosures, use `faq-section-system`.
- **Social Proof & Customer Reviews:** For customer testimonials, quote carousels, and case study callouts, use `testimonial-and-quote-system`.
- **Overall Page Section Sequencing:** For macro section rhythm, background alternating patterns, and global page flow between header and footer, use `section-composition-system`.

## Inputs

1. **Feature Hierarchy & Copy Inventory:** Feature titles, subheadings, descriptive body paragraphs, key benefit bullet points, call-to-action triggers, and priority ranking.
2. **Media Assets & Aspect Ratios:** Product UI screenshots, vector illustrations, interactive app demos, animated webm/mp4 videos, device mockups, and icon sets.
3. **Target Persona & User Intent:** Primary customer persona goals, technical literacy, scanning behavior, and high-priority pain points.
4. **Layout & Grid Context:** Container max-width (`1200px`–`1400px`), grid column structure (12-column grid), and vertical spacing tokens from `fluid-spacing-system`.
5. **Brand & Color Palette Tokens:** Surface backgrounds, text hierarchy contrast tokens, brand accent colors, shadow elevations, and focus ring definitions from `accessible-color-system`.

## Outputs

1. **Feature Layout Composition Plan:** Blueprint selecting the optimal layout pattern (Alternating Zig-Zag, Multi-Column Card Grid, Tabbed Switcher, or Sticky Scroll Showcase) based on feature density and media availability.
2. **Responsive Reflow & Stacking Spec:** Specifications for grid collapsing, mobile media placement, flex direction adjustments, and touch interaction handling.
3. **Typography & Visual Hierarchy Blueprint:** Typography scale rules (`h2` section headers, `h3` feature titles, eyebrow badges, body copy line lengths, CTA links).
4. **Media Framing & Container Guidelines:** Aspect ratio constraints (`16:9`, `4:3`, `1:1`), border radius, subtle elevation shadows, and picture-in-picture/device mockup wrappers.
5. **Accessible Markup & ARIA Spec:** WCAG 2.1 AA compliant semantic HTML layout (`<section>`, `<h2>`, `<article>`), keyboard tab navigation (`role="tablist"`), and live region state announcements.

---

## Workflow

### 1. Select the Feature Layout Pattern

Evaluate feature content density, media asset type, and user intent to choose the optimal layout architecture:

```text
[ PATTERN A: ALTERNATING ZIG-ZAG ROWS ]
+-------------------------------------------------+
|  [Media Asset 16:9]   |  Eyebrow Badge          |
|                       |  Feature Title (H3)     |
|                       |  Body Copy Paragraph    |
|                       |  * Feature Bullet 1     |
|                       |  * Feature Bullet 2     |
+-----------------------+-------------------------+
|  Eyebrow Badge        |  [Media Asset 16:9]     |
|  Feature Title (H3)   |                         |
|  Body Copy Paragraph  |                         |
|  [Action Link ->]     |                         |
+-----------------------+-------------------------+

[ PATTERN B: 3-COLUMN FEATURE GRID ]
+-------------------+ +-------------------+ +-------------------+
| [Icon/Illustration| | [Icon/Illustration| | [Icon/Illustration|
| Title (H3)        | | Title (H3)        | | Title (H3)        |
| Description Text  | | Description Text  | | Description Text  |
+-------------------+ +-------------------+ +-------------------+

[ PATTERN C: TABBED FEATURE SWITCHER ]
+-------------------------------------------------+
|   [ Tab 1: Workflow ] [ Tab 2: Analytics ] [ Tab 3: Security ] |
+-------------------------------------------------+
|  Tab Panel (Active):                            |
|  +---------------------+ +--------------------+ |
|  | Text & Key Metrics  | | Active Media Demo  | |
|  +---------------------+ +--------------------+ |
+-------------------------------------------------+
```

- **Pattern A: Alternating Zig-Zag Rows (3–5 Deep Features):**
  - Best for storytelling and guiding users through sequential product capabilities.
  - Alternates text-left/media-right on row 1, media-left/text-right on row 2.
  - Keeps 1:1 or 5:6 column ratio (`50% / 50%` or `45% / 55%`).
- **Pattern B: Multi-Column Feature Grid (3–8 Secondary Features):**
  - Best for scanning multiple benefits or feature overview modules.
  - 3-column layout on desktop (`33.33%` each), collapsing to 2-column on tablet and 1-column on mobile.
  - Uses icons (`48px`–`64px`), concise titles (`h3`), and 2–3 line descriptions.
- **Pattern C: Tabbed Feature Switcher (Interactive Feature Hub):**
  - Best for complex SaaS products with multiple distinct workflows or persona views.
  - Horizontal tab track above a dynamic content panel. Switching tabs updates media, headline, bullet list, and CTA.
- **Pattern D: Sticky Scroll Feature Showcase (Deep Interactive Walkthrough):**
  - Best for desktop experience where text content scrolls smoothly while a media display remains pinned in place until all sub-features complete.

### 2. Establish Spatial Hierarchy & Typography Rules

Structure vertical rhythm and measure to maximize scannability:

- **Section Header Area:**
  - Eyebrow badge/label: Uppercase, tracking `0.05em`, font size `0.875rem` (14px), font weight `600`, brand accent color.
  - Main Section Title (`<h2>`): Font size `2.25rem`–`3rem` (36px–48px), font weight `700`, line height `1.2`.
  - Section Lead Subtitle: Font size `1.125rem`–`1.25rem` (18px–20px), text measure max `65ch`, centered or left-aligned matching title.
- **Feature Content Blocks:**
  - Feature Title (`<h3>`): Font size `1.5rem`–`1.875rem` (24px–30px), font weight `600`, line height `1.3`.
  - Paragraph Copy: Font size `1rem`–`1.125rem` (16px–18px), line height `1.6`, text measure max `55ch`.
  - Feature Bullet Lists: Styled with custom SVG checkmarks or micro-icons (`20px`), `gap: 0.75rem`, `margin-top: 1rem`.

### 3. Design Media Containers & Framing Rules

Ensure media assets fit harmoniously alongside text without causing Cumulative Layout Shift (CLS):

- **Aspect Ratio Locking:** Always enforce explicit aspect ratio containers (`aspect-ratio: 16 / 9`, `4 / 3`, or `1 / 1`) with `object-fit: cover` or `object-fit: contain`.
- **Surface Elevation & Mockup Framing:**
  - Application screenshots must be enclosed in dark/light browser window frames or neutral device mockups with `border-radius: 12px` and subtle ambient shadows (`box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)`).
  - Include 1px subtle border (`border: 1px solid var(--border-subtle)`) to prevent light screenshot edges from bleeding into white section backgrounds.
- **Video & Interactive Media Handling:**
  - Muted autoplay videos must include `playsinline`, `autoplay`, `muted`, `loop`, and feature accessible controls or pause toggles for users with `prefers-reduced-motion`.

### 4. Implement Responsive Stacking & Mobile Behavior

Prevent stacking bugs on smaller screens (`< 768px`):

- **Zig-Zag Mobile Order Correction:**
  - In alternating zig-zag layouts, naive CSS grid/flexbox causes mobile stacking to alternate incorrectly: `[Text 1 -> Media 1] -> [Media 2 -> Text 2]`. This results in two media items sitting back-to-back.
  - **Correction Rule:** On mobile, always stack text above media (or media above text) consistently across ALL rows using CSS Flexbox `flex-direction: column` or CSS Grid explicit row ordering:
    ```css
    @media (max-width: 767px) {
      .feature-row {
        display: flex;
        flex-direction: column; /* Text first, media second */
      }
      .feature-row--reverse {
        flex-direction: column; /* Ensure media doesn't precede text on row 2 */
      }
    }
    ```
- **Mobile Touch Targets & Tab Tracks:**
  - Tabbed switchers on mobile must convert to a horizontally scrollable pill bar (`overflow-x: auto; scroll-snap-type: x mandatory`) with touch targets measuring at least `48px` in height.

### 5. Program WCAG AA Accessibility & Keyboard Interactivity

Ensure feature sections are fully accessible to keyboard users and screen readers:

- **Semantic Document Outline:**
  - Section wrapper uses `<section aria-labelledby="feature-section-heading">`.
  - Main section heading uses `<h2>`, individual feature headings use `<h3>`.
- **Tabbed Switcher ARIA Pattern:**
  - Tab buttons container uses `role="tablist"` with `aria-label="Product feature tabs"`.
  - Individual tab triggers use `role="tab"`, `aria-selected="true|false"`, `aria-controls="tabpanel-id"`, and `id="tab-id"`.
  - Tab panels use `role="tabpanel"`, `id="tabpanel-id"`, `aria-labelledby="tab-id"`, and `tabindex="0"`.
- **Keyboard Navigation for Tabs:**
  - `ArrowLeft` / `ArrowRight`: Move focus between tabs in the tablist.
  - `Home` / `End`: Jump focus to first / last tab.
  - `Space` / `Enter`: Activate selected tab.
- **Focus Visible Styling:**
  - Interactive triggers, links, and tabs must feature a high-contrast focus ring (`outline: 2px solid var(--color-focus-ring); outline-offset: 2px`).

---

## Decision Rules

### Layout Architecture Selection Matrix

| Feature Volume & Type | Recommended Layout | Media Asset Type | Key Advantage |
| :--- | :--- | :--- | :--- |
| **3 – 5 Core Capabilities** | **Alternating Zig-Zag Rows** | 16:9 UI Screenshots / Demo Clips | High visual engagement, natural storytelling flow |
| **6 – 12 Overview Features** | **3-Column Feature Grid** | Vector Icons or 4:3 Mini Shots | Scannable, compact, ideal for overview pages |
| **3 – 6 Persona/Workflow Views** | **Tabbed Feature Switcher** | Dynamic App UI / Interactive Video | Saves vertical height, allows deep dive per workflow |
| **4 – 6 Sequential Steps** | **Sticky Scroll Showcase** | Desktop Interactive Canvas | Highly immersive desktop narrative presentation |

### Media-to-Text Ratio Matrix
- **50% / 50% Split:** Standard balance for feature rows with equal weight copy and visual proof.
- **40% Text / 60% Media:** Ideal for visual-first software, design tools, and data analytics dashboards where screenshot legibility is critical.
- **60% Text / 40% Media:** Ideal for enterprise compliance, security specs, and technical developer APIs where detailed bullet points and explanation copy take precedence.

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA):**
  - **SC 1.4.3 Contrast (Minimum):** All eyebrow labels, titles, body copy, and tab text must meet **4.5:1** contrast ratio (**3:1** for headings ≥24px).
  - **SC 2.1.1 Keyboard:** Tabbed switchers and action links must be 100% operable via keyboard.
  - **SC 2.2.2 Pause, Stop, Hide:** Any auto-playing background demo videos or animated GIFs longer than 5 seconds must include a visible play/pause button or respect `prefers-reduced-motion`.
  - **SC 2.5.8 Target Size:** Interactive tabs and CTA links must feature minimum touch targets of **48px × 48px**.
- **Responsive Fluid Spacing:**
  - Section vertical padding must scale dynamically using CSS `clamp()` (e.g., `padding-block: clamp(3rem, 6vw, 6rem)`).
  - Column gap between text and media must measure at least `2rem` (32px) on desktop to prevent visual clutter.
- **Line Length Measure:**
  - Paragraph body copy must remain within **45 to 65 characters per line** (`ch` units) to ensure optimal reading ergonomics.

---

## Common Failure Patterns

- **The Mobile Double-Media Stack:** Failing to override flex direction in zig-zag layouts on mobile, causing two screenshots to stack directly on top of each other without intervening text.
- **Unframed Low-Contrast Screenshots:** Placing white application screenshots directly on white section backgrounds without a border or shadow, causing UI elements to bleed into the page background.
- **Inaccessible Custom Tabs:** Building tabbed feature switchers out of `<div>` elements with `onclick` handlers, omitting `role="tablist"`, `aria-selected`, and keyboard arrow navigation.
- **Tiny Unreadable Screenshots:** Forcing detailed 1920x1080 desktop app screenshots into small 300px feature grid cards, rendering text inside the screenshot completely unreadable.
- **Layout Shift on Tab Switch:** Changing content length significantly across tabs without setting a min-height on the tab panel, causing the entire page layout to jump up and down as users switch tabs.
- **Missing Motion Safeguards:** Forcing complex auto-scrolling videos or parallax effects without checking `@media (prefers-reduced-motion: reduce)`.

---

## Validation Criteria

- [ ] Feature section uses a defined, deliberate layout pattern (Zig-Zag, Grid, Tabbed Switcher, or Sticky Showcase).
- [ ] Alternating zig-zag rows collapse on mobile with consistent text-first or media-first stacking order across all rows.
- [ ] Screenshots and media assets use explicit aspect ratio wrappers, subtle borders/shadows, and `alt` text descriptions.
- [ ] Tabbed feature switchers implement standard ARIA tablist/tab/tabpanel attributes and support keyboard arrow key navigation.
- [ ] All text copy satisfies WCAG AA contrast ratios (4.5:1 for body copy, 3:1 for large headers).
- [ ] Body copy line lengths are constrained to max 55–65 characters (`max-width: 55ch`–`65ch`).
- [ ] Reduced motion preference (`prefers-reduced-motion: reduce`) is respected for all animations and autoplaying videos.
