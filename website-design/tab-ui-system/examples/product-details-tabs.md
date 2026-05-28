# Example: Product Detail Tabs

This example demonstrates how to apply the **Tab UI System** to an e-commerce
Product Detail Page (PDP). The goal is to organize heavy technical and social
content without overwhelming the user during the initial purchase consideration.

## The Problem
A high-end kitchen appliance page needs to display:
1.  **Overview:** General marketing features.
2.  **Specifications:** Technical dimensions, power requirements, and materials.
3.  **Reviews:** User ratings and comments.
4.  **Shipping & Returns:** Delivery times and policies.

Displaying all of this linearly would create a "wall of content" that discourages
scrolling.

## The Solution: Horizontal Tab System

### 1. Tablist Anatomy
- **Placement:** Positioned immediately below the "Hero" section (Product Image
  and Price).
- **Alignment:** Left-aligned to match the reading gravity of the product
  description.
- **Labels:** "Overview", "Specs", "Reviews (42)", "Shipping".
- **Visual Style:**
    - **Default:** Medium-weight text, dark gray, 16px.
    - **Active:** Bold text, Primary Brand Color (Blue), with a 3px bottom
      indicator line.
    - **Hover:** Light blue background tint on the trigger area.

### 2. Interaction & Logic
- **Default Active:** "Overview" is shown on page load.
- **Feedback:** Switching a tab instantly swaps the panel content. The page
  does not reload.
- **Reviews Anchor:** The "Reviews" tab label includes a count to provide
  immediate value without clicking.

### 3. Responsive Adaptation (Mobile)
On a 375px viewport, the 4 tabs would overflow.
- **Pattern:** **Horizontal Scrollable List**.
- **Execution:** The tablist container has `overflow-x: auto`. A subtle linear
  gradient fade is applied to the right edge to indicate more tabs are
  available.
- **Touch:** Each tab has a horizontal padding of 20px to ensure the tap target
  is large enough.

## Visual Hierarchy Breakdown

| Element | Priority | Lever Applied |
| :--- | :--- | :--- |
| Active Tab Label | Level 1 | Bold, Brand Color, Underline |
| Inactive Tab Label | Level 2 | Standard weight, Neutral Color |
| Panel Content | Level 1 | Proximity to the Active Tab |
| Scroll Indicator | Level 3 | Subtle Opacity/Fade |

## Accessibility Checklist
- [x] Tablist container has `role="tablist"`.
- [x] Each tab button has `aria-controls="panel-id"` and `aria-selected`.
- [x] User can navigate between "Overview" and "Specs" using the `Right Arrow`
      key.
- [x] Focus ring appears around the tab label when Tabbing through the page.
