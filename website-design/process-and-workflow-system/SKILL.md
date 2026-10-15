---
name: process-and-workflow-system
description:
  Design, organize, and layout-engineer "How It Works" sections, step-by-step product
  onboarding flows, service implementation timelines, and operational workflow showcases
  with connected linear nodes, split-media previews, and WCAG AA accessible structures.
---

# Process & Workflow System

## Purpose

The Process & Workflow System provides a standardized framework for designing, organizing, and layout-engineering "How It Works" sections, step-by-step product onboarding flows, service implementation timelines, and operational workflow showcases across marketing websites, SaaS landing pages, B2B product tours, and e-commerce explainer modules.

While interactive forms rely on step wizards (`stepper-and-wizard-system`) and active task tracking relies on progress indicators (`step-progress-system`), marketing and explanatory sections require spatial composition, visual storytelling, step chunking, connector lines, numerical badge hierarchies, paired media previews, and responsive layout adaptations. Without a dedicated process system, "How It Works" sections frequently degrade into unreadable walls of text, misaligned connector graphics, broken mobile stacks, ambiguous step transitions, and inaccessible static images.

This system establishes concrete guidelines for layout selection (horizontal node chain, vertical connector timeline, split-screen tabbed workflow, and staggered feature sequence), step-to-media pairing, connector line physics, numerical indicator styling, and WCAG 2.1 AA accessibility.

## Use Cases

- **SaaS "How It Works" Sections:** Demonstrating product functionality in 3 to 4 easy steps (e.g., "Connect your data -> Configure rules -> Automate workflows -> Analyze performance").
- **B2B Implementation Timelines:** Showcasing enterprise deployment phases (e.g., "Discovery & Security Audit -> Custom Integration -> Team Training -> Live Deployment").
- **E-Commerce & Service Delivery Explainer:** Explaining custom subscription programs, trade-in cycles, or localized delivery options (e.g., "Select your plan -> Customize box -> Free monthly shipment -> Cancel anytime").
- **Developer Platform & Pipeline Tours:** Visualizing code-to-cloud workflows, CI/CD pipelines, or API key generation steps.
- **Onboarding & Setup Overviews:** Illustrating getting-started guides on landing pages to reduce signup anxiety and lower time-to-first-value (TTFV).

## When NOT to Use

- **Interactive Multi-Step Forms & Checkouts:** For user-driven data entry wizards with validation, field state tracking, and branch logic, use `stepper-and-wizard-system`.
- **System Task Progress & Loading States:** For real-time progress tracking of background file uploads, system tasks, or user checkout steps, use `step-progress-system`.
- **Chronological Logs & Historical Feeds:** For audit logs, user activity histories, or company history timelines, use `timeline-activity-system`.
- **Deep Technical Documentation:** For multi-page developer guides with API references, use `sidebar-navigation-system` or `tree-view-navigation-system`.

## Inputs

1. **Process Inventory & Step Count:** List of sequential stages (title, 1-2 sentence description, numerical order, and optional visual asset/icon).
2. **Target Audience & Page Intent:** High-level marketing conversion (3-4 steps) vs. detailed B2B evaluation (5-7 steps with timelines).
3. **Media Asset Taxonomy:** Type of visual paired with each step (UI screenshot, vector illustration, animated code block, video loop, or simple icon).
4. **Layout Surface & Space Budget:** Full-width hero section, containerized 1200px band, or side-by-side split section.
5. **Design System Tokens:** Color palettes for active/completed/connector elements, fluid typography scale, and fluid spacing tokens from `accessible-color-system` and `fluid-typography-system`.

## Outputs

1. **Process Layout Blueprint:** Selected spatial layout pattern (Horizontal Chain, Vertical Connector, Split Tabbed Workflow, or Staggered Zig-Zag) with defined margins, gutters, and measures.
2. **Step Node & Connector Geometry Spec:** Coordinates and CSS rules for step badges, connecting lines/arrows, active states, and spacing.
3. **Responsive Stacking Blueprint:** Adaptation specifications converting multi-column horizontal chains to vertical stacks or accordion tabs on mobile viewports.
4. **Media & Copy Pairing Grid:** Alignment guidelines matching step descriptions with UI screenshots, code snippets, or vector illustrations.
5. **WCAG AA Accessible Markup:** Semantic HTML structure using ordered lists (`<ol>`), accessible headings, ARIA live region tab controls, and alternative text.

---

## Workflow

### 1. Select Layout Architecture Based on Step Count and Media Type

Select the optimal layout pattern based on the number of process steps and visual media complexity:

