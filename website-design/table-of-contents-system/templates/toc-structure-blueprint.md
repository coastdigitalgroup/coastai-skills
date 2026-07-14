# Template: Table of Contents (ToC) Blueprint

Use this template to structure the internal navigation for long-form content or
dense landing pages.

## 1. HTML Structure (Landmark)

The ToC must be wrapped in a `<nav>` element with a unique label to distinguish
it from the site-wide navigation.

```html
<nav class="toc-container" aria-label="Table of contents">
  <h2 class="toc-title">On this page</h2>
  <ol class="toc-list">
    <li class="toc-item level-2">
      <a href="#overview" class="toc-link" aria-current="location">Overview</a>
    </li>
    <li class="toc-item level-2">
      <a href="#getting-started" class="toc-link">Getting Started</a>
      <!-- Nested List for H3s -->
      <ol class="toc-list sub-list">
        <li class="toc-item level-3">
          <a href="#installation" class="toc-link">Installation</a>
        </li>
        <li class="toc-item level-3">
          <a href="#configuration" class="toc-link">Configuration</a>
        </li>
      </ol>
    </li>
    <li class="toc-item level-2">
      <a href="#advanced-usage" class="toc-link">Advanced Usage</a>
    </li>
  </ol>
</nav>
```

## 2. Spatial Logic & Annotations

Apply these CSS-centric rules to maintain the hierarchy.

| Element | Rule | Annotation |
| :--- | :--- | :--- |
| **Container** | `position: sticky; top: var(--header-height);` | Keeps the ToC visible during scroll. |
| **List (ol)** | `list-style: none; padding: 0;` | Removes default numbering for a cleaner UI. |
| **Level 2 Link** | `font-weight: 500; font-size: 0.875rem;` | The primary anchor points. |
| **Level 3 Link** | `margin-inline-start: 1rem; color: var(--text-muted);` | Visually subordinates sub-sections. |
| **Active Link** | `color: var(--brand-primary);` | High-contrast indicator of current location. |
| **Scroll Padding** | `scroll-padding-top: 120px;` (on HTML/Body) | Prevents headers from being hidden under sticky headers when jumping. |

## 3. Responsive State Logic

Define how the ToC behaves across breakpoints:

- **Desktop (>1024px):**
  - Display: `block`
  - Position: Fixed or Sticky Sidebar
  - Max Width: `240px`
- **Mobile (<1024px):**
  - Display: `none` (default)
  - Toggle Pattern: Use a button fixed to the bottom-right or top-right.
  - Overlay: Open the ToC in a `drawer` or `modal` using `overlay-and-dialog-system`.

## 4. Accessibility Checklist

- [ ] ToC is inside a `<nav aria-label="Table of contents">`.
- [ ] Every link `href` matches a unique `id` on a heading.
- [ ] The `aria-current="location"` attribute is moved to the currently active link via JavaScript.
- [ ] Smooth scrolling is enabled (`scroll-behavior: smooth`).
- [ ] Focus remains visible when tabbing through the ToC list.
