# Example: E-commerce Product Badges

This example shows how to use badges on a product card to drive conversion without overwhelming the user's visual field.

## Scenario: Product Card

A retail website needs to highlight specific product attributes:
-   A promotional sale price.
-   A "New Arrival" status.
-   A "Sustainable" material attribute.
-   An "Out of Stock" warning.

### Badge Strategy

#### 1. Overlaid "New" Badge
-   **Position:** Top-left corner of the product image.
-   **Style:** High-emphasis solid primary color.
-   **Intent:** Catch the eye immediately during a scan of the product grid.

#### 2. "Sale" Percentage
-   **Position:** Bottom-left corner of the product image.
-   **Style:** High-emphasis solid red background.
-   **Intent:** Signal value and urgency.

#### 3. "Sustainable" Attribute
-   **Position:** Below the product title.
-   **Style:** Low-emphasis outline (green border, green text).
-   **Intent:** Provide secondary information for eco-conscious shoppers.

#### 4. "Out of Stock" Status
-   **Position:** Overlay covering the entire image (semi-transparent) or a prominent badge.
-   **Style:** High-emphasis solid dark grey.
-   **Intent:** Prevent frustration by clearly marking unavailable items before the user clicks.

---

## Design Rules Applied

-   **Priority:** No more than 2 badges are overlaid on the image at once.
-   **Consistency:** All "Sale" badges use the same shade of red across the site.
-   **Size:** Overlaid badges are slightly larger (14px font) than attribute tags (12px font) to maintain hierarchy.
