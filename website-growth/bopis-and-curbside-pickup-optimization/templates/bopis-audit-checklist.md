# BOPIS & Curbside Pickup Optimization Audit Checklist

Use this 50-point checklist to audit and optimize Buy Online, Pick Up In Store (BOPIS), Click & Collect, and Curbside Pickup experiences across PDPs, store locators, cart drawers, checkout, and post-checkout touchpoints.

---

## Section 1: Product Detail Page (PDP) Store Discovery & Stock Badging

- [ ] **1. Automatic Geo-Location:** Does the PDP automatically detect the user's nearest physical store via browser location API or IP lookup without forcing a manual search?
- [ ] **2. Default Store Persistence:** Is the customer's selected "My Preferred Store" saved across sessions in `localStorage` or cookies?
- [ ] **3. Explicit Readiness SLA:** Does PDP availability messaging state exact time-bound readiness promises (e.g., *"Pick Up Today — Ready in 2 Hours"*) instead of generic *"In Stock"*?
- [ ] **4. Dual Action CTAs:** Are primary conversion buttons presented clearly as separate or stacked options (e.g., *"Pick Up Today (Free)"* vs. *"Ship to Home"*)?
- [ ] **5. Safety Stock Buffering:** Is store inventory locked from BOPIS display when stock drops to 1 unit to prevent pick declines from store shelf loss?
- [ ] **6. Low-Stock Urgency Indicators:** Are low inventory levels (2-3 units remaining) badged with clear urgency messaging (e.g., *"Only 2 left at Downtown Store — Reserve now"*)?
- [ ] **7. Cutoff Time Awareness:** Does readiness messaging dynamically change when orders are placed within 2 hours of store closing (e.g., *"Order now, pick up tomorrow by 10:00 AM"*)?
- [ ] **8. Multi-Store Stock Modal Link:** Is there an easily accessible link (e.g., *"Check 4 other stores near you"*) immediately below the store badge?
- [ ] **9. Mobile Touch Ergonomics:** Is the store availability badge readable above the fold on mobile screens without obscuring product photos or pricing?
- [ ] **10. Variant Stock Synchronization:** Does switching product color/size swatches dynamically update store stock availability without requiring a page reload?

---

## Section 2: Store Locator & Store Selection Modal Usability

- [ ] **11. Flexible Search Options:** Can users search for stores by ZIP code, City/State, or landmark name?
- [ ] **12. Distance & Radius Display:** Does each store result clearly list driving distance in miles/kilometers from the user's current location?
- [ ] **13. Real-Time Operating Hours:** Does the store modal display current day operating hours and explicit holiday/special hours?
- [ ] **14. Detailed Store Contact Info:** Is the store street address, phone number, and indoor pickup counter location clearly visible?
- [ ] **15. One-Click Preferred Store Selection:** Can users set a store as their primary preferred location with a single tap?
- [ ] **16. Multi-Item Cart Stock View:** Does the store locator display whether *all* items currently in the user's cart are in stock at that specific store location?
- [ ] **17. Map View & List View Toggle:** Can users toggle smoothly between an interactive map pin view and a sorted list view?
- [ ] **18. Mobile Slide-Up Sheet:** On mobile devices, does the store selector open as a touch-friendly bottom drawer taking up ~80% of screen height?
- [ ] **19. Direct Store Transfer / Ship-to-Store:** If an item is out of stock locally, does the modal offer a *"Ship to this store for free pickup in 2-3 days"* option?
- [ ] **20. Aisle & Bay Guidance:** For large retail spaces (e.g., hardware or department stores), are indoor department/aisle locations displayed for self-service pickup?

---

## Section 3: Cart Drawer & Basket Fulfillment Toggling

