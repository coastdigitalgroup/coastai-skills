---
name: process-and-workflow-system
description:
  Design, structure, and layout-engineer "How It Works" sections, product onboarding flows,
  service implementation timelines, and operational workflow showcases with step badge taxonomies,
  directional connectors, responsive layout switching, and WCAG AA accessibility.
---

# Process & Workflow System

## Purpose

The Process & Workflow System provides a standardized engineering and design framework for structuring, visually orchestrating, and layout-engineering "How It Works" sections, step-by-step product onboarding flows, service implementation timelines, and operational workflow showcases across marketing landing pages, SaaS product tours, and e-commerce explainer modules.

While atomic form steppers (`stepper-and-wizard-system`) handle active multi-step transactional inputs, and historical activity logs (`timeline-activity-system`) track past chronological events, marketing and onboarding processes communicate **prospective, mental-model-building sequences**. Without a dedicated system for process visualization, "How It Works" sections frequently suffer from disconnected floating cards, broken horizontal-to-vertical mobile layouts, non-accessible directional connectors, vague step numbering, and poor scanning hierarchy.

This system establishes rules for layout compositions (linear horizontal steps, 2x2 grid flows, zigzag alternating cards, sticky-scroll split showcases), directional connector alignment, step badge visual hierarchy, synchronized interactive media previews, responsive viewport adaptation, and WCAG AA compliance.

## Use Cases

- **SaaS Marketing Landing Pages:** Explaining product mechanics (e.g., "1. Connect your repo -> 2. Configure environment -> 3. Deploy instantly") to build buyer confidence.
- **B2B Service Implementation Timelines:** Visualizing onboarding milestones (e.g., Kickoff -> Integration -> Training -> Go Live) for enterprise buyers during evaluation.
- **E-Commerce & Service Explainer Modules:** Clarifying complex rental, custom fabrication, subscription, or trade-in fulfillment workflows.
- **In-App Onboarding & Product Tours:** Guiding newly registered users through initial workspace setup, team invitation, and first key action.
- **Developer API & Architecture Data Flows:** Illustrating data ingest, processing pipeline, and output webhook workflows for technical audiences.

## When NOT to Use

- **Transactional Multi-Step Forms & Checkout Wizards:** For active user data entry requiring form inputs, step validation, and submission, use `stepper-and-wizard-system` or `step-progress-system`.
- **Chronological Audit & Activity Logs:** For historical user activity, past system events, or order shipment history, use `timeline-activity-system`.
- **Deep Hierarchical Navigation:** For nested directory trees or multi-level app navigation, use `tree-view-navigation-system` or `sidebar-navigation-system`.
- **Feature Feature Showcases Without Sequential Progression:** For non-sequential benefit highlights or un-numbered feature grids, use `section-composition-system` or `bento-grid-layout-system`.

## Inputs

1. **Process Sequence Inventory:** Ordered list of steps containing step number/ordinal, title, body description, primary action/CTA (optional), and supporting asset (icon, illustration, screenshot, or video).
2. **Page Context & Audience Intent:** High-level summary (3–4 steps on marketing homepages) vs. Detailed operational timeline (5–8 steps on enterprise solution pages).
3. **Media Format Strategy:** Static icon cards, static visual illustrations, synced video loops, or interactive step-triggered UI previews.
4. **Layout Surface & Width Constraints:** Full-bleed marketing section, 1200px max-width container, or inline dashboard panel.
5. **Design Tokens:** Color tokens (brand accent, muted border, surface cards), typography scale (`fluid-typography-system`), and spacing tokens (`fluid-spacing-system`).

## Outputs

