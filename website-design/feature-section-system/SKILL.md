---
name: feature-section-system
description:
  Design, structure, and compose product feature sections, feature grids, alternating
  zigzag rows, interactive tabbed feature switchers, and sticky scroll feature showcases
  across marketing websites and product pages.
---

# Feature Section System

## Purpose

The Feature Section System establishes a systematic methodology for designing, structuring, and composing product feature presentations across marketing websites, SaaS landing pages, and product detail pages.

Feature sections communicate product value, functionality, and workflows to visitors. Without a structured design system, feature presentations frequently degrade into monotonous walls of text, repetitive card grids, misaligned screenshot mockups, broken mobile stacking orders, and inaccessible tabbed or scroll-driven interactions.

This system establishes rules for layout composition patterns (3-column/4-column icon grids, 2-column alternating zigzag rows, tabbed/accordion feature switchers, and sticky scroll-driven feature showcases), aspect ratio management for visual assets, typography scales, spacing rhythm, micro-CTA integration, responsive breakpoint transitions, and WCAG 2.1 AA accessibility.

## Use Cases

- **SaaS & B2B Product Landing Pages:** Highlighting core capabilities, platform integrations, workflow automation, and security features below the hero section.
- **E-Commerce Product Pages (PDP):** Demonstrating product construction, material technology, hardware specs, and lifestyle usage scenarios.
- **Mobile App & Consumer Marketing Sites:** Showcasing app screens, interactive feature previews, and key user benefits.
- **Platform Capability Overview Pages:** Organizing multi-tiered product suites into structured, scannable feature categories.
- **Feature Update & Product Launch Pages:** Spotlighting new platform additions with interactive visual previews and deep-dive documentation links.

## When NOT to Use

- **Hero Introductions:** For the primary top-of-page headline and CTA block, use `hero-design-system`.
- **Asymmetrical Bento Grids:** For heterogeneous content blocks (mixing metrics, quotes, illustrations, and bento cells), use `bento-grid-layout-system`.
- **Side-by-Side Product/Plan Comparisons:** For feature matrices comparing plan tiers or competitor specs, use `comparison-matrix-system` or `pricing-table-ui-system`.
- **Generic Article Cards / Blog Feeds:** For content marketing feeds and article listing grids, use `card-ui-system` or `article-layout-system`.
- **Sequential Onboarding Wizards:** For interactive multi-step input forms requiring state retention, use `stepper-and-wizard-system`.

## Inputs

1. **Feature Content Schema:** List of feature titles, subtext/descriptions, category tags, bullet points, and micro-CTA targets.
2. **Visual Asset Inventory:** Product screenshots, UI mocks, vector illustrations, lottie animations, or video loops with aspect ratios.
3. **Feature Density & Quantity:** Total number of features (e.g., 3 high-impact capabilities vs. 12 supporting utility features).
4. **Interactivity Level:** Static scannable layout vs. interactive switching (tabs, pill toggles, or scroll-pinned stages).
5. **Brand Surface & Design Tokens:** Background fills, accent colors, typography scales, container max-widths, and spacing variables.

## Outputs

1. **Feature Section Layout Blueprint:** Selected layout composition (3/4-Column Icon Grid, 2-Column Alternating Zigzag, Interactive Tabbed Switcher, or Sticky Scroll Showcase) with container width and vertical rhythm rules.
2. **Visual Media & Mock framing Spec:** Aspect ratio constraints (16:9, 4:3, 1:1), border treatment, glassmorphism/shadow depth, and device frame specifications.
3. **Typography & Content Hierarchy Spec:** Standardized font sizes, line heights, eyebrow tags, feature headings (`h2`/`h3`), supporting copy, and micro-CTA links.
4. **Responsive Stacking & Pivot Strategy:** Mobile breakpoint rules (`<768px`), image-first vs text-first stacking order, and touch-scroll fallback rules.
5. **Accessible Markup & ARIA Specification:** Semantic HTML structure, tablist/tabpanel ARIA attributes for interactive switchers, live regions, and screen reader announcements.

