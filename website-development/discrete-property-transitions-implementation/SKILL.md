---
name: discrete-property-transitions-implementation
description: Animate entry and exit transitions for elements toggling display none, visibility hidden, or top-layer overlay using CSS @starting-style, transition-behavior allow-discrete, and overlay property without JavaScript animation timers or forced reflow hacks.
---

# Discrete Property Transitions Implementation

## Purpose

The Discrete Property Transitions Implementation skill provides a standardized architectural protocol, reusable CSS patterns, and diagnostic heuristics for smoothly animating entry and exit transitions of DOM elements whose visibility or presence is controlled by discrete properties (such as `display: none` to `display: block`, `visibility: hidden` to `visibility: visible`, or top-layer `overlay: none` to `overlay: auto`).

Historically, CSS transitions required elements to remain in the rendering tree (`display: block` or similar) with non-discrete properties (`opacity`, `transform`) changed via JS or CSS classes. Removing an element from the layout flow via `display: none` instantly aborted all transitions, leading developers to rely on complex JS event listeners (`transitionend`), timeout hacks (`setTimeout`), or JS animation libraries that introduced timing bugs and layout shifts.

With modern CSS features (`@starting-style`, `transition-behavior: allow-discrete` / `transition: ... allow-discrete`, and the `overlay` property), elements can smoothly animate both **into** the DOM (defining initial styles before first render) and **out of** the DOM (delaying `display: none` until exit animations complete) entirely in declarative CSS.

---

## Use Cases

- **Native `<dialog>` and Popover Entry/Exit Animations:** Smoothly animating backdrop blur, opacity, and scale transforms when opening and closing native `<dialog>` elements (`showModal()`) or Popover API elements (`popovertarget`).
- **Expandable Accordions and Dropdown Menus:** Transitioning conditionally rendered or hidden subtrees from `display: none` to `display: block` with smooth height, opacity, and clip-path transitions.
- **Toast Notifications and Floating Alerts:** Animating toast notifications sliding onto screen from `display: none` and transitioning back out before removing layout footprint.
- **Off-Canvas Drawers & Mobile Nav Bars:** Sliding mobile drawer navigation elements into view while keeping them inert and hidden (`display: none`) when closed to prevent off-screen tab-stop traps.
- **Tooltip and Context Menu Overlays:** Positioned popovers transitioning smoothly without flash-of-unstyle or remaining interactive when visually hidden.

---

## When NOT to Use

- **Continuously Rendered Elements:** UI elements that remain visible or mounted in the layout tree and only shift continuous properties (e.g., hover color changes, button active states, persistent sidebars).
- **View Transitions API Scenarios:** Full page navigations or cross-document DOM morphs where multi-element shared transitions are managed via `document.startViewTransition()`.
- **Complex Sequence Canvas / WebGL Animations:** Multi-stage keyframe canvas animations or heavy physics-driven motion graphics requiring JavaScript frame-by-frame physics loops.
- **Legacy Browser Requirements Without Fallback:** Legacy browser targets (e.g., Safari < 17.4 or Chrome < 117) where graceful degradation to instant display toggle without progressive enhancement fallback is unacceptable.

---

## Inputs

1. **Target DOM Element / Component Markup:** The HTML structure for the dialog, popover, drawer, or toggleable element (e.g., `<dialog>`, `<div popover>`, `<div class="accordion-content">`).
2. **Trigger Logic:** The mechanism toggling the element state (e.g., native `.showModal()`, HTML `popovertarget`, `[aria-expanded="true"]`, or state-driven `[data-state="open"]`).
3. **Motion Parameters:** Easing curves, durations (e.g., `250ms cubic-bezier(0.16, 1, 0.3, 1)`), and visual property targets (`opacity`, `transform`, `height`, `backdrop-filter`).

---

## Outputs

1. **Declarative Discrete Transition Stylesheet:** Fully functional CSS implementing `@starting-style`, `transition-behavior: allow-discrete` (or shorthand `transition: ... allow-discrete`), and top-layer `overlay` transition rules.
2. **Progressively Enhanced Fallback Logic:** `@supports` queries or graceful degrade fallbacks ensuring instant display switching in older browsers while providing smooth animations in supporting engines.
3. **Accessibility-Preserving Focus & Interactivity Rules:** Clean DOM lifecycle handling ensuring elements are unreachable by keyboard/screen-readers when closed (`display: none`).

---

## Workflow

### 1. Structure the Base Visible and Hidden States

Define the element's default hidden state (`display: none`, `opacity: 0`, hidden transforms) and its open/active state (`display: block` / `display: revent`, `opacity: 1`, identity transform).

```css
/* Closed / Hidden State (Default) */
.toggle-panel {
  display: none;
  opacity: 0;
  transform: translateY(-8px);
  /* Step 1: Enable discrete transitions on display and opacity */
  transition:
    display 0.3s allow-discrete,
    opacity 0.3s ease-out,
    transform 0.3s ease-out;
}

/* Open / Active State */
.toggle-panel[aria-expanded="true"],
.toggle-panel.is-open {
  display: block;
  opacity: 1;
  transform: translateY(0);
}
```

### 2. Define Entry Styles with `@starting-style`

Use the `@starting-style` rule block to establish the "before-change" property values for when the element transitions from `display: none` to `display: block` (or when first inserted into the DOM top layer).

```css
/* Step 2: Set initial properties for entry transition */
@starting-style {
  .toggle-panel[aria-expanded="true"],
  .toggle-panel.is-open {
    opacity: 0;
    transform: translateY(-8px);
  }
}
```

