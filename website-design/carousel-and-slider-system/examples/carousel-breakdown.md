# Example: Product Discovery Carousel

This example demonstrates a standard exploratory carousel used for "Related Products" in an e-commerce context. It prioritizes scannability, clear affordances, and layout stability.

## Layout Breakdown

### 1. The Container (Viewport)
- **Constraint:** The container spans the full width of the content area but hides overflow horizontally.
- **Visual Cue:** A subtle right-side gradient fade indicates that content continues off-screen.

### 2. The Track (Content Layer)
- **Structure:** A flexible row of product cards from the `card-ui-system`.
- **Spacing:** Uses `--space-m` (24px) for gutters between cards.
- **Reveal:** On a 1280px desktop, 4 cards are fully visible, and the 5th card is partially revealed (showing 25% of its width).

### 3. Navigation Controls (Arrows)
- **Position:** Floating on the left and right edges, vertically centered on the product images.
- **Visual Style:** High-contrast circles (White background, Dark icon) with a subtle shadow (`elevation-md`).
- **Interaction:**
  - **Hover:** The arrow shifts 4px in the direction of movement.
  - **Disabled:** When the user reaches the last item, the right arrow's opacity drops to 30% and `pointer-events: none` is applied.

### 4. Pagination Indicators (Progress)
- **Position:** Centered below the track with `--space-l` (32px) top margin.
- **Style:** Small 8px dots. The active dot is elongated (16px pill shape) and uses the primary brand color.

## Annotated Interaction Flow

1. **Initial State:** Card 1 is aligned to the left margin. The Left Arrow is hidden or disabled.
2. **User Action (Arrow Click):** The track shifts by exactly the width of the visible container.
3. **Snap Alignment:** Using `scroll-snap-align: start`, Card 5 snaps perfectly to the left margin after the transition.
4. **Mobile Experience:** Arrows are hidden. The user swipes naturally. The "Partial Reveal" of the next card ensures they know to swipe.

## Accessibility Annotations

- **Aria-Label:** The entire region is labeled "Related Products Carousel".
- **Focus:** Tabbing through the page enters the carousel. Focus moves to the first card's primary action.
- **Live Region:** If the carousel was an auto-playing gallery, a `status` region would announce "Showing slide 2 of 5".
