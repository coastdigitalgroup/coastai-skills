# Normalization Heuristics for Brand Logos

To achieve visual balance in a grid, you cannot rely on uniform bounding box dimensions. Instead, use these heuristics to adjust the scale of logos based on their aspect ratio and visual "ink density."

## 1. Aspect Ratio Classes

Categorize every logo into one of these three classes to determine its starting scale.

| Class | Ratio | Example Shape | Scaling Rule |
| :--- | :--- | :--- | :--- |
| **Wide** | > 2.5:1 | Rectangle (Wordmark) | **90–100%** of max cell width. Use height `auto`. |
| **Square/Round** | 1:1 to 1.5:1 | Circle or Square (Mark) | **65–70%** of max cell height. Use width `auto`. |
| **Tall/Stacked** | < 1:1 | Vertical Rectangle | **85–90%** of max cell height. Use width `auto`. |

## 2. Visual Density (The "Ink" Rule)

Adjust the scale further based on the "heaviness" of the logo.

*   **Heavy Logos (Solid shapes):** If a logo is a solid, filled shape (e.g., Apple, Beats), reduce its scale by an additional **5-10%**.
*   **Light Logos (Outlines/Thin text):** If a logo is composed of thin lines or airy typography (e.g., Intel, Cisco), increase its scale by **5-10%** to compensate for the lack of visual "mass."

## 3. The "Horizon Line" Principle

Always align logos to a common central horizontal axis.
*   **Avoid Top-Alignment:** Aligning the top of a wide logo with the top of a square logo creates a jagged bottom edge.
*   **Avoid Bottom-Alignment:** This makes wide logos look like they are "floating" too high.
*   **Center-Alignment (Default):** Placing the center-point of every logo on the same horizontal line creates the most stable and professional appearance.

## 4. Clear Space (The "Breath" Rule)

Every logo has a "Clear Space" or "Exclusion Zone"—the minimum amount of whitespace required around it.
*   **Heuristic:** Leave a minimum padding equal to **50% of the logo's height** between the logo and the cell boundary.
*   **Grid Gutters:** Ensure the gap between grid cells is at least **2rem (32px)** on desktop to prevent brand logos from "touching" or appearing associated.

## 5. Visual Weight Validation (The "Squint Test")

1.  Place the logos in your grid.
2.  Squint your eyes until the shapes become blurry blobs.
3.  Compare the blobs. If one blob is significantly darker or larger than the others, reduce that logo's scale until the blobs appear equal in weight.
