# Example: SaaS Inventory Management Table

This example demonstrates the Data Table UI System applied to a complex inventory
view for a SaaS application.

## Scenario
A warehouse manager needs to monitor stock levels, SKU IDs, and last updated
dates across 500+ items.

## Visual Breakdown

### 1. Header Row
- **Background:** Light gray (`#F3F4F6`).
- **Typography:** Bold, All-caps, 12px.
- **Content:** Checkbox (Bulk), SKU (Anchor), Item Name (Text), Category (Tag),
  Price (Numeric), Stock (Numeric), Status (Badge), Actions (Menu).

### 2. Data Rows (Density: Standard)
- **Height:** 52px.
- **Border:** Bottom border 1px solid (`#E5E7EB`).
- **Hover State:** Background changes to light blue (`#F0F9FF`).

### 3. Column Alignment
| Column    | Data Type | Alignment | Reason                                     |
| --------- | --------- | --------- | ------------------------------------------ |
| SKU       | ID        | Left      | Anchor for scanning.                       |
| Item Name | Text      | Left      | Natural reading direction.                 |
| Price     | Currency  | Right     | Align decimal points for comparison.       |
| Stock     | Number    | Right     | Compare inventory magnitude.               |
| Status    | Status    | Center    | Visual badge balance.                      |
| Actions   | Actions   | Right     | Standard placement for terminal actions.   |

## Responsive Transformation
On mobile (320px), the table switches to a **Stacked** pattern:
- Each row becomes a card.
- SKU becomes the card title.
- Labels (Price, Stock, Status) are shown in a 2-column grid inside the card.
- Actions move to the bottom-right of the card.

## Key Wins
- **Maginitude at a glance:** Right-aligned Stock and Price allow the manager
  to see which items are most expensive or running low without reading every digit.
- **Clear focus:** Zebra-striping and hover states prevent "line-mixing" when
  looking at 20+ columns.
- **Context preserved:** Sticky header ensures labels stay visible while
  scrolling through the 500+ items.
