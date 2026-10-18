# Process & Workflow Layout Breakdowns

This document presents realistic layout breakdowns demonstrating how to apply the **Process & Workflow System** across three distinct web design scenarios: a SaaS marketing landing page, an e-commerce fulfillment explainer, and an interactive enterprise product tour.

---

## Scenario 1: 3-Step Horizontal Linear Ribbon (SaaS Marketing Landing Page)

### Context & Goal
A SaaS analytics platform needs a "How It Works" section below the hero to demonstrate how fast developers can integrate the platform without complex backend setup.

### Visual ASCII Wireframe (Desktop Viewport)

```text
+---------------------------------------------------------------------------------------------------------+
|                                        SECTION HEADER                                                   |
|                             How CloudPulse Works in 3 Simple Steps                                      |
|                       Go from raw database logs to actionable dashboards in minutes.                    |
|                                                                                                         |
|   +--------------------------+    DASHED CONNECTOR    +--------------------------+    DASHED CONNECTOR   |
|   | [01] Connect Data        | ---------------------> | [02] Auto-Index Schema   | -------------------->|
|   |                          |                        |                          |                      |
|   | Add read-only PostgreSQL |                        | CloudPulse automatically |                      |
|   | or MySQL credentials.    |                        | infers schemas and keys. |                      |
|   | [CTA: View Docs →]       |                        | [Badge: Zero ETL]        |                      |
|   +--------------------------+                        +--------------------------+                      |
|                                                                                                         |
|   +--------------------------+                                                                          |
|   | [03] Query & Visualize   |                                                                          |
|   |                          |                                                                          |
|   | Build drag-and-drop      |                                                                          |
|   | charts with SQL/no-code. |                                                                          |
|   | [CTA: Explore Specs →]   |                                                                          |
|   +--------------------------+                                                                          |
+---------------------------------------------------------------------------------------------------------+
```

### Spatial Grid & Typography Specs

1. **Section Container:**
   - Width: `max-width: 1200px`, `margin-inline: auto`
   - Padding: `padding: 4rem 1.5rem` (`64px 24px`)
   - Background: `var(--surface-subtle)` (`#F8FAFC` light / `#0F172A` dark)
2. **Header Hierarchy:**
   - Heading (`h2`): `2rem` (`32px`), `font-weight: 700`, `letter-spacing: -0.02em`, `color: var(--text-heading)`.
   - Subtitle: `1.125rem` (`18px`), `line-height: 1.5`, `color: var(--text-muted)`, `max-width: 48ch`.
3. **Step Card Layout (Grid):**
   - Layout: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; position: relative;`
   - Card Surface: `background: var(--surface-card); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.75rem;`
   - Card Elevation: `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);`
4. **Step Badges & Connectors:**
   - Numeric Badge: `width: 42px; height: 42px; border-radius: 50%; background: var(--color-primary); color: #ffffff; font-weight: 700; display: flex; align-items: center; justify-content: center;`
   - Connector Line: `position: absolute; top: 38px; left: calc(33.33% - 1rem); width: calc(33.33% - 2rem); height: 2px; border-top: 2px dashed var(--border-strong); z-index: 1;`
   - Arrowhead: SVG arrow marker aligned at `right: 0` on the connector line.

### Responsive Mobile Adaptation (`< 768px`)

```text
+------------------------------------------+
|  How CloudPulse Works in 3 Simple Steps  |
|                                          |
|  [01] Connect Data                       |
|   |   Add read-only PostgreSQL or MySQL  |
|   |   credentials in under 60 seconds.   |
|   V                                      |
|  [02] Auto-Index Schema                  |
|   |   CloudPulse automatically infers    |
|   |   schemas, relationships, and keys.  |
|   V                                      |
|  [03] Query & Visualize                  |
|       Build drag-and-drop charts or write|
|       SQL queries instantly.             |
+------------------------------------------+
```

- Grid collapses from `repeat(3, 1fr)` to single column `1fr`.
- Horizontal SVG connectors are hidden (`display: none`).
- A vertical left border (`border-left: 2px dashed var(--color-primary)`) connects step badges down the left edge.

---

## Scenario 2: 4-Step 2x2 Connected Grid (E-Commerce Fulfillment Flow)

### Context & Goal
A custom furniture manufacture-to-order brand needs to explain its 4-step custom build process to set clear buyer expectations on timelines.

### Visual ASCII Wireframe (Desktop Viewport)

