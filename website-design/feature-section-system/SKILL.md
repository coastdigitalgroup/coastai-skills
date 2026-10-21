---
name: feature-section-system
description:
  Design, structure, and compose product feature sections, feature grids,
  alternating zigzag feature rows, interactive tabbed feature switchers, and
  sticky scroll feature showcases with strict visual hierarchy, scannability,
  responsive stacking, and WCAG AA accessibility.
---

# Feature Section System

## Purpose

The Feature Section System provides a systematic methodology for designing, structuring, and composing product feature showcases across marketing landing pages, SaaS product pages, e-commerce value highlights, and B2B solution portals. Product feature sections solve the critical visual design problem of communicating technical capabilities and product value propositions clearly without overwhelming users with dense walls of text or fatiguing them with monotonous, repetitive card grids. By establishing precise spatial composition rules, media-to-text layout ratios, responsive stacking behaviors, and accessible interactive patterns (such as tabbed feature switchers and sticky scroll showcases), this system transforms raw functional capabilities into high-impact, scannable, and accessible visual narratives.

## Use Cases

- **SaaS Core Capabilities Showcase:** Presenting primary platform capabilities using alternating zigzag rows with UI mockup illustrations and supporting micro-features.
- **Interactive Product Feature Switcher:** Organizing complex or multi-category software capabilities into tabbed or segmented viewports to prevent endless page scrolling.
- **High-Impact Value Proposition Anchor:** Highlighting a flagship product feature with a visually dominant focal layout (e.g., 60/40 visual-to-text split) supported by secondary 1x3 feature cards.
- **Sticky Scroll Feature Walkthrough:** Guiding users through a multi-step feature breakdown where text blocks scroll vertically while a high-fidelity visual preview stays pinned in view.

## When NOT to Use

- **Side-by-Side Plan Comparisons:** If the primary objective is comparing pricing tiers or plan features, use `pricing-table-ui-system` or `comparison-matrix-system`.
- **Linear Step-by-Step Onboarding Sequences:** For ordered, sequential workflows ("Step 1: Sign up, Step 2: Configure, Step 3: Deploy"), use `process-and-workflow-system` or `stepper-and-wizard-system`.
- **Asymmetrical High-Density Data Dashboards:** For packing disparate metrics, mini-charts, and visual badges into an asymmetrical modular grid, use `bento-grid-layout-system`.
- **Purely Editorial / Long-Form Articles:** For presenting uninterrupted text articles or case study narratives, use `article-layout-system`.

## Inputs

1. **Feature Content Inventory & Taxonomy:** A classified list of product features organized into hierarchy levels (1 Primary Flagship Feature, 2-4 Supporting Capabilities, 3-6 Secondary Utility Features).
2. **Visual & Media Asset Inventory:** Visual assets associated with each feature (e.g., high-resolution UI screenshots, vector illustrations, animated WebP/Lottie graphics, or interactive demo embeds).
3. **Typography & Spatial Design Tokens:** Fluid type scale (from `fluid-typography-system`), fluid spacing tokens (from `fluid-spacing-system`), and elevation/border tokens (from `elevation-and-depth-system`).
4. **Target Breakpoints & Viewport Constraints:** Desktop grid configurations (e.g., 12-column master grid), tablet adaptation rules, and mobile single-column stacking constraints.

## Outputs

1. **Feature Section Structural Blueprint:** A detailed layout geometry map specifying column spans, media-to-text ratios, and vertical rhythm spacing across feature tiers.
2. **Interactive Feature State Specifications:** Exact interaction states (active tab, hover state, focus indicator, sticky anchor trigger) for tabbed or scroll-driven feature modules.
3. **DOM Structure & Accessibility Map:** A semantic HTML tree specification defining reading order, heading levels (`<h2>`, `<h3>`), ARIA roles (`role="tablist"`, `role="tab"`, `role="tabpanel"`), and screen reader focus management.
4. **Responsive Stacking & Media Order Plan:** Clear rules detailing how media visual assets and text blocks re-order on tablet and mobile viewports to preserve natural reading flow.

---

## Workflow

