# Wishlist Optimization: Before & After

This example demonstrates how a high-end furniture retailer optimized their
wishlist experience to capture soft intent and reduce cart abandonment.

## Scenario: The "High-Consideration" Furniture Store

**The Product:** Handcrafted dining tables and sofas (Avg. Order Value: $2,400).
**The Problem:** High cart abandonment rate (82%). Analytics showed users
adding multiple $3,000 tables to the cart, likely to compare them or save them
for a future house move.

---

## Before: The "Login Wall" & Cart Clutter

### The Experience
- **Login Required:** Clicking "Save to Wishlist" on a Product Detail Page (PDP)
  triggered a full-page login/register modal.
- **Hidden in Cart:** No way to move items from the cart to a wishlist. Users
  had to delete items and re-find them later if they weren't ready to buy.
- **Passive Wishlist:** Once an item was saved, the user never received any
  further communication about it.

### Outcomes
- **Wishlist Add Rate:** 1.2% (Most users abandoned at the login wall).
- **Cart Abandonment:** 82% (Users treated the cart as a "maybe" pile).
- **Return Visitor Conversion:** Low (Users forgot which items they liked).

---

## After: Frictionless Saving & Active Re-engagement

### The Optimization
1.  **Guest Wishlist:** Enabled "One-Click Save" for anonymous users. Items are
    persisted via local storage for 30 days.
2.  **"Save for Later" in Cart:** Added a secondary "Save for Later" link below
    the "Remove" button in the cart. This allowed users to "clean" their cart
    of items they weren't ready to buy *right now*.
3.  **Visual Feedback:** When an item is saved, a small toast notification
    appears: *"Saved! View your wishlist [Link]"*.
4.  **Price Drop Trigger:** Implemented an automated email for guest users who
    provided their email during a previous session (or a popup for returning
    guests) when a saved item went on sale.

### Outcomes
- **Wishlist Add Rate:** 6.5% (A 5x increase after removing the login wall).
- **Cart Abandonment:** Decreased to 74% (8% absolute reduction as users moved
  "soft intent" items to the wishlist).
- **Wishlist-to-Cart Conversion:** 12% of wishlist items were eventually
  purchased within 60 days.
- **Overall Revenue:** 15% lift in revenue from returning visitors.

---

## Key Takeaway
By lowering the friction to save (Guest Wishlist) and providing a "pressure
valve" for the cart (Save for Later), the retailer turned the wishlist from a
stagnant list into a powerful funnel for high-consideration purchases.
