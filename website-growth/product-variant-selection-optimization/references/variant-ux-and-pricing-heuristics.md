# Product Variant Selection UX & Pricing Heuristics

This reference guide outlines core cognitive UX heuristics, pricing mechanics, and accessibility rules for optimizing multi-dimensional product variant selectors on e-commerce platforms.

---

## 1. Cognitive Friction & Choice Architecture

### The Option Visibility Principle
- **Heuristic:** Humans process visual choices faster than text menus. Hiding variant choices inside dropdown menus (`<select>`) increases cognitive load, hides available options, and requires multiple clicks/taps to discover stock.
- **Rule:** Default to exposing options as visible swatches (for visual attributes like color/finish) or segmented text pills (for dimensional attributes like size/capacity).
- **Threshold:** Reserve dropdowns only for attributes with >12 items (e.g., shoe sizing grids from US 4 to 15, or ring sizes in 0.5 increments).

### Active Selection Clarity
- **Heuristic:** Users frequently forget what option they selected when visual feedback is subtle or missing, leading to accidental misorders.
- **Rule:** Every variant control group must feature two simultaneous feedback cues:
  1. A high-contrast active state ring or background fill on the selected control.
  2. A persistent text label updating in real-time above the control group (e.g., `Color: Slate Grey (Active)`).

---

## 2. Multi-Dimensional Matrix Mechanics

### Handling Multi-Attribute Dependencies
When a product has multiple attribute dimensions (e.g., Dimension 1: Color, Dimension 2: Size, Dimension 3: Material):

```
                       [ Color: Obsidian ]
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
  [ Size: M ] (In Stock)                      [ Size: XL ] (OOS)
        │                                               │
  [ CTA: Add to Cart ]                       [ CTA: Notify Me ]
```

- **Avoid the "Invisible Option" Trap:** Never hide size pills that are out of stock for the selected color. Hiding them makes shoppers believe the brand does not offer those sizes at all.
- **The Strikethrough Rule:** Render out-of-stock combinations with a 50% opacity reduction and a 45-degree diagonal strikethrough line. Keep the element interactive so tapping it triggers a restock alert capture form.

---

## 3. Pricing Transparency & Surcharge Psychology

### Surcharge Anchoring & Expectation Management
- **Heuristic:** Price changes that occur *after* an action without prior warning trigger perceived bait-and-switch friction, causing immediate bounce behavior.
- **Rule:** When specific SKUs carry price surcharges (e.g., XL sizes requiring more raw material or 1TB storage upgrades):
  - Print the explicit delta directly on the option pill *before* selection: `[ 1TB (+$200) ]`.
  - Alternatively, print the absolute total price on the option pill: `[ 1TB ($1,199) ]`.
- **BNPL Recalculation:** Instantly update buy-now-pay-later microcopy (e.g., Klarna, Afterpay, Shop Pay installments) whenever a surcharge variant is selected.

---

## 4. Media & Gallery Synchronization Heuristics

### Visual Verification Rule
- **Heuristic:** Shoppers require visual reassurance that the item in their cart matches their intended selection.
- **Rule:** Selecting a color swatch MUST trigger a 1-to-1 update in the main photo gallery:
  1. Filter carousel images to show photos matching the selected color.
  2. Jump the active hero image to the primary front-facing shot of that color variant.
  3. Update cart drawer item thumbnails to reflect the chosen color variant.

---

## 5. Accessibility & Mobile Touch Standards (WCAG 2.1 AA)

### Touch Target Boundaries
- Mobile screen taps have a high error rate when touch targets are smaller than 40px.
- **Requirement:** All variant swatches and text pills must maintain a minimum bounding box of **44px x 44px** on touch viewports, with a minimum **8px space** between adjacent pills to prevent accidental taps.

### Non-Color-Dependent Affordances
- **Requirement:** Color swatches must never rely on color alone to convey selection or stock status.
- **Implementation:**
  - Active swatches must use a distinct shape border (e.g., dual outline ring) or checkmark icon.
  - Out-of-stock swatches must use a slash graphic or textual overlay (`OOS`).
  - Screen reader markup must include `aria-label="Color: Navy, Out of Stock"` and `aria-checked="true/false"`.
