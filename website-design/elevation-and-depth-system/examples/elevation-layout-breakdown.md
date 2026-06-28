# Elevation Layout Breakdown: SaaS Dashboard

This example demonstrates how the **Elevation and Depth System** is applied to
a complex, data-rich interface to create a clear sense of order, focus, and
interactivity.

## The Composition

A standard dashboard contains multiple competing layers: a persistent sidebar,
a sticky header, scrollable content, and temporary modals.

### 1. The Stacking Tiers

| Tier | Component | Elevation Token | Z-Index | Role |
| :--- | :--- | :--- | :--- | :--- |
| **L0** | Canvas / Background | None | `auto` | The base "floor" of the application. |
| **L1** | Sidebar / Main Content | `elevation-none` | `1` | Structural containers. |
| **L2** | Data Cards | `elevation-sm` | `auto` | Interactive widgets that sit on the canvas. |
| **L3** | Sticky Header | `elevation-md` | `100` | Navigation that stays above content during scroll. |
| **L4** | Focused Card (Hover) | `elevation-md` | `10` | Temporary lift to signal interactivity. |
| **L5** | Backdrop | Scrim | `500` | Dimming layer to isolate the user's task. |
| **L6** | Action Modal | `elevation-xl` | `600` | The highest priority task layer. |

---

## Visual Application

### Base Layer (L0 - L1)
The dashboard uses a slightly off-white background (`#F9FAFB`). The **Sidebar**
is Level 1; it has no shadow but is distinguished from the main canvas by a
`1px` border. This keeps the interface "quiet" and professional.

### Content Layer (L2)
Individual **Stat Cards** and **Graph Widgets** use the `elevation-sm` token.
- **Shadow:** `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)`
- **Effect:** The cards appear slightly "raised," signaling that they are
  discrete interactive objects that can be clicked or dragged.

### Sticky Navigation (L3)
As the user scrolls, the **Header** stays fixed at the top. It transitions from
Level 1 (no shadow when at the top) to Level 3 (`elevation-md`) as soon as
content scrolls beneath it.
- **Shadow:** `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)`
- **Effect:** The shadow provides a visual "edge" that prevents the content
  behind it from clashing with the navigation text.

### Interaction State (L4)
When a user hovers over a **Project Card**, the card transitions from `L2` to
`L4`.
- **Shadow Shift:** `elevation-sm` -> `elevation-md`.
- **Transform:** `translateY(-2px)`.
- **Effect:** This "Lift on Hover" provides tactile feedback, confirming the
  card is the target of the interaction.

### The Modal Stack (L5 - L6)
When clicking "Add New Project," the system enters a focused mode.
1. **The Scrim (L5):** A `rgba(0,0,0,0.5)` overlay covers the entire dashboard.
2. **The Modal (L6):** Uses the `elevation-xl` token.
   - **Shadow:** `0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)`
   - **Effect:** The dramatic shadow and the dark backdrop combine to push the
     dashboard into the deep background, forcing the user's focus onto the
     form.

---

## Decision Logic: Why This Works

1. **Hierarchy of Attention:** The largest shadow is reserved for the most
   critical interruption (the modal), ensuring no confusion about where the
   user should look.
2. **Reduced Visual Noise:** By using Level 1 (borders) for large structural
   elements like the Sidebar, we avoid "shadow fatigue" where the page feels
   heavy or cluttered.
3. **Consistency:** All shadows have a positive Y-offset (shadow is below the
   object), reinforcing a consistent top-down light source across all tiers.
