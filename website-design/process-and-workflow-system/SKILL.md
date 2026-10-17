---
name: process-and-workflow-system
description:
  Design, organize, and layout-engineer "How It Works" sections, product onboarding flows, service timelines, and operational workflow showcases with clear sequential connectors, responsive layout adaptation, step node hierarchy, and WCAG AA accessibility.
---

# Process and Workflow Design System

## Purpose

The Process and Workflow Design System provides a standardized framework for designing, organizing, and layout-engineering "How It Works" sections, step-by-step product onboarding flows, service implementation timelines, and operational workflow showcases across marketing websites, SaaS landing pages, B2B product tours, and e-commerce explainer modules.

Without a dedicated design system for process and workflow representations, websites frequently suffer from cognitive overload, ambiguous visual direction, broken step connectors on mobile viewports, unreadable step badges, poor text contrast on decorative nodes, and inaccessible screen reader experiences where step sequence and relationships are lost in unstructured grids.

This system establishes spatial grid models, connector line engineering, responsive layout transformations (horizontal desktop step rows to vertical mobile stacked cards or interactive sticky scroll showcases), step node badge scales, typography hierarchy rules, and WCAG 2.2 AA accessibility standards (`<ol>`, `aria-label`, focus management).

## Use Cases

- **SaaS "How It Works" Landing Page Sections:** Explaining complex technical multi-step products (e.g., Connect API -> Configure Rules -> Automated Insights) to prospective buyers in 3–5 scannable steps.
- **B2B Service & Implementation Timelines:** Outlining onboarding milestones, audit processes, or enterprise deployment phases (e.g., Kickoff, Data Migration, Custom Integration, Go-Live) for enterprise prospects.
- **E-Commerce Order & Fulfillment Explainers:** Visualizing custom product creation, subscription cycles, or trade-in/rental flows (e.g., Pick Your Box -> Select Delivery Frequency -> Enjoy & Swap).
- **Interactive Product Workflow Demonstrations:** Creating sticky scroll or tabbed step showcases where clicking or scrolling through step nodes dynamically updates high-fidelity interface screenshots or animated video previews.
- **User Onboarding & Getting-Started Web Guides:** Structuring post-signup or trial activation web guides that walk new users through essential initial setup steps.

## When NOT to Use

- **In-App Multi-Step Form Execution:** For active, user-input forms requiring field validation, form submission state, and dynamic step navigation, use `stepper-and-wizard-system` or `form-design-system`.
- **System Activity & Audit Logs:** For chronological lists of user actions, system security audits, or historical change logs, use `timeline-activity-system`.
- **Interactive Tabbed Navigation:** When content sections represent independent, unordered categories without sequential progression or dependencies, use `tab-ui-system` or `segmented-control-system`.
- **Complex Decision Tree Flowcharts:** For branching logic diagrams with conditional splits, loops, and decision nodes, use interactive diagramming components or canvas visualizations rather than structured page layout sections.

## Inputs

1. **Process Content Inventory:** List of sequential steps including step numbers, titles, concise descriptive copy, and associated visual media (icons, interface screenshots, product illustrations, or code snippets).
2. **Target Section Length & Cognitive Scope:** Total number of steps (3–5 steps ideal for marketing sections; 6–8 steps for detailed onboarding timelines).
3. **Media Format & Complexity:** Pure text + icon badges vs. text + static illustration cards vs. sticky interactive media canvas.
4. **Layout Real Estate & Section Context:** Full-width marketing band, containerized card section, or split-screen scroll showcase.
5. **Brand Design System Tokens:** Primary accent color, surface neutral fills, typography scale (`clamp()` font sizing), border radius tokens, and spatial spacing tokens (`--space-s`, `--space-m`, `--space-l`).

## Outputs

1. **Process Structural Layout Pattern:** Selection of layout architecture (Horizontal Step Row, Alternating Zig-Zag Grid, Vertical Stacker Timeline, or Sticky Scroll Feature Stage).
2. **Step Node & Connector Geometry Spec:** Exact spatial dimensions for step badges (e.g., `40x40px` circular nodes), step numbers (`1`, `2`, `3`), and SVG/CSS connector lines (`2px` stroke, dashed/solid style, animated flow indicators).
3. **Responsive Transformation Rules:** Concrete layout adaptation behavior across Desktop (`> 1024px`), Tablet (`640px - 1024px`), and Mobile (`< 640px`) viewports.
4. **Semantic HTML & ARIA Specification:** Structural markup leveraging `<ol>`, `<li>`, `<article>`, and accessibility attributes to preserve step sequence for screen readers and assistive technologies.
5. **Visual Hierarchy & Typography Blueprint:** Standardized typography pairs, badge contrast ratios, and focal point alignment to guide eye scanning patterns.

---

## Workflow