1. **Spatial Layout Blueprint:** Responsive wireframe specification choosing between Horizontal Linear Ribbon, 2x2 Connected Grid, Alternating Zigzag, or Sticky-Scroll Split Showcase.
2. **Step Indicator & Connector Spec:** Precise alignment, sizing, and CSS/SVG rendering strategy for step badges (e.g., "01", "02", "Step 1") and directional connector lines/arrows.
3. **Synchronized Interactive State Specs:** Hover, focus, and click trigger rules connecting step descriptions with corresponding UI previews or animation frames.
4. **Responsive Stacking Blueprint:** Mobile viewport adaptation plan converting horizontal connectors into vertical stacked timeline markers.
5. **Accessible Markup Specification:** Semantic HTML structure (`<ol>`, `<li>`, `<time>`, `<picture>`) with WCAG AA compliant screen reader landmark labels, focus management, and contrast verification.

---

## Workflow

### 1. Classify Process Complexity & Select Layout Architecture

Evaluate step count, content density, and media requirements to select the appropriate layout pattern:

```text
[ PATTERN A: HORIZONTAL LINEAR RIBBON (3–4 Steps) ]
+-----------------------------------------------------------------------+
|  [01] Step Title      -------> [02] Step Title     -------> [03] Title |
|  Description text               Description text             Text     |
+-----------------------------------------------------------------------+

[ PATTERN B: STICKY-SCROLL SPLIT SHOWCASE (3–6 Complex Steps) ]
+------------------------------------+----------------------------------+
|  Sticky Left Column (UI Preview)   |  Scrolling Right Column (Steps)  |
|  +------------------------------+  |  [Step 01: Connect Workspace]    |
|  |                              |  |  Detailed description text...    |
|  | Dynamic UI Screen for Step 2 |  |                                  |
|  |                              |  |  [Step 02: Configure Pipeline]   |
|  +------------------------------+  |  Detailed description text...    |
+------------------------------------+----------------------------------+
```

- **Pattern A: Horizontal Linear Ribbon (3–4 Steps):**
  - Best for: High-level marketing homepages, quick 3-step value propositions.
  - Structure: Equal-width horizontal grid (3 or 4 columns) linked with horizontal directional connector lines between step cards.
- **Pattern B: 2x2 Connected Grid (4 Steps):**
  - Best for: Balanced 4-step workflows with rich card descriptions.
  - Structure: 2-column, 2-row layout with S-curve connector lines leading from Step 1 -> Step 2 -> Step 3 -> Step 4.
- **Pattern C: Alternating Zigzag Row Stack (4–6 Steps):**
  - Best for: Detailed solution pages where each step warrants a full graphic or screenshot.
  - Structure: Vertical stack of rows alternating between `[Text Left | Media Right]` and `[Media Left | Text Right]` linked by vertical central connector threads.
- **Pattern D: Sticky-Scroll Split Showcase (3–6 Complex Steps):**
  - Best for: B2B SaaS product tours with interactive app interface demos.
  - Structure: 2-column layout. Left column stays fixed (`position: sticky`) showing active step UI screenshots or video previews; Right column scrolls through numbered step description cards.

### 2. Design Step Indicators & Directional Connectors

Step indicators and connectors establish visual continuity and sequential momentum:

- **Step Badge Taxonomies:**
  - **Numeric Circle Badges:** 36px–48px circular badge with bold number (`01`, `02`, `03`) using brand accent background (`background-color: var(--color-primary); color: #ffffff`).
  - **Text Pill Badges:** Micro-pill (`padding: 4px 12px`, `font-size: 0.75rem`, `font-weight: 700`, `text-transform: uppercase`) labeled `STEP 01`.
  - **Iconic Node Badges:** Circular badge containing a contextual category icon, with a trailing small numeric tag.
- **Connector Line & Arrow Rules:**
  - **Desktop Connectors:** Horizontal lines (`height: 2px`) or dashed SVGs (`stroke-dasharray: 4 4`) positioned at the vertical center of the step badges.
  - **Arrowhead Indicators:** Place directional arrowheads (`→` or SVG path) at the end of connector lines pointing directly to the next step badge.
  - **Contrast & Visibility:** Connector lines must use a subtle, distinct stroke (`var(--color-border-strong)`) maintaining at least **3:1** contrast ratio against the section background.
  - **Decorative Hiding:** SVG connectors and purely decorative line elements must carry `aria-hidden="true"` so screen readers ignore non-semantic geometry.

