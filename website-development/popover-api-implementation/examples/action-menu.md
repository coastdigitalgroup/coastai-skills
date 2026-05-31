# Action Menu Example: Custom JS vs. Native Popover

This example demonstrates how the native Popover API simplifies the implementation of a standard "Action Menu" (three-dot menu) by removing the need for manual state management and click-outside logic.

## Before: Manual Implementation (JS + CSS)

In this version, we have to manually manage visibility, handle the "click-outside" behavior to close the menu, and fight with `z-index` if the button is inside a container with `overflow: hidden`.

### HTML/JS
```html
<div class="menu-container">
  <button id="menu-trigger" class="dots-btn">...</button>
  <div id="menu-dropdown" class="dropdown hidden">
    <button onclick="doAction('edit')">Edit</button>
    <button onclick="doAction('delete')">Delete</button>
  </div>
</div>

<script>
  const trigger = document.getElementById('menu-trigger');
  const menu = document.getElementById('menu-dropdown');

  trigger.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // Manual click-outside logic
  document.addEventListener('click', (e) => {
    if (!trigger.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });

  // Manual Escape key logic
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') menu.classList.add('hidden');
  });
</script>
```

---

## After: Native Popover API

With the Popover API, the browser handles the "light-dismiss" (click-outside and Escape key) automatically. The menu is also promoted to the **top layer**, so it will never be cut off by `overflow: hidden` on the `.menu-container`.

### HTML
```html
<div class="menu-container">
  <!-- popovertarget links the button to the popover ID -->
  <button popovertarget="action-menu" class="dots-btn">...</button>

  <!-- The popover attribute enables the API -->
  <div id="action-menu" popover="auto" class="dropdown">
    <button onclick="doAction('edit')">Edit</button>
    <button onclick="doAction('delete')">Delete</button>
  </div>
</div>
```

### CSS (Standard & Animation)
```css
/* The browser handles display: none/block automatically */
#action-menu {
  margin: 0;
  inset: unset; /* Reset default centering */
  position: absolute;
  /* Basic positioning - in a real app, use Anchor Positioning or JS to align to trigger */
  top: 40px;
  right: 10px;
}

/* Optional: Backdrop styling */
#action-menu::backdrop {
  background-color: transparent;
}

/* Modern Animation (Chrome/Safari/Firefox 2024) */
#action-menu {
  transition: opacity 0.2s, display 0.2s allow-discrete, overlay 0.2s allow-discrete;
  opacity: 0;
}

#action-menu:popover-open {
  opacity: 1;
}

@starting-style {
  #action-menu:popover-open {
    opacity: 0;
  }
}
```

## Key Improvements
1. **Zero JavaScript for State:** No `classList.toggle` or event listeners needed for basic opening/closing.
2. **Automatic Light Dismiss:** The browser handles clicking outside and the `Escape` key natively.
3. **Top Layer Promotion:** The menu sit above all other elements and ignores parent `overflow: hidden`.
4. **Declarative Accessibility:** The relationship between the trigger and the menu is programmatically exposed to assistive technology.
