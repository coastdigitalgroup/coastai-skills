---
name: css-interaction-media-queries
description:
  Design, build, and debug responsive frontend interfaces that dynamically adapt to device input mechanisms—mouse, trackpad, touch screen, stylus, or hybrid—using CSS Level 4 Interaction Media Features (`pointer`, `hover`, `any-pointer`, `any-hover`). Eliminate sticky hover artifacts on touch, enlarge touch targets for coarse pointers, and optimize density for fine pointers.
---

# CSS Interaction Media Queries

## Purpose

The CSS Interaction Media Queries skill provides a standardized framework, utility patterns, and debugging heuristics for tailoring Web frontend UI interactions directly to the physical capabilities of user input devices (`pointer`, `hover`, `any-pointer`, `any-hover`).

Traditionally, developers relied on viewport width media queries (`@media (max-width: 768px)`) as a proxy for touch devices. With modern hardware—including touchscreen laptops, tablets with precision trackpads, 4K touch kiosks, and smartphones with external Bluetooth mice—screen size no longer correlates directly with pointer precision or hover capability.

Applying hover styles or compact touch targets based solely on screen width causes severe usability breakdowns:
- **Sticky Hover Artifacts:** On touch devices (iOS Safari, Android Chrome), tapping a button triggers `:hover` styles, which remain stuck on screen until the user taps elsewhere.
- **Unclickable Touch Elements:** Desktop screens with touch capability render tiny mouse-optimized buttons (24px) that are frustratingly difficult to tap with a thumb or finger.
- **Lost Hybrid Input Context:** Laptops with both trackpads and touchscreens hide essential hover actions (like card quick-actions or tooltips) when touch is used, or break mouse navigation when coarse styles take over globally.

By leveraging CSS Interaction Media Features, web applications inspect actual hardware capability (pointing accuracy and hover ability) independently from screen viewport dimensions.

---

## Use Cases

- **Eliminating "Sticky Hover" on Mobile and Touchscreens:** Guarding CSS `:hover` states so visual transformations (like scale, background color shifts, or elevated drop shadows) only trigger on primary fine pointing devices capable of real hovering (`@media (hover: hover)`).
- **Adaptive Touch Target Sizes (WCAG 2.2 Target Size):** Dynamically scaling button dimensions, hitboxes, checkboxes, and tap zones from compact desktop spacing (32px / 24px) to finger-friendly sizing (minimum 44px–48px) when a coarse primary input device is detected (`@media (pointer: coarse)`).
- **Hybrid Device Adaptability (Touchscreens with Mice/Trackpads):** Supporting multi-input systems (e.g., iPad Pro with Magic Trackpad or Microsoft Surface Laptop) using `any-pointer` and `any-hover` to expose affordances whenever *any* connected input device supports precision pointing or hover.
- **Disclosure of Hover-Dependent UI Controls:** Safely revealing secondary action overlays (e.g., "Quick View" buttons on e-commerce product cards or table row actions) as persistent inline controls when hover is unavailable (`@media (hover: none)`), while preserving hover-reveal behavior for mouse users.
- **Optimizing Interactive Form Controls:** Adjusting custom dropdown menus, slider thumbs, datepickers, and range inputs for finger dragging versus precision mouse cursor positioning.

---

## When NOT to Use

- **Layout Structure & Responsive Grids:** Do not use interaction media queries to alter overall column layouts, multi-column grids, or sidebar collapsible states. Layout structure depends on viewport width and container queries (see `css-grid-layout-implementation` and `container-queries-implementation`).
- **Device Detection via User-Agent String:** Do not use user-agent parsing in JavaScript as a proxy for touch or pointer capabilities. UA string inspection is fragile and does not account for connected peripherals.
- **Replacing Semantic Focus/Active States:** Do not remove `:focus-visible` or `:active` pseudoclasses inside `@media (hover: hover)`. Keyboard navigation and tactile touch feedback must remain fully functional regardless of hover capability (see `focus-visible-styling-system`).

---

## Inputs