### 3. Establish Typography & Spatial Rhythm

Enforce strict visual hierarchy to keep steps scannable and easy to process:

- **Section Header:** `h2` heading ("How It Works" or "Get Up and Running in Minutes") centered or left-aligned with a max measure of 30ch–45ch, paired with a subhead (`1.125rem`–`1.25rem`, line height 1.5).
- **Step Heading:** `h3` heading for each step (`1.25rem`–`1.5rem`, `font-weight: 600`) positioned immediately adjacent to or below the step badge.
- **Step Body Copy:** `1rem` (16px), line-height `1.6`, constrained to `35ch`–`50ch` line length for optimal readability.
- **Spacing Rhythm:**
  - Internal card padding: `1.5rem`–`2rem` (`padding: var(--space-lg)`).
  - Gap between horizontal steps: `1.5rem`–`2.5rem` (`gap: var(--space-xl)`).
  - Vertical section padding: `4rem`–`6rem` (`padding-block: var(--space-3xl)`).

### 4. Engineer Responsive Viewport Adaptation

Process layouts must transform gracefully across mobile viewports without horizontal overflow or misaligned connectors:

```text
[ DESKTOP HORIZONTAL ]              [ MOBILE VERTICAL STACK ]
[01] ---> [02] ---> [03]            [01] Step One Title
                                     |   Description text...
                                     v
                                    [02] Step Two Title
                                     |   Description text...
                                     v
                                    [03] Step Three Title
```

- **Breakpoint Rule (`< 768px`):**
  - Convert multi-column horizontal layouts (`grid-template-columns: repeat(3, 1fr)`) into a single-column vertical stack (`grid-template-columns: 1fr`).
  - Hide horizontal SVG connector lines (`display: none`).
  - Render a vertical connector thread down the left side of the stacked steps using a continuous `::before` pseudo-element or border (`border-left: 2px dashed var(--color-primary)`).
  - Align numeric badges to the top-left of each stacked step card.
- **Zigzag Stacking Adjustment:**
  - On mobile, ensure `grid-column` ordering places the step badge and text header FIRST, followed by the supporting graphic SECOND, preventing back-to-back graphics without text context.

### 5. Build WCAG AA Accessible Markup

Ensure full accessibility for keyboard navigators, screen reader users, and high-contrast display modes:

- **Semantic List Markup:**
  - Enclose step sequences in a semantic ordered list (`<ol class="process-flow">`) and list items (`<li class="process-flow__step">`). This causes screen readers to announce "List item 1 of 3", providing immediate structure.
- **Accessible Step Indicators:**
  ```html
  <ol class="process-flow">
    <li class="process-flow__item">
      <div class="process-flow__badge" aria-hidden="true">01</div>
      <div class="process-flow__content">
        <h3 class="process-flow__title">
          <span class="sr-only">Step 1: </span>Connect Your Data Source
        </h3>
        <p class="process-flow__description">
          Authorize your database or cloud storage with read-only API keys in seconds.
        </p>
      </div>
    </li>
  </ol>
  ```
- **Interactive Step Navigation (For Tabbed / Sticky Showcases):**
  - When steps act as interactive triggers to switch UI previews, wrap step headers in `<button type="button">` with `aria-controls="preview-panel-1"` and `aria-selected="true/false"`.
  - Support keyboard `ArrowDown` / `ArrowUp` or `Tab` navigation across interactive step triggers.
  - Maintain a visible `2px` focus ring (`outline: 2px solid var(--focus-ring); outline-offset: 4px`) on all interactive step triggers.

---

## Decision Rules

### Layout Architecture Selection Matrix