---

## Workflow

### 1. Select Layout Architecture Based on Feature Depth and Quantity
Evaluate feature content complexity and choose the optimal spatial layout pattern:

```text
[ PATTERN A: 3/4-COLUMN ICON FEATURE GRID ]
+-----------------------------------------------------------------+
|                         Section Header                          |
|  [Icon]                 [Icon]                 [Icon]           |
|  Feature Title          Feature Title          Feature Title    |
|  Short description.     Short description.     Short description|
+-----------------------------------------------------------------+

[ PATTERN B: 2-COLUMN ALTERNATING ZIGZAG ROWS ]
+-----------------------------------------------------------------+
|  [ Text & Bullet Points ]      [ Product Screenshot / Mock ]    |
|  Feature Heading H3                                             |
|                                                                 |
|  [ Product Screenshot / Mock ] [ Text & Bullet Points ]         |
|                                Feature Heading H3               |
+-----------------------------------------------------------------+

[ PATTERN C: INTERACTIVE TABBED FEATURE SWITCHER ]
+-----------------------------------------------------------------+
|  [ Tab 1: Automation ]  [ Tab 2: Analytics ]  [ Tab 3: Security]|
+-----------------------------------------------------------------+
|  Text Description & Bullets   |  Large Dynamic Media Preview    |
|  * Feature detail 1           |  (Updates on active tab switch) |
|  * Feature detail 2           |                                 |
+-----------------------------------------------------------------+
```

- **Pattern A: Icon & Text Grid (3–6 Supporting Features):**
  - Best for high-level benefit lists or supporting capabilities below a hero or main showcase.
  - Arranged in 3 columns (`repeat(3, 1fr)`) or 4 columns (`repeat(4, 1fr)`).
  - Each item consists of a 40px–48px icon/badge, `h3` heading (18px–20px), and 2–3 lines of body text.
- **Pattern B: Alternating 2-Column Zigzag Rows (2–4 Deep Features):**
  - Best for primary product capabilities requiring screenshot or video proof.
  - Row 1: Text Left (50%), Media Right (50%). Row 2: Media Left (50%), Text Right (50%).
  - Maintains visual balance down the page and prevents visual monomania.
- **Pattern C: Interactive Tabbed Switcher (3–5 Complex Sub-Features):**
  - Best when space is constrained or features share a central visual frame (e.g., dashboard preview).
  - Top or left navigation tabs trigger active panel updates showing corresponding copy and media.
- **Pattern D: Sticky Scroll Showcase (3–5 Story-Driven Stages):**
  - Best for immersive SaaS landing pages showcasing step-by-step workflow progression.
  - Left column scrolls through text blocks while right column remains sticky (`position: sticky; top: 100px`) and transitions images based on scroll position.

### 2. Establish Visual Asset Framing and Media Aspect Ratios
Prevent broken layouts, mismatched screenshot heights, and layout shifts (CLS):

- **Standard Aspect Ratios:**
  - **16:9 Landscape:** Standard for desktop app screenshots and dashboard previews.
  - **4:3 Classic:** Standard for focused UI component crops, forms, and cards.
  - **1:1 Square:** Best for mobile app screens or vector illustrations in 3-column grids.
- **Frame & Shadow Treatment:**
  - Enclose UI screenshots in subtle container frames: `border: 1px solid var(--color-border); border-radius: 12px; box-shadow: var(--shadow-lg)`.
  - Apply `object-fit: cover` or `object-fit: contain` with explicit `aspect-ratio` in CSS to prevent cumulative layout shift.
- **Dark Mode Surface Adaptation:**
  - Ensure screenshots match the active page theme or use a neutral browser container frame that maintains contrast in both light and dark modes.