### 1. Audit and Structure the Process Content
Before selecting visual layouts, clean and structure the underlying narrative:
- **Optimal Step Count:** Keep top-level marketing processes to **3 to 4 steps**. For complex services exceeding 5 steps, group steps into 3 overarching phases or use a vertical timeline layout.
- **Action-Oriented Titles:** Begin step titles with strong, clear imperative verbs (e.g., "1. Connect Your Store", "2. Set Automation Rules", "3. Watch Revenue Grow").
- **Concise Body Copy:** Limit body paragraphs to 15–30 words per step to ensure scannability and balanced column heights.

### 2. Select the Process Layout Architecture

Choose the layout architecture that best fits the step count, media complexity, and screen context:

```text
PATTERN A: HORIZONTAL STEP ROW (Desktop > 1024px, 3-4 Steps)
+-------------------------------------------------------------------+
|  ( 01 ) -----------> ( 02 ) -----------> ( 03 ) -----------> ( 04 )|
| Connect Store       Set Automation       Run Analytics       Scale |
| Import catalog      Define triggers      View dashboards     Grow  |
+-------------------------------------------------------------------+

PATTERN B: ALTERNATING ZIG-ZAG GRID (3-5 Steps with Rich Screenshots)
+-------------------------------------------------------------------+
|  [ Step 01 Copy & Badge ]    |   [ High-Fidelity UI Screenshot ]  |
|------------------------------+------------------------------------|
|  [ High-Fidelity UI Screenshot ] | [ Step 02 Copy & Badge ]       |
+-------------------------------------------------------------------+

PATTERN C: STICKY SCROLL FEATURE STAGE (Complex Product Demos)
+-------------------------------+-----------------------------------+
| [Sticky Left Column]          | [Scrolling Right Stage]           |
| (01) Connect API      [ACTIVE]| High-Res Interactive Graphic 1    |
| (02) Configure Rules          | High-Res Interactive Graphic 2    |
| (03) Launch Workflow          | High-Res Interactive Graphic 3    |
+-------------------------------+-----------------------------------+
```

1. **Horizontal Step Row (Linear 3–4 Steps):**
   - Best for concise landing page "How It Works" bands.
   - Equal-width columns connected by top or centered horizontal connector tracks.
2. **Alternating Zig-Zag Grid (3–5 Steps with Rich Media):**
   - Best when each step requires a detailed screenshot, video preview, or graphic illustration.
   - Alternates text-left/image-right and image-left/text-right to maintain vertical scanning rhythm.
3. **Vertical Timeline Stacker (5–8 Detailed Steps):**
   - Best for enterprise onboarding, service delivery roadmaps, or implementation guides.
   - Features a continuous vertical left-aligned or centered spine connector with expandable content cards.
4. **Sticky Scroll Showcase (Interactive Product Tours):**
   - Best for feature-dense SaaS products.
   - Left side stays fixed with highlighted step badges while the right side scrolls through rich interface previews.

### 3. Engineer Step Badges and Visual Connectors
Step badges and connectors define the sequential relationship. They must be responsive and visually distinct:

- **Step Node Badges:**
  - Standard circular dimensions: `40x40px` (desktop) / `32x32px` (mobile).
  - Typography inside node: `16px` bold sans-serif or mono numeric label (`01`, `02`, `03`).
  - Color Tokens: High-contrast primary accent background (`var(--color-primary)`) with white text (`#FFFFFF`) or high-contrast neutral outline.
- **Connector Tracks (Horizontal Row):**
  - Continuous CSS background line or SVG path positioned behind step nodes.
  - Line thickness: `2px` or `3px`.
  - Position: Aligned to the vertical midpoint of the step node badge (`top: 20px` for a `40px` node).
  - Gap spacing: Stop line `12px` before and after each node to prevent overlapping borders.
  - Animated option: Subtle gradient dash pulse (`stroke-dasharray`) indicating flow direction.

### 4. Implement Responsive Layout Transformations
Ensure seamless breakdown across device sizes:

- **Desktop (`> 1024px`):** Full multi-column grid with horizontal connectors or sticky scroll layout active.
- **Tablet (`640px - 1024px`):** 2-column grid wrap or compact horizontal scroll container with snap points (`scroll-snap-type: x mandatory`).
- **Mobile (`< 640px`):**
  - Horizontal rows automatically transform into a **vertical linear stack**.
  - Connectors shift from horizontal lines (`left -> right`) to vertical left-aligned spine connectors (`top -> bottom`).
  - Nodes align to the top-left of each step card (`flex-direction: row; gap: 16px;`).