### 1. Classify Feature Hierarchy and Select Layout Archetype
Categorize feature content into clear structural tiers and select the appropriate layout pattern based on media complexity and content density:
- **Tier 1: Flagship Feature Anchor (Alternating Zigzag / 60/40 Split):** Reserved for core value propositions requiring high visual impact. Uses a 2-column layout pairing a visual media asset (60% width) with headline, body, and micro-list text (40% width). Subsequent features alternate visual placement (Left-Right-Left) to maintain dynamic visual rhythm.
- **Tier 2: Interactive Feature Switcher (Tabbed Panel / Segmented Focus):** Best for 3 to 5 complex features that belong to a single workflow. Keeps a persistent tab controller on one side (or top) while swapping visual panels in a primary display viewport.
- **Tier 3: Secondary Feature Grid (3-Column or 2x2 Matrix):** Used for utility features, integrations, or supporting capabilities. Arranged in a scannable grid featuring icon/badge headers, short titles, and 2-3 sentence descriptions.

### 2. Establish Spatial Ratios and Typography Hierarchy
Enforce strict proportional rules to ensure legibility and visual balance:
- **Media-to-Text Ratios:** Standardize on a `60:40` or `50:50` column split for Tier 1 rows. Ensure a minimum gap of `--space-l` (24px to 48px fluid) between media and copy blocks.
- **Typographic Scale:**
  - Section Header: `clamp(2rem, 4vw, 3rem)` (`<h2>`) with optional pre-title badge/kicker (`clamp(0.875rem, 1.5vw, 1rem)`).
  - Feature Row Title: `clamp(1.5rem, 2.5vw, 2rem)` (`<h3>`).
  - Feature Body Copy: `clamp(1rem, 1.25vw, 1.125rem)` (`<p>`), constrained to a maximum measure of `60ch` (characters per line).
- **Vertical Rhythm:** Apply a fluid vertical gap between alternating feature rows of `--space-2xl` (64px to 112px fluid) to establish clear visual breathing room between distinct feature topics.

### 3. Design Interactive Feature Modules (Tabbed & Sticky Patterns)
When using interactive feature switchers or sticky scroll showcases:
- **Tabbed Feature Switcher:** Position tabs logically (vertical sidebar list on desktop or horizontal bar on top). Ensure active tab states have strong visual contrast (e.g., active accent border, elevated background) and clear indicator transitions.
- **Sticky Scroll Showcase:** Use CSS `position: sticky; top: var(--header-height)` for the media container while text blocks scroll naturally alongside it. Set container height appropriately (`min-height: 100vh`) to prevent abrupt snapping.
- **Reduced Motion Adaptation:** Ensure all animated previews or scroll-driven transitions honor `@media (prefers-reduced-motion: reduce)` by providing instant static panel swaps or disabling auto-play video loops.

### 4. Engineer Accessibility and DOM Reading Order
Irregular or alternating layouts must maintain a linear, accessible DOM structure:
- **Natural DOM Sequence in Alternating Rows:** In alternating (zigzag) layouts, **never swap DOM element order** between rows just to achieve visual alternation. Keep the HTML sequence consistent (Text then Media, OR Media then Text) and use CSS Grid (`grid-template-areas` or `order` via media query) to visually swap columns on desktop. On mobile, ensure copy always precedes visual media.
- **Tabbed Switcher ARIA Semantics:**
  - Tab list container: `role="tablist"` with `aria-label` or `aria-labelledby`.
  - Tab controls: `<button role="tab" aria-selected="true|false" aria-controls="panel-id" id="tab-id">`.
  - Content panels: `<div role="tabpanel" id="panel-id" aria-labelledby="tab-id">`.
  - Keyboard Navigation: Support left/right or up/down Arrow keys for moving focus between tabs, with `Home` and `End` keys moving to first/last tab.

### 5. Define Responsive Stacking and Mobile Adaptation
Ensure seamless transformation across viewport sizes:
- **Desktop (1024px+):** Full 2-column alternating split, 3-column feature grids, or side-by-side tabbed switchers.
- **Tablet (768px - 1023px):** Reduce gap spacing. Convert tabbed switchers to horizontal scrolling tab bars or accordion panels.
- **Mobile (< 768px):** Collapse all multi-column rows into a single vertical stack (`1fr`). Force text copy to render above visual media assets so users read the feature context before seeing the visual screenshot. Simplify 3-column feature grids into a 1-column stack or horizontal swipe snap list.

---

## Decision Rules

### Feature Section Pattern Selection Matrix

