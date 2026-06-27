---
name: wishlist-optimization
description:
  Audit and optimize wishlist and "save for later" functionality to capture soft
  intent, reduce cart abandonment, and drive re-engagement.
---

# Wishlist Optimization

## Purpose

The Wishlist Optimization skill provides a systematic framework for transforming
the wishlist from a passive "parking lot" for products into an active conversion
engine. Most users use wishlists to manage "soft intent"—items they are
interested in but not ready to buy immediately. By optimizing the visibility,
ease of use, and automated re-engagement triggers associated with wishlists,
this skill aims to reduce cart abandonment, increase Customer Lifetime Value
(LTV), and improve the "Save-to-Sale" conversion rate.

## Use Cases

- **High-Consideration E-commerce:** Sites where users often perform multiple
  research sessions before committing to a purchase.
- **Gift-Centric Retail:** Occasions like weddings, birthdays, or holidays where
  users need to curate and share lists.
- **Large Catalog Apparel/Fashion:** Where "browsing as entertainment" is common
  and users want to save items for future style inspiration.
- **Stock-Volatile Markets:** Where items frequently go out of stock or have
  fluctuating prices.

## When NOT to Use

- **Low-Complexity Commodities:** Simple, low-cost items that are typically
  bought on impulse in a single session.
- **B2B Bulk Ordering:** Where the "Add to Quote" or "Reorder" flow is more
  critical than a "Save for Later" list.
- **Single-Product Sites:** If there is only one item to buy, a wishlist adds
  unnecessary friction.

## Inputs

1. **Wishlist Analytics:** Data on how many users add to wishlist vs. add to
   cart, and the conversion rate of wishlist items.
2. **Current Save-for-Later UI:** Placement and design of the "Heart" or "Save"
   icon on Product Listing Pages (PLPs) and Product Detail Pages (PDPs).
3. **Email/Push Trigger Logic:** Current automated flows for out-of-stock, price
   drop, or "back in stock" notifications for saved items.
4. **User Feedback:** Common complaints regarding losing saved items or
   difficulty finding the wishlist.

## Outputs

1. **Wishlist Friction Audit:** Identification of barriers to saving items (e.g.,
   "Forced login to save").
2. **Optimized Save UI/UX:** Recommendations for icon placement,
   micro-interactions, and mobile-friendly "Save" targets.
3. **Re-engagement Trigger Map:** A plan for automated notifications based on
   wishlist activity (Price drops, Low stock, Back in stock).
4. **Sharing & Social Strategy:** Guidelines for making wishlists shareable for
   collaborative shopping or gifting.

## Workflow

### 1. Reduce the Friction to "Save"

Eliminate barriers that prevent users from capturing their intent.

- **Guest Wishlists:** Allow users to save items without creating an account
  (using local storage or cookies). Only ask for an account when they want to
  "sync across devices."
- **One-Tap Actions:** Ensure the "Save" icon is accessible directly from the
  PLP/Grid view, not just the PDP.
- **Visual Feedback:** Provide immediate, delightful micro-interactions when an
  item is saved (e.g., an icon filling in or flying to the wishlist folder).

### 2. Move from "Parking" to "Progress"

Optimize the wishlist page itself to drive users back to the cart.

- **Add to Cart from List:** Include a direct "Add to Cart" button for every
  item in the wishlist.
- **In-Stock/Status Clarity:** Clearly show if an item is "Low Stock," "On
  Sale," or "Back in Stock" directly in the list view.
- **Grouping & Organization:** For power users, allow the creation of multiple
  lists (e.g., "Summer Trip," "Office Redesign").

### 3. Automate the "Soft Intent" Re-engagement

Use saved items as triggers for personalized marketing.

- **Price Drop Alerts:** Automatically notify users when a saved item goes on
  sale.
- **Inventory Alerts:** Alert users when a saved item is "Low in Stock" or "Back
  in Stock."
- **The "Wishlist Reminder" Flow:** Periodically send a curated email showing
  their saved items, perhaps with a small incentive to "complete the look."

### 4. Leverage the "Save for Later" in Cart

Reduce cart abandonment by providing a "Safe Exit."

- **Move to Wishlist:** On the Cart page, provide an option to "Move to
  Wishlist" instead of just "Delete." This keeps the product in the user's
  orbit.
- **Visual Reminders:** Show "Items from your wishlist" at the bottom of the
  cart to encourage higher Average Order Value (AOV).

### 5. Review Against Decision Rules

Verify the strategy against the wishlist growth heuristics.

## Decision Rules

- **The "No-Login" Rule:** Never force a login as the first step of saving an
  item. Anonymous saving must be the default.
- **The Proximity Rule:** The "Save" button should be in the immediate visual
  field of the "Add to Cart" button but visually distinct (usually a ghost
  button or icon).
- **Persistence First:** Guest wishlists must persist for at least 30 days via
  cookies/local storage.
- **Contextual Notifications:** Notifications for wishlisted items must be
  relevant (e.g., a $2 price drop on a $100 item might not be worth a push
  notification, but a "Back in Stock" alert is).

## Common Failure Patterns

- **The "Login Wall":** Forcing users to create an account before they can
  "Heart" an item, which kills the "soft intent" moment.
- **Hidden Lists:** Making the wishlist page hard to find (e.g., burying it deep
  in a "My Account" menu).
- **The "Cold Storage" List:** Having a wishlist page with no "Add to Cart"
  button or no pricing/stock updates.
- **Duplicate Logic:** Treating a "Wishlist" and "Save for Later" as two
  entirely different, disconnected systems.
- **Silence:** Never communicating with the user about their saved items,
  letting the intent die.

## Validation Methods

- [ ] **Wishlist-to-Cart Conversion:** Measure the percentage of wishlisted
  items that eventually move to the cart and are purchased.
- [ ] **Add-to-Wishlist Rate:** Total "Save" actions / Total Visitors. Target:
  5-10% lift.
- [ ] **Re-engagement Open/Click Rates:** Measure the performance of price-drop
  and back-in-stock emails.
- [ ] **Cart Abandonment Reduction:** Monitor if providing a "Move to Wishlist"
  option reduces the "Remove from Cart" rate without hurting sales.
- [ ] **LTV of "Wishlisters":** Track the 6-month value of users who use the
  wishlist vs. those who don't.
