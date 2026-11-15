---
name: process-and-workflow-system
description:
  Design and structure "How It Works" sections, onboarding step flows, and product process showcases across marketing websites and landing pages, managing spatial arrangement, step node indicators, visual connectors, media-copy pairing, interactive tab switching, and WCAG AA accessibility.
---

# Process and Workflow System

## Purpose

The Process and Workflow System provides a standardized framework for designing, organizing, and layout-engineering "How It Works" sections, step-by-step product onboarding flows, service implementation timelines, and operational workflow showcases across marketing websites, SaaS landing pages, B2B product tours, and e-commerce explainer modules.

Explaining multi-step processes or product workflows is critical for reducing perceived complexity and building user confidence. However, without a systematic design approach, process sections frequently suffer from visual fragmentation, unanchored floating steps, ambiguous visual connectors, poor media-to-copy pairing, broken responsive stacking on mobile viewports, and inaccessible interactive step controls.

This system establishes layout selection matrices (horizontal step grid, alternating zig-zag rows, vertical node timeline, and interactive tabbed workflow switcher), spatial connector geometry rules, step badge hierarchy, media aspect ratio constraints, responsive breakpoint adaptation, and WCAG 2.1 AA keyboard and screen reader accessibility guidelines.

## Use Cases

- **SaaS "How It Works" Landing Page Sections:** Breaking down product onboarding into a clear 3-to-4 step visual narrative (e.g., "1. Connect your repo -> 2. Configure policies -> 3. Deploy automatically").
- **B2B Implementation & Service Timelines:** Showcasing multi-phase onboarding or professional service delivery (e.g., Discovery -> Architecture -> Migration -> Go-Live).
- **E-Commerce Order & Fulfillment Explainers:** Explaining custom product creation, subscription delivery, or trade-in/refurbishment processes (e.g., "Select Plan -> Receive Kit -> Mail Back -> Earn Credit").
- **Interactive Product Feature Tours:** Guiding prospective buyers through key workflow stages using interactive step triggers synced with live UI mockups or video previews.
- **Fintech & Security Verification Flows:** Explaining identity verification, loan application processing, or compliance audit steps to build trust before signup.

## When NOT to Use

- **In-App Multi-Step Form Wizards:** For active, user-inputted form flows with validation gates and state persistence, use `stepper-and-wizard-system`.
- **Chronological Audit Logs & System Activity Feeds:** For timestamped event streams, historical activity feeds, or account logs, use `timeline-activity-system`.
- **Sequential Form Progress Indicators:** For passive linear form progress bars, use `step-progress-system`.
- **Deep Hierarchical Navigation Trees:** For multi-tiered documentation or file directory navigation, use `tree-view-navigation-system`.

## Inputs

1. **Workflow Step Content Inventory:** Ordered list of steps containing step number/badge, title, short descriptive copy, and optional action link/CTA.
2. **Visual Media Asset Taxonomy:** Asset type paired with each step (static SVG icon, 3D illustration, UI screenshot mockup, or looping WebM/MP4 video preview).
3. **Layout Budget & Surface Dimensions:** Full-width marketing section, embedded card block, or narrow sidebar column.
4. **Interactivity Level:** Static scannable layout (horizontal grid or alternating rows) vs. Interactive tabbed workflow switcher (click/hover step nodes to swap visual preview).
5. **Brand & Surface Tokens:** Surface colors, connector stroke colors, focus ring metrics, border radius, and fluid typography scale from `accessible-color-system` and `fluid-typography-system`.

## Outputs

1. **Layout Composition Blueprint:** Spatial layout specifications (3-column horizontal grid, alternating zig-zag layout, vertical node timeline, or interactive tabbed workflow display) with precise padding, gaps, and max-width constraints.
2. **Step Node & Connector Geometry Spec:** Badge sizing (e.g., `40x40px` step badge), connector line stroke thickness (`2px`–`3px`), line style (dashed, gradient, or solid), and alignment coordinates.
3. **Media & Copy Pairing Specification:** Aspect ratio rules (`16:9` or `4:3`), media masking, drop shadows, and visual focal alignment relative to copy blocks.
4. **Responsive Stacking Blueprint:** Transition specifications mapping desktop layouts to tablet grids and mobile vertical single-column stacks without horizontal scroll overflow.
5. **Accessible ARIA Markup Spec:** WCAG AA compliant semantic structure (`<ol>`, `<section>`, `aria-current="step"`, keyboard focusable triggers, and `aria-live` region announcements for interactive step switchers).

