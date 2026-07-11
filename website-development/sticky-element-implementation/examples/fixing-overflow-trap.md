# Debugging and Fixing the "Overflow Trap"

The most common reason `position: sticky` fails is that one of its ancestor
elements has an `overflow` property set to something other than `visible`.

## The Problem (Before)
The following sidebar is marked as `sticky`, but it scrolls away with the
content as if it were `static`.

### Broken Code
```html
<main class="page-wrapper">
  <div class="content-layout">
    <aside class="sidebar">Sticky Navigation</aside>
    <section class="main-content">Long content...</section>
  </div>
</main>
```

```css
.page-wrapper {
  /* This is the trap! */
  overflow: hidden;
}

.sidebar {
  position: sticky;
  top: 20px;
}
```

## Why it fails
When an ancestor has `overflow: hidden`, `auto`, or `scroll`, it defines a
new scrolling container for its descendants. The sticky element now tries
to "stick" relative to that ancestor's box. If that ancestor isn't scrolling,
or if the sticky element moves with the ancestor's content, the "sticky"
behavior is effectively neutralized.

## The Solution (After)

### Option 1: Remove the Overflow
If the `overflow: hidden` on `.page-wrapper` was only used for clearfix or
unintentional reasons, removing it fixes the issue.

```css
.page-wrapper {
  /* Removed overflow: hidden */
}
```

### Option 2: Move the Sticky Element
If the overflow property is required on `.page-wrapper` (e.g., to clip
animations), you must move the sticky element outside of that container.

```html
<header>
  <!-- Moved outside the restrictive wrapper -->
  <aside class="sidebar">Sticky Navigation</aside>
</header>
<main class="page-wrapper">
  <div class="content-layout">
    <section class="main-content">Long content...</section>
  </div>
</main>
```

### Option 3: Change the Parent to the Scrolling Container
If you want the element to be sticky relative to the `.page-wrapper`, then
the `.page-wrapper` itself must be the element that is scrolling (has a
fixed height and `overflow: auto`).

```css
.page-wrapper {
  height: 500px;
  overflow: auto; /* Now this is the scroll container */
}
```