```text
[ PATTERN A: HORIZONTAL NODE CHAIN (3–4 Short Steps) ]
+-----------------------------------------------------------------------+
|  (1) Step One -------> (2) Step Two -------> (3) Step Three          |
|  Title                 Title                 Title                    |
|  Description text      Description text      Description text         |
+-----------------------------------------------------------------------+

[ PATTERN B: SPLIT MEDIA + TABBED WORKFLOW (3–6 Detailed Steps) ]
+-----------------------------------------------------------------------+
|  Steps / Tabs                    |  Interactive Media Preview          |
|  [1] Connect Data Sources (Active)|  +-------------------------------+ |
|      Details & micro-copy text   |  |                               | |
|  [2] Configure Automation Rules  |  |   UI Screenshot / Dashboard   | |
|  [3] Launch & Monitor Analytics  |  +-------------------------------+ |
+-----------------------------------------------------------------------+
```

- **Pattern A: Horizontal Node Chain (3–4 Short Steps):**
  - Ideal for concise marketing overview sections ("1-2-3 Easy Setup").
  - Spand across 3 or 4 equal grid columns (`grid-template-columns: repeat(3, 1fr)`).
  - Linked by subtle horizontal connector lines between numerical step badges.
- **Pattern B: Vertical Connector Timeline (4–6 Steps with Extended Text):**
  - Ideal for B2B implementation timelines or detailed operational processes.
  - Left-aligned or centered vertical line running behind numbered step nodes.
  - Step content sits to the right (or alternates left/right) of the vertical trunk line.
- **Pattern C: Split Tabbed / Interactive Workflow (3–6 Complex Media Steps):**
  - Ideal for SaaS product tours where each step features an accompanying screenshot or video loop.
  - Left Column (40% width): Vertical step selector cards acting as tab controls.
  - Right Column (60% width): Large visual preview container updating dynamically as steps are focused or clicked.
- **Pattern D: Staggered Feature Sequence / Zig-Zag (3–5 High-Impact Steps):**
  - Ideal for story-driven landing pages highlighting rich visual features.
  - Alternating rows: Step 1 (Text Left, Image Right) -> Step 2 (Image Left, Text Right) -> Step 3 (Text Left, Image Right).

### 2. Design Step Nodes and Connector Physics
Step badges and connectors establish visual continuity across the workflow:

- **Numerical Step Badges:**
  - Standard size: `40px` to `48px` diameter circle.
  - Background fill: High-contrast accent color (e.g., brand primary) or clear bordered outline.
  - Font size: `1.125rem` (18px) bold or semi-bold, centered.
  - Position: Placed at top-left of step text (horizontal) or anchored along the vertical timeline axis.
- **Connector Line Physics:**
  - **Horizontal Connectors:** Positioned behind or between badges at `top: 20px` or `top: 24px` (aligning with badge center). Use a `2px` dashed or solid line using border token color (`var(--border-subtle)`).
  - **Vertical Connectors:** Continuous vertical line (`width: 2px; background-color: var(--border-subtle)`) positioned `20px` to `24px` from left edge, spanning from first step node to last step node.
  - **Directional Arrows:** Optional subtle chevron/arrow SVG at the terminal end of connectors to reinforce forward motion direction.

### 3. Establish Typography & Content Measure
Keep text focused and readable to prevent user fatigue:

- **Step Title:** `1.125rem`–`1.25rem` (18px–20px), `font-weight: 600`, line-height `1.3`. Use semantic `<h3>` elements.
- **Step Description:** `0.9375rem`–`1rem` (15px–16px), line-height `1.6`, color `var(--text-secondary)`. Max measure of `35ch`–`45ch` per step column in horizontal layouts.
- **Time/Duration Badges (Optional for Timelines):** Micro-badge (e.g., "Week 1", "5 Min Setup", "Instant") placed above or alongside step title in `0.75rem` (12px) uppercase bold text.

### 4. Configure Mobile Stacking and Touch Interactivity
Process layouts must remain fully legible on mobile screens (< 768px):

- **Horizontal Chains to Vertical Stack:** On viewports under 768px, horizontal chains MUST transform into a single vertical stack.
- **Mobile Connector Orientation:** Rotate horizontal connector lines to vertical, maintaining the visual line between stacked step badges.
- **Split Media Adaptation:** On mobile, split-screen interactive workflows stack vertically with step selector tabs rendered as a horizontal scrollable pill bar or an accordion above/below the media preview.

