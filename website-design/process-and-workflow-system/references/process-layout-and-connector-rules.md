# Process Layout, Connector, and Accessibility Reference Guide

This reference guide details spatial layout formulas, CSS connector line implementations, step node sizing scales, responsive breakpoint matrices, and WCAG 2.2 AA accessibility requirements for engineering process and workflow components.

---

## 1. Step Badge Sizing & Typography Matrix

Step node badges serve as the primary focal anchors in process layouts. Choose badge dimensions based on layout scale and device context.

| Node Size Context | Badge Container Dimensions | Typography Style | Min Touch Target Buffer | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Large Feature Stage** | `56px x 56px` circle / squircle | `20px` bold mono (`#FFFFFF`) | Built-in | Hero section / 3-step high-impact marketing rows |
| **Standard Step Row (Desktop)** | `48px x 48px` circle | `18px` bold mono (`#FFFFFF`) | `48px` minimum | Standard 4-step landing page sections |
| **Compact Timeline (Tablet)** | `40px x 40px` circle | `16px` bold mono (`#FFFFFF`) | Adds `2px` margin | 5–6 step implementation timelines |
| **Mobile Stacked Node** | `36px x 36px` circle | `14px` bold mono (`#FFFFFF`) | `44px x 44px` padded wrapper | Mobile viewports (`< 640px`) |

---

## 2. CSS & SVG Connector Line Implementations

Connectors visually establish step sequence and direction between nodes.

### Pattern A: Continuous CSS Grid Background Track (Desktop Row)
Best for 3–4 step horizontal rows where all step nodes lie on a single horizontal axis.

```css
/* Container must have position: relative */
.process-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

/* Horizontal line running behind nodes */
.process-grid::before {
  content: "";
  position: absolute;
  top: 24px; /* Midpoint of 48px step badge */
  left: 12%;
  right: 12%;
  height: 2px;
  background-color: var(--color-connector, #cbd5e1);
  z-index: 0;
}

/* Ensure step badges float above the connector line */
.process-card__node {
  position: relative;
  z-index: 1;
  background-color: var(--color-primary, #4f46e5);
  box-shadow: 0 0 0 4px #ffffff; /* Halo mask prevents line touch */
}
```

### Pattern B: Animated SVG Directional Arrow Track
Best for automated workflow products where flow direction needs subtle visual reinforcement.

```html
<svg class="process-connector" width="100%" height="2" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
  <line x1="0" y1="1" x2="100" y2="1"
        stroke="#4F46E5"
        stroke-width="2"
        stroke-dasharray="6, 6"
        class="animated-dash" />
</svg>

<style>
  @keyframes dash-flow {
    to {
      stroke-dashoffset: -24;
    }
  }
  .animated-dash {
    animation: dash-flow 1.5s linear infinite;
  }
</style>
```

### Pattern C: Mobile Vertical Spine Line
Best for vertical step stacks on mobile viewports (`< 640px`).

```css
@media (max-width: 640px) {
  .process-grid {
    display: flex;
    flex-direction: column;
    gap: 32px;
    position: relative;
  }

  .process-grid::before {
    content: "";
    position: absolute;
    top: 18px;    /* Midpoint of 36px mobile node */
    bottom: 18px;
    left: 17px;   /* Center of 36px node (36/2 - 1px) */
    width: 2px;
    background-color: var(--color-connector, #cbd5e1);
    z-index: 0;
  }
}
```

---

## 3. Responsive Breakpoint Transformation Matrix

| Viewport Width | Grid Structure | Connector Behavior | Content Alignment |
| :--- | :--- | :--- | :--- |
| **Desktop (`> 1024px`)** | 3 or 4 Equal Columns | Horizontal CSS track or SVG arrow spans row | Centered column cards or top-aligned cards |
| **Tablet (`640px - 1024px`)** | 2-Column x 2-Row Grid | Hide single-row line; use per-card arrow badges | Left-aligned card content with top node |
| **Mobile (`< 640px`)** | 1-Column Vertical Stack | Switch to vertical left-aligned spine line | Flex row: Node on left, content on right |

---

## 4. WCAG 2.2 AA Accessibility Audit Checklist

When implementing process and workflow components, verify all accessibility criteria:

- [ ] **Semantic Structure:** Steps are wrapped in an ordered list `<ol>` and `<li>` items to ensure screen readers announce "List item 1 of 4".
- [ ] **Text Contrast (SC 1.4.3):**
  - Step node numbers against node background: minimum **4.5:1** contrast.
  - Step titles and body text against card surface: minimum **4.5:1** contrast.
- [ ] **Non-Text Contrast (SC 1.4.11):**
  - Active/completed step badge outlines and connector lines: minimum **3:1** contrast against page background.
- [ ] **Screen Reader Text:** Visually hidden text (`<span class="sr-only">Step 1 of 4:</span>`) is included inside each step item to clarify order.
- [ ] **Decorative Graphics (SC 1.1.1):** Decorative SVG connector paths, arrows, and preview icons have `aria-hidden="true"`.
- [ ] **Touch Target Size (SC 2.5.8):** If step nodes are interactive (e.g., in a tabbed or sticky scroll showcase), target dimensions meet at least **44x44px** (or 24x24px with surrounding padding).
- [ ] **Keyboard Navigation (SC 2.1.1):** Interactive step triggers are focusable via `Tab` and activated via `Enter` or `Space`, with visible focus rings (`:focus-visible`).
