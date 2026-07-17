# Stockout Recovery Optimization: Audit Checklist

Use this checklist to identify friction points, conversion leaks, and engagement opportunities on product pages (PDPs) and product listing pages (PLPs) experiencing out-of-stock scenarios.

## 1. Discovery and Product Listing Pages (PLPs)

- [ ] **Inventory Filtering:** Does the PLP offer a filter option to "Hide Out of Stock" or "Show Available Only" so users can opt out of seeing unavailable items?
- [ ] **Visual Distinction:** Are out-of-stock items clearly, but subtly, badged as "Restocking Soon" or "Sold Out" *directly on the category grid* to manage expectations prior to clicking?
- [ ] **Sorting Logic:** Are out-of-stock items automatically demoted to the very bottom of the PLP grid so they do not crowd out active inventory?
- [ ] **Size/Variant Quick Filtering:** If a user filters a PLP by a specific size (e.g., "Size 10"), does the grid automatically hide products that are out of stock *specifically in Size 10* (even if in stock for other sizes)?

## 2. Product Detail Page (PDP) Layout & CTA

- [ ] **Add-to-Cart Transition:** When a sold-out variant or product is selected, does the primary "Add to Cart" button dynamically convert into an active "Notify Me When Restocked" button?
- [ ] **Button Visibility:** Is the "Notify Me" button placed in the exact same prominent location and size as the primary Add-to-Cart button, rather than as a secondary, low-contrast text link?
- [ ] **Disabled States Removed:** Is the button fully clickable and active when an out-of-stock variant is selected (instead of being completely grayed-out and unclickable)?
- [ ] **Real-Time Variant Sync:** Does selecting different size/color options instantly update the button state without requiring a full page refresh?

## 3. The Back-in-Stock Alert Sign-up Experience

- [ ] **Frictionless Inline Form:** For guest users, does clicking the button open a single-input form *inline* (on the page) rather than launching a heavy modal overlay or loading a new page?
- [ ] **One-Click Opt-in (Logged-in):** If a user is logged in, does clicking the button instantly register their subscription using account details with a single click (zero typing required)?
- [ ] **Variant Memory:** Does the system automatically capture and log the specific selected variant (e.g., Color: Midnight Blue, Size: XL) without forcing the user to re-select it in a form?
- [ ] **Multi-Channel Choices:** Does the form offer both SMS and Email notification options, giving the user control over how they want to receive the alert?
- [ ] **Independent Consent (No Pre-Checks):** Is the restock subscription checkbox/consent completely separate from general marketing newsletter lists? (Ensures compliance with TCPA and GDPR, and increases opt-in rates by removing "spam" fears).

## 4. Timeline Transparency and Expectation Management

- [ ] **Expected Date Display:** If a replenishment shipment is confirmed, is the expected restocking timeline displayed near the form (e.g., "Expected October 18th" or "Ships in 3 weeks")?
- [ ] **Anticipation Copy:** Does the sign-up copy reframe the wait as an advantage (e.g., "Join the priority list to lock in early access before our next batch sells out")?
- [ ] **Opt-In Confirmation State:** After submission, is there clear visual feedback confirming they are on the list, followed by an immediate email/SMS confirmation indicating exactly what happens next?

## 5. Alternative Product Merchandising (Bounce Mitigation)

- [ ] **Proximity of Recommendations:** Are alternative, in-stock items displayed immediately below the subscription form to capture the visitor's attention before they scroll away or exit?
- [ ] **Size-Matched Alternatives:** If a size-specific stockout occurred, does the recommendation algorithm prioritize displaying items that are *currently in-stock in that exact selected size*?
- [ ] **Relevance Check:** Do the recommended alternatives match the product style, brand, and price point (within +/- 15%) of the out-of-stock item?
- [ ] **Direct Add-to-Cart on Alternates:** Can users add the recommended alternative items to their cart directly from the carousel with a single click, without leaving the page?

## 6. Notification Close-the-Loop (Recovery Campaign)

- [ ] **Transactional Email Speed:** Is the back-in-stock notification system optimized to send alerts within 15 minutes of stock replenishment being checked into the ERP/CMS?
- [ ] **Instant Cart Add Link:** Does the link inside the SMS or email automatically add the restocked item (in the correct variant size/color) directly to the user's cart, taking them straight to checkout?
- [ ] **Scarcity & Exclusivity Messaging:** Does the recovery notification copy reiterate high demand (e.g., "Inventory is extremely limited. We've reserved your pair for 24 hours")?
- [ ] **Tiered/Throttled Delivery:** If restocked quantity is low (< 10 units), does the system throttle notifications to match inventory levels, contacting users in chronological order of sign-up, to avoid sending "out-of-stock" pages to early clickers?
