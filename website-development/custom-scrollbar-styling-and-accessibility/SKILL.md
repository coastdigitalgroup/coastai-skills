---
name: custom-scrollbar-styling-and-accessibility
description:
  Style custom browser scrollbars using standard CSS properties (scrollbar-width,
  scrollbar-color) and legacy vendor pseudo-elements while preserving WCAG AA
  contrast, keyboard focusability, forced-colors accessibility, and touch target usability.
---

# Custom Scrollbar Styling and Accessibility

## Purpose

The Custom Scrollbar Styling and Accessibility skill provides a standardized CSS and HTML engineering methodology for styling scrollbars across modern browsers without destroying accessibility, usability, or operating system accessibility modes. Custom scrollbar styling frequently introduces critical WCAG non-compliance issues—such as invisible scroll thumbs with poor contrast, hidden scrollbars that block keyboard users from discovering scrollable overflow regions, broken Windows Forced Colors Mode (High Contrast Mode), and impossible-to-grab touch/mouse targets. This skill ensures custom scrollbars remain visual, tactile, and screen-reader accessible across Chrome, Safari, Firefox, Edge, and assistive technologies.

## Use Cases

- **Design-System Customization:** Aligning scrollbar track and thumb aesthetics with brand identity or dark/light themes without relying on heavy JavaScript scroll plugins.
- **Scrollable Component Panes:** Styling scrollbars on code blocks, sidebar navigation, data tables, chat message streams, and dashboard widgets.
- **Contrast Remediation:** Fixing low-contrast or invisible browser default scrollbars on custom dark or light background containers.
- **Keyboard Navigation Enforcement:** Ensuring custom scrollable regions (`overflow: auto` / `scroll`) are focusable with `tabindex="0"` and display clear `:focus-visible` indicators.
- **Forced Colors Mode Safeguarding:** Ensuring scrollbars remain visible when users enable Windows High Contrast Mode or forced-colors system settings.

## When NOT to Use

- **Hiding Scrollbars Entirely:** Do not use this skill to hide scrollbars (`scrollbar-width: none` or `::-webkit-scrollbar { display: none; }`) unless alternative, fully accessible on-screen navigation controls (e.g., pagination buttons, previous/next triggers) are provided.
- **Scroll Shift Prevention Only:** If the sole goal is preventing layout jumps when scrollbars toggle on page load or modal open, use `scrollbar-layout-shift-prevention` (`scrollbar-gutter: stable`).
- **Simulated Custom Scroll Mechanics:** If building canvas-based games or completely custom virtualized rendering pipelines where native browser scrolling is bypassed (use specialized DOM virtualizers or WebGL scroll handling instead).

## Inputs

1. **Target Scroll Container:** The HTML element or CSS selector requiring custom scrollbar styles (e.g., `html`, `body`, `.sidebar`, `.code-block`, `.modal-body`).
2. **Theme Palette Tokens:** Background color (`track-color`), thumb color (`thumb-color`), hover thumb color, and focus outline specifications conforming to WCAG AA contrast ratios (3:1 contrast against track and container background).
3. **Container Context:** Dimensional layout constraints, scroll direction (vertical, horizontal, or bi-directional), and system theme context (light/dark mode, forced colors).

## Outputs

1. **Cross-Browser CSS Module:** Progressive CSS rules combining W3C standard properties (`scrollbar-width`, `scrollbar-color`) with legacy Chromium/WebKit pseudo-elements (`::-webkit-scrollbar`, `::-webkit-scrollbar-thumb`, `::-webkit-scrollbar-track`).
2. **Keyboard-Accessible HTML Wrappers:** Accessible DOM structure incorporating `tabindex="0"`, `role="region"`, `aria-label` / `aria-labelledby`, and `:focus-visible` styling.
3. **Forced-Colors Adaptation Rules:** CSS `@media (forced-colors: active)` overrides using system colors (`Canvas`, `CanvasText`, `Highlight`, `ButtonText`) to safeguard high contrast visibility.

## Workflow

### 1. Establish Keyboard Discoverability & Semantics

Native scrollable containers (e.g., `<div>` with `overflow: auto`) are not natively keyboard-focusable in standard browser implementations unless they contain focusable children. Ensure any scrollable element can be navigated and scrolled via Arrow keys, `PageUp`/`PageDown`, and `Home`/`End`.

```html
<!-- Accessible Scroll Region -->
<div
  class="custom-scroll-container"
  tabindex="0"
  role="region"
  aria-label="Code snippet output"
>
  <pre><code>/* Scrollable content */</code></pre>
</div>
```

### 2. Implement Standard W3C Scrollbar CSS

Apply W3C standard CSS Scrollbars Module Level 1 properties. Standard properties take precedence in Firefox, Chrome 121+, Safari 17.4+, and Edge 121+.

```css
.custom-scroll-container {
  overflow: auto;

  /* W3C Standard Properties */
  scrollbar-width: thin; /* 'auto' | 'thin' | 'none' */
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
}
```

### 3. Implement WebKit Legacy Fallbacks

Provide legacy `::-webkit-scrollbar` pseudo-element rules for older WebKit/Blink browsers and granular width/radius styling requirements.