### 3. Enforce Typography Hierarchy & Micro-CTA Links
Guide the reader's eye sequentially through section context, capability title, and detail:

- **Section Header:**
  - Category Eyebrow Tag: `12px`–`14px` uppercase tracking, primary accent color.
  - Section Main Heading (`h2`): `32px`–`44px` font size, bold weight (`700`), max 2 lines.
  - Section Subtitle: `18px`–`20px` body copy, muted text color, max measure `65ch`.
- **Feature Item Headings (`h3`):**
  - Font size: `20px`–`24px` (`1.25rem`–`1.5rem`), semi-bold weight (`600`).
- **Body Copy:**
  - Font size: `16px` (`1rem`), line height `1.6`, text color `var(--color-text-secondary)`.
- **Micro-CTA Links:**
  - Integrate inline action links below feature copy: `"Explore automation workflow →"`.
  - Must include explicit hover/focus underline transitions and minimum 4.5:1 contrast ratio.

### 4. Implement Responsive Breakpoint Adaptation
Ensure seamless transformation from multi-column desktop to single-column mobile viewports:

- **Desktop (`≥1024px`):** Full multi-column grid, alternating 2-column rows, or sticky scroll pinned panels.
- **Tablet (`768px – 1023px`):**
  - 3-column grids collapse to 2 columns.
  - Alternating 2-column rows maintain side-by-side or stack depending on screenshot complexity.
- **Mobile (`<768px`):**
  - All grids stack into a single vertical column (`grid-template-columns: 1fr`).
  - **Crucial Stacking Rule for Alternating Zigzag Rows:** On mobile, ensure the text description always appears **BEFORE** the image for every row, avoiding confusing double-image or double-text sequences.
  - Implement using CSS Grid order or Flexbox direction:
    ```css
    @media (max-width: 767px) {
      .feature-row {
        display: flex;
        flex-direction: column; /* Text (DOM order 1) precedes Media (DOM order 2) */
      }
    }
    ```
  - Interactive Tabbed Switchers convert into vertically stacked expandable accordions on mobile.

### 5. Program WCAG AA Accessibility & Keyboard Interaction
Guarantee full accessibility for keyboard users and screen reader assistive technology:

- **Tabbed Feature Switchers (`role="tablist"`):**
  - Use semantic `role="tablist"`, `role="tab"`, and `role="tabpanel"`.
  - Active tab: `aria-selected="true"`, `tabindex="0"`. Inactive tabs: `aria-selected="false"`, `tabindex="-1"`.
  - Associated panel: `role="tabpanel"`, `aria-labelledby="tab-id"`.
  - Keyboard Navigation: Arrow Keys (`Left`/`Right` or `Up`/`Down`) switch active tabs and move focus. `Home`/`End` navigate to first/last tab.
- **Sticky Scroll Showcases:**
  - Ensure all content in scrolling text blocks is completely readable without requiring mouse scroll gestures.
  - Do NOT lock screen scroll or trap focus; provide standard document scroll behavior.
  - Respect `prefers-reduced-motion` by disabling sticky pinned animation transitions and presenting clean stacked static panels instead.
- **Focus Ring Indicators:**
  - All interactive tab buttons, micro-CTA links, and expand triggers must feature visible focus rings meeting 3:1 contrast (`outline: 2px solid var(--focus-ring); outline-offset: 2px`).

---

## Decision Rules

### Feature Section Pattern Selection Matrix

| Feature Volume / Complexity | Primary Goal | Recommended Pattern | Mobile Behavior |
| :--- | :--- | :--- | :--- |
| **3 – 6 Short Capabilities** (Icons + 2 lines text) | Quick visual scanning of broad platform benefits | **Pattern A: Icon Grid (3 or 4 Col)** | Stack to 1 Column |
| **2 – 4 Deep Features** (Rich text + Screenshot proof) | In-depth demonstration of complex workflows | **Pattern B: Alternating Zigzag Rows** | Stack Text-First vertically |
| **3 – 5 Related Views** (One central visual dashboard) | Highlighting different facets of a single UI | **Pattern C: Tabbed Feature Switcher** | Convert to Accordion Stack |
| **3 – 5 Sequential Workflow Stages** | Immersive narrative storytelling down page | **Pattern D: Sticky Scroll Showcase** | Fallback to Stacked Rows |

