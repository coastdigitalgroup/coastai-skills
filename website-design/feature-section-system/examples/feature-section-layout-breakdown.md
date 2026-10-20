# Feature Section Layout Breakdown & Spatial Composition Guide

This example demonstrates how to apply the **Feature Section System** to design a high-converting, accessible product feature showcase for a SaaS platform ("PulseAnalytics").

---

## 1. Macro Section Architecture & Wireframe Breakdown

The section is composed of three distinct sub-patterns working in sequence:
1. **Section Header & Eyebrow Anchor**
2. **Tabbed Feature Switcher (Interactive Core Capabilities)**
3. **Alternating Zig-Zag Detail Showcase (Deep Dive Capabilities)**

```text
===================================================================================
[ SECTION HEADER & EYEBROW ANCHOR ]
===================================================================================
                                [ EYEBROW BADGE ]
                          INTELLIGENT DATA PLATFORM

                        [ MAIN SECTION HEADING (H2) ]
                  Turn Raw Metrics into Predictive Revenue

                       [ SECTION LEAD SUBTITLE ]
   Unify your customer data, automate cohort analytics, and trigger automated
   retention workflows in a single, lightning-fast workspace.

===================================================================================
[ SUB-PATTERN 1: TABBED FEATURE SWITCHER ]
===================================================================================
+---------------------------------------------------------------------------------+
| [Tab 1: Predictive Cohorts*]  [Tab 2: Smart Retention]  [Tab 3: Executive Hub] |
+---------------------------------------------------------------------------------+
| TAB PANEL (Active):                                                             |
| +--------------------------------------+ +------------------------------------+ |
| | Eyebrow: AUTOMATED INSIGHTS          | |                                    | |
| | Title (H3): AI Cohort Modeling       | | [ Interactive WebM Video / Mockup ] | |
| | Paragraph: Predict customer churn 90 | | Aspect Ratio: 16:9                | |
| | days before it happens using ML.     | | Dark Browser Frame Wrapper       | |
| |                                      | | Subtle Ambient Elevation Shadow  | |
| | * Real-time hazard score alerts      | | 1px Border Accent                | |
| | * 1-click automated winback flows    | |                                    | |
| | * Bi-directional CRM sync            | |                                    | |
| |                                      | |                                    | |
| | [ Primary CTA: Explore Cohorts -> ]  | |                                    | |
| +--------------------------------------+ +------------------------------------+ |
+---------------------------------------------------------------------------------+

===================================================================================
[ SUB-PATTERN 2: ALTERNATING ZIG-ZAG DETAIL SHOWCASE ]
===================================================================================

[ ROW 1: TEXT LEFT / MEDIA RIGHT ]
+----------------------------------------+ +------------------------------------+
| Eyebrow: CUSTOM EVENT TRACKING         | |                                    |
| Title (H3): Zero-Code Event Ingestion  | | [ Application Screenshot ]         |
| Paragraph: Track complex user actions  | | Aspect Ratio: 4:3                  |
| without waiting for engineering sprint | | Clean UI Frame + Light Shadow    |
| allocations.                           | | High-Contrast Micro Highlights   |
|                                        | |                                    |
| [✓] Autocapture click & scroll events  | |                                    |
| [✓] Automatic PII anonymization        | |                                    |
+----------------------------------------+ +------------------------------------+

[ ROW 2: MEDIA LEFT / TEXT RIGHT ]
+----------------------------------------+ +------------------------------------+
|                                        | | Eyebrow: REAL-TIME ALERTS          |
| [ Application Screenshot ]             | | Title (H3): Multi-Channel Alerts |
| Aspect Ratio: 4:3                      | | Paragraph: Get instant Slack and   |
| Clean UI Frame + Light Shadow          | | Email alerts when key health      |
| High-Contrast Micro Highlights         | | metrics cross your thresholds.     |
|                                        | |                                    |
|                                        | | [✓] Granular role permissions      |
|                                        | | [✓] Webhook & PagerDuty triggers   |
+----------------------------------------+ +------------------------------------+
```

---

## 2. Spatial Composition & Spacing Grid Rules

