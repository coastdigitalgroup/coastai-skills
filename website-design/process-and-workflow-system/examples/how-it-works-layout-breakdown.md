# B2B SaaS "How It Works" Process Layout Breakdown

This example demonstrates how to apply the **Process and Workflow Design System** to engineer a high-converting, accessible "How It Works" section for a B2B SaaS product called **WorkflowPulse** (an automated enterprise workflow orchestration platform).

---

## 1. Design Problem & Goals

### The Problem
WorkflowPulse provides complex workflow automation across multiple backend systems (CRMs, ERPs, databases, and LLM webhooks). Prospective enterprise buyers frequently struggle to understand how the platform fits into their existing tech stack, assuming implementation takes months.

### The Objective
Design a scannable, visually compelling 4-step "How It Works" section for the homepage and product tour page that demonstrates a 15-minute onboarding timeline:
1. **Connect Infrastructure** (OAuth / API key ingestion)
2. **Define Visual Rules** (Drag-and-drop triggers & conditional logic)
3. **Simulate & Test** (Live dry-run sandbox)
4. **Deploy & Monitor** (Automated production execution + real-time alerts)

---

## 2. Desktop Layout Grid Blueprint (1024px+)

The desktop layout utilizes a **4-column horizontal step row architecture** backed by a continuous CSS connector line.

```text
+-------------------------------------------------------------------------------------------------------------------+
| SECTION HEADER: "From Setup to Automation in 4 Simple Steps"                                                     |
| SUBTITLE: "Connect your existing tools and launch automated workflows in under 15 minutes."                      |
|                                                                                                                   |
| [==================================== CONTINUOUS CONNECTOR LINE ================================================] |
|                                                                                                                   |
|  +------------------------+  +------------------------+  +------------------------+  +------------------------+  |
|  | ( 01 )                 |  | ( 02 )                 |  | ( 03 )                 |  | ( 04 )                 |  |
|  | Connect Infrastructure |  | Define Visual Rules    |  | Simulate & Test        |  | Deploy & Monitor       |  |
|  |                        |  |                        |  |                        |  |                        |  |
|  | Authenticate CRMs,     |  | Build triggers and     |  | Run instant dry-runs   |  | Launch live workflows  |  |
|  | ERPs, and databases in |  | conditional filters    |  | against real data with |  | with automated latency |  |
|  | 2 clicks via pre-built |  | using our no-code      |  | complete error logs    |  | monitoring and Slack   |  |
|  | connectors.            |  | drag-and-drop canvas.  |  | and trace inspection.  |  | alerts.                |  |
|  |                        |  |                        |  |                        |  |                        |  |
|  | [ UI Preview Card 1 ]  |  | [ UI Preview Card 2 ]  |  | [ UI Preview Card 3 ]  |  | [ UI Preview Card 4 ]  |  |
|  +------------------------+  +------------------------+  +------------------------+  +------------------------+  |
+-------------------------------------------------------------------------------------------------------------------+
```

### Spatial Grid Dimensions
- **Section Container Width:** `max-width: 1280px; padding: 0 var(--space-l);`
- **Grid Layout:** `display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; position: relative;`
- **Step Badge Diameter:** `48px` circular container (`width: 48px; height: 48px; border-radius: 50%;`).
- **Connector Line Placement:** `position: absolute; top: 24px; left: 10%; right: 10%; height: 2px; background: var(--color-primary-accent); z-index: 0;`

---

## 3. Step Node Anatomy & Micro-Styling

Each step item inside the `<ol>` list contains a structured card layout:

### Step Badge (Node Indicator)
- **Visual Style:** High-contrast solid primary indigo background (`#4F46E5`) with bold white monospace typography (`#FFFFFF`).
- **Text:** `"01"`, `"02"`, `"03"`, `"04"`.
- **Contrast Ratio:** White text on indigo fill achieves a **7.2:1** contrast ratio (exceeds WCAG AAA 7:1 requirements).
- **Z-Index:** Set to `z-index: 1` to float directly on top of the horizontal connector line.

### Card Content Stack
1. **Step Number Badge:** `48x48px` node centered or left-aligned above step header.
2. **Step Title (`<h3>`):** `font-size: 1.25rem; font-weight: 700; color: #0F172A; margin-top: 16px; margin-bottom: 8px;`.
3. **Descriptive Body (`<p>`):** `font-size: 0.9375rem; line-height: 1.6; color: #475569;`.
4. **UI Preview Graphic (`<div>`):** Embedded visual snippet showing a high-fidelity mock interface component (e.g., API authorization badge, drag-and-drop node diagram, json payload inspector, latency gauge).

---

## 4. Responsive Viewport Adaptation Plan

### Desktop Viewport (`> 1024px`)
- **Layout:** 4-column horizontal grid (`grid-template-columns: repeat(4, 1fr)`).
- **Connector:** Horizontal line spanning columns across the midpoint of the step badges.
- **Card Aspect:** Equal height stretch cards (`align-items: stretch`).

### Tablet Viewport (`640px - 1024px`)
- **Layout:** 2-column x 2-row grid (`grid-template-columns: repeat(2, 1fr); gap: 32px;`).
- **Connector Transformation:** The single horizontal line transforms into two row connector segments or subtle arrow badges pointing from Step 1 -> Step 2 and Step 3 -> Step 4.

