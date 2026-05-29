# Overriding a Library without Specificity Wars

This example demonstrates how to use CSS Cascade Layers to override styles from a complex third-party library (like a "Widget Library") without having to resort to `!important` or overly complex selectors.

## The Problem (Before)

A third-party widget library uses very specific selectors, making it difficult to theme.

```html
<!-- Third-party Widget -->
<div class="widget-container">
  <div class="widget-header">
    <button class="widget-close-btn">Close</button>
  </div>
</div>
```

```css
/* third-party-library.css */
.widget-container .widget-header .widget-close-btn {
  background-color: blue;
  color: white;
  padding: 10px 20px;
}
```

To override this, you usually have to match or beat that specificity:

```css
/* custom-theme.css */
body .widget-container .widget-header .widget-close-btn {
  background-color: red; /* Hard to maintain and easy to break */
}

/* OR */
.widget-close-btn {
  background-color: red !important; /* The "Nuclear Option" */
}
```

## The Solution (After)

Using `@layer`, we can "demote" the library and ensure our theme always wins.

```css
/* main.css */

/* 1. Define the layer order (priority goes left to right) */
@layer library, theme;

/* 2. Wrap the library (either via @import or block) */
@layer library {
  /* Imagine this is the content of third-party-library.css */
  .widget-container .widget-header .widget-close-btn {
    background-color: blue;
    color: white;
    padding: 10px 20px;
  }
}

/* 3. Your theme styles - even with a simple selector, they win! */
@layer theme {
  .widget-close-btn {
    background-color: red; /* WINS because the 'theme' layer is higher than 'library' */
    border-radius: 8px;
  }
}
```

## Why it works

In the CSS Cascade, the layer order is checked **before** selector specificity.
Because the `theme` layer is defined after the `library` layer, any selector in `theme` will override any selector in `library`, regardless of how many IDs or classes the library uses.

## Key Takeaway
You no longer need to inspect the library's source code just to figure out how many `.parent` classes you need to prepend to your selector to make your override work.
