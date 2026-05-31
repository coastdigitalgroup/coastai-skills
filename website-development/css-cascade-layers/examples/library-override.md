# Example: Overriding a CSS Library with Cascade Layers

This example demonstrates how to use CSS Cascade Layers to override styles from
a third-party library (like Bootstrap) without using `!important` or complex
selectors.

## Scenario

We are using a legacy CSS library that defines a button with high specificity.
We want to override its color in our local design system.

### Before: Specificity War

Without layers, we might have to resort to this:

```css
/* legacy-library.css */
.theme-dark .main-content .btn-primary {
  background-color: blue;
  color: white;
}

/* our-styles.css */
/* We have to match or beat the specificity */
.theme-dark .main-content .btn-primary {
  background-color: purple; /* This works but is fragile */
}

/* Or worse... */
.btn-primary {
  background-color: purple !important; /* Hard to maintain */
}
```

### After: Using Cascade Layers

With layers, we can control the priority regardless of selector specificity.

```css
/* main.css */

/* 1. Define the layer order */
@layer vendor, base, components;

/* 2. Import the library into the lowest-priority 'vendor' layer */
@layer vendor {
  /* In a real project, this might be an @import "legacy.css" layer(vendor); */
  .theme-dark .main-content .btn-primary {
    background-color: blue;
    color: white;
  }
}

/* 3. Define our styles in a higher-priority layer */
@layer components {
  /* This wins even though the selector is much simpler */
  .btn-primary {
    background-color: purple;
  }
}
```

## Key Takeaways

1.  **Priority over Specificity:** The `.btn-primary` in the `components` layer
    wins over the more specific selector in the `vendor` layer because
    `components` comes after `vendor` in the `@layer` declaration.
2.  **Cleaner Code:** We don't have to mirror the library's DOM structure in our
    CSS just to override a style.
3.  **Maintainability:** If the library updates its internal selector structure,
    our override still works as long as the class name remains the same.
