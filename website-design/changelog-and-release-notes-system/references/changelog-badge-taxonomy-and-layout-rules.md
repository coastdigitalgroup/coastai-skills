# Changelog Badge Taxonomy, Layout & Accessibility Rules

This reference guide details color contrast requirements, typography scales, badge taxonomies, spatial layout rules, and WCAG AA accessibility standards for implementing the **Changelog and Release Notes System**.

---

## 1. Change Badge Taxonomy & Color Pairings

To ensure instant scannability and compliance with **WCAG 2.1 AA SC 1.4.3 (Contrast Minimum $\ge$ 4.5:1)**, change classification badges must adhere to explicit background and text color tokens.

### Token Specification Table

| Tag Type | Light Mode Background Tint | Light Mode Text Color | Dark Mode Background Tint | Dark Mode Text Color | Minimum WCAG AA Contrast |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`Added`** | `rgba(16, 185, 129, 0.12)` | `#047857` (Emerald 700) | `rgba(16, 185, 129, 0.22)` | `#34D399` (Emerald 400) | **5.2:1** (Light) / **6.1:1** (Dark) |
| **`Improved`** | `rgba(59, 130, 246, 0.12)` | `#1D4ED8` (Blue 700) | `rgba(59, 130, 246, 0.22)` | `#60A5FA` (Blue 400) | **4.8:1** (Light) / **5.8:1** (Dark) |
| **`Fixed`** | `rgba(245, 158, 11, 0.12)` | `#B45309` (Amber 700) | `rgba(245, 158, 11, 0.22)` | `#FBBF24` (Amber 400) | **4.6:1** (Light) / **6.5:1** (Dark) |
| **`Security`** | `rgba(139, 92, 246, 0.12)` | `#6D28D9` (Purple 700) | `rgba(139, 92, 246, 0.22)` | `#A78BFA` (Purple 400) | **5.1:1** (Light) / **5.9:1** (Dark) |
| **`Deprecated`** | `rgba(239, 68, 68, 0.12)` | `#B91C1C` (Red 700) | `rgba(239, 68, 68, 0.22)` | `#F87171` (Red 400) | **5.4:1** (Light) / **5.7:1** (Dark) |

### Non-Color Dependency Rule (WCAG SC 1.4.1)
Color MUST NOT be the sole indicator of change type. Every badge MUST include explicit, readable text (`Added`, `Fixed`, `Security`) or distinct icons. When forced colors or high-contrast mode is enabled, badges MUST include a visible 1px border (`border: 1px solid CanvasText`).

---

## 2. Typography Hierarchy & Spacing Grid

| Element | CSS Property / Token | Metric Value | Notes |
| :--- | :--- | :--- | :--- |
| **Page Header Title** | `font-size` / `font-weight` | `2.25rem` (36px) / `800` | Section headline on `/changelog` page. |
| **Entry Title (`<h2>`)** | `font-size` / `font-weight` | `1.375rem` (22px) / `700` | Primary title for each release article. |
| **Version Badge** | `font-family` / `font-size` | Monospace / `0.75rem` (12px) | `font-weight: 700`, `letter-spacing: 0.025em`. |
| **Date Stamp (`<time>`)** | `font-size` / `color` | `0.875rem` (14px) / `var(--text-muted)` | Semantically wrapped in `<time datetime="YYYY-MM-DD">`. |
| **Body Paragraphs** | `font-size` / `line-height` | `0.95rem` (15.2px) / `1.6` | Constrained to 65–75 characters per line (`ch`). |
| **Code References** | `font-family` / `background` | Monospace / `var(--bg-subtle)` | Inline code tags (`<code>`). |

---

## 3. Spatial Timeline Grid Rules

1. **Timeline Spine Line:** `2px solid var(--border-color)` placed vertically at `170px` from the left container edge on viewports $\ge$ 768px.
2. **Node Bullet Dot:** `12px x 12px` circle with `3px solid var(--primary-accent)`, absolutely positioned at `right: -25px` relative to the left metadata rail.
3. **Card Horizontal Gap:** `2rem` (32px) grid gap between metadata date column and card body container.
4. **Card Padding:** `1.75rem` (28px) interior padding on desktop; `1.25rem` (20px) on mobile viewports.
5. **Mobile Collapse:** On screens $< 768px$, hide the vertical timeline spine line and stack metadata vertically above the release card.

---

## 4. Accessibility & ARIA Specifications

- **Semantic HTML5 Wrapper:**
  ```html
  <main class="timeline-feed">
    <article class="release-entry" aria-labelledby="rel-title-1">
      <h2 id="rel-title-1">Dark Mode Release</h2>
      ...
    </article>
  </main>
  ```
- **Filter Announcement Live Region:**
  ```html
  <div class="sr-only" aria-live="polite" id="filter-status">
    Showing 3 releases matching tag "Security".
  </div>
  ```
- **Keyboard Focus Management:**
  - Interactive filter buttons MUST use `aria-pressed="true|false"`.
  - All buttons and links must feature a 2px offset focus ring (`outline: 2px solid var(--focus-ring); outline-offset: 2px`).
  - In-app "What's New" drawers MUST trap keyboard focus and dismiss cleanly via `Escape`.
