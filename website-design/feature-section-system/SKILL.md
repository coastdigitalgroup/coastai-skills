---
name: feature-section-system
description:
  Design and structure product feature sections, feature grids, alternating
  zigzag feature rows, interactive tabbed feature switchers, and sticky scroll
  feature showcases across marketing websites, SaaS landing pages, and product
  pages.
---

# Feature Section System

## Purpose

The Feature Section System provides a systematic methodology for designing, structuring, and composing product feature sections, feature grids, alternating (zigzag) feature rows, interactive tabbed feature switchers, and sticky scroll feature showcases across marketing websites, SaaS landing pages, and product detail pages.

While basic cards and individual layout primitives handle atomic content containers, feature sections address higher-level spatial composition, visual storytelling rhythm, media-to-text alignment, progressive feature disclosures, and responsive mobile stacking. Without a structured design system, feature sections frequently suffer from visual monotony, unbalanced media scaling, poor contrast overlays, broken mobile stacking order (e.g., consecutive stacked images without text separation), and inaccessible interactive tabs or scroll triggers.

This system defines rules for layout composition patterns (Zigzag alternating rows, 3/4-column feature card grids, interactive tabbed feature switchers, and sticky scroll showcases), spatial rhythm and vertical padding scales, visual asset containment vs. bleeding, interactive state transitions, and WCAG 2.1 AA accessibility standards.

## Use Cases

- **SaaS & Software Product Landing Pages:** Demonstrating core software capabilities, UI workflows, analytics dashboards, and automation tools with high-impact visual media.
- **E-Commerce Product Detail Pages (PDP):** Showcasing product engineering, material craftsmanship, modular accessories, and utility highlights below the primary purchase buy-box.
- **B2B Enterprise Solution Pages:** Structuring complex technical capabilities, security frameworks, compliance certifications, and integration ecosystems for buying committees.
- **Mobile App & Consumer Hardware Landing Pages:** Highlighting hardware specs, app interfaces, user experience interactions, and key feature differentiators.

## When NOT to Use

- **Above-the-Fold Intro Sections:** For the main page title, primary CTA, and introductory media, use `hero-design-system`.
- **Asymmetrical High-Density Metric Dashboards:** For irregular multi-metric visual blocks mixing charts, quotes, and badges, use `bento-grid-layout-system`.
- **Repeating Uniform Content Cards:** For uniform repeating listings (e.g., blog post archives or product category grids), use `card-ui-system` or `responsive-grid-system`.
- **Linear Step-by-Step Onboarding:** For strictly sequential, ordered workflows ("Step 1, Step 2, Step 3"), use `process-and-workflow-system` or `stepper-and-wizard-system`.
- **Objection-Handling FAQs:** For collapsible question-and-answer accordions, use `faq-section-system`.

## Inputs

1. **Feature Hierarchy & Inventory:** List of features classified by priority (Primary Flagship Features vs. Secondary Supporting Features).
2. **Visual Asset Taxonomy:** Product screenshots, UI illustrations, interactive canvas demos, MP4 video loops, or vector icons.
3. **Section Narrative & Content:** Feature eyebrow tags, H2/H3 headlines, concise descriptive body copy (max 60ch), and bulleted feature highlights or inline CTAs.
4. **Layout Pattern Selection:** Zigzag alternating rows, 3-column feature grid, interactive tabbed switcher, or sticky scroll showcase.
5. **Brand Surface & Spacing Tokens:** Design system tokens for fluid vertical padding, color themes (light/dark/accent surfaces), typography scales, and focus rings.

## Outputs

1. **Spatial Layout & Composition Blueprint:** Precise specifications for grid geometry, column proportions (e.g., 50/50 split or 60/40 visual bias), gutters, and vertical rhythm.
2. **Media Containment & Aspect Ratio Spec:** Rules for visual frame borders, aspect ratio locks (16:9, 16:10, 4:3), drop-shadow elevation, and border radii.
3. **Interactive Tab & State Spec:** Keyboard-navigable ARIA tablist or sticky scroll trigger behaviors for interactive feature switchers.
4. **Responsive Mobile Stacking Order:** Explicit DOM and flexbox order rules ensuring consistent visual media-to-text rhythm on small screens.
5. **Accessible Markup & ARIA Specification:** WCAG 2.1 AA compliant semantics (`<section>`, `<h2>`, `<div role="tablist">`, `aria-selected`) with focus ring metrics.

---

## Workflow

### 1. Classify Feature Inventory and Determine Layout Pattern

Group feature content into strategic tiers and assign the optimal layout composition pattern:

