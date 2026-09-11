# Product Variant Selection Optimization Audit Checklist & Scoring System

This diagnostic checklist and scoring framework is designed to audit, evaluate, and optimize product variant selection controls across Product Detail Pages (PDPs), quick-view modals, and cart drawers.

Use this template to identify UX friction, stock communication breaks, mobile touch target failures, price delta concealment, and image gallery synchronization gaps.

---

## Audit Scoring Overview

Evaluate each audit criteria on a **0 to 2** point scale:
- **0 Points = Non-existent / Severely Flawed:** High friction, native dropdowns, late errors, missing image sync, hidden prices.
- **1 Point = Partially Implemented:** Basic swatches or pills present, but missing cross-attribute matrix logic, OOS back-in-stock capture, or mobile ergonomics.
- **2 Points = Fully Optimized:** Flawless visual swatches, proactive OOS signaling, upfront price deltas, synchronized image galleries, pre-selected default states, and 44px+ touch targets.

**Total Diagnostic Score:** Out of **40 Maximum Points**
- **32–40 Points:** Excellent (High-Converting Variant Experience)
- **22–31 Points:** Moderate Friction (Optimization Required — Moderate ATC Loss)
- **0–21 Points:** Critical Friction (Immediate Overhaul Needed — High Cart Abandonment & Misorders)

---

## Part 1: Control Types & Visual Swatch Experience (10 Points)

| # | Diagnostic Audit Criteria | Score (0-2) | Notes & Priority Action |
| :--- | :--- | :--- | :--- |
| **1.1** | **No Native Dropdowns for $\le 7$ Options:** Primary attributes (Color, Size, Material, Style) use visible swatches or pill buttons rather than nested `<select>` dropdowns. | `[  ]` | |
| **1.2** | **Visual Image Swatches for Colors/Textures:** Color options use high-resolution texture/pattern images rather than flat CSS hex codes or text-only pills. | `[  ]` | |
| **1.3** | **Selected State Labeling:** Header clearly displays the active selection text next to the category label (e.g., `Color: Midnight Navy` rather than just `Color`). | `[  ]` | |
| **1.4** | **Swatch Hover / Focus Tooltips:** Hovering or focusing on a swatch temporarily displays the swatch name without requiring a click. | `[  ]` | |
| **1.5** | **Distinct Active Border / Ring:** Selected swatches and pills feature high-contrast visual focus rings (minimum 3:1 contrast ratio) to unambiguously signal active state. | `[  ]` | |

---

## Part 2: Out-of-Stock (OOS) & Matrix Dependency Logic (10 Points)

| # | Diagnostic Audit Criteria | Score (0-2) | Notes & Priority Action |
| :--- | :--- | :--- | :--- |
| **2.1** | **Cross-Attribute Dependency Filtering:** Selecting Color A instantly updates available Size options (greying out or striking through sizes that are unavailable in Color A). | `[  ]` | |
| **2.2** | **Zero Late Error Messages:** The UI prevents clicking "Add to Cart" on an invalid SKU combination. No red error banners appear after tapping ATC. | `[  ]` | |
| **2.3** | **Proactive OOS Visual Indicators:** Unavailable variants are clearly differentiated via a diagonal strike-through, dashed border, or 40% opacity while remaining clickable. | `[  ]` | |
| **2.4** | **Interactive Back-in-Stock Capture:** Clicking an OOS variant opens a single-step modal/drawer to capture the customer's Email/SMS for replenishment alerts. | `[  ]` | |
| **2.5** | **Low-Stock Scarcity Signals:** Variants with low inventory (e.g., $\le 3$ items left) display subtle microcopy (e.g., *"Only 2 left in Size M"*) directly near the selector. | `[  ]` | |

---

## Part 3: Dynamic Pricing & Savings Transparency (8 Points)

| # | Diagnostic Audit Criteria | Score (0-2) | Notes & Priority Action |
| :--- | :--- | :--- | :--- |
| **3.1** | **Upfront Price Delta Display:** Premium variant pills clearly display price add-ons before selection (e.g., `Gore-Tex Leather [+$30]` or `1TB Storage [$1,199]`). | `[  ]` | |
| **3.2** | **Real-Time Price Animate Update:** Selecting a higher-priced variant instantly updates the main PDP price display without a page refresh or lag. | `[  ]` | |
| **3.3** | **Bundle Savings Badges:** Quantity/pack variants clearly state per-unit price and percentage savings (e.g., `3-Pack — $75 ($25/unit) — SAVE 17%`). | `[  ]` | |
| **3.4** | **Cart & Sticky Bar Price Sync:** Selected variant price and discount modifiers pass seamlessly to the sticky CTA bar, cart drawer, and express checkout buttons. | `[  ]` | |

---

## Part 4: Media Gallery & Touch Ergonomics (12 Points)

| # | Diagnostic Audit Criteria | Score (0-2) | Notes & Priority Action |
| :--- | :--- | :--- | :--- |
| **4.1** | **Gallery Color Filter Sync:** Tapping a color swatch instantly switches or filters the main product carousel to display images of that specific color variant. | `[  ]` | |
| **4.2** | **Mobile Touch Targets ($\ge 44 \times 44\text{px}$):** All swatches, pill buttons, and segmented controls have an interactive target area of at least 44×44px on mobile viewports. | `[  ]` | |
| **4.3** | **Minimum Swatch Spacing ($\ge 8\text{px}$):** Adjacent swatches have at least 8px padding/margin between target boundaries to prevent accidental mis-taps. | `[  ]` | |
| **4.4** | **Pre-Selected Default State:** The PDP loads with a valid, high-converting, fully in-stock variant pre-selected so "Add to Cart" is immediately clickable. | `[  ]` | |
| **4.5** | **Inline Size Guide Link:** Size selectors include a direct link/trigger (`Size Guide`) positioned in close visual proximity to the size pills. | `[  ]` | |
| **4.6** | **Mobile Sticky Drawer / Bottom Sheet:** For complex products ($3+$ attributes), tapping "Select Options" on mobile opens a smooth bottom sheet drawer with all controls. | `[  ]` | |

---

## Diagnostic Audit Summary & Action Plan

```text
Product Name / URL: __________________________________________________
Auditor Name:       __________________________________________________
Date of Audit:      ____________________

TOTAL SCORE: _______ / 40 Points

Primary Friction Points Identified:
1. ____________________________________________________________________
2. ____________________________________________________________________
3. ____________________________________________________________________

Priority Action Items:
[ ] Action Item 1: Replace native dropdowns with segmented pill buttons.
[ ] Action Item 2: Wire cross-attribute matrix stock dependency logic.
[ ] Action Item 3: Add upfront price delta badges (`+$XX`) on variant chips.
[ ] Action Item 4: Connect color swatches to PDP image gallery tag filters.
[ ] Action Item 5: Implement back-in-stock lead capture modal on OOS pills.
```
