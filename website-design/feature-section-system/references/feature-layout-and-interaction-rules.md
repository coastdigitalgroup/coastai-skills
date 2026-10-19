# Feature Layout and Interaction Rules

This reference guide establishes implementation heuristics, typography scales, spacing tokens, grid geometry rules, and WCAG AA accessibility standards for designing product feature sections.

---

## 1. Section Spacing & Fluid Vertical Rhythm

Feature sections must maintain consistent vertical breathing room to distinguish major product narratives without creating disconnected visual gaps.

### Vertical Padding Scale

| Screen Size / Breakpoint | Section Top/Bottom Padding | Row-to-Row Gap (Zigzag) |
| :--- | :--- | :--- |
| **Mobile (`< 768px`)** | `clamp(3rem, 6vw, 4rem)` (48px–64px) | `clamp(2.5rem, 5vw, 3.5rem)` (40px–56px) |
| **Tablet (`768px–1023px`)** | `clamp(4rem, 7vw, 5rem)` (64px–80px) | `clamp(3.5rem, 6vw, 4.5rem)` (56px–72px) |
| **Desktop (`≥ 1024px`)** | `clamp(5rem, 8vw, 7rem)` (80px–112px) | `clamp(4.5rem, 7vw, 6rem)` (72px–96px) |

*Formula for CSS Variable:*
```css
--section-padding-v: clamp(3.5rem, 8vw, 6.5rem);
--zigzag-row-gap: clamp(3rem, 6vw, 5.5rem);
```

---

## 2. Desktop Column Splits & Ratios

Grid proportions must be chosen according to the nature of the visual asset and text complexity.

### 12-Column Grid Allocation Options

1. **Equal 50/50 Split (Balanced Text & Media):**
   - **Text Columns:** 6 Columns (`grid-column: span 6`)
   - **Media Columns:** 6 Columns (`grid-column: span 6`)
   - **Gutter Gap:** `clamp(1.5rem, 3vw, 3rem)`
   - **Use Case:** Marketing benefit statements with illustrative graphics.

2. **Visual-Biased 60/40 Split (7 Cols Media / 5 Cols Text) — Recommended for SaaS:**
   - **Text Columns:** 5 Columns (`grid-column: span 5`)
   - **Media Columns:** 7 Columns (`grid-column: span 7`)
   - **Gutter Gap:** `clamp(2rem, 4vw, 3.5rem)`
   - **Use Case:** Detailed SaaS dashboard screenshots, data tables, or code editors where micro-UI details must remain legible.

3. **Text-Biased 40/60 Split (5 Cols Media / 7 Cols Text):**
   - **Text Columns:** 7 Columns (`grid-column: span 7`)
   - **Media Columns:** 5 Columns (`grid-column: span 5`)
   - **Use Case:** Detailed engineering specifications or multi-bullet enterprise compliance details paired with a compact icon badge or portrait graphic.

---

## 3. Typography Hierarchy & Character Measures

To prevent reading fatigue, text element dimensions and maximum line lengths must satisfy strict typographic constraints.

```text
+-------------------------------------------------------------+
| EYEBROW TAG   : 0.875rem (14px) / 700 / Uppercase           |
| SECTION TITLE : clamp(1.875rem, 4vw, 2.75rem) / 800         |
| FEATURE TITLE : clamp(1.375rem, 2.5vw, 1.875rem) / 700      |
| BODY COPY     : 1.125rem (18px) / 400 / Line Height 1.6     |
|               : Enforce max-width: 55ch – 60ch               |
+-------------------------------------------------------------+
```

### Contrast Ratios (WCAG AA Minimums)

- **Eyebrow Category Label:** Minimum **4.5:1** contrast against surface (e.g., `#0284C7` Sky 600 on `#FFFFFF` = 4.8:1).
- **Headlines (`<h2>` / `<h3>`):** Minimum **3:1** for bold headlines ≥24px, preferring **4.5:1** (e.g., `#0F172A` Slate 900 on `#FFFFFF` = 15.6:1).
- **Body Copy Paragraphs:** Minimum **4.5:1** contrast (e.g., `#334155` Slate 700 on `#FFFFFF` = 9.2:1).

---

## 4. Mobile Stacking Rules & DOM Safeguards

### The Double-Media Stacking Bug Explained
When creating alternating zigzag rows (Text Left / Media Right, then Media Left / Text Right), a naive CSS Grid implementation swaps DOM node positions in HTML. On single-column mobile viewports, this causes two media blocks to stack directly together without intervening text:

```text
BAD MOBILE STACKING (HTML DOM Alternated):
Row 1: [Text 1] -> [Media 1]
Row 2: [Media 2] -> [Text 2]
Resulting Mobile Scroll: Text 1 -> Media 1 -> MEDIA 2 (COLLISION!) -> Text 2
```

### The Standard Mobile-First Solution
Always maintain identical DOM ordering in HTML (`Text Block` first, `Media Frame` second). Use CSS Grid visual reordering strictly on desktop viewports (`min-width: 1024px`):

```html
<!-- HTML (Always Text First) -->
<article class="zigzag-row">
  <div class="zigzag-text">...</div>
  <div class="zigzag-media">...</div>
</article>
<article class="zigzag-row">
  <div class="zigzag-text">...</div>
  <div class="zigzag-media">...</div>
</article>
```

```css
/* Desktop Reordering for Even Rows */
@media (min-width: 1024px) {
  .zigzag-row:nth-child(even) .zigzag-text {
    grid-column: 8 / span 5;
  }
  .zigzag-row:nth-child(even) .zigzag-media {
    grid-column: 1 / span 7;
    grid-row: 1; /* Places media on left visually on desktop without touching DOM */
  }
}
```

---

## 5. Interactive Tabbed Switcher ARIA Requirements

Interactive feature switchers must conform to WAI-ARIA Authoring Practices for Tabs:

1. **Role Architecture:**
   - Container uses `role="tablist"` with an `aria-label` (e.g., `aria-label="Product Workflow Stages"`).
   - Buttons use `role="tab"`, `aria-selected="true|false"`, and `aria-controls="panel-id"`.
   - Panels use `role="tabpanel"`, `id="panel-id"`, and `aria-labelledby="tab-id"`.

2. **Keyboard Navigation Matrix:**
   - `Right Arrow` / `Left Arrow`: Cycles focus to the next/previous tab in the tablist.
   - `Home` / `End`: Moves focus directly to the first or last tab.
   - `Space` / `Enter`: Activates the focused tab and displays its panel.
   - `Tab`: Moves focus out of the tablist and into the active tabpanel.

3. **Motion Safeguard:**
   - Panel fade/slide transitions must be disabled or replaced with instant display swaps when `@media (prefers-reduced-motion: reduce)` is active.
