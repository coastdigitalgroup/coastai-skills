# HTML `inert` Mechanics & Accessibility Reference

This reference details the browser specification mechanics, DOM subtree behavior, CSS `:inert` styling rules, and accessibility comparisons for the HTML `inert` boolean attribute.

---

## 1. Specification Mechanics & HTML Standard

The `inert` attribute is a boolean attribute defined in the HTML Living Standard. When present on an HTML element, the browser engine treats the element and its entire descendant subtree as **inert**.

### Natively Suppressed Engine Behaviors

When an element becomes inert:
1. **Focusability Removed:** All descendant nodes become non-focusable. They cannot receive focus via mouse click, touch, programmatic `.focus()`, or keyboard `Tab` key navigation.
2. **Ignored by Accessibility Tree:** Screen readers (VoiceOver, NVDA, JAWS) and assistive technology APIs treat inert subtrees as unrendered/absent, skipping them during virtual cursor reading.
3. **Pointer & Touch Events Blocked:** The element and descendants ignore pointer events (`click`, `mousedown`, `mouseup`, `touchstart`, `touchend`, `pointerdown`, `hover`).
4. **Text Selection Blocked:** Users cannot select or highlight text contained inside an inert subtree.
5. **Find-in-Page (Ctrl+F / Cmd+F) Excluded:** Browsers suppress text inside inert subtrees from find-in-page search results.
6. **Editing & Input Disabled:** Form inputs, textareas, buttons, and `contenteditable` elements inside inert subtrees cannot be edited or submitted.

---

## 2. Structural Comparison: `inert` vs. Alternatives

Developers frequently confuse `inert` with existing HTML attributes or CSS properties. The table below details why `inert` is the standard for subtree isolation:

| Mechanism | Blocks Focus? | Suppresses Screen Readers? | Blocks Pointer Clicks? | Excludes Ctrl+F Search? | Applies to Entire Subtree? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `inert` | **Yes** | **Yes** | **Yes** | **Yes** | **Yes (Automatic)** |
| `disabled` | Yes (Form controls only) | Yes | Yes | No | No (Only `<fieldset>` propagates) |
| `aria-hidden="true"` | No | **Yes** | No | No | Yes |
| `tabindex="-1"` | Yes (Direct element only) | No | No | No | No (Must apply to every child) |
| `pointer-events: none` | No | No | **Yes** | No | Yes |
| `display: none` | Yes | Yes | Yes | Yes | Yes (Removes from visual layout) |

---

## 3. CSS `:inert` Pseudo-Class

Modern browsers support matching inert elements in CSS using the `:inert` pseudo-class (or selector `[inert]`):

```css
/* Style elements that are currently marked inert */
.page-region:inert {
  opacity: 0.4;
  filter: grayscale(60%);
  user-select: none;
  pointer-events: none;
  transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Specific descendant styling when parent is inert */
:inert button,
[inert] button {
  cursor: not-allowed;
}
```

---

## 4. DOM Ancestry & Inheritance Rules

- **Subtree Cascade:** Setting `inert` on a container node automatically renders all descendants inert, regardless of their individual attributes.
- **No Un-inerting Children:** You **cannot** override `inert` on a child element if any of its parent containers have `inert` applied. Setting `childElement.inert = false` while `parentElement.inert = true` has no effect on the child; it remains inert due to ancestry inheritance.
- **Top-Layer Overlays:** Elements placed in the browser top-layer (such as native `<dialog showModal()>` or `:popover-open`) escape standard DOM tree flow, preventing them from inheriting `inert` from sibling wrappers.

---

## 5. Browser Compatibility & Fallback Strategy

Native HTML `inert` is supported across all modern evergreen browsers:
- **Chrome / Edge:** Version 102+ (May 2022)
- **Safari:** Version 15.5+ (May 2022)
- **Firefox:** Version 105+ (September 2022)

### Legacy Polyfill Fallback
For legacy browser support (IE11, older Safari versions), load the official WICG `inert` polyfill:
```html
<script src="https://unpkg.com/wicg-inert@3.1.2/dist/inert.min.js" defer></script>
```
The polyfill watches for changes to the `inert` attribute via `MutationObserver` and toggles `aria-hidden="true"`, `tabindex="-1"`, and `pointer-events: none` on descendant nodes.
