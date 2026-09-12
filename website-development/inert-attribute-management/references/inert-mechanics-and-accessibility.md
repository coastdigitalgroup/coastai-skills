# Native `inert` Attribute Technical Reference & Accessibility Guide

This reference provides in-depth technical documentation on browser rendering engine behavior, accessibility API interactions, inheritance rules, and CSS integration for the native HTML `inert` attribute.

---

## 1. Engine & Rendering Mechanics

When a browser engine encounters `inert` (either via the boolean HTML attribute `<div inert>` or JS DOM property `element.inert = true`), it alters engine pipelines across four distinct subsystems:

```
                  ┌─────────────────────────────────────────┐
                  │          element.inert = true           │
                  └────────────────────┬────────────────────┘
                                       │
        ┌──────────────────┬───────────┴───────────┬──────────────────┐
        ▼                  ▼                       ▼                  ▼
┌───────────────┐  ┌───────────────┐     ┌──────────────────┐  ┌─────────────┐
│ Focus Engine  │  │  a11y Tree    │     │ In-Page Search   │  │ Hit Testing │
├───────────────┤  ├───────────────┤     ├──────────────────┤  ├─────────────┤
│ Disables all  │  │ Prunes entire │     │ Excludes text    │  │ Blocks click│
│ descendant    │  │ subtree from  │     │ nodes from       │  │ touch & hover│
│ tabindex      │  │ accessibility │     │ Ctrl+F matching  │  │ events      │
└───────────────┘  └───────────────┘     └──────────────────┘  └─────────────┘
```

### Key Engine Rules:
1. **Recursive Inheritance:** The `inert` property is strictly inherited down the DOM subtree. All descendant nodes (including shadow DOM trees attached to descendants) become inert.
2. **No Un-Inerting Children:** Setting `childElement.inert = false` on an element inside an inert parent container has **no effect**. The parent container's inert state overrides all descendants.
3. **Top Layer Escape:** Elements promoted to the browser's Native Top Layer—such as `<dialog>.showModal()` or Popover API overlays (`popover` attribute)—are placed in a separate rendering layer above the document root and escape standard document `inert` attributes.

---

## 2. Comparison Matrix: Isolation Techniques

| Behavior / Feature | `inert` | `aria-hidden="true"` | `tabindex="-1"` | `pointer-events: none` | `display: none` |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Blocks Keyboard Tab Order** | ✅ Yes | ❌ No | ⚠️ Direct only | ❌ No | ✅ Yes |
| **Blocks Screen Readers (a11y tree)**| ✅ Yes | ✅ Yes | ❌ No | ❌ No | ✅ Yes |
| **Blocks In-Page Search (`Ctrl+F`)**| ✅ Yes | ❌ No | ❌ No | ❌ No | ✅ Yes |
| **Blocks Pointer / Touch Clicks** | ✅ Yes | ❌ No | ❌ No | ✅ Yes | ✅ Yes |
| **Maintains Layout & Paint Space**| ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Preserves CSS Transitions/Animations**| ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Inherits Down DOM Tree** | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes | ✅ Yes |
| **Robust with Dynamic Content**| ✅ Yes | ❌ Partial | ❌ No | ✅ Yes | ✅ Yes |

---

## 3. Accessibility API & Screen Reader Behavior

When an element becomes inert, browser engines notify operating system accessibility APIs (IAccessible2 on Windows, AXObject on macOS/iOS, AT-SPI on Linux):

- **VoiceOver (macOS / iOS):** Virtual cursor rotor, landmark navigation (`VO + U`), and gesture swipes completely ignore all nodes inside an inert subtree. No announcement is made.
- **NVDA & JAWS (Windows):** Browse mode virtual buffer prunes inert subtrees. Pressing `H` (Heading), `F` (Form control), or `B` (Button) jumps over inert elements without stopping.
- **TalkBack (Android):** Accessibility focus indicator skips inert nodes during touch exploration or swipe navigation.

---

## 4. Styling with CSS `:inert` Pseudo-Class

Modern browsers (Chrome 102+, Safari 15.5+, Firefox 105+) support the standard `:inert` CSS pseudo-class, allowing targeted visual styles:

```css
/* Target any element or container that is currently inert */
:inert {
  opacity: 0.5;
  filter: grayscale(30%);
  user-select: none;
  -webkit-user-select: none;
  pointer-events: none;
  cursor: not-allowed;
}

/* Specific component styling when inert */
.hero-card:inert {
  transform: scale(0.98);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

/* Fallback attribute selector for polyfills */
[inert] {
  pointer-events: none !important;
  user-select: none !important;
}
```

---

## 5. Performance & DOM Mutation Characteristics

- **Zero Layout Shift (CLS):** Toggling `inert` does not trigger layout recalculations (reflow) because element box dimensions, display modes, and grid/flex positions remain unchanged.
- **Microtask Execution:** Setting `element.inert = true` updates the accessibility tree and hit testing boundaries synchronously within the frame loop.
- **Dynamic Node Insertions:** Adding new DOM nodes via `appendChild()`, `innerHTML`, or framework re-renders into an inert subtree automatically marks the new nodes as inert instantly without needing additional event listeners.

---

## 6. Polyfilling & Browser Compatibility

### Baseline Support Matrix

- **Chrome / Edge:** Baseline since version 102 (May 2022).
- **Safari (iOS / macOS):** Baseline since version 15.5 (May 2022).
- **Firefox:** Baseline since version 105 (September 2022).

### Polyfill Usage (`wicg-inert`)

For legacy browser support (e.g. legacy WebKit environments), use the official WICG polyfill (`wicg-inert`):

```html
<!-- Include polyfill before application script -->
<script src="https://cdn.jsdelivr.net/npm/wicg-inert@3.1.2/dist/inert.min.js"></script>
```

The polyfill uses `MutationObserver` to watch for `[inert]` attribute mutations and dynamically applies `aria-hidden="true"`, `tabindex="-1"`, and inline style overrides to descendants.
