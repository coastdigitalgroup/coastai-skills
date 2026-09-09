# E-Commerce & SaaS Bottom Sheet Layout Breakdown

This example breaks down two realistic application scenarios applying the **Bottom Sheet Design System**:

1. **E-Commerce Mobile Filter & Sort Drawer** (Mobile Viewport)
2. **SaaS Application Bulk Action Sheet & Desktop Modal Adaptation** (Cross-Device Viewport)

---

## Scenario 1: E-Commerce Mobile Filter & Sort Drawer

### Context & Design Problem
On an e-commerce Product Listing Page (PLP), mobile shoppers need to refine search results by category, price range, color, and rating without navigating away from the item grid. A full-page reload or standard desktop sidebar dropdown breaks context and causes high bounce rates.

### Spatial Composition & Structural Breakdown

```text
+-------------------------------------------------------+
|  Mobile Viewport (390px x 844px)                       |
|  [ Parent PLP Item Grid - Blurred / Dimmed Background ]|
|  +-------------------------------------------------+  |
|  | Backdrop Dimming Overlay (rgba(0,0,0,0.5))      |  |
|  |                                                 |  |
|  | +---------------------------------------------+ |  |
|  | |  [====] Drag Handle Pill (36x4px)           | |  |
|  | |                                             | |  |
|  | |  Filter & Sort (18 items)        [X Close]   | |  |
|  | |  -----------------------------------------  | |  |
|  | |  Sort By:                                   | |  |
|  | |  (o) Featured  ( ) Price: Low to High       | |  |
|  | |  ( ) Newest    ( ) Customer Rating          | |  |
|  | |                                             | |  |
|  | |  Category:                                  | |  |
|  | |  [x] Outerwear (14)   [x] Footwear (8)      | |  |
|  | |                                             | |  |
|  | |  Price Range:                               | |  |
|  | |  [ $25        ] to [ $150       ]           | |  |
|  | |  -----------------------------------------  | |  |
|  | |  [ Clear All ]      [ Apply Filters (22) ]  | |  |
|  | |                                             | |  |
|  | |  ===== Safe Area Padding (env(safe-area)) ===== |  |
|  | +---------------------------------------------+ |  |
+-------------------------------------------------------+
```

### Key Design Specs & Measurements

- **Sheet Surface Elevation:** Grounded to bottom edge, `background: #FFFFFF` (or dark theme `#18181B`), `border-radius: 16px 16px 0 0`.
- **Detent Snap Height:** `height: 80vh; max-height: 85vh;` with internal scroll container for dense option lists (`overflow-y: auto`).
- **Drag Handle Affordance:** `36px` width x `4px` height pill, `background: #D4D4D8`, wrapped in invisible `24px` height tap target container.
- **Sticky Header Region:** `position: sticky; top: 0; height: 56px;` featuring `h2` title ("Filter & Sort") and `44x44px` icon close button (`aria-label="Close filters"`).
- **Sticky Footer Action Rail:** `position: sticky; bottom: 0; background: inherit; border-top: 1px solid #E4E4E7; padding: 12px 16px calc(12px + env(safe-area-inset-bottom, 16px)) 16px;`.
  - Secondary CTA ("Clear All"): `min-height: 44px; flex: 1;`.
  - Primary CTA ("Apply Filters (22)"): `min-height: 44px; flex: 2; background: #0F172A; color: #FFFFFF; font-weight: 600;`.

---

## Scenario 2: SaaS Bulk Action Sheet & Desktop Modal Adaptation

### Context & Design Problem
In a SaaS data table or project board interface, selecting multiple table rows activates a bulk action menu (e.g., Tag, Assign, Export, Archive, Delete). On mobile, this must anchor to the bottom as an action sheet; on desktop (`≥768px`), it transitions into a centered modal dialog or floating toolbar dock to maintain ergonomic visual layout.

### Layout Transformation Matrix (Mobile vs Desktop)

#### Mobile Viewport (<768px): Slide-Up Bottom Action Sheet

```text
+-------------------------------------------------------+
|  Mobile Viewport (< 768px)                            |
|                                                       |
|  +-------------------------------------------------+  |
|  |  [====] Drag Handle                             |  |
|  |  3 Tasks Selected                       [Cancel]|  |
|  |  ---------------------------------------------  |  |
|  |  [ Icon ]  Assign to Team Member...              |  |
|  |  [ Icon ]  Apply Label / Category...            |  |
|  |  [ Icon ]  Export to CSV / JSON...              |  |
|  |  [ Icon ]  Archive Selected Tasks               |  |
|  |  [ Trash]  Delete Tasks (Destructive)           |  |
|  |                                                 |  |
|  |  ===== Safe Area Padding (env(safe-area)) ===== |  |
|  +-------------------------------------------------+  |
+-------------------------------------------------------+
```

#### Desktop Viewport (≥768px): Centered Dialog Modal Conversion

```text
+-------------------------------------------------------+
|  Desktop Viewport (≥ 768px)                           |
|                                                       |
|       +-----------------------------------------+     |
|       |  Bulk Actions (3 items)       [X Close] |     |
|       |  -------------------------------------  |     |
|       |  Choose an action to perform on all     |     |
|       |  selected workspace records:            |     |
|       |                                         |     |
|       |  [ Assign ]   [ Label ]   [ Export ]    |     |
|       |  [ Archive ]  [ Delete Selected ]       |     |
|       +-----------------------------------------+     |
|                                                       |
+-------------------------------------------------------+
```

### Design Implementation Rules

1. **Mobile Bottom Anchor (`<768px`):**
   - `position: fixed; bottom: 0; left: 0; right: 0;`
   - `border-radius: 16px 16px 0 0;`
   - `transform: translateY(0); transition: transform 300ms cubic-bezier(0.32, 0.72, 0, 1);`
2. **Desktop Centered Modal (`≥768px`):**
   - `position: fixed; top: 50%; left: 50%; bottom: auto; right: auto;`
   - `transform: translate(-50%, -50%); width: 100%; max-width: 520px;`
   - `border-radius: 12px; shadow: 0 20px 25px -5px rgba(0,0,0,0.1);`
   - Drag handle pill is hidden (`display: none;`).
3. **Accessibility & Trapping Rules:**
   - Both layouts utilize `role="dialog"` and `aria-modal="true"`.
   - Pressing `Escape` key closes the drawer/modal instantly.
   - Focus is captured on open and restored to table row selection checkbox on close.
