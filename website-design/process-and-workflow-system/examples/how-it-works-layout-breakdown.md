# Process & Workflow System - Layout Breakdown Examples

This document provides realistic page composition breakdowns and architectural case studies illustrating how the **Process & Workflow System** is applied across three distinct digital contexts: a B2B SaaS product landing page, an Enterprise Implementation timeline, and an E-commerce custom subscription service.

---

## Example 1: SaaS Product Landing Page - "3-Step Automated Analytics Pipeline"

### Scenario
An enterprise SaaS platform ("DataStream AI") needs a high-converting "How It Works" section on its primary landing page. The goal is to demystify complex real-time data ingestion and assure prospects that integration takes under 10 minutes.

### Selected Pattern
**Pattern A: Horizontal Node Chain (3 Steps with CSS Grid connectors)**

### Spatial Layout Blueprint & ASCII Diagram

```text
+---------------------------------------------------------------------------------------------------+
| SECTION HEADER                                                                                    |
| [ Eyebrow: SIMPLE INTEGRATION ]                                                                   |
| H2: From Zero to Insights in Three Easy Steps                                                    |
| Subtitle: No complex ETL required. Plug in your existing stack and query in real-time.          |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|  [STEP 1]                       [CONNECTOR LINE]       [STEP 2]              [CONNECTOR LINE]    [STEP 3]
|  +---------------------------+  =============>  +--------------------------+  =============>  +--------------------------+
|  |  (1) BADGE (44px Circle)  |                  | (2) BADGE (44px Circle)  |                  | (3) BADGE (44px Circle)  |
|  |  H3: Connect Data Sources |                  | H3: Configure AI Rules   |                  | H3: Stream Real-Time Dash|
|  |  Select from 50+ pre-built|                  | Set automated anomaly    |                  | Query instantly via SQL  |
|  |  connectors like Postgres,|                  | alerts and thresholds    |                  | or export live feeds to  |
|  |  Snowflake, and Stripe.   |                  | in our no-code builder.  |                  | BI dashboards.           |
|  |  [Badge: < 2 Mins]        |                  | [Badge: < 5 Mins]        |                  | [Badge: Instant]         |
|  +---------------------------+                  +--------------------------+                  +--------------------------+
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
```

### Component Specs & CSS Architecture

- **Grid Structure:**
  ```css
  .process-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-xl, 2rem);
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }
  ```
- **Badge Anatomy:**
  - Size: `44px x 44px` circular container (`border-radius: 50%`).
  - Fill: Primary Brand Tint (`var(--color-primary-subtle, #EFF6FF)`), Border `2px solid var(--color-primary, #2563EB)`.
  - Typography: `font-size: 1.125rem`, `font-weight: 700`, Color `#1E40AF`.
- **Connector Line Physics:**
  - Attached via CSS pseudo-element `::after` on `.process-node:not(:last-child)`.
  - Positioned at `top: 22px` (vertically centered against 44px badge).
  - Border style: `2px dashed var(--color-border-subtle, #CBD5E1)`.
  - Directional Arrow: Chevron SVG terminal node at `right: -12px`.
- **Responsive Stacking Strategy:**
  - On viewports `< 768px`:
    - Grid shifts to `grid-template-columns: 1fr`.
    - Horizontal connector lines convert to vertical connector lines on `.process-node::after` (`left: 21px; width: 2px; height: 100%`).
    - Flex direction shifts to horizontal row alignment for badge + text content.

---

## Example 2: B2B Enterprise Software - "Interactive Split-Media Workflow"

### Scenario
An enterprise developer security platform ("GuardRail") needs to showcase how security teams use its policy enforcement tool. Because each step involves a distinct dashboard interface, a static horizontal chain is insufficient.

### Selected Pattern
**Pattern B: Split Media + Tabbed Workflow (4 Steps)**

### Spatial Layout Blueprint & ASCII Diagram

