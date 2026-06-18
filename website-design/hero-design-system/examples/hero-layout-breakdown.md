# Hero Layout Breakdown Examples

This document demonstrates the application of the Hero Design System to two
common design problems: a B2B SaaS product introduction and an emotional
Brand Storytelling page.

---

## Example 1: The Product-First "Split Layout"
**Context:** A B2B SaaS landing page for a project management tool.

### The Problem
The company needs to showcase its clean UI while simultaneously delivering a
strong value proposition and a clear signup path.

### The Solution: 50/50 Split Pattern
- **Layout:** Horizontal split on desktop (60% text, 40% visual).
- **Typography:**
    - **Headline (H1):** 48px, Bold, Dark Neutral. "Manage Projects without the
      Chaos."
    - **Subheadline:** 20px, Regular, Muted Neutral. "The intuitive workspace for
      teams who need to get things done, not just talk about them."
- **Visual Anchor:** A high-fidelity screenshot of the dashboard's "Task View,"
  showing the product in action.
- **CTA:** Primary "Start Free Trial" button in high-contrast Brand Blue.
- **Spatial Rhythm:**
    - `padding-top/bottom: 80px`
    - `gap: 40px` between text and visual columns.

### Mobile Adaptation
On mobile viewports, the layout shifts to a **Natural Stack**:
1. Headline & Subheadline (Center-aligned)
2. Primary CTA (Full-width)
3. Dashboard Screenshot (Placed below the CTA to provide context after the
   pitch).

---

## Example 2: The Immersive "Layered Overlay"
**Context:** A high-end outdoor equipment brand's homepage.

### The Problem
The brand needs to evoke an emotional response through immersive photography
while keeping the navigation and CTA functional.

### The Solution: Centered Stack with Scrim
- **Layout:** Full-width, full-height background image with centered content.
- **Typography:**
    - **Headline (H1):** 64px, Extra Bold, White. "Go Where Others Won't."
    - **Subheadline:** 24px, Medium, White. "Gear designed for the world's most
      demanding environments."
- **Visual Anchor:** A high-resolution, wide-angle photo of a hiker on a mountain
  ridge.
- **Readability Treatment:**
    - **Radial Scrim:** A subtle dark gradient starting from the center (30%
      opacity) to ensure white text pops regardless of the sky's brightness.
- **CTA:** A white "Shop the Collection" button with a semi-transparent
  background and a heavy border.

### Mobile Adaptation
- **Height:** Shifts from `100vh` to `auto` with `min-height: 500px` to avoid
  the "mobile-keyboard-height" bug and ensure content fits.
- **Cropping:** The background image uses `background-position: center top` to
  keep the hiker (the focal point) visible even when the sides are cropped.