---

## Workflow

### 1. Classify the Workflow and Choose the Layout Pattern

Select the layout architecture based on step count, content density, and desired interactivity level:

```text
PATTERN 1: HORIZONTAL STEP GRID (3 to 4 Short Steps)
+-----------------------------------------------------------------------+
|  [01] Connect Data        [02] Set Rules          [03] Launch Bot     |
|  ====== Connector ======> ====== Connector ======>                     |
|  Short description text   Short description text   Short description  |
+-----------------------------------------------------------------------+

PATTERN 2: ALTERNATING ZIG-ZAG ROWS (3 to 5 Detailed Steps)
+-----------------------------------------------------------------------+
|  [Step 1 Copy Block]                  [UI / Media Preview]            |
|                                                                       |
|  [UI / Media Preview]                 [Step 2 Copy Block]            |
+-----------------------------------------------------------------------+

PATTERN 3: INTERACTIVE TABBED WORKFLOW SWITCHER (3 to 6 Media-Rich Steps)
+-----------------------------------------------------------------------+
|  STEP TABS (Left Column)           | DYNAMIC MEDIA CANVAS (Right)     |
|  [1. Import Data]   <-- Active     | +-----------------------------+  |
|  [2. Train Model]                  | | [ Live Interactive Mockup ] |  |
|  [3. Deploy API]                   | +-----------------------------+  |
+-----------------------------------------------------------------------+
```

- **Pattern 1: Horizontal Step Grid (3 to 4 Short Steps):**
  - Best for concise onboarding summaries above the fold or on product overview pages.
  - Arrange steps in a 3 or 4-column horizontal grid (`display: grid; grid-template-columns: repeat(3, 1fr)`).
  - Place horizontal connector lines between step badges across desktop screens.
- **Pattern 2: Alternating Zig-Zag Rows (3 to 5 Detailed Steps):**
  - Best for narrative product storytelling where each step requires a detailed explanation and a large UI screenshot or video mockup.
  - Alternates copy on left / image on right (Step 1) with image on left / copy on right (Step 2).
  - Connect steps with a subtle vertical SVG track or background line running down the center or left axis.
- **Pattern 3: Interactive Tabbed Workflow Switcher (3 to 6 Steps):**
  - Best for feature-dense SaaS products where users want to explore interactive UI previews without vertical scroll fatigue.
  - Left Column (1/3 width): Vertical list of interactive step cards functioning as tab controls.
  - Right Column (2/3 width): Large media viewport displaying the corresponding screenshot or video preview for the active step.
- **Pattern 4: Vertical Node Timeline (4 to 8 Sequential Phases):**
  - Best for enterprise B2B service implementation, multi-week onboarding, or compliance roadmaps.
  - Continuous vertical axis line on the left (`left: 20px` or `24px`), with step badges anchored directly on the line and content cards indented to the right.

### 2. Design Step Badges, Connectors, and Visual Rhythm

Establish strong spatial structure and visual continuity across steps:

- **Step Node Badges:**
  - Shape & Size: Circular (`40x40px` desktop, `36x36px` mobile) or rounded rectangle (`padding: 4px 12px; height: 32px`).
  - Content: Numeric indicator (`"01"`, `"02"`, `"03"`) or milestone icon set in bold semi-condensed typography.
  - Palette: High-contrast primary fill (`background-color: var(--color-primary); color: #ffffff`) or accent outline ring (`2px solid var(--color-primary)`).