```css
/* Legacy WebKit / Blink Engine Styling */
.custom-scroll-container::-webkit-scrollbar {
  width: 8px;  /* Vertical scrollbar width */
  height: 8px; /* Horizontal scrollbar height */
}

.custom-scroll-container::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
  border-radius: 4px;
}

.custom-scroll-container::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: 4px;
  border: 2px solid var(--scrollbar-track); /* Provides inset spacing */
}

.custom-scroll-container::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover);
}
```

### 4. Apply Keyboard Focus State Indicators

Custom scrollable regions must visibly indicate focus when navigated via keyboard `Tab` key so users know they can operate the scroll container using directional arrows.

```css
.custom-scroll-container:focus-visible {
  outline: 2px solid var(--focus-ring-color, #005fcc);
  outline-offset: 2px;
}
```

### 5. Add Forced Colors Mode (High Contrast) Overrides

Windows High Contrast Mode overrides author-defined CSS background colors. Without explicit `forced-colors` rules, custom scrollbar thumbs or custom scroll tracks may render as invisible blocks.

```css
@media (forced-colors: active) {
  .custom-scroll-container {
    /* Restore system scrollbar colors or rely on system canvas borders */
    scrollbar-color: ButtonText Canvas;
  }

  .custom-scroll-container::-webkit-scrollbar-thumb {
    background: ButtonText;
    border: 1px solid Canvas;
  }

  .custom-scroll-container::-webkit-scrollbar-track {
    background: Canvas;
  }
}
```

## Decision Rules

- **Standard vs Legacy Vendor Rules:** Always declare W3C standard `scrollbar-width` and `scrollbar-color` first, followed by `::-webkit-scrollbar` rules. Modern engines will utilize standard properties while legacy engines fall back to pseudo-elements without syntax collision.
- **Scrollbar Sizing (`thin` vs `auto` vs Custom px):**
  - Use `scrollbar-width: auto` (12px - 16px) for primary document scrolling or containers intended for desktop touch/pointer manipulation.
  - Use `scrollbar-width: thin` (8px) for compact UI regions like code blocks, sidebars, and dropdown lists.
  - Avoid custom pixel widths narrower than `6px` on mouse/pointer interfaces to prevent touch and motor precision failures.
- **Thumb Contrast Requirements:**
  - Thumb color must maintain at least **3:1 contrast ratio** against the scrollbar track color (WCAG 2.1 SC 1.4.11 Non-text Contrast).
  - Thumb color must maintain at least **3:1 contrast ratio** against the adjacent element background color.
- **Hover & Active States:**
  - Provide a distinct visual change on `:hover` (e.g., darker or lighter shade with +1.5:1 contrast increment) and `:active` (dragging) states.

## Constraints

- **Firefox Limitations:** Firefox strictly supports standard `scrollbar-width` (`auto`, `thin`, `none`) and `scrollbar-color`. It intentionally ignores `::-webkit-scrollbar` pseudo-elements and custom pixel widths or border-radii on scrollbars.
- **Mobile Touch Overlay Behavior:** On iOS Safari and Android Chrome, native scrollbars behave as transient overlay indicators that fade automatically during touch scrolling. Forcing static custom scrollbars on mobile can interfere with native inertial scrolling (`-webkit-overflow-scrolling: touch`).
- **Minimum Target Size:** Scrollbar thumbs must maintain a minimum grab length (32px minimum height/width) to allow reliable mouse drag interactions.

## Non-Goals

- Creating JavaScript scroll engines or custom smooth scroll implementations.
- Preventing scrollbar layout shifts (covered under `scrollbar-layout-shift-prevention`).
- Infinite scrolling logic or virtualization (covered under `virtual-list-implementation` and `infinite-scroll-implementation`).

## Common Failure Patterns

- **Invisible Scroll Thumbs:** Setting thumb colors with identical or near-identical brightness to the track background (e.g., `#333` thumb on `#222` track), violating WCAG SC 1.4.11 and making scrolling impossible for low-vision users.
- **Non-Focusable Overflow Containers:** Leaving scrollable `<div>` containers without `tabindex="0"`. Keyboard-only users are trapped and cannot scroll down to view hidden content.
- **Broken High Contrast Mode:** Using custom background colors without `@media (forced-colors: active)` or `forced-color-adjust: none`, causing scrollbar controls to disappear entirely in Windows High Contrast Mode.
- **Tiny Hover Targets:** Making scrollbars 2px or 3px wide, causing mouse users with motor tremors or precision hardware to lose control during drag operations.
- **Missing Focus Outlines:** Removing focus outlines with `outline: none` without providing a custom `:focus-visible` ring on the scroll region.

## Validation Steps

- [ ] **Contrast Verification:** Use a color contrast analyzer to verify `scrollbar-color` thumb vs track ratio is ≥ 3:1.
- [ ] **Keyboard Navigation Test:** Press `Tab` to navigate to the scroll region. Verify focus indicator appears and press `Down Arrow` / `PageDown` to confirm content scrolls.
- [ ] **Cross-Browser Styling Check:** Test in Firefox (Gecko), Chrome (Blink), and Safari (WebKit) to confirm graceful visual rendering across engines.
- [ ] **Forced Colors Inspection:** Enable Windows High Contrast Mode or simulate `forced-colors: active` in Chrome DevTools Rendering tab; verify scrollbar thumb and track are clearly visible with system contrast colors.
- [ ] **Screen Reader Announcement:** Test with NVDA or VoiceOver to ensure `role="region"` and `aria-label` announce the scrollable container when focused.
