# Variant UX & Pricing Heuristics Reference

This reference guide details technical design heuristics, accessibility standards (WCAG 2.1 AA), Finite State Machine logic, and pricing psychology principles for high-converting product variant selectors.

---

## 1. Visual Swatch & Touch Control Anatomy

### 1.1 Touch Target Sizing & Spacing (WCAG 2.1 AA Success Criterion 2.5.5)

- **Mobile Viewports (<768px):** All interactive option buttons, swatches, and pills must have a minimum touch target area of **44x44 CSS pixels**.
- **Desktop Viewports (≥768px):** Minimum clickable area of **32x32 CSS pixels**.
- **Inter-Control Spacing:** Provide a minimum **8px gap** (`gap: 0.5rem` or `margin: 4px`) between adjacent swatch tiles to prevent accidental mis-taps on small touchscreens.

### 1.2 Color & Texture Swatch Rendering Rules

- **Never rely on single solid CSS color hexes for patterned/textured items.** For heather fabrics, wood grains, marble finishes, or dual-tone products, use actual high-density 64x64px WebP/AVIF thumbnail image assets.
- **Color-Blind Accessibility (WCAG 1.4.1 Use of Color):** Color cannot be the sole visual identifier.
  - *Active State Rule:* Selected swatches must combine a solid **2px contrasting border ring** AND a high-contrast **checkmark icon overlay** (`✓`) or distinct focus outline (`box-shadow: 0 0 0 3px var(--focus-ring-color)`).
  - *Text Label Requirement:* Always output the active swatch label in clear typography above the swatch row (e.g., `<legend class="text-sm font-semibold">Color: <span id="selected-color-label">Charcoal Gray</span></legend>`).

---

## 2. Finite State Machine (FSM) & Dependency Rules

When a product contains multiple attribute dimensions (e.g., Color x Size x Material), cross-selecting options creates a matrix of valid vs. invalid combination states.

### 2.1 Dependency Matrix Handling

```
[Color Selected: Obsidian Black]
        │
        ├─► Size S: IN STOCK ──► Render as standard active pill
        ├─► Size M: IN STOCK ──► Render as standard active pill
        ├─► Size L: OUT OF STOCK ──► Render with diagonal line + 50% opacity (Triggers Restock Modal on click)
        └─► Size XL: INVALID COMBINATION ──► Render with diagonal line + 30% opacity
```

### 2.2 Out-Of-Stock (OOS) Visual States

1. **In Stock:** High-contrast text/border, full opacity (100%), interactive pointer cursor.
2. **Low Stock (1–5 units remaining):** Standard pill styling + subtle inline badge (e.g., `⚡ 2 left`) or orange border highlight.
3. **Out of Stock / Backorder:**
   - Opacity reduced to **50%**.
   - CSS background diagonal strike-through line (`background: linear-gradient(to top right, transparent calc(50% - 1px), var(--strike-color) calc(50% - 1px), var(--strike-color) calc(50% + 1px), transparent calc(50% + 1px));`).
   - Remains **100% clickable/tappable** to trigger the inline restock alert modal. Never disable with `pointer-events: none` or native `disabled` attribute if restock capture is enabled.

---

## 3. Dynamic Pricing & Value Framing Heuristics

### 3.1 Surcharge Framing Psychology

When higher variants incur an additional charge, shoppers evaluate fairness based on framing clarity:

- **Bad (Hidden Surcharge):**
  - Option pill displays: `XXL`
  - Buy box price silently changes from `$100` to `$120` upon click.
  - *Result:* High frustration, perception of bait-and-switch pricing, cart abandonment.
- **Good (Explicit Absolute Differential):**
  - Option pill displays: `XXL (+$20)`
  - Buy box price tag animates to `$120` with a temporary highlight background.
  - *Result:* High transparency, perceived value for extra material/capacity.

### 3.2 Quantity Bundle & Unit Pricing Calculations

For volume bundles (1 Bottle vs. 3 Bottles vs. 6 Bottles) or variable weight/volume options:

- **Always display Unit Price:** Calculate and display exact per-unit cost (e.g., `$10 / bottle` vs. `$15 / bottle`).
- **Highlight Comparative Savings:** Display explicit percentage or dollar savings relative to buying single units (e.g., `SAVE 33%` or `SAVE $30`).
- **Anchor "Most Popular" Option:** Visual card border or ribbon tag highlighting the highest-margin or most frequently purchased volume tier.

---

## 4. DOM Accessibility & ARIA Patterns

All custom swatch components must follow WCAG 2.1 AA keyboard and screen reader accessibility rules:

- **Group Container:** Use `<fieldset>` and `<legend>` to associate attribute options logically for screen reader virtual cursor navigation.
- **Interactive Controls:** Implement options using `<input type="radio">` with visually hidden inputs and styled `<label>` elements, OR custom `<button role="radio">` elements inside a container with `role="radiogroup"`.
- **Selected State ARIA:** Apply `aria-checked="true"` or `aria-selected="true"` dynamically when selected.
- **Keyboard Navigation:** Support Arrow keys (`ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`) to move focus between option pills within a radiogroup.

```html
<fieldset class="variant-attribute-group">
  <legend class="attribute-label">
    Size: <span id="current-size" class="font-bold">Large</span>
  </legend>

  <div class="pill-grid" role="radiogroup" aria-labelledby="current-size">
    <button type="button"
            role="radio"
            aria-checked="false"
            aria-label="Size Medium"
            class="pill-btn">
      M
    </button>
    <button type="button"
            role="radio"
            aria-checked="true"
            aria-label="Size Large"
            class="pill-btn active">
      L
    </button>
    <button type="button"
            role="radio"
            aria-checked="false"
            aria-label="Size Extra Large, add $15"
            class="pill-btn">
      XL <span class="surcharge-badge">+$15</span>
    </button>
  </div>
</fieldset>
```
