# Feature Layout and Interaction Rules Reference

This reference provides layout selection heuristics, spatial composition formulas, aspect ratio guidelines, responsive stacking rules, and WCAG AA accessibility standards for designing feature sections.

---

## 1. Feature Layout Pattern Selection Decision Matrix

| Layout Pattern | Optimal Feature Count | Content Complexity | Primary Visual Asset | Best Page Context |
| :--- | :--- | :--- | :--- | :--- |
| **Pattern A: Icon Grid** | 3 – 8 Features | Brief headline + 2 lines copy | 40px–48px Icon / SVG Badge | Platform overview, supporting utility features |
| **Pattern B: Alternating Zigzag** | 2 – 4 Features | Headline + Rich body + Bullet list + Micro-CTA | 16:9 or 16:10 Desktop App UI Screenshots | Primary homepage feature section, SaaS core value props |
| **Pattern C: Tabbed Switcher** | 3 – 5 Sub-Features | Headline + Subtext + Interactive link | Dynamic central UI preview / Canvas frame | Feature-rich dashboard sub-views, modular suites |
| **Pattern D: Sticky Scroll Showcase** | 3 – 5 Sequential Stages | Short narrative paragraph per stage | Pinned media asset transitioning on scroll | Product workflow walkthroughs, interactive stories |

---

## 2. Spatial Composition & Aspect Ratio Rules

### Container Max-Widths & Measure Limits
- **Section Max-Width:** `1280px` (or `80rem`) centered container measure.
- **Section Vertical Padding:**
  - Desktop (`≥1024px`): `5rem`–`6rem` (`80px`–`96px`) top and bottom padding.
  - Mobile (`<768px`): `3rem`–`3.5rem` (`48px`–`56px`) top and bottom padding.
- **Max Paragraph Measure:** Limit body text to `60ch`–`65ch` per line to ensure reading legibility.

### Aspect Ratio Heuristics for Visual Media

```text
[ 16:9 LANDSCAPE - Desktop Web App / Dashboard ]
+-------------------------------------------------+
| Aspect Ratio: 16 / 9 (or 16 / 10)               |
| Best for: Full web application screenshots      |
+-------------------------------------------------+

[ 4:3 CLASSIC - UI Component Crops & Cards ]
+-----------------------------------+
| Aspect Ratio: 4 / 3               |
| Best for: Focused modal/card UI   |
+-----------------------------------+

[ 9:16 PORTRAIT - Mobile App Interfaces ]
+-------------------+
| Aspect Ratio: 9/16|
| Best for: Mobile  |
| app screens       |
+-------------------+
```

- **Frame Framing & Depth Tokens:**
  - Border: `1px solid var(--color-border-subtle)` (`#E2E8F0` in light mode, `#334155` in dark mode).
  - Border Radius: `12px` or `16px`.
  - Box Shadow: Depth shadow `0 20px 25px -5px rgba(15, 23, 42, 0.08)`.
  - Image Fit: Always set `object-fit: cover` or `object-fit: contain` with explicit `aspect-ratio` to prevent Cumulative Layout Shift (CLS).

---

## 3. Responsive Stacking & Mobile Order Rules

### Alternating Zigzag Desktop vs Mobile Stacking

On desktop (`≥1024px`), Row 1 is `[Text | Media]`, Row 2 is `[Media | Text]`.

**CRITICAL RULE:** On mobile (`<768px`), Row 2 must **NOT** stack with Media on top and Text below. Every feature row on mobile MUST follow the uniform **[Text First -> Media Second]** sequence to prevent confusing double-image or double-text blocks.

```text
DESKTOP VIEW (≥1024px):
Row 1: [ Text Block 1 ]  ====>  [ Screenshot 1 ]
Row 2: [ Screenshot 2 ]  ====>  [ Text Block 2 ]

MOBILE VIEW (<768px):
Row 1: [ Text Block 1 ]
       [ Screenshot 1 ]
Row 2: [ Text Block 2 ]  <-- Text forced first via CSS Grid/Flex!
       [ Screenshot 2 ]
```

### CSS Implementation Pattern for Mobile Stacking Order

```css
/* Mobile First Layout (Default <768px) */
.feature-row {
  display: flex;
  flex-direction: column; /* Content (DOM Order 1) always appears above Media (DOM Order 2) */
  gap: 1.5rem;
}

/* Desktop Enhancement (≥1024px) */
@media (min-width: 1024px) {
  .feature-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .feature-row--reversed .feature-row__content {
    order: 2;
  }

  .feature-row--reversed .feature-row__media {
    order: 1;
  }
}
```

---

## 4. WCAG AA Accessibility Guidelines

### Text Contrast Ratios (SC 1.4.3)
- **Primary Feature Headings (`h2`, `h3`):** Minimum **4.5:1** contrast against section background.
- **Secondary Body Text:** Minimum **4.5:1** contrast.
- **Eyebrow Tags & Badges:** Minimum **4.5:1** text-to-background contrast.
- **Micro-CTA Action Links:** Minimum **4.5:1** contrast in default, hover, and focus states.

### Interactive Tablist ARIA Semantics (SC 2.1.1 & 2.4.7)

```html
<!-- Tablist Container -->
<div role="tablist" aria-label="Feature categories">
  <button
    role="tab"
    id="tab-1"
    aria-selected="true"
    aria-controls="panel-1"
    tabindex="0"
  >
    Feature Name
  </button>
</div>

<!-- Tabpanel Container -->
<div
  id="panel-1"
  role="tabpanel"
  aria-labelledby="tab-1"
  tabindex="0"
>
  Panel Content
</div>
```

### Keyboard Navigation Specification
- `ArrowRight` / `ArrowDown`: Moves focus and activates the next tab.
- `ArrowLeft` / `ArrowUp`: Moves focus and activates the previous tab.
- `Home`: Navigates to the first tab.
- `End`: Navigates to the last tab.
- `Tab`: Moves focus out of the tablist to the interactive elements inside the active tab panel.

### Reduced Motion Protocols (SC 2.2.2 & SC 2.3.1)
- For sticky scroll showcases or animated screenshot previews, honor `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  .feature-row__media-img,
  .feature-tabpanel {
    transition: none !important;
    animation: none !important;
  }

  .sticky-scroll-container {
    position: static !important;
  }
}
```
