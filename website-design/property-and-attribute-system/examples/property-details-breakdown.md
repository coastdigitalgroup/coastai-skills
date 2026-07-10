# Example: Real Estate Property Features

This example demonstrates the Property and Attribute System applied to a real
estate listing, showing how grouped metadata provides a structured overview of
a complex entity.

## 1. Grouped Attribute Layout (Desktop)

On a desktop view, attributes are grouped into logical sections and use a
**Horizontal (Side-by-Side)** layout with a fixed-width label column to ensure
scannability.

### Core Details
| Label (dt) | Value (dd) |
| :--- | :--- |
| **Price** | $1,250,000 |
| **Beds** | 4 |
| **Baths** | 3.5 |
| **Sq Ft** | 3,200 |
| **Lot Size** | 0.25 Acres |
| **Year Built** | 2018 |

### Interior Features
| Label (dt) | Value (dd) |
| :--- | :--- |
| **Heating** | Forced Air, Natural Gas |
| **Cooling** | Central Air |
| **Flooring** | Hardwood, Tile, Carpet |
| **Appliances** | Stainless Steel, Gas Range |
| **Basement** | Finished, 800 sq ft |

---

## 2. Visual Hierarchy Lever Analysis

- **The Label (dt):** Uses `font-weight: 500`, `font-size: 0.875rem`, and a
  muted gray color (`#64748b`). This signals that the label is a descriptor.
- **The Value (dd):** Uses `font-weight: 400`, `font-size: 1rem`, and a
  high-contrast dark color (`#1e293b`). This ensures the data is the primary
  focal point.
- **Horizontal Axis:** All values start exactly 120px from the left edge of the
  container, creating a clean vertical line for the eye to scan.

---

## 3. Responsive Transformation (Mobile)

On mobile viewports, the layout shifts to a **Vertical (Stacked)** pattern to
preserve readability and prevent text wrapping from breaking the structure.

**[Mobile View Mockup]**

**Heating**
Forced Air, Natural Gas

**Cooling**
Central Air

**Flooring**
Hardwood, Tile, Carpet

---

## 4. Accessibility Check

- **Semantic Markup:**
  ```html
  <dl class="property-specs">
    <div>
      <dt>Price</dt>
      <dd>$1,250,000</dd>
    </div>
    <div>
      <dt>Beds</dt>
      <dd>4</dd>
    </div>
    <!-- ... -->
  </dl>
  ```
- **Contrast:** Muted labels use a color that still meets the 4.5:1 ratio
  against the white background.
- **Screen Reader:** The `<dl>` structure ensures the screen reader announces:
  *"Price, definition, 1 million 250 thousand dollars."*
