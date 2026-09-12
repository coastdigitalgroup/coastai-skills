# Before-and-After Scenario: Omnichannel Hardware & Electronics Retailer

This scenario demonstrates the application of the **BOPIS & Curbside Pickup Optimization** skill to a multi-store hardware and home electronics retailer ("Apex Tools & Tech", 42 store locations).

---

## Baseline Situation & Problem

Apex Tools & Tech operated 42 physical store locations while running a direct-to-consumer e-commerce site. Despite strong local store inventory integration, local online conversions lagged significantly behind industry benchmarks.

### Baseline UX & Friction Hotspots:
1. **Generic PDP Store Indicator:** On Product Detail Pages, local availability was hidden behind a generic link ("Check Store Availability"). Clicking opened a basic modal requiring manually typing a ZIP code every session. No automatic IP/browser geo-detection was implemented.
2. **Ambiguous Readiness Claims:** The site displayed "In Stock" without indicating pickup readiness timelines (e.g., whether it took 2 hours or 3 days).
3. **Cart & Checkout Shipping Friction:** Customers selecting store pickup during checkout were still forced to complete a standard 4-field shipping address form (Street Address, Apt, State, ZIP) before selecting a pickup store radio button on Step 2.
4. **Missing Curbside/Proxy Guidance:** The post-purchase order confirmation page provided only the store street address. It contained no indoor store counter directions, no proxy pickup options for family members, and no 1-tap mobile curbside arrival check-in link.

### Baseline Metrics:
- **BOPIS Share of Total Checkout Volume:** 11.2%
- **Local PDP-to-Cart Conversion Rate (Visitors within 15 miles):** 2.15%
- **Pickup Order Cancellation / Pick Decline Rate:** 8.4% (high rate due to zero safety stock buffering on 1-unit store inventory)
- **In-Store Bounceback Attachment Rate:** 4.2% (average add-on spend: $3.10)

---

## Optimized Intervention Applied

Apex Tools & Tech executed a 4-week omnichannel UX optimization using the BOPIS & Curbside Pickup Optimization framework.

### Key UX Fixes Implemented:

1. **PDP Geo-Detected Store Availability Widget:**
   - Integrated browser geolocation and IP lookup to automatically pre-select the customer's nearest store (e.g., *"Available today at Apex North Austin — 2.4 miles away"*).
   - Replaced single "Add to Cart" button with a primary dual-CTA stack:
     - Button 1 (Primary): **"Pick Up Today (Free — Ready in 2 Hours)"**
     - Button 2 (Secondary Outline): **"Ship to Home (Est. Arrival Thursday)"**
   - Added low-stock badges (*"Only 2 left at North Austin — Reserve now"*).

2. **Smart Store Selector Modal:**
   - Redesigned store locator modal with interactive map, real-time store hours, and 1-tap "Make My Primary Store" cookie persistence.
   - Displayed aisle/bay locations for immediate self-service reference.

3. **Streamlined Checkout Pickup Flow:**
   - Created a dedicated "Pickup Contact" checkout tab that completely bypassed home shipping address inputs.
   - Reduced checkout fields for pickup orders to just **Name**, **Mobile Phone (for SMS status)**, and an optional **"Designate Proxy Pickup Person"** toggle.

4. **Curbside Arrival & Digital Wallet Pickup Pass:**
   - Upgraded order confirmation screen and readiness SMS with a 1-tap web check-in button (*"I've Arrived — Send Order to Curbside Spot"*).
   - Included scannable barcode pickup pass importable directly into Apple Wallet / Google Pay.
   - Included a $10 off $50 in-store bounceback coupon code on the pickup confirmation pass to incentivize additional in-store purchases upon arrival.

---

## Measurable Results & Outcomes

After 60 days of post-optimization deployment across all 42 store locations, Apex Tools & Tech measured the following performance gains:

| Metric | Before Optimization | After Optimization | Relative Lift / Impact |
| :--- | :--- | :--- | :--- |
| **BOPIS Share of Total Checkout** | 11.2% | **31.8%** | **+183.9% relative increase** |
| **Local PDP-to-Cart Conversion Rate** | 2.15% | **3.84%** | **+78.6% relative lift** |
| **Overall Checkout Completion Rate** | 4.12% | **5.45%** | **+32.3% checkout conversion** |
| **Pick Decline / Cancellation Rate** | 8.4% | **1.6%** | **-80.9% drop in cancellations** |
| **In-Store Attachment Rate** | 4.2% | **18.7%** | **+345% increase in attachment** |
| **Average In-Store Add-On Spend** | $3.10 | **$14.85** | **+$11.75 incremental AOV** |

### Key Takeaway:
By making local store stock immediately visible on PDPs, eliminating shipping address entry friction for pickup orders, and providing 1-tap curbside arrival tools, the merchant captured local high-intent shoppers who previously dropped off due to shipping costs or delivery delays, while unlocking substantial high-margin in-store attachment sales.
