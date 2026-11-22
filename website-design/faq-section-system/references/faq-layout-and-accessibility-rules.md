# FAQ Layout and Accessibility Rules

This reference outlines structural design guidelines, spacing rhythms, layout options, and WCAG AA accessibility requirements for implementing FAQ sections and help modules.

---

## 1. Spatial Rhythms & Typography Scale

### Section Container Metrics
- **Section Vertical Padding:** `4rem` (64px) to `6rem` (96px) on desktop; `2.5rem` (40px) on mobile.
- **Max Width Bounds:**
  - *Single-Column Layout:* `max-width: 800px` (50rem).
  - *Split 2-Column Layout:* `max-width: 1200px` (75rem).
- **Inter-Item Vertical Gap:** `12px` to `16px` margin/gap between individual accordion containers.

### Typography Hierarchy Tokens
- **Section Title (`h2`):** `2rem`–`2.5rem` (32px–40px), `font-weight: 700`–`800`, `line-height: 1.2`.
- **Question Header (`summary` / `h3`):** `1.125rem`–`1.25rem` (18px–20px), `font-weight: 600`, `line-height: 1.4`.
- **Answer Body Text (`p`, `li`):** `1rem` (16px), `line-height: 1.625`, `color: var(--text-muted)`.
- **Category Filter Chips:** `0.875rem` (14px), `font-weight: 600`.

---

## 2. Layout Structure Patterns Comparison

| Feature / Metric | Pattern A: Single-Column Centered | Pattern B: Split 2-Column Sidebar | Pattern C: Multi-Category Grid |
| :--- | :--- | :--- | :--- |
| **Optimal Question Count** | 1 – 8 Questions | 8 – 20 Questions | 12+ Questions |
| **Page Placement** | Pricing / Landing Page Heroes | PDPs & Comprehensive Landing Pages | Dedicated Help Center / Knowledge Hub |
| **Desktop Columns** | 1 Column (`800px` max) | 2 Columns (`280px` / `1fr`) | 2 or 3 Column Card Grid |
| **Mobile Adaptation** | Full width stacked | Collapses to 1-column stack | 1-column category cards |
| **Category Nav Style** | None | Sticky Left Sidebar / Pill Chips | Sub-section headings |

---

## 3. WCAG 2.1 / 2.2 AA Accessibility Requirements

### Keyboard Disclosure Semantics
- **Native HTML Mechanism (`<details>` & `<summary>`):**
  - `<summary>` acts as the native interactive button trigger.
  - Native browser focus ring is rendered on keyboard `Tab` navigation.
  - Pressing `Space` or `Enter` toggles the `open` state automatically.
- **Custom Button + Region ARIA Mechanism:**
  - Trigger element MUST be a `<button>` (not a `<div>` or `<span>`).
  - Set `aria-expanded="true|false"` dynamically on button toggle.
  - Set `aria-controls="panel-id"` pointing to the answer container ID.
  - Set `role="region"` and `aria-labelledby="button-id"` on the answer container.

### Contrast Ratios (WCAG SC 1.4.3)
- **Question Summary Text:** Minimum **4.5:1** contrast against background.
- **Answer Body Text:** Minimum **4.5:1** contrast against panel background.
- **Active Filter Pills:** Minimum **4.5:1** text contrast and **3:1** container boundary contrast against page background.
- **Focus Rings (WCAG SC 2.4.7):** Minimum **3:1** contrast against adjacent surface colors with minimum 2px thickness.

### Touch Target Sizing (WCAG SC 2.5.8)
- The interactive trigger area for opening each question row MUST span at least **48px** in vertical height (`min-height: 48px`).
- The click/tap hit box MUST span the entire horizontal width of the question container (not just the trailing chevron icon).