1. **Target Component Stylesheet:** The CSS/SCSS or CSS Module files defining interactive components (buttons, cards, menus, forms, tooltips).
2. **Primary Input Capability Requirements:** The desired behavior based on the primary pointing device (`pointer: fine` vs `pointer: coarse`) and hover capability (`hover: hover` vs `hover: none`).
3. **Secondary/Hybrid Input Context:** Requirements for fallback or multi-input support (`any-pointer: fine` / `any-hover: hover`).

---

## Outputs

1. **Input-Aware CSS Utility Classes & Mixins:** Standardized rulesets defining hover guards, touch target expansions, and adaptive UI density.
2. **Sticky Hover Elimination Architecture:** Refactored `:hover` states enclosed within `@media (hover: hover)` blocks, with explicit `:active` states preserved for touch feedback.
3. **Accessible Touch-First Component Styles:** Touch-friendly interfaces meeting WCAG 2.2 Target Size (Minimum 24x24px, recommended 44x44px/48x48px) on coarse devices.

---

## Workflow

### Step 1: Audit Interactive Elements for Hover & Pointer Dependencies
Identify all components relying on mouse interaction:
- Check for hover transitions on cards, buttons, links, and table rows.
- Search for components that reveal critical content or controls *only* on `:hover` (e.g., dropdown submenus, image zoom tools, action icons).
- Measure tap targets on mobile and touch devices to ensure they meet the 44px x 48px target recommendation.

### Step 2: Enclose Pure Hover Rules inside `@media (hover: hover)`
Wrap all pure hover visual feedback inside a `@media (hover: hover)` feature query. This prevents mobile browsers from trapping persistent `:hover` styles on tap.

```css
/* BEFORE (Causes sticky hover on touch) */
.btn:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
}

/* AFTER (Clean separation of hover, active, and focus) */
@media (hover: hover) {
  .btn:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-2px);
  }
}

/* Always provide immediate touch tap feedback using :active */
.btn:active {
  transform: translateY(0);
  background-color: var(--color-primary-darker);
}
```

### Step 3: Implement Adaptive Sizing with `@media (pointer: coarse)`
Define compact UI dimensions by default (or for `pointer: fine`), then scale touch targets up when `pointer: coarse` is active.

```css
/* Compact desktop / mouse defaults */
.icon-button {
  min-width: 32px;
  min-height: 32px;
  padding: 6px;
}

/* Expanded finger target on touch screens */
@media (pointer: coarse) {
  .icon-button {
    min-width: 44px;
    min-height: 44px;
    padding: 10px;
  }
}
```

### Step 4: Handle Hover-Dependent UI Disclosures with `@media (hover: none)`
If secondary actions (e.g., card action buttons) are hidden by default and revealed on `:hover`, expose them permanently when hover capability is absent (`hover: none`).

```css
.card-actions {
  opacity: 1; /* Exposed by default for touch / hover: none */
  visibility: visible;
}

@media (hover: hover) {
  /* Hide until hovered when precision mouse pointer is available */
  .card-actions {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
  }

  .card:hover .card-actions,
  .card:focus-within .card-actions {
    opacity: 1;
    visibility: visible;
  }
}
```

### Step 5: Support Hybrid Devices with `any-pointer` and `any-hover`
When designing for hybrid hardware (like a touchscreen laptop or an iPad with trackpad), use `any-hover: hover` or `any-pointer: fine` to detect if a mouse or trackpad is connected as a secondary input mechanism, even if the primary device reported by OS is coarse.

```css
/* If ANY connected input device supports precision pointing, show custom context tooltips */
@media (any-hover: hover) {
  .has-tooltip {
    position: relative;
  }
}
```

---

## Decision Rules