- **Connector Track Lines:**
  - Geometry: `2px`–`3px` thickness. Solid stroke for completed or linear steps; dashed stroke (`stroke-dasharray: 6 4`) for future or flexible phases.
  - Color: Subtle accent token with minimum 3:1 non-text contrast against page surface (`var(--color-border-subtle)`).
  - Position: Center-aligned to the vertical or horizontal axis of adjacent step badges.
  - Responsive rule: Hide horizontal connectors on mobile screens (`@media (max-width: 767px) { .connector { display: none; } }`) to avoid visual overlap during vertical stacking.

### 3. Pair Copy and Media for Optimal Scanning

- **Headline Hierarchy:** Each step title should use a semantic heading (`<h3>` or `<h4>`) sized at `1.25rem`–`1.5rem` (20px–24px) with `font-weight: 600`.
- **Description Body:** Sized at `0.9375rem`–`1rem` (15px–16px) with `line-height: 1.6`. Keep copy concise (20 to 45 words per step).
- **Media Aspect Ratios & Framing:**
  - Desktop screenshots: `16:9` or `16:10` aspect ratio with rounded corners (`border-radius: 12px`), subtle border (`1px solid var(--color-border)`), and soft drop shadow (`box-shadow: var(--shadow-md)`).
  - Mobile UI screenshots: `9:16` aspect ratio framed in a device container mockup.
  - Illustrations / Icons: Constrained within uniform containers (`64x64px` to `120x120px`) with transparent or soft tinted backdrops.

### 4. Implement Responsive Stacking and Adaptation

Ensure seamless readability across device screen sizes:

- **Desktop (1024px+):** Full multi-column horizontal grid, 2-column alternating zig-zag, or split-screen interactive switcher.
- **Tablet (768px – 1023px):**
  - Horizontal 4-step grid converts to a 2x2 grid.
  - Interactive switcher maintains split layout if viewport width permits, otherwise stacks step controls above the media container.
- **Mobile (< 768px):**
  - All patterns collapse cleanly into a single vertical column (`flex-direction: column` or `grid-template-columns: 1fr`).
  - Alternating zig-zag rows MUST maintain uniform visual hierarchy: Media always sits above copy or below copy consistently across all stacked mobile rows (e.g., Badge -> Title -> Copy -> Media) to prevent chaotic scanning.
  - Horizontal connector lines hide or convert into a thin vertical left border line.

### 5. Program WCAG AA Accessibility and Interactivity Rules

Ensure complete accessibility across keyboard, touch, and screen reader input methods:

- **Semantic Document Hierarchy:**
  - Enclose the entire process section in a `<section aria-labelledby="process-heading">` container.
  - Structure sequential static steps using an ordered list (`<ol class="process-steps">` and `<li>`).
- **Interactive Step Switcher Semantics (Pattern 3):**
  - Implement step buttons as a semantic tablist (`role="tablist"` or button list) with `aria-selected="true/false"` and `aria-controls="panel-id"`.
  - Display panel wrapper must feature `role="tabpanel"` and `id="panel-id"`.
  - When the active step changes, announce the step title and update preview to screen readers using `aria-live="polite"`.
- **Keyboard Navigation Protocol:**
  - `Tab` / `Shift+Tab`: Focuses through interactive step triggers, CTAs, and media links sequentially.
  - `Arrow Left` / `Arrow Right` (or `Arrow Up` / `Arrow Down`): Moves focus between step tabs in interactive switchers.
  - `Space` / `Enter`: Activates the focused step tab.
- **Focus Indicator System:** Interactive step nodes must render an explicit, unclipped focus ring (`outline: 2px solid var(--color-focus-ring); outline-offset: 3px`) when focused via keyboard.

---

## Decision Rules

### Layout Selection Matrix

