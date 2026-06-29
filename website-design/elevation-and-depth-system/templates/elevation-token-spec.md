# Elevation Token Specification

Use these tokens to implement a consistent vertical hierarchy across your CSS
framework or design system.

## 1. Shadow Tokens (Box-Shadow)

These tokens follow a "Soft Stack" approach, using multiple layers to achieve
realistic depth.

```css
:root {
  /* elevation-xs: Subtle separation (e.g., buttons, small inputs) */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  /* elevation-sm: Standard card / element elevation */
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
               0 1px 2px -1px rgba(0, 0, 0, 0.1);

  /* elevation-md: Floating nav, dropdowns, hovered cards */
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
               0 2px 4px -2px rgba(0, 0, 0, 0.1);

  /* elevation-lg: Large menus, small modals, flyouts */
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
               0 4px 6px -4px rgba(0, 0, 0, 0.1);

  /* elevation-xl: Primary Modals, heavy overlays */
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
               0 8px 10px -6px rgba(0, 0, 0, 0.1);

  /* elevation-2xl: System-critical alerts, full-screen focus */
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

## 2. Stacking Context Tokens (Z-Index)

A semantic scale to manage the stacking order of layers.

```css
:root {
  --z-below: -1;
  --z-base: 0;
  --z-docked: 10;     /* Elements fixed within a container */
  --z-sticky: 100;    /* Sticky headers, persistent sidebars */
  --z-overlay: 500;   /* Modal backdrops, global overlays */
  --z-dialog: 600;    /* Modals, drawers, lightboxes */
  --z-popover: 700;   /* Tooltips, context menus (often sit above modals) */
  --z-toast: 1000;    /* System notifications, high-priority alerts */
}
```

## 3. Dark Mode Elevation (Surface Shifts)

In dark mode, shadows are less effective. Use surface lightness to indicate
elevation.

```css
/* Standard Base Layer (Deepest) */
.surface-l0 { background-color: #000000; }

/* Content Cards / Containers */
.surface-l1 { background-color: rgba(255, 255, 255, 0.03); }

/* Floating Elements / Nav */
.surface-l2 { background-color: rgba(255, 255, 255, 0.08); }

/* Modals / Focused Layers (Closest to light) */
.surface-l3 { background-color: rgba(255, 255, 255, 0.15); }
```

## 4. Implementation Example

```css
.card {
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.modal {
  z-index: var(--z-dialog);
  box-shadow: var(--shadow-xl);
}
```
