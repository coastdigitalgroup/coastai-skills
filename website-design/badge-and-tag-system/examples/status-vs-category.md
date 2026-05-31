# Example: Badges and Tags in Context

This example demonstrates the distinct roles of Badges (status) and Tags
(categorization) in two common web interfaces: a SaaS Dashboard and an
E-commerce Product Card.

## 1. SaaS Dashboard: Invoice Management Table

In this scenario, we use **Badges** to communicate the current lifecycle state
of an invoice.

| Invoice ID | Client          | Amount   | Status (Badge)         | Category (Tags)             |
| :--------- | :-------------- | :------- | :--------------------- | :-------------------------- |
| #INV-001   | Acme Corp       | $1,200   | `[ Paid ]` (Green)     | `( Monthly )` `( Software )` |
| #INV-002   | Globex Inc      | $850     | `[ Pending ]` (Yellow) | `( Consulting )`            |
| #INV-003   | Stark Ind       | $3,400   | `[ Overdue ]` (Red)    | `( Hardware )` `( Urgent )`  |

### Design Breakdown:
- **Badges (Status):** Uses a **Pill** shape (fully rounded) with a solid background. The color immediately signals the "health" of the invoice.
- **Tags (Categories):** Uses a **Rounded** shape (4px radius) with an **Outline** or **Subtle Tonal** style. They provide metadata without competing with the high-priority status badge.

---

## 2. E-commerce: Product Card

In this scenario, we use **Badges** for time-sensitive highlights and **Tags**
for product attributes.

```text
+-----------------------+
| [ NEW ] (Badge)       | <--- Overlaid on image (Blue)
|                       |
| [ IMAGE OF SHOE ]     |
|                       |
+-----------------------+
| Trail Runner X1       |
| $129.00               |
|                       |
| ( Waterproof ) ( 40% )| <--- Attribute Tags (Subtle Gray)
| ( Eco-Friendly )      |
+-----------------------+
```

### Design Breakdown:
- **Promotion Badge:** Positioned in the top-left corner of the image. It uses a high-contrast color (Blue/White) to grab attention immediately.
- **Attribute Tags:** Placed below the pricing. They are clickable, allowing the user to filter the catalog by that specific attribute (e.g., clicking "Waterproof" takes the user to all waterproof shoes).
- **Hierarchy:** The Badge is the most prominent, signaling "Why you should look at this NOW." The Tags are secondary, signaling "What this product IS."

---

## Key Differences Applied

| Feature         | Badge (Status)                       | Tag (Category)                    |
| :-------------- | :----------------------------------- | :-------------------------------- |
| **Logic**       | Mutually Exclusive (One status)      | Additive (Many categories)        |
| **Shape**       | Pill (Full round)                    | Rounded Rect (Small radius)       |
| **Style**       | Solid or High-Contrast               | Subtle, Outline, or Tonal         |
| **Interaction** | Usually Static                       | Often Clickable/Dismissible       |
| **Placement**   | Near the title or in a specific col  | Bottom of content or in a cluster |