```text
[ PATTERN A: ZIGZAG ALTERNATING ROWS (Flagship Storytelling) ]
+-------------------------------------------------------------+
| [Visual Media / UI Preview] | [Eyebrow]                     |
|                             | [H2 Headline]                 |
|                             | [Body Copy - Max 60ch]        |
|                             | [* Key Highlight 1]           |
|                             | [* Key Highlight 2]           |
+-----------------------------+-------------------------------+
| [Eyebrow]                   | [Visual Media / UI Preview]   |
| [H2 Headline]               |                               |
| [Body Copy - Max 60ch]      |                               |
| [* Key Highlight 1]         |                               |
+-----------------------------+-------------------------------+

[ PATTERN B: INTERACTIVE TABBED FEATURE SWITCHER (High Density) ]
+-------------------------------------------------------------+
|                   [Section Header & Subtitle]               |
|   [ Tab 1: Workflow ]  [ Tab 2: Analytics ]  [ Tab 3: AI ]   |
+-------------------------------------------------------------+
|  Active Tab Panel: Visual Media + Content Description       |
+-------------------------------------------------------------+
```

- **Pattern A: Zigzag Alternating Rows (2 to 4 Flagship Features):**
  - Best for detailed storytelling where each feature deserves dedicated visual media.
  - Alternates text-left/media-right and media-left/text-right down the page.
- **Pattern B: Interactive Tabbed Feature Switcher (3 to 5 Complex Workflows):**
  - Best when saving vertical space while presenting deep, interactive UI previews.
  - Horizontally scrollable or tabbed interface where selecting a tab updates the media preview and description panel without full page navigation.
- **Pattern C: 3-Column or 4-Column Feature Card Grid (6 to 12 Supporting Features):**
  - Best for secondary capabilities, integration lists, or speed/security benefits.
  - Uses uniform cards with top/left icons, bold subheadings (`<h3>`), and 2-3 line descriptions.
- **Pattern D: Sticky Scroll Feature Showcase (3 to 4 High-Impact Features):**
  - Best for immersive SaaS landing pages.
  - Media container remains pinned (`position: sticky`) on one side while scrolling through text description blocks on the other side.

### 2. Establish Spatial Geometry and Column Ratios

Apply strict grid proportions and breathing room based on content emphasis:

- **Balanced 50/50 Split:** Equal 6-column / 6-column CSS grid split (`grid-template-columns: repeat(12, 1fr)`). Ideal when visual media and explanatory text hold equal weight.
- **Visual-Biased 60/40 Split (7-column / 5-column):** Allocates 7 columns to visual media and 5 columns to text. Ideal for detailed SaaS interface screenshots or hardware imagery.
- **Fluid Vertical Rhythm:**
  - Section Top/Bottom Padding: `clamp(3.5rem, 8vw, 7rem)` (56px to 112px).
  - Row-to-Row Gap (in Zigzag): `clamp(3rem, 6vw, 6rem)` (48px to 96px).
  - Content Element Gap (Headline to Body): `var(--space-m, 1.5rem)`.

### 3. Format Typography and Text Line Measures

Maintain strict reading comfort and visual hierarchy:

- **Section Header:**
  - Eyebrow / Label: Uppercase or semibold badge tag (`font-size: 0.875rem`, `letter-spacing: 0.05em`, `color: var(--color-primary)`).
  - Section Headline (`<h2>`): `clamp(1.875rem, 4vw, 3rem)` (30px to 48px), `font-weight: 700`, `line-height: 1.2`.
- **Feature Item Headline (`<h3>` in rows/cards):**
  - `clamp(1.375rem, 2.5vw, 2rem)` (22px to 32px), `font-weight: 600`, `line-height: 1.3`.
- **Body Copy Measure:**
  - Enforce `max-width: 60ch` (45 to 65 characters per line) to prevent wide text line scanning strain. `line-height: 1.6`.

### 4. Frame Visual Media Assets

Ensure visual media appears crisp, grounded, and accessible:

- **Border & Surface Treatment:** Wrap interface screenshots in a container with subtle border (`1px solid var(--color-border)`), border-radius (`12px` to `16px`), and soft elevation shadow (`box-shadow: 0 20px 25px -5px rgba(0,0,0,0.08)`).
- **Aspect Ratio Locking:** Use `aspect-ratio: 16 / 10` or `aspect-ratio: 4 / 3` with `object-fit: cover` or `object-fit: contain` to prevent layout shifts during image loading.
- **Bleed Option:** For high-impact UI visuals, allow the image to bleed slightly past the card edge using `overflow: hidden` on the parent frame.

### 5. Program Responsive Stacking & Mobile Order Rules

Prevent mobile layout bugs in alternating (zigzag) rows:

- **The Stacking Problem:** A naive CSS grid layout with alternating DOM elements (Row 1: Text-Image, Row 2: Image-Text) collapses into Text-Image-Image-Text on single-column mobile viewports, creating an ugly double-image stack.
- **The Solution (Mobile DOM First):**
  - Always structure HTML DOM order consistently: `Text Container` first, `Media Container` second within each row block.
  - On desktop (`min-width: 1024px`), apply CSS Grid area or `flex-direction: row-reverse` specifically to even rows (`:nth-child(even)`) to visually flip the layout without breaking mobile source order.
  - On mobile (`< 1024px`), all rows naturally collapse to Text first, Media second.