| Query Combination | Target Device Category | Recommended Implementation |
| :--- | :--- | :--- |
| `(hover: hover) and (pointer: fine)` | Mouse, trackpad, desktop browser, laptop trackpad | Enable rich hover transformations, compact 32px buttons, hover tooltips, smooth cursor animations. |
| `(hover: none) and (pointer: coarse)` | Smartphone, tablet, touchscreen kiosk, smartwatch | Strip `:hover` transforms. Enlarge target hitboxes to min 44x44px. Render hover controls inline. Use `:active` for tap state. |
| `(hover: hover) and (pointer: coarse)` | Nintendo Switch, stylus-enabled touchscreen tablet, smart TV with air-mouse | Enable hover effects on focus/pointer over, but maintain large touch-friendly target hitboxes. |
| `(any-pointer: fine)` | Hybrid touchscreen laptop with plugged-in mouse, iPad with Bluetooth mouse | Keep touch targets accessible while exposing hover shortcuts and precise custom selection handles. |

---

## Constraints

- **WCAG 2.2 Target Size (2.5.8):** Touch target minimum size must be at least 24x24 CSS pixels, with Level AAA recommending 44x44 CSS pixels. When `pointer: coarse` is matched, ensure hitboxes meet at least 44x44px or 48x48px with adequate spacing (`gap`).
- **JavaScript `matchMedia` Synchronization:** When using JavaScript to observe input capabilities (e.g., `window.matchMedia('(pointer: coarse)').matches`), attach a listener (`change` event) to handle dynamically connected external mice or trackpads.
- **Browser Compatibility:** Interaction Media Features are supported in all modern browsers (Chrome 38+, Safari 9+, Firefox 64+, Edge 79+). Legacy Internet Explorer does not support them, so default base styles should represent a usable mobile-friendly baseline.
- **Virtual Pointer / Emulation:** Chromium DevTools device emulation mode toggles `pointer: coarse` and `hover: none`. Always test with both simulated touch and physical hardware.

---

## Non-Goals

- Replacing responsive breakpoint media queries based on viewport width (`@media (min-width: 768px)`).
- Managing keyboard focus rings (use `focus-visible-styling-system`).
- Handling complex touch gestures or drag-and-drop velocity tracking (use `touch-gesture-implementation`).

---

## Common Failure Patterns

- **The "Un-Hoverable Touch Card" Failure:** Relying on `:hover` to show critical links on a card. On touchscreens, tapping the card navigates immediately or traps the hover state, rendering action buttons unreachable.
- **The "Sticky Hover Tap" Glitch:** Applying scale up animations on `:hover` without `@media (hover: hover)`. Tapping a button leaves it visually stuck in the scaled-up "hovered" state until the user taps somewhere else on the page.
- **The "Small Screen = Touch" Fallback Delusion:** Writing `@media (max-width: 768px) { .btn:hover { display: none; } }`. This breaks for desktop users with small browser windows and fails for high-DPI tablets with 1024px+ viewports.
- **Removing Focus Rings for Coarse Pointers:** Disabling focus indicators when `pointer: coarse` is active, breaking accessibility for screen reader or Bluetooth keyboard users on tablets.
- **Hardcoding Touch Event Listeners (`ontouchstart` check):** Detecting touch support in JS using `'ontouchstart' in window`. Almost all modern desktop Chrome/Edge browser instances return `true` on touchscreen-capable laptops, incorrectly forcing touch-only UI modes on desktop mouse users.

---

## Validation Steps

### 1. Automated Media Query Inspection
- [ ] Verify that all `:hover` pseudo-class rules in stylesheets are enclosed in `@media (hover: hover)` or paired with accessible focus/active alternatives.
- [ ] Validate that `@media (pointer: coarse)` rules enforce minimum target sizes of 44px x 48px for interactive elements.

### 2. Device Emulation & Physical Testing
- [ ] **Emulated Touch Check:** Open Chrome/Safari DevTools, activate Mobile Device Mode (coarse pointer). Tap buttons and verify that no hover styles remain stuck on screen after release.
- [ ] **Emulated Mouse Check:** Switch DevTools back to Desktop Mode (fine pointer). Hover over buttons and cards, verifying smooth hover state triggers and transitions.
- [ ] **Hybrid Device Verification (Touchscreen Laptop / iPad with Trackpad):** On a hybrid device, verify that plugging in a mouse or pairing a trackpad seamlessly exposes hover affordances without shrinking touch target hitboxes below usable bounds.
