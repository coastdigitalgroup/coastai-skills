# Feature Section Layout & Interaction Rules

This reference guide establishes formal layout guidelines, media ratio rules, motion/animation behaviors, and WCAG AA accessibility standards for designing high-impact feature sections.

---

## 1. Feature Layout Archetypes & Spatial Matrix

### A. Alternating Zigzag Rows (Tier 1 Flagship Showcase)
- **Primary Purpose:** Core value proposition storytelling with visual media highlights.
- **Desktop Grid:** 2-column CSS Grid (`60:40` or `50:50` column split).
- **Column Gap:** Minimum `--space-l` (24px to 48px fluid).
- **Row Separation:** Fluid vertical gap of `--space-2xl` (64px to 112px fluid).
- **Media Alignment:** Vertical center alignment (`align-items: center`).
- **Mobile Stacking Rule:** Always collapse to 1 column (`1fr`) with text copy placed above visual media assets. Use CSS `order` property changes strictly within desktop media queries (`@media (min-width: 1024px)`) to visually swap columns without changing HTML DOM tree order.

### B. Interactive Feature Switcher (Tier 2 Category Exploration)
- **Primary Purpose:** High-density feature showcase for complex software platforms without inflating vertical page length.
- **Controller Orientation:**
  - **Horizontal Tab Bar:** Positioned top-aligned above visual panel. Best when tabs have short titles (< 3 words) and total 3 to 4 categories.
  - **Vertical Sidebar List:** Positioned left-aligned beside visual panel (30% controller / 70% viewport). Best for 4 to 6 features with short descriptions under each tab trigger.
- **Active State Tokens:** High-contrast indicator bar (`3px` solid accent), background fill tint, and bold title weight.
- **Mobile Adaptation:** On mobile (< 768px), convert horizontal tabs into a touch-scrollable snap list (`overflow-x: auto`) or collapse into an accessible vertical accordion.

### C. 3-Column Utility Feature Grid (Tier 3 Supporting Capabilities)
- **Primary Purpose:** Broad capability overview, integrations, and performance guarantees.
- **Desktop Grid:** 3 columns (`repeat(3, 1fr)`).
- **Tablet Grid:** 2 columns (`repeat(2, 1fr)`).
- **Mobile Grid:** 1 column (`1fr`) vertical stack.
- **Card Padding:** `--space-l` (24px).
- **Content Limits:** Icon/Badge + `H3` Title (max 4 words) + Body Copy (max 3 lines / ~25 words).

---

## 2. Visual Media Asset Aspect Ratios & Padding Rules

| Media Asset Type | Recommended Aspect Ratio | Border Radius | Padding & Container Style |
| :--- | :--- | :--- | :--- |
| **Desktop Software UI Mockup** | `16 / 10` or `16 / 9` | `12px` - `16px` | Subtle neutral border (`1px solid var(--color-border)`), soft shadow (`var(--shadow-sm)`), dark/light card fill. |
| **Mobile App UI Screenshot** | `9 / 16` or `3 / 4` | `16px` - `24px` | Render inside a centered mobile device frame mockup with `48px` surrounding breathing room padding. |
| **Abstract Vector / Icon Graphic** | `1 / 1` (Square) | `8px` - `12px` | Center aligned inside a subtle tinted background container (`var(--color-accent-bg)`). |
| **Interactive Canvas / Chart** | `4 / 3` or `16 / 10` | `12px` | High-contrast dark backdrop for data visualization legibility. |

---

## 3. Motion & Animation Standards

- **Entry Animations:** Keep subtle (`opacity: 0` to `1`, `transform: translateY(16px)` to `translateY(0)` over `300ms - 400ms`). Use `cubic-bezier(0.16, 1, 0.3, 1)` easing.
- **Tab Panel Transitions:** Instant DOM toggle (`display: none` / `hidden` attribute) or rapid fade (`150ms`). Avoid long sliding animations that delay access to tab content.
- **Auto-Play Video / WebP Previews:**
  - Videos must be muted (`muted`), looping (`loop`), and inline (`playsinline`).
  - Must provide a visible Pause/Play toggle button for WCAG 2.1 SC 2.2.2 (Pause, Stop, Hide).
- **Reduced Motion Overrides:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## 4. Accessibility Checklist (WCAG AA)

- [ ] **Contrast Minimums:** Text copy (`4.5:1`), large headings (`3:1`), UI icons and active tab borders (`3:1`).
- [ ] **Semantic Headings:** Section heading uses `<h2>`. Individual feature row and card titles use `<h3>` in logical sequential order.
- [ ] **Tab Keyboard Mechanics:**
  - Tab list container has `role="tablist"`.
  - Tab controls use `<button role="tab">` with `aria-selected="true|false"` and `aria-controls="panel-id"`.
  - Focused tab manages `tabindex="0"` while inactive tabs use `tabindex="-1"` (roving tabindex).
  - Arrow keys (`ArrowRight`, `ArrowLeft`, `ArrowDown`, `ArrowUp`) navigate focus between tabs smoothly.
- [ ] **Focus Indicators:** Interactive triggers display a non-clipped focus ring meeting WCAG 2.2 SC 2.4.13 standards.
- [ ] **Image Alt Text:** Visual screenshots have descriptive `alt` attributes explaining the feature context, or `alt=""` if purely decorative.
