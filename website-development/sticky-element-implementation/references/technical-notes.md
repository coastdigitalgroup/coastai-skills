# Sticky Element Technical Notes

## The "Overflow Trap"
This is the most common failure point for `position: sticky`.

*   **Rule:** If any ancestor of a sticky element has `overflow: hidden`, `auto`,
    or `scroll`, that ancestor becomes the "scrolling box" for the sticky element.
*   **Consequence:** The sticky element will only be sticky within that ancestor.
    If the ancestor itself is not scrolling (relative to the viewport), the
    sticky element will appear to stay in its natural flow.
*   **Debugging Tip:** Run this snippet in the browser console to find the
    ancestor that is breaking your sticky element:

    ```javascript
    let el = document.querySelector('.your-sticky-element');
    while (el) {
      const overflow = getComputedStyle(el).overflow;
      if (overflow !== 'visible') console.log(el, overflow);
      el = el.parentElement;
    }
    ```

## Stacking Contexts
Sticky elements create a new stacking context.

*   A sticky element with `z-index: 100` will still appear *behind* a sibling
    of its parent if the parent has a `z-index: 1` or a property that creates
    a stacking context (like `opacity`, `transform`, or `filter`).
*   **Resolution:** Always verify the `z-index` of the parent hierarchy if your
    sticky element is being obscured.

## Tables and Sticky Positioning
Sticky behavior in tables has unique browser quirks.

*   **`border-collapse`:** You MUST use `border-collapse: separate` on the table.
    If you use `collapse`, the borders of the sticky `<th>` or `<td>` cells
    will often disappear when scrolling.
*   **Backgrounds:** You must apply a background color directly to the `<th>`
    or `<td>` elements. If you apply it to the `<thead>` or `<tr>`, the cells
    themselves might remain transparent, showing content underneath as they scroll.

## Performance
*   Sticky elements are generally performant because they are handled by the
    browser's compositor thread.
*   **Avoid:** Heavy box-shadows, complex filters, or `backdrop-filter: blur()`
    on large sticky elements, as these can trigger expensive repaints during
    scroll.

## Accessibility (Focus Management)
*   **The Overlap Problem:** When a user tabs through a page, a sticky header
    can obscure the element that currently has focus.
*   **The Fix:** Use `scroll-margin-top` on the focusable elements or anchor
    targets to ensure they are offset from the top of the viewport when they
    receive focus.

    ```css
    :target, :focus {
      scroll-margin-top: 80px; /* Height of your sticky header + buffer */
    }
    ```
