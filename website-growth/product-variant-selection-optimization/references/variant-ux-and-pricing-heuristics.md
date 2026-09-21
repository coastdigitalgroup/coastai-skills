# Product Variant UX, Stock Matrix & Pricing Heuristics

This reference guide provides cognitive principles, UI component heuristics, matrix availability rules, dynamic price framing guidelines, and mobile ergonomics for optimizing multi-attribute product variant selection.

---

## 1. Cognitive & Behavioral Heuristics in Variant Selection

### Hick-Hyman Law & Choice Overload
When shoppers are presented with an excessive number of unorganized choices, response and decision time increases logarithmically ($T = b \cdot \log_2(n + 1)$).
- **Application:** If a product offers 24 colors, do not display 24 identical circular swatches in a single chaotic grid. Group colors into logical sub-categories (e.g., *Neutrals*, *Brights*, *Pastels*) or provide a horizontal scrolling swatch track with visual category filters.
- **Rule of 7:** Keep primary visible variant options to 7 or fewer per visible row.

### Choice Loss Aversion & Dead-End Frustration
Humans experience greater psychological pain from losing an option after selecting it than if the limitation was communicated upfront.
- **Application:** Selecting Color "Navy", selecting Size "10", and then being told *"Size 10 in Navy is out of stock"* triggers immediate regret and annoyance. Proactively greying out or striking through Size 10 *before* the user clicks it preserves psychological momentum.

### The Anchor & Contrast Effect in Price Surcharges
When a variant carries a price premium (e.g., $180 Base vs. $210 Leather Upgrade), presenting the upgrade as a full absolute price ($210) makes it feel like an expensive jump.
- **Application:** Frame the surcharge as a minor delta (`+$30`) directly on the selector chip while keeping the base anchor price ($180) visible. The incremental delta of +$30 feels significantly smaller relative to the base price.

---

## 2. Control Selection Taxonomy & UI Guidelines

| Attribute Type | Recommended Control Component | Unrecommended Pattern | Key Design Requirements |
| :--- | :--- | :--- | :--- |
| **Color / Pattern / Finish** | **Visual Image Swatches** (44×44px circles or rounded squares with 1:1 image thumbnails) | Native Dropdown (`<select>`) or CSS Hex Code Circles for textured goods | High-res pattern zoom; 2px high-contrast active ring; hover/focus text tooltip. |
| **Size / Capacity / Spec** | **Segmented Pill Buttons** (Horizontal text chips) | Unsegmented Dropdown or Tiny Grid | Minimum 44×44px target; 8px gap; uppercase size text (`S`, `M`, `L`, `XL`). |
| **Quantity Bundles** | **Stacked Tier Cards** with highlight badges (*"Best Value"*) | Plain Number Input Counter (`<input type="number">`) | Show total price, per-unit price, and dollar/percentage savings. |
| **High Count Options ($>10$)** | **Drawer / Modal Grid Selector** with search filter | Super-long dropdown menu covering mobile screen | Search input; sort by availability; size conversion table integration. |

---

## 3. Matrix Dependency State Machine

When a product contains dependent multi-attribute variants (e.g., Attribute A: Color $\times$ Attribute B: Size $\times$ Attribute C: Width), every swatch/pill must react dynamically to selections in other dimensions.

```
+-----------------------------------------------------------------------+
|                         VARIANT STATE MATRIX                          |
+---------------------+-------------------+-----------------------------+
| State               | Visual Treatment  | Interactive Behavior        |
+---------------------+-------------------+-----------------------------+
| 1. In Stock         | Solid border,     | Selects SKU; updates price, |
|                     | High contrast     | gallery, and ATC button.    |
+---------------------+-------------------+-----------------------------+
| 2. Low Stock        | Solid border +    | Selects SKU; displays       |
|                     | "Only X Left"     | urgency badge ("Only 2 left")|
+---------------------+-------------------+-----------------------------+
| 3. Out of Stock     | Dashed border +   | Clicking opens "Notify Me"  |
| (Restock Planned)   | Diagonal line     | email/SMS back-in-stock modal|
+---------------------+-------------------+-----------------------------+
| 4. Discontinued /   | 30% Opacity +     | Disabled with tooltip:      |
| Invalid Matrix      | Grey Fill         | "Not available in Navy"     |
+---------------------+-------------------+-----------------------------+
```

### The "No Dead-Ends" Rule
Never make an out-of-stock swatch unclickable. Unclickable, completely disabled swatches prevent shoppers from:
1. Understanding why the option cannot be selected.
2. Subscribing to back-in-stock replenishment alerts.
3. Viewing estimated restock dates or pre-ordering.

---

## 4. Default Variant Selection Strategy

Loading a PDP without a pre-selected variant forces every visitor to perform extra work before they can take action.

- **Standard E-Commerce Rule:** Always default load the PDP with a valid, fully in-stock, high-converting SKU pre-selected.
- **Image-Swapped Deep Linking:** If a visitor arrives on a PDP via a marketing campaign or ad featuring a specific color (e.g., "Forest Green"), the URL parameter (`?variant=forest-green`) must automatically pre-select "Forest Green" and switch the image gallery accordingly.
- **Sizing Exception Rule:** For high-precision fit products (e.g., luxury footwear or custom rings) where misordering returns are extremely costly, leave the Size dimension unselected. When the user taps "Add to Cart", smoothly shake or highlight the size pill row with an inline prompt: *"Please select a size to continue"*.

---

## 5. Mobile Touch Ergonomics & Viewport Rules

Mobile touchscreens account for 65%–80% of e-commerce traffic. Variant selection controls must be engineered for finger-thumb ergonomics.

1. **The 44×44px Rule:** Touch targets must measure at least 44×44 CSS pixels. Swatch circles of 32px diameter must include 6px padding inside an invisible 44px hit-box.
2. **Horizontal Scroll vs. Multi-Line Wrap:**
   - For **Sizes ($\le 8$ items):** Use a wrapped grid with 3–4 items per row.
   - For **Colors ($\ge 6$ items):** Use a single horizontal scrolling row with a subtle visual fade gradient on the right edge to indicate scrollability.
3. **Sticky Bottom Sheet Trigger:** When scrolling past the main buy box on mobile, the sticky bottom bar should include a concise variant summary badge (e.g., `Navy / Size 10 — $180`). Tapping "Change Options" slides up a half-screen bottom sheet containing the full variant controls.