### Aspect Ratio Selection Guide
- **Desktop Dashboard Screenshots:** Use `16:9` or `16:10` with subtle shadow and border radius.
- **Mobile App / Portrait Screenshots:** Use `9:16` or `4:5` aspect ratios in 3-column rows or centered frames.
- **Conceptual Vectors / Illustrations:** Use `1:1` square containers with neutral background fills.

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA):**
  - **SC 1.4.3 Contrast (Minimum):** All feature headings, body text, tab labels, and micro-CTA links must meet **4.5:1** contrast ratio against background surfaces.
  - **SC 2.1.1 Keyboard:** All tab switchers and micro-CTAs must be 100% operable via keyboard without mouse dependency.
  - **SC 2.4.7 Focus Visible:** Focus indicators must be clearly visible with at least 3:1 contrast against surrounding colors.
  - **SC 2.3.1 Three Flashes or Below:** Video or animated feature previews must not contain rapidly flashing elements.
  - **SC 2.2.2 Pause, Stop, Hide:** Autoplaying video loops or lottie feature animations must include a pause button or honor `prefers-reduced-motion`.
- **Responsive Layout Integrity:**
  - Must never produce horizontal scrollbars on mobile screens down to `320px` width.
  - Images must use `max-width: 100%; height: auto; aspect-ratio: ...` to prevent layout collapse before loading.
- **DOM Stacking Order Consistency:**
  - Alternating desktop rows MUST NOT result in Image-before-Text on mobile screens. Text explanation must always precede the visual asset on mobile views.

---

## Common Failure Patterns

- **Monotonous Card Wall:** Presenting 8 identical text-heavy cards in a grid without visual anchor points, visual proof, or hierarchy breaks.
- **Mobile Stacking Jumble:** Using `flex-direction: row-reverse` on desktop alternating rows without resetting to `column` on mobile, causing every second feature to show image first, text second on mobile screens.
- **Inaccessible Custom Switchers:** Building tabbed feature switchers with plain `<div>` elements and `onClick` handlers without proper `role="tablist"`, `aria-selected`, or arrow key keyboard navigation.
- **Broken Screenshot Aspect Ratios:** Stretching screenshots or allowing varying image heights across rows, causing jarring visual jumps during page scroll.
- **Tiny Low-Contrast Micro-CTAs:** Placing "Learn more" links in 12px light gray text without focus indicators, making them invisible and inaccessible.
- **Scroll-Trap Feature Scrollers:** Intercepting natural browser scrolling (scroll-jack) to force users through feature stages, frustrating visitors and breaking assistive navigation.

---

## Validation Criteria

- [ ] Feature section pattern (Icon Grid, Alternating Zigzag, Tabbed Switcher, or Sticky Scroll) matches content density and capability depth.
- [ ] Visual screenshots/illustrations use consistent aspect ratios and framing treatments (`border-radius`, `box-shadow`, `border`).
- [ ] Typography follows a clear hierarchy: Eyebrow tag, Section `h2`, Feature item `h3`, body text, and micro-CTA links.
- [ ] Micro-CTA links and interactive tab buttons meet WCAG AA contrast (≥4.5:1) and visible focus requirements (≥3:1).
- [ ] On mobile viewports (`<768px`), all alternating rows stack cleanly with text preceding media for every feature.
- [ ] Interactive tabbed feature switchers implement standard `role="tablist"`, `aria-selected"`, and keyboard arrow navigation.
- [ ] Autoplaying animated previews or lottie files respect `prefers-reduced-motion`.
