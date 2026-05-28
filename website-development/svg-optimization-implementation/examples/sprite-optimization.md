# SVG Implementation: From Bloated Inline to Optimized Sprite

This example demonstrates the conversion of a redundant, unoptimized inline SVG implementation into a performant, accessible SVG Symbol sprite system.

## Before: Bloated Inline Implementation

In this version, the same SVG code is repeated for every instance of an icon. It contains editor metadata, hardcoded colors, and no accessibility features.

```html
<!-- Problem: Repeated 50 times on a page, no accessibility, hardcoded color -->
<button class="nav-button">
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
      <g transform="matrix(1,0,0,1,-123.4, -567.8)">
          <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" style="fill:#333333;"/>
      </g>
      <metadata>
          <serif:docinfo name="Arrow" author="Designer Name"/>
      </metadata>
  </svg>
  <span>Menu</span>
</button>
```

---

## After: Optimized Sprite System

### 1. The Optimized Sprite Sheet (`icons.svg`)

The SVG has been run through SVGO, IDs are cleaned, metadata removed, and colors replaced with `currentColor`.

```xml
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="icon-menu" viewBox="0 0 24 24">
    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" fill="currentColor"/>
  </symbol>
</svg>
```

### 2. Clean, Accessible Implementation

The HTML is now significantly smaller. The icon is accessible to screen readers as decorative (since the text "Menu" is present).

```html
<button class="nav-button">
  <svg class="icon" aria-hidden="true" focusable="false">
    <use href="/assets/icons.svg#icon-menu"></use>
  </svg>
  <span>Menu</span>
</button>
```

### 3. Flexible CSS Styling

By using `currentColor` in the SVG and a CSS class, the icon automatically adapts to the button's text color and hover states.

```css
.icon {
  width: 1.5em;
  height: 1.5em;
  fill: currentColor; /* Inherits from .nav-button color */
  vertical-align: middle;
}

.nav-button {
  color: #4a5568;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;
}

.nav-button:hover {
  color: #2b6cb0; /* Icon changes color automatically! */
}
```

## Key Improvements
1. **Payload Reduction:** The SVG path is defined once in a cached file rather than 50 times in the HTML.
2. **Accessibility:** Added `aria-hidden="true"` to prevent screen readers from announcing redundant "image" elements when text is present.
3. **Maintainability:** Changing the icon design now requires updating one file (`icons.svg`) instead of every page.
4. **Theming:** The icon now responds to CSS state changes (`:hover`, `:focus`) and system dark mode automatically via `currentColor`.