| Scenario / Constraints | Recommended Layout Pattern | Connector Track Style | Media Asset Type |
| :--- | :--- | :--- | :--- |
| **3–4 Short Onboarding Steps** (Landing Page Hero / Overview) | **Pattern 1: Horizontal Step Grid** | Horizontal solid/dashed line between badges | Vector icons / 1:1 spot illustrations |
| **3–5 Detailed Features** (Product Explainer Section) | **Pattern 2: Alternating Zig-Zag Rows** | Vertical subtle track down section | 16:9 UI screenshots / video mockups |
| **3–6 Interactive Product Stages** (SaaS Feature Tour) | **Pattern 3: Interactive Tabbed Switcher** | Highlighted active node border | High-res UI screenshot / WebM loop |
| **5–8 Sequential Implementation Phases** (Enterprise / B2B) | **Pattern 4: Vertical Node Timeline** | Continuous vertical left axis line | Compact icons + metadata cards |

### Stacking Alignment Rule on Mobile Viewports

```text
DESKTOP (Alternating Zig-Zag)
Row 1: [Copy Block] -> [Media Preview]
Row 2: [Media Preview] -> [Copy Block]

MOBILE STACKING (Strict Uniform Sequence)
Row 1: [Badge] -> [Title] -> [Copy] -> [Media]
Row 2: [Badge] -> [Title] -> [Copy] -> [Media]
(Do NOT flip media above copy on even rows on mobile)
```

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA Minimum):**
  - **SC 1.4.3 Contrast:** Step numbers, titles, body text, and interactive tab labels must satisfy at least **4.5:1** contrast ratio against surrounding surfaces.
  - **SC 1.4.11 Non-Text Contrast:** Step badges, connector tracks, and focus indicators must achieve at least **3:1** contrast against page backgrounds.
  - **SC 2.1.1 Keyboard Accessibility:** Every interactive step trigger, tab control, and embedded CTA must be 100% operable via keyboard alone.
  - **SC 2.5.8 Target Size:** Interactive step tabs and node triggers must provide a touch target of at least **44x44px** (or 24x24px with surrounding spacing).
- **Responsive Stacking Safety:**
  - Process sections MUST NOT trigger horizontal scrolling or text clipping at any viewport width down to **320px**.
- **Media Asset Containment:**
  - All visual previews inside process steps must use `max-width: 100%` and explicit aspect ratios (`aspect-ratio: 16 / 9` or object-fit styling) to prevent layout shifts during image loading.

---

## Common Failure Patterns

- **The Floating Disconnected Steps Anti-Pattern:** Rendering step numbers with wide random gaps and no visual connectors or shared alignment, making steps appear as isolated cards rather than a coherent process.
- **The Mobile Zig-Zag Flip Trap:** Failing to normalize layout order on mobile viewports, causing alternating rows to stack as `Copy -> Media -> Media -> Copy`, creating a confusing double-image stack.
- **Unannounced Tab Switching:** Building interactive step switchers with generic `<div>` click handlers, making the step switcher invisible and non-functional for keyboard and screen reader users.
- **Low-Contrast Step Badges:** Rendering soft gray step numbers (`#CBD5E1`) on white backgrounds, violating WCAG AA non-text contrast rules and making step ordering unreadable.
- **Excessive Copy Wall:** Writing 150+ words of dense body text per step, defeating the purpose of a scannable visual process section.
- **Broken Connector Lines on Mobile:** Leaving desktop horizontal absolute-positioned connector lines active on mobile viewports, resulting in lines slashing across text blocks.

---

## Validation Criteria

- [ ] Process section uses an appropriate layout pattern (Horizontal Grid, Alternating Zig-Zag, Interactive Switcher, or Vertical Timeline) based on step count and density.
- [ ] Step badges feature clear numeric or icon indicators meeting WCAG AA 4.5:1 text or 3:1 non-text contrast ratios.
- [ ] Horizontal connector tracks hide cleanly or adapt smoothly on mobile viewports (< 768px) without horizontal page overflow.
- [ ] Mobile responsive stacking maintains a uniform vertical reading sequence across all steps (Badge -> Title -> Body -> Media).
- [ ] Interactive step switchers utilize semantic tablist/tab panel ARIA attributes or button triggers with `aria-selected` / `aria-current` state management.
- [ ] All interactive step controls provide at least 44x44px touch targets and visible 2px focus indicators during keyboard navigation.
- [ ] Copy per step is concise (under 50 words) with clear `<h3>`/`<h4>` semantic heading hierarchy.