---

## Decision Rules

### Feature Section Composition Matrix

| Feature Priority & Scenario | Recommended Pattern | Media Aspect Ratio | Desktop Column Split |
| :--- | :--- | :--- | :--- |
| **2–4 Core SaaS Product Capabilities** | **Zigzag Alternating Rows** | `16:10` or `16:9` | 7 cols Media / 5 cols Text |
| **3–5 Interactive UI Workflows** | **Tabbed Feature Switcher** | `16:10` or `16:9` | Full-width or 8 cols Media / 4 cols Text |
| **6–12 Secondary Capabilities / Speed / Security** | **3-Column Feature Card Grid** | Icon (1:1) or `16:9` thumbnail | 3 equal columns (`repeat(3, 1fr)`) |
| **3–4 Deep Tech / Architecture Explanations** | **Sticky Scroll Showcase** | `16:10` or `4:3` (Sticky) | 6 cols Sticky Media / 6 cols Scrolling Text |

### Media Bleed vs. Contained Frame Matrix

- **Contained Frame (Default):** Enclose screenshot within padded card border with subtle background. Best for dashboard UI screenshots with light backgrounds.
- **Edge-to-Edge Bleed:** Remove padding on bottom and right image edges inside the container (`overflow: hidden`). Best for rich product mockups or dark-mode UI previews.
- **Frameless Cutout:** Transparent SVG illustration or 3D object rendering without outer box container. Best for hardware products or conceptual graphics.

---

## Constraints

- **Accessibility (WCAG 2.1 AA):**
  - **Contrast Ratios (SC 1.4.3):** Text on all feature cards and background surfaces must meet at least **4.5:1** contrast ratio (**3:1** for `<h2>` headlines ≥24px bold).
  - **Interactive Tab Navigation (SC 2.1.1):** Tabbed feature switchers must implement standard ARIA keyboard behavior: `Left/Right Arrow` keys to navigate tabs, `Space/Enter` to activate, `Tab` to enter panel content.
  - **Motion Control (SC 2.2.2 / SC 2.3.3):** Video loops or interactive canvas animations must respect `@media (prefers-reduced-motion: reduce)` by pausing auto-play or hiding decorative non-essential motion.
  - **Focus Visible (SC 2.4.7):** All interactive buttons, tab triggers, and inline feature links must display a visible focus indicator with at least 3:1 contrast and 2px offset.
- **Responsiveness & Touch Safety:**
  - Minimum touch target size for interactive feature tab triggers is **44px × 44px** (WCAG 2.2 SC 2.5.8).
  - Feature layouts must prevent horizontal overflow (`overflow-x: clip`) on viewports down to 320px width.

---

## Common Failure Patterns

- **Mobile Double-Media Stack:** Failing to fix CSS order on alternating rows, causing two visual media blocks to stack directly on top of each other on mobile.
- **Monotonous Feature Fatigue:** Repeating the exact same 3-column card grid for 4 consecutive page sections without visual or spatial variation.
- **Uncontained Wide Text Measure:** Allowing feature paragraph copy to stretch 1000px wide across the container, causing severe eye tracking fatigue.
- **Unannounced Tab Switching:** Using custom JavaScript tabs without proper `aria-selected="true"`, `aria-controls`, or `role="tabpanel"` attributes, leaving screen reader users unaware of content updates.
- **Tiny Low-Contrast Eyebrows:** Formatting category eyebrow tags in 10px light gray uppercase text (`#94A3B8` on white), failing WCAG AA contrast standards.

---

## Validation Criteria

- [ ] **Structured Hierarchy:** Section uses an appropriate layout pattern (Zigzag, Tabbed Switcher, Card Grid, or Sticky Showcase) based on feature count and priority.
- [ ] **Mobile Order Integrity:** Alternating (zigzag) rows collapse cleanly on mobile viewports into a consistent Text-first, Media-second vertical rhythm without consecutive image stacking.
- [ ] **Readable Line Length:** Paragraph text measures remain constrained to a maximum of 60ch (`max-width: 60ch`).
- [ ] **WCAG AA Contrast:** All text elements (including eyebrow tags, headlines, body copy, and tab labels) satisfy minimum 4.5:1 contrast ratios.
- [ ] **Accessible Interactive Tabs:** Tabbed feature switchers include correct ARIA attributes (`role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`) and handle keyboard arrow navigation.
- [ ] **Motion Safeguards:** Autoplaying video loops or animations honor `prefers-reduced-motion` settings.
- [ ] **Touch Target Compliance:** Interactive tab triggers and feature CTAs measure at least 44px in touch target height.
