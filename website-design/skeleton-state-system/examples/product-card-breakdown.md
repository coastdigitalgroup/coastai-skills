# Example: Product Card Skeleton Breakdown

This example demonstrates how to design a skeleton for a standard e-commerce
product card. The goal is to reserve space and maintain visual rhythm while the
product image and details are being fetched.

## 1. The Target Design (Fully Loaded)

A standard product card includes:
- **Media:** 1:1 Aspect Ratio Image.
- **Header:** Brand name (Small text).
- **Body:** Product Title (Bold, 2 lines max) and Price (Bold).
- **Footer:** Rating and "Add to Cart" button.

---

## 2. The Skeleton Mapping

Instead of recreating every pixel, we map the structural "anchors":

| Content Element | Bone Shape | Sizing Logic |
| :--- | :--- | :--- |
| Product Image | Rectangle | `aspect-ratio: 1 / 1; width: 100%` |
| Brand Name | Line (Thin) | `height: 12px; width: 30%` |
| Product Title | 2 Lines | `height: 18px; width: 90%` then `width: 60%` |
| Price | Line (Thick) | `height: 24px; width: 40%` |
| Button | Rectangle (Rounded) | `height: 40px; width: 100%` |

---

## 3. Visual Breakdown

### Desktop View (3-Column Grid)
The skeletons are synchronized. When the user scrolls, they see a clean grid of
shimmering gray blocks that perfectly match the grid layout.

### Mobile View (1-Column Stack)
The card bones scale to fill the viewport width, maintaining the 1:1 image
ratio. This ensures that as the image loads, the text below it doesn't move.

---

## 4. Why This Works

1.  **Zero Layout Shift:** Because the image bone has a fixed `1/1` aspect
    ratio, the height of the card is identical before and after the image
    loads.
2.  **Visual Rhythm:** By using a shorter second line for the title, the
    skeleton mimics the look of real text, making it feel more "authentic."
3.  **Action Expectation:** Including a bone for the button tells the user
    where the primary interaction will be located once the page is ready.

---

## 5. Decision: Spinner vs. Skeleton
In this example, we use a **Skeleton** because the product grid is the
primary content of the page. If we were just updating the "Price" after selecting
an option, we might use a small **Spinner** next to the price instead.