### 5. Program WCAG AA Accessibility & Semantic Markup
Ensure the workflow is structured semantically for screen readers and keyboard users:

- **Semantic List Markup:**
  ```html
  <section aria-labelledby="process-heading">
    <h2 id="process-heading">How It Works</h2>
    <ol class="process-steps">
      <li class="process-step">
        <div class="process-step__node" aria-hidden="true">1</div>
        <div class="process-step__content">
          <h3>Connect Your Account</h3>
          <p>Link your existing workspace in less than two minutes using OAuth.</p>
        </div>
      </li>
      ...
    </ol>
  </section>
  ```
- **Interactive Tabbed Workflows ARIA:** When steps act as interactive tab triggers to switch media previews, apply `role="tablist"`, `role="tab"`, `aria-selected`, and `role="tabpanel"`.
- **Keyboard Navigation:** Ensure interactive step triggers respond to `Tab`, `ArrowKeys`, `Space`, and `Enter` with visible 2px focus indicators.

---

## Decision Rules

### Layout Selection Matrix

| Step Count & Media Type | Recommended Layout | Connector Orientation | Mobile Behavior |
| :--- | :--- | :--- | :--- |
| **3–4 Steps / Minimal Icons** | **Horizontal Node Chain** | Horizontal dashed/solid line | Convert to vertical line stack |
| **4–6 Steps / Extended Copy** | **Vertical Connector Timeline** | Continuous vertical line | Retain single vertical timeline |
| **3–6 Steps / Rich UI Previews** | **Split Media + Tabbed Workflow** | Interactive tab active bar | Stack tabs above sticky/responsive image |
| **3–5 Steps / Editorial Story** | **Staggered Zig-Zag Sequence** | Implicit / Section spacing | Stack text-then-image vertically |

### Step Numbering vs. Icon Badges
- **Use Numbers (1, 2, 3):** When the sequence MUST be performed in strict order (e.g., account setup or deployment steps).
- **Use Icons (Plug, Gear, Rocket):** When steps represent independent feature pillars or optional workflow phases.

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA):**
  - **SC 1.4.3 Contrast:** Step numbers, headers, and descriptions must satisfy at least **4.5:1** contrast ratio against background surfaces. Connector lines must meet at least **3:1** graphical contrast against background.
  - **SC 1.3.1 Info and Relationships:** Sequential processes MUST use semantic `<ol>` and `<li>` elements so assistive technology announces total step count and current index (e.g., "List item 1 of 4").
  - **SC 2.4.7 Focus Visible:** Interactive step triggers must feature unclipped focus indicators with ≥3:1 contrast against surrounding surfaces.
  - **SC 2.5.8 Target Size:** Interactive step tabs must measure at least **44x44px** (or minimum **24x24px** with padding).
- **Responsive Stacking:**
  - Layouts MUST NOT force horizontal scroll on viewports between 320px and 767px.
- **Text Measure:**
  - Step descriptions must maintain a measure between **35 and 60 characters per line** to maintain comfortable reading speed.

---

## Common Failure Patterns

- **Unstacked Horizontal Overflow on Mobile:** Forcing 4 horizontal columns on mobile, causing text truncation, illegible 8px font sizes, and horizontal scrollbars.
- **Floating Unanchored Connectors:** Using fixed pixel positions for connector lines that detach from step badges when text wraps or scales under text zoom.
- **Inaccessible Decorative Graphics:** Using raw image graphics containing baked-in text and numbers without structured HTML/CSS markup.
- **Ambiguous Reading Direction:** Placing staggered cards randomly without clear visual lines or numbers, confusing reading order.
- **Missing Tab Semantics on Clickable Steps:** Making step cards clickable to change media previews without adding `role="tab"`, `aria-selected`, or keyboard arrow navigation.

---

## Validation Criteria

- [ ] Process section uses semantic `<ol>` and `<li>` elements for sequential workflows.
- [ ] Step badges have a minimum contrast ratio of 4.5:1 for numbers and 3:1 for connector lines.
- [ ] Horizontal step chains convert cleanly to vertical stacked timelines on mobile viewports (< 768px).
- [ ] Connector lines scale dynamically with CSS grid/flexbox and do not detach from badges when text wraps.
- [ ] Interactive step triggers (tabbed workflows) support `Tab`, `Enter`, `Space`, and `Arrow` keys with explicit focus rings.
- [ ] Media previews paired with steps include meaningful `alt` text or `aria-hidden="true"` if purely decorative.
- [ ] Step descriptions maintain readable measure (35–60 characters) and minimum 15px font size.
