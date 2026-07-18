# Example: Asynchronous Action & Reversible State (E-Commerce Product Inventory)

This breakdown demonstrates how the Toast and Snackbar System is applied to a real-world design scenario: a merchant archiving a product from their active inventory list on an e-commerce dashboard. It details the visual layout, state transition flow, timing mechanisms, and responsive transitions.

---

## 1. The Scenario

A store manager is reviewing their inventory in a dense data table. They decide to archive an out-of-stock product ("Vintage Leather Boots"). Archiving is a high-frequency action, but doing it with a modal popup confirmation would create massive flow friction. Instead, we use an **Optimistic UI Archive Action** paired with a **Reversible (Undo-enabled) Toast**.

### The Flow Diagram

```text
[ Active Row ] ---> [ Click Archive ] ---> [ Row Animates Out / Fades ]
                                                   |
                                                   v
[ Undo Triggered ] <--- [ Action CTA Clicked ] <--- [ Success Toast with "Undo" appears ]
        |                                                  | (8s expiration)
        v                                                  v
[ Row Restored ]                                   [ Toast Expires / Item Permanently Archived ]
```

---

## 2. Page & Layout Composition Breakdown

### Component Context: Desktop View (1440px)
The user is viewing the inventory list. The main grid has a sticky top-bar navigation header.

```text
+-----------------------------------------------------------------------------------------+
| [Logo]  Search inventory...                         [Alerts] [Settings] [Merchant Profile] | <-- Global Nav
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  Inventory (28 items)                                               [ + Add Product ]   |
|                                                                                         |
|  +-----------------------------------------------------------------------------------+  |
|  | [ ] Product Name      | SKU       | Status      | Stock   | Price   | Actions     |  |
|  +-----------------------------------------------------------------------------------+  |
|  | [ ] Leather Jacket    | LJ-982    | Active      | 14      | $189.00 | [Edit] [Arc]|  |
|  | [ ] Canvas Backpack   | CB-441    | Active      | 3       | $65.00  | [Edit] [Arc]|  |
|  | [ ] Vintage Boots     | VB-110    | Out of Stock| 0       | $145.00 | [Edit] [Arc]| <-- Archiving VB-110
|  +-----------------------------------------------------------------------------------+  |
|                                                                                         |
|                                                              +-----------------------+  |
|                                                              | (i) VB-110 Archived.  |  | <-- Toast Stack
|                                                              |     [Undo]  [X]       |  |     Positioned 24px
|                                                              +-----------------------+  |     from bottom/right
+-----------------------------------------------------------------------------------------+
```

### Component Context: Mobile View (375px)
On mobile, the sidebar collapses into a hamburger icon and the desktop toast transforms into a bottom-anchored, full-width **Snackbar** centered in the user's thumb zone.

```text
+-----------------------------------+
| [=]  Inventory List          [SRCH] |
+-----------------------------------+
|  Inventory (28)   [ + Add ]       |
|                                   |
|  +-----------------------------+  |
|  | [ ] Vintage Boots           |  |
|  | SKU: VB-110  | Stock: 0     |  |
|  | Price: $145.00              |  |
|  +-----------------------------+  |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|      +---------------------+      |
|      | VB-110 Archived     |      | <-- Full-width mobile Snackbar
|      | [Undo]          [X] |      |     16px from bottom, centered
|      +---------------------+      |     in easy thumb reach zone
+-----------------------------------+
```

---

## 3. Visual & Spatial Specifications

### Desktop Toast Blueprint
Spacing and padding tokens conform to a standardized 8px spatial grid system (`--space-s = 8px`, `--space-m = 16px`, `--space-l = 24px`).

