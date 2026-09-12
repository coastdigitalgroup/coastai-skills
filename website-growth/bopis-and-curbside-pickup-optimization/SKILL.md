---
name: bopis-and-curbside-pickup-optimization
description:
  Audit, design, and optimize Buy Online, Pick Up In Store (BOPIS) and curbside
  pickup fulfillment UX across PDPs, store locators, cart drawers, checkout
  selectors, and post-checkout instructions to maximize local conversion rates,
  eliminate shipping friction, and boost cross-channel order value.
---

# BOPIS & Curbside Pickup Optimization

## Purpose

The BOPIS & Curbside Pickup Optimization skill provides a systematic framework for auditing, structuring, designing, and optimizing Buy Online, Pick Up In Store (BOPIS), Click & Collect, and Curbside Pickup experiences across omnichannel e-commerce websites.

As shipping costs, transit delays, and delivery uncertainty increase, local store fulfillment becomes a critical driver of conversion for brick-and-mortar and hybrid retailers. However, shoppers frequently abandon pickup orders due to hidden store stock availability, confusing store selection modals, friction-heavy checkout fulfillment toggles, unclear pickup window estimates, or missing post-checkout instructions (such as designated pickup spot instructions or proxy pickup rules).

This skill guides the optimization of local fulfillment UX from PDP store availability widgets down to post-purchase SMS readiness notices, driving higher PDP-to-Cart conversions, lowering cart abandonment caused by shipping thresholds, accelerating order readiness expectations, and unlocking incremental in-store attachment sales.

## Use Cases

- **Omnichannel Retailers with Physical Store Footprints:** Retailers operating physical storefronts, warehouses, or pickup counters wanting to increase local store order volume and reduce last-mile shipping costs.
- **High-Shipping-Fee or Heavy/Bulky Merchandise:** Categories like furniture, home improvement, appliances, auto parts, or groceries where shipping fees or delivery timelines create high checkout drop-off.
- **Urgent Need / Same-Day Shoppers:** Customers who require items immediately (e.g., same-day emergency repairs, last-minute gifts, holiday shopping past shipping cutoffs).
- **Cart Shipping Threshold Friction:** Shoppers who fall short of free shipping minimums but abandon rather than adding unwanted filler items to their cart.
- **Curbside Pickup Experience Enhancements:** Retailers introducing contactless drive-up or designated spot pickup options needing clear digital check-in and vehicle identification UX.

## When NOT to Use

- **Pure Direct-to-Consumer (DTC) / E-Commerce Only:** Retailers without physical stores, regional micro-fulfillment pickup hubs, or partner store networks.
- **Standard Shipping Carrier Optimization:** For optimizing carrier delivery options, shipping address validation, or delivery speed messaging for home delivery, use `address-validation-and-autocomplete-optimization` or `shipping-delivery-transparency-optimization`.
- **In-Store POS / Store Associate Systems:** For internal warehouse management systems (WMS), store picking apps, or associate inventory tools.
- **Out-of-Stock Online Pre-Orders:** For items completely out of stock across both warehouse and physical stores where pre-orders are captured, use `pre-order-and-backorder-optimization`.

## Inputs

1. **Store & Inventory Data Infrastructure:**
   - Real-time store-level ERP/POS inventory feeds, safety stock threshold rules, store trading hours, and store location geo-coordinates.
2. **Current Omnichannel Analytics & Conversion Data:**
   - PDP bounce rates, local store selector modal interaction rates, BOPIS vs. Ship-to-Home checkout split rates, pickup order cancellation rates, and pickup notification CTRs.
3. **UX & Checkout Funnel Assets:**
   - Screen captures or design specs of PDP inventory widgets, store locator popups, cart drawer fulfillment switches, checkout fulfillment tabs, confirmation pages, and SMS notification templates.
4. **Physical Pickup Logistics Specs:**
   - Pickup counter locations (e.g., front of store vs. back service desk), curbside parking spot numbers, customer ID/proxy pickup policies, and standard order processing SLA times (e.g., "Ready in 2 hours").

## Outputs

1. **Omnichannel Pickup Friction Audit:** Comprehensive diagnostic evaluation of PDP stock visibility, store locator usability, fulfillment toggle clarity, checkout contact collection, and post-checkout directions.
2. **PDP Store Availability & Selector Wireframes:** Standardized UX specifications for geo-detected local store badges, "Pick Up Today" CTAs, interactive store search modals, and multi-item stock check widgets.
3. **Cart & Checkout Fulfillment Switcher Specifications:** UI/UX specs for seamless toggles between "Ship to Home" and "Pick Up In Store" with transparent store selection, availability status, and pickup readiness timeframes.
4. **Post-Checkout Pickup Communication & Check-In Spec:** Detailed post-purchase confirmation layout, digital wallet pickup pass specs, and SMS/web curbside arrival check-in flow wireframes.