### Vertical & Horizontal Spacing Scale
- **Section Outer Container:** `max-width: 1280px` (`80rem`), centered with `margin-inline: auto`.
- **Section Block Padding:** `padding-block: clamp(3.5rem, 7vw, 7rem)` using fluid spacing to automatically scale between mobile devices and large desktop monitors.
- **Header Bottom Margin:** `margin-bottom: clamp(2.5rem, 5vw, 4.5rem)`.
- **Column Gap (Text to Media):** `gap: clamp(2rem, 4vw, 4rem)` (minimum 32px separation on desktop to prevent visual collision).
- **Row Gap in Zig-Zag Layout:** `margin-bottom: clamp(3.5rem, 6vw, 6rem)` between alternating feature rows.

---

## 3. Media Framing & Aspect Ratio Specifications

1. **Browser Frame Mockup Styling:**
   ```css
   .feature-media__container {
     position: relative;
     width: 100%;
     aspect-ratio: 16 / 9;
     border-radius: 12px;
     overflow: hidden;
     background-color: #0f172a; /* Slate 900 background for dark UI */
     border: 1px solid rgba(255, 255, 255, 0.1);
     box-shadow:
       0 20px 25px -5px rgba(0, 0, 0, 0.1),
       0 8px 10px -6px rgba(0, 0, 0, 0.1);
   }

   .feature-media__img {
     width: 100%;
     height: 100%;
     object-fit: cover;
     object-position: top left;
   }
   ```
2. **Text-Boundary Edge Prevention:**
   - Always apply a `1px` subtle border around screenshots (`border: 1px solid var(--border-subtle)`). Light screenshots placed on white section backgrounds without a border suffer from visual boundary erosion, making screenshot controls blend into page copy.

---

## 4. Mobile Reflow & Stacking Order Corrections

### The Mobile Stacking Problem
On mobile viewports (`< 768px`), standard CSS Grid or Flexbox zig-zag layouts stack elements in DOM order:
- Row 1: `[Text 1] -> [Media 1]`
- Row 2: `[Media 2] -> [Text 2]`

This causes `[Media 1]` and `[Media 2]` to stack directly back-to-back on mobile screens, creating a confusing reading experience with two images sitting together without narrative context.

### The Corrected Mobile Reflow Solution
Enforce `flex-direction: column` across all rows on mobile so that **Text always precedes Media** (or Media consistently precedes Text across all rows):

```css
/* Mobile Viewport (< 768px) */
.feature-row {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

/* Override desktop reverse ordering on mobile */
.feature-row--reverse {
  flex-direction: column; /* Ensure text remains first on mobile */
}

/* Desktop Viewport (>= 768px) */
@media (min-width: 768px) {
  .feature-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 3.5rem;
  }

  .feature-row--reverse .feature-row__content {
    grid-column: 2;
  }

  .feature-row--reverse .feature-row__media {
    grid-column: 1;
    grid-row: 1;
  }
}
```

---

## 5. Accessibility & Interaction Specifications (WCAG 2.1 AA)

1. **Heading Outline Structure:**
   - `<section aria-labelledby="feature-section-heading">`
   - `<h2 id="feature-section-heading">Turn Raw Metrics into Predictive Revenue</h2>`
   - Sub-feature titles use `<h3>` inside each feature article or tab panel.
2. **Tabbed Switcher ARIA Specs:**
   - Container: `<div role="tablist" aria-label="Core platform feature tabs">`
   - Tab 1: `<button role="tab" aria-selected="true" aria-controls="panel-cohorts" id="tab-cohorts">Predictive Cohorts</button>`
   - Panel 1: `<div role="tabpanel" id="panel-cohorts" aria-labelledby="tab-cohorts" tabindex="0">`
3. **Keyboard Arrow Key Navigation:**
   - Navigating tabs with `ArrowRight` / `ArrowLeft` automatically transfers focus to the next/previous tab trigger.
4. **Contrast Verification:**
   - Section title: `#0F172A` on `#FFFFFF` -> **15.8:1** (Passes AAA).
   - Eyebrow badge text: `#2563EB` on `#EFF6FF` -> **5.2:1** (Passes AA).
   - Body copy: `#334155` on `#FFFFFF` -> **9.1:1** (Passes AAA).
5. **Reduced Motion Safeguard:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     .feature-media__video,
     .tab-panel-transition {
       animation: none !important;
       transition: none !important;
     }
   }
   ```
