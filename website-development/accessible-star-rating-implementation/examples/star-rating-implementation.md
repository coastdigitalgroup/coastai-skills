# Example: Modern Accessible Star Rating

This example demonstrates how to implement a fully accessible 5-star rating input using native radio buttons and the modern CSS `:has()` selector.

## The Problem

Implementing "fill-up-to" logic (where selecting star 4 fills 1, 2, 3, and 4) usually requires either:
1. Reordering the DOM and using the `~` (subsequent sibling) selector with `flex-direction: row-reverse` (which breaks keyboard navigation).
2. Complex JavaScript to toggle classes on all preceding siblings.

## The Solution

Using the `:has()` selector allows us to style an element based on its *subsequent* siblings. This means we can keep our HTML in natural order (1 to 5) so that keyboard arrows work correctly, while still achieving the "trail" effect with pure CSS.

### Implementation

#### HTML Structure
The structure is simple and semantic. Every label is followed by its radio input.

```html
<fieldset class="star-rating">
  <legend>Product Rating</legend>
  <div class="star-group">
    <!-- Star 1 -->
    <label for="r1">
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
      <span class="sr-only">1 Star</span>
    </label>
    <input type="radio" id="r1" name="rating" value="1" required>

    <!-- Star 2 -->
    <label for="r2">
      <svg aria-hidden="true" ...></svg>
      <span class="sr-only">2 Stars</span>
    </label>
    <input type="radio" id="r2" name="rating" value="2">

    <!-- ... Repeat for 3, 4, 5 ... -->
  </div>
</fieldset>
```

#### CSS Styling
We fill every label that has a checked input as a subsequent sibling (via `~`) or a checked input as an immediate subsequent sibling (via `+`).

```css
.star-group {
  display: flex;
  gap: 4px;
}

/* Hide radio but keep it accessible */
.star-group input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.star-group label {
  cursor: pointer;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.star-group svg {
  width: 32px;
  height: 32px;
  fill: none;
  stroke: #4b5563; /* High contrast gray for empty state */
  stroke-width: 2px;
}

/* FILL LOGIC: Select the labels that come BEFORE the checked radio */
/* 1. Labels followed by a checked sibling later in the DOM */
.star-group label:has(~ input:checked) svg,
/* 2. The label belonging to the checked radio itself */
.star-group label:has(+ input:checked) svg {
  fill: #b45309; /* High contrast Amber */
  stroke: #b45309;
}

/* HOVER LOGIC: Similar pattern for hover */
.star-group label:hover svg,
.star-group label:has(~ label:hover) svg {
  stroke: #d97706;
}

/* ACCESSIBLE FOCUS */
.star-group input:focus-visible + label {
  outline: 2px solid #2563eb;
  outline-offset: 4px;
}
```

### Key Benefits
1.  **Correct Keyboard Nav:** Right Arrow increases the rating, Left Arrow decreases it.
2.  **No "Hack" Layouts:** No `row-reverse` required.
3.  **High Contrast:** Uses colors that meet WCAG AA requirements for non-text contrast.