### 5. Apply WCAG 2.2 AA Accessibility Protocols
- **Semantic List Structure:** Wrap steps in an ordered list (`<ol>`) to allow screen readers to announce "List item 1 of 4", preserving sequential context.
- **Heading Structure:** Use proper heading tags (`<h3>` or `<h4>`) for step titles within section landmarks (`<section aria-labelledby="process-heading">`).
- **Color Contrast:**
  - Step node numbers against node background: minimum **4.5:1** contrast ratio.
  - Connector lines against section background: minimum **3:1** non-text contrast ratio.
  - Body text against background: minimum **4.5:1** contrast ratio.
- **Decorative Elements:** Hide purely decorative connectors or directional arrows from screen readers using `aria-hidden="true"`.
- **Interactive Controls:** If step nodes are clickable buttons in a sticky or tabbed showcase, ensure keyboard focus (`:focus-visible`), explicit focus order, and `aria-selected="true"` / `aria-expanded="true"` attributes.

---

## Decision Rules

### Layout Architecture Selection Matrix

| Step Count | Media Type | Target Audience / Context | Recommended Layout Pattern |
| :--- | :--- | :--- | :--- |
| **3–4 Steps** | Simple Icons + Text | SaaS Landing Page Top Section | **Horizontal Step Row** |
| **3–4 Steps** | Large Interface Screenshots | Product Feature Deep Dive | **Alternating Zig-Zag Grid** |
| **4–6 Steps** | App Previews / Code Snippets | Technical SaaS Product Tour | **Sticky Scroll Showcase** |
| **5–8 Steps** | Detailed Descriptions + Timelines | B2B Enterprise Onboarding / Services | **Vertical Timeline Stacker** |
| **3–5 Steps** | Short Mobile Explainer | Mobile Web / E-Commerce Product Card | **Horizontal Scroll Snap Track** |

### Connector Style Guidelines

| Process Tone / Brand | Connector Style | CSS/SVG Implementation |
| :--- | :--- | :--- |
| **Modern SaaS / Tech** | Solid accent line with directional arrow | `height: 2px; background: var(--color-primary);` |
| **Methodical / Step-by-Step** | Dashed connector track | `border-top: 2px dashed var(--color-border);` |
| **Automated / Live Flow** | Animated gradient pulse line | SVG line with `stroke-dashoffset` keyframe animation |
| **Milestone / Service Roadmap** | Continuous left-aligned vertical spine | `position: absolute; left: 20px; width: 2px; height: 100%;` |

---

## Constraints

- **Accessibility (WCAG 2.2 AA):**
  - Ordered list `<ol>` MUST be used for sequential steps to convey logical sequence programmatically.
  - Text-to-background contrast MUST be at least **4.5:1** for step titles, step numbers, and body text.
  - Touch targets for any interactive step triggers MUST be at least **44x44px** on mobile viewports.
- **Responsiveness:**
  - Horizontal connector lines MUST NOT break layout, overflow screen boundaries, or overlap text on narrow screens.
  - Layouts MUST gracefully collapse to vertical stacks below `640px`.
- **Typography & Rhythm:**
  - Step title sizes MUST scale using responsive typography (`clamp(1.125rem, 2vw, 1.5rem)`).
  - Vertical spacing between stacked mobile steps MUST adhere to consistent grid tokens (minimum `24px` gap).

---

## Common Failure Patterns

- **Broken Mobile Connectors:** Leaving fixed horizontal connector lines active on mobile screens, resulting in stray floating lines intersecting stacked text.
- **Low-Contrast Step Badges:** Using pale primary tints (e.g., light blue background with white step numbers) that fail 4.5:1 contrast rules.
- **Unstructured Div Soup:** Building process steps using unstructured `<div>` tags instead of semantic `<ol>` and `<li>`, leaving screen reader users without step count or order context.
- **Irrelevant or Overwhelming Visuals:** Adding massive, unoptimized images to a simple 3-step explainer, causing layout shift and distraction from body copy.
- **Missing Directional Indicators:** Presenting steps in horizontal grids without explicit node numbers (`1`, `2`, `3`) or connector arrows, forcing users to guess reading order.
- **Fixed Column Spans:** Forcing 4 columns on tablet screens, causing text to wrap into illegible 2-word vertical strips.

---

## Validation Criteria

- [ ] Process steps use semantic `<ol>` and `<li>` elements enclosed in a section with an accessible heading.
- [ ] Layout transforms seamlessly from horizontal/grid on desktop to vertical stack on mobile (`< 640px`) without layout overflow.
- [ ] Step numbers and node badges achieve at least 4.5:1 contrast against their backgrounds.
- [ ] Connector lines hide or re-orient correctly when switching between desktop and mobile viewports.
- [ ] All step titles use responsive typography (`clamp()`) and maintain consistent vertical rhythm.
- [ ] Purely decorative connector graphics and SVG arrows are hidden from assistive technology via `aria-hidden="true"`.
- [ ] Interactive step nodes (if present in sticky or tabbed showcases) are keyboard focusable and support standard key activation (`Enter`/`Space`).
