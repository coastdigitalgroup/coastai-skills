---
name: mobile-viewport-implementation
description:
  Implement and debug layouts that handle modern mobile viewport dynamics (svh,
  dvh, lvh) and hardware overlays using safe area insets.
---

# Mobile Viewport Implementation

## Purpose

The Mobile Viewport Implementation skill provides a technical protocol for
building "app-like" layouts and full-screen components that respond correctly to
mobile browser chrome (address bars, toolbars) and hardware features (notches,
home indicators). It solves the "100vh problem" and prevents content clipping in
safe areas.

## Use Cases

- Building a "Full Height" landing page or hero section that doesn't overflow
  when the browser toolbar appears/disappears.
- Implementing sticky bottom navigation bars or CTA buttons that must sit above
  the iOS home indicator.
- Creating full-screen modal overlays or menus that should exactly fill the
  visible area.
- Handling horizontal content clipping on devices with "notches" in landscape
  orientation.

## When NOT to Use

- **Standard Document Flow:** Most content-heavy pages should scroll naturally;
  forcing viewport heights can break the user experience.
- **Desktop-Only Sites:** These CSS properties have little to no effect on
  desktop browsers where viewports are stable.
- **In-Content Elements:** Only use these patterns for layout containers or
  fixed overlays, not for individual paragraphs or images within a flow.

## Inputs

1. **Layout Goal:** Is it a "Fixed Full Screen" (like a game or app) or a "Hero
   Section"?
2. **Target UI Elements:** Which elements are sticky or fixed to the edges?
3. **Environment:** Does the site support landscape orientation on mobile?

## Outputs

1. **Adaptive CSS Layout:** Use of `svh`, `lvh`, and `dvh` units for height
   management.
2. **Safe Area Integration:** Implementation of `env(safe-area-inset-*)`
   variables.
3. **Viewport Meta Tag:** Correct configuration of `viewport-fit=cover`.

## Workflow

### 1. Configure the Viewport Meta Tag

- Ensure the `<meta name="viewport">` includes `viewport-fit=cover` to allow the
  layout to expand into the safe areas (under the notch).

### 2. Choose the Correct Viewport Unit

- **`svh` (Small Viewport Height):** Use for elements that must stay visible
  even when browser chrome is fully expanded.
- **`lvh` (Large Viewport Height):** Use for elements that should fill the area
  when browser chrome is retracted.
- **`dvh` (Dynamic Viewport Height):** Use for elements that should resize in
  real-time as the user scrolls and chrome changes. *Note: Can cause layout
  jank if misused.*

### 3. Handle Safe Area Insets

- Apply padding or margins to fixed/absolute elements using CSS `env()`
  variables:
  - `env(safe-area-inset-top)`
  - `env(safe-area-inset-bottom)`
  - `env(safe-area-inset-left)`
  - `env(safe-area-inset-right)`
- Provide a fallback value for browsers that don't support `env()` (e.g.,
  `padding-bottom: 20px; padding-bottom: env(safe-area-inset-bottom);`).

### 4. Implement Cumulative Safe Areas

- If an element already has padding, use `calc()` to add the safe area:
  `padding-bottom: calc(1rem + env(safe-area-inset-bottom));`.

### 5. Debug Landscape Clipping

- For horizontal layouts, ensure side padding uses `safe-area-inset-left` and
  `right` to prevent the notch from cutting off text or buttons.

## Decision Rules

- **`100vh` vs `100dvh`:** Avoid `100vh` for full-screen layouts on mobile; it
  often ignores the address bar. Use `100dvh` for components that need to be
  exactly full-screen, or `100svh` to guarantee nothing is hidden behind
  toolbars.
- **Padding vs Margin:** Use padding for safe area insets on containers with
  backgrounds to ensure the background extends to the screen edge while content
  remains safe.
- **Fallback Strategy:** Always provide a static fallback for `env()` variables
  to support older browsers or desktop environments.

## Constraints

- **Performance:** Excessive use of `dvh` can trigger frequent layout
  recalculations during scroll.
- **Browser Support:** While `svh/dvh/lvh` are widely supported in modern
  evergreen browsers, check compatibility for older iOS/Android versions.
- **User Interaction:** Fixed elements at the bottom of the screen can interfere
  with system gestures (like swiping home).

## Non-Goals

- Handling orientation change events in JavaScript.
- Polyfilling viewport units for very old browsers (pre-2022).
- General responsive breakpoint management (covered by other skills).

## Common Failure Patterns

- **The "Notch Cut":** Text or buttons being hidden behind the camera notch in
  landscape mode because `viewport-fit=cover` was used without
  `safe-area-inset`.
- **The "Floating Button":** A bottom-fixed button sitting too high or being
  partially covered by the iOS home indicator.
- **Jumpy Layouts:** Using `dvh` on many elements, causing the page to "stutter"
  as the user scrolls and the address bar resizes.
- **100vh Overflow:** Creating a "100vh" container that requires scrolling to
  see the bottom CTA because the browser's bottom bar is taking up space.

## Validation Criteria

- [ ] **Physical Device/Simulator Test:** Test on a device with a notch (iPhone
      X or later) in both portrait and landscape.
- [ ] **Chrome Resize Test:** Use "Device Mode" in Chrome DevTools and toggle
      the device toolbar to simulate address bar appearance.
- [ ] **Horizontal Scroll Check:** Ensure `viewport-fit=cover` doesn't introduce
      unwanted horizontal scrolling.
- [ ] **Accessibility Check:** Verify that interactive elements in the safe area
      are still reachable and not obstructed by system UI.