### 3. Handle Top-Layer Elements (`<dialog>` and Popovers)

For native `<dialog>` and Popover API elements, transition the `overlay` property along with `display` to allow the top-layer overlay state to persist during the exit transition. Also apply `@starting-style` to `::backdrop`.

```css
/* Top-layer dialog or popover base styles */
dialog[open],
[popover]:popover-open {
  display: block;
  opacity: 1;
  transform: scale(1);
  /* Transition display AND overlay allow-discrete */
  transition:
    display 0.25s allow-discrete,
    overlay 0.25s allow-discrete,
    opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Starting style for dialog opening */
@starting-style {
  dialog[open],
  [popover]:popover-open {
    opacity: 0;
    transform: scale(0.95);
  }

  dialog[open]::backdrop {
    background-color: rgb(0 0 0 / 0%);
    backdrop-filter: blur(0px);
  }
}

/* Closed dialog styles */
dialog {
  opacity: 0;
  transform: scale(0.95);
  display: none;
}

/* Backdrop closed & transition */
dialog::backdrop {
  background-color: rgb(0 0 0 / 50%);
  backdrop-filter: blur(4px);
  transition:
    display 0.25s allow-discrete,
    overlay 0.25s allow-discrete,
    background-color 0.25s ease-out,
    backdrop-filter 0.25s ease-out;
}
```

### 4. Provide Fallback for Older Browsers

Ensure that browsers without `@starting-style` support degrade gracefully to instant toggling without getting stuck invisible.

```css
@supports not (transition-behavior: allow-discrete) {
  /* Fallback: Instant display toggle without broken opacity loops */
  .toggle-panel {
    transition: opacity 0.3s ease-out;
  }
  .toggle-panel:not([aria-expanded="true"]) {
    display: none;
  }
}
```

---

## Decision Rules

### Property Transition Matrix

| Element Type / Scenario | Key Properties to Transition | `allow-discrete` Target | `@starting-style` Required? |
| :--- | :--- | :--- | :--- |
| **Standard In-Flow Element (Accordion, Alert)** | `display`, `opacity`, `grid-template-rows`, `transform` | `display` | **Yes** (defines entry state) |
| **Native `<dialog>` (`showModal()`)** | `display`, `overlay`, `opacity`, `transform`, `::backdrop` | `display`, `overlay` | **Yes** (dialog & `::backdrop`) |
| **Popover API (`popover="auto"`)** | `display`, `overlay`, `opacity`, `transform` | `display`, `overlay` | **Yes** (for `:popover-open`) |
| **Visibility Toggle (`visibility: hidden`)** | `visibility`, `opacity` | `visibility` | **Optional** (if `display` unchanged) |

---

## Constraints

- **Browser Requirements:**
  - `transition-behavior: allow-discrete` / `@starting-style`: Supported in Chrome 117+, Edge 117+, Firefox 129+, Safari 17.4+.
  - Always verify graceful degradation on older iOS Safari / Android WebView versions.
- **Top-Layer Requirements:**
  - For `<dialog>` and `[popover]`, `overlay` property **must** be included in the transition list with `allow-discrete` to delay top-layer dismissal until the exit animation finishes.
- **Accessibility Requirements:**
  - Ensure `display: none` is applied at the end of exit transitions so hidden content cannot receive focus, screen reader announcements, or pointer events.
  - Respect `prefers-reduced-motion: reduce` by setting transition durations to `0.01ms` or `none`.

---

## Non-Goals

- Replacing FLIP JS animations for complex list reordering.
- Managing JavaScript state logic or event handling outside of element triggers.
- Polyfilling CSS `@starting-style` using heavy runtime DOM mutation observers.

---

## Common Failure Patterns

- **Missing `allow-discrete` Keyword:** Specifying `transition: display 0.3s;` without `allow-discrete` or `transition-behavior: allow-discrete`. Result: The display switches instantly without exit animation.
- **Forgetting `overlay` on Dialogs:** Transitioning `display` and `opacity` on a `<dialog>` but omitting `overlay`. Result: The dialog drops out of top-layer instantly upon closing, hiding backdrop and clipping content behind other elements during exit.
- **Omitting `@starting-style`:** Defining exit transitions but no `@starting-style`. Result: Entry animation fails or flashes instantaneously because the browser compares new `display: block` styles against current `display: block` styles rather than pre-render initial styles.
- **Specificity Overrides on `@starting-style`:** Placing `@starting-style` blocks above selector rule definitions with lower specificity, causing starting styles to be overridden.

---

## Validation Steps

### 1. Visual Verification (Entry & Exit Transitions)
- [ ] Open the dialog/popover/accordion and verify smooth entry fade/scale/slide animation.
- [ ] Close the dialog/popover/accordion and confirm exit animation completes fully **before** `display: none` removes the element from layout.

### 2. DevTools Animations & Layer Inspection
- [ ] Open DevTools **Animations** panel and trigger entry/exit. Confirm CSS transition events execute on both open and close triggers.
- [ ] Inspect element during close animation to verify `overlay: auto` remains active during top-layer exit transition.

### 3. Keyboard & Screen Reader Accessibility Audit
- [ ] Attempt to tab into the closed element after exit transition. Confirm element is completely removed from tab order (`display: none`).
- [ ] Verify `prefers-reduced-motion` media query disables transitions for users requesting reduced motion.