```text
+---------------------------------------------------------------------------------------------------------+
|                                      How Your Custom Table Is Built                                     |
|                                                                                                         |
|   +---------------------------------------+       HORIZONTAL CONNECTOR       +----------------------+   |
|   | STEP 01                               | -------------------------------> | STEP 02              |   |
|   | Select Timber & Specs                 |                                  | Precision 3D CAD     |   |
|   | Choose sustainably sourced oak,       |                                  | Our engineering team |   |
|   | walnut, or maple with custom dims.    |                                  | generates 3D renders.|   |
|   +---------------------------------------+                                  +----------------------+   |
|                       |                                                                  ^              |
|                       | VERTICAL CURVED CONNECTOR                                        |              |
|                       v                                                                  |              |
|   +---------------------------------------+       HORIZONTAL CONNECTOR                   |              |
|   | STEP 03                               | -------------------------------------------------+              |
|   | Hand-Crafted Artisan Joinery          |                                                             |
|   | Master woodworkers cut, join, sand,   |                                                             |
|   | and seal your table top and base.     |                                                             |
|   +---------------------------------------+                                                             |
+---------------------------------------------------------------------------------------------------------+
```

### Layout Specifications

1. **Grid Setup:** `display: grid; grid-template-columns: repeat(2, 1fr); gap: 2.5rem;`
2. **S-Curve Connector SVG:**
   - Rendered as an SVG overlay path (`stroke: var(--color-primary)`, `stroke-width: 2px`, `fill: none`, `stroke-dasharray: 6 4`).
   - Path routes from Step 1 right edge -> Step 2 left edge -> Step 2 bottom -> Step 3 bottom-right curve -> Step 4 left edge.
3. **Step Badge Styling:**
   - Pill Badge: `display: inline-block; padding: 4px 10px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; background: var(--primary-light); color: var(--primary-dark); border-radius: 999px; margin-bottom: 0.75rem;`

---

## Scenario 3: 4-Step Sticky-Scroll Interactive Showcase (Enterprise SaaS)

### Context & Goal
An enterprise CI/CD deployment platform uses an interactive split screen to demonstrate pipeline setup. As the user scrolls through text steps on the right, the UI preview mockup on the left dynamically updates to display corresponding code and deployment status screens.

### Visual ASCII Wireframe (Desktop Viewport)

```text
+---------------------------------------------------------------------------------------------------------+
|  STICKY LEFT COLUMN (FIXED PREVIEW)         |  SCROLLING RIGHT COLUMN (STEP CARDS)                      |
|  +---------------------------------------+  |  +----------------------------------------------------+   |
|  | SCREEN PREVIEW PANEL                  |  |  | [ACTIVE] STEP 01: Connect Repository               |   |
|  | +-----------------------------------+ |  |  | Authorize GitHub or GitLab with OAuth in 1 click.  |   |
|  | | git clone https://github.com/...  | |  |  | Automatically imports repositories and branches.  |   |
|  | | Repository linked successfully!    | |  |  +----------------------------------------------------+   |
|  | +-----------------------------------+ |  |                                                           |
|  | (Screen updates dynamically as step   |  |  +----------------------------------------------------+   |
|  |  comes into scroll focus)             |  |  | STEP 02: Define Pipeline Spec                      |   |
|  +---------------------------------------+  |  | Write a declarative .pipeline.yml or choose a template|   |
|                                             |  +----------------------------------------------------+   |
|                                             |                                                           |
|                                             |  +----------------------------------------------------+   |
|                                             |  | STEP 03: Execute Automated Tests                   |   |
|                                             |  | Run unit, integration, and security scans in parallel|   |
|                                             |  +----------------------------------------------------+   |
+---------------------------------------------------------------------------------------------------------+
```

### Technical Implementation & Interaction Rules

1. **Sticky Preview Container:**
   - CSS: `position: sticky; top: 5rem; height: calc(100vh - 10rem); display: flex; align-items: center; justify-content: center;`
2. **Scroll Trigger & State Sync:**
   - `IntersectionObserver` monitors step cards entering the viewport threshold (`rootMargin: "-40% 0px -40% 0px"`).
   - When Step N enters focus, `data-active-step="N"` is updated on the preview panel.
   - CSS transitions cross-fade the active screen image/code block (`opacity: 1; transition: opacity 300ms ease-in-out`).
3. **Accessibility Fallback:**
   - Screen reader users receive static fallback buttons (`<button aria-controls="preview-panel" aria-selected="true">`) enabling explicit keyboard activation without relying on scroll position.