---

## Workflow

### 1. Audit Omnichannel Pickup Friction & Store Discovery

Evaluate the existing end-to-end customer journey for physical store pickup across five primary touchpoints:
- **PDP Store Stock Visibility:** Is the nearest store automatically geo-detected? Does the PDP explicitly display "Ready for Pickup Today (In 2 Hours)" or merely a generic "In Stock"?
- **Store Locator & Selection Modal:** Can users search by ZIP/City, view store hours, check aisle/department stock, and set a "My Preferred Store" default with 1 click?
- **Cart Drawer Fulfillment Toggle:** Can shoppers easily split or switch items between "Ship to Home" and "Store Pickup" without clearing their cart or restarting checkout?
- **Checkout Pickup Information:** Does checkout collect mandatory pickup contact details (e.g., mobile phone for SMS alerts) and allow designating an alternate proxy pickup person?
- **Post-Purchase Guidance:** Are pickup instructions clear on the Thank You page and confirmation SMS (store address, pickup counter map, parking directions, required ID)?

### 2. Optimize PDP Store Inventory & Readiness Messaging

Transform passive store availability text into high-converting local fulfillment triggers:
- **Automatic Geo-Location Detection:** Request browser permission or resolve IP location to display the customer's nearest store automatically (e.g., *"Available at Downtown Store (1.8 miles away)"*).
- **Exact Pickup Readiness SLA:** Avoid vague phrases like "In Stock". Use specific, time-bound readiness promises (e.g., *"Order now, pick up today by 4:00 PM in 2 hours"*).
- **Dual CTA Hierarchy:** Present side-by-side or stacked conversion buttons on PDPs:
  - Primary CTA 1: **"Add to Cart — Free Delivery"**
  - Primary CTA 2: **"Pick Up In Store — Free (Ready in 2 Hrs)"**
- **Low Stock Urgency Badging:** If store inventory is under 3 units, display transparent low-stock warnings (e.g., *"Only 2 left at your selected store — Reserve now"*).

### 3. Streamline Cart Drawer & Checkout Fulfillment Choice

Eliminate friction when selecting fulfillment methods before and during checkout:
- **Segmented Fulfillment Switcher:** Provide a prominent segmented tab bar inside the sliding cart drawer allowing instant toggling between "Ship ($5.99 or Free over $50)" and "Pick Up In Store (Free)".
- **Multi-Item Availability Handling:** When a cart contains 3 items where 2 are in stock locally and 1 requires shipping, present clear split options:
  - Option A: *"Pick up 2 items today at Downtown Store + Ship 1 item to your home ($0 extra)"*
  - Option B: *"Consolidate all 3 items for free home delivery by [Date]"*
  - Option C: *"Transfer missing item to Downtown Store (Ready in 2 days)"*
- **Dedicated Pickup Contact Step:** Replace traditional shipping address forms at checkout with a streamlined "Pickup Contact & Location" step requesting:
  - Pickup Store Confirmation (with map preview & operating hours).
  - Primary Pick-Up Name & Mobile Phone Number (for automated SMS readiness alerts).
  - Optional "Designate Alternate Pickup Person" checkbox (Name + Email/Phone).

### 4. Build Contactless & Curbside Arrival Workflows

Reduce customer wait times and store associate confusion during order retrieval:
- **Digital Pickup Pass:** Provide a mobile-optimized pickup pass on the confirmation screen and email/SMS containing a scannable barcode/QR code, order number, and store phone number.
- **Curbside Arrival Check-In Button:** Include a 1-tap web check-in link in the "Your Order is Ready for Pickup" SMS:
  - Step 1: Tap *"I've Arrived at the Store"*.
  - Step 2: Select Parking Spot # or Vehicle Color/Make.
  - Step 3: View live status (*"Associate is bringing your order out now"*).
- **In-Store Counter Directions:** For counter pickup, provide explicit indoor navigation instructions (e.g., *"Proceed to Customer Service Desk on 2nd Floor — Skip the main checkout line"*).

### 5. Drive In-Store Cross-Selling & Measure Results

