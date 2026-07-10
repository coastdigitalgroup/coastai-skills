# Sticky Implementation Gotchas

A collection of technical notes and debugging guides for advanced sticky
scenarios.

## The "Overflow Trap" Debugging Guide

Sticky elements fail if any ancestor has `overflow: hidden`, `scroll`, or `auto`.
This is the #1 reason sticky positioning doesn't work.

### How to diagnose
1. Open DevTools.
2. Select the sticky element.
3. Run this in the console:
   ```javascript
   let parent = $0.parentElement;
   while (parent) {
     const hasOverflow = getComputedStyle(parent).overflow !== 'visible';
     if (hasOverflow) console.log(parent);
     parent = parent.parentElement;
   }
   ```
4. Any element logged is a "trap". Change its CSS to `overflow: visible` or move
   the sticky element outside of it.

## Sticky Tables in Safari

Safari has historically had issues with `position: sticky` on `<thead>` or
`<tr>`. The most robust approach for cross-browser sticky table headers is to
apply the sticky style directly to the `<th>` elements.

```css
/* Better than applying to <thead> */
th {
  position: sticky;
  top: 0;
}
```

## Border-Collapse Artifacts

When `border-collapse: collapse` is used, browsers have difficulty determining
which cell "owns" the border during a sticky scroll. This results in borders
disappearing or "ghosting".

**The Solution:**
Use `border-collapse: separate` with `border-spacing: 0`. Then, apply borders to
the `<td>` and `<th>` elements manually.

## Stacking Context resets

Properties that create a new stacking context on a parent element can
unexpectedly move a sticky element behind other content. These include:
- `opacity` < 1
- `transform` (any value)
- `filter`
- `perspective`
- `will-change`

If your sticky element is sliding *under* content that it should be *over*, check
if a parent element has one of these properties.

## Scroll-Margin-Top for Accessibility

When you have a sticky header of `64px`, clicking a link to `#section-2` will
put the top of Section 2 at the top of the viewport—underneath your header.

**The Fix:**
```css
h2, h3, h4 {
  scroll-margin-top: 70px; /* Header height + some breathing room */
}
```
This ensures the browser "stops" scrolling early, keeping the heading visible
below the sticky bar.
