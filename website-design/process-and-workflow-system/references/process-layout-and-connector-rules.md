# Process Layout & Connector Design Rules

This reference establishes spatial design standards, connector line rendering strategies, step badge taxonomies, typography hierarchies, and WCAG AA accessibility requirements for implementing the **Process & Workflow System**.

---

## 1. Spatial Layout Rules & Grid Parameters

### Grid Configurations by Step Count

| Step Count | Recommended Grid | Max Section Width | Card Gap | Internal Card Padding |
| :--- | :--- | :--- | :--- | :--- |
| **3 Steps** | 3 Columns (`repeat(3, 1fr)`) | `1200px` | `2rem` (`32px`) | `1.75rem` (`28px`) |
| **4 Steps** | 4 Columns (`repeat(4, 1fr)`) OR 2x2 Grid | `1280px` | `1.5rem` (`24px`) | `1.5rem` (`24px`) |
| **5–6 Steps** | Alternating Zigzag Stack OR Sticky Showcase | `1140px` | `3rem` (`48px`) vertical | `2rem` (`32px`) |

### Responsive Stacking Thresholds

- **Desktop Viewports (`≥ 1024px`):** Full multi-column grid with horizontal connectors active.
- **Tablet Viewports (`768px – 1023px`):** 2-column wrapped grid or scaled horizontal ribbon.
- **Mobile Viewports (`< 768px`):** Single-column stacked vertical timeline. Horizontal connectors MUST be hidden via `display: none`. Vertical timeline thread rendered via `border-left` or `::before` pseudo-element.

---

## 2. Directional Connector Rendering Strategies

### Strategy A: CSS Dashed Pseudo-Elements (Best for Straight Horizontal Connectors)

For simple 3-step or 4-step horizontal rows, CSS pseudo-elements provide a lightweight, dependency-free solution:

```css
.process-card:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 2.25rem; /* Vertically centered on the 48px badge */
  right: calc(-1 * var(--gap-size));
  width: var(--gap-size);
  height: 2px;
  border-top: 2px dashed var(--color-border-strong);
  z-index: 1;
}
```

### Strategy B: Inline SVG Path Overlays (Best for S-Curves and Zigzag Threads)

For curved 2x2 grids or multi-row flows, inline SVG elements allow precise vector bezier curves:

```html
<svg class="process-connector-svg" aria-hidden="true" viewBox="0 0 1000 200" fill="none">
  <path
    d="M 250,50 C 350,50 350,150 450,150"
    stroke="var(--color-primary)"
    stroke-width="2"
    stroke-dasharray="6 4"
    marker-end="url(#arrowhead)" />
  <defs>
    <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>
```

---

## 3. Step Badge Taxonomy

1. **Numeric Filled Badge (Primary Default):**
   - Shape: Circle (`border-radius: 50%`)
   - Size: `44px` to `52px` diameter
   - Background: `var(--color-primary)` with `color: #ffffff`
   - Ring Glow: `box-shadow: 0 0 0 4px var(--color-primary-light)`
2. **Text Micro-Pill Badge:**
   - Shape: Rounded rectangle (`border-radius: 999px`)
   - Padding: `4px 12px`
   - Typography: `0.75rem` (`12px`), `font-weight: 700`, `letter-spacing: 0.05em`, `text-transform: uppercase`
3. **Iconic Node Badge:**
   - Shape: Circle containing a 24px inline SVG icon representing the action (e.g., Key icon for "Connect", Gear icon for "Configure").

---

## 4. Typography & Contrast Guidelines

### WCAG 2.1 AA Contrast Rules

- **Step Title Text (`h3`):** Minimum **4.5:1** contrast ratio against card surface.
- **Body Copy Paragraphs:** Minimum **4.5:1** contrast ratio against card surface.
- **Numeric Badges:** Minimum **4.5:1** contrast ratio between badge text and badge background fill.
- **Connector Lines & Arrowheads:** Minimum **3:1** contrast ratio against section background.

### Text Measure Constraints

To maintain optimal reading speed and scanning rhythm across step cards:
- **Heading Length:** Max `25` characters.
- **Description Copy Measure:** Between `35` and `55` characters per line (`max-width: 45ch`).

---

## 5. WCAG AA Accessibility Checklist

- [ ] **Semantic List Container:** The step sequence uses an `<ol>` element with `<li>` children.
- [ ] **Decorative Connectors Hidden:** All SVG connector paths and CSS pseudo-element lines have `aria-hidden="true"`.
- [ ] **Screen Reader Ordinal Labels:** Headings include hidden or inline step numbers (e.g., `<span class="sr-only">Step 1: </span>`).
- [ ] **Interactive Trigger Controls:** If steps act as buttons to toggle UI previews, triggers use `<button type="button">` with `aria-controls` and `aria-selected` attributes.
- [ ] **Focus Ring Visibility:** Interactive step buttons maintain a visible `2px` focus outline with ≥3:1 contrast against surrounding surfaces.