Turn pickup orders into secondary revenue opportunities:
- **Bounceback Bounce Offer:** Include an in-store voucher on the digital pickup receipt (e.g., *"Enjoy $10 off any additional in-store purchase when you collect your order today"*).
- **Track Core Metrics:** Measure PDP local engagement, BOPIS checkout share, pickup completion rate, and average in-store attachment order value.

---

## Decision Rules

### Rule 1: Default Store Selection & Geo-Location Strategy
- **If user location is available (Browser Geo / IP):** Automatically pre-select the nearest store with stock within 25 miles and display its specific availability.
- **If nearest store has NO stock:** Display *"Out of Stock at [Nearest Store] — Available at [Next Nearest Store, 8 mi]"* with a link to *"Check other nearby stores"*.
- **If user has explicit saved preference:** Always honor the customer's saved "My Store" preference over auto-detected location, but notify them if an item is out of stock at their preferred store.

### Rule 2: Multi-Item Stock Split Thresholds
- **If >75% of cart items are available at the primary store:** Default the cart fulfillment toggle to "Pick Up In Store" and offer free ship-to-store transfer for the remaining missing item.
- **If <50% of cart items are available at the primary store:** Default to "Ship to Home", but highlight local pickup availability as a quick option for eligible items.

### Rule 3: Safety Stock Buffer Allocation
- **Do NOT display BOPIS availability if store stock == 1 unit** unless real-time POS reservation locks are enabled. Reserve 1-2 units as a safety buffer to prevent store associates from reporting missing items ("pick declines") after customer order confirmation.
- **Display "Limited Availability" warning when store stock is 2-3 units.**

### Rule 4: Mobile Viewport & Touch Ergonomics
- On mobile PDPs, the store selector modal must open as a bottom slide-up sheet occupying 80% screen height with a sticky search bar and 48px minimum touch targets for "Select Store" buttons.

---

## Constraints

- **POS / ERP Inventory Sync Latency:** If store inventory feeds update slower than every 15 minutes, strict safety stock buffers (minimum 2 units) MUST be enforced to prevent cancelled orders.
- **Store Operating Hours & Cutoffs:** Same-day pickup SLA promises (e.g., "Ready in 2 Hours") must dynamically deactivate 2 hours prior to store closing. Orders placed after cutoff must display: *"Ready tomorrow morning by 10:00 AM"*.
- **Strict SMS Opt-In Compliance:** Mobile phone numbers collected for pickup alerts must explicitly state: *"Used solely for order pickup SMS status notifications."*

## Non-Goals

- Building internal mobile applications for store associate picking, packing, or shelf replenishment.
- Re-architecting physical store layout, parking spaces, or hardware barcode scanners.
- Managing carrier logistics for store-to-store freight shipments.

---

## Common Failure Patterns

- **The Vague "In Stock" Trap:** Telling customers an item is "In Stock In Store" without specifying *which* store or *when* it will be ready, leading to unexpected store visits and disappointed shoppers.
- **Forcing Full Shipping Address Forms for Pickup:** Forcing BOPIS buyers to fill out billing and shipping street addresses during checkout, eliminating the speed advantage of local pickup.
- **Hidden Store Selection:** Hiding store stock selection deep inside an accordion or footer, forcing users to reach the final checkout step before discovering if an item is locally available.
- **Unclear Pickup Counter Instructions:** Leaving customers wandering around large retail stores because post-purchase communications failed to specify where pickup orders are retrieved.
- **High Pick Decline Rate:** Failure to enforce inventory safety buffers, resulting in store associates cancelling 10%+ of BOPIS orders due to phantom inventory or shelf loss.

---

## Validation Criteria

- [ ] **BOPIS Checkout Share:** Percentage of total online orders fulfilled via BOPIS/Curbside Pickup. Target: +20% to +45% relative increase in local fulfillment share.
- [ ] **PDP-to-Cart Conversion Rate (Local Traffic):** Conversion rate of PDP visitors within 15 miles of a store location. Target: +15% to +30% relative lift.
- [ ] **Pick Decline / Cancellation Rate:** Percentage of BOPIS orders cancelled by store staff due to stockouts. Target: <2.5% total pick decline rate.
- [ ] **Store Pickup Time SLA Adherence:** Percentage of orders ready within promised SLA (e.g., 2 hours). Target: >95% on-time readiness.
- [ ] **In-Store Attachment Sales Value:** Percentage of BOPIS customers who purchase additional items upon arrival. Target: >15% attachment rate with +$12+ average add-on spend.
