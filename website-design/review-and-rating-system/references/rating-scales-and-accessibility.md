# Rating Scales and Accessibility

To ensure reviews and ratings are both functional and inclusive, follow these technical and design specifications.

## 1. Visual Accessibility (Contrast & Recognition)

- **Star Color:** The "Filled" star state must meet a 3:1 contrast ratio against the background for UI components, and ideally 4.5:1 for the text elements (like the numeric score) associated with it.
- **Color Logic:** Do not rely on color alone to distinguish between star levels. All stars should typically be the same brand color (Gold/Amber/Brand Primary) regardless of the score.
- **State Distinction:**
  - **Full Star:** Solid fill.
  - **Half/Partial Star:** Partial fill (clip-path or gradient) OR a distinct "Half-star" icon.
  - **Empty Star:** Outline only or a very muted fill (e.g., Gray-200).

## 2. Interactive Rating Inputs (ARIA & Keyboard)

When building the "Write a Review" star selector:

- **Role:** Use `role="radiogroup"` for the star container.
- **Labels:** Each individual star (input) must have a hidden label (e.g., "1 Star," "2 Stars").
- **Focus:** The focus ring should wrap the individual star being hovered or tabbed to.
- **Keyboard:** Users should be able to use Arrow Keys to change the rating once the group is focused.

```html
<!-- Accessibility Example -->
<div role="radiogroup" aria-label="Rate this product">
  <input type="radio" id="star5" name="rating" value="5" aria-label="5 stars">
  <label for="star5">★</label>
  ...
</div>
```

## 3. Aggregate Accessibility

- **Alt-Text for Averages:** The star row representing an average must have a single `aria-label` that summarizes the value.
  - *Correct:* `<div aria-label="4.5 out of 5 stars">...</div>`
  - *Incorrect:* Leaving 5 individual icons for a screen reader to announce as "Star, Star, Star, Star, Half-Star."

## 4. Design Heuristics

- **Numeric Rounding:**
  - `4.74` -> `4.7`
  - `4.75` -> `4.8` (or use half-star visualization if it falls between .25 and .75).
- **The "Empty" State:** If a product has 0 reviews, do not show "0.0 ★★★★★". Instead, show a text link: "No reviews yet. Be the first to write one."
- **Verification Trust:** The "Verified Purchase" badge is more than a label; it's a trust signal. It should be placed near the user's name to immediately associate the identity with the validity of the feedback.
