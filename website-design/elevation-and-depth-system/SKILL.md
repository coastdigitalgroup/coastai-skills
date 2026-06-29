---
name: elevation-and-depth-system
description:
  Design and implement a systematic framework for the Z-axis, using shadows,
  layering, and stacking contexts to communicate hierarchy and depth.
---

# Elevation and Depth System

## Purpose

The Elevation and Depth System provides a methodology for managing the vertical
dimension (Z-axis) of a web interface. It uses visual cues like shadows,
surface treatments, and stacking orders to establish a clear hierarchy of
layers. This system ensures that users understand the relationship between
overlapping elements, can identify interactive surfaces, and experience a
predictable, tactile environment that mimics real-world depth.

## Use Cases

- Defining a consistent shadow scale for a design system.
- Designing complex, multi-layered interfaces like dashboards or IDEs.
- Establishing stacking order (z-index) standards to prevent UI "clashing."
- Providing tactile feedback for interactive states (e.g., a button lifting on
  hover).
- Distinguishing between persistent page content and temporary overlays.

## When NOT to Use

- **Flat/Brutalist Designs:** Where the intentional aesthetic is 2D and lacks
  perceived depth or shadows.
- **Purely Text-Based Content:** Simple articles or documents where there are
  no overlapping layers or interactive surfaces.
- **Performance-Critical Low-End Devices:** Where heavy use of CSS filters or
  complex box-shadows might cause significant rendering lag.

## Inputs

1. **Brand Aesthetic:** Is the depth "Physical/Material" (realistic shadows) or
   "Graphic" (solid offsets)?
2. **Component Inventory:** A list of all UI elements that require elevation
   (Cards, Navbars, Modals, Buttons).
3. **Primary Light Source:** Usually assumed to be coming from the top or
   top-center.
4. **Spacing System:** The `fluid-spacing-system` to align shadow spreads with
   layout margins.

## Outputs

1. **Elevation Scale (Shadows):** A set of 5-6 standardized box-shadow tokens
   (e.g., `elevation-sm` to `elevation-xl`).
2. **Stacking Context Map (Z-Index):** A defined scale of z-index values
   categorized by layer function.
3. **Surface Palette:** Definitions for background colors that shift based on
   elevation (e.g., darker surfaces "sink," lighter surfaces "rise").
4. **Interaction Spec:** Rules for how elevation changes during Hover, Active,
   and Focus states.

## Workflow

### 1. Establish the Stacking Tiers

Divide the interface into functional layers from bottom to top:
- **Level 0 (Base):** The page background/canvas.
- **Level 1 (Flat):** Content that sits on the base (e.g., flat cards, dividers).
- **Level 2 (Raised):** Interactive elements or primary cards that "float"
  subtly.
- **Level 3 (Sticky/Floating):** Global headers, FABs (Floating Action Buttons).
- **Level 4 (Overlay):** Modals, Drawers, and their backdrops.
- **Level 5 (System):** Tooltips, Toasts, and critical alerts.

### 2. Define the Shadow Scale

Create a progression of shadows that correspond to the distance from the base:
- **Small (2dp):** Subtle separation for buttons or small cards.
- **Medium (4dp-8dp):** Standard elevation for dropdowns and navigation.
- **Large (12dp-24dp):** High elevation for modals and floating layers.
- **X-Large (32dp+):** Dramatic depth for temporary focus or system alerts.

*Note: Use multiple shadow layers (e.g., a "sharp" shadow and a "soft" shadow)
for a more realistic, high-quality effect.*

### 3. Assign Surface Colors

Depth isn't just about shadows; it's also about light reflection:
- **Light Mode:** Higher elevation elements often become slightly lighter or
  maintain pure white while the base is off-white.
- **Dark Mode:** Higher elevation elements MUST become lighter (using semi-
  transparent white overlays) to simulate being closer to the light source.

### 4. Create Interaction "Lifts"

Apply the `interactive-state-system` to the Z-axis:
- **Hover:** Increase the shadow blur and spread to simulate the element
  lifting toward the user.
- **Active (Click):** Decrease or remove the shadow to simulate the element
  being pressed down into the surface.

### 5. Document the Stacking Strategy (Z-Index)

Prevent "Z-Index Wars" by using a 10-step or 100-step scale:
- `0`: Default
- `100`: Navigation/Header
- `500`: Backdrops
- `600`: Modals/Drawers
- `1000`: Tooltips/Toasts

## Decision Rules

- **The Light Source Rule:** All shadows in the system MUST share the same
  implied light source (usually top-down) to maintain visual logic.
- **Elevation equals Importance:** The most important temporary information
  (e.g., an Alert) should have the highest elevation and the most dramatic
  shadow.
- **Shadow vs. Border:** Use borders for structure (Level 0-1) and shadows for
  depth (Level 2+). Don't use both heavily on the same element unless the
  brand is highly "skeuomorphic."
- **Dark Mode Elevation:** In dark mode, never use dark shadows on dark
  backgrounds. Use surface color lightening (lightness shifts) as the primary
  depth cue.

## Constraints

- **Accessibility:** Elevation cues (shadows) should supplement, not replace,
  structural cues. Ensure elements have enough contrast or borders to be
  identifiable without the shadow.
- **Performance:** Avoid `box-shadow` on elements that animate frequently or
  sit inside high-frequency scroll containers.
- **Responsiveness:** Large shadows can "bleed" off the screen on mobile;
  reduce shadow spread or switch to borders on small viewports.

## Common Failure Patterns

- **Inconsistent Light Sources:** Having some shadows go right and others go
  down, creating a "drunken" or fragmented interface.
- **Z-Index "Magic Numbers":** Using `z-index: 99999` to solve a problem,
  which eventually leads to unmaintainable code.
- **Muddy Shadows:** Using pure black (#000) for shadows instead of a
  transparent version of the surface color or a dark neutral.
- **Flat Overlays:** Designing a modal with no shadow or backdrop, making it
  blend into the content behind it.
- **Over-Elevating:** Giving every card a heavy shadow, which flattens the
  hierarchy because nothing stands out.

## Validation Criteria

- [ ] A consistent 5-6 step elevation scale is defined and used.
- [ ] All shadows share a single, consistent light source.
- [ ] Z-index values are grouped into logical, documented tiers.
- [ ] Dark mode uses surface lightness shifts to indicate depth.
- [ ] Interaction states (Hover/Active) include vertical movement or shadow
      shifts.
- [ ] Shadows do not cause horizontal or vertical overflow on mobile.
- [ ] Elements are distinguishable even if shadows are removed (A11y check).