| Process Characteristic | Recommended Layout | Connector Style | Mobile Stacking Strategy |
| :--- | :--- | :--- | :--- |
| **3–4 Short Steps** (Homepage Overview) | **Horizontal Linear Ribbon** | Horizontal dashed line + arrow | Vertical left-bordered timeline stack |
| **4 Steps with Detailed Copy** | **2x2 Connected Grid** | Curved S-connector SVG | Single-column 1 -> 2 -> 3 -> 4 stack |
| **4–6 Steps with Screenshots** | **Alternating Zigzag Stack** | Central vertical thread | Media stacks directly below step text |
| **3–6 Interactive Product Steps** | **Sticky-Scroll Split Showcase** | Active step highlight ring | Accordion or tabbed preview cards |

### Media & Preview Strategy Matrix

- **Static Vector Icons:** Use when steps describe abstract concepts (e.g., "Analyze", "Optimize", "Scale").
- **Product Screenshots / Mockups:** Use when steps describe concrete software UI actions (e.g., "Select Template", "Publish").
- **Short Looping MP4 / WebM Videos:** Use when steps demonstrate continuous motion or complex interactions (e.g., drag-and-drop workflow builders).
- **Live Interactive Code / Canvas Demos:** Use on developer-focused landing pages where users can toggle code snippets per step.

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA Compliance):**
  - **SC 1.4.3 Contrast (Minimum):** Step titles, body copy, and step numbers must meet **4.5:1** contrast against step background cards. Connector lines must meet **3:1** contrast against section background.
  - **SC 1.3.1 Info and Relationships:** Step sequences MUST use semantic `<ol>` and `<li>` elements, or explicit `role="list"` / `role="listitem"` attributes.
  - **SC 2.4.7 Focus Visible:** Interactive step triggers must exhibit unclipped focus indicators (`outline-offset: 2px` or greater).
  - **SC 2.5.8 Target Size:** Clickable step buttons must measure at least **44x44px** (or minimum 24x24px with sufficient spacing).
- **Responsiveness & Layout Boundaries:**
  - Multi-column horizontal layouts MUST collapse to single-column at viewports `< 768px`.
  - Process sections MUST NOT produce horizontal body scrolling (`overflow-x: hidden` on viewport edge).
- **Typography Line Length:**
  - Step description copy must stay within **35 to 55 characters per line** (`ch` units) to ensure rapid scanning across step cards.

---

## Common Failure Patterns

- **Floating Disconnected Cards:** Placing numbered step cards side-by-side with no connector lines, arrows, or visual thread, failing to communicate sequential flow.
- **Broken Mobile Connectors:** Leaving horizontal connector lines or fixed absolute SVG arrows intact on mobile viewports, resulting in clipped lines skewering mobile text.
- **Non-Semantic Container (`<div>` Soup):** Rendering step 1, 2, 3 inside generic `<div>` blocks without an `<ol>` element, stripping screen reader users of sequence progress context ("Item 1 of 4").
- **Overcrowded Horizontal Ribbons:** Attempting to force 6 detailed steps into a single horizontal row on desktop, squishing text into unreadable 150px columns.
- **Low-Contrast Step Numbers:** Styling step numbers in pale gray (`#E2E8F0` on white) as decorative background watermarks that fail contrast minimums and confuse readers.
- **Unsynchronized Media States:** In interactive sticky-scroll showcases, failing to switch the visual preview when scrolling past a step or leaving off-screen steps active.

---

## Validation Criteria

- [ ] Process sequence is structured using semantic `<ol>` and `<li>` elements with accessible step labels.
- [ ] Step layout pattern matches step count (Horizontal Ribbon for 3–4, Zigzag or Sticky Split for 4–6).
- [ ] Directional connector lines/arrows visually connect sequential steps on desktop viewports.
- [ ] Responsive breakpoint (`< 768px`) gracefully converts horizontal connectors into a vertical left-bordered timeline stack.
- [ ] Step text copy length is constrained between 35ch and 55ch per step card for rapid scannability.
- [ ] Contrast ratio for step badges, text, and connector lines meets WCAG AA standards (4.5:1 for text, 3:1 for connectors).
- [ ] Interactive step triggers feature visible focus rings and keyboard arrow/tab navigation support.
- [ ] Media graphics (screenshots, icons, videos) maintain consistent aspect ratios across all step cards.
