# Example: E-commerce Checkout Progress

This example demonstrates the application of the **Step & Progress System** to a
standard 3-step e-commerce checkout flow.

## The Scenario

An online retailer needs a clear way to guide users through the "Final Stretch"
of their purchase: Shipping, Payment, and Final Review.

## 1. Step Inventory

1.  **Shipping:** Address and carrier selection.
2.  **Payment:** Credit card or third-party provider details.
3.  **Review:** Final summary before order placement.

## 2. Visual Hierarchy & States

The indicator is placed at the top of the page, below the header, spanning the
full width of the content container.

| Step | State | Visual Treatment | ARIA Attribute |
| :--- | :--- | :--- | :--- |
| **1. Shipping** | `Completed` | Primary color circle + Checkmark icon. Label is clickable. | `aria-current="false"` |
| **2. Payment** | `Active` | Thick primary color border. Bold text label. | `aria-current="step"` |
| **3. Review** | `Pending` | Muted grey border. Lighter text weight. | `aria-current="false"` |

## 3. Responsive Breakdown

### Desktop (1200px)
- **Pattern:** Horizontal Stepper.
- **Labels:** Full text labels ("1. Shipping", "2. Payment", "3. Review").
- **Spacing:** Evenly distributed across the container with connecting lines.

### Mobile (375px)
- **Pattern:** Compact Step Summary.
- **Labels:** The labels are hidden. Only the active step label is shown in a
  "Step 2 of 3: Payment" text format.
- **Visual:** A simple progress bar at the very top of the viewport (sticky) or
  numeric bubbles (1, 2, 3) with no lines.

## 4. Interaction Logic

- **Backward Navigation:** Clicking "Shipping" (Completed) returns the user to
  the first step.
- **Forward Navigation:** The "Review" step is disabled and unclickable until
  valid payment info is entered.
- **Feedback:** When moving from Shipping to Payment, a subtle slide-in
  animation for the new content reinforces the horizontal movement of the
  progress bar.

## 5. Decision Rule Applied

**The 5-Step Rule:** Since this flow only has 3 steps, a horizontal stepper was
chosen to take advantage of desktop width and keep the labels visible
simultaneously, reducing "process anxiety."
