# Process Layout and Connector Reference Guidelines

This reference guide provides exact spatial formulas, geometry specifications, typography scales, responsive stacking rules, and WCAG AA accessibility metrics for designing "How It Works" and product workflow sections.

---

## 1. Spatial Geometry and Connector Track Rules

### Connector Line Dimensions & Positioning

| Connector Type | Thickness | Track Style | Color Token | Alignment Metric |
| :--- | :--- | :--- | :--- | :--- |
| **Linear Horizontal Track** | `2px` | Solid or Dashed (`stroke-dasharray: 6 4`) | `var(--color-border-subtle)` (Min 3:1 non-text contrast) | Centered to badge vertical midpoint (`top: calc(badge_height / 2)`) |
| **Vertical Axis Line** | `2px`–`3px` | Continuous Solid | `var(--color-border)` | Left-aligned to badge center (`left: 20px` or `24px`) |
| **Interactive Progress Bar** | `4px` | Solid Primary Accent | `var(--color-primary)` | Anchored along top or left tab edge |

### Responsive Hiding Rules for Connectors
- **Horizontal Connectors:** Must feature `@media (max-width: 767px) { display: none; }` to prevent horizontal line slashes across stacked vertical content.
- **Vertical Connectors:** Converted to a continuous left border (`border-left: 2px solid var(--color-border)`) inside the step container on mobile viewports.

---

## 2. Step Badge Typography and Sizing Scale

| Viewport / Device | Badge Shape & Sizing | Text Sizing & Weight | Contrast Requirement |
| :--- | :--- | :--- | :--- |
| **Desktop (1024px+)** | `40x40px` Circle or `32px` Height Pill | `1rem` (16px) Bold / Semi-Condensed | 4.5:1 Minimum Contrast |
| **Tablet (768px - 1023px)**| `36x36px` Circle | `0.9375rem` (15px) Bold | 4.5:1 Minimum Contrast |
| **Mobile (< 768px)** | `32x32px` Circle | `0.875rem` (14px) Bold | 4.5:1 Minimum Contrast |

---

## 3. Media Asset Aspect Ratios and Framing

| Step Asset Type | Standard Aspect Ratio | Framing / Container Specification |
| :--- | :--- | :--- |
| **Desktop UI Screenshots** | `16:9` or `16:10` | `border-radius: 12px; border: 1px solid var(--color-border); box-shadow: var(--shadow-md)` |
| **Mobile App Mockups** | `9:16` | Contained inside mobile device frame (`max-width: 280px`) |
| **Spot Vector Illustrations** | `1:1` Square | Centered in `64x64px` or `80x80px` soft-tinted backdrop |
| **Looping Video Previews** | `16:9` | `<video autoplay loop muted playsinline>` with explicit width/height attributes |

---

## 4. WCAG 2.1 / 2.2 AA Accessibility Checklist

### Contrast & Visual Hierarchy
- [ ] **SC 1.4.3 Contrast (Minimum):** Step titles (`<h3>`), body text, and tab labels achieve at least **4.5:1** contrast against backgrounds.
- [ ] **SC 1.4.11 Non-Text Contrast:** Step badges, active borders, and focus rings achieve at least **3:1** contrast against page surfaces.
- [ ] **SC 2.4.7 Focus Visible:** Interactive step triggers and tabs render an unclipped 2px focus ring (`outline: 2px solid var(--color-focus); outline-offset: 2px`).

### Semantics & Screen Readers
- [ ] **Section Labeling:** Section uses `<section aria-labelledby="process-heading">`.
- [ ] **Ordered Step List:** Static linear steps use semantic `<ol>` and `<li>` markup.
- [ ] **Tablist & Tabpanel:** Interactive step switchers use `role="tablist"`, `role="tab"`, and `role="tabpanel"`.
- [ ] **Live Announcements:** Step switching updates an `aria-live="polite"` region to inform screen reader users of preview changes.

---

## 5. Responsive Breakpoint Adaptation Matrix

```text
DESKTOP (>= 1024px)     ---> TABLET (768px - 1023px)  ---> MOBILE (< 768px)
-----------------------------------------------------------------------------------
3-Column Horizontal          2-Column Grid or 2x2          1-Column Vertical Stack
Zig-Zag Alternating 2-Col    2-Column Vertical             1-Column Stack (Uniform Order)
Split Tabbed Switcher        Stacked Tabs above Preview    1-Column Stacked Accordion
```