```text
  <------------------------------- Width: 360px -------------------------------->
  +-----------------------------------------------------------------------------+  ^
  |  +----+  +-------------------------------------+  +----------+  +--------+  |  |
  |  |    |  | Product Archived                    |  |          |  |        |  |  | Padding:
  |  |    |  | "Vintage Leather Boots" was moved   |  |  [Undo]  |  |  [ X ] |  |  | --space-m (16px)
  |  |    |  | to the archive.                     |  |          |  |        |  |  | all sides
  |  +----+  +-------------------------------------+  +----------+  +--------+  |  |
  +-----------------------------------------------------------------------------+  v
     ^          ^                                        ^             ^
     |          |                                        |             |
   Icon     Message Text                             Action CTA    Dismiss Target
  (20px)    Medium Grey (#555)                       Brand Blue    Neutral Muted Grey
  Green     Normal weight (14px)                      (#0055ff)     (#888)
            Title (14px, Bold, #111)                 Bold (14px)   (24x24px clickable)
```

### Mobile Snackbar Blueprint
On mobile, layout components wrap vertically to prevent text clipping and tiny touch targets.

```text
  <---------------------------- Width: calc(100% - 32px) -------------------------->
  +---------------------------------------------------------------------------------+  ^
  |  +----+  +---------------------------------------------------------+            |  | Padding:
  |  |    |  | "Vintage Leather Boots" has been archived.              |            |  | --space-m (16px)
  |  +----+  +---------------------------------------------------------+            |  |
  |                                                                                 |  | Gap:
  |                                        +---------------------+  +------------+  |  | --space-s (8px)
  |                                        |       [Undo]        |  |   [ X ]    |  |  |
  +---------------------------------------------------------------------------------+  v
                                              ^                         ^
                                              |                         |
                                          Full-Width CTA            Full-Width Dismiss
                                          (44px touch height)       (44px touch height)
```

---

## 4. Interaction, Timing & State Lifecycle

| Phase | Timeline (ms) | Visual State Changes | Keyboard & Focus Actions |
| :--- | :--- | :--- | :--- |
| **1. Trigger** | `0ms` | User clicks "Archive" icon on the VB-110 row. | Current focused button is marked `aria-disabled="true"`. |
| **2. Optimistic UI** | `10ms - 200ms` | Row VB-110 height collapses to `0px` and fades to `opacity: 0` with CSS transitions. | Screen reader announces: `"Vintage Leather Boots archived. Undo available."` |
| **3. Toast Entrance** | `200ms - 500ms` | Toast enters from right viewport boundary. CSS: `transform: translateX(100%)` -> `translateX(0)`. | Toast is inserted into DOM with `role="status"`. |
| **4. Active Display** | `500ms - 8000ms`| Toast displays with progress meter at bottom. Active timer begins 8s countdown. | Keyboard users can hit `F6` to jump focus directly to the "Undo" button. |
| **5. Pause State** | *Variable* | User moves mouse cursor over the toast. Progress bar animation freezes. | Keyboard focus on the "Undo" button freezes the timer indefinitely. |
| **6. Resolution** | `8500ms+` | If "Undo" clicked: row restores, toast exits. If timed out: toast fades out (`opacity: 0`). | If Undo clicked: Focus shifts back to VB-110 "Archive" row button. |

---

## 5. CSS Implementation Tokens

A structured specification of theme-compliant CSS properties that maps this example to design variables:

```css
:root {
  /* Layout Sizing */
  --toast-width: 360px;
  --toast-max-height: 120px;
  --toast-z-index: 5500;

  /* Spatial Offsets */
  --toast-desktop-margin: 24px;
  --toast-mobile-margin: 16px;

  /* Color Palette (Success Variant) */
  --toast-bg-color: #ffffff;
  --toast-border-color: #e5e7eb;
  --toast-success-icon-color: #16a34a;
  --toast-text-title-color: #111827;
  --toast-text-body-color: #4b5563;
  --toast-action-color: #2563eb;
  --toast-action-hover-color: #1d4ed8;
  --toast-dismiss-color: #9ca3af;
  --toast-dismiss-hover-color: #4b5563;

  /* Typography & Shadows */
  --toast-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --toast-border-radius: 8px;
  --toast-transition-curve: cubic-bezier(0.16, 1, 0.3, 1);
}
```