- [ ] **21. Segmented Cart Switcher:** Does the sliding cart drawer feature a clear tab bar switching between *"Ship to Home"* and *"Store Pickup"*?
- [ ] **22. Mixed-Fulfillment Cart Handling:** Can users easily assign individual items in a single cart to different fulfillment channels (e.g., 2 items for pickup, 1 for shipping)?
- [ ] **23. Transparent Shipping Savings:** Does selecting "Store Pickup" explicitly highlight shipping fee savings (e.g., *"You saved $7.99 in shipping fees"*)?
- [ ] **24. Missing Item Transfer Options:** When 1 item out of 3 is unavailable locally, does the cart suggest transfer or consolidation options without clearing the cart?
- [ ] **25. Instant Subtotal Recalculation:** Does changing fulfillment method instantly update taxes, shipping charges, and total cart cost without page refresh?
- [ ] **26. Persistent Store Badge in Cart:** Is the designated pickup store name and address visible at all times in the cart summary?
- [ ] **27. Quick Store Switching in Cart:** Can users change their selected pickup store directly inside the cart drawer without returning to PDPs?
- [ ] **28. Free Pickup Visual Badge:** Is the word **FREE** highlighted in bold green or accent color next to store pickup options to contrast with paid home shipping?
- [ ] **29. Stock Reservation Timeout Warning:** If cart items are temporarily reserved for local pickup, is a clear countdown timer displayed if applicable?
- [ ] **30. Clear Empty Cart Fallback:** If changing stores causes all cart items to be out of stock, does the system offer alternative product recommendations or ship-to-home alternatives?

---

## Section 4: Checkout Pickup Information & Contact Form

- [ ] **31. Dedicated Pickup Step:** Does checkout bypass home shipping address inputs when "Store Pickup" is selected as the primary fulfillment method?
- [ ] **32. Mandatory Mobile Phone Input:** Is a mobile phone number collected specifically for automated SMS order readiness alerts?
- [ ] **33. Explicit SMS Opt-In Copy:** Does mobile input text clarify that phone numbers are used exclusively for pickup status updates?
- [ ] **34. Alternate Proxy Pickup Person:** Is there a simple checkbox allowing customers to authorize a friend/family member to collect the order (collecting Proxy Name + Email)?
- [ ] **35. Clear ID & Document Requirements:** Are necessary pickup verification documents (e.g., *"Valid Photo ID and Order Confirmation QR Code required at pickup"*) highlighted during checkout?
- [ ] **36. Store Map & Hours Summary:** Is a map preview, store hours summary, and pickup counter location embedded in the checkout sidebar summary?
- [ ] **37. Accelerated Express Payments:** Are express checkout methods (Apple Pay, Google Pay, Shop Pay) pre-configured to default to store pickup when initiated from a pickup PDP/cart?
- [ ] **38. Billing Address Separation:** Is billing address collection clearly separated from shipping, defaulting to "Same as Billing" only when paying via credit card?
- [ ] **39. Zero Shipping Fee Guarantee:** Is the shipping cost line item explicitly listed as "$0.00 (Store Pickup)" on the final checkout order total?
- [ ] **40. One-Click Order Modification Window:** Are customers informed that they can modify or cancel pickup orders within 15 minutes of placing?

---

## Section 5: Post-Checkout Communications & Curbside Check-In

- [ ] **41. Thank You Page Pickup Card:** Does the order confirmation page display a prominent pickup summary card with store map, store phone number, and readiness timeline?
- [ ] **42. Mobile Pass Integration:** Can customers add their order pickup pass to Apple Wallet or Google Wallet directly from the Thank You page?
- [ ] **43. Immediate Order Confirmation SMS:** Is an immediate SMS sent confirming order receipt and stating that a second notice will follow when items are picked and ready?
- [ ] **44. 1-Tap Curbside Check-In Link:** Does the "Order Ready" SMS contain a friction-free 1-tap web check-in link (no app download required)?
- [ ] **45. Vehicle Details Collection:** Does the curbside check-in web flow collect vehicle Make, Model, Color, and Parking Spot Number?
- [ ] **46. Live Associate Tracking Status:** Does the check-in screen display real-time status updates (e.g., *"Associate is bringing your order out now"*)?
- [ ] **47. Indoor Counter Navigation Instructions:** For in-store pickups, do confirmation communications specify exact indoor directions (e.g., *"Customer Service Counter on 2nd Floor"*)?
- [ ] **48. In-Store Attachment Bounceback Offer:** Does the digital pickup pass include an exclusive in-store coupon (e.g., *"$10 off $50 additional in-store purchase today"*)?
- [ ] **49. Clear Pickup Expiration Window:** Are customers clearly notified of the pickup deadline window (e.g., *"Order held for 5 days until Sunday at 8 PM"*) before auto-cancellation?
- [ ] **50. Post-Pickup Digital Receipt & Feedback:** Within 1 hour of order pickup completion, is a digital receipt sent with a 1-tap 5-star rating link for the pickup experience?
