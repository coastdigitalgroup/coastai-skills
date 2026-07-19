# Example: Segmented Control System (Before & After)

This document breaks down two common design problems—a **Pricing Page Billing Frequency Toggle** and a **Search Results View Switcher**—and demonstrates how applying the Segmented Control System transforms them from confusing, inaccessible layouts into highly polished, intuitive, and compliant interfaces.

---

## Scenario 1: SaaS Pricing Page Billing Frequency Toggle

This control allows a user to switch between "Monthly Billing" and "Annual Billing" (which offers a 20% discount).

### The "Before" State: Poor Contrast & Layout Shift
In the initial design, the team used a customized standard toggle switch (often styled like a sliding toggle).

```text
[   Monthly   ]  (O)  [   Yearly (Save 20%)   ]
```

#### Key Design Failures:
1. **The Click Trap (Spatial Ambiguity):** Standard toggles are binary switches. Placing labels on both sides makes it unclear if clicking "Yearly" immediately activates it or if the user must drag/click the toggle switch in the middle.
2. **Layout Shift (CLS):** When toggled, the word "Yearly (Save 20%)" is slightly wider than "Monthly". Because the button container size is fluid, switching causes the entire pricing layout below to shift down and up by 12px.
3. **Accessibility Void:** The component is built using generic `<div>` wrappers. A screen reader hears nothing but "Unlabeled Toggle Switch." There are no keyboard arrow controls.
4. **Contrast Deficit:** The inactive option text uses a light-gray color (#9CA3AF) on a off-white background (#F9FAFB), resulting in a **2.1:1 contrast ratio**, which fails WCAG AA minimum standards (4.5:1).

---

### The "After" State: The Segmented Control Implementation

The design is refactored into a unified Segmented Control using the **Radio Group pattern**, resolving all layout, usability, and compliance problems.

#### The Layout Structure (Visual Wireframe)

```text
+-------------------------------------------------------------------------+
|  Track (Background: #F1F5F9, Padding: 4px, Border-Radius: 9999px)        |
|                                                                         |
|  +-----------------------------------+ +------------------------------+  |
|  | Active Indicator (White Fill,     | | Inactive Segment             |  |
|  | Drop Shadow, Text: #0F172A Bold)  | | (Text: #64748B, Semi-Bold)   |  |
|  |                                   | |                              |  |
|  |          Monthly Billing          | |  Annual Billing (Save 20%)   |  |
|  +-----------------------------------+ +------------------------------+  |
+-------------------------------------------------------------------------+
```

#### Technical Design Specifications:
- **Consistent Sizing:** Both segments are distributed equally using `flex: 1 1 0%` inside a fixed max-width container (`400px`). This completely eliminates Cumulative Layout Shift (CLS) when toggling.
- **Micro-interactions:** A sliding active indicator uses hardware-accelerated CSS transition. Non-selected elements have a subtle hover effect (opacity overlay) to provide active visual feedback.
- **Contrast Check:** Inactive text uses `#64748B` on the `#F1F5F9` track background (**4.6:1 contrast ratio**), which meets WCAG AA standards. The active text uses `#0F172A` on the white indicator card (**15.9:1 contrast ratio**), exceeding WCAG AAA.
- **Accessibility Integration:**
  - Role: `role="radiogroup"` with `aria-label="Billing frequency"` on the Track.
  - Option Roles: `role="radio"` and `aria-checked="true"` (for active) or `aria-checked="false"` (for inactive).
  - Roving index is implemented: only the active option is focusable (`tabindex="0"`), while the inactive uses `tabindex="-1"`. Arrow keys dynamically shift focus and selection immediately.

---

## Scenario 2: Search Results View Switcher

This control allows a user to switch the active results layout between "Grid View", "List View", and "Map View".

### The "Before" State: Vague Icon Buttons
The team used three standalone icon buttons in a row.

```text
[ ⊞ ] [ ☰ ] [ 📍 ]
```

#### Key Design Failures:
1. **Semantic Mismatch:** These buttons look like three separate actions (like "Add", "Search", "Pin") rather than a single mutually exclusive choice.
2. **Lack of Text Labels:** Low-vision or cognitively diverse users must guess what each abstract icon does.
3. **No Selected Affordance:** The currently active view is highlighted by changing the icon border from grey to blue. This is extremely subtle and relies purely on color to convey state.
4. **Poor Touch Target:** The buttons are tightly packed (`16x16px` icons with `4px` padding), failing the WCAG 2.2 touch target requirement.

---

### The "After" State: View Switcher Segmented Control

The switcher is rebuilt into a Segmented Control using the **Tablist pattern**, since it alters the physical page presentation/panels.

#### The Layout Structure (Visual Wireframe)

```text
+-----------------------------------------------------------------------------------------+
|  Track (Height: 40px, Background: #E2E8F0, Padding: 4px, Border-Radius: 8px)            |
|                                                                                         |
|  +-----------------------+ +-----------------------+ +-------------------------------+  |
|  | Tab (Active)          | | Tab (Hover)           | | Tab (Default)                 |  |
|  | [⊞] Grid View         | | [☰] List View         | | [📍] Map View                 |  |
|  | (White Card, Bold text| | (Subtle hover bg,     | | (Primary Text: #475569)       |  |
|  |  Text: #1E293B)       | |  Text: #1E293B)       | |                               |  |
|  +-----------------------+ +-----------------------+ +-------------------------------+  |
+-----------------------------------------------------------------------------------------+
```

#### Technical Design Specifications:
- **Explicit Labels:** Every segment contains both a supporting icon and a visible text label. On small mobile screens, a responsive media query scales the layout by hiding the icon while preserving the vital text labels.
- **Frictionless Keyboard Use:**
  - Parent Container: `role="tablist"` with `aria-label="Result layout view"`.
  - Child Elements: `role="tab"` with `aria-selected="true" | "false"` and `aria-controls="panel-id"`.
  - Arrow keys (Left/Right) cycle focus. Pressing `Space` or `Enter` confirms and switches the layout instantly.
- **Robust Touch Targets:** The track height is set to `40px` and individual buttons are styled with physical click targets of `36px` height and dynamic width matching text padding (`12px 16px`), easily meeting touch constraints.