### Mobile Viewport (`< 640px`)
- **Layout:** 1-column vertical stack (`grid-template-columns: 1fr; gap: 32px;`).
- **Connector Transformation:**
  - Horizontal lines are hidden via media query (`display: none`).
  - A left-aligned vertical spine line (`width: 2px; background: var(--color-border); position: absolute; left: 23px; top: 0; bottom: 0;`) connects step badges vertically.
  - Card content shifts to flex row layout with node badge on the left and text content on the right (`display: flex; gap: 16px;`).

```text
MOBILE VERTICAL STACK (< 640px)
+-------------------------------------------------------------+
|  ( 01 )  Connect Infrastructure                             |
|    |     Authenticate CRMs, ERPs, and databases...         |
|    |                                                        |
|  ( 02 )  Define Visual Rules                                |
|    |     Build triggers and conditional filters...          |
|    |                                                        |
|  ( 03 )  Simulate & Test                                    |
|    |     Run instant dry-runs against real data...          |
|    |                                                        |
|  ( 04 )  Deploy & Monitor                                   |
|          Launch live workflows with real-time alerts...     |
+-------------------------------------------------------------+
```

---

## 5. Accessibility & Semantic HTML Mapping

The HTML structure leverages semantic `<ol>` and `<li>` elements to ensure screen readers announce sequential relationships, total step counts, and current step numbers automatically.

```html
<section class="process-section" aria-labelledby="process-heading">
  <div class="process-section__container">

    <!-- Section Header -->
    <header class="process-section__header">
      <p class="process-section__kicker">Seamless Onboarding</p>
      <h2 id="process-heading" class="process-section__title">
        From Setup to Automation in 4 Simple Steps
      </h2>
      <p class="process-section__subtitle">
        Connect your existing tools and launch automated workflows in under 15 minutes.
      </p>
    </header>

    <!-- Semantic Process List -->
    <ol class="process-grid" role="list">

      <!-- Step 01 -->
      <li class="process-card">
        <div class="process-card__node-wrapper">
          <span class="process-card__node" aria-hidden="true">01</span>
          <span class="sr-only">Step 1 of 4:</span>
        </div>
        <div class="process-card__content">
          <h3 class="process-card__title">Connect Infrastructure</h3>
          <p class="process-card__description">
            Authenticate CRMs, ERPs, and databases in 2 clicks via pre-built OAuth and API connectors.
          </p>
          <div class="process-card__media" aria-hidden="true">
            <svg class="preview-icon"><!-- Connector SVG Graphic --></svg>
          </div>
        </div>
      </li>

      <!-- Step 02 -->
      <li class="process-card">
        <div class="process-card__node-wrapper">
          <span class="process-card__node" aria-hidden="true">02</span>
          <span class="sr-only">Step 2 of 4:</span>
        </div>
        <div class="process-card__content">
          <h3 class="process-card__title">Define Visual Rules</h3>
          <p class="process-card__description">
            Build triggers and conditional filters using our intuitive no-code drag-and-drop canvas.
          </p>
          <div class="process-card__media" aria-hidden="true">
            <svg class="preview-icon"><!-- Node Diagram SVG Graphic --></svg>
          </div>
        </div>
      </li>

      <!-- Step 03 -->
      <li class="process-card">
        <div class="process-card__node-wrapper">
          <span class="process-card__node" aria-hidden="true">03</span>
          <span class="sr-only">Step 3 of 4:</span>
        </div>
        <div class="process-card__content">
          <h3 class="process-card__title">Simulate & Test</h3>
          <p class="process-card__description">
            Run instant dry-runs against real sandbox data with complete error logs and trace inspection.
          </p>
          <div class="process-card__media" aria-hidden="true">
            <svg class="preview-icon"><!-- Sandbox Trace SVG Graphic --></svg>
          </div>
        </div>
      </li>

      <!-- Step 04 -->
      <li class="process-card">
        <div class="process-card__node-wrapper">
          <span class="process-card__node" aria-hidden="true">04</span>
          <span class="sr-only">Step 4 of 4:</span>
        </div>
        <div class="process-card__content">
          <h3 class="process-card__title">Deploy & Monitor</h3>
          <p class="process-card__description">
            Launch live workflows with automated execution, latency monitoring, and Slack alert integrations.
          </p>
          <div class="process-card__media" aria-hidden="true">
            <svg class="preview-icon"><!-- Alert Radar SVG Graphic --></svg>
          </div>
        </div>
      </li>

    </ol>
  </div>
</section>
```

### Screen Reader Walkthrough Strategy
1. **Landmark Announcement:** Screen reader announces: *"From Setup to Automation in 4 Simple Steps, region"*.
2. **List Context:** Screen reader announces: *"List, 4 items"*.
3. **Step Item Announcement:** Reads `"Step 1 of 4: Connect Infrastructure. Authenticate CRMs, ERPs, and databases..."`.
4. **Decorative Graphics:** SVG preview graphics have `aria-hidden="true"` so screen reader users are not forced to listen to redundant visual code strings.