```text
+---------------------------------------------------------------------------------------------------+
| SECTION HEADER                                                                                    |
| H2: How GuardRail Enforces Continuous Compliance                                                  |
+---------------------------------------------------------------------------------------------------+
| LEFT COLUMN: Interactive Step Selector (40% Width)  | RIGHT COLUMN: Live UI Preview Container (60% Width)|
|                                                     |                                                     |
| [TAB 1: ACTIVE]                                     | +-------------------------------------------------+ |
| (1) Code Repository Scan                            | | [UI PREVIEW: Repositories Dashboard]            | |
|     Deep AST scanning on every pull request to       | | +---------------------------------------------+ | |
|     catch secrets before merging.                   | | | PR #402: 0 Vulnerabilities Detected         | | |
|                                                     | | | [Status: Passed CI/CD Pipeline]             | | |
| [TAB 2: INACTIVE]                                   | | +---------------------------------------------+ | |
| (2) Policy Rule Customization                       | | Animated code diff & vulnerability scanner    | |
|                                                     | | screenshot.                                     | |
| [TAB 3: INACTIVE]                                   | |                                                 | |
| (3) Automated PR Remediation                        | |                                                 | |
|                                                     | |                                                 | |
| [TAB 4: INACTIVE]                                   | |                                                 | |
| (4) Executive Audit Reporting                       | +-------------------------------------------------+ |
+---------------------------------------------------------------------------------------------------+
```

### Component Specs & Accessibility Mapping

- **Accessibility Implementation (WAI-ARIA Tab Pattern):**
  - Left column container uses `role="tablist"` with `aria-label="GuardRail Workflow Steps"`.
  - Step selector items use `<button role="tab" id="step-tab-1" aria-selected="true" aria-controls="step-panel-1">`.
  - Right column media containers use `<div role="tabpanel" id="step-panel-1" aria-labelledby="step-tab-1">`.
- **Keyboard Interactivity:**
  - Focusable using `Tab`. Arrow keys (`DownArrow` / `UpArrow`) cycle active step tab.
  - Active step card features an illuminated primary left border indicator (`border-left: 4px solid var(--color-primary)`).
- **Responsive Stacking Strategy:**
  - On viewports `< 1024px`:
    - Layout converts to stacked column layout (`flex-direction: column`).
    - Tab bar converts to a horizontally scrollable pill strip (`overflow-x: auto; white-space: nowrap`).
    - Media panel container sits directly beneath the tab bar, auto-resizing images responsively.

---

## Example 3: E-Commerce Custom Service - "Coffee Subscription Journey"

### Scenario
A specialty coffee roaster ("BeanCraft") wants to guide prospective subscribers through custom box selection, roasting frequency, and delivery customization.

### Selected Pattern
**Pattern C: Staggered Feature Sequence (Zig-Zag 3 Rows)**

### Layout Composition Breakdown

```text
[ ROW 1 ]
+----------------------------------+   +----------------------------------+
| STEP 01                          |   | MEDIA / ILLUSTRATION             |
| H3: Choose Your Roast Profile    |   | Custom vector drawing of coffee  |
| Select light, medium, or dark    |   | beans and flavor notes chart.    |
| roasts, or let our master roaster|   |                                  |
| curate a surprise selection.     |   |                                  |
+----------------------------------+   +----------------------------------+

[ ROW 2 ]
+----------------------------------+   +----------------------------------+
| MEDIA / ILLUSTRATION             |   | STEP 02                          |
| Calendar illustration showing    |   | H3: Set Your Delivery Schedule   |
| flexible 1, 2, or 4-week delivery|   | Receive fresh roasts weekly,     |
| intervals with pause controls.   |   | bi-weekly, or monthly. Pause or  |
|                                  |   | skip anytime with 1-click.       |
+----------------------------------+   +----------------------------------+

[ ROW 3 ]
+----------------------------------+   +----------------------------------+
| STEP 03                          |   | MEDIA / ILLUSTRATION             |
| H3: Roasted Fresh & Delivered    |   | Eco-friendly shipping box with   |
| We roast within 24 hours of      |   | roast date stamp graphic.        |
| shipment. Peak freshness in      |   |                                  |
| every bag, guaranteed.           |   |                                  |
+----------------------------------+   +----------------------------------+
```

### Key Takeaways Across All Patterns

1. **Hierarchy First:** Always lead with a strong section title and clear step numbers.
2. **Dynamic Adaptation:** Never force multi-column horizontal layouts onto mobile screens.
3. **Semantic Integrity:** Use ordered lists (`<ol>`) for static steps and WAI-ARIA tabs (`role="tablist"`) for interactive previews.