| Feature Count & Type | Primary Goal | Recommended Layout Pattern | Spatial Layout Structure |
| :--- | :--- | :--- | :--- |
| **2–4 High-Impact Core Features** | Deep narrative, visual illustration, feature differentiation | **Alternating Zigzag Rows** | 2-Column split (60/40), alternating left/right media placement per row. |
| **3–6 Category Workflow Features** | Interactive exploration without excessive vertical page height | **Tabbed Feature Switcher** | Vertical/Horizontal tab controls paired with a dynamic 60% width panel container. |
| **4–8 Utility Capabilities / Integrations** | Fast scanning, broad capability overview | **3-Column Feature Grid** | 3x2 or 2x4 card grid with uniform icons, H3 titles, and 2-line descriptions. |
| **3–5 Sequential Workflow Features** | Storytelling, deep product walkthrough with persistent preview | **Sticky Scroll Showcase** | Left text column scrolls continuously while right media container stays pinned sticky. |

### Media Placement & Ordering Rules on Mobile Stack

- **Standard Mobile Rule:** Copy precedes Media. Text context (`<h3>`, `<p>`, bullet points) must appear above visual screenshots or videos when collapsed to single column on mobile screens.
- **Implementation Pattern:**
  ```css
  .feature-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-m);
  }
  @media (min-width: 1024px) {
    .feature-row {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .feature-row--reverse .feature-media {
      order: -1; /* Visually moves media to left column without breaking HTML DOM order */
    }
  }
  ```

---

## Constraints

- **Contrast Ratios (WCAG AA):** All feature titles, body text, and tab labels must meet at least `4.5:1` contrast against their background. Sub-labels and pre-title kickers must meet `4.5:1` (or `3:1` if large text >= 24px/18px bold).
- **Keyboard Focus Visibility (WCAG 2.2 SC 2.4.13):** Interactive feature triggers (tabs, accordion triggers, CTA links) must display a high-contrast focus outline (minimum 2px solid with `--space-xxs` offset) during keyboard navigation.
- **Touch Target Floor (WCAG 2.2 SC 2.5.8):** All tab controls, expansion triggers, and CTA links within feature modules must provide a minimum tap target size of `44x44px` (or `24x24px` with sufficient surrounding spacing).
- **Media Alt Text & Captioning:** Screenshots and illustrations must include descriptive `alt` text explaining the feature shown (e.g., `alt="Analytics dashboard showing monthly conversion trend line and export dropdown"`). Decorative background graphics must use `alt=""` or `aria-hidden="true"`.

---

## Common Failure Patterns

- **The "Wall of Screenshots" Monotony:** Stacking 6 identical 2-column feature rows with identical screenshot sizes and padding, creating visual monotony and causing users to scroll past without scanning.
- **DOM Mismatch in Alternating Rows:** Flipping the HTML source elements (putting `<img` first in row 1, then `<div class="text"` first in row 2), causing keyboard tab focus to jump erratically between text and images across rows.
- **Tabbed Switchers Missing Keyboard Navigation:** Building tabbed feature switchers using non-semantic `<div>` or `<span>` elements without `role="tab"`, leaving keyboard users unable to switch tabs using Arrow keys.
- **Unconstrained Mobile Media Heights:** Allowing detailed desktop UI screenshots to render full-width on mobile without zoom or crop, resulting in tiny, unreadable text inside the screenshot image.
- **Sticky Scroll Traps:** Setting a sticky scroll feature section with excessive height (`400vh`) without providing an easy scroll skip button or clear visual progress indicator, trapping users in an endless scroll section.

---

## Validation Criteria

- [ ] **Structural Hierarchy:** Clear visual distinction exists between Primary Anchor features (60/40 split), Interactive Switchers, and Secondary Utility Grids.
- [ ] **DOM Reading Order Integrity:** In alternating feature rows, HTML source order remains consistent so keyboard focus moves predictably without jumping.
- [ ] **Tabbed Switcher ARIA Compliance:** Interactive tabbed feature switchers use valid `role="tablist"`, `role="tab"`, and `role="tabpanel"` semantics with working Arrow key navigation.
- [ ] **Mobile Stack Alignment:** On mobile viewports (< 768px), feature rows collapse cleanly into a single column with copy placed above media assets.
- [ ] **Contrast & Focus Standards:** Text and interactive states satisfy WCAG AA 4.5:1 contrast, and focusable elements display visible, non-clipped focus rings.
- [ ] **Reduced Motion Support:** Motion animations and auto-playing media honor `@media (prefers-reduced-motion: reduce)`.
